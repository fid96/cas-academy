/* SQL Atelier — contenu pédagogique */

window.ATELIER = {
  brand: "SQL Atelier",
  mission: "Devenir un Data Analyst SQL digne et complet — en partant de zéro.",
  tracks: [
    {
      id: "fondations",
      title: "Fondations SQL",
      subtitle: "Lire et filtrer des tables avec clarté.",
      goal: "Maîtriser SELECT, WHERE, ORDER BY, LIMIT."
    },
    {
      id: "data-analyst",
      title: "Data Analyst SQL",
      subtitle: "Le cœur du métier, pas un bonus.",
      goal: "Agrégations, JOIN, qualité, requêtes de décision."
    }
  ],
  method: {
    title: "La méthode en quatre gestes",
    steps: [
      { num: "01", title: "Voir", text: "On visualise le tableau et la question métier avant d’écrire une ligne SQL." },
      { num: "02", title: "Comprendre", text: "On traduit la question en clauses SQL, une idée à la fois." },
      { num: "03", title: "Pratiquer", text: "On écrit une requête courte sur la base ventes/clients." },
      { num: "04", title: "Vérifier", text: "Quiz rapide : on ancre l’essentiel avant la suite." }
    ],
    principles: [
      {
        title: "La question avant la requête",
        text: "SQL sert à répondre. Sans question claire, la plus belle requête reste inutile."
      },
      {
        title: "Une clause à la fois",
        text: "SELECT, puis FROM, puis WHERE… On construit comme on apprend à écrire."
      },
      {
        title: "Le schéma est votre carte",
        text: "Toujours connaître tables et colonnes avant de JOINer."
      },
      {
        title: "Complément de Python Atelier",
        text: "SQL extrait ; Python analyse souvent ensuite. Les deux se renforcent."
      }
    ]
  },
  glossary: [
    { term: "SQL", def: "Structured Query Language : langage pour interroger et gérer des bases de données relationnelles." },
    { term: "Table", def: "Tableau nommé avec colonnes (champs) et lignes (enregistrements)." },
    { term: "SELECT", def: "Clause qui choisit les colonnes à afficher." },
    { term: "FROM", def: "Indique la table source." },
    { term: "WHERE", def: "Filtre les lignes selon une condition." },
    { term: "ORDER BY", def: "Trie le résultat." },
    { term: "GROUP BY", def: "Regroupe les lignes pour calculer des totaux / moyennes par catégorie." },
    { term: "JOIN", def: "Relie deux tables via une clé commune." },
    { term: "NULL", def: "Absence de valeur (case vide), à traiter avec IS NULL." },
    { term: "Clé primaire", def: "Identifiant unique d’une ligne (ex. client_id)." },
    { term: "Clé étrangère", def: "Colonne qui pointe vers la clé d’une autre table." },
    { term: "Agrégat", def: "Fonction de résumé : COUNT, SUM, AVG, MIN, MAX." }
  ],
  modules: [
    {
      id: "m1",
      title: "Penser en tables",
      track: "fondations",
      level: "Fondations",
      image: "assets/illu-logique.jpg",
      summary: "Comprendre lignes, colonnes, clés — avant toute syntaxe.",
      lessons: [
        {
          id: "m1-l1",
          title: "Qu’est-ce qu’une base relationnelle ?",
          goal: "Relier tables, lignes, colonnes et clés à une situation réelle.",
          image: "assets/illu-donnees.jpg",
          caption: "Deux registres reliés par un identifiant : l’esprit du relationnel.",
          voir: {
            paragraphs: [
              "Imaginez un cahier des ventes et un annuaire des clients. Chaque vente mentionne un client_id. C’est déjà une base relationnelle.",
              "SQL est le langage qui pose des questions à ces tables."
            ],
            analogy: {
              title: "Analogie des registres",
              text: "La table est le registre ; la ligne est une fiche ; la colonne est une information répétée sur chaque fiche."
            }
          },
          comprendre: {
            paragraphs: ["Dans SQL Atelier, deux tables :"],
            bullets: [
              "clients — qui achète (organisation, type, province)",
              "ventes — quoi, où, combien (montant_cdf, produit, ville…)",
              "La clé client_id relie les deux"
            ],
            code: {
              label: "idée.sql",
              lines: "-- Question métier :\n-- Quelles ventes concernent Kinshasa ?\n-- Quelle organisation est derrière chaque vente ?"
            },
            annotation: "D’abord la question, ensuite SELECT."
          },
          pratiquer: {
            prompt: "Citez les 2 noms de tables du projet et la clé qui les relie.",
            placeholder: "tables: ...\nclé: ...",
            checkType: "keywords",
            keywords: ["ventes", "clients", "client_id"],
            success: "Exact. Vous avez la carte mentale du schéma.",
            fail: "Mentionnez ventes, clients et client_id.",
            hint: "Regardez aussi l’onglet Schéma."
          },
          verifier: {
            question: "Une ligne dans une table représente le plus souvent…",
            options: ["Un type de police", "Un cas / une observation", "Un langage", "Un fichier Excel uniquement"],
            answer: 1,
            explainOk: "Oui : une ligne = un enregistrement.",
            explainKo: "Pensez « une vente », « un client »."
          },
          retenir: [
            "Table = registre structuré.",
            "Les clés relient les tables.",
            "SQL répond à des questions métier."
          ]
        },
        {
          id: "m1-l2",
          title: "Lire un schéma avant d’écrire",
          goal: "Identifier colonnes utiles pour une question donnée.",
          image: "assets/illu-analyste.jpg",
          caption: "Le schéma évite les colonnes inventées.",
          voir: {
            paragraphs: [
              "Avant SELECT, on ouvre le schéma : quelles colonnes existent ? lesquels sont numériques ? où sont les NULL ?"
            ],
            analogy: {
              title: "Analogie de la carte",
              text: "On ne conduit pas sans carte. Le schéma est votre GPS SQL."
            }
          },
          comprendre: {
            paragraphs: ["Colonnes clés de ventes :"],
            bullets: [
              "date, ville, produit, categorie",
              "quantite (parfois NULL), montant_cdf",
              "client_id → lien vers clients"
            ],
            code: {
              label: "pragma.sql",
              lines: "-- Dans l’onglet Schéma, explorez :\n-- clients(client_id, organisation, type_client, province)\n-- ventes(...)"
            }
          },
          pratiquer: {
            prompt: "Pour totaliser les ventes par ville, quelles colonnes utilisez-vous ?",
            placeholder: "ville et montant_cdf",
            checkType: "keywords",
            keywords: ["ville", "montant"],
            success: "Oui : regrouper par ville, sommer montant_cdf.",
            fail: "Mentionnez ville et montant.",
            hint: "La dimension est ville ; la mesure est montant_cdf."
          },
          verifier: {
            question: "Pourquoi consulter le schéma avant un JOIN ?",
            options: [
              "Pour changer la couleur de l’écran",
              "Pour connaître la clé commune et éviter les erreurs de colonnes",
              "Parce que SQL l’interdit sinon",
              "Pour supprimer les tables"
            ],
            answer: 1,
            explainOk: "La clé et les noms exacts évitent les échecs.",
            explainKo: "Sans schéma, on invente des colonnes."
          },
          retenir: [
            "Schéma d’abord.",
            "Mesure vs dimension.",
            "NULL existe : quantite peut être vide."
          ]
        }
      ]
    },
    {
      id: "m2",
      title: "SELECT — lire des données",
      track: "fondations",
      level: "SQL",
      image: "assets/illu-variables.jpg",
      summary: "Choisir des colonnes, limiter les lignes, découvrir DISTINCT.",
      lessons: [
        {
          id: "m2-l1",
          title: "SELECT … FROM …",
          goal: "Écrire une première requête de lecture.",
          image: "assets/illu-donnees.jpg",
          caption: "SELECT choisit ; FROM localise.",
          voir: {
            paragraphs: [
              "Pour voir les villes et montants des ventes, on sélectionne ces colonnes dans la table ventes."
            ],
            analogy: {
              title: "Analogie du projecteur",
              text: "SELECT allume certaines colonnes ; les autres restent dans l’ombre."
            }
          },
          comprendre: {
            code: {
              label: "select_base.sql",
              lines: "SELECT ville, montant_cdf\nFROM ventes\nLIMIT 5;"
            },
            annotation: "LIMIT 5 évite d’afficher toute la table au début.",
            bullets: [
              "SELECT * lit toutes les colonnes (utile pour explorer)",
              "On termine souvent par ;",
              "Les noms doivent matcher le schéma"
            ]
          },
          pratiquer: {
            prompt: "Écrivez une requête qui sélectionne produit et categorie depuis ventes (avec LIMIT 10).",
            placeholder: "SELECT produit, categorie\nFROM ventes\nLIMIT 10;",
            checkType: "regex",
            pattern: "select\\s+produit\\s*,\\s*categorie\\s+from\\s+ventes",
            success: "Parfait. Votre première lecture SQL est correcte.",
            fail: "Il faut SELECT produit, categorie FROM ventes …",
            hint: "Ordre : SELECT → FROM → LIMIT."
          },
          verifier: {
            question: "Que fait FROM ventes ?",
            options: [
              "Supprime la table",
              "Indique la table source à lire",
              "Trie les résultats",
              "Crée une jointure"
            ],
            answer: 1,
            explainOk: "FROM = la source.",
            explainKo: "FROM pointe vers la table lue."
          },
          retenir: [
            "SELECT colonnes FROM table.",
            "LIMIT pour explorer.",
            "Orthographe exacte des noms."
          ]
        },
        {
          id: "m2-l2",
          title: "DISTINCT et alias",
          goal: "Lister des valeurs uniques et renommer une colonne.",
          image: "assets/illu-variables.jpg",
          caption: "DISTINCT répond : quelles valeurs différentes ?",
          voir: {
            paragraphs: ["Question : quelles villes apparaissent dans les ventes ?"]
          },
          comprendre: {
            code: {
              label: "distinct.sql",
              lines: "SELECT DISTINCT ville\nFROM ventes\nORDER BY ville;\n\nSELECT montant_cdf AS montant\nFROM ventes\nLIMIT 3;"
            },
            annotation: "AS renomme l’affichage (alias)."
          },
          pratiquer: {
            prompt: "Écrivez SELECT DISTINCT categorie FROM ventes;",
            placeholder: "SELECT DISTINCT categorie FROM ventes;",
            checkType: "regex",
            pattern: "select\\s+distinct\\s+categorie\\s+from\\s+ventes",
            success: "Oui. Vous obtenez la liste des catégories.",
            fail: "Reproduisez SELECT DISTINCT categorie FROM ventes",
            hint: "DISTINCT se place après SELECT."
          },
          verifier: {
            question: "DISTINCT sert à…",
            options: [
              "Supprimer la table",
              "Éliminer les doublons dans le résultat",
              "Créer une clé primaire",
              "Remplacer WHERE"
            ],
            answer: 1,
            explainOk: "Valeurs uniques dans le résultat.",
            explainKo: "DISTINCT dédoublonne l’affichage."
          },
          retenir: [
            "DISTINCT = valeurs uniques.",
            "AS = alias lisible.",
            "Utile pour explorer les catégories."
          ]
        }
      ]
    },
    {
      id: "m3",
      title: "Filtrer avec WHERE",
      track: "fondations",
      level: "SQL",
      image: "assets/illu-logique.jpg",
      summary: "Conditions, AND/OR, NULL, LIKE — le tamis de l’analyste.",
      lessons: [
        {
          id: "m3-l1",
          title: "WHERE et comparaisons",
          goal: "Filtrer les lignes selon une condition simple.",
          image: "assets/illu-logique.jpg",
          caption: "WHERE garde seulement les lignes utiles.",
          voir: {
            paragraphs: ["Question : ventes à Kinshasa dont le montant dépasse 300 000."]
          },
          comprendre: {
            code: {
              label: "where.sql",
              lines: "SELECT ville, produit, montant_cdf\nFROM ventes\nWHERE ville = 'Kinshasa'\n  AND montant_cdf > 300000;"
            },
            annotation: "Les textes vont entre quotes simples '…'."
          },
          pratiquer: {
            prompt: "Écrivez une requête des ventes à Goma (ville = 'Goma').",
            placeholder: "SELECT *\nFROM ventes\nWHERE ville = 'Goma';",
            checkType: "regex",
            pattern: "where\\s+ville\\s*=\\s*'Goma'",
            success: "Très bien. Le filtre géographique est en place.",
            fail: "Il faut WHERE ville = 'Goma'",
            hint: "Attention aux guillemets simples."
          },
          verifier: {
            question: "Comment écrit-on une égalité texte en SQL ?",
            options: ["ville == Kinshasa", "ville = 'Kinshasa'", "ville equals Kinshasa", "ville := Kinshasa"],
            answer: 1,
            explainOk: "= et quotes simples pour le texte.",
            explainKo: "SQL : ville = 'Kinshasa'"
          },
          retenir: [
            "WHERE filtre les lignes.",
            "Texte entre 'quotes'.",
            "AND / OR combinent."
          ]
        },
        {
          id: "m3-l2",
          title: "NULL et IS NULL",
          goal: "Détecter les valeurs manquantes correctement.",
          image: "assets/illu-donnees.jpg",
          caption: "NULL n’est égal à rien — même pas à NULL.",
          voir: {
            paragraphs: [
              "Dans ventes, certaines quantite sont vides (NULL). On ne filtre pas avec = NULL, mais IS NULL."
            ]
          },
          comprendre: {
            code: {
              label: "null.sql",
              lines: "SELECT vente_id, ville, quantite, montant_cdf\nFROM ventes\nWHERE quantite IS NULL;"
            },
            annotation: "IS NOT NULL pour les lignes renseignées."
          },
          pratiquer: {
            prompt: "Écrivez la requête qui liste les ventes où quantite IS NULL.",
            placeholder: "SELECT *\nFROM ventes\nWHERE quantite IS NULL;",
            checkType: "regex",
            pattern: "quantite\\s+is\\s+null",
            success: "Exact. C’est un geste qualité indispensable.",
            fail: "Utilisez WHERE quantite IS NULL",
            hint: "IS NULL, pas = NULL."
          },
          verifier: {
            question: "Quelle condition trouve les NULL ?",
            options: ["= NULL", "IS NULL", "== NULL", "EMPTY()"],
            answer: 1,
            explainOk: "IS NULL est la forme correcte.",
            explainKo: "Retenez : IS NULL / IS NOT NULL."
          },
          retenir: [
            "NULL = absence.",
            "IS NULL / IS NOT NULL.",
            "Qualité des données = réflexe analyste."
          ]
        }
      ]
    },
    {
      id: "m4",
      title: "Trier et limiter",
      track: "fondations",
      level: "SQL",
      image: "assets/hero-atelier.jpg",
      summary: "ORDER BY et top N — classements utiles à la décision.",
      lessons: [
        {
          id: "m4-l1",
          title: "ORDER BY et LIMIT",
          goal: "Obtenir le top des ventes par montant.",
          image: "assets/illu-analyste.jpg",
          caption: "Un tri clair répond vite à « quelles sont les plus grosses ventes ? ».",
          voir: {
            paragraphs: ["On veut les 5 ventes les plus élevées."]
          },
          comprendre: {
            code: {
              label: "order.sql",
              lines: "SELECT date, ville, produit, montant_cdf\nFROM ventes\nORDER BY montant_cdf DESC\nLIMIT 5;"
            },
            annotation: "DESC = décroissant. ASC = croissant (défaut)."
          },
          pratiquer: {
            prompt: "Écrivez un ORDER BY montant_cdf DESC avec LIMIT 5 sur ventes.",
            placeholder: "SELECT *\nFROM ventes\nORDER BY montant_cdf DESC\nLIMIT 5;",
            checkType: "regex",
            pattern: "order\\s+by\\s+montant_cdf\\s+desc[\\s\\S]*limit\\s+5",
            success: "Bravo. Vous produisez un classement actionnable.",
            fail: "Il faut ORDER BY montant_cdf DESC et LIMIT 5",
            hint: "DESC puis LIMIT."
          },
          verifier: {
            question: "DESC signifie…",
            options: ["Description", "Ordre décroissant", "Suppression", "Jointure"],
            answer: 1,
            explainOk: "Du plus grand au plus petit.",
            explainKo: "DESC = descending."
          },
          retenir: [
            "ORDER BY trie.",
            "DESC pour le top.",
            "LIMIT pour le Top N."
          ]
        }
      ]
    },
    {
      id: "m5",
      title: "Agrégations et GROUP BY",
      track: "data-analyst",
      level: "Data Analyst",
      image: "assets/illu-analyste.jpg",
      summary: "COUNT, SUM, AVG et regroupements — le moteur des KPI.",
      lessons: [
        {
          id: "m5-l1",
          title: "SUM, COUNT, AVG",
          goal: "Calculer des indicateurs globaux.",
          image: "assets/illu-donnees.jpg",
          caption: "Les agrégats résument des centaines de lignes en un chiffre.",
          voir: {
            paragraphs: ["Question : quel est le total des ventes (CDF) ? Combien de transactions ?"]
          },
          comprendre: {
            code: {
              label: "agg.sql",
              lines: "SELECT\n  COUNT(*) AS nb_ventes,\n  SUM(montant_cdf) AS total_cdf,\n  AVG(montant_cdf) AS moyenne_cdf\nFROM ventes;"
            }
          },
          pratiquer: {
            prompt: "Écrivez SELECT SUM(montant_cdf) FROM ventes;",
            placeholder: "SELECT SUM(montant_cdf) FROM ventes;",
            checkType: "regex",
            pattern: "select\\s+sum\\s*\\(\\s*montant_cdf\\s*\\)\\s+from\\s+ventes",
            success: "Oui. Un KPI global en une ligne.",
            fail: "Utilisez SUM(montant_cdf) FROM ventes",
            hint: "SUM autour de la colonne."
          },
          verifier: {
            question: "COUNT(*) compte…",
            options: ["Les colonnes", "Les lignes du résultat filtré", "Les fichiers CSV", "Les jointures"],
            answer: 1,
            explainOk: "Nombre de lignes.",
            explainKo: "COUNT(*) = nombre d’enregistrements."
          },
          retenir: [
            "SUM / COUNT / AVG / MIN / MAX.",
            "AS pour nommer le KPI.",
            "Base du reporting."
          ]
        },
        {
          id: "m5-l2",
          title: "GROUP BY",
          goal: "Calculer un total par ville.",
          image: "assets/illu-analyste.jpg",
          caption: "GROUP BY découpe puis résume.",
          voir: {
            paragraphs: ["Question : total des montants par ville, du plus grand au plus petit."]
          },
          comprendre: {
            code: {
              label: "groupby.sql",
              lines: "SELECT ville, SUM(montant_cdf) AS total\nFROM ventes\nGROUP BY ville\nORDER BY total DESC;"
            },
            annotation: "Toute colonne non agrégée du SELECT doit être dans GROUP BY."
          },
          pratiquer: {
            prompt: "Écrivez un GROUP BY ville avec SUM(montant_cdf).",
            placeholder: "SELECT ville, SUM(montant_cdf) AS total\nFROM ventes\nGROUP BY ville;",
            checkType: "regex",
            pattern: "group\\s+by\\s+ville",
            success: "Excellent. C’est le cœur du SQL analyste.",
            fail: "Ajoutez GROUP BY ville",
            hint: "SELECT ville, SUM(...) ... GROUP BY ville"
          },
          verifier: {
            question: "Avec SELECT ville, SUM(montant_cdf), que manque-t-il souvent ?",
            options: ["DELETE", "GROUP BY ville", "DROP TABLE", "PRINT"],
            answer: 1,
            explainOk: "GROUP BY aligne dimensions et mesures.",
            explainKo: "Il faut GROUP BY ville."
          },
          retenir: [
            "GROUP BY = par catégorie.",
            "Agrégat + dimension.",
            "ORDER BY sur l’alias possible."
          ]
        }
      ]
    },
    {
      id: "m6",
      title: "JOIN — relier les tables",
      track: "data-analyst",
      level: "Data Analyst",
      image: "assets/illu-donnees.jpg",
      summary: "INNER/LEFT JOIN pour enrichir les ventes avec les clients.",
      lessons: [
        {
          id: "m6-l1",
          title: "INNER JOIN et LEFT JOIN",
          goal: "Joindre ventes et clients sur client_id.",
          image: "assets/illu-analyste.jpg",
          caption: "La jointure assemble deux registres.",
          voir: {
            paragraphs: [
              "Pour savoir le type_client derrière chaque vente, on joint sur client_id."
            ]
          },
          comprendre: {
            code: {
              label: "join.sql",
              lines: "SELECT v.date, v.ville, v.montant_cdf, c.organisation, c.type_client\nFROM ventes v\nINNER JOIN clients c\n  ON v.client_id = c.client_id\nLIMIT 10;\n\n-- LEFT JOIN garde toutes les ventes même sans client matché"
            },
            annotation: "v et c sont des alias de tables — plus lisible."
          },
          pratiquer: {
            prompt: "Écrivez un JOIN de ventes et clients sur client_id (INNER JOIN).",
            placeholder: "SELECT *\nFROM ventes v\nINNER JOIN clients c ON v.client_id = c.client_id;",
            checkType: "regex",
            pattern: "join\\s+clients[\\s\\S]*on[\\s\\S]*client_id",
            success: "Parfait. Vous enrichissez l’analyse.",
            fail: "Il faut JOIN clients … ON … client_id",
            hint: "ON v.client_id = c.client_id"
          },
          verifier: {
            question: "LEFT JOIN privilégie…",
            options: [
              "La table de droite uniquement",
              "Toutes les lignes de la table de gauche",
              "La suppression des NULL",
              "Un tri automatique"
            ],
            answer: 1,
            explainOk: "Gauche conservée ; droite peut être NULL.",
            explainKo: "LEFT = garder la gauche."
          },
          retenir: [
            "JOIN + ON clé.",
            "INNER = intersections.",
            "LEFT = toutes les ventes + infos client si disponibles."
          ]
        },
        {
          id: "m6-l2",
          title: "KPI après jointure",
          goal: "Totaliser les montants par type_client.",
          image: "assets/illu-analyste.jpg",
          caption: "Jointure puis agrégation = reporting métier.",
          voir: {
            paragraphs: ["Question : quel type de client génère le plus de montant ?"]
          },
          comprendre: {
            code: {
              label: "kpi_join.sql",
              lines: "SELECT c.type_client, SUM(v.montant_cdf) AS total\nFROM ventes v\nJOIN clients c ON v.client_id = c.client_id\nGROUP BY c.type_client\nORDER BY total DESC;"
            }
          },
          pratiquer: {
            prompt: "Écrivez un GROUP BY type_client après JOIN ventes/clients.",
            placeholder: "SELECT c.type_client, SUM(v.montant_cdf) AS total\nFROM ventes v\nJOIN clients c ON v.client_id = c.client_id\nGROUP BY c.type_client;",
            checkType: "regex",
            pattern: "group\\s+by\\s+c\\.type_client|group\\s+by\\s+type_client",
            success: "Oui. Vous croisez structure client et performance.",
            fail: "Joignez puis GROUP BY type_client",
            hint: "JOIN … GROUP BY c.type_client"
          },
          verifier: {
            question: "Pourquoi joindre avant de grouper par type_client ?",
            options: [
              "Parce que type_client est dans clients, pas dans ventes",
              "Parce que SQL l’impose toujours",
              "Pour supprimer ventes",
              "Pour éviter SELECT"
            ],
            answer: 0,
            explainOk: "L’attribut métier est dans l’autre table.",
            explainKo: "type_client vit dans clients."
          },
          retenir: [
            "Joindre pour enrichir.",
            "Puis agréger.",
            "Pattern classique du Data Analyst SQL."
          ]
        }
      ]
    },
    {
      id: "m7",
      title: "Projet Data Analyst SQL",
      track: "data-analyst",
      level: "Projet",
      image: "assets/illu-analyste.jpg",
      summary: "Brief complet : qualité, tops, jointure, recommandations.",
      lessons: [
        {
          id: "m7-l1",
          title: "Brief et requêtes de mission",
          goal: "Enchaîner les requêtes d’un mini-rapport SQL.",
          image: "assets/hero-atelier.jpg",
          caption: "Une mission SQL se livre en chiffres actionnables.",
          voir: {
            paragraphs: [
              "Mission : piloter les ventes santé. Livrables : manquants, top villes, top produits, total par type_client, 3 recommandations."
            ]
          },
          comprendre: {
            code: {
              label: "mission.sql",
              lines: "-- 1) Qualité\nSELECT COUNT(*) AS nb_null_q\nFROM ventes WHERE quantite IS NULL;\n\n-- 2) Top villes\nSELECT ville, SUM(montant_cdf) AS total\nFROM ventes GROUP BY ville ORDER BY total DESC;\n\n-- 3) Par type_client\nSELECT c.type_client, SUM(v.montant_cdf) AS total\nFROM ventes v\nJOIN clients c ON v.client_id = c.client_id\nGROUP BY c.type_client\nORDER BY total DESC;"
            },
            annotation: "Exécutez ces blocs dans Atelier SQL, puis rédigez vos recommandations."
          },
          pratiquer: {
            prompt: "Listez vos 3 recommandations métier (une par ligne) après analyse.",
            placeholder: "1. ...\n2. ...\n3. ...",
            checkType: "minLines",
            minLines: 3,
            success: "Mission accomplie : vous concluez comme un analyste.",
            fail: "Trois recommandations numérotées sont attendues.",
            hint: "Stock, ciblage géographique, qualité des quantités…"
          },
          verifier: {
            question: "Un Data Analyst SQL complet doit surtout…",
            options: [
              "Mémoriser toutes les couleurs Excel",
              "Enchaîner question, schéma, requête, contrôle, KPI et recommandation",
              "Éviter les JOIN",
              "Ne jamais regarder les NULL"
            ],
            answer: 1,
            explainOk: "C’est exactement le métier visé par SQL Atelier.",
            explainKo: "Le cycle complet définit l’analyste."
          },
          retenir: [
            "SQL sert la décision.",
            "Qualité → KPI → récit.",
            "Passez le quiz bilan pour valider."
          ]
        }
      ]
    }
  ],
  carnet: {
    title: "Carnet d’exercices — SQL Atelier",
    subtitle: "Entraînement imprimable sur la base ventes / clients",
    sections: [
      {
        title: "A. Fondations",
        exercises: [
          { id: "sA1", prompt: "SELECT ville, produit, montant_cdf FROM ventes LIMIT 10;" },
          { id: "sA2", prompt: "Listez les catégories distinctes." },
          { id: "sA3", prompt: "Filtrez les ventes de Lubumbashi." },
          { id: "sA4", prompt: "Montants > 400000, triés DESC." },
          { id: "sA5", prompt: "Trouvez les lignes où quantite IS NULL." }
        ]
      },
      {
        title: "B. Data Analyst",
        exercises: [
          { id: "sB1", prompt: "Total et moyenne de montant_cdf." },
          { id: "sB2", prompt: "SUM par ville, ORDER BY total DESC." },
          { id: "sB3", prompt: "COUNT par produit." },
          { id: "sB4", prompt: "JOIN ventes/clients : organisation + montant." },
          { id: "sB5", prompt: "Total par type_client." },
          { id: "sB6", prompt: "Top 5 ventes (date, ville, produit, montant)." }
        ]
      },
      {
        title: "C. Projet & communication",
        exercises: [
          { id: "sC1", prompt: "Rédigez 3 recommandations basées sur vos requêtes." },
          { id: "sC2", prompt: "Expliquez INNER vs LEFT JOIN en 4 phrases simples." },
          { id: "sC3", prompt: "Proposez une requête de contrôle qualité supplémentaire." }
        ]
      }
    ]
  },
  bilan: {
    title: "Quiz bilan — Data Analyst SQL",
    subtitle: "20 questions pour mesurer vos acquis SQL orientés métier.",
    passScore: 70,
    questions: [
      { id: "b1", theme: "bases", themeLabel: "Bases", question: "SELECT sert à…", options: ["Supprimer une table", "Choisir les colonnes à afficher", "Créer un utilisateur", "Fermer la base"], answer: 1, explain: "SELECT projette les colonnes." },
      { id: "b2", theme: "bases", themeLabel: "Bases", question: "FROM indique…", options: ["Le tri", "La table source", "La clé primaire uniquement", "Un graphique"], answer: 1, explain: "FROM = source." },
      { id: "b3", theme: "filtre", themeLabel: "Filtres", question: "Filtrer Kinshasa ?", options: ["WHERE ville == Kinshasa", "WHERE ville = 'Kinshasa'", "FILTER ville Kinshasa", "HAVING ville"], answer: 1, explain: "WHERE + quotes." },
      { id: "b4", theme: "filtre", themeLabel: "Filtres", question: "Tester un NULL ?", options: ["= NULL", "IS NULL", "NULL?", "EMPTY"], answer: 1, explain: "IS NULL." },
      { id: "b5", theme: "tri", themeLabel: "Tris", question: "Top montants :", options: ["ORDER BY montant_cdf ASC", "ORDER BY montant_cdf DESC", "SORT montant", "GROUP montant"], answer: 1, explain: "DESC pour le haut du classement." },
      { id: "b6", theme: "agg", themeLabel: "Agrégats", question: "Total des ventes :", options: ["COUNT(montant_cdf)", "SUM(montant_cdf)", "AVG only", "JOIN"], answer: 1, explain: "SUM pour totaliser." },
      { id: "b7", theme: "agg", themeLabel: "Agrégats", question: "Avec SELECT ville, SUM(...) il faut souvent…", options: ["DELETE ville", "GROUP BY ville", "DROP ville", "NULL ville"], answer: 1, explain: "GROUP BY la dimension." },
      { id: "b8", theme: "join", themeLabel: "Jointures", question: "Relier ventes et clients :", options: ["ON v.client_id = c.client_id", "WHERE random", "SELECT * only", "LIMIT join"], answer: 0, explain: "JOIN … ON clé." },
      { id: "b9", theme: "join", themeLabel: "Jointures", question: "LEFT JOIN garde…", options: ["Seulement la droite", "Toutes les lignes de gauche", "Aucune ligne", "Uniquement les NULL"], answer: 1, explain: "Gauche préservée." },
      { id: "b10", theme: "metier", themeLabel: "Métier", question: "Premier réflexe analyste ?", options: ["JOIN sans schéma", "Clarifier la question puis lire le schéma", "Supprimer les tables", "Éviter COUNT"], answer: 1, explain: "Question + schéma." },
      { id: "b11", theme: "bases", themeLabel: "Bases", question: "DISTINCT sert à…", options: ["Créer une table", "Dédoublonner le résultat", "Faire un JOIN", "Remplacer LIMIT"], answer: 1, explain: "Valeurs uniques." },
      { id: "b12", theme: "filtre", themeLabel: "Filtres", question: "Combiner deux conditions ?", options: ["AND / OR", "PLUS / MINUS", "JOIN / DROP", "ASC / DESC seulement"], answer: 0, explain: "AND / OR." },
      { id: "b13", theme: "agg", themeLabel: "Agrégats", question: "COUNT(*) compte…", options: ["Colonnes", "Lignes", "Fichiers", "Index"], answer: 1, explain: "Nombre de lignes." },
      { id: "b14", theme: "join", themeLabel: "Jointures", question: "type_client se trouve dans…", options: ["ventes uniquement", "clients", "nulle part", "sqlite_master seulement"], answer: 1, explain: "Table clients." },
      { id: "b15", theme: "metier", themeLabel: "Métier", question: "Après les KPI, un analyste…", options: ["S’arrête sans récit", "Formule constat + recommandation", "Efface la base", "Change de métier"], answer: 1, explain: "La décision clôt l’analyse." },
      { id: "b16", theme: "tri", themeLabel: "Tris", question: "LIMIT 5 après ORDER BY DESC donne…", options: ["5 plus petites valeurs", "Top 5", "5 colonnes", "5 tables"], answer: 1, explain: "Top N." },
      { id: "b17", theme: "bases", themeLabel: "Bases", question: "Alias de colonne :", options: ["AS", "IS", "ON", "BY"], answer: 0, explain: "AS nom." },
      { id: "b18", theme: "filtre", themeLabel: "Filtres", question: "Texte SQL entre…", options: ["Guillemets doubles obligatoires seulement", "Quotes simples '…'", "Parenthèses seules", "Crochets seuls"], answer: 1, explain: "'Kinshasa'." },
      { id: "b19", theme: "agg", themeLabel: "Agrégats", question: "AVG calcule…", options: ["La somme", "La moyenne", "Le minimum seulement", "Le schéma"], answer: 1, explain: "Moyenne." },
      { id: "b20", theme: "metier", themeLabel: "Métier", question: "SQL Atelier et Python Atelier…", options: ["S’opposent", "Se complètent (extraire / analyser)", "Sont identiques", "Remplacent Excel à eux seuls sans méthode"], answer: 1, explain: "Duo extract-analyze." }
    ]
  }
};
