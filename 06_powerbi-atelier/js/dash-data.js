/* Power BI Atelier — données agrégées + règles de design */

window.DashData = (function () {
  const BY_VILLE = [
    { name: "Kinshasa", total: 2940000, n: 10 },
    { name: "Lubumbashi", total: 1465000, n: 6 },
    { name: "Goma", total: 930000, n: 5 },
    { name: "Kananga", total: 909000, n: 5 },
    { name: "Mbuji-Mayi", total: 541000, n: 4 }
  ];

  const BY_PRODUIT = [
    { name: "ACT", total: 2574000, n: 8 },
    { name: "Test rapide palu", total: 2432000, n: 7 },
    { name: "Moustiquaire", total: 1410000, n: 7 },
    { name: "Gants", total: 369000, n: 5 }
  ];

  const BY_MOIS = [
    { name: "Janv.", total: 2232000 },
    { name: "Févr.", total: 2638000 },
    { name: "Mars", total: 1915000 }
  ];

  const KPIS = {
    total: 6785000,
    n: 30,
    mean: 226167,
    topVille: "Kinshasa",
    topShare: 43.3,
    missingQty: 1
  };

  const VISUAL_GUIDE = [
    {
      id: "card",
      title: "Carte KPI",
      bestFor: "Un chiffre clé (total, n, %)",
      avoid: "Comparer 8 catégories sur une carte",
      size: "Petit / haut de page",
      powerbi: "Carte / Carte multi-lignes"
    },
    {
      id: "bar",
      title: "Barres / Colonnes",
      bestFor: "Comparer des catégories (villes, produits)",
      avoid: "Trop de catégories (>10–12) sans filtre",
      size: "Grand panneau central ou secondaire",
      powerbi: "Histogramme groupé, barres groupées"
    },
    {
      id: "line",
      title: "Courbe (lignes)",
      bestFor: "Évolution dans le temps",
      avoid: "Catégories non ordonnées (villes en courbe)",
      size: "Panneau large horizontal",
      powerbi: "Graphique en courbes"
    },
    {
      id: "table",
      title: "Tableau",
      bestFor: "Détail précis, contrôle, export mental",
      avoid: "Être le seul visuel d’un dashboard exécutif",
      size: "Bas de page ou onglet détail",
      powerbi: "Tableau, matrice"
    },
    {
      id: "donut",
      title: "Secteurs / Anneau",
      bestFor: "Parts d’un tout (2–5 parts max)",
      avoid: "Comparaisons fines ou beaucoup de parts",
      size: "Secondaire, jamais seul héros",
      powerbi: "Graphique en secteurs / anneau"
    },
    {
      id: "slicer",
      title: "Segments (filtres)",
      bestFor: "Interactivité : période, ville, produit",
      avoid: "10 filtres qui saturent le haut de page",
      size: "Bandeau haut ou panneau gauche étroit",
      powerbi: "Segment, filtre"
    }
  ];

  const LAYOUTS = {
    executive: {
      id: "executive",
      label: "Exécutif (recommandé)",
      score: { hierarchy: 92, clarity: 90, density: 78, consistency: 88 },
      critique:
        "KPI en haut (lecture en Z), grand comparatif au centre, détail en bas. Hiérarchie claire pour un décideur pressé."
    },
    analytical: {
      id: "analytical",
      label: "Analytique",
      score: { hierarchy: 84, clarity: 82, density: 86, consistency: 85 },
      critique:
        "Plus de détail (tableau). Bon pour un analyste. Attention à ne pas noyer le message principal."
    },
    chaos: {
      id: "chaos",
      label: "Chaos (à éviter)",
      score: { hierarchy: 28, clarity: 35, density: 40, consistency: 30 },
      critique:
        "Pas de zone KPI stable, tailles incohérentes, œil perdu. C’est le piège classique « j’ai mis tous les graphiques »."
    }
  };

  function maxTotal(rows) {
    return Math.max(...rows.map((r) => r.total), 1);
  }

  return { BY_VILLE, BY_PRODUIT, BY_MOIS, KPIS, VISUAL_GUIDE, LAYOUTS, maxTotal };
})();
