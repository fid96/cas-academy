/* Storytelling Atelier — contenu pédagogique */

window.ATELIER = {
  brand: "Storytelling Atelier",
  mission: "Transformer l’analyse en récit clair qui fait décider.",
  tracks: [
    {
      id: "fondations",
      title: "Fondations du récit data",
      subtitle: "Public, message, preuve, limite.",
      goal: "Structurer une note courte digne d’un analyste."
    },
    {
      id: "data-analyst",
      title: "Storytelling Data Analyst",
      subtitle: "De la chaîne technique à la décision.",
      goal: "Relier SQL/Excel/Stats/Python/Power BI à une recommandation."
    }
  ],
  method: {
    title: "La méthode en quatre gestes",
    steps: [
      { num: "01", title: "Voir", text: "On identifie le décideur et la décision avant d’écrire." },
      { num: "02", title: "Comprendre", text: "On choisit 1 message, 1 preuve, 1 limite, 1 action." },
      { num: "03", title: "Pratiquer", text: "On rédige dans l’Atelier note avec les insights ventes." },
      { num: "04", title: "Vérifier", text: "On score clarté, preuve, prudence, action." }
    ],
    principles: [
      {
        title: "Une note = une décision",
        text: "Si le lecteur ne sait pas quoi faire ensuite, ce n’est pas encore du storytelling data."
      },
      {
        title: "Preuve avant opinion",
        text: "Chaque constat s’appuie sur un chiffre, une période, un n."
      },
      {
        title: "Dire la limite",
        text: "La prudence (NULL, n faible, biais) augmente la confiance, elle ne l’affaiblit pas."
      },
      {
        title: "Dernière marche de la chaîne",
        text: "Les outils produisent ; le récit décide. Storytelling clôt le processus Data Analyst."
      }
    ]
  },
  chain: [
    { id: "q", title: "Question", role: "Clarifier la décision", start: true },
    { id: "sql", title: "SQL", role: "Extraire / joindre / agréger" },
    { id: "excel", title: "Excel", role: "Explorer et contrôler vite" },
    { id: "stats", title: "Statistiques", role: "Interpréter sans se tromper" },
    { id: "python", title: "Python", role: "Automatiser / approfondir" },
    { id: "pbi", title: "Power BI", role: "Piloter visuellement" },
    { id: "story", title: "Storytelling", role: "Faire décider", end: true }
  ],
  glossary: [
    { term: "Storytelling data", def: "Art de raconter les chiffres pour éclairer une décision." },
    { term: "Message / Constat", def: "L’idée principale, affirmée en une phrase." },
    { term: "Preuve", def: "Chiffre, période, effectif qui soutiennent le constat." },
    { term: "Limite", def: "Ce qui empêche de sur-interpréter (qualité, n, biais)." },
    { term: "Recommandation", def: "Action concrète proposée au décideur." },
    { term: "Public", def: "Qui lit : coordonnateur, manager, équipe terrain…" },
    { term: "Note de décision", def: "Livrable court : constat → preuve → limite → action." },
    { term: "Insight", def: "Lecture utile extraite des données, pas un simple total brut." },
    { term: "Call to action", def: "Ce que le lecteur doit faire après la note." },
    { term: "Jargon", def: "Vocabulaire technique opaque — à traduire en langage métier." }
  ],
  modules: [
    {
      id: "m1",
      title: "Le décideur d’abord",
      track: "fondations",
      level: "Fondations",
      image: "assets/illu-logique.jpg",
      summary: "Sans public ni décision, pas de récit utile.",
      lessons: [
        {
          id: "m1-l1",
          title: "À qui parlez-vous ?",
          goal: "Adapter le niveau de détail au lecteur.",
          image: "assets/illu-analyste.jpg",
          caption: "Le même KPI, deux récits selon le public.",
          voir: {
            paragraphs: [
              "Un coordonnateur veut l’essentiel et l’action. Un analyste pair accepte plus de détail méthodologique.",
              "Le storytelling data commence par : qui décide quoi ?"
            ],
            analogy: {
              title: "Analogie du briefing terrain",
              text: "On ne lit pas le registre entier à voix haute : on dit ce qui change la tournée du jour."
            }
          },
          comprendre: {
            paragraphs: ["Questions de cadrage :"],
            bullets: [
              "Qui lit ? (rôle)",
              "Quelle décision doit être prise ?",
              "De combien de temps dispose-t-il ?",
              "Que sait-il déjà ?"
            ],
            code: {
              label: "cadre.txt",
              lines: "Public : Coordonnateur provincial\nDécision : où renforcer l’appui logistique ?\nTemps : 3 minutes de lecture"
            },
            annotation: "Ce cadre guide tout le reste."
          },
          pratiquer: {
            prompt: "Cadrez une note ventes : public + décision + durée de lecture estimée.",
            placeholder: "Public : …\nDécision : …\nDurée : …",
            hint: "3 lignes",
            checkType: "keywords",
            keywords: ["public", "décision"],
            success: "Cadrage solide.",
            fail: "Mentionnez public et décision."
          },
          verifier: {
            question: "Le storytelling data commence par…",
            options: ["Choisir une couleur Power BI", "Public et décision", "Importer 20 tables", "Cacher les limites"],
            answer: 1,
            explain: "Le lecteur et l’enjeu d’abord."
          },
          retenir: [
            "Public + décision.",
            "Adapter la densité.",
            "Le temps de lecture compte."
          ]
        }
      ]
    },
    {
      id: "m2",
      title: "Structure Constat → Action",
      track: "fondations",
      level: "Fondations",
      image: "assets/illu-conditions.jpg",
      summary: "Le squelette universel de la note analyste.",
      lessons: [
        {
          id: "m2-l1",
          title: "Les 4 blocs indispensables",
          goal: "Enchaîner constat, preuve, limite, recommandation.",
          image: "assets/illu-donnees.jpg",
          caption: "Moins de blocs, plus d’impact.",
          voir: {
            paragraphs: [
              "Constat : ce qui est vrai. Preuve : le chiffre. Limite : la prudence. Recommandation : l’action.",
              "Évitez les pavés : une idée forte vaut mieux que dix totaux sans fil."
            ],
            analogy: {
              title: "Analogie du diagnostic médical",
              text: "Symptôme (constat), examens (preuve), incertitude (limite), traitement (reco)."
            }
          },
          comprendre: {
            paragraphs: ["Modèle de phrase :"],
            bullets: [
              "Constat : « Kinshasa concentre ~43 % du CA. »",
              "Preuve : « 2,94 M / 6,79 M CDF, n=30. »",
              "Limite : « volumes inégaux entre villes. »",
              "Reco : « Prioriser le suivi logistique à Kinshasa… »"
            ],
            code: {
              label: "modele",
              lines: "CONSTAT\nPREUVE (chiffre + n + période)\nLIMITE\nRECOMMANDATION (verbe d’action)"
            },
            annotation: "L’Atelier note suit exactement ce modèle."
          },
          pratiquer: {
            prompt: "Rédigez les 4 blocs pour le constat « ACT est le produit n°1 en CA ».",
            placeholder: "Constat : …\nPreuve : …\nLimite : …\nReco : …",
            hint: "4 lignes libellées",
            checkType: "keywords",
            keywords: ["constat", "preuve", "limite", "reco"],
            success: "Structure maîtrisée.",
            fail: "Utilisez les 4 libellés : constat, preuve, limite, reco."
          },
          verifier: {
            question: "Sans recommandation, une note data…",
            options: ["Est complète", "Reste souvent une description sans décision", "Remplace Power BI", "Interdit les preuves"],
            answer: 1,
            explain: "Le récit doit faire agir."
          },
          retenir: [
            "4 blocs.",
            "Preuve chiffrée.",
            "Verbe d’action en reco."
          ]
        },
        {
          id: "m2-l2",
          title: "Un message, pas une liste",
          goal: "Choisir le fil conducteur et écarter le bruit.",
          image: "assets/illu-variables.jpg",
          caption: "Tout garder = rien faire retenir.",
          voir: {
            paragraphs: [
              "Sur les ventes, on pourrait citer 15 chiffres. Le décideur en retiendra 1 ou 2.",
              "Choisissez le message qui sert la décision ; le reste va en annexe ou au dashboard."
            ],
            analogy: {
              title: "Analogie du titre de presse",
              text: "La une porte une seule idée. Les détails sont à l’intérieur."
            }
          },
          comprendre: {
            paragraphs: ["Test du message :"],
            bullets: [
              "Peut-on l’affirmer en une phrase ?",
              "Éclaire-t-il la décision ?",
              "A-t-on une preuve ?",
              "Sinon : ce n’est pas encore le message"
            ],
            code: {
              label: "choix",
              lines: "Décision : prioriser l’appui ville\nMessage : Kinshasa concentre 43 % du CA\n(pas : liste de tous les produits)"
            },
            annotation: "Power BI montre ; la note tranche."
          },
          pratiquer: {
            prompt: "Parmi 3 idées (part Kinshasa, ACT leader, 1 quantité manquante), laquelle serait le message principal pour prioriser l’appui ville ? Pourquoi (3 lignes) ?",
            placeholder: "Message : …\nPourquoi : …",
            hint: "lien direct avec la décision « ville »",
            checkType: "keywords",
            keywords: ["kinshasa"],
            success: "Oui : le message suit la décision.",
            fail: "Pour une décision « ville », Kinshasa est le fil le plus direct."
          },
          verifier: {
            question: "Le message principal doit…",
            options: ["Tout résumer sans choix", "Servir directement la décision", "Éviter les chiffres", "Remplacer le public"],
            answer: 1,
            explain: "Décision → message."
          },
          retenir: [
            "1 fil conducteur.",
            "Couper le bruit.",
            "Dashboard ≠ note."
          ]
        }
      ]
    },
    {
      id: "m3",
      title: "Preuve et prudence",
      track: "fondations",
      level: "Fondations",
      image: "assets/illu-donnees.jpg",
      summary: "Crédibilité : chiffre + limite.",
      lessons: [
        {
          id: "m3-l1",
          title: "Écrire une preuve solide",
          goal: "Inclure chiffre, unité, n, période.",
          image: "assets/illu-analyste.jpg",
          caption: "Une preuve vague n’est pas une preuve.",
          voir: {
            paragraphs: [
              "Faible : « Kinshasa vend beaucoup. »",
              "Solide : « Kinshasa = 2,94 M CDF sur 6,79 M (≈43 %), n=30, janv.–mars 2024. »"
            ],
            analogy: {
              title: "Analogie du tribunal",
              text: "On ne gagne pas avec « je pense que ». On apporte des éléments vérifiables."
            }
          },
          comprendre: {
            paragraphs: ["Checklist preuve :"],
            bullets: [
              "Nombre + unité",
              "Dénominateur si %",
              "Effectif n",
              "Période / filtre",
              "Source (SQL, Excel, PBI…)"
            ],
            code: {
              label: "preuve",
              lines: "2,94 M / 6,79 M CDF = 43 %\nn = 30 ventes · période janv.–mars 2024\nsource : agrégation ventes"
            },
            annotation: "Stats Atelier vous a préparé à cette exigence."
          },
          pratiquer: {
            prompt: "Réécrivez solidement : « les ventes ont augmenté » (inventez une preuve crédible structurée).",
            placeholder: "…",
            hint: "chiffre, période, base de comparaison",
            checkType: "keywords",
            keywords: ["%"],
            success: "Vous ancrez avec une mesure relative.",
            fail: "Incluez au moins une comparaison en % ou un chiffre explicite avec base."
          },
          verifier: {
            question: "Une preuve data minimale contient souvent…",
            options: ["Seulement un adjectif", "Chiffre + contexte (n/période/unité)", "Un emoji", "Une couleur"],
            answer: 1,
            explain: "Contexte = crédibilité."
          },
          retenir: [
            "Chiffre contextualisé.",
            "% avec dénominateur.",
            "Source si utile."
          ]
        }
      ]
    },
    {
      id: "m4",
      title: "Recommandations actionnables",
      track: "data-analyst",
      level: "Data Analyst",
      image: "assets/illu-analyste.jpg",
      summary: "Verbe, responsable implicite, prochain pas.",
      lessons: [
        {
          id: "m4-l1",
          title: "De l’insight à l’action",
          goal: "Formuler des reco qui se mettent en œuvre.",
          image: "assets/hero-atelier.jpg",
          caption: "« Il faut sensibiliser » est trop flou.",
          voir: {
            paragraphs: [
              "Faible : « Améliorer les ventes à Mbuji-Mayi. »",
              "Forte : « Lancer sous 30 jours un contrôle de disponibilité ACT à Mbuji-Mayi et reporter le taux de rupture. »"
            ],
            analogy: {
              title: "Analogie de l’ordonnance",
              text: "Pas « allez mieux » : un geste, un délai, un suivi."
            }
          },
          comprendre: {
            paragraphs: ["Recette d’une reco :"],
            bullets: [
              "Verbe d’action (prioriser, contrôler, sécuriser…)",
              "Objet précis",
              "Horizon (si possible)",
              "Lien explicite au constat"
            ],
            code: {
              label: "reco",
              lines: "Parce que Kinshasa = 43 % du CA,\n→ prioriser le réassort Kinshasa cette semaine\n→ et suivre le CA hebdo sur le dashboard"
            },
            annotation: "Power BI suit ; la note déclenche."
          },
          pratiquer: {
            prompt: "Transformez en reco actionnable : « Il y a un problème de qualité sur quantite. »",
            placeholder: "…",
            hint: "verbe + délai + suivi",
            checkType: "keywords",
            keywords: ["contr"],
            success: "Orientation action claire.",
            fail: "Utilisez un verbe du type contrôler / corriger / mettre en place…"
          },
          verifier: {
            question: "Une bonne recommandation…",
            options: ["Reste abstraite", "Porte un verbe d’action et un objet précis", "Évite tout lien au KPI", "Remplace la preuve"],
            answer: 1,
            explain: "Actionnable."
          },
          retenir: [
            "Verbe + objet.",
            "Liée au constat.",
            "Suivi possible."
          ]
        }
      ]
    },
    {
      id: "m5",
      title: "Relier toute la chaîne",
      track: "data-analyst",
      level: "Data Analyst",
      image: "assets/illu-logique.jpg",
      summary: "Quand appeler SQL, Excel, Stats, Python, PBI dans le récit.",
      lessons: [
        {
          id: "m5-l1",
          title: "Le récit au bout du processus",
          goal: "Savoir d’où vient chaque brique de la note.",
          image: "assets/illu-donnees.jpg",
          caption: "Storytelling ne remplace pas les outils : il les conclut.",
          voir: {
            paragraphs: [
              "SQL/Excel fournissent la preuve. Stats valident l’interprétation. Python industrialise. Power BI montre. Storytelling décide.",
              "Dans la note, citez brièvement la source si utile — sans noyer le lecteur."
            ],
            analogy: {
              title: "Analogie de l’orchestre",
              text: "Chaque instrument joue sa partition ; le storytelling est la cadence finale que le public retient."
            }
          },
          comprendre: {
            paragraphs: ["Correspondances :"],
            bullets: [
              "Preuve agrégée → SQL / Excel / PBI",
              "Prudence moyenne/médiane/NULL → Stats",
              "Reproduction / pipeline → Python",
              "Support visuel en réunion → Power BI",
              "Décision écrite → Storytelling"
            ],
            code: {
              label: "ordre",
              lines: "Question → SQL/Excel → Stats → (Python) → Power BI → Note"
            },
            annotation: "Page Chaîne DA pour réviser l’ordre."
          },
          pratiquer: {
            prompt: "Pour une note sur la part de Kinshasa, quel outil pour la preuve, pour la prudence, pour le support réunion ? (3 lignes)",
            placeholder: "Preuve : …\nPrudence : …\nSupport : …",
            hint: "SQL ou Excel / Stats / Power BI",
            checkType: "keywords",
            keywords: ["stat", "power"],
            success: "Vous placez bien chaque brique.",
            fail: "Mentionnez au moins Stats (prudence) et Power BI (support)."
          },
          verifier: {
            question: "Dans la chaîne complète, le storytelling…",
            options: ["Remplace SQL", "Clôt le processus vers la décision", "Interdit Power BI", "Se place avant la question"],
            answer: 1,
            explain: "Dernière marche."
          },
          retenir: [
            "Outils → briques.",
            "Note = synthèse décisive.",
            "Ordre de la chaîne."
          ]
        }
      ]
    },
    {
      id: "m6",
      title: "Projet : note décideur ventes",
      track: "data-analyst",
      level: "Projet",
      image: "assets/illu-analyste.jpg",
      summary: "Livrer une note complète sur le jeu ventes santé.",
      lessons: [
        {
          id: "m6-l1",
          title: "Mission briefing",
          goal: "Produire une note scorée ≥ 75 dans l’Atelier note.",
          image: "assets/hero-atelier.jpg",
          caption: "Le pack Data Analyst se juge à la décision produite.",
          voir: {
            paragraphs: [
              "Public : coordonnateur. Décision : prioriser l’appui.",
              "Utilisez un insight du labo, rédigez les 4 blocs, visez un score global élevé."
            ],
            analogy: {
              title: "Analogie de la soutenance",
              text: "On ne montre pas tous les calculs : on défend une conclusion actionnable."
            }
          },
          comprendre: {
            paragraphs: ["Critères de réussite :"],
            bullets: [
              "Public et décision explicites",
              "Constat en une phrase forte",
              "Preuve chiffrée",
              "Limite honnête",
              "Reco avec verbe d’action",
              "Score atelier ≥ 75"
            ],
            code: {
              label: "livrable",
              lines: "Titre\nPublic / Décision\nConstat / Preuve / Limite / Reco\n(+ score clarté-preuve-prudence-action)"
            },
            annotation: "Passez ensuite le quiz bilan."
          },
          pratiquer: {
            prompt: "Collez ici le titre + les 4 blocs de votre note (ou résumez-les en 5 lignes).",
            placeholder: "1) Titre…\n2) Constat…\n3) Preuve…\n4) Limite…\n5) Reco…",
            hint: "5 lignes",
            checkType: "minLines",
            minLines: 5,
            success: "Livrable structuré. Bravo — le pack a une fin utile.",
            fail: "5 lignes minimum."
          },
          verifier: {
            question: "Le succès d’un Data Analyst se mesure surtout à…",
            options: ["Au nombre de graphiques 3D", "À la qualité de la décision éclairée", "À la longueur du jargon", "À l’absence de limites"],
            answer: 1,
            explain: "Impact décisionnel."
          },
          retenir: [
            "Note scorée.",
            "Décision au centre.",
            "Le pack est une chaîne, pas une pile d’outils."
          ]
        }
      ]
    }
  ],
  carnet: {
    title: "Carnet — Storytelling data",
    subtitle: "Rédiger, scorifier, présenter",
    sections: [
      {
        title: "A. Cadrage",
        exercises: [
          { id: "tA1", prompt: "Public + décision + temps de lecture." },
          { id: "tA2", prompt: "Listez 5 chiffres possibles, n’en gardez qu’1 message." },
          { id: "tA3", prompt: "Écrivez un constat en 1 phrase." },
          { id: "tA4", prompt: "Ajoutez preuve (chiffre, n, période)." },
          { id: "tA5", prompt: "Ajoutez une limite honnête." }
        ]
      },
      {
        title: "B. Décision",
        exercises: [
          { id: "tB1", prompt: "3 recommandations actionnables liées au constat." },
          { id: "tB2", prompt: "Reliez chaque reco à SQL/Excel/Stats/PBI (source)." },
          { id: "tB3", prompt: "Préparez un pitch oral de 60 secondes." },
          { id: "tB4", prompt: "Version e-mail (8 lignes max)." },
          { id: "tB5", prompt: "Version slide (titre + 3 puces + 1 reco)." },
          { id: "tB6", prompt: "Faites scorer votre note dans l’Atelier." }
        ]
      },
      {
        title: "C. Chaîne complète",
        exercises: [
          { id: "tC1", prompt: "Racontez un cas où vous remontez de PBI vers SQL." },
          { id: "tC2", prompt: "Racontez un cas où Stats corrige une mauvaise moyenne." },
          { id: "tC3", prompt: "Décrivez votre processus perso bout en bout (10 lignes)." }
        ]
      },
      {
        title: "D. Épreuve de maîtrise (transfert)",
        exercises: [
          { id: "xD1", prompt: "Brief nouveau (autre public) : note de décision 4 blocs sans rouvrir les leçons." },
          { id: "xD2", prompt: "Justifiez 3 choix narratifs (attaque, preuve, reco)." },
          { id: "xD3", prompt: "Détectez 2 erreurs : jargon sans action ; graphique sans constat ; cacher n." },
          { id: "xD4", prompt: "Livrable oral 90 secondes écrit (script)." },
          { id: "xD5", prompt: "Auto-éval (0–2) : transfert · justification · erreurs · quiz ≥80 %." }
        ]
      }
    ]
  },
  bilan: {
    title: "Quiz bilan — Storytelling Data Analyst",
    subtitle: "20 questions pour clôturer le pack.",
    passScore: 80,
    questions: [
      { id: "b1", theme: "cadre", themeLabel: "Cadrage", question: "On commence par…", options: ["Les couleurs", "Public et décision", "Un camembert", "Python obligatoire"], answer: 1, explain: "Cadrage." },
      { id: "b2", theme: "structure", themeLabel: "Structure", question: "Ordre utile…", options: ["Reco → rien", "Constat → preuve → limite → reco", "Limite seulement", "Preuve sans constat"], answer: 1, explain: "4 blocs." },
      { id: "b3", theme: "preuve", themeLabel: "Preuve", question: "Une preuve solide inclut souvent…", options: ["Un adjectif seul", "Chiffre + contexte", "Un fond animé", "Du jargon max"], answer: 1, explain: "Contexte." },
      { id: "b4", theme: "limite", themeLabel: "Limite", question: "Mentionner une limite…", options: ["Détruit toujours la crédibilité", "Renforce souvent la confiance", "Est interdit", "Remplace la reco"], answer: 1, explain: "Prudence pro." },
      { id: "b5", theme: "reco", themeLabel: "Recommandation", question: "Une bonne reco a…", options: ["Un verbe d’action", "Seulement un constat flou", "Aucun lien au KPI", "12 pages"], answer: 0, explain: "Actionnable." },
      { id: "b6", theme: "message", themeLabel: "Message", question: "Trop de messages…", options: ["Aident toujours", "Noyent le décideur", "Remplacent n", "Interdisent Power BI"], answer: 1, explain: "1 fil." },
      { id: "b7", theme: "chaine", themeLabel: "Chaîne", question: "Storytelling dans la chaîne…", options: ["Est la première étape technique", "Clôt vers la décision", "Remplace SQL", "Est optionnel décoratif seulement"], answer: 1, explain: "Fin utile." },
      { id: "b8", theme: "chaine", themeLabel: "Chaîne", question: "La prudence moyenne/médiane vient surtout de…", options: ["Stats", "Uniquement du titre Power BI", "Du fond d’écran", "Du hasard"], answer: 0, explain: "Stats." },
      { id: "b9", theme: "chaine", themeLabel: "Chaîne", question: "Le support visuel de réunion…", options: ["Power BI", "Remplace toute note", "Interdit Excel", "Est forcément du Python"], answer: 0, explain: "PBI." },
      { id: "b10", theme: "preuve", themeLabel: "Preuve", question: "« Beaucoup » sans chiffre…", options: ["Suffit", "Est trop faible", "Est une limite", "Est une reco"], answer: 1, explain: "Vague." },
      { id: "b11", theme: "reco", themeLabel: "Recommandation", question: "« Améliorer les choses »…", options: ["Est actionnable", "Est trop flou", "Est une preuve", "Est un n"], answer: 1, explain: "Trop vague." },
      { id: "b12", theme: "cadre", themeLabel: "Cadrage", question: "Le temps de lecture du décideur…", options: ["Ne compte pas", "Oriente la densité de la note", "Impose 40 graphiques", "Supprime les limites"], answer: 1, explain: "Densité." },
      { id: "b13", theme: "structure", themeLabel: "Structure", question: "Le constat doit être…", options: ["Une phrase forte", "Une annexe de 20 pages", "Un fichier ZIP", "Un filtre caché"], answer: 0, explain: "Clarté." },
      { id: "b14", theme: "metier", themeLabel: "Métier", question: "Le succès se mesure à…", options: ["La décision éclairée", "Au jargon", "À l’absence de preuves", "Au chaos visuel"], answer: 0, explain: "Impact." },
      { id: "b15", theme: "chaine", themeLabel: "Chaîne", question: "Ordre global…", options: ["PBI → question → SQL", "Question → données/outils → storytelling", "Story → SQL sans question", "Python seulement"], answer: 1, explain: "Processus." },
      { id: "b16", theme: "limite", themeLabel: "Limite", question: "Signaler un NULL…", options: ["Est du storytelling mature", "Est hors sujet", "Interdit la reco", "Remplace le public"], answer: 0, explain: "Qualité." },
      { id: "b17", theme: "message", themeLabel: "Message", question: "Choisir un message, c’est…", options: ["Tout garder", "Servir la décision et couper le bruit", "Éviter les KPI", "Copier tous les visuels"], answer: 1, explain: "Sélection." },
      { id: "b18", theme: "preuve", themeLabel: "Preuve", question: "Pour un %, il faut…", options: ["Le dénominateur", "Rien", "Uniquement une couleur", "Un camembert 3D"], answer: 0, explain: "Part de quoi ?" },
      { id: "b19", theme: "reco", themeLabel: "Recommandation", question: "Lier reco et constat…", options: ["Est essentiel", "Est interdit", "Souffle le n", "Remplace SQL"], answer: 0, explain: "Cohérence." },
      { id: "b20", theme: "metier", themeLabel: "Métier", question: "Le pack ateliers sert à…", options: ["Empiler des outils sans fin", "Former un Data Analyst capable de décider avec les données", "Éviter toute recommandation", "Remplacer le métier terrain"], answer: 1, explain: "Finalité de départ." }
    ]
  }
};
