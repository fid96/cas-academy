/* Atelier S&E — application */

(function () {
  const STORAGE_KEY = "se-atelier-progress-v1";
  const CHECK_KEY = "se-atelier-dossier-v1";
  const BILAN_KEY = "se-atelier-bilan-v1";
  const main = document.getElementById("main");
  const data = window.ATELIER;
  const Lab = window.SELab;

  let state = {
    view: "home",
    lessonId: null,
    phase: "voir",
    progress: loadProgress(),
    checks: loadChecks(),
  };

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

  function loadChecks() {
    try {
      return JSON.parse(localStorage.getItem(CHECK_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function saveChecks() {
    localStorage.setItem(CHECK_KEY, JSON.stringify(state.checks));
  }

  function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
    updateGlobalProgress();
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
    return `<div class="ph" aria-hidden="true">${escapeHtml(label || "S&E")}</div>`;
  }

  function renderParagraphs(paragraphs = []) {
    return paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join("");
  }

  function renderBullets(bullets = []) {
    if (!bullets.length) return "";
    return `<ul>${bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>`;
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
        <div class="hero-media">${ph("Expert S&E")}</div>
        <div class="hero-content">
          <p class="hero-brand">Atelier S&amp;E</p>
          <h1>Devenir Expert S&amp;E opérationnel standard.</h1>
          <p class="hero-lead">${escapeHtml(data.mission)} Les outils servent le système — pas l’inverse.</p>
          <div class="hero-actions">
            <button type="button" class="btn btn-primary" data-open-lesson="${cta}">Continuer le parcours</button>
            <button type="button" class="btn btn-secondary" data-nav-inline="studio">Ouvrir le studio</button>
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
          <div class="path-list">${data.modules.map(renderModuleCard).join("")}</div>
        </section>
      </div>`;
  }

  function renderMethode() {
    return `
      <div class="wrap">
        <div class="methode-hero">
          <div>
            <h1 class="section-title">${escapeHtml(data.method.title)}</h1>
            <p class="section-lead">Voir → Comprendre → Pratiquer → Vérifier — pour un S&amp;E utile au pilotage.</p>
            <button type="button" class="btn btn-dark" data-open-lesson="m1-l1">Première leçon</button>
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
        <h1 class="section-title">Parcours Expert S&amp;E</h1>
        <p class="section-lead">${data.modules.length} modules — maîtrise junior, exercice Kalunga + transfert secteur.</p>
        ${caseBanner()}
        <h2 class="section-title" style="font-size:1.5rem">1. Fondations</h2>
        <div class="module-grid">${modulesForTrack("fondations").map(renderModuleBlock).join("")}</div>
        <h2 class="section-title" style="font-size:1.5rem;margin-top:2rem">2. Opérationnel</h2>
        <div class="module-grid">${modulesForTrack("operationnel").map(renderModuleBlock).join("")}</div>
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
      const ok = (p.keywords || []).every((k) => lower.includes(String(k).toLowerCase()));
      return ok ? { ok: true, message: p.success } : { ok: false, message: p.fail };
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
        <figure class="lesson-figure">${ph(lesson.caption || module.title)}<figcaption>${escapeHtml(lesson.caption || "")}</figcaption></figure>
        <div class="prose">${renderParagraphs(lesson.voir.paragraphs)}${renderAnalogy(lesson.voir.analogy)}
          <div class="callout"><h3>Objectif</h3><p>${escapeHtml(lesson.goal)}</p></div>
        </div>
        <div class="phase-actions"><button class="btn btn-dark" data-phase="comprendre">Comprendre</button></div>`;
    } else if (phase === "comprendre") {
      body = `
        <p class="lesson-kicker">Comprendre</p>
        <h1>${escapeHtml(lesson.title)}</h1>
        <div class="prose">${renderParagraphs(lesson.comprendre.paragraphs || [])}${renderBullets(lesson.comprendre.bullets || [])}</div>
        <div class="phase-actions">
          <button class="btn btn-ghost" data-phase="voir">Retour</button>
          <button class="btn btn-dark" data-phase="pratiquer">Pratiquer</button>
          <button class="btn btn-primary" data-nav-inline="studio">Studio S&amp;E</button>
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
            ${q.options.map((opt, i) => `<label><input type="radio" name="quiz" value="${i}" /><span>${escapeHtml(opt)}</span></label>`).join("")}
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
        <p style="margin:0 0 0.75rem;color:var(--ink-soft);font-weight:600">${escapeHtml(module.title)} · ${escapeHtml(module.level)}</p>
        <div class="lesson-layout">
          <aside class="lesson-aside">
            <h2>Les quatre gestes</h2>
            <div class="phase-nav">
              ${phases.map((p) => `<button type="button" data-phase="${p.id}"${phase === p.id ? ' aria-current="true"' : ""}>${p.label}</button>`).join("")}
            </div>
          </aside>
          <article class="lesson-panel">${body}</article>
        </div>
      </div>`;
  }

  function renderStudio() {
    return `
      <div class="wrap">
        <h1 class="section-title">Studio S&amp;E</h1>
        <p class="section-lead">Trames prêtes à copier pour bâtir le dossier Kalunga (puis à transférer à d’autres projets).</p>
        ${caseBanner()}
        ${Lab.templates
          .map(
            (t) => `
          <article class="studio-card">
            <h3>${escapeHtml(t.title)}</h3>
            <pre id="tpl-${t.id}">${escapeHtml(t.body)}</pre>
            <button type="button" class="btn btn-small btn-dark" data-copy="${t.id}">Copier la trame</button>
          </article>`
          )
          .join("")}
      </div>`;
  }

  function renderDonnees() {
    return `
      <div class="wrap">
        <h1 class="section-title">Données Kalunga — atelier QC</h1>
        <p class="section-lead">Jeux de données fictifs volontairement « sales ». Chargez, lancez le QC, documentez les anomalies.</p>
        ${caseBanner()}
        <div class="lab-selects" style="display:flex;flex-wrap:wrap;gap:0.6rem;margin:0.75rem 0 1rem">
          <label>Jeu
            <select id="dataset-select">
              ${Lab.datasets
                .map((d) => `<option value="${d.id}">${escapeHtml(d.title)}</option>`)
                .join("")}
            </select>
          </label>
          <button type="button" class="btn btn-dark" id="run-qc">Charger &amp; QC</button>
          <a class="btn btn-ghost" id="dl-csv" href="data/kalunga_nutrition_mensuel.csv" download>Télécharger CSV</a>
        </div>
        <div id="qc-hints" class="callout"></div>
        <div id="qc-table" style="overflow:auto;margin:1rem 0"></div>
        <div id="qc-issues"></div>
      </div>`;
  }

  async function runQc() {
    const id = document.getElementById("dataset-select")?.value || "nutrition";
    const ds = Lab.datasets.find((d) => d.id === id) || Lab.datasets[0];
    const hints = document.getElementById("qc-hints");
    const tableBox = document.getElementById("qc-table");
    const issuesBox = document.getElementById("qc-issues");
    const dl = document.getElementById("dl-csv");
    if (dl) dl.href = ds.path;
    if (hints) {
      hints.innerHTML = `<h3>Pistes QC</h3><ul>${ds.hints.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}</ul>`;
    }
    try {
      const res = await fetch(ds.path);
      const text = await res.text();
      const parsed = Lab.parseCsv(text);
      tableBox.innerHTML = `
        <table class="data-table" style="width:100%;border-collapse:collapse;font-size:0.85rem">
          <thead><tr>${parsed.headers.map((h) => `<th style="text-align:left;border-bottom:1px solid #c5d4df;padding:0.35rem">${escapeHtml(h)}</th>`).join("")}</tr></thead>
          <tbody>
            ${parsed.rows
              .map(
                (r) =>
                  `<tr>${parsed.headers.map((h) => `<td style="padding:0.35rem;border-bottom:1px solid #e6eef3">${escapeHtml(r[h])}</td>`).join("")}</tr>`
              )
              .join("")}
          </tbody>
        </table>`;
      const issues = id === "wash" ? Lab.qcWash(parsed.rows) : Lab.qcNutrition(parsed.rows);
      issuesBox.innerHTML = `
        <div class="principle" style="padding:1rem">
          <h3 style="margin-top:0">${issues.length} anomalie(s) détectée(s)</h3>
          <ul>
            ${issues.map((x) => `<li><strong>${escapeHtml(x.type)}</strong> · ligne ${escapeHtml(String(x.row))} · ${escapeHtml(x.detail)}</li>`).join("")}
          </ul>
          <p class="hint">Journalisez vos corrections dans le carnet / checklist dossier avant tout reporting.</p>
        </div>`;
    } catch (err) {
      issuesBox.innerHTML = `<div class="feedback ko">Impossible de charger ${escapeHtml(ds.path)}. Lancez via un serveur local (python -m http.server).</div>`;
    }
  }

  function notifyPlatformPackComplete() {
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage(
          {
            type: "ada-pack-complete",
            packId: "se",
            source: "se-atelier-bilan",
          },
          "*"
        );
      }
    } catch (_) {
      /* ignore */
    }
  }

  function renderDossier() {
    const total = Lab.checklist.length;
    const done = Lab.checklist.filter((c) => state.checks[c.id]).length;
    return `
      <div class="wrap">
        <h1 class="section-title">Checklist dossier S&amp;E</h1>
        <p class="section-lead">${done}/${total} pièces — visez un dossier défendable, pas un classeur cosmétique.</p>
        <div class="principle" style="padding:1rem">
          ${Lab.checklist
            .map(
              (c) => `
            <label class="check-item">
              <input type="checkbox" data-check="${c.id}" ${state.checks[c.id] ? "checked" : ""} />
              <span>${escapeHtml(c.text)}</span>
            </label>`
            )
            .join("")}
        </div>
        <div class="phase-actions">
          <button type="button" class="btn btn-ghost" id="reset-checks">Réinitialiser</button>
          <button type="button" class="btn btn-primary" data-nav-inline="studio">Retour studio</button>
        </div>
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

    main.querySelectorAll("[data-copy]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const pre = document.getElementById("tpl-" + btn.dataset.copy);
        if (!pre) return;
        try {
          await navigator.clipboard.writeText(pre.textContent);
          btn.textContent = "Copié ✔";
          setTimeout(() => {
            btn.textContent = "Copier la trame";
          }, 1200);
        } catch {
          btn.textContent = "Sélectionnez manuellement";
        }
      });
    });

    if (state.view === "donnees") {
      document.getElementById("run-qc")?.addEventListener("click", () => runQc());
      document.getElementById("dataset-select")?.addEventListener("change", () => {
        const id = document.getElementById("dataset-select").value;
        const ds = Lab.datasets.find((d) => d.id === id);
        const dl = document.getElementById("dl-csv");
        if (ds && dl) dl.href = ds.path;
      });
    }

    if (state.view === "dossier") {
      main.querySelectorAll("[data-check]").forEach((box) => {
        box.addEventListener("change", () => {
          state.checks[box.dataset.check] = box.checked;
          saveChecks();
          render();
        });
      });
      document.getElementById("reset-checks")?.addEventListener("click", () => {
        state.checks = {};
        saveChecks();
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
        if (passed) notifyPlatformPackComplete();
        document.getElementById("bilan-result").innerHTML = `
          <div class="feedback ${passed ? "ok" : "ko"}">
            Score ${score}% (${correct}/${total}). ${
              passed
                ? "Profil Expert S&E : bases validées. Si vous êtes dans la plateforme, le pack peut être marqué terminé automatiquement."
                : "Sous le seuil : revoyez les modules concernés."
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
      case "studio":
        main.innerHTML = renderStudio();
        break;
      case "donnees":
        main.innerHTML = renderDonnees();
        break;
      case "dossier":
        main.innerHTML = renderDossier();
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
