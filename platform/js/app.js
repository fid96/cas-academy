/**
 * CAS Academy — Campus Analyse & Suivi
 * Plateforme LMS unifiée (Data Analyst | Expert S&E)
 *
 * Routes :
 *   #/                              → campus (choix formation)
 *   #/formation/:packId             → tableau de bord
 *   #/formation/:packId/parcours
 *   #/formation/:packId/attestation
 *   #/formation/:packId/module/:id
 */
(function () {
  const catalog = window.ADA_CATALOG;
  const Progress = window.ADAProgress;
  const campusMeta = catalog.campus || {};

  let root = Progress.load(catalog);

  const app = document.getElementById("app");
  const topbarProgress = document.getElementById("topbar-progress");
  const topbarNav = document.getElementById("topbar-nav");
  const topbarContext = document.getElementById("topbar-context");
  const siteFooter = document.getElementById("site-footer");
  const siteHeader = document.getElementById("site-header");
  const navToggle = document.getElementById("nav-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  const mobileNavLinks = document.getElementById("mobile-nav-links");

  function qs(sel, rootEl) {
    return (rootEl || document).querySelector(sel);
  }

  function getPack(packId) {
    return Progress.getPack(catalog, packId || root.activePackId);
  }

  function getModule(id) {
    for (const pack of catalog.packs) {
      const m = pack.modules.find((x) => x.id === id);
      if (m) return { pack, module: m };
    }
    return null;
  }

  function pState(packId) {
    return Progress.packState(root, packId || root.activePackId);
  }

  function statusFor(pack, mod) {
    const st = pState(pack.id);
    if (Progress.isCompleted(st, mod.id)) return "done";
    if (Progress.isUnlocked(pack.modules, st, mod.id)) return "open";
    return "locked";
  }

  function statusLabel(s) {
    if (s === "done") return "Terminé";
    if (s === "open") return "Disponible";
    return "Verrouillé";
  }

  /* ---------- ROUTER ---------- */
  function parseHash() {
    const raw = (location.hash || "#/").replace(/^#/, "");
    const parts = raw.split("/").filter(Boolean);

    if (!parts.length) return { view: "campus" };

    if (parts[0] === "a-propos") return { view: "about" };

    // Canonical LMS routes
    if (parts[0] === "formation" && parts[1]) {
      const packId = parts[1];
      if (parts[2] === "parcours") return { view: "path", packId };
      if (parts[2] === "attestation") return { view: "attestation", packId };
      if (parts[2] === "module" && parts[3]) return { view: "player", packId, id: parts[3] };
      return { view: "dashboard", packId };
    }

    // Legacy aliases → normalized in render()
    if (parts[0] === "pack" && parts[1]) return { view: "dashboard", packId: parts[1] };
    if (parts[0] === "parcours") return { view: "path", packId: root.activePackId };
    if (parts[0] === "attestation") return { view: "attestation", packId: root.activePackId };
    if (parts[0] === "module" && parts[1]) return { view: "player", id: parts[1] };

    return { view: "campus" };
  }

  function navigate(hash) {
    closeMobileNav();
    location.hash = hash;
  }

  function fBase(packId) {
    return `#/formation/${packId}`;
  }

  function ensurePack(packId) {
    if (packId && catalog.packs.some((p) => p.id === packId) && root.activePackId !== packId) {
      root = Progress.setActivePack(root, packId);
    }
  }

  function closeMobileNav() {
    document.body.classList.remove("nav-open");
    if (mobileNav) mobileNav.hidden = true;
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  }

  function syncShell(route) {
    const showCampusNav = route.view === "campus" || route.view === "about";
    document.body.classList.toggle("is-campus", route.view === "campus");
    document.body.classList.toggle("is-about", route.view === "about");
    document.body.classList.toggle("is-formation", !showCampusNav && route.view !== "player");
    document.body.classList.toggle("is-player", route.view === "player");

    const pack = route.packId ? getPack(route.packId) : null;

    const campusLinks = `
      <a href="#/">Formations</a>
      <a href="#/#methode">Méthode</a>
      <a href="#/#catalogue">Catalogue</a>
      <a href="#/a-propos">À propos</a>`;

    const formationLinks = pack
      ? `
      <a href="#/">Campus</a>
      <a href="${fBase(pack.id)}">${escapeHtml(pack.shortTitle || pack.title)}</a>
      <a href="${fBase(pack.id)}/parcours">Parcours</a>
      <a href="${fBase(pack.id)}/attestation">Attestation</a>
      <a href="#/a-propos">À propos</a>`
      : campusLinks;

    if (topbarNav) topbarNav.innerHTML = showCampusNav ? campusLinks : formationLinks;
    if (mobileNavLinks) mobileNavLinks.innerHTML = showCampusNav ? campusLinks : formationLinks;

    // Active state
    const markActive = (nav) => {
      if (!nav) return;
      nav.querySelectorAll("a").forEach((a) => {
        const href = a.getAttribute("href") || "";
        let on = false;
        if (route.view === "about") on = href === "#/a-propos";
        else if (route.view === "campus") on = href === "#/";
        else if (route.view === "path") on = href.endsWith("/parcours");
        else if (route.view === "attestation") on = href.endsWith("/attestation");
        else if (route.view === "dashboard") on = href === fBase(route.packId);
        else if (route.view === "player") on = href.endsWith("/parcours");
        a.classList.toggle("is-active", on);
      });
    };
    markActive(topbarNav);
    markActive(mobileNavLinks);

    if (topbarContext) {
      if (pack && !showCampusNav) {
        topbarContext.hidden = false;
        topbarContext.textContent = pack.title;
      } else {
        topbarContext.hidden = true;
        topbarContext.textContent = "";
      }
    }

    if (topbarProgress) {
      if (!pack || showCampusNav) {
        topbarProgress.innerHTML = "";
      } else {
        const st = pState(pack.id);
        const pct = Progress.percent(pack.modules, st);
        const done = Progress.completedCount(pack.modules, st);
        topbarProgress.innerHTML =
          `<span class="pct-label">${done}/${pack.modules.length}</span>` +
          `<span class="pct-bar" aria-hidden="true"><i style="width:${pct}%"></i></span>` +
          `<span class="pct-num">${pct}%</span>`;
      }
    }

    renderFooter(route, pack);
    document.title =
      route.view === "about"
        ? "À propos · CAS Academy"
        : route.view === "campus"
          ? "CAS Academy — Campus Analyse & Suivi"
          : pack
            ? `${pack.title} · CAS Academy`
            : "CAS Academy";
  }

  function renderFooter(route, pack) {
    if (!siteFooter || route.view === "player") return;
    const year = new Date().getFullYear();
    siteFooter.innerHTML = `
      <div class="footer-inner">
        <div class="footer-brand">
          <img src="platform/assets/logo-cas.svg" width="48" height="48" alt="" />
          <div>
            <p class="name">CAS Academy</p>
            <p class="tag">Campus Analyse &amp; Suivi</p>
            <p>Plateforme de formation professionnelle : analyser les données, suivre les résultats, décider avec des preuves.</p>
          </div>
        </div>
        <div class="footer-col">
          <h4>Formations</h4>
          <ul>
            ${catalog.packs
              .map((p) => `<li><a href="${fBase(p.id)}">${escapeHtml(p.title)}</a></li>`)
              .join("")}
            <li><a href="#/#catalogue">Catalogue</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Parcours</h4>
          <ul>
            ${
              pack
                ? `<li><a href="${fBase(pack.id)}/parcours">Modules ${escapeHtml(pack.shortTitle || "")}</a></li>
                   <li><a href="${fBase(pack.id)}/attestation">Attestation</a></li>`
                : `<li><a href="#/#methode">Méthode</a></li>
                   <li><a href="#/#catalogue">Choisir une formation</a></li>`
            }
            <li><a href="#/">Retour campus</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>À propos</h4>
          <ul>
            <li><a href="#/#methode">Comment ça marche</a></li>
            <li><span>Progression enregistrée localement</span></li>
            <li><span>Attestation dynamique par formation</span></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${year} CAS Academy · Campus Analyse &amp; Suivi</span>
        <span>DA &amp; S&amp;E</span>
      </div>`;
  }

  function render() {
    root = Progress.load(catalog);
    let route = parseHash();

    if (route.view === "player" && !route.packId && route.id) {
      const found = getModule(route.id);
      if (found) route = { ...route, packId: found.pack.id };
    }

    if (route.packId) ensurePack(route.packId);

    // Redirect legacy shallow routes into formation namespace when possible
    if (route.view !== "campus" && route.packId) {
      const h = location.hash || "";
      if (h.startsWith("#/parcours") || h.startsWith("#/attestation") || h.startsWith("#/module/") || h.startsWith("#/pack/")) {
        const target =
          route.view === "path"
            ? `${fBase(route.packId)}/parcours`
            : route.view === "attestation"
              ? `${fBase(route.packId)}/attestation`
              : route.view === "player"
                ? `${fBase(route.packId)}/module/${route.id}`
                : fBase(route.packId);
        if (location.hash !== target) {
          location.replace(target);
          return;
        }
      }
    }

    syncShell(route);

    if (route.view === "about") renderAbout();
    else if (route.view === "path") renderPath(route.packId);
    else if (route.view === "player") renderPlayer(route.packId, route.id);
    else if (route.view === "attestation") renderAttestation(route.packId);
    else if (route.view === "dashboard") renderDashboard(route.packId);
    else renderCampus();

    if (route.view === "campus") {
      const parts = (location.hash || "").split("#").filter(Boolean);
      const frag = parts.length > 1 ? parts[parts.length - 1] : "";
      if (frag === "catalogue" || frag === "methode") {
        requestAnimationFrame(() => {
          document.getElementById(frag)?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    }
  }

  /* ---------- À PROPOS ---------- */
  function renderAbout() {
    app.innerHTML = `
      <div class="about-page">
        <section class="about-hero reveal">
          <p class="eyebrow">CAS Academy</p>
          <h1>Campus Analyse &amp; Suivi</h1>
          <p class="lede">Une plateforme conçue pour professionnaliser deux métiers complémentaires : l’analyse de données et le suivi-évaluation.</p>
        </section>

        <section class="section about-grid reveal reveal-d1">
          <article class="about-block">
            <h2>Notre approche</h2>
            <p>Chaque formation est un parcours guidé : modules progressifs, cas d’exercice concrets, validation et attestation. L’objectif n’est pas de « voir des outils », mais de produire des décisions utiles.</p>
          </article>
          <article class="about-block">
            <h2>Deux formations, un même campus</h2>
            <p><strong>Data Analyst</strong> : Excel → Stats → Collecte → SQL → Python → Power BI → Storytelling → SIG → Qualité → IA → Éthique.</p>
            <p><strong>Expert S&amp;E</strong> : métier → cadre → indicateurs → plan → collecte → qualité → reporting → maîtrise → SIG → Qualité → évaluation → Éthique.</p>
          </article>
          <article class="about-block">
            <h2>Ce que vous emportez</h2>
            <ul class="about-list">
              <li>Une méthode transférable sur vos projets réels</li>
              <li>Une progression claire, module par module</li>
              <li>Une attestation nominative à la validation du parcours</li>
            </ul>
          </article>
        </section>

        <section class="section about-cta reveal reveal-d2">
          <h2>Prêt à commencer ?</h2>
          <p class="muted">Sélectionnez la formation qui correspond à votre rôle.</p>
          <div class="cta-row">
            <button type="button" class="btn btn-primary" data-go="#/#catalogue">Voir les formations</button>
            <button type="button" class="btn btn-ghost" data-go="#/formation/data-analyst">Data Analyst</button>
            <button type="button" class="btn btn-ghost" data-go="#/formation/se">Expert S&amp;E</button>
          </div>
        </section>
      </div>
    `;
    bindGo(app);
  }

  /* ---------- CAMPUS (choix formation) ---------- */
  function renderCampus() {
    const c = campusMeta;
    app.innerHTML = `
      <section class="campus-stage">
        <div class="campus-hero-inner">
          <div class="reveal">
            <h1 class="campus-brand-mark">
              <span>${escapeHtml(c.fullName || "Campus Analyse & Suivi")}</span>
              ${escapeHtml(c.brand || "CAS Academy")}
            </h1>
            <p class="campus-headline">${escapeHtml(c.tagline || "Analyser. Suivre. Décider.")}</p>
            <p class="campus-lede">${escapeHtml(c.lede || "")}</p>
            <div class="cta-row">
              <a class="btn btn-primary" href="#/#catalogue">Choisir ma formation</a>
              <a class="btn btn-ghost" href="#/#methode" style="color:#f4faf7;box-shadow:inset 0 0 0 1.5px rgba(244,250,247,.35)">Voir la méthode</a>
            </div>
          </div>
          <div class="campus-visual reveal reveal-d2" aria-hidden="true">
            <svg viewBox="0 0 420 320" xmlns="http://www.w3.org/2000/svg">
              <circle class="ring" cx="210" cy="150" r="118" fill="none" stroke="rgba(244,250,247,0.12)" stroke-width="1.5"/>
              <circle cx="210" cy="150" r="88" fill="none" stroke="rgba(196,163,90,0.35)" stroke-width="1.2" stroke-dasharray="6 8"/>
              <rect x="118" y="168" width="28" height="72" rx="6" fill="#e8d5a3"/>
              <rect x="158" y="128" width="28" height="112" rx="6" fill="#f0e0b0"/>
              <rect x="198" y="96" width="28" height="144" rx="6" fill="#e8d5a3"/>
              <rect x="238" y="140" width="28" height="100" rx="6" fill="#d4bc7a"/>
              <path d="M108 120 C150 70, 250 60, 300 110 C330 140, 320 190, 280 210" fill="none" stroke="#f4faf7" stroke-width="3" stroke-linecap="round"/>
              <path d="M280 210 L268 188 L292 192 Z" fill="#c4a35a"/>
              <text x="210" y="278" text-anchor="middle" fill="rgba(244,250,247,0.55)" font-family="Syne, sans-serif" font-size="14" font-weight="700" letter-spacing="3">ANALYSE + SUIVI</text>
            </svg>
          </div>
        </div>
        <a class="hero-scroll" href="#/#catalogue">Explorer</a>
      </section>

      <div class="campus-band">
        <section class="section" id="catalogue">
          <div class="section-head reveal">
            <p class="eyebrow">Catalogue</p>
            <h2>Choisissez votre formation</h2>
            <p class="muted">Chaque parcours a sa progression, ses modules et son attestation.</p>
          </div>
          <div class="formation-grid">
            ${catalog.packs
              .map((p, i) => {
                const st = pState(p.id);
                const pct = Progress.percent(p.modules, st);
                const done = Progress.completedCount(p.modules, st);
                const resume = Progress.nextToResume(p.modules, st);
                const started = done > 0 || pct > 0;
                return `
                <article class="formation-card accent-${escapeAttr(p.accent || "da")} reveal reveal-d${Math.min(i + 1, 4)}">
                  <div class="formation-card-top">
                    <span class="badge badge-open">${escapeHtml(p.badge || "Formation")}</span>
                    <span class="formation-code">${escapeHtml(p.shortTitle || p.id)}</span>
                  </div>
                  <h3>${escapeHtml(p.title)}</h3>
                  <p class="formation-tagline">${escapeHtml(p.tagline)}</p>
                  <ul class="formation-meta">
                    <li><strong>Public</strong> ${escapeHtml(p.audience || "—")}</li>
                    <li><strong>Objectif</strong> ${escapeHtml(p.outcome || "—")}</li>
                    <li><strong>Durée</strong> ${escapeHtml(p.duration || "—")} · ${p.modules.length} modules</li>
                  </ul>
                  <ul class="formation-highlights">
                    ${(p.highlights || []).map((h) => `<li>${escapeHtml(h)}</li>`).join("")}
                  </ul>
                  <div class="formation-progress">
                    <span>${done}/${p.modules.length}</span>
                    <span class="pct-bar" aria-hidden="true"><i style="width:${pct}%"></i></span>
                    <span>${pct}%</span>
                  </div>
                  <div class="cta-row">
                    <button type="button" class="btn btn-primary" data-go="${fBase(p.id)}">
                      ${started ? "Continuer" : "Entrer dans la formation"}
                    </button>
                    ${
                      started
                        ? `<button type="button" class="btn btn-ghost btn-sm" data-go="${fBase(p.id)}/module/${resume.id}">Reprendre · ${escapeHtml(resume.title)}</button>`
                        : `<button type="button" class="btn btn-ghost btn-sm" data-go="${fBase(p.id)}/parcours">Voir le parcours</button>`
                    }
                  </div>
                </article>`;
              })
              .join("")}
          </div>
        </section>

        <section class="section" id="methode">
          <div class="section-head reveal">
            <p class="eyebrow">Méthode</p>
            <h2>Comment ça fonctionne</h2>
            <p class="muted">Un campus, deux formations, une logique d’apprentissage guidée.</p>
          </div>
          <ol class="how-steps">
            <li class="reveal reveal-d1"><strong>Choisir</strong> Data Analyst ou Expert S&amp;E selon votre métier</li>
            <li class="reveal reveal-d2"><strong>Suivre</strong> les modules dans l’ordre — déblocage progressif</li>
            <li class="reveal reveal-d3"><strong>Valider</strong> puis obtenir une attestation dynamique</li>
          </ol>
          <div class="methode-strip reveal reveal-d2">
            <article>
              <h3>Analyse</h3>
              <p>Chaîne data opérationnelle : collecte, traitement, visualisation, storytelling.</p>
            </article>
            <article>
              <h3>Suivi</h3>
              <p>Système S&amp;E : cadre de résultats, indicateurs, QC, reporting, évaluation.</p>
            </article>
            <article>
              <h3>Décision</h3>
              <p>Des preuves actionnables pour piloter programmes et projets.</p>
            </article>
          </div>
        </section>
      </div>
    `;
    bindGo(app);
  }

  /* ---------- DASHBOARD formation ---------- */
  function renderDashboard(packId) {
    const pack = getPack(packId);
    const mods = pack.modules;
    const st = pState(pack.id);
    const resume = Progress.nextToResume(mods, st);
    const pct = Progress.percent(mods, st);
    const allDone = Progress.isPackComplete(mods, st);
    const attest = Progress.getAttestation(st);

    app.innerHTML = `
      <nav class="crumb reveal" aria-label="Fil d’Ariane">
        <a href="#/">Campus</a>
        <span>/</span>
        <span>${escapeHtml(pack.title)}</span>
      </nav>

      <section class="hero formation-hero accent-${escapeAttr(pack.accent || "da")} reveal">
        <div class="hero-copy">
          <p class="eyebrow">${escapeHtml(pack.badge || "Formation")} · CAS Academy</p>
          <h1>${escapeHtml(pack.title)}</h1>
          <p class="lede">${escapeHtml(pack.tagline)}</p>
          <div class="cta-row">
            <button type="button" class="btn btn-primary" data-go="${fBase(pack.id)}/module/${resume.id}">
              ${pct === 0 ? "Commencer" : allDone ? "Revoir un module" : "Continuer"}
            </button>
            <button type="button" class="btn btn-ghost" data-go="${fBase(pack.id)}/parcours">Parcours</button>
            <button type="button" class="btn ${allDone ? "btn-primary" : "btn-ghost"}" data-go="${fBase(pack.id)}/attestation">Attestation</button>
            <button type="button" class="btn btn-ghost" data-go="#/">Changer de formation</button>
          </div>
          ${
            allDone
              ? `<p class="attest-callout">Formation validée${
                  attest ? ` · ${escapeHtml(attest.fullName)} · ${escapeHtml(attest.number)}` : ""
                } — <a href="${fBase(pack.id)}/attestation">attestation</a>.</p>`
              : `<p class="progress-line">Progression : <strong>${pct}%</strong> · Prochain : <strong>${escapeHtml(resume.title)}</strong></p>`
          }
        </div>
        <div class="hero-panel" aria-hidden="true">
          <ol class="hero-steps">
            ${mods
              .map((m) => {
                const s = statusFor(pack, m);
                return `<li class="st-${s}"><span>${m.order}</span>${escapeHtml(m.title)}</li>`;
              })
              .join("")}
          </ol>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <h2>Modules</h2>
          <p class="muted">${escapeHtml(pack.audience || "")}</p>
        </div>
        <div class="module-grid">
          ${mods
            .map((m) => {
              const s = statusFor(pack, m);
              const locked = s === "locked";
              return `
              <article class="card module-card st-${s}">
                <div class="card-top">
                  <span class="order">${String(m.order).padStart(2, "0")}</span>
                  <span class="badge badge-${s}">${statusLabel(s)}</span>
                </div>
                <h3>${escapeHtml(m.title)}</h3>
                <p class="muted">${escapeHtml(m.subtitle)}</p>
                <p>${escapeHtml(m.blurb)}</p>
                <p class="meta">${escapeHtml(m.duration || "")}</p>
                <button type="button" class="btn ${locked ? "btn-disabled" : "btn-primary"} btn-sm"
                  data-go="${fBase(pack.id)}/module/${m.id}" ${locked ? "disabled" : ""}>
                  ${locked ? "Module précédent requis" : s === "done" ? "Rouvrir" : "Ouvrir"}
                </button>
              </article>`;
            })
            .join("")}
        </div>
      </section>
    `;
    bindGo(app);
  }

  function renderPath(packId) {
    const pack = getPack(packId);
    const mods = pack.modules;
    app.innerHTML = `
      <nav class="crumb reveal" aria-label="Fil d’Ariane">
        <a href="#/">Campus</a><span>/</span>
        <a href="${fBase(pack.id)}">${escapeHtml(pack.title)}</a><span>/</span>
        <span>Parcours</span>
      </nav>
      <section class="section path-section reveal">
        <div class="section-head">
          <h1>Parcours — ${escapeHtml(pack.title)}</h1>
          <p class="muted">Déblocage après « Marquer comme terminé » (ou quiz bilan S&amp;E).</p>
        </div>
        <ol class="path-list">
          ${mods
            .map((m, i) => {
              const s = statusFor(pack, m);
              const locked = s === "locked";
              const prev = mods[i - 1];
              return `
              <li class="path-item st-${s}">
                <div class="path-rail"><span>${m.order}</span></div>
                <div class="path-body">
                  <div class="path-title-row">
                    <h2>${escapeHtml(m.title)}</h2>
                    <span class="badge badge-${s}">${statusLabel(s)}</span>
                  </div>
                  <p class="muted">${escapeHtml(m.subtitle)} · ${escapeHtml(m.duration || "")}</p>
                  <p>${escapeHtml(m.blurb)}</p>
                  ${
                    locked && prev
                      ? `<p class="lock-hint">Après <strong>${escapeHtml(prev.title)}</strong>.</p>`
                      : ""
                  }
                  <div class="path-actions">
                    <button type="button" class="btn ${locked ? "btn-disabled" : "btn-primary"} btn-sm"
                      data-go="${fBase(pack.id)}/module/${m.id}" ${locked ? "disabled" : ""}>
                      ${locked ? "Verrouillé" : "Ouvrir"}
                    </button>
                  </div>
                </div>
              </li>`;
            })
            .join("")}
        </ol>
        <div class="path-foot">
          <button type="button" class="btn btn-ghost" data-go="${fBase(pack.id)}/attestation">Attestation</button>
          <button type="button" class="btn btn-ghost" data-go="#/">Autres formations</button>
          <button type="button" class="btn btn-ghost btn-danger-ghost" id="reset-progress">Réinitialiser cette formation</button>
        </div>
      </section>
    `;
    bindGo(app);
    qs("#reset-progress", app)?.addEventListener("click", () => {
      if (confirm("Réinitialiser la progression de « " + pack.title + " » ?")) {
        root = Progress.resetPack(catalog, root, pack.id);
        render();
      }
    });
  }

  function renderAttestation(packId) {
    const pack = getPack(packId);
    const mods = pack.modules;
    const st = pState(pack.id);
    const complete = Progress.isPackComplete(mods, st);
    const attest = Progress.getAttestation(st);
    const done = Progress.completedCount(mods, st);

    const crumb = `
      <nav class="crumb reveal" aria-label="Fil d’Ariane">
        <a href="#/">Campus</a><span>/</span>
        <a href="${fBase(pack.id)}">${escapeHtml(pack.title)}</a><span>/</span>
        <span>Attestation</span>
      </nav>`;

    if (!complete) {
      app.innerHTML = `
        ${crumb}
        <section class="section attest-gate reveal">
          <div class="section-head">
            <h1>Attestation — ${escapeHtml(pack.title)}</h1>
            <p class="muted">Disponible après les ${mods.length} modules.</p>
          </div>
          <div class="card gate-card">
            <p class="gate-status">Progression : <strong>${done}/${mods.length}</strong></p>
            <p>Terminez le parcours, puis revenez saisir l’identité du participant.</p>
            <div class="cta-row">
              <button type="button" class="btn btn-primary" data-go="${fBase(pack.id)}/parcours">Parcours</button>
              <button type="button" class="btn btn-ghost" data-go="#/">Campus</button>
            </div>
          </div>
        </section>`;
      bindGo(app);
      return;
    }

    const nameValue = escapeAttr(attest ? attest.fullName : st.participantName || "");
    app.innerHTML = `
      ${crumb}
      <section class="section attest-gate reveal">
        <div class="section-head">
          <h1>Attestation — ${escapeHtml(pack.title)}</h1>
          <p class="muted">Identité · date · numéro générés pour cette formation.</p>
        </div>
        <div class="card gate-card">
          <form id="attest-form" class="attest-form">
            <label for="participant-name">Nom complet du participant</label>
            <input id="participant-name" type="text" required minlength="3" maxlength="80"
              placeholder="Ex. Fidele Masengo Kalenga" value="${nameValue}" autocomplete="name" />
            <p class="field-hint">Nom imprimé sur l’attestation.</p>
            ${
              attest
                ? `<p class="attest-issued">${escapeHtml(attest.fullName)} · ${escapeHtml(attest.dateLabel)} · ${escapeHtml(attest.number)}</p>`
                : ""
            }
            <div class="cta-row">
              <button type="submit" class="btn btn-primary">${attest ? "Mettre à jour et ouvrir" : "Générer et ouvrir"}</button>
              ${attest ? `<a class="btn btn-ghost" href="attestation-modele.html" target="_blank" rel="noopener">Ouvrir</a>` : ""}
              <button type="button" class="btn btn-ghost" data-go="#/">Campus</button>
            </div>
          </form>
        </div>
      </section>`;
    bindGo(app);
    qs("#attest-form", app).addEventListener("submit", (e) => {
      e.preventDefault();
      try {
        root = Progress.issueAttestation(root, pack.id, qs("#participant-name", app).value || "");
        window.open("attestation-modele.html", "_blank", "noopener");
        renderAttestation(pack.id);
      } catch (err) {
        alert(err.message || "Émission impossible.");
      }
    });
  }

  function renderPlayer(packId, moduleId) {
    const found = getModule(moduleId);
    if (!found) {
      navigate("#/");
      return;
    }
    const pack = found.pack;
    ensurePack(pack.id);
    root = Progress.load(catalog);
    const mod = found.module;
    const mods = pack.modules;
    const st = Progress.packState(root, pack.id);

    if (!Progress.isUnlocked(mods, st, mod.id)) {
      navigate(`${fBase(pack.id)}/parcours`);
      return;
    }

    root = Progress.setLast(root, pack.id, mod.id);
    const st2 = Progress.packState(root, pack.id);
    const idx = mods.findIndex((m) => m.id === mod.id);
    const prev = mods[idx - 1];
    const next = mods[idx + 1];
    const nextUnlocked = next && Progress.isUnlocked(mods, st2, next.id);
    const done = Progress.isCompleted(st2, mod.id);
    const pct = Progress.percent(mods, st2);

    app.innerHTML = `
      <div class="player">
        <header class="player-bar">
          <div class="player-left">
            <button type="button" class="btn btn-ghost btn-sm" data-go="${fBase(pack.id)}" title="Tableau de bord">← Formation</button>
            <button type="button" class="btn btn-ghost btn-sm" data-go="${fBase(pack.id)}/parcours">Parcours</button>
            <p class="player-meta">
              <span>CAS · ${escapeHtml(pack.shortTitle || pack.title)} · ${mod.order}/${mods.length}</span>
              <strong>${escapeHtml(mod.title)}</strong>
            </p>
          </div>
          <div class="player-center" aria-hidden="true">
            <div class="player-steps">
              ${mods
                .map((m) => {
                  const s = statusFor(pack, m);
                  const current = m.id === mod.id ? " is-current" : "";
                  return `<button type="button" class="player-dot st-${s}${current}" data-go="${
                    Progress.isUnlocked(mods, st2, m.id) ? `${fBase(pack.id)}/module/${m.id}` : ""
                  }" ${Progress.isUnlocked(mods, st2, m.id) ? "" : "disabled"} title="${escapeAttr(m.title)}"></button>`;
                })
                .join("")}
            </div>
            <div class="player-pct">
              <span class="pct-bar"><i style="width:${pct}%"></i></span>
              <span>${pct}%</span>
            </div>
          </div>
          <div class="player-right">
            <button type="button" class="btn btn-ghost btn-sm" ${prev ? "" : "disabled"}
              data-go="${prev ? `${fBase(pack.id)}/module/${prev.id}` : ""}" title="Module précédent">Précédent</button>
            <button type="button" class="btn btn-sm ${done ? "btn-ghost is-done" : "btn-primary"}" id="btn-complete">
              ${done ? "Terminé ✓" : "Marquer comme terminé"}
            </button>
            <button type="button" class="btn btn-primary btn-sm" id="btn-next"
              ${next && nextUnlocked ? "" : "disabled"}
              data-go="${next && nextUnlocked ? `${fBase(pack.id)}/module/${next.id}` : ""}">Suivant</button>
          </div>
        </header>
        <div class="player-frame-wrap">
          <div class="player-loading" id="player-loading">Chargement du module…</div>
          <iframe class="player-frame is-loading" id="player-frame" title="${escapeHtml(mod.title)}" src="${escapeAttr(mod.entry)}" allow="clipboard-read; clipboard-write"></iframe>
        </div>
        <div class="player-toast" id="player-toast" hidden></div>
      </div>`;
    bindGo(app);

    const frame = qs("#player-frame", app);
    const loading = qs("#player-loading", app);

    function revealFrame() {
      if (!frame || frame.dataset.revealed === "1") return;
      frame.dataset.revealed = "1";
      frame.classList.remove("is-loading");
      frame.classList.add("is-ready");
      if (loading) {
        loading.hidden = true;
        loading.classList.add("is-done");
      }
    }

    if (frame) {
      frame.addEventListener("load", revealFrame);
      // Cas cache / load déjà terminé avant l’écouteur
      try {
        if (frame.contentDocument && frame.contentDocument.readyState === "complete") {
          revealFrame();
        }
      } catch (_) {
        /* ignore cross-origin */
      }
      // Filet de sécurité si l’événement load ne part pas
      setTimeout(revealFrame, 2500);
    }

    qs("#btn-complete", app)?.addEventListener("click", () => {
      const btn = qs("#btn-complete", app);
      const toast = qs("#player-toast", app);
      const wasDone = Progress.isCompleted(Progress.packState(root, pack.id), mod.id);
      if (wasDone) {
        root = Progress.markIncomplete(root, pack.id, mod.id);
        showToast(toast, "Module marqué comme non terminé");
      } else {
        root = Progress.markComplete(mods, root, pack.id, mod.id);
        btn?.classList.add("just-completed");
        showToast(toast, next ? "Module validé — vous pouvez passer au suivant" : "Parcours terminé — attestation disponible");
      }
      setTimeout(() => renderPlayer(pack.id, mod.id), wasDone ? 350 : 650);
    });
  }

  function showToast(el, message) {
    if (!el) return;
    el.hidden = false;
    el.textContent = message;
    el.classList.remove("is-out");
    el.classList.add("is-in");
    setTimeout(() => {
      el.classList.remove("is-in");
      el.classList.add("is-out");
      setTimeout(() => {
        el.hidden = true;
      }, 280);
    }, 2200);
  }

  function bindGo(rootEl) {
    rootEl.querySelectorAll("[data-go]").forEach((el) => {
      el.addEventListener("click", (e) => {
        const target = el.getAttribute("data-go");
        if (!target || el.disabled) return;
        e.preventDefault();
        navigate(target);
      });
    });
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(str) {
    return escapeHtml(str).replace(/'/g, "&#39;");
  }

  window.addEventListener("hashchange", render);
  window.addEventListener("scroll", () => {
    siteHeader?.classList.toggle("is-scrolled", window.scrollY > 8);
  }, { passive: true });

  navToggle?.addEventListener("click", () => {
    const open = !document.body.classList.contains("nav-open");
    document.body.classList.toggle("nav-open", open);
    if (mobileNav) mobileNav.hidden = !open;
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  mobileNavLinks?.addEventListener("click", (e) => {
    if (e.target.closest("a")) closeMobileNav();
  });

  window.addEventListener("message", (ev) => {
    const data = ev.data;
    if (!data || typeof data !== "object") return;
    if (data.type === "ada-pack-complete" && data.packId) {
      root = Progress.load(catalog);
      root = Progress.setActivePack(root, data.packId);
      root = Progress.markPackComplete(catalog, root, data.packId);
      const route = parseHash();
      syncShell(route);
      if (route.view === "player" && route.id) renderPlayer(data.packId, route.id);
      return;
    }
    if (data.type === "ada-module-complete" && data.id) {
      const found = getModule(data.id);
      if (!found) return;
      root = Progress.load(catalog);
      root = Progress.setActivePack(root, found.pack.id);
      root = Progress.markComplete(found.pack.modules, root, found.pack.id, data.id);
      const route = parseHash();
      syncShell(route);
    }
  });

  render();
})();
