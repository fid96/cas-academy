/* Collecte Atelier — application */

(function () {
  const STORAGE_KEY = "collecte-atelier-progress-v1";
  const FORM_KEY = "collecte-atelier-form-v1";
  const main = document.getElementById("main");
  const data = window.ATELIER;
  const FE = window.FormEngine;

  let state = {
    view: "home",
    lessonId: null,
    phase: "voir",
    progress: loadProgress(),
    formTitle: "Registre ventes produits de santé",
    fields: loadFields()
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

  function loadFields() {
    try {
      const raw = localStorage.getItem(FORM_KEY);
      if (!raw) return FE.TEMPLATES.ventes.fields.map((f) => ({ ...f }));
      const parsed = JSON.parse(raw);
      return parsed.fields || FE.TEMPLATES.ventes.fields.map((f) => ({ ...f }));
    } catch {
      return FE.TEMPLATES.ventes.fields.map((f) => ({ ...f }));
    }
  }

  function saveForm() {
    localStorage.setItem(
      FORM_KEY,
      JSON.stringify({ title: state.formTitle, fields: state.fields })
    );
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
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
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
        <header><span>${escapeHtml(code.label || "collecte")}</span><span>Collecte Atelier</span></header>
        <pre><code>${escapeHtml(code.lines)}</code></pre>
      </div>
      ${code.annotation ? `<p class="annotation">${escapeHtml(code.annotation)}</p>` : ""}
    `;
  }

  function renderAnalogy(analogy) {
    if (!analogy) return "";
    return `<aside class="analogy"><h3>${escapeHtml(analogy.title)}</h3><p>${escapeHtml(analogy.text)}</p></aside>`;
  }

  function modulesForTrack(trackId) {
    return data.modules.filter((m) => m.track === trackId);
  }

  function renderModuleCard(m) {
    const total = m.lessons.length;
    const done = m.lessons.filter((l) => isLessonComplete(l.id)).length;
    const unlocked = m.lessons.some((l) => isLessonUnlocked(l.id));
    const badge = done === total ? "badge-done" : unlocked ? "badge" : "badge-locked";
    const label = done === total ? "Terminé" : unlocked ? `${done}/${total} leçons` : "À débloquer";
    return `
      <button type="button" class="path-item" data-nav-inline="parcours">
        <img src="${m.image}" alt="" />
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
        <div class="hero-media">
          <img src="assets/illu-donnees.jpg" alt="Collecte de données sur le terrain" />
        </div>
        <div class="hero-content">
          <p class="hero-brand">Collecte Atelier</p>
          <h1>La qualité commence à la source.</h1>
          <p class="hero-lead">Kobo/ODK, formulaires, contraintes, export — pour que SQL, Excel, Stats, Python et Power BI analysent juste.</p>
          <div class="hero-actions">
            <button type="button" class="btn btn-primary" data-open-lesson="${cta}">Continuer le parcours</button>
            <button type="button" class="btn btn-secondary" data-nav-inline="studio">Ouvrir le Studio formulaire</button>
          </div>
        </div>
      </section>
      <div class="wrap">
        <section class="home-method">
          <h2 class="section-title">Place dans la chaîne</h2>
          <div class="chain-mini">
            <span class="on">Collecte</span><span>SQL/Excel</span><span>Stats</span><span>Python</span><span>Power BI</span><span>Storytelling</span>
          </div>
          <div class="method-strip">
            ${data.method.steps
              .map(
                (s) => `
              <article class="method-step">
                <div class="method-num">${s.num}</div>
                <h3>${escapeHtml(s.title)}</h3>
                <p>${escapeHtml(s.text)}</p>
              </article>`
              )
              .join("")}
          </div>
        </section>
        <section class="home-path">
          <h2 class="section-title">Collecte pour Data Analyst</h2>
          <div class="path-list">${modulesForTrack("data-analyst").map(renderModuleCard).join("")}</div>
          <h2 class="section-title" style="margin-top:2.5rem">Fondations</h2>
          <div class="path-list">${modulesForTrack("fondations").map(renderModuleCard).join("")}</div>
          <h2 class="section-title" style="margin-top:2.5rem">Pratique</h2>
          <div class="path-list">
            <button type="button" class="path-item" data-nav-inline="studio">
              <img src="assets/illu-variables.jpg" alt="" />
              <div><h3>Studio formulaire</h3><p>Concevoir, contraindre, scorer, exporter.</p></div>
              <div class="path-meta"><span class="badge">Studio</span></div>
            </button>
            <button type="button" class="path-item" data-nav-inline="kobo">
              <img src="assets/illu-analyste.jpg" alt="" />
              <div><h3>Kobo / ODK</h3><p>Flux réel de collecte mobile.</p></div>
              <div class="path-meta"><span class="badge">Référence</span></div>
            </button>
            <button type="button" class="path-item" data-nav-inline="bilan">
              <img src="assets/illu-conditions.jpg" alt="" />
              <div><h3>Quiz bilan</h3><p>Valider les acquis collecte.</p></div>
              <div class="path-meta"><span class="badge">Évaluation</span></div>
            </button>
          </div>
        </section>
      </div>`;
  }

  function renderMethode() {
    return `
      <div class="wrap">
        <div class="methode-hero">
          <div>
            <h1 class="section-title">Méthode collecte</h1>
            <p class="section-lead">Penser KPI d’abord, puis variables, types, contrôles, export.</p>
            <button type="button" class="btn btn-dark" data-open-lesson="m1-l1">Première leçon</button>
          </div>
          <img src="assets/illu-logique.jpg" alt="" />
        </div>
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
        <div class="module-visual"><img src="${m.image}" alt="" /></div>
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
        <p class="section-lead">De la logique collecte jusqu’au pont vers la chaîne Data Analyst.</p>
        <h2 class="section-title" style="font-size:1.5rem">1. Fondations</h2>
        <div class="module-grid">${modulesForTrack("fondations").map(renderModuleBlock).join("")}</div>
        <h2 class="section-title" style="font-size:1.5rem;margin-top:2rem">2. Data Analyst</h2>
        <div class="module-grid">${modulesForTrack("data-analyst").map(renderModuleBlock).join("")}</div>
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
      { id: "retenir", label: "À retenir" }
    ];

    let body = "";
    if (phase === "voir") {
      body = `
        <p class="lesson-kicker">Voir</p>
        <h1>${escapeHtml(lesson.title)}</h1>
        <figure class="lesson-figure"><img src="${lesson.image}" alt="" /><figcaption>${escapeHtml(lesson.caption || "")}</figcaption></figure>
        <div class="prose">${renderParagraphs(lesson.voir.paragraphs)}${renderAnalogy(lesson.voir.analogy)}
          <div class="callout"><h3>Objectif</h3><p>${escapeHtml(lesson.goal)}</p></div>
        </div>
        <div class="phase-actions"><button class="btn btn-dark" data-phase="comprendre">Comprendre</button></div>`;
    } else if (phase === "comprendre") {
      body = `
        <p class="lesson-kicker">Comprendre</p>
        <h1>${escapeHtml(lesson.title)}</h1>
        <div class="prose">${renderParagraphs(lesson.comprendre.paragraphs || [])}${renderBullets(lesson.comprendre.bullets || [])}${renderCode(lesson.comprendre.code)}</div>
        <div class="phase-actions">
          <button class="btn btn-ghost" data-phase="voir">Retour</button>
          <button class="btn btn-dark" data-phase="pratiquer">Pratiquer</button>
          <button class="btn btn-primary" data-nav-inline="studio">Studio formulaire</button>
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

  function typeOptions(selected) {
    return FE.FIELD_TYPES.map(
      (t) => `<option value="${t.id}"${t.id === selected ? " selected" : ""}>${escapeHtml(t.label)}</option>`
    ).join("");
  }

  function renderStudio() {
    const scored = FE.scoreForm(state.fields);
    const header = FE.toCsvHeader(state.fields);
    return `
      <div class="wrap">
        <h1 class="section-title">Studio formulaire</h1>
        <p class="section-lead">Esprit Kobo/ODK : name, label, type, required, constraint. Objectif projet : score ≥ 80.</p>
        <div class="phase-actions" style="border:0;padding-top:0;margin-top:0">
          <button type="button" class="btn btn-small btn-dark" data-template="ventes">Modèle Ventes</button>
          <button type="button" class="btn btn-small btn-ghost" data-template="stock">Modèle Stock</button>
          <button type="button" class="btn btn-small btn-ghost" id="add-field">+ Champ</button>
        </div>
        <label style="display:block;margin:0.75rem 0;font-weight:700">Titre du formulaire
          <input id="form-title" style="width:100%;margin-top:0.35rem;padding:0.65rem 0.75rem;border-radius:10px;border:1px solid #c5d4df;font:inherit" value="${escapeHtml(state.formTitle)}" />
        </label>
        <div class="form-studio">
          <div class="form-panel">
            <h3 style="margin-top:0">Champs</h3>
            <div class="field-row" style="font-size:0.75rem;font-weight:700;color:#5a7184">
              <span>name</span><span>label</span><span>type / contrainte</span><span></span>
            </div>
            <div id="fields-editor">
              ${state.fields
                .map(
                  (f, i) => `
                <div class="field-row" data-index="${i}">
                  <input data-k="name" value="${escapeHtml(f.name)}" placeholder="name" />
                  <input data-k="label" value="${escapeHtml(f.label)}" placeholder="label" />
                  <div>
                    <select data-k="type">${typeOptions(f.type)}</select>
                    <input data-k="constraint" value="${escapeHtml(f.constraint || "")}" placeholder="constraint / choix a|b" style="margin-top:0.3rem" />
                    <label style="font-size:0.8rem;font-weight:600"><input type="checkbox" data-k="required" ${f.required ? "checked" : ""}/> required</label>
                  </div>
                  <button type="button" class="btn btn-small btn-ghost" data-del="${i}">✕</button>
                </div>`
                )
                .join("")}
            </div>
            <div class="phase-actions">
              <button type="button" class="btn btn-dark" id="save-score">Enregistrer & scorer</button>
            </div>
            <div class="callout">
              <h3>Score formulaire : ${scored.score}/100</h3>
              <ul class="quality-list">${scored.tips.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>
            </div>
          </div>
          <div class="preview-panel">
            <h3 style="margin-top:0">Aperçu enquêteur</h3>
            ${state.fields
              .map(
                (f) => `
              <div class="preview-q">
                <div class="name">${escapeHtml(f.name)} · ${escapeHtml(f.type)}${f.required ? " · required" : ""}</div>
                <strong>${escapeHtml(f.label || "(sans label)")}</strong>
                ${f.constraint ? `<p class="hint">Règle : ${escapeHtml(f.constraint)}</p>` : ""}
              </div>`
              )
              .join("")}
            <h3>Export CSV (en-tête)</h3>
            <pre style="white-space:pre-wrap;background:#122633;color:#d7e8f2;padding:0.75rem;border-radius:10px;font-size:0.8rem">${escapeHtml(header || "(vide)")}</pre>
            <p class="hint">Ensuite : Excel / Python / Power BI / SQL selon le besoin.</p>
            <button type="button" class="btn btn-primary btn-small" id="download-xlsform">Télécharger squelette XLSForm (CSV)</button>
          </div>
        </div>
      </div>`;
  }

  function renderKobo() {
    return `
      <div class="wrap">
        <h1 class="section-title">Kobo / ODK</h1>
        <p class="section-lead">Outils réels de collecte mobile. L’atelier enseigne la logique ; le déploiement se fait sur KoboToolbox (ou équivalent).</p>
        <div class="principle-list">
          ${data.koboSteps.map((s) => `<article class="principle"><h3>${escapeHtml(s.title)}</h3><p>${escapeHtml(s.text)}</p></article>`).join("")}
        </div>
        <div class="callout">
          <h3>Pour aller sur le vrai outil</h3>
          <p>Créez un compte sur <strong>kf.kobotoolbox.org</strong> (ou votre serveur org), reproduisez les champs du Studio, déployez, testez 10 soumissions, exportez CSV, puis enchaînez Excel/Power BI.</p>
        </div>
        <div class="phase-actions">
          <button class="btn btn-primary" data-nav-inline="studio">Concevoir dans le Studio</button>
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
      last = JSON.parse(localStorage.getItem("collecte-atelier-bilan-v1") || "null");
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

  function readFieldsFromDom() {
    const title = document.getElementById("form-title");
    if (title) state.formTitle = title.value;
    const rows = [...main.querySelectorAll(".field-row[data-index]")];
    state.fields = rows.map((row) => {
      const get = (k) => row.querySelector(`[data-k="${k}"]`);
      return {
        name: get("name")?.value.trim() || "",
        label: get("label")?.value.trim() || "",
        type: get("type")?.value || "text",
        constraint: get("constraint")?.value.trim() || "",
        required: Boolean(get("required")?.checked)
      };
    });
    saveForm();
  }

  function downloadXlsForm() {
    readFieldsFromDom();
    const rows = FE.toXlsFormRows(state.fields, state.formTitle);
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "formulaire_survey_apercu.csv";
    a.click();
    URL.revokeObjectURL(a.href);
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

    if (state.view === "studio") {
      main.querySelectorAll("[data-template]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const t = FE.TEMPLATES[btn.dataset.template];
          state.formTitle = t.title;
          state.fields = t.fields.map((f) => ({ ...f }));
          saveForm();
          render();
        });
      });
      document.getElementById("add-field")?.addEventListener("click", () => {
        readFieldsFromDom();
        state.fields.push({
          name: "nouveau_champ",
          label: "Nouveau champ",
          type: "text",
          required: false,
          constraint: ""
        });
        saveForm();
        render();
      });
      main.querySelectorAll("[data-del]").forEach((btn) => {
        btn.addEventListener("click", () => {
          readFieldsFromDom();
          state.fields.splice(Number(btn.dataset.del), 1);
          saveForm();
          render();
        });
      });
      document.getElementById("save-score")?.addEventListener("click", () => {
        readFieldsFromDom();
        render();
      });
      document.getElementById("download-xlsform")?.addEventListener("click", downloadXlsForm);
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
        localStorage.setItem(
          "collecte-atelier-bilan-v1",
          JSON.stringify({ score, correct, total, at: Date.now() })
        );
        const weak = Object.values(themes)
          .filter((t) => t.ok / t.total < 0.7)
          .map((t) => t.label);
        document.getElementById("bilan-result").innerHTML = `
          <div class="feedback ${passed ? "ok" : "ko"}">
            Score : <strong>${score}%</strong> (${correct}/${total}) — ${
              passed ? "Collecte maîtrisée pour un DA terrain." : "Sous le seuil : revoyez types et contraintes."
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
      case "studio":
        main.innerHTML = renderStudio();
        break;
      case "kobo":
        main.innerHTML = renderKobo();
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
