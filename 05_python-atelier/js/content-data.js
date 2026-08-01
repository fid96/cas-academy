/* Python Atelier — parcours Data Analyst (cœur du métier) */

(function () {
  const dataModules = [
    {
      id: "m7",
      title: "Le métier de Data Analyst",
      track: "data-analyst",
      level: "Data Analyst",
      image: "assets/illu-analyste.jpg",
      summary: "Comprendre le rôle, le flux de travail et la posture professionnelle de l’analyste.",
      lessons: [
        {
          id: "m7-l1",
          title: "Qui est le Data Analyst ?",
          goal: "Définir le métier : transformer des données en décisions utiles.",
          image: "assets/illu-analyste.jpg",
          caption: "L’analyste relie le terrain, les chiffres et la décision.",
          voir: {
            paragraphs: [
              "Un Data Analyst digne de ce nom ne « joue » pas avec des graphiques. Il répond à des questions métier avec des preuves chiffrées, compréhensibles et honnêtes.",
              "Exemples de questions : Quelles villes consomment le plus de tests ? Où les données sont-elles incomplètes ? Quel produit tire le chiffre d’affaires ?"
            ],
            analogy: {
              title: "Analogie du médecin de données",
              text: "Le médecin observe, mesure, interprète, puis recommande. L’analyste fait de même avec des tableaux."
            }
          },
          comprendre: {
            paragraphs: [
              "Votre parcours Data Analyst Python couvre le cycle complet :"
            ],
            bullets: [
              "Comprendre la question métier",
              "Obtenir les fichiers (CSV, Excel)",
              "Explorer et nettoyer",
              "Calculer des indicateurs (KPI)",
              "Visualiser et conclure clairement"
            ],
            code: {
              label: "mental_model.py",
              lines: "# Ce n'est pas encore du code « magique ».\n# C'est le contrat de l'analyste :\nquestion = \"Quelles villes vendent le plus ?\"\npreuve = \"total des montants par ville\"\nconclusion = \"recommander un réapprovisionnement\""
            },
            annotation: "Sans question claire, le plus beau code reste inutile."
          },
          pratiquer: {
            prompt: "Écrivez 3 questions qu’un Data Analyst pourrait poser sur des ventes de produits de santé (ville, produit, montant).",
            placeholder: "1. ...\n2. ...\n3. ...",
            checkType: "minLines",
            minLines: 3,
            success: "Très bien. Vous pensez déjà comme un analyste, pas comme un simple utilisateur d’outil.",
            fail: "Proposez au moins 3 questions numérotées.",
            hint: "Pensez : comparaison, total, tendance, qualité des données…"
          },
          verifier: {
            question: "Quelle phrase décrit le mieux le Data Analyst ?",
            options: [
              "Quelqu’un qui installe uniquement des logiciels",
              "Quelqu’un qui transforme des données en réponses utiles à la décision",
              "Quelqu’un qui refuse les tableaux Excel",
              "Quelqu’un qui mémorise toutes les fonctions pandas par cœur sans objectif"
            ],
            answer: 1,
            explainOk: "Exact : la décision utile est le nord de l’analyste.",
            explainKo: "Le métier vise des réponses actionnables, pas l’outil pour l’outil."
          },
          retenir: [
            "Data Analyst = preuve au service d’une décision.",
            "La question précède le code.",
            "Ce parcours forme le métier complet, pas une intro décorative."
          ]
        },
        {
          id: "m7-l2",
          title: "Le flux de travail professionnel",
          goal: "Mémoriser le pipeline : Question → Données → Propreté → Analyse → Communication.",
          image: "assets/illu-donnees.jpg",
          caption: "Un bon analyste suit un ordre — pour ne rien oublier.",
          voir: {
            paragraphs: [
              "Les débutants ouvrent pandas trop tôt. Les professionnels commencent par cadrer : quelle décision ? quelles données ? quelle qualité minimale ?"
            ],
            analogy: {
              title: "Analogie de la cuisine",
              text: "On ne cuisine pas avant d’avoir lavé les légumes. Nettoyer les données, c’est l’hygiène de l’analyse."
            }
          },
          comprendre: {
            paragraphs: ["Retenez ce pipeline (vous le revisitez dans chaque module) :"],
            bullets: [
              "1. Question métier & indicateurs",
              "2. Sources : CSV / Excel / bases",
              "3. Exploration (EDA) & qualité",
              "4. Transformation & calculs",
              "5. Visualisation & recommandation écrite"
            ],
            code: {
              label: "pipeline.py",
              lines: "etapes = [\n    \"question\",\n    \"import\",\n    \"explorer\",\n    \"nettoyer\",\n    \"analyser\",\n    \"visualiser\",\n    \"conclure\"\n]\nfor e in etapes:\n    print(\"→\", e)"
            },
            annotation: "Si une étape saute, la conclusion devient fragile."
          },
          pratiquer: {
            prompt: "Réécrivez le pipeline en 7 mots-clés (un par ligne), dans le bon ordre.",
            placeholder: "question\nimport\n...",
            checkType: "keywords",
            keywords: ["question", "nettoyer", "conclure"],
            success: "Parfait. Ce fil conducteur vous servira jusqu’au projet final.",
            fail: "Incluez au minimum : question, nettoyer, conclure.",
            hint: "Reportez-vous à la liste des 7 étapes ci-dessus."
          },
          verifier: {
            question: "Pourquoi nettoyer avant de conclure ?",
            options: [
              "Parce que c’est une tradition inutile",
              "Parce que des données sales produisent des conclusions trompeuses",
              "Parce que Python l’interdit techniquement",
              "Parce que les graphiques refusent les titres"
            ],
            answer: 1,
            explainOk: "Oui : qualité des données = crédibilité de l’analyste.",
            explainKo: "Des erreurs en entrée deviennent des erreurs en sortie — souvent invisibles."
          },
          retenir: [
            "Pipeline : question → import → explorer → nettoyer → analyser → visualiser → conclure.",
            "L’ordre protège contre les fausses certitudes.",
            "Prochaine étape : maîtriser CSV et Excel."
          ]
        }
      ]
    },
    {
      id: "m8",
      title: "Fichiers CSV et Excel",
      track: "data-analyst",
      level: "Data Analyst",
      image: "assets/illu-donnees.jpg",
      summary: "Travailler avec de vrais fichiers du dossier data/ : CSV, séparateurs, Excel.",
      lessons: [
        {
          id: "m8-l1",
          title: "Anatomie d’un fichier CSV",
          goal: "Lire un CSV comme un professionnel : en-têtes, lignes, séparateurs.",
          image: "assets/illu-donnees.jpg",
          caption: "CSV = tableau en texte. Simple, portable, partout.",
          voir: {
            paragraphs: [
              "Dans ce projet, ouvrez le fichier data/ventes.csv. La première ligne contient les noms de colonnes. Chaque ligne suivante est une vente.",
              "Attention : parfois le séparateur est une virgule ,, parfois un point-virgule ; (fréquent en Europe / Excel francophone)."
            ],
            analogy: {
              title: "Analogie du registre photocopié",
              text: "Le CSV est une photocopie texte du tableau. Pandas le reconvertit en vrai tableau calculable."
            }
          },
          comprendre: {
            paragraphs: [
              "Colonnes de ventes.csv : date, ville, produit, categorie, quantite, montant_cdf, client_id.",
              "Une ligne a volontairement une quantité manquante : pour apprendre le nettoyage plus tard."
            ],
            code: {
              label: "lire_csv.py",
              lines: "import pandas as pd\n\ndf = pd.read_csv(\"data/ventes.csv\")\nprint(df.head())\nprint(df.shape)          # (lignes, colonnes)\nprint(df.columns.tolist())"
            },
            annotation: "shape répond : combien de lignes et de colonnes ?",
            bullets: [
              "Toujours vérifier head() après import",
              "Vérifier les noms de colonnes",
              "Si tout est dans une seule colonne : mauvais séparateur"
            ]
          },
          pratiquer: {
            prompt: "Citez 4 noms de colonnes de ventes.csv (tels qu’écrits dans le fichier).",
            placeholder: "date, ville, ...",
            checkType: "keywords",
            keywords: ["date", "ville", "montant", "client"],
            success: "Oui. Connaître le dictionnaire des colonnes est un geste d’analyste.",
            fail: "Mentionnez au moins date, ville, montant et client.",
            hint: "Relisez la liste : date, ville, produit, categorie, quantite, montant_cdf, client_id."
          },
          verifier: {
            question: "Que contient en général la première ligne d’un CSV bien formé ?",
            options: [
              "Un dessin",
              "Les noms des colonnes (en-têtes)",
              "Uniquement des formules Excel",
              "Le mot-clé import"
            ],
            answer: 1,
            explainOk: "Les en-têtes nomment les variables.",
            explainKo: "La première ligne sert d’ordinaire d’en-tête."
          },
          retenir: [
            "CSV = tableau texte avec séparateur.",
            "Toujours inspecter head() et columns.",
            "Fichier d’entraînement : data/ventes.csv"
          ]
        },
        {
          id: "m8-l2",
          title: "Séparateurs et pièges d’import",
          goal: "Importer correctement un CSV à point-virgule.",
          image: "assets/illu-donnees.jpg",
          caption: "Un mauvais séparateur casse tout le tableau.",
          voir: {
            paragraphs: [
              "Ouvrez data/ventes_pointvirgule.csv. Les champs sont séparés par ;. Si vous lisez avec les réglages par défaut, pandas peut tout mettre dans une seule colonne."
            ],
            analogy: {
              title: "Analogie de la langue",
              text: "Lire un CSV avec le mauvais séparateur, c’est écouter une langue sans connaître la ponctuation."
            }
          },
          comprendre: {
            paragraphs: ["On précise le séparateur avec sep=\";\"."],
            code: {
              label: "separateur.py",
              lines: "import pandas as pd\n\n# Mauvais réflexe (souvent) :\n# pd.read_csv(\"data/ventes_pointvirgule.csv\")\n\n# Bon réflexe :\ndf = pd.read_csv(\"data/ventes_pointvirgule.csv\", sep=\";\")\nprint(df.head())\nprint(df.columns.tolist())"
            },
            annotation: "Si une seule colonne apparaît, pensez immédiatement à sep."
          },
          pratiquer: {
            prompt: "Écrivez la ligne pandas qui lit data/ventes_pointvirgule.csv avec sep=\";\".",
            placeholder: "df = pd.read_csv(\"data/ventes_pointvirgule.csv\", sep=\";\")",
            checkType: "regex",
            pattern: "read_csv\\s*\\(\\s*[\"']data/ventes_pointvirgule\\.csv[\"']\\s*,\\s*sep\\s*=\\s*[\"'];[\"']",
            success: "Excellent. Ce détail évite des journées perdues en entreprise.",
            fail: "Utilisez pd.read_csv(\"data/ventes_pointvirgule.csv\", sep=\";\")",
            hint: "Le paramètre s’appelle sep, la valeur est \";\"."
          },
          verifier: {
            question: "Symptôme classique d’un mauvais séparateur ?",
            options: [
              "Le fichier disparaît du disque",
              "Tout semble regroupé dans une seule colonne",
              "Python refuse d’installer pandas",
              "Les graphiques deviennent obligatoires"
            ],
            answer: 1,
            explainOk: "Oui : une seule colonne = séparateur à revoir.",
            explainKo: "Le tableau « collé » trahit presque toujours sep."
          },
          retenir: [
            "sep=\";\" pour beaucoup d’exports Excel FR.",
            "Contrôler columns après chaque import.",
            "L’import correct est déjà de l’analyse."
          ]
        },
        {
          id: "m8-l3",
          title: "Excel (.xlsx) avec pandas",
          goal: "Lire un classeur Excel et comprendre quand l’utiliser.",
          image: "assets/illu-analyste.jpg",
          caption: "Excel reste partout ; pandas le rend puissant.",
          voir: {
            paragraphs: [
              "Le fichier data/ventes_apercu.xlsx est un extrait Excel de vos ventes. En entreprise, on reçoit souvent des .xlsx. On les lit avec pd.read_excel(...)."
            ],
            analogy: {
              title: "Analogie du classeur",
              text: "Excel est le classeur du bureau. Pandas est l’atelier de précision où l’on usine les indicateurs."
            }
          },
          comprendre: {
            paragraphs: [
              "Il faut parfois installer openpyxl pour les .xlsx. Puis :"
            ],
            code: {
              label: "lire_excel.py",
              lines: "import pandas as pd\n\ndf = pd.read_excel(\"data/ventes_apercu.xlsx\")\nprint(df.head())\nprint(df.dtypes)\n\n# Export utile vers CSV propre :\ndf.to_csv(\"data/export_propre.csv\", index=False)"
            },
            annotation: "to_csv permet de standardiser un fichier Excel chaotique en CSV propre.",
            bullets: [
              "read_excel pour .xlsx",
              "read_csv pour .csv",
              "Préférer un CSV propre pour l’automatisation"
            ]
          },
          pratiquer: {
            prompt: "Écrivez la ligne qui lit data/ventes_apercu.xlsx avec read_excel.",
            placeholder: "df = pd.read_excel(\"data/ventes_apercu.xlsx\")",
            checkType: "regex",
            pattern: "read_excel\\s*\\(\\s*[\"']data/ventes_apercu\\.xlsx[\"']",
            success: "Parfait. CSV et Excel n’ont plus de secret pour l’entrée des données.",
            fail: "Utilisez pd.read_excel(\"data/ventes_apercu.xlsx\")",
            hint: "Le nom de fichier exact compte."
          },
          verifier: {
            question: "Pourquoi exporter parfois un Excel en CSV ?",
            options: [
              "Pour supprimer toutes les données",
              "Pour obtenir un format simple, stable et automatisable",
              "Parce que CSV affiche mieux les images",
              "Parce que Excel ne peut pas contenir de nombres"
            ],
            answer: 1,
            explainOk: "Le CSV est léger, standard, idéal pour les pipelines.",
            explainKo: "On standardise pour fiabiliser l’automatisation."
          },
          retenir: [
            "read_excel lit les classeurs.",
            "to_csv standardise.",
            "Fichiers du projet : data/ventes.csv, data/clients.csv, data/ventes_apercu.xlsx"
          ]
        }
      ]
    },
    {
      id: "m9",
      title: "pandas : explorer et sélectionner",
      track: "data-analyst",
      level: "Data Analyst",
      image: "assets/illu-analyste.jpg",
      summary: "EDA de base : head, info, describe, filtres, colonnes, tris.",
      lessons: [
        {
          id: "m9-l1",
          title: "Premier contact avec le DataFrame",
          goal: "Utiliser head, info, describe pour comprendre un jeu de données.",
          image: "assets/illu-donnees.jpg",
          caption: "Avant d’analyser, on ausculte.",
          voir: {
            paragraphs: [
              "L’EDA (exploration) répond : Quelles colonnes ? Combien de lignes ? Quels types ? Y a-t-il des manquants ? Quelle échelle pour les montants ?"
            ],
            analogy: {
              title: "Analogie de l’arrivée dans une ville",
              text: "Avant de décider où ouvrir une boutique, on se promène. head/info/describe, c’est la promenade."
            }
          },
          comprendre: {
            code: {
              label: "eda_base.py",
              lines: "import pandas as pd\n\ndf = pd.read_csv(\"data/ventes.csv\")\nprint(df.head())\nprint(df.info())\nprint(df.describe())\nprint(df[\"ville\"].value_counts())"
            },
            annotation: "value_counts() montre la fréquence des catégories — très utile.",
            bullets: [
              "head() : aperçu",
              "info() : types + manquants",
              "describe() : stats des colonnes numériques"
            ]
          },
          pratiquer: {
            prompt: "Listez les 3 commandes d’exploration à lancer juste après un read_csv (noms de méthodes).",
            placeholder: "head\ninfo\ndescribe",
            checkType: "keywords",
            keywords: ["head", "info", "describe"],
            success: "Oui. C’est le rituel professionnel de l’arrivée sur un fichier.",
            fail: "Mentionnez head, info et describe.",
            hint: "Les trois méthodes vues dans le code."
          },
          verifier: {
            question: "À quoi sert surtout info() ?",
            options: [
              "Dessiner un camembert",
              "Voir types de colonnes et valeurs non nulles",
              "Supprimer le fichier",
              "Installer Excel"
            ],
            answer: 1,
            explainOk: "info() est votre radiographie technique.",
            explainKo: "info() décrit structure, types et manquants."
          },
          retenir: [
            "EDA avant conclusion.",
            "head / info / describe = trio de base.",
            "value_counts pour les catégories."
          ]
        },
        {
          id: "m9-l2",
          title: "Sélectionner colonnes et filtrer lignes",
          goal: "Extraire les sous-ensembles utiles à une question.",
          image: "assets/illu-analyste.jpg",
          caption: "Filtrer, c’est choisir le terrain de la réponse.",
          voir: {
            paragraphs: [
              "Question exemple : quelles ventes à Kinshasa dépassent 300 000 CDF ?"
            ],
            analogy: {
              title: "Analogie du tamis",
              text: "On ne porte pas toute la rivière au labo : on filtre l’échantillon pertinent."
            }
          },
          comprendre: {
            code: {
              label: "filtres.py",
              lines: "import pandas as pd\n\ndf = pd.read_csv(\"data/ventes.csv\")\n\n# Une colonne\nprint(df[\"montant_cdf\"].head())\n\n# Plusieurs colonnes\nprint(df[[\"ville\", \"produit\", \"montant_cdf\"]].head())\n\n# Filtre\nkin = df[df[\"ville\"] == \"Kinshasa\"]\ngros = df[(df[\"ville\"] == \"Kinshasa\") & (df[\"montant_cdf\"] > 300000)]\nprint(gros)"
            },
            annotation: "& combine des conditions (chaque condition entre parenthèses)."
          },
          pratiquer: {
            prompt: "Écrivez l’expression qui garde les lignes où ville == \"Goma\".",
            placeholder: "df[df[\"ville\"] == \"Goma\"]",
            checkType: "regex",
            pattern: "df\\s*\\[\\s*df\\s*\\[\\s*[\"']ville[\"']\\s*\\]\\s*==\\s*[\"']Goma[\"']\\s*\\]",
            success: "Parfait. Le filtre est l’outil quotidien de l’analyste.",
            fail: "Le motif attendu ressemble à : df[df[\"ville\"] == \"Goma\"]",
            hint: "Double crochets logiques : condition à l’intérieur de df[...]."
          },
          verifier: {
            question: "Que fait df[[\"ville\", \"montant_cdf\"]] ?",
            options: [
              "Supprime ces colonnes",
              "Sélectionne uniquement ces deux colonnes",
              "Convertit le CSV en Excel",
              "Calcule automatiquement la moyenne"
            ],
            answer: 1,
            explainOk: "On extrait un sous-tableau de colonnes.",
            explainKo: "La double liste de noms sélectionne des colonnes."
          },
          retenir: [
            "df[\"col\"] → une série",
            "df[[...]] → plusieurs colonnes",
            "df[condition] → filtre de lignes"
          ]
        },
        {
          id: "m9-l3",
          title: "Trier et répondre vite",
          goal: "Trouver top ventes et classements avec sort_values.",
          image: "assets/illu-analyste.jpg",
          caption: "Un tri clair répond souvent à 50 % de la question.",
          voir: {
            paragraphs: [
              "« Quelles sont les 5 plus grosses ventes ? » se résout souvent par un tri décroissant."
            ],
            analogy: {
              title: "Analogie du classement",
              text: "Comme un tableau des scores : le plus grand en haut."
            }
          },
          comprendre: {
            code: {
              label: "tris.py",
              lines: "import pandas as pd\n\ndf = pd.read_csv(\"data/ventes.csv\")\ntop5 = df.sort_values(\"montant_cdf\", ascending=False).head(5)\nprint(top5[[\"date\", \"ville\", \"produit\", \"montant_cdf\"]])"
            },
            annotation: "ascending=False = du plus grand au plus petit."
          },
          pratiquer: {
            prompt: "Écrivez un tri de df par montant_cdf décroissant (sort_values).",
            placeholder: "df.sort_values(\"montant_cdf\", ascending=False)",
            checkType: "regex",
            pattern: "sort_values\\s*\\(\\s*[\"']montant_cdf[\"']\\s*,\\s*ascending\\s*=\\s*False\\s*\\)",
            success: "Oui. Vous savez produire un classement utile.",
            fail: "Utilisez sort_values(\"montant_cdf\", ascending=False)",
            hint: "ascending=False pour l’ordre décroissant."
          },
          verifier: {
            question: "ascending=False signifie…",
            options: [
              "Ordre alphabétique uniquement",
              "Tri du plus grand au plus petit",
              "Suppression des lignes",
              "Import Excel"
            ],
            answer: 1,
            explainOk: "Décroissant = grands montants d’abord.",
            explainKo: "False = pas croissant, donc décroissant."
          },
          retenir: [
            "sort_values classe.",
            "head(5) après tri = top 5.",
            "Toujours afficher les colonnes utiles à la décision."
          ]
        }
      ]
    },
    {
      id: "m10",
      title: "Nettoyage et qualité des données",
      track: "data-analyst",
      level: "Data Analyst",
      image: "assets/illu-donnees.jpg",
      summary: "Manquants, types, doublons, cohérence — l’hygiène de l’analyste.",
      lessons: [
        {
          id: "m10-l1",
          title: "Détecter les valeurs manquantes",
          goal: "Repérer et quantifier les NaN avant toute moyenne.",
          image: "assets/illu-donnees.jpg",
          caption: "Une case vide peut fausser un indicateur.",
          voir: {
            paragraphs: [
              "Dans ventes.csv, la colonne quantite contient au moins une valeur manquante. Ignorer ce fait, c’est risquer une conclusion fausse."
            ],
            analogy: {
              title: "Analogie du dossier incomplet",
              text: "On ne calcule pas un taux de guérison en oubliant les dossiers non remplis."
            }
          },
          comprendre: {
            code: {
              label: "manquants.py",
              lines: "import pandas as pd\n\ndf = pd.read_csv(\"data/ventes.csv\")\nprint(df.isna().sum())\nprint(df[df[\"quantite\"].isna()])"
            },
            annotation: "isna().sum() compte les manquants par colonne.",
            bullets: [
              "Compter d’abord",
              "Comprendre pourquoi c’est vide",
              "Puis décider : corriger, imputer, ou exclure — en le disant"
            ]
          },
          pratiquer: {
            prompt: "Quelle méthode pandas permet de tester les valeurs manquantes (nom) ?",
            placeholder: "isna",
            checkType: "keywords",
            keywords: ["isna"],
            success: "Oui — isna (ou isnull) est le détecteur de base.",
            fail: "La réponse attendue contient isna.",
            hint: "Regardée dans le code : df.isna()"
          },
          verifier: {
            question: "Que faut-il faire en premier face aux manquants ?",
            options: [
              "Les ignorer toujours",
              "Les détecter et les quantifier",
              "Supprimer tout le projet",
              "Changer de métier"
            ],
            answer: 1,
            explainOk: "Mesurer avant de traiter.",
            explainKo: "D’abord détecter, ensuite décider."
          },
          retenir: [
            "isna().sum() = tableau de bord qualité.",
            "Un manquant n’est pas « rien » : c’est une information.",
            "Documentez vos choix de traitement."
          ]
        },
        {
          id: "m10-l2",
          title: "Corriger types et valeurs",
          goal: "Convertir dates/nombres et traiter un manquant proprement.",
          image: "assets/illu-analyste.jpg",
          caption: "Le bon type rend les calculs possibles.",
          voir: {
            paragraphs: [
              "Une date lue comme texte empêche les analyses mensuelles. Un nombre lu comme texte empêche les sommes."
            ],
            analogy: {
              title: "Analogie des unités",
              text: "Additionner des kilos et des litres sans conversion, c’est absurde. Les types jouent ce rôle."
            }
          },
          comprendre: {
            code: {
              label: "types_clean.py",
              lines: "import pandas as pd\n\ndf = pd.read_csv(\"data/ventes.csv\")\ndf[\"date\"] = pd.to_datetime(df[\"date\"])\n\n# Exemple de traitement transparent du manquant :\n# ici on retire la ligne incomplète pour une analyse quantite\npropre = df.dropna(subset=[\"quantite\"]).copy()\npropre[\"quantite\"] = propre[\"quantite\"].astype(int)\nprint(propre.dtypes)\nprint(propre.shape)"
            },
            annotation: "dropna(subset=[...]) cible la colonne critique. Dites-le dans votre rapport."
          },
          pratiquer: {
            prompt: "Écrivez la ligne qui convertit df[\"date\"] avec pd.to_datetime.",
            placeholder: "df[\"date\"] = pd.to_datetime(df[\"date\"])",
            checkType: "regex",
            pattern: "df\\s*\\[\\s*[\"']date[\"']\\s*\\]\\s*=\\s*pd\\.to_datetime\\s*\\(\\s*df\\s*\\[\\s*[\"']date[\"']\\s*\\]\\s*\\)",
            success: "Très bien. Les analyses temporelles deviennent possibles.",
            fail: "Reproduisez : df[\"date\"] = pd.to_datetime(df[\"date\"])",
            hint: "to_datetime entoure df[\"date\"]."
          },
          verifier: {
            question: "Pourquoi convertir la colonne date ?",
            options: [
              "Pour changer la couleur du fichier",
              "Pour pouvoir regrouper par mois et calculer des tendances",
              "Pour effacer les ventes",
              "Pour remplacer pandas"
            ],
            answer: 1,
            explainOk: "Les dates typées ouvrent le temps comme dimension d’analyse.",
            explainKo: "Sans type date, les tendances mensuelles sont pénibles ou fausses."
          },
          retenir: [
            "to_datetime pour les dates.",
            "astype pour les entiers quand c’est sûr.",
            "Tout traitement de manquant doit être explicite."
          ]
        },
        {
          id: "m10-l3",
          title: "Doublons et contrôles de cohérence",
          goal: "Chercher les doublons et des montants incohérents.",
          image: "assets/illu-donnees.jpg",
          caption: "La qualité, c’est aussi la chasse aux absurdités.",
          voir: {
            paragraphs: [
              "Un bon analyste se demande : y a-t-il des lignes en double ? des montants négatifs ? des villes aux orthographes multiples ?"
            ],
            analogy: {
              title: "Analogie du contrôle qualité",
              text: "À l’usine, on pèse et on inspecte. En data, on profile et on contrôle."
            }
          },
          comprendre: {
            code: {
              label: "qualite.py",
              lines: "import pandas as pd\n\ndf = pd.read_csv(\"data/ventes.csv\")\nprint(df.duplicated().sum())\nprint(df[df[\"montant_cdf\"] <= 0])\nprint(df[\"ville\"].unique())"
            },
            annotation: "unique() révèle les variantes d’orthographe (Kinshasa vs kinshasa, etc.)."
          },
          pratiquer: {
            prompt: "Quelle méthode compte approximativement les doublons de lignes (nom) ?",
            placeholder: "duplicated",
            checkType: "keywords",
            keywords: ["duplicated"],
            success: "Oui. duplicated().sum() est un contrôle rapide.",
            fail: "Réponse attendue : duplicated",
            hint: "Voir le code qualité.py"
          },
          verifier: {
            question: "Pourquoi inspecter unique() sur une colonne ville ?",
            options: [
              "Pour dessiner une carte automatiquement",
              "Pour détecter des orthographes incohérentes qui cassent les regroupements",
              "Pour supprimer pandas",
              "Pour convertir en Excel uniquement"
            ],
            answer: 1,
            explainOk: "Kinshasa et kinshasa seraient comptés séparément sinon.",
            explainKo: "Les variantes de texte fragmentent les totaux."
          },
          retenir: [
            "Doublons, bornes, orthographes : trio qualité.",
            "La cohérence précède le KPI.",
            "Un analyste digne documente ses contrôles."
          ]
        }
      ]
    },
    {
      id: "m11",
      title: "Agrégations, groupby et jointures",
      track: "data-analyst",
      level: "Data Analyst",
      image: "assets/illu-analyste.jpg",
      summary: "Calculer des KPI par groupe et enrichir les ventes avec la table clients.",
      lessons: [
        {
          id: "m11-l1",
          title: "groupby : répondre « par catégorie »",
          goal: "Calculer totaux et moyennes par ville ou produit.",
          image: "assets/illu-analyste.jpg",
          caption: "Le groupby est le moteur des tableaux de bord.",
          voir: {
            paragraphs: [
              "Question : quel est le total des ventes par ville ? groupby découpe, puis agrège."
            ],
            analogy: {
              title: "Analogie des paniers",
              text: "On met chaque vente dans le panier de sa ville, puis on pèse chaque panier."
            }
          },
          comprendre: {
            code: {
              label: "groupby.py",
              lines: "import pandas as pd\n\ndf = pd.read_csv(\"data/ventes.csv\")\npar_ville = df.groupby(\"ville\")[\"montant_cdf\"].sum().sort_values(ascending=False)\nprint(par_ville)\n\npar_prod = df.groupby(\"produit\").agg(\n    total=(\"montant_cdf\", \"sum\"),\n    nb=(\"montant_cdf\", \"count\"),\n    moyenne=(\"montant_cdf\", \"mean\")\n)\nprint(par_prod)"
            },
            annotation: "agg permet plusieurs indicateurs d’un coup — style reporting."
          },
          pratiquer: {
            prompt: "Écrivez un groupby qui somme montant_cdf par ville.",
            placeholder: "df.groupby(\"ville\")[\"montant_cdf\"].sum()",
            checkType: "regex",
            pattern: "groupby\\s*\\(\\s*[\"']ville[\"']\\s*\\)\\s*\\[\\s*[\"']montant_cdf[\"']\\s*\\]\\s*\\.\\s*sum\\s*\\(\\s*\\)",
            success: "Excellent. Vous produisez un vrai KPI géographique.",
            fail: "Reproduisez : df.groupby(\"ville\")[\"montant_cdf\"].sum()",
            hint: "groupby → colonne → sum()"
          },
          verifier: {
            question: "groupby(\"ville\")[\"montant_cdf\"].mean() calcule…",
            options: [
              "La moyenne des montants pour chaque ville",
              "La suppression des villes",
              "Un import Excel",
              "Uniquement le maximum global"
            ],
            answer: 0,
            explainOk: "Moyenne par groupe ville.",
            explainKo: "C’est une moyenne intra-ville."
          },
          retenir: [
            "groupby = découper puis résumer.",
            "sum / mean / count sont vos alliés.",
            "agg pour un mini-rapport multi-indicateurs."
          ]
        },
        {
          id: "m11-l2",
          title: "Jointure avec la table clients",
          goal: "Enrichir les ventes via client_id (merge).",
          image: "assets/illu-donnees.jpg",
          caption: "Deux registres, une clé : une analyse plus riche.",
          voir: {
            paragraphs: [
              "ventes.csv a client_id. clients.csv décrit l’organisation. La jointure relie les deux pour analyser par type_client ou province."
            ],
            analogy: {
              title: "Analogie de l’annuaire",
              text: "Le ticket de caisse (vente) + la fiche client = compréhension complète."
            }
          },
          comprendre: {
            code: {
              label: "merge.py",
              lines: "import pandas as pd\n\nventes = pd.read_csv(\"data/ventes.csv\")\nclients = pd.read_csv(\"data/clients.csv\")\n\ndf = ventes.merge(clients, on=\"client_id\", how=\"left\")\nprint(df.head())\nprint(df.groupby(\"type_client\")[\"montant_cdf\"].sum())"
            },
            annotation: "how=\"left\" garde toutes les ventes, même si un client manque."
          },
          pratiquer: {
            prompt: "Écrivez un merge de ventes et clients sur client_id (how=\"left\").",
            placeholder: "ventes.merge(clients, on=\"client_id\", how=\"left\")",
            checkType: "regex",
            pattern: "merge\\s*\\([\\s\\S]*on\\s*=\\s*[\"']client_id[\"'][\\s\\S]*how\\s*=\\s*[\"']left[\"']",
            success: "Bravo. Les jointures sont le quotidien d’un Data Analyst complet.",
            fail: "Il faut merge(..., on=\"client_id\", how=\"left\")",
            hint: "La clé commune s’appelle client_id."
          },
          verifier: {
            question: "À quoi sert la clé client_id dans une jointure ?",
            options: [
              "À colorier le graphique",
              "À aligner chaque vente avec la bonne fiche client",
              "À supprimer les montants",
              "À renommer pandas"
            ],
            answer: 1,
            explainOk: "La clé assure le bon appariement.",
            explainKo: "Sans clé fiable, la jointure invente des associations."
          },
          retenir: [
            "merge/join enrichit une table.",
            "on= précise la clé.",
            "Vérifier le nombre de lignes après jointure."
          ]
        },
        {
          id: "m11-l3",
          title: "KPI mensuels",
          goal: "Créer une série temporelle simple des ventes.",
          image: "assets/illu-analyste.jpg",
          caption: "Le temps révèle les tendances.",
          voir: {
            paragraphs: [
              "Direction veut savoir : comment évolue le total mensuel ? On extrait le mois, puis on agrège."
            ],
            analogy: {
              title: "Analogie du bulletin",
              text: "Comme un bulletin mensuel de notes : une vue par période."
            }
          },
          comprendre: {
            code: {
              label: "mensuel.py",
              lines: "import pandas as pd\n\ndf = pd.read_csv(\"data/ventes.csv\")\ndf[\"date\"] = pd.to_datetime(df[\"date\"])\ndf[\"mois\"] = df[\"date\"].dt.to_period(\"M\").astype(str)\n\nmensuel = df.groupby(\"mois\")[\"montant_cdf\"].sum()\nprint(mensuel)"
            },
            annotation: "dt.to_period(\"M\") regroupe par mois calendaire."
          },
          pratiquer: {
            prompt: "Après conversion de date, quelle propriété permet les accès temporels (dt) ? Répondez : dt",
            placeholder: "dt",
            checkType: "keywords",
            keywords: ["dt"],
            success: "Oui. df[\"date\"].dt... ouvre l’analyse temporelle.",
            fail: "La réponse courte attendue est dt.",
            hint: "Dans le code : df[\"date\"].dt.to_period"
          },
          verifier: {
            question: "Pourquoi créer une colonne mois ?",
            options: [
              "Pour décorer",
              "Pour agréger les ventes par période et voir la tendance",
              "Pour effacer les jours",
              "Pour remplacer client_id"
            ],
            answer: 1,
            explainOk: "Le mois est une dimension de pilotage classique.",
            explainKo: "On crée mois pour regrouper dans le temps."
          },
          retenir: [
            "Dates typées → analyses temporelles.",
            "KPI mensuel = groupby sur le mois.",
            "Toujours relier le KPI à une décision."
          ]
        }
      ]
    },
    {
      id: "m12",
      title: "Visualisation pour décider",
      track: "data-analyst",
      level: "Data Analyst",
      image: "assets/illu-analyste.jpg",
      summary: "Choisir le bon graphique, le titrer, en tirer une recommandation.",
      lessons: [
        {
          id: "m12-l1",
          title: "Barres, courbes, distribution",
          goal: "Associer chaque question au bon type de graphique.",
          image: "assets/illu-analyste.jpg",
          caption: "Le graphique est une phrase visuelle, pas une décoration.",
          voir: {
            paragraphs: [
              "Comparer des villes → barres. Évolution dans le temps → courbe. Répartition d’une variable numérique → histogramme."
            ],
            analogy: {
              title: "Analogie du panneau de direction",
              text: "Un panneau illisible fait perdre la route. Un graphique surchargé aussi."
            }
          },
          comprendre: {
            code: {
              label: "viz.py",
              lines: "import pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv(\"data/ventes.csv\")\ntotaux = df.groupby(\"ville\")[\"montant_cdf\"].sum().sort_values(ascending=False)\n\ntotaux.plot(kind=\"bar\", color=\"#2d6a4f\")\nplt.title(\"Total des ventes par ville (CDF)\")\nplt.ylabel(\"Montant (CDF)\")\nplt.xlabel(\"Ville\")\nplt.tight_layout()\nplt.show()"
            },
            annotation: "Titre + axes : non négociable en contexte professionnel."
          },
          pratiquer: {
            prompt: "Pour comparer les totaux de 5 villes, quel type de graphique choisissez-vous ? (réponse : barres)",
            placeholder: "barres",
            checkType: "keywords",
            keywords: ["barre"],
            success: "Oui. Les barres restent le réflexe le plus lisible pour des catégories.",
            fail: "Indiquez barres (ou barre).",
            hint: "Comparaison de catégories → diagramme en barres."
          },
          verifier: {
            question: "Quel élément manque le plus souvent aux graphiques amateurs ?",
            options: [
              "Des animations 3D",
              "Un titre clair et des axes libellés",
              "Dix polices différentes",
              "Un fond violet"
            ],
            answer: 1,
            explainOk: "La lisibilité professionnelle commence par titre et axes.",
            explainKo: "Sans titre/axes, le lecteur doit deviner — c’est inacceptable."
          },
          retenir: [
            "Question → type de graphique.",
            "Titre et axes obligatoires.",
            "Simplicité = crédibilité."
          ]
        },
        {
          id: "m12-l2",
          title: "De l’image à la recommandation",
          goal: "Transformer un graphique en conclusion actionnable.",
          image: "assets/illu-analyste.jpg",
          caption: "Sans recommandation, l’analyse reste inachevée.",
          voir: {
            paragraphs: [
              "Le professionnel ajoute une phrase de décision : « Prioriser le réapprovisionnement à Kinshasa, qui concentre le plus gros volume. »"
            ],
            analogy: {
              title: "Analogie du compte rendu médical",
              text: "On ne livre pas seulement la tension artérielle : on dit ce qu’il faut faire."
            }
          },
          comprendre: {
            paragraphs: ["Structure de conclusion en 3 lignes :"],
            bullets: [
              "Constat (chiffre)",
              "Interprétation (sens métier)",
              "Recommandation (action)"
            ],
            code: {
              label: "conclusion.md",
              lines: "Constat : Kinshasa représente le total le plus élevé.\nInterprétation : la demande y est la plus concentrée sur la période.\nRecommandation : renforcer le stock ACT et tests à Kinshasa."
            },
            annotation: "Gardez cette structure pour le projet final."
          },
          pratiquer: {
            prompt: "Rédigez une mini-conclusion en 3 lignes (Constat / Interprétation / Recommandation) sur des ventes imaginaires.",
            placeholder: "Constat : ...\nInterprétation : ...\nRecommandation : ...",
            checkType: "keywords",
            keywords: ["constat", "recommandation"],
            success: "Très bien. Vous communiquez comme un analyste, pas comme un générateur de graphiques.",
            fail: "Incluez au moins Constat et Recommandation.",
            hint: "Utilisez les trois mots-clés de structure."
          },
          verifier: {
            question: "Que doit toujours accompagner un graphique professionnel ?",
            options: [
              "Une musique de fond",
              "Une lecture + une recommandation liée à une décision",
              "Le plus de couleurs possible",
              "Aucune explication"
            ],
            answer: 1,
            explainOk: "Le graphique sert la décision.",
            explainKo: "Sans lecture, le graphique est une image creuse."
          },
          retenir: [
            "Constat → interprétation → recommandation.",
            "Le chiffre sans action est incomplet.",
            "Entraînez cette phrase à chaque analyse."
          ]
        }
      ]
    },
    {
      id: "m13",
      title: "Statistiques utiles à l’analyste",
      track: "data-analyst",
      level: "Data Analyst",
      image: "assets/illu-donnees.jpg",
      summary: "Moyenne, médiane, dispersion, outliers — pour ne pas se tromper de message.",
      lessons: [
        {
          id: "m13-l1",
          title: "Moyenne, médiane, min, max",
          goal: "Choisir le bon résumé numérique selon la distribution.",
          image: "assets/illu-donnees.jpg",
          caption: "La moyenne seule peut mentir ; la médiane protège.",
          voir: {
            paragraphs: [
              "Si une vente géante tire la moyenne vers le haut, la médiane raconte mieux « le cas typique »."
            ],
            analogy: {
              title: "Analogie des salaires",
              text: "Un très haut salaire gonfle la moyenne. La médiane reste plus proche du quotidien."
            }
          },
          comprendre: {
            code: {
              label: "stats.py",
              lines: "import pandas as pd\n\ndf = pd.read_csv(\"data/ventes.csv\")\nx = df[\"montant_cdf\"]\nprint(\"moyenne\", x.mean())\nprint(\"mediane\", x.median())\nprint(\"min\", x.min(), \"max\", x.max())\nprint(x.describe())"
            },
            annotation: "Si moyenne >> médiane, suspectez des valeurs extrêmes."
          },
          pratiquer: {
            prompt: "Quand suspecter des valeurs extrêmes : si la moyenne est très supérieure à la … ?",
            placeholder: "mediane",
            checkType: "keywords",
            keywords: ["median"],
            success: "Oui. Écart moyenne/médiane = alerte distribution.",
            fail: "Le mot attendu se rapporte à la médiane.",
            hint: "médiane / median"
          },
          verifier: {
            question: "La médiane est…",
            options: [
              "Toujours égale à la moyenne",
              "La valeur centrale quand on ordonne les données",
              "Le maximum",
              "Un type de graphique"
            ],
            answer: 1,
            explainOk: "Valeur du milieu après tri.",
            explainKo: "Médiane = centre ordonné, pas forcément la moyenne."
          },
          retenir: [
            "Toujours croiser moyenne et médiane.",
            "min/max donnent l’amplitude.",
            "describe() résume vite."
          ]
        },
        {
          id: "m13-l2",
          title: "Repérer les outliers",
          goal: "Identifier des montants extrêmes et décider quoi en faire.",
          image: "assets/illu-analyste.jpg",
          caption: "Un outlier peut être une erreur… ou une vraie grosse commande.",
          voir: {
            paragraphs: [
              "L’analyste ne supprime pas un outlier par réflexe. Il l’explique : erreur de saisie ? commande exceptionnelle ? fraude ?"
            ],
            analogy: {
              title: "Analogie du thermomètre",
              text: "40°C peut être une panne du thermomètre… ou une vraie fièvre. On vérifie."
            }
          },
          comprendre: {
            code: {
              label: "outliers.py",
              lines: "import pandas as pd\n\ndf = pd.read_csv(\"data/ventes.csv\")\nq1 = df[\"montant_cdf\"].quantile(0.25)\nq3 = df[\"montant_cdf\"].quantile(0.75)\niqr = q3 - q1\nseuil = q3 + 1.5 * iqr\nprint(\"seuil haut\", seuil)\nprint(df[df[\"montant_cdf\"] > seuil])"
            },
            annotation: "Méthode IQR simple pour signaler des extrêmes — point de départ, pas une loi absolue."
          },
          pratiquer: {
            prompt: "En une phrase : que faites-vous face à un outlier avant de le supprimer éventuellment ?",
            placeholder: "Je vérifie s'il s'agit d'une erreur ou d'un cas réel...",
            checkType: "minChars",
            minChars: 25,
            success: "Oui. Investiguer avant d’éliminer : posture d’analyste digne.",
            fail: "Écrivez au moins une courte phrase d’investigation.",
            hint: "Parlez de vérification / erreur / cas réel."
          },
          verifier: {
            question: "Supprimer un outlier sans investigation est…",
            options: [
              "Toujours la meilleure pratique",
              "Risqué : on peut cacher un fait métier important",
              "Obligatoire en pandas",
              "Sans aucun effet"
            ],
            answer: 1,
            explainOk: "L’investigation d’abord.",
            explainKo: "Un extrême peut être le signal le plus important."
          },
          retenir: [
            "Outlier ≠ erreur automatique.",
            "IQR aide à signaler.",
            "Expliquez vos exclusions dans le rapport."
          ]
        }
      ]
    },
    {
      id: "m14",
      title: "Projet Data Analyst",
      track: "data-analyst",
      level: "Projet",
      image: "assets/illu-analyste.jpg",
      summary: "Étude de cas complète sur les ventes : de la question à la recommandation.",
      lessons: [
        {
          id: "m14-l1",
          title: "Brief du projet ventes santé",
          goal: "Cadrer le projet comme en entreprise.",
          image: "assets/illu-analyste.jpg",
          caption: "Un brief clair évite l’analyse hors sujet.",
          voir: {
            paragraphs: [
              "Contexte : une structure suit les ventes de produits de prévention/diagnostic/traitement. On vous confie data/ventes.csv et data/clients.csv.",
              "Objectif : produire un mini-rapport : qualité des données, tops villes/produits, tendance mensuelle, 3 recommandations."
            ],
            analogy: {
              title: "Analogie de la mission",
              text: "On ne commence pas à forer sans carte. Le brief est votre carte."
            }
          },
          comprendre: {
            paragraphs: ["Livrables attendus :"],
            bullets: [
              "Contrôle qualité (manquants, types)",
              "KPI : total global, total par ville, total par produit",
              "Jointure clients → total par type_client",
              "Un graphique principal",
              "Conclusion structurée (3 recommandations)"
            ],
            code: {
              label: "checklist.py",
              lines: "livrables = [\n    \"qualite\",\n    \"kpi_ville\",\n    \"kpi_produit\",\n    \"kpi_type_client\",\n    \"graphique\",\n    \"recommandations\"\n]\nprint(len(livrables), \"livrables\")"
            },
            annotation: "Cochez mentalement chaque livrable avant de dire « j’ai fini »."
          },
          pratiquer: {
            prompt: "Listez vos 6 livrables du projet (un par ligne).",
            placeholder: "qualite\nkpi_ville\n...",
            checkType: "minLines",
            minLines: 6,
            success: "Cadre solide. Vous êtes prêt à exécuter l’analyse.",
            fail: "Il faut au moins 6 lignes de livrables.",
            hint: "Reprenez la checklist du cours."
          },
          verifier: {
            question: "Quel est le premier livrable avant les KPI ?",
            options: [
              "Le plus beau camembert",
              "Le contrôle qualité des données",
              "La suppression de clients.csv",
              "L’installation d’un nouveau langage"
            ],
            answer: 1,
            explainOk: "Qualité d’abord, toujours.",
            explainKo: "Sans qualité, les KPI sont suspects."
          },
          retenir: [
            "Brief → livrables → exécution.",
            "Deux fichiers : ventes + clients.",
            "Le projet simule une vraie demande métier."
          ]
        },
        {
          id: "m14-l2",
          title: "Exécution guidée et soutenance",
          goal: "Parcourir le script d’analyse et formuler la recommandation finale.",
          image: "assets/illu-analyste.jpg",
          caption: "Le code sert le récit ; le récit sert la décision.",
          voir: {
            paragraphs: [
              "Voici un canevas d’exécution. Reproduisez-le chez vous (VS Code, Jupyter, ou Atelier code avec fichiers locaux)."
            ],
            analogy: {
              title: "Analogie de la soutenance",
              text: "On présente peu de chiffres, mais les bons — et on ose recommander."
            }
          },
          comprendre: {
            code: {
              label: "projet_ventes.py",
              lines: "import pandas as pd\n\nventes = pd.read_csv(\"data/ventes.csv\")\nclients = pd.read_csv(\"data/clients.csv\")\n\nprint(ventes.isna().sum())\nventes[\"date\"] = pd.to_datetime(ventes[\"date\"])\n\ndf = ventes.merge(clients, on=\"client_id\", how=\"left\")\nprint(\"Total CDF:\", df[\"montant_cdf\"].sum())\nprint(df.groupby(\"ville\")[\"montant_cdf\"].sum().sort_values(ascending=False))\nprint(df.groupby(\"produit\")[\"montant_cdf\"].sum().sort_values(ascending=False))\nprint(df.groupby(\"type_client\")[\"montant_cdf\"].sum().sort_values(ascending=False))\n\ndf[\"mois\"] = df[\"date\"].dt.to_period(\"M\").astype(str)\nprint(df.groupby(\"mois\")[\"montant_cdf\"].sum())"
            },
            annotation: "Après ce script : rédigez constat / interprétation / 3 recommandations."
          },
          pratiquer: {
            prompt: "Rédigez 3 recommandations concrètes (stock, formation, qualité données, ciblage géographique…).",
            placeholder: "1. ...\n2. ...\n3. ...",
            checkType: "minLines",
            minLines: 3,
            success: "Mission accomplie. Vous avez parcouru le cycle complet du Data Analyst Python.",
            fail: "Proposez 3 recommandations numérotées.",
            hint: "Une recommandation = une action claire."
          },
          verifier: {
            question: "Un Data Analyst Python complet doit surtout savoir…",
            options: [
              "Seulement dessiner des graphiques sans données",
              "Enchaîner question, import, qualité, analyse, visualisation et recommandation",
              "Mémoriser tous les raccourcis Excel sans Python",
              "Éviter les jointures et les KPI"
            ],
            answer: 1,
            explainOk: "C’est exactement le métier que ce parcours a construit.",
            explainKo: "Le cycle complet — pas une intro — définit un analyste digne."
          },
          retenir: [
            "Vous savez cadrer une mission data.",
            "Vous savez nettoyer, joindre, agréger, conclure.",
            "Continuez avec le carnet d’exercices pour ancrer."
          ]
        }
      ]
    }
  ];

  const carnet = {
    title: "Carnet d’exercices — Python Atelier",
    subtitle: "Entraînement imprimable : fondations + Data Analyst",
    sections: [
      {
        title: "A. Fondations",
        exercises: [
          {
            id: "cA1",
            prompt: "Écrivez un pseudo-code (6 étapes) pour vérifier l’identité d’un patient à l’accueil."
          },
          {
            id: "cA2",
            prompt: "Créez trois variables (nom, age, ville) et affichez-les avec print."
          },
          {
            id: "cA3",
            prompt: "Écrivez un if/elif/else qui classe une note (Très bien / Bien / Passable / Insuffisant)."
          },
          {
            id: "cA4",
            prompt: "Avec une boucle for et range(1, 6), affichez les entiers de 1 à 5."
          },
          {
            id: "cA5",
            prompt: "Créez une liste de 4 produits, affichez le dernier élément, puis append un 5ᵉ produit."
          },
          {
            id: "cA6",
            prompt: "Écrivez une fonction montant_ttc(ht) qui retourne ht * 1.16, puis testez avec 1000."
          }
        ]
      },
      {
        title: "B. Data Analyst — fichiers & pandas",
        exercises: [
          {
            id: "cB1",
            prompt: "Importez data/ventes.csv, affichez shape, columns, et les 5 premières lignes."
          },
          {
            id: "cB2",
            prompt: "Importez data/ventes_pointvirgule.csv avec le bon sep et vérifiez les colonnes."
          },
          {
            id: "cB3",
            prompt: "Comptez les manquants par colonne (isna().sum()) et commentez le résultat en 2 phrases."
          },
          {
            id: "cB4",
            prompt: "Filtrez les ventes de Kinshasa dont montant_cdf > 250000."
          },
          {
            id: "cB5",
            prompt: "Calculez le total montant_cdf par ville, trié décroissant."
          },
          {
            id: "cB6",
            prompt: "Faites un merge ventes/clients sur client_id et totalisez par type_client."
          },
          {
            id: "cB7",
            prompt: "Produisez un graphique en barres des totaux par produit (titre + axes)."
          },
          {
            id: "cB8",
            prompt: "Rédigez une conclusion Constat / Interprétation / 3 Recommandations sur vos résultats."
          }
        ]
      },
      {
        title: "C. Mini-défis métier",
        exercises: [
          {
            id: "cC1",
            prompt: "Quelle ville a le plus grand nombre de transactions ? (value_counts)"
          },
          {
            id: "cC2",
            prompt: "Calculez moyenne et médiane de montant_cdf. Interprétez l’écart."
          },
          {
            id: "cC3",
            prompt: "Créez une colonne mois et montrez l’évolution mensuelle du total."
          },
          {
            id: "cC4",
            prompt: "Proposez 2 contrôles qualité supplémentaires que vous feriez en situation réelle."
          }
        ]
      }
    ]
  };

  if (!window.ATELIER) window.ATELIER = { modules: [] };
  window.ATELIER.modules = (window.ATELIER.modules || []).concat(dataModules);
  window.ATELIER.carnet = carnet;
})();
