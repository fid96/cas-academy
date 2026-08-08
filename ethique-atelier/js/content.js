/* Éthique Atelier — socle commun + parcours Data Analyst | Expert S&E
   Cas fil rouge : district fictif Kalunga (Nutrition & WASH)
*/

window.ETHIQUE_CONTENT = (function () {
  const caseStudy = {
    name: "Kalunga — Nutrition & WASH",
    type: "Projet humanitaire fictif (style ONG / clusters)",
    summary:
      "Registre, agrégats, GPS et photos : l’éthique décide ce qui peut être collecté, analysé, partagé — ou doit rester masqué.",
  };

  const glossary = [
    { term: "Donnée personnelle", def: "Information qui identifie ou rend identifiable une personne (nom, téléphone, ID nominatif…)." },
    { term: "Donnée sensible", def: "Donnée à risque élevé si divulguée (santé, localisation fine, vulnérabilité, images d’enfants…)." },
    { term: "Consentement éclairé", def: "Accord libre, informé, spécifique à une finalité — révocable." },
    { term: "Minimisation", def: "Ne collecter / conserver / partager que ce qui est nécessaire à la finalité." },
    { term: "Finalité", def: "Raison précise du traitement (suivi nutrition, reporting bailleur…)." },
    { term: "Need to know", def: "Ne partager qu’avec ceux qui en ont réellement besoin pour agir." },
    { term: "Anonymisation / masquage", def: "Retirer ou altérer les identifiants pour réduire le risque de ré-identification." },
    { term: "Do-no-harm", def: "Ne pas exposer les personnes à un préjudice via la collecte ou le partage de données." },
    { term: "AAP", def: "Accountability to Affected People — redevabilité envers les populations affectées." },
    { term: "PII", def: "Personally Identifiable Information — informations personnellement identifiables." },
  ];

  const method = {
    title: "Méthode Éthique opérationnelle",
    steps: [
      { num: "01", title: "Voir", text: "Quelle décision / quel partage ? Qui peut être exposé ?" },
      { num: "02", title: "Comprendre", text: "Finalité, sensibilité des variables, consentement, destinataires." },
      { num: "03", title: "Pratiquer", text: "Classer, minimiser, masquer, documenter avant d’envoyer." },
      { num: "04", title: "Vérifier", text: "Go / no-go éthique : partager, masquer, ou refuser." },
    ],
    principles: [
      {
        title: "La personne avant le tableau",
        text: "Un KPI utile ne justifie pas d’exposer un enfant, un ménage ou un patient.",
      },
      {
        title: "Minimiser par défaut",
        text: "Si une variable n’est pas nécessaire à la décision, ne pas la collecter ni la partager.",
      },
      {
        title: "Need to know",
        text: "Cluster, bailleur, WhatsApp : ce n’est pas le même niveau de partage.",
      },
      {
        title: "Cas Kalunga = terrain d’exercice",
        text: "Les réflexes se transfèrent à tout secteur — pas seulement humanitaire.",
      },
    ],
  };

  function L(partial) {
    return Object.assign(
      {
        caption: "",
        voir: { paragraphs: [], analogy: null },
        comprendre: { paragraphs: [], bullets: [] },
        pratiquer: {
          prompt: "",
          placeholder: "",
          hint: "",
          checkType: "minLines",
          keywords: [],
          minLines: 3,
          success: "Bien.",
          fail: "Complétez la réponse demandée.",
        },
        verifier: { question: "", options: [], answer: 0, explain: "" },
        retenir: [],
      },
      partial
    );
  }

  const modulesSocle = [
    {
      id: "m1",
      title: "01 · Pourquoi l’éthique data",
      track: "socle",
      level: "Socle",
      packs: ["data-analyst", "se"],
      summary: "Protéger les personnes derrière les lignes.",
      lessons: [
        L({
          id: "m1-l1",
          title: "Derrière chaque ligne, une personne",
          goal: "Relier analyse / S&E et risque de préjudice.",
          caption: "Une fuite de registre peut coûter plus cher qu’un KPI manquant.",
          voir: {
            paragraphs: [
              "Sur Kalunga, téléphone + GPS ménage + statut nutrition = cocktail sensible.",
              "L’éthique n’est pas un frein : c’est la condition pour que la donnée reste légitime et utile.",
            ],
            analogy: {
              title: "Analogie du dossier médical",
              text: "On ne laisse pas un dossier patient sur une table de réunion « parce que c’est pratique ».",
            },
          },
          comprendre: {
            paragraphs: ["Risques typiques :"],
            bullets: [
              "Stigmatisation (maladie, vulnérabilité)",
              "Localisation de foyers vulnérables",
              "Harcèlement / abus via contacts",
              "Perte de confiance des communautés",
            ],
            code: {
              label: "mantra",
              lines: "Personne > tableau\nMinimiser\nNeed to know\nDo-no-harm",
            },
          },
          pratiquer: {
            prompt: "Citez 3 préjudices possibles si le registre Kalunga fuit (1 ligne chacun).",
            placeholder: "1) …\n2) …\n3) …",
            hint: "stigmatisation, localisation, contacts…",
            checkType: "minLines",
            minLines: 3,
            success: "Vous voyez le risque humain.",
            fail: "3 préjudices.",
          },
          verifier: {
            question: "L’éthique des données sert surtout à…",
            options: [
              "Ralentir inutilement le reporting",
              "Éviter de nuire aux personnes tout en servant la décision",
              "Remplacer la qualité des données",
              "Interdire tout Excel",
            ],
            answer: 1,
            explain: "Protéger + décider.",
          },
          retenir: ["Personne > tableau.", "Fuite = préjudice.", "Éthique = condition de légitimité."],
        }),
      ],
    },
    {
      id: "m2",
      title: "02 · Sensibilité & minimisation",
      track: "socle",
      level: "Socle",
      packs: ["data-analyst", "se"],
      summary: "Classer les variables et ne garder que le nécessaire.",
      lessons: [
        L({
          id: "m2-l1",
          title: "Publique, interne, sensible",
          goal: "Classer les variables Kalunga par niveau de risque.",
          caption: "Le classement guide ce qu’on peut exporter.",
          voir: {
            paragraphs: [
              "taux_guerison_aire (agrégé) ≠ telephone ≠ gps_menage.",
              "Le Labo Éthique propose un exercice de classement sur 12 variables.",
            ],
            analogy: {
              title: "Analogie des badges d’accès",
              text: "Tout le monde n’entre pas dans la salle des serveurs. Idem pour les colonnes.",
            },
          },
          comprendre: {
            paragraphs: ["Trois niveaux opérationnels :"],
            bullets: [
              "Publique — agrégats non identifiants",
              "Interne — need to know (pilotage)",
              "Sensible — masquer / ne pas partager largement",
            ],
            annotation: "Ouvrez le Labo et classez les variables.",
          },
          pratiquer: {
            prompt: "Classez en une ligne chacune : telephone, aire_sante, gps_menage, taux_guerison_aire (publique / interne / sensible).",
            placeholder: "telephone : …\naire_sante : …\ngps_menage : …\ntaux_guerison_aire : …",
            hint: "sensible / publique / sensible / publique",
            checkType: "keywords",
            keywords: ["sensible", "publique"],
            minLines: 4,
            success: "Classement amorcé — affinez dans le labo.",
            fail: "4 lignes avec les niveaux.",
          },
          verifier: {
            question: "Un GPS ménage est en général…",
            options: ["Publique", "Sensible", "Sans enjeu", "Un type de SCR"],
            answer: 1,
            explain: "Localisation fine = sensible.",
          },
          retenir: ["Classer avant d’exporter.", "Minimiser.", "Agrégé ≠ nominatif."],
        }),
      ],
    },
    {
      id: "m3",
      title: "03 · Consentement, partage, IA",
      track: "socle",
      level: "Socle",
      packs: ["data-analyst", "se"],
      summary: "Finalité, destinataires, prompts sans PII.",
      lessons: [
        L({
          id: "m3-l1",
          title: "Ce qui est collecté n’est pas libre de droits",
          goal: "Lier finalité, consentement et règles de partage (y compris IA).",
          caption: "Nouvelle finalité = nouvelles règles.",
          voir: {
            paragraphs: [
              "Collecter pour le suivi nutrition ≠ publier nominatif au cluster.",
              "Coller un registre dans un prompt IA = partage à un tiers (souvent cloud).",
            ],
            analogy: {
              title: "Analogie de la clé de maison",
              text: "On ne donne pas sa clé à un inconnu « pour qu’il aide à ranger ».",
            },
          },
          comprendre: {
            paragraphs: ["Avant tout partage :"],
            bullets: [
              "Finalité compatible avec le consentement ?",
              "Destinataire need-to-know ?",
              "Version masquée / agrégée disponible ?",
              "Pas de PII dans les prompts IA",
            ],
          },
          pratiquer: {
            prompt: "Rédigez 4 règles d’or personnelles (collecte / export / IA / partage WhatsApp).",
            placeholder: "1) …\n2) …\n3) …\n4) …",
            hint: "minimiser, masquer, pas de PII prompt…",
            checkType: "minLines",
            minLines: 4,
            success: "Règles opérationnelles claires.",
            fail: "4 règles.",
          },
          verifier: {
            question: "Coller des noms de patients dans un prompt cloud…",
            options: ["Est recommandé", "Est à éviter", "Remplace le consentement", "Est obligatoire"],
            answer: 1,
            explain: "Pas de PII dans les prompts.",
          },
          retenir: ["Finalité d’abord.", "Need to know.", "IA sans PII."],
        }),
      ],
    },
  ];

  const modulesDa = [
    {
      id: "m4",
      title: "04 · Exports & fichiers partageables",
      track: "metier",
      level: "Data Analyst",
      packs: ["data-analyst"],
      summary: "Produire une version safe pour l’extérieur.",
      lessons: [
        L({
          id: "m4-l1",
          title: "Brut ≠ partageable",
          goal: "Concevoir un export minimisé et masqué.",
          caption: "Deux fichiers : travail interne vs diffusion.",
          voir: {
            paragraphs: [
              "Le DA crée souvent la version « qui part ». C’est une responsabilité éthique.",
              "Retirer téléphone, GPS, noms ; garder agrégats ou IDs pseudonymisés selon besoin.",
            ],
            analogy: {
              title: "Analogie du badge visiteur",
              text: "Le visiteur n’obtient pas le badge admin. L’export externe non plus.",
            },
          },
          comprendre: {
            paragraphs: ["Checklist export DA :"],
            bullets: [
              "Finalité écrite",
              "Colonnes classées",
              "PII retirées / masquées",
              "Nom de fichier + destinataire + date",
              "Pas de prompt IA avec le brut",
            ],
          },
          pratiquer: {
            prompt: "Listez les colonnes à RETIRER d’un export public Kalunga, puis celles à GARDER (2 listes).",
            placeholder: "Retirer : …\nGarder : …",
            hint: "téléphone, GPS, photo… vs taux, aire…",
            checkType: "keywords",
            keywords: ["retir", "gard"],
            minLines: 2,
            success: "Export pensé en minimisation.",
            fail: "Deux listes (retirer / garder).",
          },
          verifier: {
            question: "Un bon export externe…",
            options: [
              "Contient toutes les colonnes du brut",
              "Est minimisé et sans PII inutile",
              "Inclut les photos « pour faire vrai »",
              "Est envoyé sur un groupe ouvert par défaut",
            ],
            answer: 1,
            explain: "Minimisation.",
          },
          retenir: ["Deux versions de fichier.", "Masquer avant d’envoyer.", "Tracer le destinataire."],
        }),
      ],
    },
    {
      id: "m5",
      title: "05 · IA & outils sans fuite",
      track: "metier",
      level: "Data Analyst",
      packs: ["data-analyst"],
      summary: "Prompts, cloud, captures d’écran.",
      lessons: [
        L({
          id: "m5-l1",
          title: "L’outil n’efface pas la responsabilité",
          goal: "Appliquer l’éthique aux prompts et captures.",
          caption: "Capture d’écran WhatsApp = aussi un partage.",
          voir: {
            paragraphs: [
              "IA, Drive, email, chat : chaque collage est un transfert.",
              "Préférez schéma, agrégats déjà validés, exemples fictifs.",
            ],
          },
          comprendre: {
            paragraphs: ["Interdits pratiques :"],
            bullets: [
              "Noms, téléphones, GPS fins dans un prompt",
              "Photos d’enfants vers un outil cloud non autorisé",
              "Tableaux nominatifs en pièce jointe « pour relecture IA »",
            ],
          },
          pratiquer: {
            prompt: "Rédigez un prompt IA safe pour « structurer une note nutrition » SANS données personnelles (4–6 lignes).",
            placeholder: "Contexte fictif…\nSchéma…\nInterdiction d’inventer…",
            hint: "fictif, schéma, pas de PII",
            checkType: "minLines",
            minLines: 4,
            success: "Prompt responsable.",
            fail: "Au moins 4 lignes.",
          },
          verifier: {
            question: "Pour faire aider une IA, le mieux est…",
            options: [
              "Coller le registre nominatif",
              "Fournir schéma + exemples fictifs / agrégats",
              "Envoyer les photos",
              "Demander des totaux sans source",
            ],
            answer: 1,
            explain: "Fictif / agrégé.",
          },
          retenir: ["Tout collage = partage.", "Fictif d’abord.", "Responsabilité humaine."],
        }),
      ],
    },
  ];

  const modulesSe = [
    {
      id: "m4",
      title: "04 · Consentement & AAP",
      track: "metier",
      level: "Expert S&E",
      packs: ["se"],
      summary: "Protéger dans la conception du système S&E.",
      lessons: [
        L({
          id: "m4-l1",
          title: "Le S&E décide ce qui est collecté",
          goal: "Lier indicateurs, consentement et non sur-collecte.",
          caption: "Un champ « au cas où » sensible est souvent une faute.",
          voir: {
            paragraphs: [
              "Ajouter photo + GPS sans mettre à jour le consentement = risque do-no-harm.",
              "L’AAP implique aussi d’expliquer l’usage des données et d’écouter les plaintes.",
            ],
            analogy: {
              title: "Analogie du contrat",
              text: "On ne change pas les termes après signature sans en parler.",
            },
          },
          comprendre: {
            paragraphs: ["Réflexes S&E :"],
            bullets: [
              "Chaque indicateur a une finalité claire",
              "Pas de variable sensible sans nécessité",
              "Consentement adapté aux nouvelles finalités",
              "Canal de plainte / feedback connu",
            ],
          },
          pratiquer: {
            prompt: "Pour Kalunga : 1) une donnée à NE PAS ajouter sans consentement dédié ; 2) une alternative agrégée ; 3) un message AAP en 2 lignes.",
            placeholder: "1) …\n2) …\n3) …",
            hint: "photo, GPS…",
            checkType: "minLines",
            minLines: 3,
            success: "Conception S&E protectrice.",
            fail: "3 éléments.",
          },
          verifier: {
            question: "Une nouvelle collecte de photos enfants…",
            options: [
              "Peut se faire sans rien changer",
              "Exige finalité et consentement adaptés",
              "Est toujours publique",
              "Remplace les indicateurs",
            ],
            answer: 1,
            explain: "Consentement dédié.",
          },
          retenir: ["Pas de sur-collecte.", "Consentement vivant.", "AAP inclut les données."],
        }),
      ],
    },
    {
      id: "m5",
      title: "05 · Partager ou masquer",
      track: "metier",
      level: "Expert S&E",
      packs: ["se"],
      summary: "Décisions éthiques face aux clusters et bailleurs.",
      lessons: [
        L({
          id: "m5-l1",
          title: "Go / no-go éthique",
          goal: "Décider partager, masquer ou refuser — avec motif.",
          caption: "Dire non est parfois le bon reporting.",
          voir: {
            paragraphs: [
              "Le labo propose une matrice indicateur × risque.",
              "Exemple : liste nominative → interne ; % guérison agrégé → partageable.",
            ],
          },
          comprendre: {
            paragraphs: ["Trame de décision :"],
            bullets: [
              "Qui demande ? Pour quelle décision ?",
              "Quel niveau de sensibilité ?",
              "Peut-on agréger / masquer ?",
              "Décision + responsable + trace",
            ],
          },
          pratiquer: {
            prompt: "Rédigez 3 décisions Kalunga au format Demande — décision (partager/masquer/refuser) — motif.",
            placeholder: "1) … — … — …\n2) …\n3) …",
            hint: "utiliser des tirets",
            checkType: "keywords",
            keywords: ["—"],
            minLines: 3,
            success: "Décisions éthiques assignables.",
            fail: "3 lignes avec tirets.",
          },
          verifier: {
            question: "Face à une demande de microdonnées sensibles…",
            options: [
              "Toujours accepter pour le bailleur",
              "Évaluer need-to-know et masquer / refuser si risque",
              "Publier sur WhatsApp",
              "Supprimer le consentement",
            ],
            answer: 1,
            explain: "Need-to-know + protection.",
          },
          retenir: ["Évaluer la demande.", "Masquer si possible.", "Refuser si nécessaire."],
        }),
      ],
    },
  ];

  const carnetDa = {
    title: "Carnet — Éthique Data Analyst",
    subtitle: "Classement, exports safe, IA sans PII",
    sections: [
      {
        title: "A — Socle",
        exercises: [
          { id: "A1", prompt: "Listez 5 variables Kalunga et leur niveau de sensibilité." },
          { id: "A2", prompt: "Écrivez votre règle d’or en 1 phrase." },
          { id: "A3", prompt: "Décrivez 1 risque do-no-harm concret." },
        ],
      },
      {
        title: "B — Labo",
        exercises: [
          { id: "B1", prompt: "Score de classement du labo + 3 erreurs corrigées." },
          { id: "B2", prompt: "Scénario export partenaire : votre décision motivée." },
          { id: "B3", prompt: "Prompt IA safe recopié / adapté." },
        ],
      },
      {
        title: "C — Livrable",
        exercises: [
          { id: "C1", prompt: "Checklist DA cochée." },
          { id: "C2", prompt: "Modèle de nommage fichier partageable." },
          { id: "C3", prompt: "Politique perso : que je ne colle jamais dans un prompt." },
        ],
      },,
      {
        title: "D — Épreuve de maîtrise (transfert)",
        exercises: [
          { id: "D1", prompt: "Scénario dataset inconnu : classer sensibilité + décision de partage go/no-go." },
          { id: "D2", prompt: "Justifiez 3 choix (minimisation, consentement/finalité, PII hors prompt)." },
          { id: "D3", prompt: "Détectez 2 erreurs éthiques dans un export « tout partager »." },
          { id: "D4", prompt: "Rédigez une justification éthique de 8 lignes pour un coordonnateur." },
          { id: "D5", prompt: "Auto-éval (0–2) : transfert · justification · erreurs · quiz ≥80 %." },
        ],
      }
    ],
  };

  const carnetSe = {
    title: "Carnet — Éthique Expert S&E",
    subtitle: "Consentement, AAP, décisions de partage",
    sections: [
      {
        title: "A — Conception",
        exercises: [
          { id: "A1", prompt: "Pour 2 indicateurs : finalité + donnée minimale." },
          { id: "A2", prompt: "Ce que vous refusez de collecter « au cas où »." },
          { id: "A3", prompt: "Message AAP données (5 lignes)." },
        ],
      },
      {
        title: "B — Décisions",
        exercises: [
          { id: "B1", prompt: "Matrice : 3 indicateurs × risque × décision." },
          { id: "B2", prompt: "Réponse type à un bailleur demandant du nominatif." },
          { id: "B3", prompt: "Checklist S&E cochée." },
        ],
      },
      {
        title: "C — Dossier",
        exercises: [
          { id: "C1", prompt: "Où classez-vous la politique de partage dans le dossier S&E ?" },
          { id: "C2", prompt: "Qui valide les exports sensibles ?" },
          { id: "C3", prompt: "1 incident fictif + mesures correctives." },
        ],
      },,
      {
        title: "D — Épreuve de maîtrise (transfert)",
        exercises: [
          { id: "D1", prompt: "Cas AAP / consentement : go/no-go de partage + 2 mesures de mitigation." },
          { id: "D2", prompt: "Justifiez 3 choix éthiques S&E." },
          { id: "D3", prompt: "Détectez 2 erreurs : PII dans un canal public ; absence de finalité." },
          { id: "D4", prompt: "Note redevabilité éthique 6 lignes." },
          { id: "D5", prompt: "Auto-éval (0–2) : transfert · justification · erreurs · quiz ≥80 %." },
        ],
      }
    ],
  };

  const bilanDa = {
    title: "Quiz bilan — Éthique Data Analyst",
    subtitle: "8 questions — exports, PII, IA.",
    passScore: 80,
    questions: [
      { id: "b1", theme: "role", themeLabel: "Rôle", question: "Pour un DA, l’éthique data sert surtout à…", options: ["Ralentir Excel", "Traiter et partager sans nuire", "Remplacer le QC", "Éviter SQL"], answer: 1, explain: "Sans nuire." },
      { id: "b2", theme: "class", themeLabel: "Classement", question: "Un numéro de téléphone est…", options: ["Publique", "Sensible", "Un CRS", "Une cible"], answer: 1, explain: "PII sensible." },
      { id: "b3", theme: "min", themeLabel: "Minimisation", question: "Minimiser, c’est…", options: ["Tout collecter", "Ne garder que le nécessaire", "Publier plus vite", "Supprimer les agrégats"], answer: 1, explain: "Nécessaire seulement." },
      { id: "b4", theme: "export", themeLabel: "Export", question: "Avant un export externe…", options: ["Envoyer le brut", "Masquer / retirer les PII inutiles", "Ajouter les photos", "Mettre sur WhatsApp ouvert"], answer: 1, explain: "Masquer." },
      { id: "b5", theme: "ia", themeLabel: "IA", question: "Dans un prompt IA…", options: ["Coller le registre nominatif", "Utiliser schéma / fictifs / agrégats", "Coller les GPS ménages", "Uploader les photos enfants"], answer: 1, explain: "Pas de PII." },
      { id: "b6", theme: "gps", themeLabel: "GPS", question: "Carte de chaque ménage en réunion large…", options: ["Toujours OK", "À éviter — préférer agrégation", "Obligatoire", "Remplace le consentement"], answer: 1, explain: "Agréger." },
      { id: "b7", theme: "need", themeLabel: "Partage", question: "Need to know signifie…", options: ["Tout le monde lit tout", "Seulement ceux qui en ont besoin", "Publier d’abord", "Ignorer la finalité"], answer: 1, explain: "Besoin réel." },
      { id: "b8", theme: "harm", themeLabel: "Do-no-harm", question: "Do-no-harm implique…", options: ["Prioriser le beau dashboard", "Éviter d’exposer les personnes via les données", "Supprimer les indicateurs", "Interdire tout reporting"], answer: 1, explain: "Ne pas nuire." },
    ],
  };

  const bilanSe = {
    title: "Quiz bilan — Éthique Expert S&E",
    subtitle: "8 questions — consentement, AAP, partage.",
    passScore: 80,
    questions: [
      { id: "b1", theme: "role", themeLabel: "Rôle", question: "Pour le S&E, l’éthique data sert surtout à…", options: ["Allonger les annexes", "Protéger les populations dans le système d’information", "Remplacer le cadre de résultats", "Éviter les cibles"], answer: 1, explain: "Protection." },
      { id: "b2", theme: "consent", themeLabel: "Consentement", question: "Ajouter photos enfants sans mettre à jour le consentement…", options: ["Est acceptable", "Est à éviter / corriger avant collecte", "Est obligatoire cluster", "Remplace AAP"], answer: 1, explain: "Consentement adapté." },
      { id: "b3", theme: "collect", themeLabel: "Collecte", question: "Un champ sensible « au cas où »…", options: ["Est une bonne pratique", "Est souvent de la sur-collecte à éviter", "Remplace l’indicateur", "Est public"], answer: 1, explain: "Sur-collecte." },
      { id: "b4", theme: "share", themeLabel: "Partage", question: "Liste nominative demandée par un partenaire…", options: ["Toujours envoyer", "Évaluer need-to-know et masquer / refuser si besoin", "Publier sur Twitter", "Mettre dans le prompt IA"], answer: 1, explain: "Évaluer." },
      { id: "b5", theme: "aap", themeLabel: "AAP", question: "L’AAP côté données implique…", options: ["Ne rien expliquer", "Expliquer l’usage et permettre le feedback / plaintes", "Collecter plus", "Cacher la finalité"], answer: 1, explain: "Transparence + feedback." },
      { id: "b6", theme: "agg", themeLabel: "Agrégation", question: "% guérison par aire…", options: ["Est aussi risqué qu’un GPS ménage", "Est en général plus partageable s’il est non identifiant", "Interdit tout reporting", "Exige les téléphones"], answer: 1, explain: "Agrégat." },
      { id: "b7", theme: "decision", themeLabel: "Décision", question: "Un no-go éthique…", options: ["N’existe pas", "Peut être la bonne décision de reporting", "Signifie supprimer le S&E", "Remplace le QC qualité"], answer: 1, explain: "Refuser peut protéger." },
      { id: "b8", theme: "harm", themeLabel: "Do-no-harm", question: "Do-no-harm dans le S&E…", options: ["Ne concerne que la logistique", "S’applique aussi à la collecte et au partage de données", "Interdit les baselines", "Est un type de TCD"], answer: 1, explain: "Données incluses." },
    ],
  };

  function build(packId) {
    const isSe = packId === "se";
    const modules = modulesSocle.concat(isSe ? modulesSe : modulesDa);
    return {
      packId: isSe ? "se" : "data-analyst",
      moduleId: isSe ? "se-11-ethique" : "11-ethique",
      brand: isSe ? "Éthique Atelier · S&E" : "Éthique Atelier · Data Analyst",
      shortBrand: "Éthique",
      mission: isSe
        ? "Protéger les populations dans le système S&E — consentement, AAP, décisions de partage."
        : "Traiter et partager des données sans nuire — minimisation, exports safe, IA sans PII.",
      heroTitle: isSe
        ? "Le S&E protège aussi par les données."
        : "Analyser sans exposer.",
      heroLead: isSe
        ? "Parcours Expert S&E : socle éthique + consentement/AAP + go/no-go de partage sur Kalunga."
        : "Parcours Data Analyst : socle éthique + exports minimisés + prompts sans PII sur Kalunga.",
      caseStudy,
      method,
      glossary,
      tracks: [
        {
          id: "socle",
          title: "Socle éthique",
          subtitle: "Risques, sensibilité, consentement, IA.",
          goal: "Partager le langage de la protection.",
        },
        {
          id: "metier",
          title: isSe ? "Éthique pour S&E" : "Éthique pour Data Analyst",
          subtitle: isSe ? "Conception et partage." : "Exports et outils.",
          goal: isSe ? "Décider de partager ou masquer." : "Produire des fichiers safe.",
        },
      ],
      modules,
      carnet: isSe ? carnetSe : carnetDa,
      bilan: isSe ? bilanSe : bilanDa,
      checklistId: isSe ? "se" : "da",
    };
  }

  return { build, caseStudy };
})();
