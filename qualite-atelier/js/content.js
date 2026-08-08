/* Qualité Atelier — socle commun + parcours Data Analyst | Expert S&E
   Cas fil rouge : district fictif Kalunga (Nutrition & WASH)
*/

window.QUALITE_CONTENT = (function () {
  const caseStudy = {
    name: "Kalunga — Nutrition & WASH",
    type: "Projet humanitaire fictif (style ONG / clusters)",
    summary:
      "Jeux de données volontaires « sales » : nutrition mensuelle, sites WASH, registre bénéficiaires. La qualité décide si un chiffre peut piloter — ou doit être bloqué.",
  };

  const glossary = [
    { term: "Qualité des données", def: "Aptitude des données à servir une décision sans induire en erreur." },
    { term: "Gouvernance des données", def: "Règles, rôles et processus qui définissent qui produit, contrôle, corrige et publie." },
    { term: "Dictionnaire de données", def: "Définition de chaque variable : sens, type, valeurs autorisées, unité, responsable." },
    { term: "QC", def: "Contrôle qualité : détecter et traiter anomalies avant analyse / reporting." },
    { term: "Complétude", def: "Les champs obligatoires sont renseignés." },
    { term: "Unicité", def: "Pas de doublons non justifiés (ID, ligne logique)." },
    { term: "Validité", def: "Valeurs dans le domaine autorisé (codes, dates, plages)." },
    { term: "Cohérence", def: "Les champs se contredisent pas (ex. fonctionnel=oui et ménages=0)." },
    { term: "Actualité", def: "La période couverte correspond à celle du reporting." },
    { term: "Journal QC", def: "Trace des anomalies, actions (corriger / exclure) et responsable." },
    { term: "Versioning", def: "Nommer et conserver les versions (brut → clean) pour traçabilité." },
    { term: "Go / no-go", def: "Décision d’autoriser ou bloquer la publication d’un chiffre." },
  ];

  const method = {
    title: "Méthode Qualité opérationnelle",
    steps: [
      { num: "01", title: "Voir", text: "Clarifier quel chiffre / quelle décision est en jeu." },
      { num: "02", title: "Comprendre", text: "Dictionnaire, règles QC, seuils d’acceptation." },
      { num: "03", title: "Pratiquer", text: "Exécuter le QC, journaliser, versionner le fichier propre." },
      { num: "04", title: "Vérifier", text: "Go / no-go : publier, corriger, ou alerter — jamais « au feeling »." },
    ],
    principles: [
      {
        title: "Pas de chiffre sans source ni contrôle",
        text: "Un beau dashboard avec des données sales reste un risque de mauvaise décision.",
      },
      {
        title: "La qualité est un processus, pas un bouton",
        text: "Règles écrites, journal, versions, responsable — sinon le QC disparaît à la prochaine urgence.",
      },
      {
        title: "Bloquer vaut mieux que publier faux",
        text: "Un no-go motivé protège le programme et les populations.",
      },
      {
        title: "Cas Kalunga = terrain d’exercice",
        text: "La méthode se transfère à tout secteur : santé, éducation, marchés, RH…",
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
      title: "01 · Pourquoi la qualité",
      track: "socle",
      level: "Socle",
      packs: ["data-analyst", "se"],
      summary: "Qualité = confiance pour décider.",
      lessons: [
        L({
          id: "m1-l1",
          title: "Données sales, décisions biaisées",
          goal: "Relier qualité des données et risque de pilotage.",
          caption: "Un chiffre non contrôlé est une hypothèse, pas une preuve.",
          voir: {
            paragraphs: [
              "Sur Kalunga, publier « 85 % de guérison » alors qu’une ligne a guerisons=-5 fausse la lecture.",
              "Qualité et gouvernance ne sont pas « techniques » seulement : elles protègent le programme et la redevabilité.",
            ],
            analogy: {
              title: "Analogie du médicament",
              text: "On ne distribue pas un traitement sans contrôle qualité. On ne devrait pas publier un KPI sans QC.",
            },
          },
          comprendre: {
            paragraphs: ["Sans qualité :"],
            bullets: [
              "Mauvaises priorités (mauvaise aire « critique »)",
              "Perte de confiance bailleur / coordination",
              "Temps perdu à refaire les totaux",
              "Risque éthique si données sensibles fuites",
            ],
            code: {
              label: "mantra",
              lines: "Décision\n← chiffre\n← données contrôlées\n← règles + journal",
            },
          },
          pratiquer: {
            prompt: "Citez 3 conséquences concrètes d’un reporting Kalunga publié sans QC (1 ligne chacune).",
            placeholder: "1) …\n2) …\n3) …",
            hint: "priorité, confiance, éthique…",
            checkType: "minLines",
            minLines: 3,
            success: "Vous ancrez la qualité dans le risque métier.",
            fail: "3 conséquences minimum.",
          },
          verifier: {
            question: "La qualité des données sert surtout à…",
            options: [
              "Allonger les rapports",
              "Rendre les chiffres dignes de confiance pour décider",
              "Remplacer le cadre de résultats",
              "Éviter Excel",
            ],
            answer: 1,
            explain: "Confiance pour décider.",
          },
          retenir: ["Qualité = confiance.", "Publier faux coûte cher.", "Kalunga = terrain d’exercice."],
        }),
      ],
    },
    {
      id: "m2",
      title: "02 · Dimensions de la qualité",
      track: "socle",
      level: "Socle",
      packs: ["data-analyst", "se"],
      summary: "Complétude, unicité, validité, cohérence, actualité.",
      lessons: [
        L({
          id: "m2-l1",
          title: "Nommer ce qui cloche",
          goal: "Classer les anomalies selon des dimensions claires.",
          caption: "Un vocabulaire commun accélère le QC en équipe.",
          voir: {
            paragraphs: [
              "Doublon Est 2025-03 → unicité. Admissions vides → complétude. guerisons=-5 → validité. ménage=0 si fonctionnel → cohérence.",
              "Sans ces mots, le QC devient une liste d’impressions.",
            ],
            analogy: {
              title: "Analogie du diagnostic médical",
              text: "On ne dit pas seulement « le patient va mal » : on nomme fièvre, fracture, infection — pour traiter juste.",
            },
          },
          comprendre: {
            paragraphs: ["Cinq dimensions opérationnelles :"],
            bullets: [
              "Complétude — champs obligatoires présents",
              "Unicité — pas de doublons injustifiés",
              "Validité — domaine / plage / format",
              "Cohérence — règles croisées entre champs",
              "Actualité — bonne période pour le reporting",
            ],
          },
          pratiquer: {
            prompt: "Pour chaque anomalie, donnez la dimension : (a) doublon B002 (b) sexe=X (c) poids=45 kg enfant (d) date vide.",
            placeholder: "a) …\nb) …\nc) …\nd) …",
            hint: "unicité / validité / aberrant-validité / complétude",
            checkType: "minLines",
            minLines: 4,
            success: "Vocabulaire QC en place.",
            fail: "4 lignes a–d.",
          },
          verifier: {
            question: "guerisons = -5 est surtout un problème de…",
            options: ["Actualité", "Validité (valeur hors domaine)", "Logo", "SCR"],
            answer: 1,
            explain: "Valeur invalide.",
          },
          retenir: ["Nommer la dimension.", "Cinq dimensions suffisent au quotidien.", "Même langage DA / S&E."],
        }),
      ],
    },
    {
      id: "m3",
      title: "03 · Dictionnaire & règles",
      track: "socle",
      level: "Socle",
      packs: ["data-analyst", "se"],
      summary: "Écrire ce qui est attendu avant de contrôler.",
      lessons: [
        L({
          id: "m3-l1",
          title: "Ce qui n’est pas défini ne se contrôle pas",
          goal: "Relier dictionnaire de données et règles QC.",
          caption: "La règle naît de la définition.",
          voir: {
            paragraphs: [
              "Si « guérison » n’est pas définie, personne ne sait si -5 est une erreur de saisie ou un code secret.",
              "Le dictionnaire fixe : définition, type, valeurs autorisées, unité, obligatoire oui/non.",
            ],
            analogy: {
              title: "Analogie du règlement de jeu",
              text: "Sans règles écrites, chaque arbitre invente. Le dictionnaire est le règlement des données.",
            },
          },
          comprendre: {
            paragraphs: ["Fiche minimale par variable :"],
            bullets: [
              "Nom + définition métier",
              "Type (nombre, date, code)",
              "Valeurs / plages autorisées",
              "Obligatoire ?",
              "Source / responsable",
            ],
            code: {
              label: "exemple",
              lines: "guerisons\n= enfants sortis guéris dans le mois\ntype: entier ≥ 0\nobligatoire: oui\nsource: registre nutrition",
            },
          },
          pratiquer: {
            prompt: "Rédigez 3 fiches ultra-courtes : admissions, guerisons, aire_sante (définition + contrainte).",
            placeholder: "admissions : …\nguerisons : …\naire_sante : …",
            hint: "type + plage ou liste",
            checkType: "minLines",
            minLines: 3,
            success: "Dictionnaire amorcé.",
            fail: "3 variables.",
          },
          verifier: {
            question: "Les règles QC doivent…",
            options: [
              "Rester orales pour aller plus vite",
              "Découler du dictionnaire et être écrites",
              "Changer à chaque slide",
              "Remplacer les indicateurs",
            ],
            answer: 1,
            explain: "Écrites, liées au dictionnaire.",
          },
          retenir: ["Définir avant de contrôler.", "Fiche variable minimale.", "Règles écrites."],
        }),
      ],
    },
    {
      id: "m4",
      title: "04 · Journal, versions, go/no-go",
      track: "socle",
      level: "Socle",
      packs: ["data-analyst", "se"],
      summary: "Traçabilité et décision de publication.",
      lessons: [
        L({
          id: "m4-l1",
          title: "Rien ne disparaît sans trace",
          goal: "Tenir un journal QC et décider go / no-go.",
          caption: "Corriger sans journal = perte de mémoire organisationnelle.",
          voir: {
            paragraphs: [
              "Le labo détecte les anomalies ; l’humain décide : corriger, exclure, ou bloquer le reporting.",
              "Versionner : garder le brut, produire un clean nommé (date + suffixe).",
            ],
            analogy: {
              title: "Analogie du cahier de labo",
              text: "En science, on note ce qu’on a changé. En data, le journal QC joue ce rôle.",
            },
          },
          comprendre: {
            paragraphs: ["Trame journal :"],
            bullets: [
              "ID ligne / clé + type d’anomalie",
              "Action : corrigé / exclu / en attente",
              "Motif + responsable + date",
              "Impact sur le KPI (oui/non)",
            ],
            annotation: "Ouvrez le Labo Qualité et lancez un QC nutrition ou registre.",
          },
          pratiquer: {
            prompt: "Écrivez 4 lignes de journal QC Kalunga (anomalie → action).",
            placeholder: "1) … → …\n2) …\n3) …\n4) …",
            hint: "doublon, manquant, aberrant, sensible…",
            checkType: "minLines",
            minLines: 4,
            success: "Journal exploitable.",
            fail: "4 lignes.",
          },
          verifier: {
            question: "Un no-go publication signifie…",
            options: [
              "On publie quand même avec une belle couleur",
              "On bloque ou on corrige avant de diffuser le chiffre",
              "On supprime le dictionnaire",
              "On ignore les doublons",
            ],
            answer: 1,
            explain: "Bloquer / corriger d’abord.",
          },
          retenir: ["Journal obligatoire.", "Version brut / clean.", "Go/no-go écrit."],
        }),
      ],
    },
  ];

  const modulesDa = [
    {
      id: "m5",
      title: "05 · Produire le fichier propre",
      track: "metier",
      level: "Data Analyst",
      packs: ["data-analyst"],
      summary: "Règles, journal, export clean versionné.",
      lessons: [
        L({
          id: "m5-l1",
          title: "Du brut au clean défendable",
          goal: "Livrer un jeu propre avec traçabilité.",
          caption: "L’analyste qualité livre un artefact, pas seulement une alerte.",
          voir: {
            paragraphs: [
              "Rôle DA : exécuter le QC, appliquer les règles, documenter, exporter kalunga_*_clean_vDATE.csv.",
              "Les téléphones du registre ne partent pas dans un export public.",
            ],
            analogy: {
              title: "Analogie du data pipeline",
              text: "Brut → contrôles → clean → analyse. Sauter une étape casse la chaîne.",
            },
          },
          comprendre: {
            paragraphs: ["Checklist livrable DA :"],
            bullets: [
              "Dictionnaire joint ou lié",
              "Journal QC",
              "Fichier clean versionné",
              "Note de limites (2–5 lignes)",
              "PII masquée / retirée",
            ],
          },
          pratiquer: {
            prompt: "Proposez un nom de fichier clean + 3 lignes de note de limites pour la nutrition Kalunga.",
            placeholder: "Fichier : …\nLimite 1 : …\nLimite 2 : …\nLimite 3 : …",
            hint: "inclure date/version",
            checkType: "minLines",
            minLines: 4,
            success: "Livrable DA structuré.",
            fail: "Nom + 3 limites.",
          },
          verifier: {
            question: "Un bon livrable DA qualité inclut surtout…",
            options: [
              "Uniquement un graphique coloré",
              "Clean versionné + journal + limites",
              "Les téléphones en clair",
              "Aucun dictionnaire",
            ],
            answer: 1,
            explain: "Traçabilité complète.",
          },
          retenir: ["Clean versionné.", "Journal + limites.", "PII hors export public."],
        }),
      ],
    },
    {
      id: "m6",
      title: "06 · Automatiser les contrôles",
      track: "metier",
      level: "Data Analyst",
      packs: ["data-analyst"],
      summary: "Rendre le QC répétable (règles, pas héroïsme).",
      lessons: [
        L({
          id: "m6-l1",
          title: "Le QC ne doit pas dépendre d’une seule personne",
          goal: "Transformer des contrôles manuels en règles répétables.",
          caption: "Si seul vous savez « où regarder », la qualité est fragile.",
          voir: {
            paragraphs: [
              "Le labo navigateur simule des règles. En organisation : Excel/Power Query, SQL, Python, ou checklist figée.",
              "Documentez la fréquence (hebdo, avant chaque reporting).",
            ],
            analogy: {
              title: "Analogie du contrôle aérien",
              text: "La checklist avant décollage est écrite — pas improvisée selon l’humeur du pilote.",
            },
          },
          comprendre: {
            paragraphs: ["Rendre répétables :"],
            bullets: [
              "Liste ordonnée de contrôles",
              "Seuil bloquant vs informatif",
              "Qui exécute / qui valide",
              "Où est stocké le journal",
            ],
          },
          pratiquer: {
            prompt: "Écrivez 5 règles QC répétables pour le registre bénéficiaires (une par ligne).",
            placeholder: "1) …\n2) …\n3) …\n4) …\n5) …",
            hint: "unicité ID, sexe, âge, date, PII…",
            checkType: "minLines",
            minLines: 5,
            success: "Protocole DA prêt à industrialiser.",
            fail: "5 règles.",
          },
          verifier: {
            question: "Un QC durable repose surtout sur…",
            options: [
              "La mémoire d’une seule personne",
              "Des règles écrites et répétables",
              "La suppression du brut",
              "L’absence de seuils",
            ],
            answer: 1,
            explain: "Règles écrites.",
          },
          retenir: ["Répétable > héroïque.", "Seuils clairs.", "Fréquence définie."],
        }),
      ],
    },
  ];

  const modulesSe = [
    {
      id: "m5",
      title: "05 · Exiger la qualité pour piloter",
      track: "metier",
      level: "Expert S&E",
      packs: ["se"],
      summary: "Seuils d’acceptation et matrice indicateur × QC.",
      lessons: [
        L({
          id: "m5-l1",
          title: "Le S&E fixe le niveau d’exigence",
          goal: "Lier chaque indicateur à des contrôles et un seuil.",
          caption: "Sans seuil, tout passe — ou rien ne passe.",
          voir: {
            paragraphs: [
              "Exemple : % guérison — bloquer si doublon mois×aire non résolu ou si valeurs négatives.",
              "Le labo montre la matrice indicateur × contrôles : utilisez-la dans le dossier S&E.",
            ],
            analogy: {
              title: "Analogie du seuil d’alarme",
              text: "Un détecteur de fumée a un seuil. Le reporting aussi.",
            },
          },
          comprendre: {
            paragraphs: ["Pour chaque indicateur clé :"],
            bullets: [
              "Contrôles QC minimum",
              "Seuil bloquant (no-go)",
              "Seuil d’alerte (publier avec caveat)",
              "Responsable correction",
            ],
          },
          pratiquer: {
            prompt: "Pour % guérison Kalunga : écrivez 1 seuil bloquant + 1 seuil d’alerte + 1 responsable.",
            placeholder: "Bloquant : …\nAlerte : …\nResponsable : …",
            hint: "doublons / écart cible…",
            checkType: "minLines",
            minLines: 3,
            success: "Exigence S&E operationalisée.",
            fail: "3 lignes.",
          },
          verifier: {
            question: "Un seuil d’acceptation QC sert à…",
            options: [
              "Décorer le plan de suivi",
              "Décider objectivement go / no-go avant reporting",
              "Remplacer la baseline",
              "Éviter les indicateurs",
            ],
            answer: 1,
            explain: "Go/no-go objectif.",
          },
          retenir: ["Indicateur → contrôles.", "Seuils écrits.", "Responsable nommé."],
        }),
      ],
    },
    {
      id: "m6",
      title: "06 · Go/no-go & redevabilité",
      track: "metier",
      level: "Expert S&E",
      packs: ["se"],
      summary: "Décider de publier, corriger ou alerter.",
      lessons: [
        L({
          id: "m6-l1",
          title: "La décision qualité est une décision S&E",
          goal: "Rédiger un go/no-go motivé avec actions assignées.",
          caption: "Publier n’est pas neutre : c’est un acte de redevabilité.",
          voir: {
            paragraphs: [
              "Cas : nutrition avec doublon + valeur négative. No-go jusqu’à correction ; alerter coordination.",
              "La note de suivi mentionne les limites si publication partielle.",
            ],
            analogy: {
              title: "Analogie du feu rouge",
              text: "Passer au rouge « parce que le rapport est dû » reste dangereux.",
            },
          },
          comprendre: {
            paragraphs: ["Trame go/no-go :"],
            bullets: [
              "Faits QC (3 bullets max)",
              "Décision : go / go avec caveat / no-go",
              "Actions : qui — quoi — quand",
              "Impact sur les chiffres du reporting",
            ],
          },
          pratiquer: {
            prompt: "Rédigez un no-go Kalunga en 4 lignes (faits → décision → 2 actions assignées).",
            placeholder: "1) Faits : …\n2) Décision : …\n3) Action A — responsable — délai\n4) Action B — …",
            hint: "utiliser tirets pour assignation",
            checkType: "keywords",
            keywords: ["—"],
            minLines: 4,
            success: "Décision S&E défendable.",
            fail: "4 lignes avec actions assignées (—).",
          },
          verifier: {
            question: "En cas d’anomalies bloquantes, l’Expert S&E doit…",
            options: [
              "Publier pour respecter la deadline coûte que coûte",
              "Bloquer ou caveat + actions assignées",
              "Effacer le journal",
              "Changer la cible sans le dire",
            ],
            answer: 1,
            explain: "Bloquer / caveat responsable.",
          },
          retenir: ["Go/no-go motivé.", "Actions assignées.", "Redevabilité > vitesse."],
        }),
      ],
    },
  ];

  const carnetDa = {
    title: "Carnet — Qualité Data Analyst",
    subtitle: "Dictionnaire, règles, journal, fichier clean",
    sections: [
      {
        title: "A — Socle",
        exercises: [
          { id: "A1", prompt: "Listez 5 risques si Kalunga publie sans QC." },
          { id: "A2", prompt: "Remplissez un mini-dictionnaire (5 variables)." },
          { id: "A3", prompt: "Classez 5 anomalies du labo par dimension." },
        ],
      },
      {
        title: "B — Labo",
        exercises: [
          { id: "B1", prompt: "Copiez le résultat QC nutrition + vos actions." },
          { id: "B2", prompt: "Journal QC registre bénéficiaires (PII incluse)." },
          { id: "B3", prompt: "Nommez et décrivez votre fichier clean versionné." },
        ],
      },
      {
        title: "C — Livrable",
        exercises: [
          { id: "C1", prompt: "Checklist DA cochée." },
          { id: "C2", prompt: "5 règles QC répétables pour le prochain cycle." },
          { id: "C3", prompt: "Note de limites (½ page) jointe au dashboard." },
        ],
      },,
      {
        title: "D — Épreuve de maîtrise (transfert)",
        exercises: [
          { id: "D1", prompt: "Dataset inconnu : appliquez 5 règles QC et produisez un go/no-go." },
          { id: "D2", prompt: "Justifiez 3 choix de règles (complétude, unicité, validité)." },
          { id: "D3", prompt: "Détectez 2 erreurs dans un journal QC volontairement mauvais." },
          { id: "D4", prompt: "Livrable clean + 5 lignes de gouvernance (versions / responsables)." },
          { id: "D5", prompt: "Auto-éval (0–2) : transfert · justification · erreurs · quiz ≥80 %." },
        ],
      }
    ],
  };

  const carnetSe = {
    title: "Carnet — Qualité Expert S&E",
    subtitle: "Seuils, go/no-go, redevabilité des chiffres",
    sections: [
      {
        title: "A — Exigences",
        exercises: [
          { id: "A1", prompt: "Pour 2 indicateurs : contrôles QC minimum." },
          { id: "A2", prompt: "Seuils bloquant / alerte pour % guérison." },
          { id: "A3", prompt: "Qui valide le go publication dans Kalunga ?" },
        ],
      },
      {
        title: "B — Décision",
        exercises: [
          { id: "B1", prompt: "Compte-rendu QC (faits) après labo nutrition." },
          { id: "B2", prompt: "Décision go/no-go motivée." },
          { id: "B3", prompt: "3 actions assignées (action — délai — responsable)." },
        ],
      },
      {
        title: "C — Dossier",
        exercises: [
          { id: "C1", prompt: "Où classez-vous journal QC + seuils dans le dossier S&E ?" },
          { id: "C2", prompt: "Checklist S&E qualité cochée." },
          { id: "C3", prompt: "Message à la coordination si no-go (5 lignes)." },
        ],
      },,
      {
        title: "D — Épreuve de maîtrise (transfert)",
        exercises: [
          { id: "D1", prompt: "Seuils S&E sur dataset inconnu : go/no-go redevabilité + 2 actions." },
          { id: "D2", prompt: "Justifiez 3 seuils d’acceptation." },
          { id: "D3", prompt: "Détectez 2 erreurs : publier sans journal ; seuil non documenté." },
          { id: "D4", prompt: "Note décisionnelle qualité 6 lignes." },
          { id: "D5", prompt: "Auto-éval (0–2) : transfert · justification · erreurs · quiz ≥80 %." },
        ],
      }
    ],
  };

  const bilanDa = {
    title: "Quiz bilan — Qualité Data Analyst",
    subtitle: "10 questions — dictionnaire, QC, traçabilité.",
    passScore: 80,
    questions: [
      { id: "b1", theme: "role", themeLabel: "Rôle", question: "Pour un DA, la qualité sert surtout à…", options: ["Remplacer SQL", "Rendre les données fiables et traçables", "Éviter le storytelling", "Supprimer Kobo"], answer: 1, explain: "Fiabilité + traçabilité." },
      { id: "b2", theme: "dim", themeLabel: "Dimensions", question: "Un doublon d’ID est un problème d’…", options: ["Unicité", "Actualité seule", "SCR", "Storytelling"], answer: 0, explain: "Unicité." },
      { id: "b3", theme: "dict", themeLabel: "Dictionnaire", question: "Le dictionnaire de données…", options: ["Est optionnel si le fichier est joli", "Définit variables et valeurs attendues", "Remplace le QC", "Est un logo"], answer: 1, explain: "Définitions." },
      { id: "b4", theme: "qc", themeLabel: "QC", question: "guerisons = -5…", options: ["Est valide", "Doit être signalé (validité / aberrant)", "Améliore la cible", "Remplace la baseline"], answer: 1, explain: "Anomalie." },
      { id: "b5", theme: "gov", themeLabel: "Gouvernance", question: "Le journal QC sert à…", options: ["Effacer les preuves", "Tracer anomalies et actions", "Cacher les PII dans le titre", "Éviter les versions"], answer: 1, explain: "Traçabilité." },
      { id: "b6", theme: "pii", themeLabel: "Sensible", question: "Téléphones dans un export public…", options: ["Sont recommandés", "Doivent être masqués / retirés", "Remplacent benef_id", "Valent une cible"], answer: 1, explain: "PII." },
      { id: "b7", theme: "version", themeLabel: "Versions", question: "Bonne pratique…", options: ["Écraser le brut sans copie", "Conserver brut + clean versionné", "Renommer au hasard", "Supprimer le dictionnaire"], answer: 1, explain: "Brut + clean." },
      { id: "b8", theme: "process", themeLabel: "Processus", question: "Ordre sain…", options: ["Publier → QC → dictionnaire", "Dictionnaire/règles → QC → journal → clean", "Clean → ignorer anomalies", "Dashboard → inventer totaux"], answer: 1, explain: "Chaîne qualité." },
      { id: "b9", theme: "auto", themeLabel: "Répétabilité", question: "Un QC durable…", options: ["Dépend d’une seule mémoire", "S’appuie sur des règles écrites répétables", "Change chaque heure sans trace", "Ignore les seuils"], answer: 1, explain: "Règles." },
      { id: "b10", theme: "nogo", themeLabel: "Publication", question: "En cas d’anomalies bloquantes…", options: ["Publier quand même", "Corriger / bloquer avant diffusion", "Changer le logo", "Supprimer les cibles"], answer: 1, explain: "Bloquer/corriger." },
    ],
  };

  const bilanSe = {
    title: "Quiz bilan — Qualité Expert S&E",
    subtitle: "10 questions — seuils, go/no-go, redevabilité.",
    passScore: 80,
    questions: [
      { id: "b1", theme: "role", themeLabel: "Rôle", question: "Pour le S&E, la qualité sert surtout à…", options: ["Décorer les annexes", "Garantir des chiffres dignes de piloter et rendre compte", "Remplacer le cadre de résultats", "Éviter les indicateurs"], answer: 1, explain: "Pilotage & redevabilité." },
      { id: "b2", theme: "seuil", themeLabel: "Seuils", question: "Un seuil d’acceptation…", options: ["Est inutile", "Cadre le go/no-go objectivement", "Remplace AAP", "Est un type de GPS"], answer: 1, explain: "Go/no-go." },
      { id: "b3", theme: "link", themeLabel: "Indicateurs", question: "Chaque indicateur clé devrait avoir…", options: ["Uniquement une couleur", "Des contrôles QC liés", "Aucun responsable", "Une cible secrète"], answer: 1, explain: "Contrôles liés." },
      { id: "b4", theme: "nogo", themeLabel: "Décision", question: "No-go signifie…", options: ["Publier sans caveat", "Bloquer ou exiger correction avant diffusion", "Supprimer le plan de suivi", "Ignorer les doublons"], answer: 1, explain: "Bloquer/corriger." },
      { id: "b5", theme: "dim", themeLabel: "Dimensions", question: "Admissions vides…", options: ["Complétude", "SIG", "Storytelling", "EPSG"], answer: 0, explain: "Complétude." },
      { id: "b6", theme: "ethics", themeLabel: "Éthique", question: "Données personnelles dans un rapport public…", options: ["Sont toujours OK", "Demandent prudence / agrégation / masquage", "Remplacent le QC", "Valent une baseline"], answer: 1, explain: "Do-no-harm." },
      { id: "b7", theme: "action", themeLabel: "Actions", question: "Après anomalies, le S&E doit…", options: ["Garder le silence", "Assigner actions (qui — quoi — quand)", "Changer la cible en silence", "Effacer le journal"], answer: 1, explain: "Actions assignées." },
      { id: "b8", theme: "report", themeLabel: "Reporting", question: "Publier avec caveat…", options: ["Est interdit", "Peut être légitime si limites explicites et risque maîtrisé", "Remplace le no-go toujours", "Annule le dictionnaire"], answer: 1, explain: "Caveat possible." },
      { id: "b9", theme: "gov", themeLabel: "Gouvernance", question: "La gouvernance des données…", options: ["N’est que technique IT", "Inclut règles, rôles et décision de publication", "Est un logiciel payant", "Remplace MEAL"], answer: 1, explain: "Règles + rôles." },
      { id: "b10", theme: "trust", themeLabel: "Confiance", question: "Un chiffre sans contrôle…", options: ["Suffit au bailleur", "Reste une hypothèse risquée", "Vaut une évaluation finale", "Remplace la collecte"], answer: 1, explain: "Hypothèse risquée." },
    ],
  };

  function build(packId) {
    const isSe = packId === "se";
    const modules = modulesSocle.concat(isSe ? modulesSe : modulesDa);
    return {
      packId: isSe ? "se" : "data-analyst",
      moduleId: isSe ? "se-10-qualite" : "09-qualite",
      brand: isSe ? "Qualité Atelier · S&E" : "Qualité Atelier · Data Analyst",
      shortBrand: "Qualité",
      mission: isSe
        ? "Exiger et contrôler la qualité avant de piloter — seuils, go/no-go, actions assignées."
        : "Produire des données fiables et traçables — dictionnaire, règles QC, journal, versions.",
      heroTitle: isSe
        ? "Pas de pilotage sur des chiffres douteux."
        : "Des données propres avant toute analyse.",
      heroLead: isSe
        ? "Parcours Expert S&E : socle qualité + seuils d’acceptation + décision de publication sur Kalunga."
        : "Parcours Data Analyst : socle qualité + fichier clean versionné + contrôles répétables sur Kalunga.",
      caseStudy,
      method,
      glossary,
      tracks: [
        {
          id: "socle",
          title: "Socle qualité",
          subtitle: "Dimensions, dictionnaire, journal, go/no-go.",
          goal: "Partager le langage de la confiance dans les données.",
        },
        {
          id: "metier",
          title: isSe ? "Qualité pour S&E" : "Qualité pour Data Analyst",
          subtitle: isSe ? "Seuils et redevabilité." : "Clean et règles répétables.",
          goal: isSe ? "Décider de publier ou bloquer." : "Livrer un jeu défendable.",
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
