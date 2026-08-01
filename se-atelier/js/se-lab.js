/* Studio S&E — modèles + QC Kalunga */
window.SELab = {
  templates: [
    {
      id: "cadre",
      title: "Trame — cadre de résultats",
      body: "Projet : Kalunga Nutrition & WASH (fictif)\n\nImpact :\nOutcome 1 :\n  Outputs :\n  Activités :\nOutcome 2 :\n  Outputs :\n  Activités :\n\nHypothèses clés :\n1.\n2.\nRisques majeurs :\n1.\n2.",
    },
    {
      id: "fiche",
      title: "Trame — fiche indicateur",
      body: "Nom :\nRésultat lié :\nDéfinition :\nNumérateur :\nDénominateur :\nFormule :\nDésagrégation :\nFréquence :\nSource :\nOutil :\nResponsable :\nBaseline :\nCible :\nSeuil d’alerte :",
    },
    {
      id: "matrice",
      title: "Trame — ligne de plan de suivi",
      body: "Indicateur | Source | Outil | Fréquence | Responsable collecte | Responsable analyse | Utilisateur décision | Cut-off",
    },
    {
      id: "note",
      title: "Trame — note de suivi (1 page)",
      body: "Période :\nPublic :\n\n1. Faits clés (3 bullets max)\n-\n-\n-\n\n2. Lecture (écarts / tendances)\n\n3. Recommandations (1–3)\n- Action — délai — responsable\n\n4. Suivi des reco précédentes",
    },
    {
      id: "eval",
      title: "Trame — questions évaluatives",
      body: "Revue : mi-parcours Kalunga\n\nQ1 (pertinence) :\nQ2 (efficacité) :\nQ3 (couverture / équité) :\nQ4 (apprentissage) :\nUsage prévu des findings :",
    },
  ],
  checklist: [
    { id: "c1", text: "Cadre de résultats avec hypothèses/risques" },
    { id: "c2", text: "Dictionnaire d’indicateurs (fiches + baseline/cibles)" },
    { id: "c3", text: "Plan de suivi (matrice + calendrier)" },
    { id: "c4", text: "Matrice indicateur ↔ collecte + règles éthiques" },
    { id: "c5", text: "Procédure QC + journal des corrections" },
    { id: "c6", text: "Reporting (note/dashboard) avec reco actionnables" },
    { id: "c7", text: "Questions évaluatives + inventaire du dossier" },
  ],
  datasets: [
    {
      id: "nutrition",
      title: "Nutrition mensuelle (admissions / guérisons)",
      path: "data/kalunga_nutrition_mensuel.csv",
      hints: [
        "Doublon exact (Est, 2025-03)",
        "Guérisons négatives (Est, 2025-04)",
        "Admissions manquantes (Sud, 2025-05)",
        "Comparer réalisé vs cible_guerison_pct",
      ],
    },
    {
      id: "wash",
      title: "Sites WASH",
      path: "data/kalunga_wash_sites.csv",
      hints: [
        "W01 et W07 : possible doublon logique",
        "W03 non fonctionnel",
        "W10 ménages_desservis = 0 si fonctionnel=oui",
      ],
    },
  ],

  parseCsv: function (text) {
    var lines = text.trim().split(/\r?\n/).filter(Boolean);
    if (!lines.length) return { headers: [], rows: [] };
    var headers = lines[0].split(",");
    var rows = lines.slice(1).map(function (line) {
      var cols = line.split(",");
      var obj = {};
      headers.forEach(function (h, i) {
        obj[h] = cols[i] !== undefined ? cols[i] : "";
      });
      return obj;
    });
    return { headers: headers, rows: rows };
  },

  qcNutrition: function (rows) {
    var issues = [];
    var seen = {};
    rows.forEach(function (r, i) {
      var key = [r.mois, r.aire_sante, r.admissions, r.guerisons].join("|");
      if (seen[key]) issues.push({ row: i + 2, type: "doublon", detail: key });
      seen[key] = true;
      if (r.admissions === "" || r.admissions == null) {
        issues.push({ row: i + 2, type: "manquant", detail: "admissions vide (" + r.mois + " / " + r.aire_sante + ")" });
      }
      var g = Number(r.guerisons);
      if (!isNaN(g) && g < 0) {
        issues.push({ row: i + 2, type: "aberrant", detail: "guerisons=" + r.guerisons });
      }
      var a = Number(r.admissions);
      if (!isNaN(a) && !isNaN(g) && a > 0) {
        var rate = (g / a) * 100;
        var cible = Number(r.cible_guerison_pct) || 75;
        if (rate + 0.01 < cible) {
          issues.push({
            row: i + 2,
            type: "ecart_cible",
            detail: r.mois + " / " + r.aire_sante + " → " + rate.toFixed(1) + "% < cible " + cible + "%",
          });
        }
      }
    });
    return issues;
  },

  qcWash: function (rows) {
    var issues = [];
    var byPair = {};
    rows.forEach(function (r, i) {
      if (String(r.fonctionnel).toLowerCase() === "non") {
        issues.push({ row: i + 2, type: "statut", detail: r.site_id + " non fonctionnel (" + (r.remarques || "sans détail") + ")" });
      }
      var m = Number(r.menages_desservis);
      if (!isNaN(m) && m <= 0 && String(r.fonctionnel).toLowerCase() === "oui") {
        issues.push({ row: i + 2, type: "aberrant", detail: r.site_id + " fonctionnel avec ménages=" + r.menages_desservis });
      }
      var k = r.aire_sante + "|" + r.menages_desservis + "|" + r.type_ouvrage + "|" + r.date_visite;
      if (!byPair[k]) byPair[k] = [];
      byPair[k].push(r.site_id + " (l." + (i + 2) + ")");
    });
    Object.keys(byPair).forEach(function (k) {
      if (byPair[k].length > 1) {
        issues.push({ row: "-", type: "doublon_logique", detail: byPair[k].join(" ↔ ") });
      }
    });
    return issues;
  },
};
