/* Collecte Atelier — contenu pédagogique */

window.ATELIER = {
  brand: "Collecte Atelier",
  mission: "Collecter proprement pour analyser juste — qualité à la source.",
  tracks: [
    {
      id: "fondations",
      title: "Fondations de la collecte",
      subtitle: "Pourquoi la collecte décide de la qualité de l’analyse.",
      goal: "Variables, types, obligations, dictionnaire de données."
    },
    {
      id: "data-analyst",
      title: "Collecte pour Data Analyst",
      subtitle: "Kobo/ODK, contrôles, export vers la chaîne d’analyse.",
      goal: "Concevoir un formulaire analysable et le brancher au pack DA."
    }
  ],
  method: {
    title: "La méthode en quatre gestes",
    steps: [
      { num: "01", title: "Voir", text: "On part de la question d’analyse : que voudra-t-on calculer ensuite ?" },
      { num: "02", title: "Comprendre", text: "On choisit variables, types, contraintes, listes — avant le terrain." },
      { num: "03", title: "Pratiquer", text: "On construit le formulaire dans le Studio (esprit Kobo)." },
      { num: "04", title: "Vérifier", text: "On score la qualité du formulaire et on prévoit l’export." }
    ],
    principles: [
      {
        title: "La qualité se joue à la saisie",
        text: "Un NULL évité sur le terrain vaut une heure de nettoyage Python."
      },
      {
        title: "Collecter pour analyser",
        text: "Chaque question doit servir un indicateur, un filtre ou un contrôle."
      },
      {
        title: "Préférer les listes au texte libre",
        text: "« Kinshasa » écrit 12 façons différentes casse les TCD et les JOIN."
      },
      {
        title: "Première marche de la chaîne",
        text: "Collecte → Excel/SQL → Stats → Python → Power BI → Storytelling."
      }
    ]
  },
  glossary: [
    { term: "KoboToolbox", def: "Plateforme de collecte mobile (formulaires) très utilisée en humanitaire/santé." },
    { term: "ODK", def: "Open Data Kit : famille d’outils open source de collecte (Kobo s’en inspire)." },
    { term: "XLSForm", def: "Format de formulaire (souvent Excel) utilisé par Kobo/ODK : survey, choices…" },
    { term: "name", def: "Nom technique de la variable (sans espaces) : quantite, ville…" },
    { term: "label", def: "Libellé vu par l’enquêteur : « Quantité vendue »." },
    { term: "required", def: "Champ obligatoire : impossible de valider vide." },
    { term: "constraint", def: "Règle de validité (ex. quantité > 0)." },
    { term: "select_one", def: "Choix unique dans une liste." },
    { term: "skip logic", def: "Afficher/masquer une question selon une réponse précédente." },
    { term: "Dictionnaire de données", def: "Document qui définit chaque variable, type, valeurs possibles." },
    { term: "Qualité à la source", def: "Empêcher les erreurs pendant la collecte, pas seulement après." },
    { term: "Export", def: "Sortie CSV/Excel/API vers l’analyse (Excel, SQL, Python, PBI)." }
  ],
  koboSteps: [
    { title: "1. Compte / projet", text: "Créer un projet Kobo (ou serveur ODK) pour le formulaire." },
    { title: "2. Concevoir le formulaire", text: "Via Form Builder ou XLSForm (survey + choices)." },
    { title: "3. Déployer", text: "Publier le formulaire pour la collecte." },
    { title: "4. Collecter", text: "KoboCollect / Enketo sur téléphone ou navigateur, même hors ligne." },
    { title: "5. Synchroniser", text: "Envoyer les soumissions vers le serveur." },
    { title: "6. Exporter", text: "CSV/XLS/API → Excel, Python, Power BI, ou base SQL." },
    { title: "7. Analyser", text: "Entrer dans la chaîne Data Analyst (qualité, KPI, dashboard, note)." }
  ],
  modules: [
    {
      id: "m1",
      title: "Collecter pour pouvoir analyser",
      track: "fondations",
      level: "Fondations",
      image: "assets/illu-logique.jpg",
      summary: "Le lien direct entre formulaire et KPI.",
      lessons: [
        {
          id: "m1-l1",
          title: "Pourquoi le Data Analyst s’occupe de collecte",
          goal: "Relier mauvaise collecte et mauvaises conclusions.",
          image: "assets/illu-donnees.jpg",
          caption: "Si ville est libre, Kinshasa ≠ kinshasa ≠ KIN.",
          voir: {
            paragraphs: [
              "En entreprise, l’analyste reçoit souvent des données déjà structurées. En santé/ONG, il hérite souvent d’un formulaire terrain.",
              "Comprendre Kobo, c’est éviter de « réparer » demain ce qu’on peut empêcher aujourd’hui."
            ],
            analogy: {
              title: "Analogie de la balance",
              text: "Si la balance du marché est fausse, le plus beau tableau Excel ne donne pas le bon poids."
            }
          },
          comprendre: {
            paragraphs: ["Trois impacts d’une mauvaise collecte :"],
            bullets: [
              "KPI faux (totaux, moyennes)",
              "Jointures impossibles (IDs incohérents)",
              "Temps perdu en nettoyage au lieu d’analyser"
            ],
            code: {
              label: "avant-apres",
              lines: "Texte libre ville → 14 orthographes\nListe select_one → 5 villes propres\n→ TCD et SQL deviennent fiables"
            },
            annotation: "La collecte est la première marche du pack."
          },
          pratiquer: {
            prompt: "Citez 2 erreurs de collecte qui cassent une analyse par ville, et 1 remède formulaire.",
            placeholder: "1) …\n2) …\nRemède : …",
            hint: "orthographe, vide, liste",
            checkType: "minLines",
            minLines: 3,
            success: "Vous voyez le lien collecte → analyse.",
            fail: "3 lignes minimum."
          },
          verifier: {
            question: "Pour un analyste terrain, la collecte…",
            options: ["Est hors sujet", "Conditionne la qualité de l’analyse", "Remplace Power BI", "Interdit SQL"],
            answer: 1,
            explain: "Qualité à la source."
          },
          retenir: [
            "Collecte = amont de l’analyse.",
            "Listes > texte libre.",
            "Prévenir plutôt que nettoyer."
          ]
        }
      ]
    },
    {
      id: "m2",
      title: "Variables et types",
      track: "fondations",
      level: "Fondations",
      image: "assets/illu-variables.jpg",
      summary: "name, label, type, required.",
      lessons: [
        {
          id: "m2-l1",
          title: "Nommer pour la machine et pour l’humain",
          goal: "Distinguer name technique et label enquêteur.",
          image: "assets/illu-conditions.jpg",
          caption: "name=quantite · label=Quantité vendue",
          voir: {
            paragraphs: [
              "L’enquêteur lit le label. Python/Excel/Power BI utilisent le name.",
              "Règle : name court, sans accent ni espace ; label clair en français."
            ],
            analogy: {
              title: "Analogie du badge",
              text: "Matricule (name) pour le système ; prénom affiché (label) pour les gens."
            }
          },
          comprendre: {
            paragraphs: ["Types utiles :"],
            bullets: [
              "integer / decimal : quantités, montants",
              "select_one : ville, produit, oui/non",
              "date : chronologie",
              "text : remarques (avec parcimonie)",
              "geopoint : localisation terrain"
            ],
            code: {
              label: "exemple",
              lines: "name: montant_cdf\nlabel: Montant de la vente (CDF)\ntype: integer\nrequired: yes\nconstraint: . >= 0"
            },
            annotation: "Le Studio formulaires applique ces idées."
          },
          pratiquer: {
            prompt: "Proposez name + type + required pour : date, ville, quantité, montant.",
            placeholder: "date : …\nville : …\nquantite : …\nmontant_cdf : …",
            hint: "date / select_one / integer",
            checkType: "keywords",
            keywords: ["date", "ville", "quantite", "montant"],
            success: "Bon réflexe de dictionnaire.",
            fail: "Couvrez les 4 variables."
          },
          verifier: {
            question: "Le name d’une variable doit…",
            options: ["Contenir des espaces", "Être technique, stable, sans espaces", "Changer chaque jour", "Être uniquement un emoji"],
            answer: 1,
            explain: "Stabilité pour l’analyse."
          },
          retenir: [
            "name ≠ label.",
            "Type adapté au calcul.",
            "required sur l’essentiel."
          ]
        }
      ]
    },
    {
      id: "m3",
      title: "Contrôles et contraintes",
      track: "fondations",
      level: "Fondations",
      image: "assets/illu-conditions.jpg",
      summary: "Empêcher les quantités négatives et les trous inutiles.",
      lessons: [
        {
          id: "m3-l1",
          title: "Required et constraint",
          goal: "Écrire des règles simples qui protègent les KPI.",
          image: "assets/illu-logique.jpg",
          caption: "quantite > 0 · montant >= 0",
          voir: {
            paragraphs: [
              "Required évite les vides critiques. Constraint refuse les valeurs absurdes.",
              "Dans nos ventes, une quantité manquante a déjà compliqué la moyenne : un required l’aurait souvent empêchée."
            ],
            analogy: {
              title: "Analogie du portail",
              text: "Le portail ne s’ouvre pas si le badge est invalide. Le formulaire ne se soumet pas si la règle échoue."
            }
          },
          comprendre: {
            paragraphs: ["Exemples Kobo/ODK :"],
            bullets: [
              "required = yes",
              "constraint : . > 0",
              "constraint : . >= 0",
              "Listes fermées pour villes/produits",
              "Skip logic : si rupture=Oui → demander durée"
            ],
            code: {
              label: "contraintes",
              lines: "quantite: required + . > 0\nmontant_cdf: required + . >= 0\nville: select_one (pas de texte libre)"
            },
            annotation: "Mieux vaut bloquer 10 secondes sur le terrain que 2 heures en nettoyage."
          },
          pratiquer: {
            prompt: "Écrivez 3 règles de contrôle pour un formulaire ventes santé.",
            placeholder: "1) …\n2) …\n3) …",
            hint: "required, >0, liste",
            checkType: "minLines",
            minLines: 3,
            success: "Contrôles utiles.",
            fail: "3 règles."
          },
          verifier: {
            question: "Une constraint sert à…",
            options: ["Décorer le formulaire", "Refuser des valeurs invalides", "Remplacer l’export", "Supprimer Kobo"],
            answer: 1,
            explain: "Validation à la saisie."
          },
          retenir: [
            "Required sur le critique.",
            "Constraint sur l’absurde.",
            "Listes pour stabiliser."
          ]
        }
      ]
    },
    {
      id: "m4",
      title: "Kobo / ODK en pratique",
      track: "data-analyst",
      level: "Data Analyst",
      image: "assets/illu-analyste.jpg",
      summary: "Le flux projet → formulaire → collecter → exporter.",
      lessons: [
        {
          id: "m4-l1",
          title: "Le parcours Kobo pour l’analyste",
          goal: "Situer Kobo dans la chaîne sans se perdre dans l’outil.",
          image: "assets/illu-donnees.jpg",
          caption: "Concevoir → déployer → collecter → exporter → analyser.",
          voir: {
            paragraphs: [
              "KoboToolbox permet de créer un formulaire, le remplir sur mobile (souvent hors ligne), puis exporter CSV/Excel.",
              "L’analyste n’est pas forcément enquêteur, mais il doit co-concevoir le formulaire avec le programme."
            ],
            analogy: {
              title: "Analogie du cahier partagé",
              text: "Si le cahier de terrain est mal réglé, tout le monde copie les mêmes erreurs jusqu’au dashboard."
            }
          },
          comprendre: {
            paragraphs: ["Rôle de l’analyste :"],
            bullets: [
              "Traduire les KPI en questions",
              "Imposer types/listes/contraintes",
              "Prévoir l’export (colonnes stables)",
              "Tester 5–10 soumissions fictives avant déploiement",
              "Documenter le dictionnaire de données"
            ],
            code: {
              label: "flux",
              lines: "KPI voulus → variables formulaire\n→ déploiement Kobo\n→ export CSV\n→ Excel/SQL/Python/PBI\n→ storytelling"
            },
            annotation: "Page Kobo / ODK pour la checklist."
          },
          pratiquer: {
            prompt: "Listez dans l’ordre les 6 étapes Kobo (du projet à l’analyse).",
            placeholder: "1) …\n2) …\n…",
            hint: "concevoir, déployer, collecter, sync, export, analyser",
            checkType: "minLines",
            minLines: 6,
            success: "Flux clair.",
            fail: "6 étapes."
          },
          verifier: {
            question: "L’export Kobo sert surtout à…",
            options: ["Remplacer la question métier", "Alimenter l’analyse (Excel/SQL/Python/PBI)", "Interdire les contraintes", "Effacer le dictionnaire"],
            answer: 1,
            explain: "Pont vers la chaîne DA."
          },
          retenir: [
            "Co-concevoir le formulaire.",
            "Tester avant terrain.",
            "Export = entrée d’analyse."
          ]
        }
      ]
    },
    {
      id: "m5",
      title: "Du formulaire à la chaîne DA",
      track: "data-analyst",
      level: "Data Analyst",
      image: "assets/illu-logique.jpg",
      summary: "Quand passer à Excel, SQL, Python, PBI…",
      lessons: [
        {
          id: "m5-l1",
          title: "Brancher la collecte au reste du pack",
          goal: "Choisir l’outil suivant selon le besoin.",
          image: "assets/illu-analyste.jpg",
          caption: "Collecte propre → analyse plus rapide.",
          voir: {
            paragraphs: [
              "Petit volume / urgence → Excel. Base centralisée → SQL. Nettoyage répétitif → Python. Pilotage → Power BI. Décision → Storytelling.",
              "Stats intervient dès qu’on interprète (y compris pour juger les manquants restants)."
            ],
            analogy: {
              title: "Analogie du robinet",
              text: "La collecte est le robinet. Les autres ateliers sont la tuyauterie et le verre qu’on tend au décideur."
            }
          },
          comprendre: {
            paragraphs: ["Enchaînements typiques :"],
            bullets: [
              "Kobo → Excel → Stats → Storytelling (brief rapide)",
              "Kobo → Python → Power BI (pipeline hebdo)",
              "Kobo → SQL (si chargement en base) → PBI",
              "Toujours : dictionnaire de données à jour"
            ],
            code: {
              label: "mini-cas",
              lines: "Formulaire ventes Kobo\n→ export CSV\n→ Excel (contrôle)\n→ Power BI (suivi)\n→ note storytelling"
            },
            annotation: "Le Studio exporte l’en-tête CSV de votre formulaire."
          },
          pratiquer: {
            prompt: "Pour un export Kobo hebdomadaire de stock, quels 3 ateliers après la collecte ? Pourquoi ?",
            placeholder: "1) …\n2) …\n3) …",
            hint: "Python/Excel, PBI, storytelling…",
            checkType: "minLines",
            minLines: 3,
            success: "Vous savez brancher la suite.",
            fail: "3 ateliers / raisons."
          },
          verifier: {
            question: "Après une collecte Kobo, la prochaine étape dépend…",
            options: ["Toujours de Python uniquement", "Du besoin (contrôle, base, dashboard, décision)", "Uniquement du hasard", "De l’interdiction d’Excel"],
            answer: 1,
            explain: "Appel contextuel des outils."
          },
          retenir: [
            "Collecte d’abord.",
            "Puis outil selon besoin.",
            "Dictionnaire = pont."
          ]
        }
      ]
    },
    {
      id: "m6",
      title: "Projet formulaire ventes",
      track: "data-analyst",
      level: "Projet",
      image: "assets/hero-atelier.jpg",
      summary: "Concevoir un formulaire scoré prêt pour Kobo.",
      lessons: [
        {
          id: "m6-l1",
          title: "Mission qualité à la source",
          goal: "Studio : formulaire ventes avec score ≥ 80.",
          image: "assets/illu-analyste.jpg",
          caption: "Le pack DA commence ici sur le terrain.",
          voir: {
            paragraphs: [
              "Chargez le modèle Ventes, renforcez contraintes et required, exportez l’en-tête CSV.",
              "Rédigez ensuite 5 lignes de dictionnaire (name, type, règle)."
            ],
            analogy: {
              title: "Analogie du plan de bâtiment",
              text: "On ne coule pas le béton sans plan. On ne déploie pas Kobo sans formulaire pensé pour l’analyse."
            }
          },
          comprendre: {
            paragraphs: ["Critères de succès :"],
            bullets: [
              "Variables alignées sur les KPI ventes",
              "Listes pour ville/produit",
              "Contraintes quantité/montant",
              "Score Studio ≥ 80",
              "Pont explicite vers Excel/PBI"
            ],
            code: {
              label: "livrable",
              lines: "Formulaire scoré\nEn-tête CSV\nMini-dictionnaire 5 lignes\nPlan d’export"
            },
            annotation: "Puis quiz bilan."
          },
          pratiquer: {
            prompt: "Décrivez votre livrable formulaire (variables clés + 2 contraintes + outil d’analyse suivant) en 5 lignes.",
            placeholder: "1) …\n2) …\n3) …\n4) …\n5) …",
            hint: "ville, quantite, montant…",
            checkType: "minLines",
            minLines: 5,
            success: "Projet collecte cadré.",
            fail: "5 lignes."
          },
          verifier: {
            question: "Un bon formulaire Data Analyst…",
            options: ["Ignore les KPI futurs", "Anticipe l’analyse et impose des contrôles", "Maximise le texte libre", "Évite toute liste"],
            answer: 1,
            explain: "Conçu pour l’aval."
          },
          retenir: [
            "Score ≥ 80.",
            "Listes + contraintes.",
            "Collecte = marche 0 du pack."
          ]
        }
      ]
    }
  ],
  carnet: {
    title: "Carnet — Collecte & Kobo",
    subtitle: "Du besoin d’indicateur au formulaire déployable",
    sections: [
      {
        title: "A. Conception",
        exercises: [
          { id: "cA1", prompt: "Listez 5 KPI → 5 variables à collecter." },
          { id: "cA2", prompt: "Écrivez name/label/type pour chaque variable." },
          { id: "cA3", prompt: "Décidez required oui/non et pourquoi." },
          { id: "cA4", prompt: "Ajoutez 3 constraints." },
          { id: "cA5", prompt: "Transformez 2 textes libres en select_one." }
        ]
      },
      {
        title: "B. Kobo & qualité",
        exercises: [
          { id: "cB1", prompt: "Dessinez le flux Kobo en 7 cases." },
          { id: "cB2", prompt: "Préparez 10 soumissions de test (cas limites)." },
          { id: "cB3", prompt: "Rédigez un mini-dictionnaire (tableau)." },
          { id: "cB4", prompt: "Studio : score ≥ 80 sur modèle Ventes." },
          { id: "cB5", prompt: "Planifiez l’export vers Excel puis Power BI." },
          { id: "cB6", prompt: "Notez 3 règles éthiques (consentement, données sensibles)." }
        ]
      },
      {
        title: "C. Pont analyse",
        exercises: [
          { id: "cC1", prompt: "Quelle erreur de saisie Stats devrait signaler ?" },
          { id: "cC2", prompt: "Quand passeriez-vous de Kobo→Excel à Kobo→Python ?" },
          { id: "cC3", prompt: "Écrivez le message storytelling si 5 % de fiches invalides." }
        ]
      }
    ]
  },
  bilan: {
    title: "Quiz bilan — Collecte pour Data Analyst",
    subtitle: "20 questions : qualité à la source, Kobo/ODK, pont vers l’analyse.",
    passScore: 70,
    questions: [
      { id: "b1", theme: "role", themeLabel: "Rôle", question: "Pour un DA terrain, la collecte…", options: ["Est inutile", "Conditionne la qualité d’analyse", "Remplace le storytelling", "Interdit Excel"], answer: 1, explain: "Amont critique." },
      { id: "b2", theme: "vars", themeLabel: "Variables", question: "name désigne…", options: ["Le texte enquêteur seulement", "Le nom technique de variable", "Un graphique", "Un serveur"], answer: 1, explain: "Identifiant stable." },
      { id: "b3", theme: "vars", themeLabel: "Variables", question: "label désigne…", options: ["Le libellé affiché à l’enquêteur", "Un JOIN SQL", "Un DPI", "Un dashboard"], answer: 0, explain: "Lecture humaine." },
      { id: "b4", theme: "types", themeLabel: "Types", question: "Pour une ville parmi 5, mieux vaut…", options: ["Texte libre", "select_one", "GPS seul", "Note uniquement"], answer: 1, explain: "Liste fermée." },
      { id: "b5", theme: "ctrl", themeLabel: "Contrôles", question: "required sert à…", options: ["Rendre joli", "Empêcher un vide critique", "Exporter en PDF seulement", "Supprimer Kobo"], answer: 1, explain: "Obligation." },
      { id: "b6", theme: "ctrl", themeLabel: "Contrôles", question: "constraint . > 0 sur quantité…", options: ["Autorise −3", "Refuse ≤ 0", "Force le texte", "Crée un TCD"], answer: 1, explain: "Validation." },
      { id: "b7", theme: "kobo", themeLabel: "Kobo", question: "Kobo/ODK servent surtout à…", options: ["Collecter via formulaires mobiles", "Remplacer SQL toujours", "Faire du deep learning", "Colorier Power BI"], answer: 0, explain: "Collecte." },
      { id: "b8", theme: "kobo", themeLabel: "Kobo", question: "Après collecte, on…", options: ["Exporte vers l’analyse", "Efface les names", "Interdit les CSV", "Ignore les contraintes"], answer: 0, explain: "Pont DA." },
      { id: "b9", theme: "qualite", themeLabel: "Qualité", question: "Texte libre sur « ville »…", options: ["Stabilise les agrégats", "Risque de casser groupements", "Remplace required", "Est toujours mieux"], answer: 1, explain: "Orthographes multiples." },
      { id: "b10", theme: "chaine", themeLabel: "Chaîne", question: "Place de la collecte dans le pack…", options: ["Tout à la fin", "Au début (avant analyse)", "À la place du storytelling seulement", "Nulle part"], answer: 1, explain: "Marche amont." },
      { id: "b11", theme: "chaine", themeLabel: "Chaîne", question: "Export hebdo répétitif → souvent…", options: ["Python (ou automatisation)", "Uniquement crayon", "Jamais Excel", "Uniquement storytelling"], answer: 0, explain: "Automatiser." },
      { id: "b12", theme: "dico", themeLabel: "Dictionnaire", question: "Un dictionnaire de données…", options: ["Décrit variables/types/règles", "Est un camembert", "Remplace le terrain", "Interdit Kobo"], answer: 0, explain: "Documentation." },
      { id: "b13", theme: "kobo", themeLabel: "Kobo", question: "Tester avant déploiement…", options: ["Est optionnel décoratif", "Évite les erreurs massives terrain", "Supprime les listes", "Remplace l’export"], answer: 1, explain: "Pilote." },
      { id: "b14", theme: "types", themeLabel: "Types", question: "Un montant CDF…", options: ["integer/decimal", "geopoint", "note seule", "select_one couleurs"], answer: 0, explain: "Numérique." },
      { id: "b15", theme: "role", themeLabel: "Rôle", question: "L’analyste doit…", options: ["Ignorer la conception formulaire", "Co-concevoir selon les KPI", "Interdire les contraintes", "Maximiser le texte libre"], answer: 1, explain: "Co-design." },
      { id: "b16", theme: "ctrl", themeLabel: "Contrôles", question: "Skip logic sert à…", options: ["Afficher des questions selon une réponse", "Effacer le serveur", "Remplacer GPS", "Colorier Excel"], answer: 0, explain: "Logique conditionnelle." },
      { id: "b17", theme: "qualite", themeLabel: "Qualité", question: "Qualité à la source signifie…", options: ["Corriger seulement en Python plus tard", "Prévenir les erreurs dès la saisie", "Ne jamais exporter", "Supprimer n"], answer: 1, explain: "Prévention." },
      { id: "b18", theme: "chaine", themeLabel: "Chaîne", question: "Kobo → Power BI est logique pour…", options: ["Un suivi régulier", "Éviter toute question", "Remplacer le consentement", "Interdire Stats"], answer: 0, explain: "Pilotage." },
      { id: "b19", theme: "dico", themeLabel: "Dictionnaire", question: "Sans dictionnaire…", options: ["L’équipe comprend toujours pareil", "Les définitions divergent vite", "Les contraintes sont inutiles", "SQL devient parfait"], answer: 1, explain: "Ambiguïté." },
      { id: "b20", theme: "role", themeLabel: "Rôle", question: "Kobo est…", options: ["Toujours inutile au DA", "Essentiel surtout en contexte terrain/ONG/santé", "Un langage de stats", "Un type de jointure"], answer: 1, explain: "Contexte." }
    ]
  }
};
