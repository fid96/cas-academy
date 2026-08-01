/* Storytelling Atelier — insights métier + évaluation de note */

window.StoryEngine = (function () {
  const INSIGHTS = [
    {
      id: "kin-share",
      label: "Part Kinshasa",
      constat: "Kinshasa concentre environ 43 % du chiffre d’affaires sur la période.",
      preuve: "Total CA ≈ 6,79 M CDF ; CA Kinshasa ≈ 2,94 M CDF (n=30 ventes).",
      limite: "Volume plus élevé à Kinshasa : comparer aussi les moyennes, pas seulement les totaux.",
      reco: "Prioriser le suivi logistique et le réassort sur Kinshasa, tout en surveillant les autres villes."
    },
    {
      id: "act-lead",
      label: "Produit ACT",
      constat: "ACT est le premier produit en montant cumulé.",
      preuve: "CA ACT ≈ 2,57 M CDF, devant les tests rapides (~2,43 M).",
      limite: "Un fort CA ne dit pas à lui seul la marge ni la rupture de stock.",
      reco: "Sécuriser la disponibilité ACT et documenter les délais d’approvisionnement."
    },
    {
      id: "missing-qty",
      label: "Qualité quantité",
      constat: "Au moins une quantité est manquante dans le fichier ventes.",
      preuve: "1 ligne avec quantite vide sur 30 ; les moyennes de quantité l’ignorent.",
      limite: "Sans règle métier, remplacer les vides par 0 fausserait l’analyse.",
      reco: "Mettre en place un contrôle à la saisie et signaler les manquants dans chaque note."
    },
    {
      id: "goma-vs-kin",
      label: "Kinshasa vs Goma",
      constat: "Kinshasa pèse nettement plus que Goma en total CA.",
      preuve: "Totaux : Kinshasa 2,94 M vs Goma 0,93 M CDF ; effectifs différents.",
      limite: "L’écart de volume peut expliquer une partie de la différence.",
      reco: "Analyser le CA moyen par vente avant d’arbitrer les ressources entre villes."
    },
    {
      id: "mean-median",
      label: "Moyenne tirée",
      constat: "La moyenne des montants est tirée vers le haut par rapport à la médiane.",
      preuve: "Présence de ventes élevées (jusqu’à ~480 000 CDF) dans le jeu.",
      limite: "La moyenne seule peut surestimer le « cas typique ».",
      reco: "Publier moyenne et médiane dans le briefing décideur."
    }
  ];

  function scoreNote(note) {
    const checks = {
      public: Boolean(note.public && note.public.trim().length >= 3),
      decision: Boolean(note.decision && note.decision.trim().length >= 8),
      constat: Boolean(note.constat && note.constat.trim().length >= 12),
      preuve: Boolean(note.preuve && note.preuve.trim().length >= 12),
      limite: Boolean(note.limite && note.limite.trim().length >= 8),
      reco: Boolean(note.reco && note.reco.trim().length >= 12)
    };

    const hasNumber = /\d/.test(note.preuve || "") || /\d/.test(note.constat || "");
    const hasAction =
      /(prioris|suiv|mettr|sécuris|securis|contrôl|control|investig|recommand|agir|renforc)/i.test(
        note.reco || ""
      );

    const dims = {
      clarte: (checks.public && checks.decision && checks.constat ? 90 : checks.constat ? 60 : 30),
      preuve: (checks.preuve && hasNumber ? 92 : checks.preuve ? 65 : 25),
      prudence: (checks.limite ? 88 : 35),
      action: (checks.reco && hasAction ? 94 : checks.reco ? 60 : 20)
    };

    const global = Math.round(
      (dims.clarte + dims.preuve + dims.prudence + dims.action) / 4
    );

    const tips = [];
    if (!checks.public) tips.push("Précisez le public (qui lit la note).");
    if (!checks.decision) tips.push("Nommez la décision que la note éclaire.");
    if (!hasNumber) tips.push("Ajoutez un chiffre concret dans le constat ou la preuve.");
    if (!checks.limite) tips.push("Une limite (manquants, n faible, biais) renforce la crédibilité.");
    if (!hasAction) tips.push("Formulez une recommandation actionnable (verbe d’action).");

    return { dims, global, checks, tips };
  }

  function renderNoteHtml(note, escapeHtml) {
    return `
      <h2>${escapeHtml(note.titre || "Note de décision")}</h2>
      <div class="block"><div class="label">Public</div><p>${escapeHtml(note.public || "—")}</p></div>
      <div class="block"><div class="label">Décision à éclairer</div><p>${escapeHtml(note.decision || "—")}</p></div>
      <div class="block"><div class="label">Constat</div><p>${escapeHtml(note.constat || "—")}</p></div>
      <div class="block"><div class="label">Preuve</div><p>${escapeHtml(note.preuve || "—")}</p></div>
      <div class="block"><div class="label">Limite / prudence</div><p>${escapeHtml(note.limite || "—")}</p></div>
      <div class="block"><div class="label">Recommandation</div><p>${escapeHtml(note.reco || "—")}</p></div>
    `;
  }

  return { INSIGHTS, scoreNote, renderNoteHtml };
})();
