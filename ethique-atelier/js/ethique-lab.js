/* Labo Éthique — classement sensibilité, scénarios, checklists */
window.EthiqueLab = {
  /** Niveaux de sensibilité pour le classement */
  levels: [
    { id: "publique", label: "Publique / partage large", hint: "Agrégats non identifiants, OK rapport public." },
    { id: "interne", label: "Interne besoin d’en connaître", hint: "Utile au pilotage, cercle restreint." },
    { id: "sensible", label: "Sensible / à masquer", hint: "PII, santé individuelle, GPS fin, images." },
  ],

  /** Réponses attendues pour kalunga_variables (variable → niveau) */
  classifications: {
    benef_id: "interne",
    nom_complet: "sensible",
    telephone: "sensible",
    aire_sante: "publique",
    age_mois: "interne",
    poids_kg: "sensible",
    statut: "interne",
    gps_menage: "sensible",
    photo_enfant: "sensible",
    taux_guerison_aire: "publique",
    enqueteur: "interne",
    commentaire_libre: "sensible",
  },

  variables: [
    { id: "benef_id", label: "benef_id", detail: "Identifiant interne" },
    { id: "nom_complet", label: "nom_complet", detail: "Nom saisi par erreur" },
    { id: "telephone", label: "telephone", detail: "Contact ménage" },
    { id: "aire_sante", label: "aire_sante", detail: "Zone agrégée" },
    { id: "age_mois", label: "age_mois", detail: "Âge en mois" },
    { id: "poids_kg", label: "poids_kg", detail: "Mesure clinique" },
    { id: "statut", label: "statut", detail: "Statut programme" },
    { id: "gps_menage", label: "gps_menage", detail: "GPS foyer" },
    { id: "photo_enfant", label: "photo_enfant", detail: "Image centre" },
    { id: "taux_guerison_aire", label: "taux_guerison_aire", detail: "KPI agrégé" },
    { id: "enqueteur", label: "enqueteur", detail: "Code agent" },
    { id: "commentaire_libre", label: "commentaire_libre", detail: "Texte libre" },
  ],

  scenarios: [
    {
      id: "s1",
      packs: ["data-analyst", "se"],
      title: "Export Excel vers un partenaire",
      text: "Un partenaire demande le registre nutrition « pour vérifier ». Le fichier contient téléphone et GPS ménage.",
      options: [
        "Envoyer le fichier brut pour aller vite",
        "Envoyer une version agrégée / masquée selon need-to-know",
        "Refuser tout partage même agrégé",
        "Publier sur un groupe WhatsApp ouvert",
      ],
      answer: 1,
      explain: "Minimiser et masquer les PII ; partager seulement ce qui est nécessaire.",
    },
    {
      id: "s2",
      packs: ["data-analyst", "se"],
      title: "Prompt IA",
      text: "Vous voulez qu’une IA reformate une note. Vous avez le CSV bénéficiaires sous la main.",
      options: [
        "Coller 20 lignes nominatives dans le prompt",
        "Coller schéma + exemples fictifs / agrégats déjà vérifiés",
        "Uploader les photos enfants « pour contexte »",
        "Demander à l’IA d’inventer les totaux",
      ],
      answer: 1,
      explain: "Jamais de PII dans un prompt cloud ; schéma et fictifs suffisent.",
    },
    {
      id: "s3",
      packs: ["data-analyst", "se"],
      title: "Carte GPS",
      text: "Pour une réunion cluster, quelqu’un propose une carte avec chaque ménage géolocalisé.",
      options: [
        "Publier la carte haute résolution en PJ email",
        "Agréger par aire / grille et retirer les points foyers",
        "Mettre les noms sur les points « pour clarté »",
        "Ignorer le risque car « c’est interne »",
      ],
      answer: 1,
      explain: "GPS fin = risque de protection ; agréger.",
    },
    {
      id: "s4",
      packs: ["se"],
      title: "Consentement terrain",
      text: "Une équipe veut ajouter photo + GPS pour « enrichir le S&E » sans mettre à jour le consentement.",
      options: [
        "Collecter d’abord, expliquer après",
        "Mettre à jour finalité / consentement avant toute nouvelle donnée sensible",
        "Demander seulement au chef de village",
        "Utiliser les photos des enfants sans accord « pour le rapport »",
      ],
      answer: 1,
      explain: "Nouvelle finalité / donnée sensible = consentement à jour.",
    },
    {
      id: "s5",
      packs: ["data-analyst"],
      title: "Dashboard Power BI partagé",
      text: "Le dashboard interne montre benef_id + âge + statut. On veut le partager au grand public.",
      options: [
        "Publier tel quel",
        "Retirer les identifiants et ne garder que des agrégats",
        "Ajouter les téléphones pour « suivi »",
        "Exporter en PDF sans regarder les champs",
      ],
      answer: 1,
      explain: "Public = agrégats non identifiants.",
    },
  ],

  ethiqueSteps: [
    { id: "e1", text: "Clarifier la finalité du traitement / du partage." },
    { id: "e2", text: "Lister les variables et classer leur sensibilité." },
    { id: "e3", text: "Appliquer la minimisation (ne garder que le nécessaire)." },
    { id: "e4", text: "Masquer / agréger PII et données sensibles avant export." },
    { id: "e5", text: "Vérifier consentement / base légitime / do-no-harm." },
    { id: "e6", text: "Documenter qui reçoit quoi, pourquoi, jusqu’à quand." },
  ],

  checklistDa: [
    { id: "d1", text: "Finalité de l’export / analyse écrite" },
    { id: "d2", text: "Classement sensibilité des colonnes fait" },
    { id: "d3", text: "PII masquées ou retirées de l’export public / externe" },
    { id: "d4", text: "Pas de PII collée dans un prompt IA" },
    { id: "d5", text: "Destinataires et durée de conservation notés" },
    { id: "d6", text: "Version « partageable » distincte du fichier brut" },
  ],

  checklistSe: [
    { id: "s1", text: "Indicateurs liés à une finalité et un consentement adaptés" },
    { id: "s2", text: "Sur-collecte évitée (pas de champ « au cas où » sensible)" },
    { id: "s3", text: "Partage bailleur/cluster en need-to-know" },
    { id: "s4", text: "Risques protection (GPS, photos, vulnérabilité) évalués" },
    { id: "s5", text: "Canal AAP / plaintes connu si collecte auprès des populations" },
    { id: "s6", text: "Décision partager / masquer / refuser documentée" },
  ],

  matriceSe: [
    {
      indicateur: "% guérison (agrégé aire)",
      risque: "Faible si agrégé",
      decision: "Partageable en reporting (sans microdonnées)",
    },
    {
      indicateur: "Liste nominative admissions",
      risque: "Élevé (santé + identité)",
      decision: "Interne strict / masqué — pas cluster public",
    },
    {
      indicateur: "Carte GPS ménages",
      risque: "Élevé (localisation)",
      decision: "Agréger ou ne pas diffuser",
    },
    {
      indicateur: "Photos enfants centre",
      risque: "Très élevé",
      decision: "Consentement dédié ou ne pas collecter",
    },
  ],

  scoreClassification: function (answers) {
    var expected = this.classifications;
    var total = 0;
    var ok = 0;
    var details = [];
    Object.keys(expected).forEach(function (key) {
      total++;
      var chosen = answers[key];
      var good = chosen === expected[key];
      if (good) ok++;
      details.push({ id: key, expected: expected[key], chosen: chosen || "—", ok: good });
    });
    return { ok: ok, total: total, score: total ? Math.round((ok / total) * 100) : 0, details: details };
  },

  scenariosForPack: function (packId) {
    return this.scenarios.filter(function (s) {
      return !s.packs || s.packs.indexOf(packId) >= 0;
    });
  },
};
