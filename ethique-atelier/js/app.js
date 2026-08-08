/* Éthique Atelier — socle commun, parcours pack-aware (DA | S&E) */

(function () {
  const params = new URLSearchParams(window.location.search);
  const packParam = (params.get("pack") || "data-analyst").toLowerCase();
  const packId = packParam === "se" ? "se" : "data-analyst";

  const data = window.ETHIQUE_CONTENT.build(packId);
  window.ATELIER = data;
  const Lab = window.EthiqueLab;

  const STORAGE_KEY = "ethique-atelier-progress-" + packId + "-v1";
  const CHECK_KEY = "ethique-atelier-checks-" + packId + "-v1";
  const BILAN_KEY = "ethique-atelier-bilan-" + packId + "-v1";
  const STEPS_KEY = "ethique-atelier-steps-" + packId + "-v1";

  const main = document.getElementById("main");

  let state = {
    view: "home",
    lessonId: null,
    phase: "voir",
    progress: loadProgress(),
    checks: loadJson(CHECK_KEY, {}),
    steps: loadJson(STEPS_KEY, {}),
    classAnswers: {},
  };

  document.body.dataset.pack = packId;
  syncChrome();

  function loadJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key) || "null") || fallback;
    } catch {
      return fallback;
    }
  }

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { completed: {}, unlocked: { "m1-l1": true } };
      const parsed = JSON.parse(raw);
      if (!parsed.unlocked) parsed.unlocked = { "m1-l1": true };
      return parsed;
    } catch {
      return { completed: {}, unlocked: { "m1-l1": true } };
    }
  }

  function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
    updateGlobalProgress();
  }

  function saveChecks() {
    localStorage.setItem(CHECK_KEY, JSON.stringify(state.checks));
  }

  function saveSteps() {
    localStorage.setItem(STEPS_KEY, JSON.stringify(state.steps));
  }

  function syncChrome() {
    const brand = document.querySelector(".brand-text");
    if (brand) brand.textContent = data.brand;
    const foot = document.getElementById("footer-brand");
    if (foot) {
      foot.innerHTML =
        "<strong>" +
        escapeHtml(data.brand) +
        "</strong> — " +
        escapeHtml(data.mission);
    }
    const note = document.getElementById("footer-note");
    if (note) {
      note.innerHTML =
        "Cas fil rouge : <strong>Kalunga</strong> — Nutrition &amp; WASH. Pack actif : <strong>" +
        escapeHtml(packId === "se" ? "Expert S&E" : "Data Analyst") +
        "</strong>.";
    }
    document.title =
      data.brand + (packId === "se" ? " — Éthique & protection" : " — Éthique des données");
  }

  function allLessons() {
    return data.modules.flatMap((m) => m.lessons.map((l) => ({ ...l, moduleId: m.id })));
  }

  function getLesson(lessonId) {
    for (const mod of data.modules) {
      const lesson = mod.lessons.find((l) => l.id === lessonId);
      if (lesson) return { module: mod, lesson };
    }
    return null;
  }

  function nextLessonId(id) {
    const list = allLessons();
    const idx = list.findIndex((l) => l.id === id);
    return idx >= 0 && idx < list.length - 1 ? list[idx + 1].id : null;
  }

  function isLessonComplete(id) {
    return Boolean(state.progress.completed[id]);
  }

  function isLessonUnlocked(id) {
    if (state.progress.unlocked[id]) return true;
    const list = allLessons();
    const idx = list.findIndex((l) => l.id === id);
    if (idx <= 0) return true;
    return isLessonComplete(list[idx - 1].id);
  }

  function markLessonComplete(id) {
    state.progress.completed[id] = true;
    const next = nextLessonId(id);
    if (next) state.progress.unlocked[next] = true;
    saveProgress();
  }

  function completionRatio() {
    const list = allLessons();
    if (!list.length) return 0;
    return list.filter((l) => isLessonComplete(l.id)).length / list.length;
  }

  function updateGlobalProgress() {
    const pct = Math.round(completionRatio() * 100);
    const fill = document.getElementById("global-progress-fill");
    const value = document.getElementById("global-progress-value");
    if (fill) fill.style.width = pct + "%";
    if (value) value.textContent = pct + "%";
  }

  function setNavCurrent(view) {
    document.querySelectorAll(".site-nav button").forEach((btn) => {
      if (btn.dataset.nav === view) btn.setAttribute("aria-current", "page");
      else btn.removeAttribute("aria-current");
    });
  }

  function navigate(view, opts = {}) {
    state.view = view;
    if (opts.lessonId) state.lessonId = opts.lessonId;
    if (opts.phase) state.phase = opts.phase;
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.querySelectorAll("[data-nav]").forEach((el) => {
    el.addEventListener("click", () => navigate(el.dataset.nav));
  });

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function ph(label) {
    return `<div class="ph" aria-hidden="true">${escapeHtml(label || "Éthique")}</div>`;
  }

  function renderParagraphs(paragraphs = []) {
    return paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join("");
  }

  function renderBullets(bullets = []) {
    if (!bullets.length) return "";
    return `<ul>${bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>`;
  }

  function renderCode(code) {
    if (!code) return "";
    return `
      <div class="code-block">
        <header><span>${escapeHtml(code.label || "ethique")}</span><span>Éthique Atelier</span></header>
        <pre><code>${escapeHtml(code.lines)}</code></pre>
      </div>
      ${code.annotation ? `<p class="annotation">${escapeHtml(code.annotation)}</p>` : ""}`;
  }

  function renderAnalogy(analogy) {
    if (!analogy) return "";
    return `<aside class="analogy"><h3>${escapeHtml(analogy.title)}</h3><p>${escapeHtml(analogy.text)}</p></aside>`;
  }

  function modulesForTrack(trackId) {
    return data.modules.filter((m) => m.track === trackId);
  }

  function caseBanner() {
    const c = data.caseStudy;
    return `<div class="case-banner"><strong>Cas fil rouge :</strong> ${escapeHtml(c.name)} — ${escapeHtml(c.type)}. ${escapeHtml(c.summary)}</div>`;
  }

  function packChip() {
    return `<span class="pack-chip">${packId === "se" ? "Parcours Expert S&E" : "Parcours Data Analyst"}</span>`;
  }

  function checklistItems() {
    return packId === "se" ? Lab.checklistSe : Lab.checklistDa;
  }

  function notifyPlatformModuleComplete() {
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage(
          {
            type: "ada-module-complete",
            id: data.moduleId,
            packId: data.packId,
            source: "ethique-atelier-bilan",
          },
          "*"
        );
      }
    } catch (_) {
      /* ignore */
    }
  }

  function renderModuleCard(m) {
    const total = m.lessons.length;
    const done = m.lessons.filter((l) => isLessonComplete(l.id)).length;
    const unlocked = m.lessons.some((l) => isLessonUnlocked(l.id));
    const badge = done === total ? "badge-done" : unlocked ? "badge" : "badge-locked";
    const label = done === total ? "Terminé" : unlocked ? `${done}/${total} leçons` : "À débloquer";
    return `
      <button type="button" class="path-item" data-nav-inline="parcours">
        ${ph(m.title.split("·")[0].trim())}
        <div>
          <h3>${escapeHtml(m.title)}</h3>
          <p>${escapeHtml(m.summary)}</p>
        </div>
        <div class="path-meta">
          <span class="badge ${badge}">${label}</span>
          <span class="badge">${escapeHtml(m.level)}</span>
        </div>
      </button>`;
  }

  function renderHome() {
    const next = allLessons().find((l) => !isLessonComplete(l.id) && isLessonUnlocked(l.id));
    const cta = next ? next.id : "m1-l1";
    return `
      <section class="hero">
        <div class="hero-media">${ph(packId === "se" ? "Éthique S&E" : "Éthique DA")}</div>
        <div class="hero-content">
          <p class="hero-brand">${escapeHtml(data.brand)}</p>
          ${packChip()}
          <h1>${escapeHtml(data.heroTitle)}</h1>
          <p class="hero-lead">${escapeHtml(data.heroLead)}</p>
          <div class="hero-actions">
            <button type="button" class="btn btn-primary" data-open-lesson="${cta}">Continuer le parcours</button>
            <button type="button" class="btn btn-secondary" data-nav-inline="labo">Ouvrir le labo Éthique</button>
          </div>
        </div>
      </section>
      <div class="wrap">
        ${caseBanner()}
        <section class="home-method">
          <h2 class="section-title">Principes</h2>
          <div class="principle-list">
            ${data.method.principles
              .map((p) => `<article class="principle"><h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.text)}</p></article>`)
              .join("")}
          </div>
        </section>
        <section class="home-path">
          <h2 class="section-title">Parcours (${data.modules.length} modules)</h2>
          <div class="path-list">${modulesForTrack("socle").map(renderModuleCard).join("")}</div>
          <div class="path-list" style="margin-top:1rem">${modulesForTrack("metier").map(renderModuleCard).join("")}</div>
        </section>
      </div>`;
  }

  function renderMethode() {
    return `
      <div class="wrap">
        <div class="methode-hero">
          <div>
            <h1 class="section-title">${escapeHtml(data.method.title)}</h1>
            <p class="section-lead">${escapeHtml(data.mission)}</p>
            ${packChip()}
            <div style="margin-top:1rem">
              <button type="button" class="btn btn-dark" data-open-lesson="m1-l1">Première leçon</button>
            </div>
          </div>
          ${ph("Méthode")}
        </div>
        ${caseBanner()}
        <div class="principle-list">
          ${[...data.method.principles, ...data.method.steps.map((s) => ({ title: `${s.num} — ${s.title}`, text: s.text }))]
            .map((p) => `<article class="principle"><h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.text)}</p></article>`)
            .join("")}
        </div>
      </div>`;
  }

  function renderModuleBlock(m) {
    return `
      <section class="module-block">
        <div class="module-visual">${ph(m.title.split("·")[0].trim())}</div>
        <div class="module-body">
          <span class="badge">${escapeHtml(m.level)}</span>
          <h2>${escapeHtml(m.title)}</h2>
          <p>${escapeHtml(m.summary)}</p>
          <div class="lesson-list">
            ${m.lessons
              .map((l) => {
                const unlocked = isLessonUnlocked(l.id);
                const done = isLessonComplete(l.id);
                return `
                  <button type="button" class="lesson-row" data-open-lesson="${l.id}" ${unlocked ? "" : "disabled"}>
                    <div>
                      <strong>${escapeHtml(l.title)}</strong>
                      <span>${escapeHtml(l.goal)}</span>
                    </div>
                    <span class="badge ${done ? "badge-done" : unlocked ? "badge" : "badge-locked"}">
                      ${done ? "Validée" : unlocked ? "Disponible" : "Verrouillée"}
                    </span>
                  </button>`;
              })
              .join("")}
          </div>
        </div>
      </section>`;
  }

  function renderParcours() {
    return `
      <div class="wrap">
        <h1 class="section-title">Parcours guidé</h1>
        <p class="section-lead">${escapeHtml(data.heroLead)}</p>
        ${packChip()}
        <h2 class="section-title" style="font-size:1.5rem;margin-top:1.5rem">1. Socle éthique</h2>
        <div class="module-grid">${modulesForTrack("socle").map(renderModuleBlock).join("")}</div>
        <h2 class="section-title" style="font-size:1.5rem;margin-top:2rem">2. ${escapeHtml(
          data.tracks.find((t) => t.id === "metier").title
        )}</h2>
        <div class="module-grid">${modulesForTrack("metier").map(renderModuleBlock).join("")}</div>
      </div>`;
  }

  function checkPractice(lesson, value) {
    const p = lesson.pratiquer;
    const text = value.trim();
    if (!text) return { ok: false, message: p.fail };
    if (p.checkType === "minLines") {
      const lines = text.split(/\r?\n/).filter((l) => l.trim());
      return lines.length >= (p.minLines || 3) ? { ok: true, message: p.success } : { ok: false, message: p.fail };
    }
    if (p.checkType === "keywords") {
      const lower = text.toLowerCase();
      const ok = (p.keywords || []).every((k) => lower.includes(k.toLowerCase()));
      if (!ok) return { ok: false, message: p.fail };
      if (p.minLines) {
        const lines = text.split(/\r?\n/).filter((l) => l.trim());
        if (lines.length < p.minLines) return { ok: false, message: p.fail };
      }
      return { ok: true, message: p.success };
    }
    return { ok: true, message: p.success };
  }

  function renderLesson() {
    const found = getLesson(state.lessonId);
    if (!found) return `<div class="wrap"><p>Leçon introuvable.</p></div>`;
    if (!isLessonUnlocked(state.lessonId)) {
      return `<div class="wrap"><h1 class="section-title">Leçon verrouillée</h1><button class="btn btn-dark" data-nav-inline="parcours">Parcours</button></div>`;
    }
    const { module, lesson } = found;
    const phase = state.phase || "voir";
    const phases = [
      { id: "voir", label: "1. Voir" },
      { id: "comprendre", label: "2. Comprendre" },
      { id: "pratiquer", label: "3. Pratiquer" },
      { id: "verifier", label: "4. Vérifier" },
      { id: "retenir", label: "À retenir" },
    ];

    let body = "";
    if (phase === "voir") {
      body = `
        <p class="lesson-kicker">Voir</p>
        <h1>${escapeHtml(lesson.title)}</h1>
        <figure class="lesson-figure">${ph(lesson.caption || module.title)}<figcaption>${escapeHtml(
          lesson.caption || ""
        )}</figcaption></figure>
        <div class="prose">${renderParagraphs(lesson.voir.paragraphs)}${renderAnalogy(lesson.voir.analogy)}
          <div class="callout"><h3>Objectif</h3><p>${escapeHtml(lesson.goal)}</p></div>
        </div>
        <div class="phase-actions"><button class="btn btn-dark" data-phase="comprendre">Comprendre</button></div>`;
    } else if (phase === "comprendre") {
      body = `
        <p class="lesson-kicker">Comprendre</p>
        <h1>${escapeHtml(lesson.title)}</h1>
        <div class="prose">${renderParagraphs(lesson.comprendre.paragraphs || [])}${renderBullets(
          lesson.comprendre.bullets || []
        )}${renderCode(lesson.comprendre.code)}
        ${
          lesson.comprendre.annotation
            ? `<p class="annotation">${escapeHtml(lesson.comprendre.annotation)}</p>`
            : ""
        }</div>
        <div class="phase-actions">
          <button class="btn btn-ghost" data-phase="voir">Retour</button>
          <button class="btn btn-dark" data-phase="pratiquer">Pratiquer</button>
          <button class="btn btn-primary" data-nav-inline="labo">Labo Éthique</button>
        </div>`;
    } else if (phase === "pratiquer") {
      const s = lesson.pratiquer;
      body = `
        <p class="lesson-kicker">Pratiquer</p>
        <h1>${escapeHtml(lesson.title)}</h1>
        <div class="practice-box">
          <label for="practice-input">${escapeHtml(s.prompt)}</label>
          <textarea id="practice-input" placeholder="${escapeHtml(s.placeholder || "")}"></textarea>
          <p class="hint">Indice : ${escapeHtml(s.hint || "")}</p>
          <div class="phase-actions" style="border:0;margin-top:0.75rem;padding-top:0.75rem">
            <button class="btn btn-dark" id="check-practice">Vérifier</button>
          </div>
          <div id="practice-feedback"></div>
        </div>
        <div class="phase-actions"><button class="btn btn-primary" data-phase="verifier">Quiz</button></div>`;
    } else if (phase === "verifier") {
      const q = lesson.verifier;
      body = `
        <p class="lesson-kicker">Vérifier</p>
        <h1>Petit contrôle</h1>
        <div class="quiz-box">
          <p class="q-title">${escapeHtml(q.question)}</p>
          <div class="quiz-options">
            ${q.options
              .map((opt, i) => `<label><input type="radio" name="quiz" value="${i}" /><span>${escapeHtml(opt)}</span></label>`)
              .join("")}
          </div>
          <div class="phase-actions" style="border:0;margin-top:0.75rem;padding-top:0.75rem">
            <button class="btn btn-dark" id="check-quiz">Valider</button>
          </div>
          <div id="quiz-feedback"></div>
        </div>`;
    } else {
      body = `
        <p class="lesson-kicker">Synthèse</p>
        <h1>À retenir</h1>
        <ul class="retain-list">${lesson.retenir.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}</ul>
        <div class="phase-actions">
          <button class="btn btn-ghost" data-nav-inline="parcours">Parcours</button>
          ${
            nextLessonId(lesson.id)
              ? `<button class="btn btn-primary" data-open-lesson="${nextLessonId(lesson.id)}">Leçon suivante</button>`
              : `<button class="btn btn-primary" data-nav-inline="bilan">Quiz bilan</button>`
          }
        </div>`;
    }

    return `
      <div class="wrap">
        <p style="margin:0 0 0.75rem;color:var(--ink-soft);font-weight:600">${escapeHtml(module.title)} · ${escapeHtml(
          module.level
        )}</p>
        <div class="lesson-layout">
          <aside class="lesson-aside">
            <h2>Les quatre gestes</h2>
            <div class="phase-nav">
              ${phases
                .map(
                  (p) =>
                    `<button type="button" data-phase="${p.id}"${phase === p.id ? ' aria-current="true"' : ""}>${p.label}</button>`
                )
                .join("")}
            </div>
          </aside>
          <article class="lesson-panel">${body}</article>
        </div>
      </div>`;
  }

  function renderLabo() {
    const checks = checklistItems();
    const doneChecks = checks.filter((c) => state.checks[c.id]).length;
    const doneSteps = Lab.ethiqueSteps.filter((s) => state.steps[s.id]).length;
    const scenarios = Lab.scenariosForPack(packId);
    const answers = state.classAnswers || {};
    return `
      <div class="wrap">
        <h1 class="section-title">Labo Éthique — Kalunga</h1>
        <p class="section-lead">Classez les variables, tranchez les scénarios, cochez la checklist. ${packChip()}</p>

        <section class="studio-card">
          <h3>1. Classement de sensibilité</h3>
          <p class="hint">Publique · Interne · Sensible — puis vérifiez votre score.</p>
          <div id="class-form">
            ${Lab.variables
              .map((v) => {
                const val = answers[v.id] || "";
                return `
              <div class="check-item" style="align-items:center">
                <div style="flex:1;min-width:140px">
                  <strong>${escapeHtml(v.label)}</strong>
                  <div class="hint" style="margin:0">${escapeHtml(v.detail)}</div>
                </div>
                <select data-class="${v.id}">
                  <option value="">—</option>
                  ${Lab.levels
                    .map(
                      (lv) =>
                        `<option value="${lv.id}"${val === lv.id ? " selected" : ""}>${escapeHtml(lv.label)}</option>`
                    )
                    .join("")}
                </select>
              </div>`;
              })
              .join("")}
          </div>
          <div class="phase-actions">
            <button type="button" class="btn btn-dark" id="score-class">Vérifier le classement</button>
            <a class="btn btn-secondary" href="data/kalunga_variables.csv" download>Télécharger la liste CSV</a>
          </div>
          <div id="class-result"></div>
        </section>

        <section class="studio-card">
          <h3>2. Scénarios go / no-go</h3>
          ${scenarios
            .map(
              (s) => `
            <article class="principle" style="margin-bottom:0.75rem">
              <h3 style="margin-top:0">${escapeHtml(s.title)}</h3>
              <p>${escapeHtml(s.text)}</p>
              <div class="quiz-options">
                ${s.options
                  .map(
                    (opt, oi) =>
                      `<label><input type="radio" name="sc-${s.id}" value="${oi}" /><span>${escapeHtml(opt)}</span></label>`
                  )
                  .join("")}
              </div>
              <button type="button" class="btn btn-small btn-dark" data-check-scenario="${s.id}" style="margin-top:0.5rem">Valider</button>
              <div id="sc-fb-${s.id}"></div>
            </article>`
            )
            .join("")}
        </section>

        ${
          packId === "se"
            ? `<section class="studio-card">
          <h3>2b. Matrice indicateur × risque</h3>
          <ul>
            ${Lab.matriceSe
              .map(
                (m) =>
                  `<li><strong>${escapeHtml(m.indicateur)}</strong> — risque : ${escapeHtml(m.risque)} — <em>${escapeHtml(
                    m.decision
                  )}</em></li>`
              )
              .join("")}
          </ul>
        </section>`
            : ""
        }

        <section class="studio-card">
          <h3>3. Checklist éthique (processus)</h3>
          <p class="hint">${doneSteps}/${Lab.ethiqueSteps.length} étapes.</p>
          ${Lab.ethiqueSteps
            .map(
              (s) => `
            <label class="check-item">
              <input type="checkbox" data-step="${s.id}" ${state.steps[s.id] ? "checked" : ""} />
              <span>${escapeHtml(s.text)}</span>
            </label>`
            )
            .join("")}
        </section>

        <section class="studio-card">
          <h3>4. Checklist livrable ${packId === "se" ? "S&E" : "Data Analyst"}</h3>
          <p class="hint">${doneChecks}/${checks.length} — visez 100 % avant le quiz bilan.</p>
          ${checks
            .map(
              (c) => `
            <label class="check-item">
              <input type="checkbox" data-check="${c.id}" ${state.checks[c.id] ? "checked" : ""} />
              <span>${escapeHtml(c.text)}</span>
            </label>`
            )
            .join("")}
          <div class="phase-actions">
            <button type="button" class="btn btn-ghost" id="reset-lab-checks">Réinitialiser checklists</button>
            <button type="button" class="btn btn-primary" data-nav-inline="carnet">Ouvrir le carnet</button>
          </div>
        </section>
      </div>`;
  }


  function renderCarnet() {
    const carnet = data.carnet;
    return `
      <div class="wrap carnet-page">
        <div class="carnet-toolbar no-print">
          <div>
            <h1 class="section-title">${escapeHtml(carnet.title)}</h1>
            <p class="section-lead">${escapeHtml(carnet.subtitle)}</p>
          </div>
          <button class="btn btn-primary" id="print-carnet">Imprimer / PDF</button>
        </div>
        ${carnet.sections
          .map(
            (sec) => `
          <section class="carnet-section">
            <h2>${escapeHtml(sec.title)}</h2>
            <ol class="carnet-list">
              ${sec.exercises
                .map(
                  (ex) => `
                <li class="carnet-item">
                  <p><strong>${escapeHtml(ex.id)}.</strong> ${escapeHtml(ex.prompt)}</p>
                  <div class="carnet-lines"></div>
                </li>`
                )
                .join("")}
            </ol>
          </section>`
          )
          .join("")}
      </div>`;
  }

  function renderGlossaire() {
    return `
      <div class="wrap">
        <h1 class="section-title">Glossaire</h1>
        <dl class="glossary-grid">
          ${data.glossary
            .map((g) => `<div class="glossary-item"><dt>${escapeHtml(g.term)}</dt><dd>${escapeHtml(g.def)}</dd></div>`)
            .join("")}
        </dl>
      </div>`;
  }

  function renderBilan() {
    const bilan = data.bilan;
    let last = null;
    try {
      last = JSON.parse(localStorage.getItem(BILAN_KEY) || "null");
    } catch {
      last = null;
    }
    return `
      <div class="wrap">
        <h1 class="section-title">${escapeHtml(bilan.title)}</h1>
        <p class="section-lead">${escapeHtml(bilan.subtitle)} Seuil : ${bilan.passScore}%.</p>
        ${packChip()}
        ${last ? `<div class="bilan-last">Dernier score : <strong>${last.score}%</strong> (${last.correct}/${last.total})</div>` : ""}
        <form id="bilan-form" class="bilan-form">
          ${bilan.questions
            .map(
              (q, qi) => `
            <fieldset class="bilan-q">
              <legend><span class="bilan-num">${qi + 1}/${bilan.questions.length}</span> ${escapeHtml(q.question)}</legend>
              <p class="bilan-theme">${escapeHtml(q.themeLabel)}</p>
              <div class="quiz-options">
                ${q.options
                  .map(
                    (opt, oi) =>
                      `<label><input type="radio" name="${q.id}" value="${oi}" required /><span>${escapeHtml(opt)}</span></label>`
                  )
                  .join("")}
              </div>
            </fieldset>`
            )
            .join("")}
          <div class="phase-actions"><button type="submit" class="btn btn-primary">Corriger</button></div>
        </form>
        <div id="bilan-result"></div>
      </div>`;
  }

  function bindViewEvents() {
    main.querySelectorAll("[data-nav-inline]").forEach((btn) => {
      btn.addEventListener("click", () => navigate(btn.dataset.navInline));
    });
    main.querySelectorAll("[data-open-lesson]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.lessonId = btn.dataset.openLesson;
        state.phase = "voir";
        navigate("lesson", { lessonId: state.lessonId, phase: "voir" });
      });
    });
    main.querySelectorAll("[data-phase]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.phase = btn.dataset.phase;
        render();
      });
    });

    document.getElementById("check-practice")?.addEventListener("click", () => {
      const found = getLesson(state.lessonId);
      if (!found) return;
      const result = checkPractice(found.lesson, document.getElementById("practice-input").value);
      document.getElementById("practice-feedback").innerHTML =
        `<div class="feedback ${result.ok ? "ok" : "ko"}">${escapeHtml(result.message)}</div>`;
    });

    document.getElementById("check-quiz")?.addEventListener("click", () => {
      const found = getLesson(state.lessonId);
      if (!found) return;
      const selected = main.querySelector('input[name="quiz"]:checked');
      const box = document.getElementById("quiz-feedback");
      if (!selected) {
        box.innerHTML = `<div class="feedback ko">Choisissez une réponse.</div>`;
        return;
      }
      const ok = Number(selected.value) === found.lesson.verifier.answer;
      if (ok) {
        markLessonComplete(found.lesson.id);
        box.innerHTML = `<div class="feedback ok">Juste. ${escapeHtml(found.lesson.verifier.explain)}</div>
          <div class="phase-actions" style="border:0;padding-top:0.75rem">
            <button class="btn btn-primary" data-phase="retenir">À retenir</button>
          </div>`;
        box.querySelector("[data-phase]")?.addEventListener("click", () => {
          state.phase = "retenir";
          render();
        });
      } else {
        box.innerHTML = `<div class="feedback ko">Pas encore. ${escapeHtml(found.lesson.verifier.explain)}</div>`;
      }
    });

    document.getElementById("print-carnet")?.addEventListener("click", () => window.print());

    if (state.view === "labo") {
      main.querySelectorAll("[data-class]").forEach((sel) => {
        sel.addEventListener("change", () => {
          state.classAnswers[sel.dataset.class] = sel.value;
        });
      });
      document.getElementById("score-class")?.addEventListener("click", () => {
        main.querySelectorAll("[data-class]").forEach((sel) => {
          state.classAnswers[sel.dataset.class] = sel.value;
        });
        const result = Lab.scoreClassification(state.classAnswers);
        const box = document.getElementById("class-result");
        if (!box) return;
        box.innerHTML = `
          <div class="feedback ${result.score >= 75 ? "ok" : "ko"}">
            Score classement : <strong>${result.score}%</strong> (${result.ok}/${result.total})
          </div>
          <ul>
            ${result.details
              .map(
                (d) =>
                  `<li>${d.ok ? "✔" : "✖"} <strong>${escapeHtml(d.id)}</strong> — attendu : ${escapeHtml(
                    d.expected
                  )} · choisi : ${escapeHtml(d.chosen)}</li>`
              )
              .join("")}
          </ul>`;
      });
      main.querySelectorAll("[data-check-scenario]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.checkScenario;
          const sc = Lab.scenarios.find((x) => x.id === id);
          const selected = main.querySelector(`input[name="sc-${id}"]:checked`);
          const fb = document.getElementById("sc-fb-" + id);
          if (!sc || !fb) return;
          if (!selected) {
            fb.innerHTML = `<div class="feedback ko">Choisissez une réponse.</div>`;
            return;
          }
          const ok = Number(selected.value) === sc.answer;
          fb.innerHTML = `<div class="feedback ${ok ? "ok" : "ko"}">${ok ? "Juste." : "Pas encore."} ${escapeHtml(
            sc.explain
          )}</div>`;
        });
      });
      main.querySelectorAll("[data-check]").forEach((box) => {
        box.addEventListener("change", () => {
          state.checks[box.dataset.check] = box.checked;
          saveChecks();
        });
      });
      main.querySelectorAll("[data-step]").forEach((box) => {
        box.addEventListener("change", () => {
          state.steps[box.dataset.step] = box.checked;
          saveSteps();
        });
      });
      document.getElementById("reset-lab-checks")?.addEventListener("click", () => {
        state.checks = {};
        state.steps = {};
        state.classAnswers = {};
        saveChecks();
        saveSteps();
        render();
      });
    }

    const bilanForm = document.getElementById("bilan-form");
    if (bilanForm) {
      bilanForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const bilan = data.bilan;
        let correct = 0;
        const themes = {};
        const details = [];
        for (const q of bilan.questions) {
          if (!themes[q.theme]) themes[q.theme] = { label: q.themeLabel, ok: 0, total: 0 };
          themes[q.theme].total++;
          const val = bilanForm.elements[q.id]?.value;
          const ok = Number(val) === q.answer;
          if (ok) {
            correct++;
            themes[q.theme].ok++;
          }
          details.push({ q, ok, chosen: Number(val) });
        }
        const total = bilan.questions.length;
        const score = Math.round((correct / total) * 100);
        const passed = score >= bilan.passScore;
        localStorage.setItem(BILAN_KEY, JSON.stringify({ score, correct, total, at: Date.now() }));
        const weak = Object.values(themes)
          .filter((t) => t.ok / t.total < 0.7)
          .map((t) => t.label);
        if (passed) notifyPlatformModuleComplete();
        document.getElementById("bilan-result").innerHTML = `
          <div class="feedback ${passed ? "ok" : "ko"}">
            Score ${score}% (${correct}/${total}). ${
              passed
                ? "Module Éthique validé. Si vous êtes dans la plateforme, le module peut être marqué terminé automatiquement."
                : "Sous le seuil : revoyez le socle et le labo éthique."
            }
          </div>
          ${weak.length ? `<p class="hint">Thèmes à revoir : ${weak.map(escapeHtml).join(", ")}</p>` : ""}
          <div class="bilan-corrections">
            ${details
              .map(
                (d, i) => `
              <article class="principle">
                <h3>${i + 1}. ${escapeHtml(d.q.question)}</h3>
                <p>${d.ok ? "✔" : "✖"} Votre réponse : ${escapeHtml(d.q.options[d.chosen] || "—")}</p>
                <p>Bonne réponse : ${escapeHtml(d.q.options[d.q.answer])}</p>
                <p>${escapeHtml(d.q.explain)}</p>
              </article>`
              )
              .join("")}
          </div>`;
      });
    }
  }

  function render() {
    setNavCurrent(state.view === "lesson" ? "parcours" : state.view);
    updateGlobalProgress();
    switch (state.view) {
      case "methode":
        main.innerHTML = renderMethode();
        break;
      case "parcours":
        main.innerHTML = renderParcours();
        break;
      case "lesson":
        main.innerHTML = renderLesson();
        break;
      case "labo":
        main.innerHTML = renderLabo();
        break;
      case "carnet":
        main.innerHTML = renderCarnet();
        break;
      case "bilan":
        main.innerHTML = renderBilan();
        break;
      case "glossaire":
        main.innerHTML = renderGlossaire();
        break;
      default:
        main.innerHTML = renderHome();
    }
    bindViewEvents();
  }

  render();
})();
