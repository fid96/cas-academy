/* Labo Qualité — QC Kalunga + checklists gouvernance */
window.QualiteLab = {
  datasets: [
    {
      id: "nutrition",
      title: "Nutrition mensuelle (admissions / guérisons)",
      path: "data/kalunga_nutrition_mensuel.csv",
      packs: ["data-analyst", "se"],
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
      packs: ["data-analyst", "se"],
      hints: [
        "W01 et W07 : possible doublon logique",
        "W03 non fonctionnel",
        "W10 ménages_desservis = 0 si fonctionnel=oui",
      ],
    },
    {
      id: "benef",
      title: "Registre bénéficiaires (nominatif / sensible)",
      path: "data/kalunga_registre_benef.csv",
      packs: ["data-analyst", "se"],
      hints: [
        "B002 en doublon exact",
        "sexe = X invalide",
        "age_mois négatif ; poids aberrant (45 kg enfant)",
        "date_admission invalide / manquante",
        "Téléphones : données sensibles — ne pas publier brutes",
      ],
    },
  ],

  gouvernanceSteps: [
    {
      id: "g1",
      text: "Nommer le jeu de données, la période et le responsable qualité.",
    },
    {
      id: "g2",
      text: "Rédiger / mettre à jour le dictionnaire (définition, type, valeurs autorisées, unité).",
    },
    {
      id: "g3",
      text: "Définir les règles QC (complétude, unicité, plages, cohérence croisée).",
    },
    {
      id: "g4",
      text: "Exécuter le QC et consigner chaque correction / exclusion dans un journal.",
    },
    {
      id: "g5",
      text: "Versionner le fichier propre (ex. kalunga_nutrition_v2025-06_clean.csv).",
    },
    {
      id: "g6",
      text: "Décider go / no-go publication avec seuil d’acceptation écrit.",
    },
  ],

  checklistDa: [
    { id: "d1", text: "Dictionnaire de données à jour pour le jeu Kalunga traité" },
    { id: "d2", text: "Règles QC documentées (au moins 5 contrôles)" },
    { id: "d3", text: "Journal des corrections / exclusions renseigné" },
    { id: "d4", text: "Fichier propre versionné (nom + date)" },
    { id: "d5", text: "Données sensibles traitées (masquage / non export public)" },
    { id: "d6", text: "Note de limites jointe avant dashboard / carte / note" },
  ],

  checklistSe: [
    { id: "s1", text: "Indicateur lié : définition + source + fréquence rappelées" },
    { id: "s2", text: "Seuil d’acceptation QC écrit (ex. 0 doublon bloquant)" },
    { id: "s3", text: "QC exécuté avant tout chiffre de reporting" },
    { id: "s4", text: "Décision go / no-go motivée (publier, corriger, ou alerter)" },
    { id: "s5", text: "Écarts vs cible lus sans vanity metrics" },
    { id: "s6", text: "Responsable + délai pour les corrections restantes" },
  ],

  /** Matrice indicateur × contrôles (parcours S&E) */
  matriceIndicateurs: [
    {
      indicateur: "% guérison nutrition",
      controles: ["Completude admissions/guérisons", "Pas de valeurs négatives", "Doublons mois×aire", "Écart vs cible 75 %"],
    },
    {
      indicateur: "Sites WASH fonctionnels",
      controles: ["ID site unique", "Cohérence fonctionnel/ménages", "Doublon logique", "Statut documenté"],
    },
    {
      indicateur: "Registre admissions",
      controles: ["Unicité benef_id", "Sexe/âge valides", "Dates valides", "Pas de PII en export public"],
    },
  ],

  parseCsv: function (text) {
    var lines = String(text || "")
      .trim()
      .split(/\r?\n/)
      .filter(Boolean);
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
        issues.push({
          row: i + 2,
          type: "manquant",
          detail: "admissions vide (" + r.mois + " / " + r.aire_sante + ")",
        });
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
        issues.push({
          row: i + 2,
          type: "statut",
          detail: r.site_id + " non fonctionnel (" + (r.remarques || "sans détail") + ")",
        });
      }
      var m = Number(r.menages_desservis);
      if (!isNaN(m) && m <= 0 && String(r.fonctionnel).toLowerCase() === "oui") {
        issues.push({
          row: i + 2,
          type: "aberrant",
          detail: r.site_id + " fonctionnel avec ménages=" + r.menages_desservis,
        });
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

  qcBenef: function (rows) {
    var issues = [];
    var seenId = {};
    var sexesOk = { F: true, M: true };

    rows.forEach(function (r, i) {
      var row = i + 2;
      if (!r.benef_id) {
        issues.push({ row: row, type: "manquant", detail: "benef_id vide" });
      } else if (seenId[r.benef_id]) {
        issues.push({
          row: row,
          type: "doublon",
          detail: "benef_id " + r.benef_id + " déjà vu ligne " + seenId[r.benef_id],
        });
      } else {
        seenId[r.benef_id] = row;
      }

      if (r.sexe && !sexesOk[r.sexe]) {
        issues.push({ row: row, type: "validite", detail: r.benef_id + " sexe=" + r.sexe + " non autorisé" });
      }

      var age = Number(r.age_mois);
      if (r.age_mois !== "" && !isNaN(age) && (age < 0 || age > 60)) {
        issues.push({ row: row, type: "aberrant", detail: r.benef_id + " age_mois=" + r.age_mois });
      }

      if (!r.date_admission) {
        issues.push({ row: row, type: "manquant", detail: r.benef_id + " date_admission vide" });
      } else if (!/^\d{4}-\d{2}-\d{2}$/.test(r.date_admission)) {
        issues.push({ row: row, type: "validite", detail: r.benef_id + " date invalide " + r.date_admission });
      } else {
        var parts = r.date_admission.split("-");
        var month = Number(parts[1]);
        if (month < 1 || month > 12) {
          issues.push({ row: row, type: "validite", detail: r.benef_id + " mois impossible " + r.date_admission });
        }
      }

      var poids = Number(r.poids_kg);
      if (r.poids_kg === "" || r.poids_kg == null) {
        issues.push({ row: row, type: "manquant", detail: r.benef_id + " poids_kg vide" });
      } else if (!isNaN(poids) && (poids < 2 || poids > 25)) {
        issues.push({ row: row, type: "aberrant", detail: r.benef_id + " poids_kg=" + r.poids_kg + " (hors plage enfant)" });
      }

      if (r.telephone) {
        issues.push({
          row: row,
          type: "sensible",
          detail: r.benef_id + " téléphone présent — masquer avant export public",
        });
      }
    });
    return issues;
  },
};
