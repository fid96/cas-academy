/* Statistiques Atelier — application */

(function () {
  const STORAGE_KEY = "stats-atelier-progress-v1";
  const main = document.getElementById("main");
  const data = window.ATELIER;
  const S = window.StatsEngine;

  let state = {
    view: "home",
    lessonId: null,
    phase: "voir",
    progress: loadProgress(),
    labMode: "overview",
    groupField: "ville",
    compareA: "Kinshasa",
    compareB: "Goma"
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
        <header><span>${escapeHtml(code.label || "stats")}</span><span>Statistiques Atelier</span></header>
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
          <img src="assets/illu-analyste.jpg" alt="Lecture de chiffres et décisions" />
        </div>
        <div class="hero-content">
          <p class="hero-brand">Statistiques Atelier</p>
          <h1>Lire les chiffres pour décider, depuis zéro.</h1>
          <p class="hero-lead">Moyennes, pourcentages, comparaisons et pièges — sur les mêmes données ventes santé.</p>
          <div class="hero-actions">
            <button type="button" class="btn btn-primary" data-open-lesson="${cta}">Continuer le parcours</button>
            <button type="button" class="btn btn-secondary" data-nav-inline="playground">Ouvrir le labo chiffres</button>
          </div>
        </div>
      </section>
      <div class="wrap">
        <section class="home-method">
          <h2 class="section-title">Voir → Comprendre → Pratiquer → Vérifier</h2>
          <p class="section-lead">Le sens des KPI que SQL, Excel et Python savent déjà calculer.</p>
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
          <h2 class="section-title">Parcours Data Analyst</h2>
          <div class="path-list">${modulesForTrack("data-analyst").map(renderModuleCard).join("")}</div>
          <h2 class="section-title" style="margin-top:2.5rem">Fondations</h2>
          <div class="path-list">${modulesForTrack("fondations").map(renderModuleCard).join("")}</div>
          <h2 class="section-title" style="margin-top:2.5rem">Évaluation</h2>
          <div class="path-list">
            <button type="button" class="path-item" data-nav-inline="bilan">
              <img src="assets/illu-variables.jpg" alt="" />
              <div><h3>Quiz bilan (20 questions)</h3><p>Score, thèmes faibles, correction.</p></div>
              <div class="path-meta"><span class="badge">Évaluation</span></div>
            </button>
            <button type="button" class="path-item" data-nav-inline="pieges">
              <img src="assets/illu-conditions.jpg" alt="" />
              <div><h3>Galerie des pièges</h3><p>Les erreurs classiques à éviter.</p></div>
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
            <p class="section-lead">Choisir l’indicateur juste, contrôler, interpréter, recommander.</p>
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
        <p class="section-lead">Fondations puis stats pour Data Analyst. Chaque quiz ouvre la suite.</p>
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
          <button class="btn btn-primary" data-nav-inline="playground">Ouvrir le labo</button>
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

  function renderBars(groups) {
    const maxTotal = Math.max(...groups.map((g) => g.total), 1);
    return `
      <div class="bar-chart">
        ${groups
          .map((g) => {
            const pct = Math.round((g.total / maxTotal) * 100);
            return `
              <div class="bar-row">
                <span>${escapeHtml(g.name)}</span>
                <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
                <span>${S.formatNumber(g.total)}</span>
              </div>`;
          })
          .join("")}
      </div>`;
  }

  function renderLabBody() {
    if (state.labMode === "groups") {
      const groups = S.groupBy(state.groupField);
      return `
        <p class="section-lead">Totaux de <code>montant_cdf</code> par <strong>${escapeHtml(state.groupField)}</strong>.</p>
        ${renderBars(groups)}
        <div class="stats-cards" style="margin-top:1.25rem">
          ${groups
            .slice(0, 4)
            .map(
              (g) => `
            <div class="stat-card">
              <span class="label">${escapeHtml(g.name)} (n=${g.n})</span>
              <span class="value">${S.formatNumber(g.mean)}</span>
              <span class="label">moyenne</span>
            </div>`
            )
            .join("")}
        </div>`;
    }

    if (state.labMode === "compare") {
      const c = S.compare(state.groupField, state.compareA, state.compareB);
      return `
        <p class="section-lead">Comparaison des moyennes de montant — n’oubliez pas les effectifs.</p>
        <div class="stats-cards">
          <div class="stat-card">
            <span class="label">${escapeHtml(c.a.name)} · n=${c.a.n}</span>
            <span class="value">${S.formatNumber(c.a.mean)}</span>
            <span class="label">moyenne · total ${S.formatNumber(c.a.total)}</span>
          </div>
          <div class="stat-card">
            <span class="label">${escapeHtml(c.b.name)} · n=${c.b.n}</span>
            <span class="value">${S.formatNumber(c.b.mean)}</span>
            <span class="label">moyenne · total ${S.formatNumber(c.b.total)}</span>
          </div>
          <div class="stat-card">
            <span class="label">Écart relatif des moyennes</span>
            <span class="value">${S.formatPct(c.meanDiffPct)}</span>
            <span class="label">vs ${escapeHtml(c.b.name)}</span>
          </div>
        </div>
        <div class="pitfall">
          <strong>Lecture prudente :</strong> un écart de moyenne avec un très petit n d’un côté reste fragile.
        </div>`;
    }

    const o = S.overview();
    return `
      <p class="section-lead">Portrait global des ${o.n} ventes (montants en CDF).</p>
      <div class="stats-cards">
        <div class="stat-card"><span class="label">Effectif n</span><span class="value">${o.n}</span></div>
        <div class="stat-card"><span class="label">Total montant</span><span class="value">${S.formatNumber(o.totalMontant)}</span></div>
        <div class="stat-card"><span class="label">Moyenne</span><span class="value">${S.formatNumber(o.meanMontant)}</span></div>
        <div class="stat-card"><span class="label">Médiane</span><span class="value">${S.formatNumber(o.medianMontant)}</span></div>
        <div class="stat-card"><span class="label">Min → Max</span><span class="value" style="font-size:1.1rem">${S.formatNumber(o.minMontant)} → ${S.formatNumber(o.maxMontant)}</span></div>
        <div class="stat-card"><span class="label">Part Kinshasa</span><span class="value">${S.formatPct(o.shareKinshasa)}</span></div>
        <div class="stat-card"><span class="label">Quantités manquantes</span><span class="value">${o.nQtyMissing}</span></div>
        <div class="stat-card"><span class="label">Moyenne quantité*</span><span class="value">${S.formatNumber(o.meanQuantite, 1)}</span></div>
      </div>
      <p class="hint">* moyenne quantité calculée hors valeurs manquantes. Moyenne vs médiane des montants : ${
        o.meanMontant > o.medianMontant ? "la moyenne est tirée vers le haut (extrêmes possibles)." : "proches."
      }</p>`;
  }

  function renderPlayground() {
    const villes = S.unique("ville");
    const options = (selected) =>
      villes.map((v) => `<option value="${escapeHtml(v)}"${v === selected ? " selected" : ""}>${escapeHtml(v)}</option>`).join("");
    return `
      <div class="wrap">
        <h1 class="section-title">Labo chiffres</h1>
        <p class="section-lead">Calculez sur le jeu <code>ventes</code> : vue d’ensemble, groupes, comparaison.</p>
        <div class="lab-controls">
          <label>Mode
            <select id="lab-mode">
              <option value="overview"${state.labMode === "overview" ? " selected" : ""}>Vue d’ensemble</option>
              <option value="groups"${state.labMode === "groups" ? " selected" : ""}>Par groupe</option>
              <option value="compare"${state.labMode === "compare" ? " selected" : ""}>Comparer</option>
            </select>
          </label>
          <label>Grouper par
            <select id="lab-group">
              <option value="ville"${state.groupField === "ville" ? " selected" : ""}>ville</option>
              <option value="produit"${state.groupField === "produit" ? " selected" : ""}>produit</option>
              <option value="categorie"${state.groupField === "categorie" ? " selected" : ""}>categorie</option>
            </select>
          </label>
          <label>Groupe A
            <select id="lab-a">${options(state.compareA)}</select>
          </label>
          <label>Groupe B
            <select id="lab-b">${options(state.compareB)}</select>
          </label>
        </div>
        <div id="lab-body">${renderLabBody()}</div>
        <div class="phase-actions">
          <button class="btn btn-ghost" data-nav-inline="pieges">Voir les pièges</button>
          <button class="btn btn-primary" data-open-lesson="m7-l1">Mission note de décision</button>
        </div>
      </div>`;
  }

  function renderPieges() {
    return `
      <div class="wrap">
        <h1 class="section-title">Galerie des pièges</h1>
        <p class="section-lead">À garder sous les yeux avant chaque présentation de chiffres.</p>
        <div class="principle-list">
          ${data.pieges
            .map((p) => `<article class="principle"><h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.text)}</p></article>`)
            .join("")}
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
      last = JSON.parse(localStorage.getItem("stats-atelier-bilan-v1") || "null");
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
          "stats-atelier-bilan-v1",
          JSON.stringify({ score, correct, total, at: Date.now() })
        );
        const weak = Object.values(themes)
          .filter((t) => t.ok / t.total < 0.7)
          .map((t) => t.label);
        document.getElementById("bilan-result").innerHTML = `
          <div class="feedback ${passed ? "ok" : "ko"}">
            Score : <strong>${score}%</strong> (${correct}/${total}) — ${
              passed ? "Seuil atteint. Lecture solide." : "Sous le seuil : révisez les thèmes faibles."
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

    if (state.view === "playground") {
      const refresh = () => {
        state.labMode = document.getElementById("lab-mode").value;
        state.groupField = document.getElementById("lab-group").value;
        state.compareA = document.getElementById("lab-a").value;
        state.compareB = document.getElementById("lab-b").value;
        // Keep compare options aligned when grouping by produit/categorie
        const values = S.unique(state.groupField);
        const selA = document.getElementById("lab-a");
        const selB = document.getElementById("lab-b");
        const fill = (sel, current) => {
          sel.innerHTML = values
            .map((v) => `<option value="${escapeHtml(v)}"${v === current ? " selected" : ""}>${escapeHtml(v)}</option>`)
            .join("");
          if (![...sel.options].some((o) => o.value === current) && values[0]) sel.value = values[0];
        };
        fill(selA, state.compareA);
        fill(selB, state.compareB);
        state.compareA = selA.value;
        state.compareB = selB.value;
        document.getElementById("lab-body").innerHTML = renderLabBody();
      };
      ["lab-mode", "lab-group", "lab-a", "lab-b"].forEach((id) => {
        document.getElementById(id)?.addEventListener("change", refresh);
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
      case "playground":
        main.innerHTML = renderPlayground();
        break;
      case "pieges":
        main.innerHTML = renderPieges();
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
