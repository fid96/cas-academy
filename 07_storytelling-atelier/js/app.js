/* Storytelling Atelier — application */

(function () {
  const STORAGE_KEY = "storytelling-atelier-progress-v1";
  const NOTE_KEY = "storytelling-atelier-note-v1";
  const main = document.getElementById("main");
  const data = window.ATELIER;
  const SE = window.StoryEngine;

  let state = {
    view: "home",
    lessonId: null,
    phase: "voir",
    progress: loadProgress(),
    note: loadNote()
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

  function loadNote() {
    try {
      return (
        JSON.parse(localStorage.getItem(NOTE_KEY) || "null") || {
          titre: "Note de décision — Ventes santé",
          public: "",
          decision: "",
          constat: "",
          preuve: "",
          limite: "",
          reco: ""
        }
      );
    } catch {
      return {
        titre: "Note de décision — Ventes santé",
        public: "",
        decision: "",
        constat: "",
        preuve: "",
        limite: "",
        reco: ""
      };
    }
  }

  function saveNote() {
    localStorage.setItem(NOTE_KEY, JSON.stringify(state.note));
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
        <header><span>${escapeHtml(code.label || "story")}</span><span>Storytelling Atelier</span></header>
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
          <img src="assets/illu-analyste.jpg" alt="Présentation de résultats et décision" />
        </div>
        <div class="hero-content">
          <p class="hero-brand">Storytelling Atelier</p>
          <h1>Du chiffre à la décision.</h1>
          <p class="hero-lead">Dernière marche du pack Data Analyst : constat, preuve, limite, recommandation — pour faire agir.</p>
          <div class="hero-actions">
            <button type="button" class="btn btn-primary" data-open-lesson="${cta}">Continuer le parcours</button>
            <button type="button" class="btn btn-secondary" data-nav-inline="atelier">Ouvrir l’atelier note</button>
          </div>
        </div>
      </section>
      <div class="wrap">
        <section class="home-method">
          <h2 class="section-title">La chaîne complète</h2>
          <div class="story-chain">
            ${data.chain.map((c) => `<span>${escapeHtml(c.title)}</span>`).join("")}
          </div>
          <p class="section-lead">SQL extrait · Excel explore · Stats juge · Python automatise · Power BI montre · Storytelling décide.</p>
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
          <h2 class="section-title">Storytelling Data Analyst</h2>
          <div class="path-list">${modulesForTrack("data-analyst").map(renderModuleCard).join("")}</div>
          <h2 class="section-title" style="margin-top:2.5rem">Fondations</h2>
          <div class="path-list">${modulesForTrack("fondations").map(renderModuleCard).join("")}</div>
          <h2 class="section-title" style="margin-top:2.5rem">Pratique</h2>
          <div class="path-list">
            <button type="button" class="path-item" data-nav-inline="atelier">
              <img src="assets/illu-donnees.jpg" alt="" />
              <div><h3>Atelier note</h3><p>Construire et scorer une note de décision.</p></div>
              <div class="path-meta"><span class="badge">Studio</span></div>
            </button>
            <button type="button" class="path-item" data-nav-inline="chaine">
              <img src="assets/illu-logique.jpg" alt="" />
              <div><h3>Chaîne Data Analyst</h3><p>Place et rôle de chaque atelier.</p></div>
              <div class="path-meta"><span class="badge">Carte</span></div>
            </button>
            <button type="button" class="path-item" data-nav-inline="bilan">
              <img src="assets/illu-variables.jpg" alt="" />
              <div><h3>Quiz bilan</h3><p>Clôture du pack.</p></div>
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
            <h1 class="section-title">Méthode du récit data</h1>
            <p class="section-lead">Une décision, un message, une preuve, une limite, une action.</p>
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
        <p class="section-lead">Du cadrage à la note de décision scorée.</p>
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
    if (p.checkType === "regex") {
      try {
        return new RegExp(p.pattern, "i").test(text)
          ? { ok: true, message: p.success }
          : { ok: false, message: p.fail };
      } catch {
        return { ok: false, message: "Exercice indisponible." };
      }
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
          <button class="btn btn-primary" data-nav-inline="atelier">Atelier note</button>
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

  function renderAtelier() {
    const n = state.note;
    const score = SE.scoreNote(n);
    return `
      <div class="wrap">
        <h1 class="section-title">Atelier note de décision</h1>
        <p class="section-lead">Insérez un insight, rédigez, obtenez un score (clarté · preuve · prudence · action).</p>
        <div class="insight-pills">
          <span style="font-weight:700;align-self:center">Insights :</span>
          ${SE.INSIGHTS.map((i) => `<button type="button" data-insight="${i.id}">${escapeHtml(i.label)}</button>`).join("")}
        </div>
        <div class="note-builder">
          <label>Titre<input id="n-titre" value="${escapeHtml(n.titre)}" /></label>
          <label>Public<input id="n-public" value="${escapeHtml(n.public)}" placeholder="Ex. Coordonnateur provincial" /></label>
          <label>Décision à éclairer<input id="n-decision" value="${escapeHtml(n.decision)}" placeholder="Ex. Où prioriser l’appui logistique ?" /></label>
          <label>Constat<textarea id="n-constat" placeholder="Une phrase forte…">${escapeHtml(n.constat)}</textarea></label>
          <label>Preuve<textarea id="n-preuve" placeholder="Chiffre, n, période…">${escapeHtml(n.preuve)}</textarea></label>
          <label>Limite / prudence<textarea id="n-limite" placeholder="Ce qu’il ne faut pas sur-interpréter…">${escapeHtml(n.limite)}</textarea></label>
          <label>Recommandation<textarea id="n-reco" placeholder="Verbe d’action + objet + suivi…">${escapeHtml(n.reco)}</textarea></label>
          <div class="phase-actions" style="border:0;padding:0;margin:0">
            <button type="button" class="btn btn-dark" id="score-note">Scorer la note</button>
            <button type="button" class="btn btn-ghost" id="clear-note">Effacer</button>
            <button type="button" class="btn btn-primary" id="print-note">Imprimer / PDF</button>
          </div>
        </div>
        <div class="rubric">
          <div class="score-card"><span>Clarté</span><strong>${score.dims.clarte}</strong></div>
          <div class="score-card"><span>Preuve</span><strong>${score.dims.preuve}</strong></div>
          <div class="score-card"><span>Prudence</span><strong>${score.dims.prudence}</strong></div>
          <div class="score-card"><span>Action</span><strong>${score.dims.action}</strong></div>
          <div class="score-card"><span>Global</span><strong>${score.global}/100</strong></div>
        </div>
        ${
          score.tips.length
            ? `<p class="hint" style="margin-top:0.75rem">Pistes : ${score.tips.map(escapeHtml).join(" · ")}</p>`
            : `<p class="feedback ok" style="margin-top:0.75rem">Note solide. Objectif projet : ≥ 75.</p>`
        }
        <div class="note-preview" id="note-preview">
          ${SE.renderNoteHtml(n, escapeHtml)}
        </div>
      </div>`;
  }

  function renderChaine() {
    return `
      <div class="wrap">
        <h1 class="section-title">Chaîne Data Analyst</h1>
        <p class="section-lead">Place, rôle, et moment d’appeler chaque atelier. On en rediscutera quand vous voudrez.</p>
        <div class="story-chain">
          ${data.chain.map((c) => `<span>${escapeHtml(c.title)}</span>`).join("")}
        </div>
        <div class="principle-list">
          ${data.chain
            .map(
              (c, i) => `
            <article class="principle">
              <h3>${i + 1}. ${escapeHtml(c.title)}${c.start ? " — départ" : ""}${c.end ? " — arrivée" : ""}</h3>
              <p>${escapeHtml(c.role)}</p>
            </article>`
            )
            .join("")}
        </div>
        <div class="callout">
          <h3>Règle pratique</h3>
          <p>On commence par la question. On finit par la note de décision (storytelling), souvent appuyée par un dashboard Power BI.</p>
        </div>
        <div class="phase-actions">
          <button class="btn btn-primary" data-nav-inline="atelier">Rédiger ma note</button>
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
      last = JSON.parse(localStorage.getItem("storytelling-atelier-bilan-v1") || "null");
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
          <div class="phase-actions">
            <button type="submit" class="btn btn-primary">Corriger</button>
          </div>
        </form>
        <div id="bilan-result"></div>
      </div>`;
  }

  function readNoteFromForm() {
    state.note = {
      titre: document.getElementById("n-titre")?.value || "",
      public: document.getElementById("n-public")?.value || "",
      decision: document.getElementById("n-decision")?.value || "",
      constat: document.getElementById("n-constat")?.value || "",
      preuve: document.getElementById("n-preuve")?.value || "",
      limite: document.getElementById("n-limite")?.value || "",
      reco: document.getElementById("n-reco")?.value || ""
    };
    saveNote();
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
      const value = document.getElementById("practice-input").value;
      const result = checkPractice(found.lesson, value);
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

    if (state.view === "atelier") {
      main.querySelectorAll("[data-insight]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const insight = SE.INSIGHTS.find((i) => i.id === btn.dataset.insight);
          if (!insight) return;
          state.note.constat = insight.constat;
          state.note.preuve = insight.preuve;
          state.note.limite = insight.limite;
          state.note.reco = insight.reco;
          if (!state.note.public) state.note.public = "Coordonnateur";
          if (!state.note.decision) state.note.decision = "Où prioriser l’appui logistique / le suivi ?";
          saveNote();
          render();
        });
      });
      document.getElementById("score-note")?.addEventListener("click", () => {
        readNoteFromForm();
        render();
      });
      document.getElementById("clear-note")?.addEventListener("click", () => {
        state.note = {
          titre: "Note de décision — Ventes santé",
          public: "",
          decision: "",
          constat: "",
          preuve: "",
          limite: "",
          reco: ""
        };
        saveNote();
        render();
      });
      document.getElementById("print-note")?.addEventListener("click", () => {
        readNoteFromForm();
        window.print();
      });
      ["n-titre", "n-public", "n-decision", "n-constat", "n-preuve", "n-limite", "n-reco"].forEach((id) => {
        document.getElementById(id)?.addEventListener("change", () => {
          readNoteFromForm();
          const preview = document.getElementById("note-preview");
          if (preview) preview.innerHTML = SE.renderNoteHtml(state.note, escapeHtml);
        });
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
        localStorage.setItem(
          "storytelling-atelier-bilan-v1",
          JSON.stringify({ score, correct, total, at: Date.now() })
        );
        const weak = Object.values(themes)
          .filter((t) => t.ok / t.total < 0.7)
          .map((t) => t.label);
        document.getElementById("bilan-result").innerHTML = `
          <div class="feedback ${passed ? "ok" : "ko"}">
            Score : <strong>${score}%</strong> (${correct}/${total}) — ${
              passed ? "Pack Data Analyst bouclé côté récit." : "Sous le seuil : révisez structure et recommandations."
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
      case "atelier":
        main.innerHTML = renderAtelier();
        break;
      case "chaine":
        main.innerHTML = renderChaine();
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
