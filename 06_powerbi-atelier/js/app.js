/* Power BI Atelier — application */

(function () {
  const STORAGE_KEY = "powerbi-atelier-progress-v1";
  const main = document.getElementById("main");
  const data = window.ATELIER;
  const D = window.DashData;

  let state = {
    view: "home",
    lessonId: null,
    phase: "voir",
    progress: loadProgress(),
    layout: "executive",
    visualQuizIndex: 0,
    visualFeedback: ""
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
        <header><span>${escapeHtml(code.label || "powerbi")}</span><span>Power BI Atelier</span></header>
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
          <img src="assets/illu-analyste.jpg" alt="Tableau de bord et pilotage" />
        </div>
        <div class="hero-content">
          <p class="hero-brand">Power BI Atelier</p>
          <h1>Des tableaux de bord clairs, professionnels, utiles.</h1>
          <p class="hero-lead">Architecture, hiérarchie, choix des visuels, style — puis mise en œuvre Power BI sur les ventes santé.</p>
          <div class="hero-actions">
            <button type="button" class="btn btn-primary" data-open-lesson="${cta}">Continuer le parcours</button>
            <button type="button" class="btn btn-secondary" data-nav-inline="studio">Ouvrir le Studio dashboard</button>
          </div>
        </div>
      </section>
      <div class="wrap">
        <section class="home-method">
          <h2 class="section-title">Voir → Comprendre → Pratiquer → Vérifier</h2>
          <p class="section-lead">Le design pro n’est pas un bonus : c’est le métier du dashboard.</p>
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
          <h2 class="section-title">Design de dashboard pro</h2>
          <div class="path-list">${modulesForTrack("design").map(renderModuleCard).join("")}</div>
          <h2 class="section-title" style="margin-top:2.5rem">Fondations Power BI</h2>
          <div class="path-list">${modulesForTrack("fondations").map(renderModuleCard).join("")}</div>
          <h2 class="section-title" style="margin-top:2.5rem">Ateliers pratiques</h2>
          <div class="path-list">
            <button type="button" class="path-item" data-nav-inline="studio">
              <img src="assets/illu-donnees.jpg" alt="" />
              <div><h3>Studio dashboard</h3><p>Comparer layouts, scores de design, wireframes.</p></div>
              <div class="path-meta"><span class="badge">Studio</span></div>
            </button>
            <button type="button" class="path-item" data-nav-inline="visuels">
              <img src="assets/illu-conditions.jpg" alt="" />
              <div><h3>Choix des visuels</h3><p>Quel élément pour quel type de données.</p></div>
              <div class="path-meta"><span class="badge">Pratique</span></div>
            </button>
            <button type="button" class="path-item" data-nav-inline="bilan">
              <img src="assets/illu-variables.jpg" alt="" />
              <div><h3>Quiz bilan (20 questions)</h3><p>Outil + design + storytelling.</p></div>
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
            <h1 class="section-title">Méthode & règles de design</h1>
            <p class="section-lead">Architecture, tailles, style, matching visuel — le socle d’un livrable crédible.</p>
            <button type="button" class="btn btn-dark" data-open-lesson="m1-l1">Première leçon</button>
          </div>
          <img src="assets/illu-logique.jpg" alt="" />
        </div>
        <div class="principle-list">
          ${[...data.method.principles, ...data.designRules]
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
        <p class="section-lead">Fondations Power BI + design dashboard professionnel.</p>
        <h2 class="section-title" style="font-size:1.5rem">1. Fondations</h2>
        <div class="module-grid">${modulesForTrack("fondations").map(renderModuleBlock).join("")}</div>
        <h2 class="section-title" style="font-size:1.5rem;margin-top:2rem">2. Design pro</h2>
        <div class="module-grid">${modulesForTrack("design").map(renderModuleBlock).join("")}</div>
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
          <button class="btn btn-primary" data-nav-inline="studio">Studio dashboard</button>
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

  function renderMiniBars(rows) {
    const max = D.maxTotal(rows);
    return `
      <div class="mini-bars" style="margin-bottom:1.2rem">
        ${rows
          .map((r) => {
            const h = Math.max(8, Math.round((r.total / max) * 100));
            return `<span style="height:${h}%" data-label="${escapeHtml(r.name.slice(0, 6))}" title="${escapeHtml(r.name)}"></span>`;
          })
          .join("")}
      </div>`;
  }

  function renderMiniLine() {
    const pts = D.BY_MOIS;
    const max = Math.max(...pts.map((p) => p.total));
    const coords = pts
      .map((p, i) => {
        const x = 20 + i * 80;
        const y = 110 - (p.total / max) * 90;
        return `${x},${y}`;
      })
      .join(" ");
    return `
      <div class="mini-lines">
        <svg viewBox="0 0 220 130" preserveAspectRatio="none" aria-hidden="true">
          <polyline fill="none" stroke="#1f4e79" stroke-width="3" points="${coords}"></polyline>
          ${pts
            .map((p, i) => {
              const x = 20 + i * 80;
              const y = 110 - (p.total / max) * 90;
              return `<circle cx="${x}" cy="${y}" r="4" fill="#c17f2a"></circle>`;
            })
            .join("")}
        </svg>
      </div>
      <p class="kpi-sub">Janv. → Mars (tendance)</p>`;
  }

  function renderDashboardCanvas() {
    const bad = state.layout === "chaos";
    const transfer = state.layout === "transfer";
    const gridLayout = transfer ? "executive" : state.layout;
    const k = D.KPIS;
    const tileClass = bad ? "is-bad" : "is-good";
    if (transfer) {
      return `
      <div class="dash-grid layout-executive">
        <article class="dash-tile area-k1 ${tileClass}"><h4>Volume total</h4><div class="kpi">${k.n}</div><div class="kpi-sub">lignes commandes</div></article>
        <article class="dash-tile area-k2 ${tileClass}"><h4>Qté manquante</h4><div class="kpi">${k.missingQty}</div><div class="kpi-sub">risque stock / données</div></article>
        <article class="dash-tile area-k3 ${tileClass}"><h4>Top produit</h4><div class="kpi" style="font-size:1.2rem">${escapeHtml(D.BY_PRODUIT[0].name)}</div><div class="kpi-sub">par CA (proxy volume)</div></article>
        <article class="dash-tile area-k4 ${tileClass}"><h4>CA lié</h4><div class="kpi" style="font-size:1.1rem">${k.total.toLocaleString("fr-FR")}</div><div class="kpi-sub">CDF (contexte)</div></article>
        <article class="dash-tile area-main ${tileClass}">
          <h4>Volumes / CA par produit — héros logistique</h4>
          ${renderMiniBars(D.BY_PRODUIT)}
          <p class="kpi-sub">Transfert : le héros n’est plus « CA par ville »</p>
        </article>
        <article class="dash-tile area-side ${tileClass}">
          <h4>Évolution mensuelle</h4>
          ${renderMiniLine()}
        </article>
        <article class="dash-tile area-bottom ${tileClass}">
          <h4>Répartition villes (secondaire)</h4>
          ${renderMiniBars(D.BY_VILLE)}
        </article>
      </div>`;
    }
    return `
      <div class="dash-grid layout-${gridLayout}">
        <article class="dash-tile area-k1 ${tileClass}"><h4>Total CA</h4><div class="kpi">${k.total.toLocaleString("fr-FR")}</div><div class="kpi-sub">CDF · n=${k.n}</div></article>
        <article class="dash-tile area-k2 ${tileClass}"><h4>Moyenne vente</h4><div class="kpi">${k.mean.toLocaleString("fr-FR")}</div><div class="kpi-sub">CDF</div></article>
        <article class="dash-tile area-k3 ${tileClass}"><h4>Top ville</h4><div class="kpi" style="font-size:1.35rem">${escapeHtml(k.topVille)}</div><div class="kpi-sub">${k.topShare} % du CA</div></article>
        <article class="dash-tile area-k4 ${tileClass}"><h4>Qualité</h4><div class="kpi">${k.missingQty}</div><div class="kpi-sub">quantité manquante</div></article>
        <article class="dash-tile area-main ${tileClass}">
          <h4>CA par ville — message principal</h4>
          ${renderMiniBars(D.BY_VILLE)}
          <p class="kpi-sub">Visuel héros : comparaison catégorielle (barres)</p>
        </article>
        <article class="dash-tile area-side ${tileClass}">
          <h4>Évolution mensuelle</h4>
          ${renderMiniLine()}
        </article>
        <article class="dash-tile area-bottom ${tileClass}">
          <h4>CA par produit (secondaire)</h4>
          ${renderMiniBars(D.BY_PRODUIT)}
        </article>
        ${
          state.layout === "analytical"
            ? `<article class="dash-tile area-table ${tileClass}">
                <h4>Détail contrôle</h4>
                <p class="kpi-sub">Tableau (extrait) : utile en page analytique, secondaire en page exécutive.</p>
                <p style="font-family:var(--font-mono);font-size:0.78rem;margin:0.5rem 0 0">Kinshasa 2 940 000 · Lubumbashi 1 465 000 · Goma 930 000…</p>
              </article>`
            : state.layout === "chaos"
              ? `<article class="dash-tile area-table ${tileClass}"><h4>Encore un graphique</h4><p class="kpi-sub">Saturation : l’œil ne sait plus où aller.</p></article>`
              : ""
        }
      </div>`;
  }

  function renderStudio() {
    const layout = D.LAYOUTS[state.layout];
    const s = layout.score;
    return `
      <div class="wrap">
        <h1 class="section-title">Studio dashboard</h1>
        <p class="section-lead">Comparez les architectures, puis passez au layout <strong>Transfert</strong> (brief logistique) pour l’épreuve de maîtrise.</p>
        <div class="dash-toolbar">
          <button type="button" class="btn btn-small ${state.layout === "executive" ? "btn-dark" : "btn-ghost"}" data-layout="executive">Layout exécutif</button>
          <button type="button" class="btn btn-small ${state.layout === "analytical" ? "btn-dark" : "btn-ghost"}" data-layout="analytical">Layout analytique</button>
          <button type="button" class="btn btn-small ${state.layout === "chaos" ? "btn-dark" : "btn-ghost"}" data-layout="chaos">Layout chaos</button>
          <button type="button" class="btn btn-small ${state.layout === "transfer" ? "btn-dark" : "btn-ghost"}" data-layout="transfer">Transfert (épreuve)</button>
          <a class="btn btn-small btn-primary" href="data/ventes.csv" download>CSV ventes</a>
          <a class="btn btn-small btn-ghost" href="data/clients.csv" download>CSV clients</a>
        </div>
        <div class="dash-canvas">${renderDashboardCanvas()}</div>
        <div class="design-score">
          <div class="score-card"><span>Hiérarchie</span><strong>${s.hierarchy}/100</strong></div>
          <div class="score-card"><span>Clarté</span><strong>${s.clarity}/100</strong></div>
          <div class="score-card"><span>Densité maîtrisée</span><strong>${s.density}/100</strong></div>
          <div class="score-card"><span>Cohérence</span><strong>${s.consistency}/100</strong></div>
        </div>
        <div class="callout" style="margin-top:1rem">
          <h3>${escapeHtml(layout.label)}</h3>
          <p>${escapeHtml(layout.critique)}</p>
        </div>
        <h2 class="section-title" style="font-size:1.35rem;margin-top:2rem">Wireframe cible (exécutif)</h2>
        <div class="principle">
          <div class="wire-row"><span>Haut</span><div class="wire-box">Titre + 4 KPI + 2–3 segments</div></div>
          <div class="wire-row"><span>Centre</span><div class="wire-box">Visuel héros (~50%) + secondaire</div></div>
          <div class="wire-row"><span>Bas</span><div class="wire-box">Détail léger / remarque qualité / reco</div></div>
        </div>
        <div class="phase-actions">
          <button class="btn btn-ghost" data-nav-inline="visuels">Choisir les visuels</button>
          <button class="btn btn-secondary" data-nav-inline="carnet">Carnet D — épreuve</button>
          <button class="btn btn-primary" data-open-lesson="m7-l1">Modèle &amp; DAX</button>
        </div>
      </div>`;
  }

  function renderVisuels() {
    const q = data.visualQuiz[state.visualQuizIndex];
    return `
      <div class="wrap">
        <h1 class="section-title">Choix des visuels</h1>
        <p class="section-lead">Type de question / données → type d’élément. Entraînez-vous, puis appliquez dans Power BI.</p>
        <div class="chooser-grid">
          ${D.VISUAL_GUIDE.map(
            (v) => `
            <article class="principle">
              <h3>${escapeHtml(v.title)}</h3>
              <p><strong>Idéal :</strong> ${escapeHtml(v.bestFor)}</p>
              <p><strong>Éviter :</strong> ${escapeHtml(v.avoid)}</p>
              <p><strong>Taille :</strong> ${escapeHtml(v.size)}</p>
              <p class="hint">Power BI : ${escapeHtml(v.powerbi)}</p>
            </article>`
          ).join("")}
        </div>
        <h2 class="section-title" style="font-size:1.35rem;margin-top:2rem">Mini-quiz matching (${state.visualQuizIndex + 1}/${data.visualQuiz.length})</h2>
        <div class="practice-box">
          <p class="q-title">${escapeHtml(q.question)}</p>
          <div class="chooser-grid">
            ${D.VISUAL_GUIDE.map(
              (v) => `
              <button type="button" class="chooser-card" data-visual-answer="${v.id}">
                <h3>${escapeHtml(v.title)}</h3>
                <p>${escapeHtml(v.bestFor)}</p>
              </button>`
            ).join("")}
          </div>
          <div id="visual-feedback" style="margin-top:0.75rem">${state.visualFeedback}</div>
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
        <h2 class="section-title" style="font-size:1.35rem;margin-top:2rem">Rappels design</h2>
        <div class="principle-list">
          ${data.designRules.map((r) => `<article class="principle"><h3>${escapeHtml(r.title)}</h3><p>${escapeHtml(r.text)}</p></article>`).join("")}
        </div>
      </div>`;
  }

  function renderBilan() {
    const bilan = data.bilan;
    let last = null;
    try {
      last = JSON.parse(localStorage.getItem("powerbi-atelier-bilan-v1") || "null");
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

    main.querySelectorAll("[data-layout]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.layout = btn.dataset.layout;
        render();
      });
    });

    main.querySelectorAll("[data-visual-answer]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const q = data.visualQuiz[state.visualQuizIndex];
        const ok = btn.dataset.visualAnswer === q.answer;
        state.visualFeedback = ok
          ? `<div class="feedback ok">Oui. ${escapeHtml(q.explain)}</div>`
          : `<div class="feedback ko">Pas celui-là. ${escapeHtml(q.explain)}</div>`;
        if (ok) {
          state.visualQuizIndex = (state.visualQuizIndex + 1) % data.visualQuiz.length;
        }
        render();
      });
    });

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
          "powerbi-atelier-bilan-v1",
          JSON.stringify({ score, correct, total, at: Date.now() })
        );
        const weak = Object.values(themes)
          .filter((t) => t.ok / t.total < 0.7)
          .map((t) => t.label);
        document.getElementById("bilan-result").innerHTML = `
          <div class="feedback ${passed ? "ok" : "ko"}">
            Score : <strong>${score}%</strong> (${correct}/${total}) — ${
              passed ? "Seuil atteint. Design et outil bien ancrés." : "Sous le seuil : révisez architecture et matching visuels."
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
      case "visuels":
        main.innerHTML = renderVisuels();
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
