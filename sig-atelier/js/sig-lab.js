/* Labo SIG — QC spatial Kalunga + checklist QGIS */
window.SIGLab = {
  datasets: [
    {
      id: "gps",
      title: "Sites WASH + GPS (brut)",
      path: "data/kalunga_sites_gps.csv",
      packs: ["data-analyst", "se"],
      hints: [
        "W01 / W07 : même lat-lon (doublon logique)",
        "W12 : lat/lon probablement inversés",
        "W13 : GPS manquant",
        "W14 : coordonnées 0,0",
        "W15 : hors zone Kalunga",
        "W10 : fonctionnel avec ménages = 0",
      ],
    },
    {
      id: "aires",
      title: "Aires de santé (référentiel)",
      path: "data/kalunga_aires.csv",
      packs: ["data-analyst", "se"],
      hints: [
        "Clé de jointure : aire_code",
        "Centroïdes utiles pour une carte rapide",
        "Cible couverture commune : 80 %",
      ],
    },
    {
      id: "couverture",
      title: "Couverture agrégée (après QC)",
      path: "data/kalunga_couverture.csv",
      packs: ["data-analyst", "se"],
      hints: [
        "Tous les écarts vs cible sont négatifs",
        "Est a la meilleure couverture relative",
        "Servir une note de décision, pas seulement un tableau",
      ],
    },
  ],

  qgisSteps: [
    {
      id: "q1",
      text: "Créer un projet QGIS et fixer le SCR du projet sur WGS 84 (EPSG:4326).",
    },
    {
      id: "q2",
      text: "Importer kalunga_aires.csv (centroïdes) puis kalunga_sites_gps.csv via « Couche → Ajouter une couche de texte délimité ».",
    },
    {
      id: "q3",
      text: "Contrôler que X = lon et Y = lat (pas l’inverse).",
    },
    {
      id: "q4",
      text: "Joindre les sites à kalunga_aires.csv sur aire_code (jointure attributaire).",
    },
    {
      id: "q5",
      text: "Filtrer / corriger les points hors zone, GPS manquants et doublons avant toute carte officielle.",
    },
    {
      id: "q6",
      text: "Appliquer une symbologie : statut fonctionnel (points) + couverture_pct (aires / choroplèthe si polygones disponibles).",
    },
    {
      id: "q7",
      text: "Exporter : GeoPackage propre + carte PNG/PDF avec titre, légende, source, date, auteur.",
    },
  ],

  checklistDa: [
    { id: "d1", text: "SCR / CRS documenté (WGS 84 pour GPS terrain)" },
    { id: "d2", text: "Colonnes lat/lon contrôlées (sens, plages, manquants)" },
    { id: "d3", text: "Doublons GPS et IDs traités (journal QC)" },
    { id: "d4", text: "Jointure aire_code sans orphelins non expliqués" },
    { id: "d5", text: "Couche propre exportée (GeoPackage ou CSV QC)" },
    { id: "d6", text: "Carte avec légende, source, date — pas de « belle carte » non traçable" },
  ],

  checklistSe: [
    { id: "s1", text: "Indicateur spatial défini (numérateur / dénominateur / cible)" },
    { id: "s2", text: "Données GPS passées au QC avant reporting" },
    { id: "s3", text: "Carte de couverture vs cible par aire" },
    { id: "s4", text: "Écarts spatiaux lus (où prioriser)" },
    { id: "s5", text: "3 décisions assignées (action — délai — responsable)" },
    { id: "s6", text: "Carte jointe à la note de suivi / dossier S&E" },
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

  /** Emprise approximative du district fictif Kalunga */
  bounds: {
    latMin: -9.12,
    latMax: -8.85,
    lonMin: 24.30,
    lonMax: 24.58,
  },

  qcGps: function (rows) {
    var issues = [];
    var byCoord = {};
    var b = this.bounds;

    rows.forEach(function (r, i) {
      var row = i + 2;
      var lat = Number(r.lat);
      var lon = Number(r.lon);
      var hasLat = r.lat !== "" && r.lat != null;
      var hasLon = r.lon !== "" && r.lon != null;

      if (!hasLat || !hasLon) {
        issues.push({ row: row, type: "gps_manquant", detail: r.site_id + " sans lat/lon" });
        return;
      }

      if (isNaN(lat) || isNaN(lon)) {
        issues.push({ row: row, type: "gps_invalide", detail: r.site_id + " lat/lon non numériques" });
        return;
      }

      if (lat === 0 && lon === 0) {
        issues.push({ row: row, type: "gps_nul", detail: r.site_id + " coordonnées 0,0" });
      }

      // Lat/lon inversés typiques en RDC (lon ~24, lat ~-9)
      if (lat > 15 && lon < 0) {
        issues.push({
          row: row,
          type: "lat_lon_inverses",
          detail: r.site_id + " lat=" + r.lat + " lon=" + r.lon + " (probablement inversés)",
        });
      }

      if (!isNaN(lat) && !isNaN(lon) && (lat < b.latMin || lat > b.latMax || lon < b.lonMin || lon > b.lonMax)) {
        if (!(lat > 15 && lon < 0)) {
          issues.push({
            row: row,
            type: "hors_zone",
            detail: r.site_id + " hors emprise Kalunga (" + r.lat + ", " + r.lon + ")",
          });
        }
      }

      var key = Number(r.lat).toFixed(4) + "|" + Number(r.lon).toFixed(4);
      if (!byCoord[key]) byCoord[key] = [];
      byCoord[key].push(r.site_id + " (l." + row + ")");

      if (String(r.fonctionnel).toLowerCase() === "oui") {
        var m = Number(r.menages_desservis);
        if (!isNaN(m) && m <= 0) {
          issues.push({
            row: row,
            type: "aberrant",
            detail: r.site_id + " fonctionnel avec ménages=" + r.menages_desservis,
          });
        }
      }
    });

    Object.keys(byCoord).forEach(function (k) {
      if (byCoord[k].length > 1) {
        issues.push({ row: "-", type: "doublon_gps", detail: byCoord[k].join(" ↔ ") });
      }
    });

    return issues;
  },

  qcAires: function (rows) {
    var issues = [];
    var seen = {};
    rows.forEach(function (r, i) {
      var row = i + 2;
      if (!r.aire_code) {
        issues.push({ row: row, type: "manquant", detail: "aire_code vide" });
      } else if (seen[r.aire_code]) {
        issues.push({ row: row, type: "doublon", detail: "aire_code " + r.aire_code });
      }
      seen[r.aire_code] = true;
      var pop = Number(r.population);
      if (!isNaN(pop) && pop <= 0) {
        issues.push({ row: row, type: "aberrant", detail: r.aire_code + " population=" + r.population });
      }
    });
    return issues;
  },

  qcCouverture: function (rows) {
    var issues = [];
    rows.forEach(function (r, i) {
      var row = i + 2;
      var cov = Number(r.couverture_pct);
      var cible = Number(r.cible_couverture_pct);
      if (!isNaN(cov) && !isNaN(cible) && cov + 0.01 < cible) {
        issues.push({
          row: row,
          type: "ecart_cible",
          detail:
            r.aire_sante +
            " → " +
            cov +
            "% < cible " +
            cible +
            "% (écart " +
            r.ecart_pp +
            " pp)",
        });
      }
    });
    return issues;
  },
};
