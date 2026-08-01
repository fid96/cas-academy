/* Collecte Atelier — studio formulaire pédagogique (esprit Kobo/ODK) */

window.FormEngine = (function () {
  const FIELD_TYPES = [
    { id: "text", label: "Texte", kobo: "text" },
    { id: "integer", label: "Entier", kobo: "integer" },
    { id: "decimal", label: "Décimal", kobo: "decimal" },
    { id: "select_one", label: "Choix unique", kobo: "select_one" },
    { id: "select_multiple", label: "Choix multiple", kobo: "select_multiple" },
    { id: "date", label: "Date", kobo: "date" },
    { id: "geopoint", label: "GPS", kobo: "geopoint" },
    { id: "note", label: "Note / consigne", kobo: "note" }
  ];

  const TEMPLATES = {
    ventes: {
      title: "Registre ventes produits de santé",
      fields: [
        { name: "date_vente", label: "Date de la vente", type: "date", required: true, constraint: "" },
        { name: "ville", label: "Ville", type: "select_one", required: true, constraint: "Kinshasa|Lubumbashi|Goma|Kananga|Mbuji-Mayi" },
        { name: "produit", label: "Produit", type: "select_one", required: true, constraint: "Moustiquaire|ACT|Test rapide palu|Gants" },
        { name: "quantite", label: "Quantité", type: "integer", required: true, constraint: ". > 0" },
        { name: "montant_cdf", label: "Montant (CDF)", type: "integer", required: true, constraint: ". >= 0" },
        { name: "client_id", label: "ID client", type: "text", required: true, constraint: "" },
        { name: "remarque", label: "Remarque", type: "text", required: false, constraint: "" }
      ]
    },
    stock: {
      title: "Contrôle stock rapide",
      fields: [
        { name: "date_visite", label: "Date de visite", type: "date", required: true, constraint: "" },
        { name: "structure", label: "Structure sanitaire", type: "text", required: true, constraint: "" },
        { name: "produit", label: "Produit contrôlé", type: "select_one", required: true, constraint: "ACT|Test rapide palu|Moustiquaire" },
        { name: "stock_dispo", label: "Stock disponible", type: "integer", required: true, constraint: ". >= 0" },
        { name: "rupture", label: "Rupture en cours ?", type: "select_one", required: true, constraint: "Oui|Non" },
        { name: "gps", label: "Position GPS", type: "geopoint", required: false, constraint: "" }
      ]
    }
  };

  function slugify(label) {
    return String(label || "champ")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_|_$/g, "")
      .slice(0, 40) || "champ";
  }

  function scoreForm(fields) {
    const tips = [];
    let score = 40;
    if (!fields.length) return { score: 0, tips: ["Ajoutez au moins un champ."] };

    const names = fields.map((f) => f.name.trim());
    const labels = fields.map((f) => f.label.trim());
    if (names.every(Boolean)) score += 15;
    else tips.push("Chaque champ doit avoir un nom technique (name).");
    if (labels.every(Boolean)) score += 10;
    else tips.push("Chaque champ doit avoir un libellé clair.");
    if (new Set(names).size === names.length) score += 10;
    else tips.push("Évitez les noms en double.");
    if (fields.some((f) => f.required)) score += 8;
    else tips.push("Marquez les champs indispensables comme obligatoires.");
    if (fields.some((f) => f.type === "integer" || f.type === "decimal")) score += 7;
    if (fields.some((f) => (f.constraint || "").trim())) score += 10;
    else tips.push("Ajoutez au moins une contrainte (ex. quantité > 0).");
    if (fields.some((f) => f.type === "select_one")) score += 8;
    else tips.push("Préférez des listes (select_one) aux textes libres quand c’est possible.");
    if (fields.some((f) => /date|ville|produit|id/i.test(f.name))) score += 7;

    score = Math.min(100, score);
    if (score >= 80 && !tips.length) tips.push("Formulaire solide pour une collecte analysable.");
    return { score, tips };
  }

  function toCsvHeader(fields) {
    return fields.filter((f) => f.type !== "note").map((f) => f.name).join(",");
  }

  function toXlsFormRows(fields, formTitle) {
    // Simplified survey sheet rows for pedagogical export
    const rows = [["type", "name", "label", "required", "constraint", "hint"]];
    rows.push(["begin_group", "main", formTitle || "Formulaire", "", "", ""]);
    for (const f of fields) {
      let type = f.type;
      if (f.type === "select_one" || f.type === "select_multiple") {
        type = `${f.type} list_${f.name}`;
      }
      rows.push([
        type,
        f.name,
        f.label,
        f.required ? "yes" : "no",
        f.constraint || "",
        f.type.startsWith("select") ? "Choisir dans la liste" : ""
      ]);
    }
    rows.push(["end_group", "", "", "", "", ""]);
    return rows;
  }

  function validateValue(field, value) {
    if (field.required && (value === "" || value === null || value === undefined)) {
      return { ok: false, message: "Champ obligatoire vide — refus à la collecte." };
    }
    if (value === "" || value === null || value === undefined) return { ok: true };
    if (field.type === "integer") {
      if (!/^-?\d+$/.test(String(value))) return { ok: false, message: "Doit être un entier." };
      if (field.constraint.includes(". > 0") && Number(value) <= 0) {
        return { ok: false, message: "Contrainte : doit être > 0." };
      }
      if (field.constraint.includes(". >= 0") && Number(value) < 0) {
        return { ok: false, message: "Contrainte : doit être ≥ 0." };
      }
    }
    return { ok: true };
  }

  return {
    FIELD_TYPES,
    TEMPLATES,
    slugify,
    scoreForm,
    toCsvHeader,
    toXlsFormRows,
    validateValue
  };
})();
