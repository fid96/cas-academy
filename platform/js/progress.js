/**
 * Progression multi-packs — localStorage ada-platform-v2
 * Migre automatiquement depuis ada-platform-v1 (Data Analyst seul).
 */
(function (global) {
  const STORAGE_KEY = "ada-platform-v2";
  const LEGACY_KEY = "ada-platform-v1";

  function emptyPackState(modules) {
    const completed = {};
    (modules || []).forEach((m) => {
      completed[m.id] = false;
    });
    return {
      completed,
      lastModuleId: modules && modules[0] ? modules[0].id : null,
      participantName: "",
      attestation: null,
      updatedAt: Date.now(),
    };
  }

  function defaultRoot(catalog) {
    const packs = {};
    (catalog.packs || []).forEach((p) => {
      packs[p.id] = emptyPackState(p.modules);
    });
    return {
      version: 2,
      activePackId: (catalog.packs && catalog.packs[0] && catalog.packs[0].id) || "data-analyst",
      packs,
      updatedAt: Date.now(),
    };
  }

  function migrateLegacy(catalog) {
    try {
      const raw = localStorage.getItem(LEGACY_KEY);
      if (!raw) return null;
      const legacy = JSON.parse(raw);
      const root = defaultRoot(catalog);
      const da = root.packs["data-analyst"];
      if (!da) return root;
      da.completed = { ...da.completed, ...(legacy.completed || {}) };
      da.lastModuleId = legacy.lastModuleId || da.lastModuleId;
      da.participantName = legacy.participantName || "";
      da.attestation = legacy.attestation || null;
      da.updatedAt = legacy.updatedAt || Date.now();
      return root;
    } catch {
      return null;
    }
  }

  function load(catalog) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        const migrated = migrateLegacy(catalog);
        if (migrated) {
          saveRoot(migrated);
          return migrated;
        }
        return defaultRoot(catalog);
      }
      const parsed = JSON.parse(raw);
      const base = defaultRoot(catalog);
      const packs = { ...base.packs };
      Object.keys(base.packs).forEach((pid) => {
        const incoming = (parsed.packs && parsed.packs[pid]) || {};
        const modules = (catalog.packs.find((p) => p.id === pid) || {}).modules || [];
        const completed = { ...base.packs[pid].completed, ...(incoming.completed || {}) };
        modules.forEach((m) => {
          if (typeof completed[m.id] !== "boolean") completed[m.id] = false;
        });
        packs[pid] = {
          completed,
          lastModuleId: incoming.lastModuleId || base.packs[pid].lastModuleId,
          participantName: incoming.participantName || "",
          attestation: incoming.attestation || null,
          updatedAt: incoming.updatedAt || Date.now(),
        };
      });
      return {
        version: 2,
        activePackId: parsed.activePackId || base.activePackId,
        packs,
        updatedAt: parsed.updatedAt || Date.now(),
      };
    } catch {
      return defaultRoot(catalog);
    }
  }

  function saveRoot(root) {
    root.updatedAt = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(root));
    return root;
  }

  function getPack(catalog, packId) {
    return (catalog.packs || []).find((p) => p.id === packId) || catalog.packs[0];
  }

  function packState(root, packId) {
    if (!root.packs[packId]) root.packs[packId] = emptyPackState([]);
    return root.packs[packId];
  }

  function setActivePack(root, packId) {
    root.activePackId = packId;
    return saveRoot(root);
  }

  function isCompleted(pState, moduleId) {
    return !!(pState.completed && pState.completed[moduleId]);
  }

  function isUnlocked(modules, pState, moduleId) {
    const idx = modules.findIndex((m) => m.id === moduleId);
    if (idx < 0) return false;
    if (idx === 0) return true;
    return isCompleted(pState, modules[idx - 1].id);
  }

  function markComplete(modules, root, packId, moduleId) {
    const pState = packState(root, packId);
    if (!pState.completed) pState.completed = {};
    pState.completed[moduleId] = true;
    pState.lastModuleId = moduleId;
    pState.updatedAt = Date.now();
    return saveRoot(root);
  }

  function markIncomplete(root, packId, moduleId) {
    const pState = packState(root, packId);
    if (pState.completed) pState.completed[moduleId] = false;
    pState.updatedAt = Date.now();
    return saveRoot(root);
  }

  function setLast(root, packId, moduleId) {
    const pState = packState(root, packId);
    pState.lastModuleId = moduleId;
    return saveRoot(root);
  }

  function completedCount(modules, pState) {
    return modules.filter((m) => isCompleted(pState, m.id)).length;
  }

  function percent(modules, pState) {
    if (!modules.length) return 0;
    return Math.round((completedCount(modules, pState) / modules.length) * 100);
  }

  function isPackComplete(modules, pState) {
    return completedCount(modules, pState) === modules.length && modules.length > 0;
  }

  function nextToResume(modules, pState) {
    for (const m of modules) {
      if (!isCompleted(pState, m.id) && isUnlocked(modules, pState, m.id)) return m;
    }
    const lastDone = [...modules].reverse().find((m) => isCompleted(pState, m.id));
    return lastDone || modules[0];
  }

  function resetPack(catalog, root, packId) {
    const pack = getPack(catalog, packId);
    root.packs[packId] = emptyPackState(pack.modules);
    return saveRoot(root);
  }

  function markPackComplete(catalog, root, packId) {
    const pack = getPack(catalog, packId);
    const pState = packState(root, packId);
    if (!pState.completed) pState.completed = {};
    (pack.modules || []).forEach((m) => {
      pState.completed[m.id] = true;
    });
    if (pack.modules && pack.modules.length) {
      pState.lastModuleId = pack.modules[pack.modules.length - 1].id;
    }
    pState.updatedAt = Date.now();
    return saveRoot(root);
  }

  function formatCertDate(d) {
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day} / ${month} / ${year}`;
  }

  function nextCertSeq(prefix) {
    const key = "ada-cert-seq-" + (prefix || "da");
    let n = parseInt(localStorage.getItem(key) || "0", 10);
    if (!Number.isFinite(n) || n < 0) n = 0;
    n += 1;
    localStorage.setItem(key, String(n));
    return n;
  }

  function issueAttestation(root, packId, fullName, numberPrefix) {
    const name = String(fullName || "").trim().replace(/\s+/g, " ");
    if (!name) throw new Error("Nom requis");
    const now = new Date();
    const prefix = numberPrefix || (packId === "se" ? "ADA-SE" : "ADA-ATT");
    const seq = nextCertSeq(packId);
    const year = now.getFullYear();
    const attestation = {
      fullName: name,
      issuedAt: now.toISOString(),
      dateLabel: formatCertDate(now),
      number: `${prefix}-${year}-${String(seq).padStart(4, "0")}`,
      packId,
    };
    const pState = packState(root, packId);
    pState.participantName = name;
    pState.attestation = attestation;
    pState.updatedAt = Date.now();
    return saveRoot(root);
  }

  function getAttestation(pState) {
    return pState && pState.attestation ? pState.attestation : null;
  }

  global.ADAProgress = {
    STORAGE_KEY,
    load,
    saveRoot,
    getPack,
    packState,
    setActivePack,
    isCompleted,
    isUnlocked,
    markComplete,
    markIncomplete,
    setLast,
    completedCount,
    percent,
    isPackComplete,
    nextToResume,
    resetPack,
    markPackComplete,
    formatCertDate,
    issueAttestation,
    getAttestation,
  };
})(window);
