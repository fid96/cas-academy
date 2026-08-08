/* SQL Atelier — application */

(function () {
  const STORAGE_KEY = "sql-atelier-progress-v1";
  const main = document.getElementById("main");
  const data = window.ATELIER;

  let state = {
    view: "home",
    lessonId: null,
    phase: "voir",
    progress: loadProgress()
  };

  let sqlReady = false;

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
        <header><span>${escapeHtml(code.label || "sql")}</span><span>SQL Atelier</span></header>
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
          <img src="assets/illu-analyste.jpg" alt="Analyse de données et tableaux" />
        </div>
        <div class="hero-content">
          <p class="hero-brand">SQL Atelier</p>
          <h1>Devenir un Data Analyst SQL, depuis zéro.</h1>
          <p class="hero-lead">Tables, filtres, agrégations, jointures et décisions — avec une base métier intégrée.</p>
          <div class="hero-actions">
            <button type="button" class="btn btn-primary" data-open-lesson="${cta}">Continuer le parcours</button>
            <button type="button" class="btn btn-secondary" data-nav-inline="playground">Ouvrir l’atelier SQL</button>
          </div>
        </div>
      </section>
      <div class="wrap">
        <section class="home-method">
          <h2 class="section-title">Voir → Comprendre → Pratiquer → Vérifier</h2>
          <p class="section-lead">Même exigence pédagogique que Python Atelier : le métier Data Analyst, pas un bonus.</p>
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
          <h2 class="section-title">Parcours Data Analyst SQL</h2>
          <div class="path-list">${modulesForTrack("data-analyst").map(renderModuleCard).join("")}</div>
          <h2 class="section-title" style="margin-top:2.5rem">Fondations SQL</h2>
          <div class="path-list">${modulesForTrack("fondations").map(renderModuleCard).join("")}</div>
          <h2 class="section-title" style="margin-top:2.5rem">Évaluation</h2>
          <div class="path-list">
            <button type="button" class="path-item" data-nav-inline="bilan">
              <img src="assets/illu-variables.jpg" alt="" />
              <div><h3>Quiz bilan (20 questions)</h3><p>Score, thèmes faibles, correction.</p></div>
              <div class="path-meta"><span class="badge">Évaluation</span></div>
            </button>
            <button type="button" class="path-item" data-nav-inline="schema">
              <img src="assets/illu-donnees.jpg" alt="" />
              <div><h3>Schéma de la base</h3><p>Tables ventes & clients prêtes à interroger.</p></div>
              <div class="path-meta"><span class="badge">Référence</span></div>
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
            <h1 class="section-title">La méthode de l’atelier</h1>
            <p class="section-lead">SQL pour décider : question métier, schéma, requête, contrôle, recommandation.</p>
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
        <p class="section-lead">Fondations puis Data Analyst SQL. Chaque quiz ouvre la leçon suivante.</p>
        <h2 class="section-title" style="font-size:1.5rem">1. Fondations</h2>
        <div class="module-grid">${modulesForTrack("fondations").map(renderModuleBlock).join("")}</div>
        <h2 class="section-title" style="font-size:1.5rem;margin-top:2rem">2. Data Analyst SQL</h2>
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
          <button class="btn btn-primary" data-nav-inline="playground">Tester dans Atelier SQL</button>
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

  function renderResultTable(result) {
    if (result.empty) return `<p class="hint">Requête vide.</p>`;
    if (!result.columns.length) {
      return `<p class="feedback ok">Requête exécutée. Lignes modifiées : ${result.changes}</p>`;
    }
    const head = result.columns.map((c) => `<th>${escapeHtml(c)}</th>`).join("");
    const body = result.rows
      .slice(0, 100)
      .map(
        (row) =>
          `<tr>${row.map((cell) => `<td>${cell === null ? "<em>NULL</em>" : escapeHtml(String(cell))}</td>`).join("")}</tr>`
      )
      .join("");
    const more =
      result.rows.length > 100
        ? `<p class="hint">Affichage des 100 premières lignes sur ${result.rows.length}.</p>`
        : "";
    return `<div class="sql-table-wrap"><table class="sql-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>${more}`;
  }

  function renderPlayground() {
    return `
      <div class="wrap">
        <h1 class="section-title">Atelier SQL</h1>
        <p class="section-lead">Base SQLite intégrée (ventes, clients). Exécutez avec le bouton ou <strong>Ctrl+Entrée</strong>.</p>
        <div class="playground-help">
          <span><strong>Ctrl</strong>+<strong>Entrée</strong> : exécuter</span>
          <span>Exemples prêts à droite</span>
          <span>Erreurs expliquées en français</span>
        </div>
        <div class="playground">
          <div class="pane">
            <header>
              <span>Éditeur SQL</span>
              <span>
                <button type="button" class="btn btn-small btn-ghost" id="sql-reset">Réinitialiser la base</button>
                <button type="button" class="btn btn-small btn-dark" id="run-sql">Exécuter <kbd>Ctrl</kbd>+<kbd>Entrée</kbd></button>
              </span>
            </header>
            <textarea id="sql-code" spellcheck="false">SELECT ville, SUM(montant_cdf) AS total
FROM ventes
GROUP BY ville
ORDER BY total DESC;</textarea>
          </div>
          <div class="pane">
            <header><span>Résultat</span><span id="sql-status">Chargement…</span></header>
            <div id="sql-teacher"></div>
            <div id="sql-output" style="padding:1rem;overflow:auto;min-height:280px;background:#0b1a24;color:#d7e8f2;font-family:var(--font-mono);font-size:0.85rem"></div>
          </div>
        </div>
        <div class="sql-examples">
          <h3>Exemples</h3>
          <button type="button" class="btn btn-ghost btn-small" data-sql="SELECT * FROM ventes LIMIT 5;">Aperçu ventes</button>
          <button type="button" class="btn btn-ghost btn-small" data-sql="SELECT * FROM clients;">Clients</button>
          <button type="button" class="btn btn-ghost btn-small" data-sql="SELECT * FROM ventes WHERE quantite IS NULL;">NULL quantite</button>
          <button type="button" class="btn btn-ghost btn-small" data-sql="SELECT v.ville, c.type_client, v.montant_cdf\nFROM ventes v\nJOIN clients c ON v.client_id = c.client_id\nLIMIT 10;">JOIN</button>
          <button type="button" class="btn btn-ghost btn-small" data-sql="SELECT ville, SUM(montant_cdf) AS total FROM ventes GROUP BY ville HAVING SUM(montant_cdf) > 1000000 ORDER BY total DESC;">HAVING</button>
          <button type="button" class="btn btn-ghost btn-small" data-sql="WITH totaux AS (SELECT ville, SUM(montant_cdf) AS total FROM ventes GROUP BY ville) SELECT * FROM totaux ORDER BY total DESC;">CTE</button>
          <button type="button" class="btn btn-ghost btn-small" data-sql="SELECT date, ville, montant_cdf, RANK() OVER (ORDER BY montant_cdf DESC) AS rang FROM ventes ORDER BY rang LIMIT 10;">RANK</button>
        </div>
      </div>`;
  }

  function renderSchema() {
    if (!sqlReady) {
      return `<div class="wrap"><h1 class="section-title">Schéma</h1><p class="section-lead">Chargement de la base…</p></div>`;
    }
    const tables = window.SqlEngine.tablesInfo();
    return `
      <div class="wrap">
        <h1 class="section-title">Schéma de la base</h1>
        <p class="section-lead">SQLite pédagogique — mêmes données métier que Python Atelier.</p>
        <div class="module-grid">
          ${tables
            .map((t) => {
              const cols = window.SqlEngine.columnsInfo(t);
              return `
                <section class="principle">
                  <h3>Table <code>${escapeHtml(t)}</code></h3>
                  <ul>
                    ${cols
                      .map(
                        (c) =>
                          `<li><code>${escapeHtml(c.name)}</code> · ${escapeHtml(c.type || "?")}${c.pk ? " · PK" : ""}${c.notnull ? " · NOT NULL" : ""}</li>`
                      )
                      .join("")}
                  </ul>
                </section>`;
            })
            .join("")}
        </div>
        <div class="phase-actions">
          <button class="btn btn-primary" data-nav-inline="playground">Interroger la base</button>
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
      last = JSON.parse(localStorage.getItem("sql-atelier-bilan-v1") || "null");
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

  async function bootSql() {
    const wasReady = sqlReady;
    try {
      await window.SqlEngine.ensureReady();
      sqlReady = true;
      const status = document.getElementById("sql-status");
      if (status) status.textContent = "Prêt";
      // Re-render schema only once after the engine becomes ready (avoid infinite loop).
      if (state.view === "schema" && !wasReady) render();
    } catch (err) {
      sqlReady = false;
      const status = document.getElementById("sql-status");
      if (status) status.textContent = "Hors ligne";
      const out = document.getElementById("sql-output");
      if (out) {
        out.textContent =
          "Impossible de charger le moteur SQLite (réseau). Réessayez en ligne.\n" +
          (err.message || "");
      }
      if (state.view === "schema" && !wasReady) {
        main.innerHTML = `
          <div class="wrap">
            <h1 class="section-title">Schéma</h1>
            <p class="section-lead">Impossible de charger la base (connexion Internet nécessaire au premier chargement).</p>
            <p class="feedback ko">${escapeHtml(err.message || "Erreur réseau")}</p>
            <div class="phase-actions">
              <button class="btn btn-primary" type="button" id="retry-sql">Réessayer</button>
            </div>
          </div>`;
        document.getElementById("retry-sql")?.addEventListener("click", () => {
          bootSql();
        });
      }
    }
  }

  function runSql() {
    const code = document.getElementById("sql-code");
    const out = document.getElementById("sql-output");
    const teacher = document.getElementById("sql-teacher");
    const status = document.getElementById("sql-status");
    if (!code || !out) return;
    teacher.innerHTML = "";
    if (!sqlReady) {
      out.textContent = "Base encore en chargement…";
      return;
    }
    try {
      status.textContent = "Exécution…";
      const result = window.SqlEngine.run(code.value);
      out.innerHTML = renderResultTable(result);
      status.textContent = result.columns.length
        ? `${result.rows.length} ligne(s)`
        : "OK";
    } catch (err) {
      status.textContent = "À corriger";
      const exp = err.explained || window.SqlEngine.explainSqlError(err.message);
      teacher.innerHTML = `
        <div class="teacher-card" style="margin:0.75rem">
          <p class="teacher-kicker">Le professeur explique</p>
          <h3>${escapeHtml(exp.title)}</h3>
          <div class="teacher-grid">
            <div><h4>Le problème</h4><p>${escapeHtml(exp.problem)}</p></div>
            <div><h4>Pourquoi</h4><p>${escapeHtml(exp.why)}</p></div>
            <div><h4>Comment corriger</h4><p>${escapeHtml(exp.fix)}</p></div>
          </div>
          <details class="teacher-details"><summary>Détail technique</summary><pre>${escapeHtml(exp.technical || "")}</pre></details>
        </div>`;
      out.textContent = "Corrigez la requête puis réexécutez (Ctrl+Entrée).";
    }
  }

  function bindViewEvents() {
    main.querySelectorAll("[data-nav-inline]").forEach((btn) => {
      btn.addEventListener("click", () => navigate(btn.dataset.navInline));
    });
    main.querySelectorAll("[data-open-lesson]").forEach((btn) => {
      btn.addEventListener("click", () => navigate("lesson", { lessonId: btn.dataset.openLesson, phase: "voir" }));
    });
    main.querySelectorAll("[data-phase]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.phase = btn.dataset.phase;
        render();
      });
    });

    const checkPractice = document.getElementById("check-practice");
    if (checkPractice) {
      checkPractice.addEventListener("click", () => {
        const found = getLesson(state.lessonId);
        if (!found) return;
        const value = document.getElementById("practice-input").value;
        const result = checkPracticeLesson(found.lesson, value);
        document.getElementById("practice-feedback").innerHTML =
          `<div class="feedback ${result.ok ? "ok" : "ko"}">${escapeHtml(result.message)}</div>`;
      });
    }

    const checkQuiz = document.getElementById("check-quiz");
    if (checkQuiz) {
      checkQuiz.addEventListener("click", () => {
        const found = getLesson(state.lessonId);
        if (!found) return;
        const selected = main.querySelector('input[name="quiz"]:checked');
        const box = document.getElementById("quiz-feedback");
        if (!selected) {
          box.innerHTML = `<div class="feedback ko">Choisissez une réponse.</div>`;
          return;
        }
        const q = found.lesson.verifier;
        const ok = Number(selected.value) === q.answer;
        if (ok) {
          markLessonComplete(found.lesson.id);
          box.innerHTML = `
            <div class="feedback ok">${escapeHtml(q.explainOk)}</div>
            <div class="phase-actions" style="border:0;margin-top:0.8rem;padding-top:0">
              <button class="btn btn-primary" data-phase="retenir">Synthèse</button>
            </div>`;
          box.querySelector("[data-phase]").addEventListener("click", () => {
            state.phase = "retenir";
            render();
          });
        } else {
          box.innerHTML = `<div class="feedback ko">${escapeHtml(q.explainKo)}</div>`;
        }
      });
    }

    const runBtn = document.getElementById("run-sql");
    if (runBtn) runBtn.addEventListener("click", runSql);
    const resetBtn = document.getElementById("sql-reset");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (!sqlReady) return;
        window.SqlEngine.reset();
        document.getElementById("sql-status").textContent = "Base réinitialisée";
        document.getElementById("sql-output").textContent = "Base remise à zéro (ventes + clients).";
        document.getElementById("sql-teacher").innerHTML = "";
      });
    }
    main.querySelectorAll("[data-sql]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const area = document.getElementById("sql-code");
        if (area) {
          area.value = btn.dataset.sql;
          runSql();
        }
      });
    });

    const printBtn = document.getElementById("print-carnet");
    if (printBtn) printBtn.addEventListener("click", () => window.print());

    const bilanForm = document.getElementById("bilan-form");
    if (bilanForm) {
      bilanForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const bilan = data.bilan;
        const themeStats = {};
        let correct = 0;
        const details = [];
        bilan.questions.forEach((q) => {
          if (!themeStats[q.theme]) themeStats[q.theme] = { label: q.themeLabel, ok: 0, total: 0 };
          themeStats[q.theme].total += 1;
          const selected = bilanForm.querySelector(`input[name="${q.id}"]:checked`);
          const ok = selected && Number(selected.value) === q.answer;
          if (ok) {
            correct += 1;
            themeStats[q.theme].ok += 1;
          }
          details.push({ ok, question: q.question, explain: q.explain, themeLabel: q.themeLabel });
        });
        const total = bilan.questions.length;
        const score = Math.round((correct / total) * 100);
        const passed = score >= bilan.passScore;
        localStorage.setItem(
          "sql-atelier-bilan-v1",
          JSON.stringify({ score, correct, total, passed, at: Date.now() })
        );
        const weak = Object.values(themeStats)
          .map((t) => ({
            label: t.label,
            rate: Math.round((t.ok / t.total) * 100),
            ok: t.ok,
            total: t.total
          }))
          .sort((a, b) => a.rate - b.rate);
        document.getElementById("bilan-result").innerHTML = `
          <section class="bilan-score-card">
            <h2>Résultat : ${score}%</h2>
            <p>${correct}/${total} — ${passed ? "Seuil atteint." : "À retravailler."}</p>
            <h3>Par thème</h3>
            <ul class="weak-list">
              ${weak
                .map((w) => {
                  const cls = w.rate >= 70 ? "ok" : w.rate >= 40 ? "mid" : "ko";
                  return `<li class="weak-${cls}"><strong>${escapeHtml(w.label)}</strong> — ${w.ok}/${w.total} (${w.rate}%)</li>`;
                })
                .join("")}
            </ul>
            <div class="bilan-details">
              ${details
                .map(
                  (d) => `
                <div class="bilan-detail ${d.ok ? "is-ok" : "is-ko"}">
                  <p><strong>${d.ok ? "Correct" : "À revoir"}</strong> · ${escapeHtml(d.themeLabel)}</p>
                  <p>${escapeHtml(d.question)}</p>
                  <p class="hint">${escapeHtml(d.explain)}</p>
                </div>`
                )
                .join("")}
            </div>
          </section>`;
      });
    }
  }

  // alias to avoid shadowing
  function checkPracticeLesson(lesson, value) {
    return checkPractice(lesson, value);
  }

  document.addEventListener("keydown", (e) => {
    if (state.view !== "playground") return;
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      runSql();
    }
  });

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
      case "playground":
        main.innerHTML = renderPlayground();
        break;
      case "schema":
        main.innerHTML = renderSchema();
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
    if (state.view === "playground" || state.view === "schema") {
      if (!sqlReady) bootSql();
      else if (state.view === "playground") {
        const status = document.getElementById("sql-status");
        if (status) status.textContent = "Prêt";
      }
    }
  }

  // CSS helpers for SQL table
  const style = document.createElement("style");
  style.textContent = `
    .sql-table-wrap{overflow:auto}
    .sql-table{width:100%;border-collapse:collapse;font-size:0.82rem}
    .sql-table th,.sql-table td{border:1px solid rgba(255,255,255,0.12);padding:0.4rem 0.55rem;text-align:left}
    .sql-table th{background:rgba(255,255,255,0.08);position:sticky;top:0}
    .sql-examples{margin-top:1rem;display:flex;flex-wrap:wrap;gap:0.5rem;align-items:center}
    .sql-examples h3{margin:0 0.5rem 0 0;font-size:1rem}
    #sql-code{width:100%;min-height:320px;border:0;resize:vertical;padding:1rem;background:var(--code-bg);color:#e7f0f6;font-family:var(--font-mono);font-size:0.9rem}
  `;
  document.head.appendChild(style);

  render();
  bootSql();
})();
