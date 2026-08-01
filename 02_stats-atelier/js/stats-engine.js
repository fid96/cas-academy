/* Statistiques Atelier — calculs pédagogiques sur données ventes */

window.StatsEngine = (function () {
  const VENTES = [
    { date: "2024-01-05", ville: "Kinshasa", produit: "Moustiquaire", categorie: "Prevention", quantite: 12, montant_cdf: 180000, client_id: "C001" },
    { date: "2024-01-06", ville: "Lubumbashi", produit: "Test rapide palu", categorie: "Diagnostic", quantite: 40, montant_cdf: 320000, client_id: "C002" },
    { date: "2024-01-08", ville: "Kananga", produit: "ACT", categorie: "Traitement", quantite: 25, montant_cdf: 275000, client_id: "C003" },
    { date: "2024-01-09", ville: "Kinshasa", produit: "Gants", categorie: "Consommable", quantite: 100, montant_cdf: 90000, client_id: "C001" },
    { date: "2024-01-12", ville: "Goma", produit: "Moustiquaire", categorie: "Prevention", quantite: 8, montant_cdf: 120000, client_id: "C004" },
    { date: "2024-01-15", ville: "Lubumbashi", produit: "ACT", categorie: "Traitement", quantite: 30, montant_cdf: 330000, client_id: "C002" },
    { date: "2024-01-18", ville: "Kinshasa", produit: "Test rapide palu", categorie: "Diagnostic", quantite: 55, montant_cdf: 440000, client_id: "C005" },
    { date: "2024-01-20", ville: "Mbuji-Mayi", produit: "Gants", categorie: "Consommable", quantite: 60, montant_cdf: 54000, client_id: "C006" },
    { date: "2024-01-22", ville: "Kananga", produit: "Moustiquaire", categorie: "Prevention", quantite: 15, montant_cdf: 225000, client_id: "C003" },
    { date: "2024-01-25", ville: "Goma", produit: "ACT", categorie: "Traitement", quantite: 18, montant_cdf: 198000, client_id: "C004" },
    { date: "2024-02-01", ville: "Kinshasa", produit: "ACT", categorie: "Traitement", quantite: 40, montant_cdf: 440000, client_id: "C005" },
    { date: "2024-02-03", ville: "Lubumbashi", produit: "Gants", categorie: "Consommable", quantite: 80, montant_cdf: 72000, client_id: "C002" },
    { date: "2024-02-05", ville: "Kinshasa", produit: "Moustiquaire", categorie: "Prevention", quantite: 20, montant_cdf: 300000, client_id: "C001" },
    { date: "2024-02-08", ville: "Mbuji-Mayi", produit: "Test rapide palu", categorie: "Diagnostic", quantite: 22, montant_cdf: 176000, client_id: "C006" },
    { date: "2024-02-10", ville: "Goma", produit: "Test rapide palu", categorie: "Diagnostic", quantite: 35, montant_cdf: 280000, client_id: "C004" },
    { date: "2024-02-12", ville: "Kananga", produit: "Gants", categorie: "Consommable", quantite: null, montant_cdf: 45000, client_id: "C003" },
    { date: "2024-02-14", ville: "Kinshasa", produit: "ACT", categorie: "Traitement", quantite: 28, montant_cdf: 308000, client_id: "C007" },
    { date: "2024-02-16", ville: "Lubumbashi", produit: "Moustiquaire", categorie: "Prevention", quantite: 10, montant_cdf: 150000, client_id: "C002" },
    { date: "2024-02-18", ville: "Kinshasa", produit: "Test rapide palu", categorie: "Diagnostic", quantite: 60, montant_cdf: 480000, client_id: "C005" },
    { date: "2024-02-20", ville: "Goma", produit: "Moustiquaire", categorie: "Prevention", quantite: 6, montant_cdf: 90000, client_id: "C004" },
    { date: "2024-02-22", ville: "Mbuji-Mayi", produit: "ACT", categorie: "Traitement", quantite: 16, montant_cdf: 176000, client_id: "C006" },
    { date: "2024-02-25", ville: "Kananga", produit: "Test rapide palu", categorie: "Diagnostic", quantite: 18, montant_cdf: 144000, client_id: "C003" },
    { date: "2024-02-27", ville: "Kinshasa", produit: "Gants", categorie: "Consommable", quantite: 120, montant_cdf: 108000, client_id: "C007" },
    { date: "2024-03-01", ville: "Lubumbashi", produit: "ACT", categorie: "Traitement", quantite: 35, montant_cdf: 385000, client_id: "C002" },
    { date: "2024-03-03", ville: "Kinshasa", produit: "Moustiquaire", categorie: "Prevention", quantite: 14, montant_cdf: 210000, client_id: "C001" },
    { date: "2024-03-05", ville: "Goma", produit: "ACT", categorie: "Traitement", quantite: 22, montant_cdf: 242000, client_id: "C004" },
    { date: "2024-03-07", ville: "Mbuji-Mayi", produit: "Moustiquaire", categorie: "Prevention", quantite: 9, montant_cdf: 135000, client_id: "C006" },
    { date: "2024-03-09", ville: "Kananga", produit: "ACT", categorie: "Traitement", quantite: 20, montant_cdf: 220000, client_id: "C003" },
    { date: "2024-03-11", ville: "Kinshasa", produit: "Test rapide palu", categorie: "Diagnostic", quantite: 48, montant_cdf: 384000, client_id: "C005" },
    { date: "2024-03-13", ville: "Lubumbashi", produit: "Test rapide palu", categorie: "Diagnostic", quantite: 26, montant_cdf: 208000, client_id: "C008" }
  ];

  function nums(arr) {
    return arr.filter((v) => typeof v === "number" && !Number.isNaN(v));
  }

  function sum(arr) {
    return nums(arr).reduce((a, b) => a + b, 0);
  }

  function mean(arr) {
    const a = nums(arr);
    if (!a.length) return null;
    return sum(a) / a.length;
  }

  function median(arr) {
    const a = nums(arr).slice().sort((x, y) => x - y);
    if (!a.length) return null;
    const mid = Math.floor(a.length / 2);
    return a.length % 2 ? a[mid] : (a[mid - 1] + a[mid]) / 2;
  }

  function min(arr) {
    const a = nums(arr);
    return a.length ? Math.min(...a) : null;
  }

  function max(arr) {
    const a = nums(arr);
    return a.length ? Math.max(...a) : null;
  }

  function count(arr) {
    return nums(arr).length;
  }

  function percent(part, whole) {
    if (!whole) return null;
    return (part / whole) * 100;
  }

  function round(n, d = 1) {
    if (n === null || n === undefined || Number.isNaN(n)) return null;
    const f = 10 ** d;
    return Math.round(n * f) / f;
  }

  function formatNumber(n, d = 0) {
    if (n === null || n === undefined) return "—";
    return round(n, d).toLocaleString("fr-FR");
  }

  function formatPct(n, d = 1) {
    if (n === null || n === undefined) return "—";
    return round(n, d).toLocaleString("fr-FR") + " %";
  }

  function getSeries(field, filterFn) {
    const rows = filterFn ? VENTES.filter(filterFn) : VENTES;
    return rows.map((r) => r[field]);
  }

  function groupBy(field, valueField = "montant_cdf") {
    const map = {};
    for (const row of VENTES) {
      const key = row[field];
      if (!map[key]) map[key] = [];
      const v = row[valueField];
      if (typeof v === "number") map[key].push(v);
    }
    return Object.entries(map)
      .map(([name, values]) => ({
        name,
        n: values.length,
        total: sum(values),
        mean: mean(values),
        median: median(values),
        min: min(values),
        max: max(values)
      }))
      .sort((a, b) => b.total - a.total);
  }

  function overview(filterFn) {
    const montants = getSeries("montant_cdf", filterFn);
    const quantites = getSeries("quantite", filterFn);
    const nAll = filterFn ? VENTES.filter(filterFn).length : VENTES.length;
    const nQtyMissing = (filterFn ? VENTES.filter(filterFn) : VENTES).filter((r) => r.quantite === null).length;
    return {
      n: nAll,
      totalMontant: sum(montants),
      meanMontant: mean(montants),
      medianMontant: median(montants),
      minMontant: min(montants),
      maxMontant: max(montants),
      meanQuantite: mean(quantites),
      nQtyMissing,
      shareKinshasa: percent(
        sum(getSeries("montant_cdf", (r) => (!filterFn || filterFn(r)) && r.ville === "Kinshasa")),
        sum(montants)
      )
    };
  }

  function compare(groupField, aName, bName, valueField = "montant_cdf") {
    const aVals = getSeries(valueField, (r) => r[groupField] === aName);
    const bVals = getSeries(valueField, (r) => r[groupField] === bName);
    const aMean = mean(aVals);
    const bMean = mean(bVals);
    const aTotal = sum(aVals);
    const bTotal = sum(bVals);
    let relDiff = null;
    if (bMean && aMean !== null) relDiff = ((aMean - bMean) / bMean) * 100;
    return {
      a: { name: aName, n: count(aVals), mean: aMean, total: aTotal, median: median(aVals) },
      b: { name: bName, n: count(bVals), mean: bMean, total: bTotal, median: median(bVals) },
      meanDiffPct: relDiff,
      totalDiffPct: bTotal ? ((aTotal - bTotal) / bTotal) * 100 : null
    };
  }

  function unique(field) {
    return [...new Set(VENTES.map((r) => r[field]))].sort();
  }

  return {
    VENTES,
    sum,
    mean,
    median,
    min,
    max,
    count,
    percent,
    round,
    formatNumber,
    formatPct,
    overview,
    groupBy,
    compare,
    unique,
    getSeries
  };
})();
