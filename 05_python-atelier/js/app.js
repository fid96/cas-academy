/* Python Atelier — application pédagogique */

(function () {
  const STORAGE_KEY = "python-atelier-progress-v2";
  const main = document.getElementById("main");
  const data = window.ATELIER;

  let state = {
    view: "home",
    moduleId: null,
    lessonId: null,
    phase: "voir",
    progress: loadProgress()
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

  function nextLessonId(lessonId) {
    const list = allLessons();
    const idx = list.findIndex((l) => l.id === lessonId);
    if (idx === -1 || idx === list.length - 1) return null;
    return list[idx + 1].id;
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

  function markLessonComplete(lessonId) {
    state.progress.completed[lessonId] = true;
    const next = nextLessonId(lessonId);
    if (next) state.progress.unlocked[next] = true;
    saveProgress();
  }

  function completionRatio() {
    const list = allLessons();
    if (!list.length) return 0;
    const done = list.filter((l) => isLessonComplete(l.id)).length;
    return done / list.length;
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
    if (opts.moduleId) state.moduleId = opts.moduleId;
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
        <header><span>${escapeHtml(code.label || "code")}</span><span>Python Atelier</span></header>
        <pre><code>${escapeHtml(code.lines)}</code></pre>
      </div>
      ${code.annotation ? `<p class="annotation">${escapeHtml(code.annotation)}</p>` : ""}
    `;
  }

  function renderAnalogy(analogy) {
    if (!analogy) return "";
    return `
      <aside class="analogy">
        <h3>${escapeHtml(analogy.title)}</h3>
        <p>${escapeHtml(analogy.text)}</p>
      </aside>
    `;
  }

  function modulesForTrack(trackId) {
    return data.modules.filter((m) => m.track === trackId);
  }

  function trackStats(trackId) {
    const mods = modulesForTrack(trackId);
    const lessons = mods.flatMap((m) => m.lessons);
    const done = lessons.filter((l) => isLessonComplete(l.id)).length;
    return { total: lessons.length, done };
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
    const firstLocked = allLessons().find((l) => !isLessonComplete(l.id) && isLessonUnlocked(l.id));
    const ctaLesson = firstLocked ? firstLocked.id : "m1-l1";
    const fond = trackStats("fondations");
    const dataTrack = trackStats("data-analyst");

    return `
      <section class="hero" aria-label="Accueil Python Atelier">
        <div class="hero-media">
          <img src="assets/illu-analyste.jpg" alt="Poste de travail d'analyste de données avec tableaux et graphiques" />
        </div>
        <div class="hero-content">
          <p class="hero-brand">Python Atelier</p>
          <h1>Devenir un Data Analyst Python, depuis zéro.</h1>
          <p class="hero-lead">Fondations d’abord, puis le métier complet : CSV, Excel, pandas, qualité, KPI, visualisation, projet.</p>
          <div class="hero-actions">
            <button type="button" class="btn btn-primary" data-open-lesson="${ctaLesson}">Continuer le parcours</button>
            <button type="button" class="btn btn-secondary" data-nav-inline="bilan">Quiz bilan</button>
          </div>
        </div>
      </section>

      <div class="wrap">
        <section class="home-method">
          <h2 class="section-title">Deux temps, un seul objectif</h2>
          <p class="section-lead">L’analyse de données n’est pas un bonus final : c’est la destination. Les fondations existent pour vous y rendre solide.</p>
          <div class="track-overview">
            ${(data.tracks || [])
              .map((t) => {
                const st = trackStats(t.id);
                const pct = st.total ? Math.round((st.done / st.total) * 100) : 0;
                return `
                <article class="track-card">
                  <h3>${escapeHtml(t.title)}</h3>
                  <p class="track-sub">${escapeHtml(t.subtitle)}</p>
                  <p>${escapeHtml(t.goal)}</p>
                  <div class="track-progress">
                    <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
                    <span>${st.done}/${st.total} leçons · ${pct}%</span>
                  </div>
                </article>`;
              })
              .join("")}
          </div>
          <p class="section-lead" style="margin-top:1.5rem">Progression globale fondations ${fond.done}/${fond.total} · Data Analyst ${dataTrack.done}/${dataTrack.total}</p>
        </section>

        <section class="home-method">
          <h2 class="section-title">Voir → Comprendre → Pratiquer → Vérifier</h2>
          <p class="section-lead">Même méthode partout : du sens vers le symbole, de la main vers le contrôle.</p>
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
          <p class="section-lead">Le cœur du métier — modules dédiés, fichiers réels dans <strong>data/</strong>, projet final.</p>
          <div class="path-list">
            ${modulesForTrack("data-analyst").map(renderModuleCard).join("")}
          </div>
          <h2 class="section-title" style="margin-top:2.5rem">Fondations Python</h2>
          <p class="section-lead">Indispensables avant les données — logique, variables, conditions, boucles, collections, fonctions.</p>
          <div class="path-list">
            ${modulesForTrack("fondations").map(renderModuleCard).join("")}
          </div>

          <h2 class="section-title" style="margin-top:2.5rem">Évaluation & labo pro</h2>
          <p class="section-lead">Quiz bilan noté, puis pratique réelle avec Anaconda Navigator et Jupyter Notebook.</p>
          <div class="path-list">
            <button type="button" class="path-item" data-nav-inline="bilan">
              <img src="assets/illu-variables.jpg" alt="" />
              <div>
                <h3>Quiz bilan (20 questions)</h3>
                <p>Score, thèmes faibles, correction détaillée. Seuil de réussite 70%.</p>
              </div>
              <div class="path-meta"><span class="badge">Évaluation</span></div>
            </button>
            <button type="button" class="path-item" data-nav-inline="labo">
              <img src="assets/illu-analyste.jpg" alt="" />
              <div>
                <h3>Labo Anaconda + projet métier</h3>
                <p>Guide Jupyter + notebook notebooks/projet_analyste_ventes.ipynb</p>
              </div>
              <div class="path-meta"><span class="badge">Projet</span></div>
            </button>
          </div>
        </section>
      </div>
    `;
  }

  function renderMethode() {
    return `
      <div class="wrap">
        <div class="methode-hero">
          <div>
            <h1 class="section-title">La méthode de l’atelier</h1>
            <p class="section-lead">Vous n’êtes pas informaticien ? Parfait. On commence par la pensée claire, puis Python, puis le métier complet de Data Analyst — fichiers, qualité, KPI, recommandation.</p>
            <button type="button" class="btn btn-dark" data-open-lesson="m1-l1">Ouvrir la première leçon</button>
          </div>
          <img src="assets/illu-analyste.jpg" alt="Poste de travail d'analyste de données" />
        </div>
        <div class="principle-list">
          ${data.method.principles
            .map(
              (p) => `
            <article class="principle">
              <h3>${escapeHtml(p.title)}</h3>
              <p>${escapeHtml(p.text)}</p>
            </article>`
            )
            .join("")}
          ${data.method.steps
            .map(
              (s) => `
            <article class="principle">
              <h3>${s.num} — ${escapeHtml(s.title)}</h3>
              <p>${escapeHtml(s.text)}</p>
            </article>`
            )
            .join("")}
        </div>
      </div>
    `;
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
        <p class="section-lead">Objectif : un Data Analyst Python complet. Les fondations débloquent le métier ; chaque quiz ouvre la leçon suivante.</p>

        <h2 class="section-title" style="font-size:1.6rem;margin-top:1.5rem">1. Fondations Python</h2>
        <p class="section-lead">Logique et langage — le socle indispensable.</p>
        <div class="module-grid">
          ${modulesForTrack("fondations").map(renderModuleBlock).join("")}
        </div>

        <h2 class="section-title" style="font-size:1.6rem;margin-top:2.5rem">2. Data Analyst Python</h2>
        <p class="section-lead">Le cœur du métier : fichiers, pandas, qualité, KPI, visualisation, projet. Fichiers dans <code>data/</code>.</p>
        <div class="module-grid">
          ${modulesForTrack("data-analyst").map(renderModuleBlock).join("")}
        </div>
      </div>
    `;
  }

  function renderCarnet() {
    const carnet = data.carnet;
    if (!carnet) {
      return `<div class="wrap"><p>Carnet indisponible.</p></div>`;
    }
    return `
      <div class="wrap carnet-page">
        <div class="carnet-toolbar no-print">
          <div>
            <h1 class="section-title">${escapeHtml(carnet.title)}</h1>
            <p class="section-lead">${escapeHtml(carnet.subtitle)}. Imprimez ou exportez en PDF via votre navigateur.</p>
          </div>
          <button type="button" class="btn btn-primary" id="print-carnet">Imprimer / PDF</button>
        </div>
        <header class="carnet-print-header">
          <strong>Python Atelier</strong> — Carnet d’exercices · ${escapeHtml(data.mission || "")}
        </header>
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
                  <div class="carnet-lines" aria-hidden="true"></div>
                </li>`
                )
                .join("")}
            </ol>
          </section>`
          )
          .join("")}
        <p class="carnet-footer">Données : data/ventes.csv · data/clients.csv · data/ventes_apercu.xlsx · data/ventes_pointvirgule.csv · Notebook : notebooks/projet_analyste_ventes.ipynb</p>
      </div>
    `;
  }

  function renderLabo() {
    const labo = data.labo;
    if (!labo) return `<div class="wrap"><p>Guide labo indisponible.</p></div>`;
    return `
      <div class="wrap">
        <h1 class="section-title">${escapeHtml(labo.title)}</h1>
        <p class="section-lead">${escapeHtml(labo.subtitle)}</p>
        <div class="labo-path">
          <strong>Dossier projet :</strong>
          <code>C:\\Users\\FIDELE\\Projects\\python-atelier</code>
        </div>
        <div class="principle-list">
          ${labo.steps
            .map(
              (s) => `
            <article class="principle">
              <h3>${escapeHtml(s.title)}</h3>
              <p>${escapeHtml(s.text)}</p>
            </article>`
            )
            .join("")}
        </div>
        <h2 class="section-title" style="font-size:1.5rem;margin-top:2rem">Checklist</h2>
        <ul class="labo-check">
          ${labo.checklist.map((c) => `<li>${escapeHtml(c)}</li>`).join("")}
        </ul>
        <div class="phase-actions">
          <button type="button" class="btn btn-primary" data-nav-inline="bilan">Passer au quiz bilan</button>
          <button type="button" class="btn btn-ghost" data-nav-inline="carnet">Voir les exercices projet</button>
        </div>
      </div>
    `;
  }

  function renderBilan() {
    const bilan = data.bilan;
    if (!bilan) return `<div class="wrap"><p>Quiz bilan indisponible.</p></div>`;
    const saved = loadBilanResult();

    return `
      <div class="wrap">
        <h1 class="section-title">${escapeHtml(bilan.title)}</h1>
        <p class="section-lead">${escapeHtml(bilan.subtitle)} Seuil de réussite : ${bilan.passScore}%.</p>
        ${
          saved
            ? `<div class="bilan-last">Dernier score enregistré : <strong>${saved.score}%</strong> (${saved.correct}/${saved.total}) — ${saved.passed ? "Réussi" : "À retravailler"}</div>`
            : ""
        }
        <form id="bilan-form" class="bilan-form">
          ${bilan.questions
            .map(
              (q, qi) => `
            <fieldset class="bilan-q" data-theme="${escapeHtml(q.theme)}">
              <legend><span class="bilan-num">${qi + 1}/${bilan.questions.length}</span> ${escapeHtml(q.question)}</legend>
              <p class="bilan-theme">${escapeHtml(q.themeLabel)}</p>
              <div class="quiz-options">
                ${q.options
                  .map(
                    (opt, oi) => `
                  <label>
                    <input type="radio" name="${q.id}" value="${oi}" required />
                    <span>${escapeHtml(opt)}</span>
                  </label>`
                  )
                  .join("")}
              </div>
            </fieldset>`
            )
            .join("")}
          <div class="phase-actions">
            <button type="submit" class="btn btn-primary">Corriger le quiz bilan</button>
            <button type="button" class="btn btn-ghost" id="bilan-reset">Effacer mes réponses</button>
          </div>
        </form>
        <div id="bilan-result"></div>
      </div>
    `;
  }

  function loadBilanResult() {
    try {
      const raw = localStorage.getItem("python-atelier-bilan-v1");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function saveBilanResult(result) {
    localStorage.setItem("python-atelier-bilan-v1", JSON.stringify(result));
  }

  function gradeBilan(form) {
    const bilan = data.bilan;
    const themeStats = {};
    let correct = 0;
    const details = [];

    bilan.questions.forEach((q) => {
      if (!themeStats[q.theme]) {
        themeStats[q.theme] = { label: q.themeLabel, ok: 0, total: 0 };
      }
      themeStats[q.theme].total += 1;
      const selected = form.querySelector(`input[name="${q.id}"]:checked`);
      const value = selected ? Number(selected.value) : -1;
      const ok = value === q.answer;
      if (ok) {
        correct += 1;
        themeStats[q.theme].ok += 1;
      }
      details.push({ id: q.id, ok, explain: q.explain, question: q.question, themeLabel: q.themeLabel });
    });

    const total = bilan.questions.length;
    const score = Math.round((correct / total) * 100);
    const passed = score >= bilan.passScore;

    const weak = Object.values(themeStats)
      .map((t) => ({
        label: t.label,
        rate: t.total ? Math.round((t.ok / t.total) * 100) : 0,
        ok: t.ok,
        total: t.total
      }))
      .sort((a, b) => a.rate - b.rate);

    return { correct, total, score, passed, weak, details, themeStats };
  }

  function renderBilanResult(result) {
    const weakBlock = result.weak
      .map((w) => {
        const cls = w.rate >= 70 ? "ok" : w.rate >= 40 ? "mid" : "ko";
        return `<li class="weak-${cls}"><strong>${escapeHtml(w.label)}</strong> — ${w.ok}/${w.total} (${w.rate}%)</li>`;
      })
      .join("");

    const detailBlock = result.details
      .map(
        (d) => `
      <div class="bilan-detail ${d.ok ? "is-ok" : "is-ko"}">
        <p><strong>${d.ok ? "Correct" : "À revoir"}</strong> · ${escapeHtml(d.themeLabel)}</p>
        <p>${escapeHtml(d.question)}</p>
        <p class="hint">${escapeHtml(d.explain)}</p>
      </div>`
      )
      .join("");

    return `
      <section class="bilan-score-card">
        <h2>Résultat : ${result.score}%</h2>
        <p>${result.correct} bonnes réponses sur ${result.total}. ${
          result.passed
            ? "Bravo — seuil atteint. Vous pouvez enchaîner le projet métier dans Jupyter."
            : "Pas encore le seuil. Regardez les thèmes faibles ci-dessous, puis retentez."
        }</p>
        <h3>Points forts / faibles par thème</h3>
        <ul class="weak-list">${weakBlock}</ul>
        <div class="phase-actions">
          <button type="button" class="btn btn-primary" data-nav-inline="labo">Ouvrir le labo Anaconda</button>
          <button type="button" class="btn btn-ghost" data-nav-inline="carnet">Exercices de renforcement</button>
        </div>
        <h3 style="margin-top:1.5rem">Correction détaillée</h3>
        <div class="bilan-details">${detailBlock}</div>
      </section>
    `;
  }

  function checkPractice(lesson, value) {
    const p = lesson.pratiquer;
    const text = value.trim();
    if (!text) return { ok: false, message: p.fail };

    if (p.checkType === "minLines") {
      const lines = text.split(/\r?\n/).filter((l) => l.trim().length);
      return lines.length >= (p.minLines || 5)
        ? { ok: true, message: p.success }
        : { ok: false, message: p.fail };
    }

    if (p.checkType === "minChars") {
      return text.length >= (p.minChars || 20)
        ? { ok: true, message: p.success }
        : { ok: false, message: p.fail };
    }

    if (p.checkType === "keywords") {
      const lower = text.toLowerCase();
      if (p.keywordsMode === "anyBool") {
        const hasPrint = lower.includes("print");
        const hasBool = lower.includes("true") || lower.includes("false");
        return hasPrint && hasBool
          ? { ok: true, message: p.success }
          : { ok: false, message: p.fail };
      }
      const ok = (p.keywords || []).every((k) => lower.includes(k.toLowerCase()));
      return ok ? { ok: true, message: p.success } : { ok: false, message: p.fail };
    }

    if (p.checkType === "regex") {
      try {
        const re = new RegExp(p.pattern, "i");
        return re.test(text)
          ? { ok: true, message: p.success }
          : { ok: false, message: p.fail };
      } catch {
        return { ok: false, message: "Exercice temporairement indisponible." };
      }
    }

    return { ok: true, message: p.success };
  }

  function renderLesson() {
    const found = getLesson(state.lessonId);
    if (!found) {
      return `<div class="wrap"><p>Leçon introuvable.</p></div>`;
    }
    if (!isLessonUnlocked(state.lessonId)) {
      return `
        <div class="wrap">
          <h1 class="section-title">Leçon verrouillée</h1>
          <p class="section-lead">Validez d’abord la leçon précédente pour garder une progression solide.</p>
          <button type="button" class="btn btn-dark" data-nav-inline="parcours">Retour au parcours</button>
        </div>`;
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
      const s = lesson.voir;
      body = `
        <p class="lesson-kicker">Voir</p>
        <h1>${escapeHtml(lesson.title)}</h1>
        <figure class="lesson-figure">
          <img src="${lesson.image}" alt="" />
          <figcaption>${escapeHtml(lesson.caption || "")}</figcaption>
        </figure>
        <div class="prose">
          ${renderParagraphs(s.paragraphs)}
          ${renderAnalogy(s.analogy)}
          <div class="callout">
            <h3>Objectif de la leçon</h3>
            <p>${escapeHtml(lesson.goal)}</p>
          </div>
        </div>
        <div class="phase-actions">
          <button type="button" class="btn btn-dark" data-phase="comprendre">Passer à Comprendre</button>
        </div>`;
    } else if (phase === "comprendre") {
      const s = lesson.comprendre;
      body = `
        <p class="lesson-kicker">Comprendre</p>
        <h1>${escapeHtml(lesson.title)}</h1>
        <div class="prose">
          ${renderParagraphs(s.paragraphs)}
          ${renderBullets(s.bullets)}
          ${renderCode(s.code)}
        </div>
        <div class="phase-actions">
          <button type="button" class="btn btn-ghost" data-phase="voir">Retour</button>
          <button type="button" class="btn btn-dark" data-phase="pratiquer">Passer à Pratiquer</button>
        </div>`;
    } else if (phase === "pratiquer") {
      const s = lesson.pratiquer;
      body = `
        <p class="lesson-kicker">Pratiquer</p>
        <h1>${escapeHtml(lesson.title)}</h1>
        <div class="practice-box">
          <label for="practice-input">${escapeHtml(s.prompt)}</label>
          <textarea id="practice-input" placeholder="${escapeHtml(s.placeholder || "")}"></textarea>
          <p class="hint">Indice : ${escapeHtml(s.hint || "Relisez l’étape Comprendre.")}</p>
          <div class="phase-actions" style="border:0;padding-top:0.75rem;margin-top:0.75rem">
            <button type="button" class="btn btn-dark" id="check-practice">Vérifier mon essai</button>
            <button type="button" class="btn btn-ghost" data-phase="comprendre">Revoir l’explication</button>
          </div>
          <div id="practice-feedback"></div>
        </div>
        <div class="phase-actions">
          <button type="button" class="btn btn-primary" data-phase="verifier">Aller au quiz</button>
        </div>`;
    } else if (phase === "verifier") {
      const q = lesson.verifier;
      body = `
        <p class="lesson-kicker">Vérifier</p>
        <h1>Petit contrôle</h1>
        <div class="quiz-box">
          <p class="q-title">${escapeHtml(q.question)}</p>
          <div class="quiz-options">
            ${q.options
              .map(
                (opt, i) => `
              <label>
                <input type="radio" name="quiz" value="${i}" />
                <span>${escapeHtml(opt)}</span>
              </label>`
              )
              .join("")}
          </div>
          <div class="phase-actions" style="border:0;padding-top:0.75rem;margin-top:0.75rem">
            <button type="button" class="btn btn-dark" id="check-quiz">Valider la réponse</button>
          </div>
          <div id="quiz-feedback"></div>
        </div>`;
    } else if (phase === "retenir") {
      body = `
        <p class="lesson-kicker">Synthèse</p>
        <h1>À retenir</h1>
        <ul class="retain-list">
          ${lesson.retenir.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}
        </ul>
        <div class="phase-actions">
          <button type="button" class="btn btn-ghost" data-nav-inline="parcours">Retour au parcours</button>
          ${
            nextLessonId(lesson.id)
              ? `<button type="button" class="btn btn-primary" data-open-lesson="${nextLessonId(lesson.id)}">Leçon suivante</button>`
              : `<button type="button" class="btn btn-primary" data-nav-inline="playground">Ouvrir l’atelier code</button>`
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
              ${phases
                .map(
                  (p) => `
                <button type="button" data-phase="${p.id}"${phase === p.id ? ' aria-current="true"' : ""}>${p.label}</button>`
                )
                .join("")}
            </div>
          </aside>
          <article class="lesson-panel" id="lesson-panel">
            ${body}
          </article>
        </div>
      </div>
    `;
  }

  function renderPlayground() {
    return `
      <div class="wrap">
        <h1 class="section-title">Atelier code</h1>
        <p class="section-lead">Éditez, laissez l’autocomplétion vous guider (Tab / Entrée), puis exécutez. Les erreurs sont traduites en français clair — pas un mur de traceback.</p>
        <div class="playground-help">
          <span><strong>Ctrl</strong>+<strong>Entrée</strong> : exécuter</span>
          <span><strong>Ctrl</strong>+<strong>Espace</strong> : suggestions</span>
          <span><strong>.</strong> : méthodes / attributs</span>
          <span><strong>(</strong> : paramètres</span>
          <span><strong>‹ ›</strong> : erreurs 1/N</span>
        </div>
        <div class="playground">
          <div class="pane">
            <header>
              <span>Éditeur</span>
              <button type="button" class="btn btn-small btn-dark" id="run-python" title="Raccourci : Ctrl+Entrée">Exécuter <kbd>Ctrl</kbd>+<kbd>Entrée</kbd></button>
            </header>
            <textarea id="py-code" spellcheck="false" autocomplete="off">print("Bonjour depuis Python Atelier")
print(2 + 2)

prenom = "Fidele"
print("Bienvenue", prenom)</textarea>
          </div>
          <div class="pane">
            <header><span>Sortie guidée</span><span id="py-status">Prêt</span></header>
            <div id="py-teacher"></div>
            <pre id="py-output">Exécutez avec le bouton ou Ctrl+Entrée. S’il y a plusieurs erreurs, naviguez avec ‹ 1/N ›.</pre>
          </div>
        </div>
        <p class="playground-note">Conseil : testez plusieurs fautes d’un coup (ex. Print et prenom.) — le professeur les liste toutes, une par une.</p>
      </div>
    `;
  }

  function renderGlossaire() {
    return `
      <div class="wrap">
        <h1 class="section-title">Glossaire bienveillant</h1>
        <p class="section-lead">Les mots techniques, expliqués sans snobisme.</p>
        <dl class="glossary-grid">
          ${data.glossary
            .map(
              (g) => `
            <div class="glossary-item">
              <dt>${escapeHtml(g.term)}</dt>
              <dd>${escapeHtml(g.def)}</dd>
            </div>`
            )
            .join("")}
        </dl>
      </div>
    `;
  }

  function bindViewEvents() {
    main.querySelectorAll("[data-nav-inline]").forEach((btn) => {
      btn.addEventListener("click", () => navigate(btn.dataset.navInline));
    });

    main.querySelectorAll("[data-open-lesson]").forEach((btn) => {
      btn.addEventListener("click", () => {
        navigate("lesson", { lessonId: btn.dataset.openLesson, phase: "voir" });
      });
    });

    main.querySelectorAll("[data-phase]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.phase = btn.dataset.phase;
        render();
      });
    });

    const practiceInput = document.getElementById("practice-input");
    if (practiceInput && window.AtelierEditor) {
      window.AtelierEditor.attachAutocomplete(practiceInput);
    }

    const checkPracticeBtn = document.getElementById("check-practice");
    if (checkPracticeBtn) {
      checkPracticeBtn.addEventListener("click", () => {
        const found = getLesson(state.lessonId);
        if (!found) return;
        const value = document.getElementById("practice-input").value;
        const result = checkPractice(found.lesson, value);
        const box = document.getElementById("practice-feedback");
        let html = `<div class="feedback ${result.ok ? "ok" : "ko"}">${escapeHtml(result.message)}</div>`;
        if (!result.ok && window.AtelierEditor) {
          const issues = window.AtelierEditor.collectIssues(value, null);
          if (issues.length) {
            teacherIssues = issues;
            teacherIndex = 0;
            html += `<div id="practice-teacher"></div>`;
          }
        }
        box.innerHTML = html;
        const practiceTeacher = document.getElementById("practice-teacher");
        if (practiceTeacher && teacherIssues.length) {
          paintTeacher(practiceTeacher);
        }
      });
    }

    const checkQuizBtn = document.getElementById("check-quiz");
    if (checkQuizBtn) {
      checkQuizBtn.addEventListener("click", () => {
        const found = getLesson(state.lessonId);
        if (!found) return;
        const selected = main.querySelector('input[name="quiz"]:checked');
        const box = document.getElementById("quiz-feedback");
        if (!selected) {
          box.innerHTML = `<div class="feedback ko">Choisissez une réponse avant de valider.</div>`;
          return;
        }
        const q = found.lesson.verifier;
        const ok = Number(selected.value) === q.answer;
        if (ok) {
          markLessonComplete(found.lesson.id);
          box.innerHTML = `
            <div class="feedback ok">${escapeHtml(q.explainOk)}</div>
            <div class="phase-actions" style="border:0;margin-top:0.9rem;padding-top:0">
              <button type="button" class="btn btn-primary" data-phase="retenir">Voir la synthèse</button>
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

    const runBtn = document.getElementById("run-python");
    if (runBtn) {
      runBtn.addEventListener("click", () => runPlayground());
    }

    const pyCode = document.getElementById("py-code");
    if (pyCode && window.AtelierEditor) {
      window.AtelierEditor.attachAutocomplete(pyCode);
    }

    const printBtn = document.getElementById("print-carnet");
    if (printBtn) {
      printBtn.addEventListener("click", () => window.print());
    }

    const bilanForm = document.getElementById("bilan-form");
    if (bilanForm) {
      bilanForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const result = gradeBilan(bilanForm);
        saveBilanResult({
          score: result.score,
          correct: result.correct,
          total: result.total,
          passed: result.passed,
          at: Date.now()
        });
        const box = document.getElementById("bilan-result");
        box.innerHTML = renderBilanResult(result);
        box.querySelectorAll("[data-nav-inline]").forEach((btn) => {
          btn.addEventListener("click", () => navigate(btn.dataset.navInline));
        });
        box.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      const resetBtn = document.getElementById("bilan-reset");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          bilanForm.reset();
          const box = document.getElementById("bilan-result");
          if (box) box.innerHTML = "";
        });
      }
    }
  }

  let pyodidePromise = null;
  let pyodideLoadFailed = false;
  let teacherIssues = [];
  let teacherIndex = 0;

  function paintTeacher(container) {
    if (!container || !window.AtelierEditor || !teacherIssues.length) return;
    if (teacherIndex < 0) teacherIndex = 0;
    if (teacherIndex >= teacherIssues.length) teacherIndex = teacherIssues.length - 1;

    // Copie pour éviter toute mutation partielle entre pages
    const issue = { ...teacherIssues[teacherIndex] };
    const total = teacherIssues.length;

    container.innerHTML = window.AtelierEditor.renderTeacherCard(issue, {
      index: teacherIndex,
      total
    });

    if (!container.dataset.errNavBound) {
      container.dataset.errNavBound = "1";
      container.addEventListener("click", (e) => {
        const prev = e.target.closest("[data-err-prev]");
        const next = e.target.closest("[data-err-next]");
        if (!prev && !next) return;
        e.preventDefault();
        if (prev && teacherIndex > 0) {
          teacherIndex -= 1;
          paintTeacher(container);
        }
        if (next && teacherIndex < teacherIssues.length - 1) {
          teacherIndex += 1;
          paintTeacher(container);
        }
      });
    }

    const prev = container.querySelector("[data-err-prev]");
    const next = container.querySelector("[data-err-next]");
    if (prev) prev.disabled = teacherIndex <= 0;
    if (next) next.disabled = teacherIndex >= teacherIssues.length - 1;
  }

  function showTeacherIssues(issues) {
    // Aucun plafond : on garde la liste complète renvoyée par collectIssues
    teacherIssues = Array.isArray(issues) ? issues.map((i) => ({ ...i })) : [];
    teacherIndex = 0;
    const teacher = document.getElementById("py-teacher");
    if (!teacher) return;
    if (!teacherIssues.length) {
      teacher.innerHTML = "";
      return;
    }
    paintTeacher(teacher);
  }

  function clearTeacher() {
    teacherIssues = [];
    teacherIndex = 0;
    const teacher = document.getElementById("py-teacher");
    if (teacher) teacher.innerHTML = "";
  }

  async function ensurePyodide(statusEl) {
    if (window.__atelierPyodide) return window.__atelierPyodide;
    if (pyodideLoadFailed) throw new Error("PYODIDE_UNAVAILABLE");
    if (!pyodidePromise) {
      statusEl.textContent = "Chargement Python…";
      pyodidePromise = (async () => {
        if (!window.loadPyodide) {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js";
            script.onload = resolve;
            script.onerror = () => reject(new Error("PYODIDE_UNAVAILABLE"));
            document.head.appendChild(script);
          });
        }
        const pyodide = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/"
        });
        window.__atelierPyodide = pyodide;
        return pyodide;
      })().catch((err) => {
        pyodideLoadFailed = true;
        pyodidePromise = null;
        throw err;
      });
    }
    return pyodidePromise;
  }

  async function runPlayground() {
    const code = document.getElementById("py-code").value;
    const output = document.getElementById("py-output");
    const status = document.getElementById("py-status");
    clearTeacher();

    try {
      const pyodide = await ensurePyodide(status);
      status.textContent = "Exécution…";
      let stdout = "";
      pyodide.setStdout({
        batched: (s) => {
          stdout += s;
        }
      });
      pyodide.setStderr({
        batched: (s) => {
          stdout += s;
        }
      });
      output.textContent = "";
      await pyodide.runPythonAsync(code);
      output.textContent = stdout || "(Aucune sortie — ajoutez un print pour voir un résultat.)";
      status.textContent = "Réussi";
      clearTeacher();
    } catch (err) {
      const message = err && err.message ? err.message : String(err);
      const isUnavailable =
        pyodideLoadFailed ||
        message.includes("PYODIDE_UNAVAILABLE") ||
        /Failed to fetch|loadPyodide|CDN|NetworkError/i.test(message);

      if (isUnavailable) {
        status.textContent = "Sans moteur";
        const issues = window.AtelierEditor
          ? window.AtelierEditor.collectIssues(code, null)
          : [];
        if (issues.length) {
          issues.forEach((i) => {
            if (!i.technical) {
              i.technical = "Moteur Python navigateur indisponible — analyse locale.";
            }
          });
          showTeacherIssues(issues);
          output.textContent = `${issues.length} point(s) détecté(s) en lecture guidée. Naviguez avec ‹ › si besoin.`;
        } else if (window.AtelierEditor) {
          showTeacherIssues([
            {
              title: "Moteur Python indisponible hors ligne",
              problem: "Le navigateur n’a pas pu charger Python (réseau / CDN).",
              why: "Ce n’est pas une faute dans votre logique d’apprentissage.",
              fix: "Relisez guillemets, print en minuscules, et les « : ». Ou ouvrez le projet en local avec Python installé.",
              technical: message,
              snippet: "",
              line: null
            }
          ]);
          output.textContent = "Mode lecture guidée activé.";
        }
        return;
      }

      // Erreur(s) apprenant : analyse locale + erreur runtime, navigables
      status.textContent = "À corriger";
      const issues = window.AtelierEditor
        ? window.AtelierEditor.collectIssues(code, message)
        : [];
      showTeacherIssues(issues);
      const n = issues.length;
      output.textContent =
        n > 1
          ? `${n} points à revoir. Utilisez ‹ › pour basculer (ex. 1/${n}), puis réexécutez avec Ctrl+Entrée.`
          : "Corrigez selon l’explication du professeur, puis réessayez (Ctrl+Entrée).";
    }
  }

  // Raccourci global : Ctrl+Entrée (ou Cmd+Entrée) pour exécuter dans l’atelier
  document.addEventListener("keydown", (e) => {
    if (state.view !== "playground") return;
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      runPlayground();
    }
    // Flèches gauche/droite pour les erreurs quand le focus n'est pas dans un champ multiligne en train d’éditer avec sélection — seulement si Alt
    if (e.altKey && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
      const teacher = document.getElementById("py-teacher");
      if (!teacher || !teacherIssues.length) return;
      e.preventDefault();
      if (e.key === "ArrowLeft" && teacherIndex > 0) {
        teacherIndex -= 1;
        paintTeacher(teacher);
      }
      if (e.key === "ArrowRight" && teacherIndex < teacherIssues.length - 1) {
        teacherIndex += 1;
        paintTeacher(teacher);
      }
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
      case "carnet":
        main.innerHTML = renderCarnet();
        break;
      case "bilan":
        main.innerHTML = renderBilan();
        break;
      case "labo":
        main.innerHTML = renderLabo();
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
