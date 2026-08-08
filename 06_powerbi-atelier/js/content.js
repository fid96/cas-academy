/* Power BI Atelier — contenu pédagogique + design dashboard */

window.ATELIER = {
  brand: "Power BI Atelier",
  mission:
    "Maîtriser design + modèle de données + mesures DAX de base — livrable junior opérationnel.",
  tracks: [
    {
      id: "fondations",
      title: "Fondations Power BI",
      subtitle: "Données, modèle, pages, interactions.",
      goal: "Importer, modéliser simplement, publier une page utile."
    },
    {
      id: "design",
      title: "Design de dashboard pro",
      subtitle: "Architecture, hiérarchie, visuels, modèle, DAX, épreuve.",
      goal: "Composer et justifier un dashboard digne d’un livrable métier."
    }
  ],
  method: {
    title: "La méthode en quatre gestes",
    steps: [
      { num: "01", title: "Voir", text: "On définit l’utilisateur et la décision avant d’ouvrir Power BI." },
      { num: "02", title: "Comprendre", text: "On choisit architecture (zones), KPI et type de visuel." },
      { num: "03", title: "Pratiquer", text: "On compose dans le Studio, puis on reproduit dans Power BI Desktop." },
      { num: "04", title: "Vérifier", text: "On critique le design : hiérarchie, densité, cohérence, action." }
    ],
    principles: [
      {
        title: "Une page = une intention",
        text: "Dashboard exécutif ≠ page d’exploration. Ne mélangez pas tout."
      },
      {
        title: "Hiérarchie visuelle d’abord",
        text: "Le plus important est plus grand, plus haut, plus contrasté."
      },
      {
        title: "Le bon visuel pour la bonne question",
        text: "Comparer → barres. Temporalité → courbes. Un KPI → carte. Détail → tableau."
      },
      {
        title: "Moins, mais juste",
        text: "5–8 éléments bien placés battent 20 graphiques sans récit."
      }
    ]
  },
  glossary: [
    { term: "Dashboard", def: "Page de pilotage qui répond vite à des questions clés." },
    { term: "Rapport Power BI", def: "Fichier .pbix contenant pages, visuels, modèle de données." },
    { term: "Visuel", def: "Graphique, carte, tableau, segment… placé sur la page." },
    { term: "KPI / Carte", def: "Indicateur unique mis en avant (total, %, n)." },
    { term: "Segment (slicer)", def: "Filtre interactif visible sur la page." },
    { term: "Modèle de données", def: "Tables reliées (comme ventes–clients) qui alimentent les visuels." },
    { term: "Mesure (DAX)", def: "Calcul réutilisable (ex. Total Montant = SUM(...))." },
    { term: "Colonne calculée", def: "Valeur stockée par ligne ; différente d’une mesure (agrégée au filtre)." },
    { term: "Modèle en étoile", def: "Table de faits (ventes) + tables de dimensions (clients, dates, produits)." },
    { term: "CALCULATE", def: "Fonction DAX qui modifie le contexte de filtre d’une expression." },
    { term: "Time intelligence", def: "Calculs liés au temps (mois précédent, YTD) via une table Date." },
    { term: "Hiérarchie visuelle", def: "Ordre de lecture guidé par taille, position, contraste." },
    { term: "Grille / Alignement", def: "Organisation en colonnes/lignes pour un rendu pro." },
    { term: "Densité", def: "Quantité d’information par écran — trop dense = illisible." },
    { term: "Storytelling", def: "Enchaînement constat → cause → action sur le dashboard." },
    { term: "Accessibilité", def: "Contraste, légendes, titres clairs, pas de couleur seule comme signal." }
  ],
  designRules: [
    {
      title: "Architecture en zones",
      text: "Haut : filtres légers + KPI. Centre : message principal. Bas/côté : détail ou secondaire."
    },
    {
      title: "Lecture en Z ou en F",
      text: "L’œil commence en haut à gauche. Placez le titre et le KPI n°1 dans cette zone."
    },
    {
      title: "Échelle des tailles",
      text: "KPI : compacts. Visuel héros : ~40–50 % de la largeur utile. Secondaires : plus petits, alignés."
    },
    {
      title: "Grille et marges",
      text: "Alignez les bords. Espacement régulier (8–16 px). Évitez les chevauchements et les « trous » aléatoires."
    },
    {
      title: "Couleur avec intention",
      text: "1 couleur primaire + neutres. Réservez le rouge/ambre aux alertes. Pas d’arc-en-ciel décoratif."
    },
    {
      title: "Titres qui affirment",
      text: "Préférez « Kinshasa concentre 43 % du CA » à « Graphique 1 »."
    },
    {
      title: "Cohérence des formats",
      text: "Mêmes unités (CDF), mêmes arrondis, même style de légende sur toute la page."
    },
    {
      title: "Interactivité utile",
      text: "2–4 segments max en tête. Chaque filtre doit servir une question réelle."
    }
  ],
  modules: [
    {
      id: "m1",
      title: "Penser dashboard avant l’outil",
      track: "fondations",
      level: "Fondations",
      image: "assets/illu-logique.jpg",
      summary: "Utilisateur, décision, questions — puis Power BI.",
      lessons: [
        {
          id: "m1-l1",
          title: "À qui s’adresse le dashboard ?",
          goal: "Distinguer exécutif, opérationnel et analytique.",
          image: "assets/illu-analyste.jpg",
          caption: "Le public dicte la densité et le design.",
          voir: {
            paragraphs: [
              "Un coordonnateur veut 4 KPI et 1 message. Un analyste veut filtres et tableau. Un même fichier peut avoir plusieurs pages.",
              "Power BI est l’outil ; le design commence sur papier (zones)."
            ],
            analogy: {
              title: "Analogie du tableau de bord voiture",
              text: "Le conducteur voit vitesse et essence, pas le détail de chaque piston. Placez l’essentiel devant."
            }
          },
          comprendre: {
            paragraphs: ["Trois profils :"],
            bullets: [
              "Exécutif : peu de KPI, grand visuel, action",
              "Opérationnel : suivi fréquent, alertes, filtres période",
              "Analytique : exploration, tableaux, beaucoup d’interactions"
            ],
            code: {
              label: "brief.txt",
              lines: "Public : coordonnateur\nDécision : où prioriser l’appui logistique ?\nQuestions : total CA, top ville, top produit, alerte qualité"
            },
            annotation: "Sans brief, le dashboard devient un dépôt de graphiques."
          },
          pratiquer: {
            prompt: "Pour un dashboard ventes santé destiné à un coordonnateur, listez public, 1 décision, 3 questions.",
            placeholder: "Public : …\nDécision : …\nQuestions : …",
            hint: "Soyez concrets",
            checkType: "keywords",
            keywords: ["public", "décision", "question"],
            success: "Brief clair : on peut designer.",
            fail: "Mentionnez public, décision et question(s)."
          },
          verifier: {
            question: "Un dashboard exécutif doit surtout…",
            options: ["Montrer toutes les colonnes brutes", "Répondre vite avec peu d’éléments clés", "Éviter les titres", "Maximiser les couleurs"],
            answer: 1,
            explain: "Rapidité + clarté."
          },
          retenir: [
            "Public → densité.",
            "Décision avant visuels.",
            "Une page, une intention."
          ]
        },
        {
          id: "m1-l2",
          title: "Du CSV à Power BI Desktop",
          goal: "Connaître le flux d’import minimal.",
          image: "assets/illu-donnees.jpg",
          caption: "data/ventes.csv et clients.csv → modèle simple.",
          voir: {
            paragraphs: [
              "Dans Power BI Desktop : Obtenir des données → Texte/CSV → ventes et clients.",
              "Reliez clients[client_id] à ventes[client_id] (comme un JOIN SQL)."
            ],
            analogy: {
              title: "Analogie des deux registres",
              text: "Sans relation, Impossible d’analyser les montants par type_client proprement."
            }
          },
          comprendre: {
            paragraphs: ["Checklist import :"],
            bullets: [
              "Types de colonnes corrects (nombres, dates)",
              "En-têtes à la première ligne",
              "Relation 1-* entre clients et ventes",
              "Mesure simple : Total Montant = SUM(ventes[montant_cdf])"
            ],
            code: {
              label: "DAX",
              lines: "Total Montant = SUM(ventes[montant_cdf])\nNb Ventes = COUNTROWS(ventes)"
            },
            annotation: "Les mesures alimenteront cartes et graphiques."
          },
          pratiquer: {
            prompt: "Écrivez les 4 étapes d’import + relation ventes/clients.",
            placeholder: "1) …\n2) …\n3) …\n4) …",
            hint: "CSV, modèle, relation, mesure",
            checkType: "minLines",
            minLines: 4,
            success: "Flux solide.",
            fail: "4 étapes minimum."
          },
          verifier: {
            question: "La relation ventes–clients sert à…",
            options: ["Décorer", "Filtrer/agréger correctement entre tables", "Remplacer les CSV", "Supprimer les KPI"],
            answer: 1,
            explain: "Comme une jointure maîtrisée."
          },
          retenir: [
            "Importer proprement.",
            "Modéliser la clé.",
            "Créer des mesures."
          ]
        }
      ]
    },
    {
      id: "m2",
      title: "Architecture de page",
      track: "design",
      level: "Design pro",
      image: "assets/illu-analyste.jpg",
      summary: "Zones, grille, lecture en Z, tailles.",
      lessons: [
        {
          id: "m2-l1",
          title: "Disposer les zones comme un pro",
          goal: "Dessiner une architecture KPI → héros → détail.",
          image: "assets/illu-logique.jpg",
          caption: "La structure avant les couleurs.",
          voir: {
            paragraphs: [
              "Zone A (haut) : titre + 3–4 cartes KPI + segments légers.",
              "Zone B (centre) : visuel principal (comparaison ou tendance).",
              "Zone C (bas/côté) : secondaire ou tableau de contrôle."
            ],
            analogy: {
              title: "Analogie de la une de journal",
              text: "Gros titre et image principale d’abord ; détails en bas. Un dashboard suit la même hiérarchie."
            }
          },
          comprendre: {
            paragraphs: ["Règles de taille :"],
            bullets: [
              "Cartes KPI : hauteur limitée, largeur égale, alignées",
              "Visuel héros : le plus grand bloc",
              "Éviter un grand vide au centre et des mini-graphiques éparpillés",
              "Marges régulières entre tuiles"
            ],
            code: {
              label: "wireframe",
              lines: "[ KPI ][ KPI ][ KPI ][ KPI ]\n[     VISUEL HEROS      ][ SIDE ]\n[        DETAIL / TABLE         ]"
            },
            annotation: "Ouvrez le Studio dashboard pour comparer Exécutif vs Chaos."
          },
          pratiquer: {
            prompt: "Décrivez votre architecture en 3 zones (haut/centre/bas) pour le dashboard ventes.",
            placeholder: "Haut : …\nCentre : …\nBas : …",
            hint: "KPI / héros / détail",
            checkType: "keywords",
            keywords: ["haut", "centre", "bas"],
            success: "Architecture lisible.",
            fail: "Structurez en Haut / Centre / Bas."
          },
          verifier: {
            question: "Où placer les KPI principaux ?",
            options: ["Tout en bas en petit", "En haut, visibles immédiatement", "Derrière un filtre caché", "Uniquement en secteurs"],
            answer: 1,
            explain: "Hiérarchie : haut = prioritaire."
          },
          retenir: [
            "Zones A-B-C.",
            "Héros au centre.",
            "Grille et alignement."
          ]
        },
        {
          id: "m2-l2",
          title: "Hiérarchie, densité, cohérence",
          goal: "Évaluer un design comme un reviewer pro.",
          image: "assets/illu-conditions.jpg",
          caption: "Quatre critères : hiérarchie, clarté, densité, cohérence.",
          voir: {
            paragraphs: [
              "Hiérarchie : sait-on quoi regarder en 3 secondes ?",
              "Clarté : titres, unités, légendes. Densité : trop plein ? Cohérence : mêmes formats et couleurs."
            ],
            analogy: {
              title: "Analogie du briefing",
              text: "Si le décideur demande « c’est où le chiffre important ? », le design a échoué."
            }
          },
          comprendre: {
            paragraphs: ["Signaux d’un mauvais design :"],
            bullets: [
              "Tout a la même taille",
              "5 camemberts + 3 cartes sans ordre",
              "Couleurs différentes pour le même KPI d’une page à l’autre",
              "Titres techniques (« Sum of montant_cdf »)"
            ],
            code: {
              label: "score",
              lines: "Studio → layouts Exécutif / Analytique / Chaos\nObservez les scores de design"
            },
            annotation: "Apprenez à critiquer avant d’embellir."
          },
          pratiquer: {
            prompt: "Citez 3 défauts typiques d’un dashboard « chaos ».",
            placeholder: "1) …\n2) …\n3) …",
            hint: "taille, ordre, couleur…",
            checkType: "minLines",
            minLines: 3,
            success: "Bon œil critique.",
            fail: "3 défauts minimum."
          },
          verifier: {
            question: "La cohérence de design porte surtout sur…",
            options: ["Changer de police à chaque visuel", "Formats, couleurs et styles stables", "Maximiser les 3D", "Cacher les unités"],
            answer: 1,
            explain: "Stabilité = professionnalisme."
          },
          retenir: [
            "3 secondes pour le message.",
            "Densité maîtrisée.",
            "Cohérence = crédibilité."
          ]
        }
      ]
    },
    {
      id: "m3",
      title: "Choisir le bon visuel",
      track: "design",
      level: "Design pro",
      image: "assets/illu-donnees.jpg",
      summary: "Type de données → type d’élément.",
      lessons: [
        {
          id: "m3-l1",
          title: "Matching question ↔ visuel",
          goal: "Associer comparaison, tendance, part, détail au bon graphique.",
          image: "assets/illu-analyste.jpg",
          caption: "Le mauvais visuel rend un bon chiffre illisible.",
          voir: {
            paragraphs: [
              "Comparer des villes → barres. Évolution mensuelle → courbe. Un total → carte. Parts (peu nombreuses) → anneau avec prudence. Liste précise → tableau."
            ],
            analogy: {
              title: "Analogie des outils",
              text: "On ne mesure pas une fièvre avec une règle. Chaque question a son instrument."
            }
          },
          comprendre: {
            paragraphs: ["Mémo rapide :"],
            bullets: [
              "Catégories : barres/colonnes",
              "Temps : lignes",
              "KPI unique : carte",
              "Composition simple : secteurs (≤5)",
              "Détail / contrôle : tableau/matrice",
              "Filtres page : segments"
            ],
            code: {
              label: "anti-patterns",
              lines: "À éviter :\n- Courbe pour des villes\n- Camembert à 12 parts\n- Tableau géant comme seul héros exécutif"
            },
            annotation: "Page « Choix des visuels » pour vous entraîner."
          },
          pratiquer: {
            prompt: "Pour « CA par ville », « évolution mensuelle », « total CA », quel visuel chacun ?",
            placeholder: "Ville : …\nMois : …\nTotal : …",
            hint: "barres / courbe / carte",
            checkType: "keywords",
            keywords: ["barre", "courbe", "carte"],
            success: "Matching correct.",
            fail: "Mentionnez barres, courbe et carte."
          },
          verifier: {
            question: "Pour une évolution dans le temps, privilégiez…",
            options: ["Un camembert", "Une courbe", "Un nuage de mots", "Une carte sans contexte"],
            answer: 1,
            explain: "Le temps aime les lignes."
          },
          retenir: [
            "Question → visuel.",
            "Barres pour comparer.",
            "Cartes pour les KPI."
          ]
        }
      ]
    },
    {
      id: "m4",
      title: "Style et finitions pro",
      track: "design",
      level: "Design pro",
      image: "assets/illu-conditions.jpg",
      summary: "Couleurs, titres, alignement, accessibilité.",
      lessons: [
        {
          id: "m4-l1",
          title: "Style sobre, message fort",
          goal: "Appliquer une charte simple et lisible.",
          image: "assets/illu-variables.jpg",
          caption: "Le style sert le contenu, jamais l’inverse.",
          voir: {
            paragraphs: [
              "Fond neutre, cartes blanches, une couleur d’accent pour les barres principales.",
              "Titres en langage métier. Unités visibles. Contraste suffisant."
            ],
            analogy: {
              title: "Analogie du costume",
              text: "Un costume bien coupé est simple. Trop d’accessoires détournent du visage — ici, du KPI."
            }
          },
          comprendre: {
            paragraphs: ["Checklist finitions :"],
            bullets: [
              "Aligner tous les bords sur une grille",
              "Même hauteur pour les cartes KPI",
              "Pas d’effets 3D / dégradés agressifs",
              "Légende lisible, axes clairs",
              "Daltonisme : ne pas coder l’info par la seule couleur rouge/vert"
            ],
            code: {
              label: "titres",
              lines: "Mauvais : Sum of montant_cdf by ville\nMieux : CA par ville (CDF)\nEncore mieux : Kinshasa domine le CA par ville"
            },
            annotation: "Le titre peut déjà porter le constat."
          },
          pratiquer: {
            prompt: "Réécrivez un titre pro pour un graphique CA par produit.",
            placeholder: "…",
            hint: "constat ou libellé clair + unité",
            checkType: "minLines",
            minLines: 1,
            success: "Titre orienté lecteur.",
            fail: "Proposez au moins un titre."
          },
          verifier: {
            question: "Un style pro privilégie…",
            options: ["Le maximum d’effets", "Sobriété, alignement, contraste", "Des polices différentes partout", "Des camemberts 3D"],
            answer: 1,
            explain: "Clarté > spectacle."
          },
          retenir: [
            "Charte simple.",
            "Titres métier.",
            "Alignement strict."
          ]
        }
      ]
    },
    {
      id: "m5",
      title: "Interactions et navigation",
      track: "fondations",
      level: "Power BI",
      image: "assets/illu-logique.jpg",
      summary: "Segments, filtres, pages, drill-through.",
      lessons: [
        {
          id: "m5-l1",
          title: "Filtres utiles, pas décoratifs",
          goal: "Limiter et placer les segments intelligemment.",
          image: "assets/illu-donnees.jpg",
          caption: "Chaque filtre coûte de l’attention.",
          voir: {
            paragraphs: [
              "Placez 2–4 segments en haut ou à gauche : période, ville, catégorie.",
              "Évitez de dupliquer le même filtre partout. Utilisez des pages séparées si les questions diffèrent."
            ],
            analogy: {
              title: "Analogie du tableau de bord avion",
              text: "Trop de boutons devant le pilote = risque d’erreur. Gardez les commandes essentielles."
            }
          },
          comprendre: {
            paragraphs: ["Bonnes pratiques :"],
            bullets: [
              "Segments alignés, hauteur homogène",
              "Valeurs par défaut sensées (année en cours…)",
              "Synchroniser les segments entre pages si besoin",
              "Prévoir une page détail plutôt que tout empiler"
            ],
            code: {
              label: "nav",
              lines: "Page 1 : Pilotage (exécutif)\nPage 2 : Détail villes/produits\nPage 3 : Qualité des données"
            },
            annotation: "La navigation fait partie du design."
          },
          pratiquer: {
            prompt: "Proposez 3 segments max pour le dashboard ventes et justifiez chacun en 1 ligne.",
            placeholder: "1) …\n2) …\n3) …",
            hint: "ville, période, catégorie…",
            checkType: "minLines",
            minLines: 3,
            success: "Filtres intentionnels.",
            fail: "3 segments justifiés."
          },
          verifier: {
            question: "Trop de segments en tête de page…",
            options: ["Améliore toujours la clarté", "Sature l’attention et casse la hiérarchie", "Remplace les KPI", "Est obligatoire"],
            answer: 1,
            explain: "L’interactivité a un coût cognitif."
          },
          retenir: [
            "Peu de filtres.",
            "Placement stable.",
            "Pages selon l’intention."
          ]
        }
      ]
    },
    {
      id: "m7",
      title: "Modèle & DAX opérationnel",
      track: "design",
      level: "Maîtrise",
      image: "assets/illu-conditions.jpg",
      summary: "Étoile, mesures vs colonnes, CALCULATE, time intelligence minimale.",
      lessons: [
        {
          id: "m7-l1",
          title: "Modèle en étoile (faits + dimensions)",
          goal: "Relier correctement ventes (fait) et clients (dimension).",
          image: "assets/illu-donnees.jpg",
          caption: "Sans modèle propre, les visuels mentent.",
          voir: {
            paragraphs: [
              "Table de faits = événements (ventes : montant, quantité, clés).",
              "Dimensions = contextes (clients, produits, dates). Relation : clients[client_id] → ventes[client_id] (1→*)."
            ],
            analogy: {
              title: "Analogie du registre et des fiches patients",
              text: "Le journal des actes (faits) pointe vers la fiche patient (dimension) — on ne recopie pas toute la fiche à chaque ligne."
            }
          },
          comprendre: {
            paragraphs: ["Checklist modèle junior :"],
            bullets: [
              "1 table faits (ventes) + dimensions utiles",
              "Clés propres (pas de doublons côté 1)",
              "Cardinalité 1→*",
              "Filtre qui coule dimension → fait",
              "Éviter les tables « fourre-tout » non reliées"
            ],
            code: {
              label: "modele",
              lines: "clients (1) ──< ventes (*)\n[option] Date (1) ──< ventes (*)\nMesures sur ventes, attributs sur dimensions"
            },
            annotation: "Dans PBI Desktop : Vue modèle après import CSV."
          },
          pratiquer: {
            prompt: "En 4 lignes : table fait, dimension, clé de relation, 1 erreur de modèle à éviter.",
            placeholder: "1) Fait : …\n2) Dimension : …\n3) Clé : …\n4) Erreur : …",
            hint: "fait / dimension",
            checkType: "keywords",
            keywords: ["fait"],
            success: "Modèle mental en étoile posé.",
            fail: "Nommez la table de faits."
          },
          verifier: {
            question: "Dans un modèle en étoile, les ventes sont surtout…",
            options: ["Une dimension géographique", "La table de faits", "Un thème de couleur", "Un segment décoratif"],
            answer: 1,
            explain: "Faits = transactions."
          },
          retenir: [
            "Faits + dimensions.",
            "Relation 1→*.",
            "Clés propres."
          ]
        },
        {
          id: "m7-l2",
          title: "Mesure vs colonne · CALCULATE",
          goal: "Écrire des mesures SUM / COUNTROWS et comprendre CALCULATE.",
          image: "assets/illu-variables.jpg",
          caption: "La mesure réagit aux filtres ; la colonne est figée par ligne.",
          voir: {
            paragraphs: [
              "Mesure : Total CA = SUM(ventes[montant_cdf]) — se recalcule selon segments.",
              "CALCULATE(expression, filtres…) change le contexte : ex. CA Kinshasa sans changer le modèle."
            ],
            analogy: {
              title: "Analogie de la balance et de l’étiquette",
              text: "L’étiquette collée sur chaque sac (colonne) ne change pas ; la balance (mesure) donne un poids selon les sacs filtrés."
            }
          },
          comprendre: {
            paragraphs: ["Minimum DAX junior :"],
            bullets: [
              "Total CA = SUM(ventes[montant_cdf])",
              "Nb ventes = COUNTROWS(ventes)",
              "CALCULATE(Total CA, clients[ville]=\"Kinshasa\") — idée",
              "Ne pas tout mettre en colonnes calculées « pour aller vite »",
              "Nommer les mesures en langage métier"
            ],
            code: {
              label: "dax",
              lines: "Total CA = SUM(ventes[montant_cdf])\nNb lignes = COUNTROWS(ventes)\nCA Kinshasa =\nCALCULATE([Total CA], ventes[ville]=\"Kinshasa\")"
            },
            annotation: "Reproduisez 2 mesures dans Power BI Desktop."
          },
          pratiquer: {
            prompt: "Écrivez 3 lignes DAX (Total CA, Nb lignes, 1 CALCULATE commenté en français).",
            placeholder: "Total CA = …\nNb = …\nCALCULATE : …",
            hint: "SUM / CALCULATE",
            checkType: "keywords",
            keywords: ["sum"],
            success: "Socle DAX opérationnel.",
            fail: "Incluez SUM (mesure de total)."
          },
          verifier: {
            question: "CALCULATE sert surtout à…",
            options: ["Changer le thème du rapport", "Modifier le contexte de filtre d’un calcul", "Importer un CSV", "Aligner les pixels"],
            answer: 1,
            explain: "Contexte de filtre."
          },
          retenir: [
            "Mesure > colonne pour les agrégats.",
            "SUM / COUNTROWS.",
            "CALCULATE = contexte."
          ]
        },
        {
          id: "m7-l3",
          title: "Time intelligence minimale",
          goal: "Utiliser une logique mois / période pour un KPI temporel.",
          image: "assets/illu-analyste.jpg",
          caption: "Sans table Date, le temps reste un texte fragile.",
          voir: {
            paragraphs: [
              "Idéal : table Date reliée à ventes[date], puis comparaison mois courant vs précédent.",
              "MVP junior : au minimum segmenter par mois et une mesure de total ; viser ensuite PREVIOUSMONTH / DATEADD quand le modèle Date existe."
            ],
            analogy: {
              title: "Analogie du calendrier mural",
              text: "On ne compare pas « mardi » écrit en vrac : on pointe une case du calendrier (table Date)."
            }
          },
          comprendre: {
            paragraphs: ["Niveau maîtrise junior :"],
            bullets: [
              "Créer ou marquer une colonne Mois (AAAA-MM)",
              "Courbe : axe = mois, valeur = Total CA",
              "Comparer deux mois dans le récit (absolu + %)",
              "Objectif suivant : table Date + time intelligence native",
              "Ne pas inventer un YTD sans Dates correctes"
            ],
            code: {
              label: "temps",
              lines: "Axe : Mois\nMesure : [Total CA]\nRécit : mars vs février = … %\n(Plus tard) CALCULATE([Total CA], PREVIOUSMONTH(Date[Date]))"
            },
            annotation: "Studio → layout Transfert : brief logistique sur une période."
          },
          pratiquer: {
            prompt: "En 4 lignes : comment vous construisez une courbe mensuelle + 1 comparaison février/mars + 1 limite.",
            placeholder: "1) …\n2) …\n3) …\n4) …",
            hint: "mois / total",
            checkType: "keywords",
            keywords: ["mois"],
            success: "Temps sous contrôle.",
            fail: "Mentionnez l’axe mois."
          },
          verifier: {
            question: "Pour une évolution mensuelle fiable, on privilégie…",
            options: ["12 camemberts", "Courbe sur un axe temps cohérent", "Une image décorative", "Supprimer les dates"],
            answer: 1,
            explain: "Temps → courbe."
          },
          retenir: [
            "Axe temps explicite.",
            "Comparer deux périodes.",
            "Table Date = niveau suivant."
          ]
        }
      ]
    },
    {
      id: "m6",
      title: "Projet dashboard ventes",
      track: "design",
      level: "Projet",
      image: "assets/hero-atelier.jpg",
      summary: "Brief → modèle → wireframe → visuels → critique → Power BI.",
      lessons: [
        {
          id: "m6-l1",
          title: "Livrable complet",
          goal: "Concevoir puis planifier la réalisation dans Power BI Desktop (niveau junior).",
          image: "assets/illu-analyste.jpg",
          caption: "Design + modèle d’abord, clic ensuite.",
          voir: {
            paragraphs: [
              "Mission : dashboard exécutif ventes santé (mêmes CSV) avec modèle relié et 2 mesures DAX.",
              "Livrables : brief, modèle (fait/dimension), wireframe, 4 KPI, héros, limite qualité, 3 reco, justifications."
            ],
            analogy: {
              title: "Analogie du plan de bâtiment",
              text: "On ne pose pas les fenêtres avant les murs. Wireframe → modèle → visuels → style."
            }
          },
          comprendre: {
            paragraphs: ["Enchaînement recommandé :"],
            bullets: [
              "Studio : Exécutif puis Transfert",
              "Modèle ventes–clients + 2 mesures",
              "Matching visuels",
              "Construire zones dans PBI",
              "Revue design + carnet D"
            ],
            code: {
              label: "reco",
              lines: "1. Prioriser la ville leader\n2. Investiguer les faibles volumes\n3. Suivre la qualité (quantités manquantes)"
            },
            annotation: "Quiz bilan seuil 80 %. Carnet D = épreuve transfert."
          },
          pratiquer: {
            prompt: "Plan de livraison en 7 lignes (brief → modèle → wireframe → mesures → héros → PBI → revue).",
            placeholder: "1) …\n2) …\n3) …\n4) …\n5) …\n6) …\n7) …",
            hint: "une action par ligne",
            checkType: "minLines",
            minLines: 7,
            success: "Plan junior complet. Carnet D puis quiz bilan.",
            fail: "7 étapes minimum."
          },
          verifier: {
            question: "Dans un projet dashboard pro, on commence par…",
            options: ["Les couleurs 3D", "Brief + architecture", "Importer 40 tables sans question", "Cacher les titres"],
            answer: 1,
            explain: "Intention et structure d’abord."
          },
          retenir: [
            "Design + modèle avant décoration.",
            "Mesures nommées.",
            "Finir par recommandations."
          ]
        }
      ]
    }
  ],
  carnet: {
    title: "Carnet — Power BI & design dashboard",
    subtitle: "Studio + Desktop + épreuve de maîtrise",
    sections: [
      {
        title: "A. Brief & architecture",
        exercises: [
          { id: "pA1", prompt: "Brief : public, décision, 3 questions." },
          { id: "pA2", prompt: "Dessinez un wireframe A4 (zones haut/centre/bas)." },
          { id: "pA3", prompt: "Listez 4 KPI et leur unité." },
          { id: "pA4", prompt: "Choisissez le visuel héros et justifiez." },
          { id: "pA5", prompt: "Notez 3 règles de grille/alignement à respecter." }
        ]
      },
      {
        title: "B. Design & Power BI",
        exercises: [
          { id: "pB1", prompt: "Studio : comparez Exécutif vs Chaos (scores)." },
          { id: "pB2", prompt: "Matching : 5 questions → 5 visuels." },
          { id: "pB3", prompt: "Importez ventes.csv + clients.csv ; reliez client_id." },
          { id: "pB4", prompt: "Créez mesures Total CA et Nb lignes + 4 cartes + 1 barre + 1 courbe." },
          { id: "pB5", prompt: "Ajoutez 3 segments max, alignés." },
          { id: "pB6", prompt: "Réécrivez tous les titres en langage métier." }
        ]
      },
      {
        title: "C. Revue pro",
        exercises: [
          { id: "pC1", prompt: "Auto-évaluez hiérarchie / clarté / densité / cohérence (0–10)." },
          { id: "pC2", prompt: "Corrigez le plus gros défaut de layout." },
          { id: "pC3", prompt: "Ajoutez 3 recommandations sous le dashboard." }
        ]
      },
      {
        title: "D. Épreuve de maîtrise (transfert)",
        exercises: [
          {
            id: "pD1",
            prompt:
              "Studio layout Transfert : brief responsable logistique (pas exécutif ventes). Redessinez wireframe + 4 KPI adaptés sans copier le tutoriel ventes."
          },
          {
            id: "pD2",
            prompt: "Justifiez 3 choix : (1) visuel héros, (2) relation modèle, (3) une mesure DAX vs une colonne."
          },
          {
            id: "pD3",
            prompt:
              "Détectez 2 erreurs dans ce faux dashboard : « 12 camemberts, pas de relation clients, Total CA en colonne calculée figée, titres Graphique 1–12 »."
          },
          {
            id: "pD4",
            prompt: "Dans PBI Desktop : page transfert avec 2 mesures + 1 CALCULATE simple + courbe mensuelle. Joindre capture ou description zone par zone."
          },
          {
            id: "pD5",
            prompt: "Auto-éval (0–2) : transfert · justification · détection erreurs · quiz ≥80 %."
          }
        ]
      }
    ]
  },
  bilan: {
    title: "Quiz bilan — Power BI & design dashboard",
    subtitle: "26 questions — design, modèle, DAX, maîtrise junior (seuil 80 %).",
    passScore: 80,
    questions: [
      { id: "b1", theme: "brief", themeLabel: "Brief", question: "Avant Power BI, on définit surtout…", options: ["La 3D", "Public et décision", "Le fond noir obligatoire", "Le nombre max de camemberts"], answer: 1, explain: "Intention d’abord." },
      { id: "b2", theme: "archi", themeLabel: "Architecture", question: "Les KPI principaux se placent…", options: ["En bas", "En haut", "Uniquement en infobulle", "Hors page"], answer: 1, explain: "Zone prioritaire." },
      { id: "b3", theme: "archi", themeLabel: "Architecture", question: "Le visuel héros doit être…", options: ["Le plus petit", "Le plus grand / central", "Invisible", "Toujours un secteur"], answer: 1, explain: "Hiérarchie de taille." },
      { id: "b4", theme: "visuel", themeLabel: "Visuels", question: "Comparer des villes →", options: ["Courbe", "Barres", "Carte seule", "Nuage"], answer: 1, explain: "Catégories." },
      { id: "b5", theme: "visuel", themeLabel: "Visuels", question: "Évolution mensuelle →", options: ["Courbe", "Secteurs 12 parts", "Carte KPI seule", "Matrice obligatoire"], answer: 0, explain: "Temps." },
      { id: "b6", theme: "visuel", themeLabel: "Visuels", question: "Un total unique →", options: ["Carte KPI", "5 camemberts", "Nuage 3D", "Carte géographique obligatoire"], answer: 0, explain: "Carte." },
      { id: "b7", theme: "style", themeLabel: "Style", question: "Un style pro privilégie…", options: ["Arc-en-ciel", "Sobriété et alignement", "Polices multiples", "Effets 3D"], answer: 1, explain: "Clarté." },
      { id: "b8", theme: "style", themeLabel: "Style", question: "Un bon titre de visuel…", options: ["Dit Graphique 1", "Porte un libellé/constat clair", "Cache l’unité", "Est en latin"], answer: 1, explain: "Langage métier." },
      { id: "b9", theme: "filtre", themeLabel: "Filtres", question: "Trop de segments…", options: ["Sature l’attention", "Est toujours mieux", "Remplace le modèle", "Supprime les KPI"], answer: 0, explain: "Coût cognitif." },
      { id: "b10", theme: "modele", themeLabel: "Modèle", question: "Relier ventes et clients permet…", options: ["D’agréger par type_client correctement", "D’éviter les CSV", "De supprimer DAX", "D’interdire les barres"], answer: 0, explain: "Relation." },
      { id: "b11", theme: "archi", themeLabel: "Architecture", question: "Lecture naturelle commence souvent…", options: ["En bas à droite", "En haut à gauche", "Au hasard", "Uniquement au centre"], answer: 1, explain: "Z/F pattern." },
      { id: "b12", theme: "visuel", themeLabel: "Visuels", question: "Camembert à 12 parts…", options: ["Idéal", "À éviter", "Obligatoire exécutif", "Remplace les segments"], answer: 1, explain: "Illisible." },
      { id: "b13", theme: "style", themeLabel: "Style", question: "La cohérence concerne…", options: ["Formats et couleurs stables", "Changer de thème par visuel", "Masquer n", "Maximiser les images"], answer: 0, explain: "Stabilité." },
      { id: "b14", theme: "densite", themeLabel: "Densité", question: "Sur une page exécutive, mieux vaut…", options: ["20 visuels", "5–8 éléments bien hiérarchisés", "Aucun titre", "Que des tableaux"], answer: 1, explain: "Moins mais juste." },
      { id: "b15", theme: "modele", themeLabel: "Modèle", question: "Une mesure DAX sert à…", options: ["Décorer", "Calculer un indicateur réutilisable", "Remplacer le CSV", "Aligner les pixels"], answer: 1, explain: "SUM, etc." },
      { id: "b16", theme: "brief", themeLabel: "Brief", question: "Exécutif vs analytique diffère surtout par…", options: ["La densité et le niveau de détail", "Le système d’exploitation", "L’interdiction des barres", "Le format CSV"], answer: 0, explain: "Public." },
      { id: "b17", theme: "access", themeLabel: "Accessibilité", question: "Coder une alerte seulement en rouge/vert…", options: ["Est parfait pour tous", "Pose problème (contraste/daltonisme)", "Remplace les titres", "Est imposé par Power BI"], answer: 1, explain: "Prévoir forme/texte aussi." },
      { id: "b18", theme: "projet", themeLabel: "Projet", question: "Ordre pro recommandé…", options: ["Couleurs → données → brief", "Brief → wireframe → données/visuels → revue", "Chaos → plus de chaos", "Publier sans titres"], answer: 1, explain: "Structure d’abord." },
      { id: "b19", theme: "filtre", themeLabel: "Filtres", question: "Les segments se placent idéalement…", options: ["De façon aléatoire", "En bandeau haut ou panneau gauche", "Derrière chaque barre", "Uniquement en bas tout petit"], answer: 1, explain: "Zone attendue." },
      { id: "b20", theme: "projet", themeLabel: "Projet", question: "Un dashboard abouti se termine par…", options: ["Aucun message", "Des recommandations / actions", "Un fond animé", "La suppression des KPI"], answer: 1, explain: "Décision." },
      { id: "b21", theme: "modele", themeLabel: "Modèle", question: "Dans un modèle en étoile, ventes est…", options: ["Toujours une dimension Date", "La table de faits", "Un thème", "Un slicer"], answer: 1, explain: "Faits." },
      { id: "b22", theme: "dax", themeLabel: "DAX", question: "Mesure vs colonne calculée…", options: ["Identiques toujours", "La mesure s’agrège selon le filtre ; la colonne est par ligne", "La colonne remplace CALCULATE", "Interdit SUM"], answer: 1, explain: "Contexte." },
      { id: "b23", theme: "dax", themeLabel: "DAX", question: "CALCULATE…", options: ["Change le thème", "Modifie le contexte de filtre", "Importe CSV", "Supprime le modèle"], answer: 1, explain: "Filtres." },
      { id: "b24", theme: "temps", themeLabel: "Temps", question: "Évolution mensuelle fiable…", options: ["12 secteurs", "Courbe sur axe temps cohérent", "Sans dates", "Uniquement une image"], answer: 1, explain: "Courbe." },
      { id: "b25", theme: "maitrise", themeLabel: "Maîtrise", question: "L’épreuve transfert change surtout…", options: ["Le système d’exploitation", "Le public / brief (ex. logistique) à reconcevoir", "L’interdiction des mesures", "Le format PDF"], answer: 1, explain: "Nouveau brief." },
      { id: "b26", theme: "maitrise", themeLabel: "Maîtrise", question: "Seuil quiz bilan maîtrise junior…", options: ["50 %", "70 %", "80 %", "0 %"], answer: 2, explain: "80 %." }
    ]
  },
  visualQuiz: [
    {
      id: "vq1",
      question: "Vous voulez comparer le CA de 5 villes.",
      answer: "bar",
      explain: "Barres : comparaison catégorielle claire."
    },
    {
      id: "vq2",
      question: "Vous voulez montrer l’évolution du CA sur 3 mois.",
      answer: "line",
      explain: "Courbe pour le temps."
    },
    {
      id: "vq3",
      question: "Vous voulez afficher le total CA en gros.",
      answer: "card",
      explain: "Carte KPI."
    },
    {
      id: "vq4",
      question: "Vous voulez la liste détaillée pour contrôle.",
      answer: "table",
      explain: "Tableau / matrice."
    },
    {
      id: "vq5",
      question: "Vous voulez filtrer interactivement par produit.",
      answer: "slicer",
      explain: "Segment."
    }
  ]
};
