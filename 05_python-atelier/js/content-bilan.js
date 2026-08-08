/* Python Atelier — quiz bilan, labo Anaconda, exercices supplémentaires */

(function () {
  if (!window.ATELIER) window.ATELIER = {};

  window.ATELIER.bilan = {
    title: "Quiz bilan — Data Analyst Python",
    subtitle: "Quiz approfondi — maîtrise junior (seuil 80 %).",
    passScore: 80,
    questions: [
      {
        id: "q1",
        theme: "fondations",
        themeLabel: "Fondations Python",
        question: "Que signifie le signe = en Python dans x = 5 ?",
        options: [
          "Comparer si x égale 5",
          "Stocker 5 dans la variable x",
          "Afficher 5",
          "Supprimer x"
        ],
        answer: 1,
        explain: "= assigne (stocke). La comparaison s’écrit ==."
      },
      {
        id: "q2",
        theme: "fondations",
        themeLabel: "Fondations Python",
        question: "Quelle est la bonne façon d’afficher du texte en Python 3 ?",
        options: ["Print(\"bonjour\")", "print \"bonjour\"", "print(\"bonjour\")", "echo(\"bonjour\")"],
        answer: 2,
        explain: "print en minuscules, avec des parenthèses."
      },
      {
        id: "q3",
        theme: "fondations",
        themeLabel: "Fondations Python",
        question: "Que produit range(3) ?",
        options: ["1, 2, 3", "0, 1, 2", "0, 1, 2, 3", "3 seulement"],
        answer: 1,
        explain: "range(3) → 0, 1, 2."
      },
      {
        id: "q4",
        theme: "fondations",
        themeLabel: "Fondations Python",
        question: "Quel est l’indice du premier élément d’une liste ?",
        options: ["1", "0", "-1", "Aucun"],
        answer: 1,
        explain: "Python compte à partir de 0."
      },
      {
        id: "q5",
        theme: "fondations",
        themeLabel: "Fondations Python",
        question: "Que fait return dans une fonction ?",
        options: [
          "Affiche forcément à l’écran",
          "Renvoie un résultat à l’appelant",
          "Ferme Python",
          "Crée un fichier CSV"
        ],
        answer: 1,
        explain: "return transmet une valeur ; print affiche."
      },
      {
        id: "q6",
        theme: "fichiers",
        themeLabel: "Fichiers CSV / Excel",
        question: "Symptôme classique d’un mauvais séparateur CSV ?",
        options: [
          "Le fichier disparaît",
          "Tout semble dans une seule colonne",
          "Python refuse de démarrer",
          "Les graphiques deviennent obligatoires"
        ],
        answer: 1,
        explain: "Souvent il faut sep=\";\"."
      },
      {
        id: "q7",
        theme: "fichiers",
        themeLabel: "Fichiers CSV / Excel",
        question: "Quelle fonction lit un fichier Excel (.xlsx) avec pandas ?",
        options: ["pd.read_csv", "pd.read_excel", "pd.open_xlsx", "excel.load"],
        answer: 1,
        explain: "pd.read_excel(\"...xlsx\")."
      },
      {
        id: "q8",
        theme: "pandas",
        themeLabel: "pandas & exploration",
        question: "Quel trio lance-t-on souvent juste après un import ?",
        options: [
          "plot / show / save",
          "head / info / describe",
          "merge / join / concat uniquement",
          "del / drop / clear"
        ],
        answer: 1,
        explain: "EDA de base : head, info, describe."
      },
      {
        id: "q9",
        theme: "pandas",
        themeLabel: "pandas & exploration",
        question: "Que fait df[df[\"ville\"] == \"Goma\"] ?",
        options: [
          "Supprime Goma",
          "Garde les lignes où ville vaut Goma",
          "Renomme la colonne ville",
          "Calcule la moyenne globale"
        ],
        answer: 1,
        explain: "C’est un filtre de lignes."
      },
      {
        id: "q10",
        theme: "pandas",
        themeLabel: "pandas & exploration",
        question: "groupby(\"ville\")[\"montant_cdf\"].sum() calcule…",
        options: [
          "La moyenne par produit",
          "Le total des montants pour chaque ville",
          "Le nombre de colonnes",
          "Un graphique automatique"
        ],
        answer: 1,
        explain: "Regroupement puis somme."
      },
      {
        id: "q11",
        theme: "pandas",
        themeLabel: "pandas & exploration",
        question: "À quoi sert un merge sur client_id ?",
        options: [
          "Supprimer les clients",
          "Relier ventes et fiches clients par une clé",
          "Convertir en Excel",
          "Installer pandas"
        ],
        answer: 1,
        explain: "La jointure enrichit une table via une clé."
      },
      {
        id: "q12",
        theme: "qualite",
        themeLabel: "Qualité des données",
        question: "Premier réflexe face aux valeurs manquantes ?",
        options: [
          "Les ignorer toujours",
          "Les détecter et les quantifier",
          "Supprimer tout le projet",
          "Changer de langage"
        ],
        answer: 1,
        explain: "Mesurer avant de traiter (isna().sum())."
      },
      {
        id: "q13",
        theme: "qualite",
        themeLabel: "Qualité des données",
        question: "Pourquoi convertir une colonne date avec to_datetime ?",
        options: [
          "Pour changer la couleur",
          "Pour pouvoir analyser par mois / tendance",
          "Pour effacer les ventes",
          "Parce que CSV l’exige toujours"
        ],
        answer: 1,
        explain: "Les dates typées ouvrent l’analyse temporelle."
      },
      {
        id: "q14",
        theme: "qualite",
        themeLabel: "Qualité des données",
        question: "Face à un outlier, un analyste digne…",
        options: [
          "Le supprime sans regarder",
          "L’investigue avant de décider",
          "Ignore toute la colonne",
          "Redémarre l’ordinateur"
        ],
        answer: 1,
        explain: "Un extrême peut être une erreur… ou un fait métier."
      },
      {
        id: "q15",
        theme: "viz",
        themeLabel: "Visualisation & communication",
        question: "Pour comparer les totaux de 5 villes, le meilleur premier choix est…",
        options: ["Un camembert très coloré", "Un diagramme en barres", "Un nuage 3D", "Aucun titre"],
        answer: 1,
        explain: "Barres = comparaison de catégories lisible."
      },
      {
        id: "q16",
        theme: "viz",
        themeLabel: "Visualisation & communication",
        question: "Structure de conclusion professionnelle ?",
        options: [
          "Couleur / Police / Animation",
          "Constat / Interprétation / Recommandation",
          "CSV / Excel / PDF seulement",
          "Import / Def / Return"
        ],
        answer: 1,
        explain: "Le graphique doit mener à une décision."
      },
      {
        id: "q17",
        theme: "metier",
        themeLabel: "Posture Data Analyst",
        question: "Que fait d’abord un Data Analyst digne de ce nom ?",
        options: [
          "Ouvre pandas sans question",
          "Cadre une question métier claire",
          "Maximise le nombre de couleurs",
          "Évite les contrôles qualité"
        ],
        answer: 1,
        explain: "La question précède l’outil."
      },
      {
        id: "q18",
        theme: "metier",
        themeLabel: "Posture Data Analyst",
        question: "Quel pipeline est le plus sain ?",
        options: [
          "Graphique → import → question",
          "Question → import → explorer → nettoyer → analyser → visualiser → conclure",
          "Nettoyer → conclure sans données",
          "Installer 20 bibliothèques puis s’arrêter"
        ],
        answer: 1,
        explain: "C’est le fil conducteur du métier."
      },
      {
        id: "q19",
        theme: "stats",
        themeLabel: "Statistiques utiles",
        question: "Si la moyenne est très supérieure à la médiane, on suspecte souvent…",
        options: [
          "Une indentation fausse",
          "Des valeurs extrêmes",
          "Un séparateur CSV",
          "Un manque de mémoire RAM"
        ],
        answer: 1,
        explain: "L’écart moyenne/médiane alerte sur la distribution."
      },
      {
        id: "q20",
        theme: "metier",
        themeLabel: "Posture Data Analyst",
        question: "Où travailler concrètement le projet ventes avec vos fichiers data/ ?",
        options: [
          "Uniquement dans le navigateur, sans Jupyter",
          "Dans Jupyter / Anaconda, à la racine du projet python-atelier",
          "Sans jamais ouvrir les CSV",
          "Seulement sur un téléphone"
        ],
        answer: 1,
        explain: "Anaconda + Jupyter + dossier du projet = labo professionnel."
      },
      { id: "b-mastery-1", theme: "maitrise", themeLabel: "Maîtrise", question: "Un merge pandas non contrôlé peut…", options: ["Toujours être sans risque", "Dupliquer des lignes (cardinalité)", "Remplacer groupby", "Corriger les dtypes"], answer: 1, explain: "Cardinalité." },
      { id: "b-mastery-2", theme: "maitrise", themeLabel: "Maîtrise", question: "Seuil quiz bilan maîtrise…", options: ["50 %", "70 %", "80 %", "0 %"], answer: 2, explain: "80 %." }
    ]
  };

  window.ATELIER.labo = {
    title: "Labo local — Anaconda & Jupyter",
    subtitle: "Vous avez déjà Anaconda Navigator et Jupyter Notebook : parfait. Voici comment les brancher sur Python Atelier.",
    steps: [
      {
        title: "1. Ouvrir le bon dossier",
        text: "Le projet est ici : C:\\Users\\FIDELE\\Projects\\python-atelier. Les données sont dans le sous-dossier data\\ (ventes.csv, clients.csv, etc.)."
      },
      {
        title: "2. Lancer Jupyter depuis Anaconda Navigator",
        text: "Ouvrez Anaconda Navigator → cliquez Launch sous Jupyter Notebook (ou JupyterLab). Une page s’ouvre dans le navigateur."
      },
      {
        title: "3. Naviguer jusqu’au projet",
        text: "Dans Jupyter, parcourez Users → FIDELE → Projects → python-atelier. Ouvrez le dossier notebooks\\."
      },
      {
        title: "4. Ouvrir le projet métier",
        text: "Ouvrez projet_analyste_ventes.ipynb. Exécutez les cellules une par une (Shift+Entrée). Le notebook lit les CSV via des chemins relatifs ../data/...."
      },
      {
        title: "5. Bonnes pratiques",
        text: "Travaillez cellule par cellule. Si un fichier n’est pas trouvé, vérifiez que le notebook est bien dans notebooks\\ et que data\\ existe au niveau parent. Réexécutez Kernel → Restart & Run All si besoin."
      }
    ],
    checklist: [
      "Anaconda Navigator installé (déjà fait)",
      "Jupyter Notebook accessible (déjà fait)",
      "Dossier python-atelier localisé",
      "Notebook projet_analyste_ventes.ipynb ouvert",
      "Cellules exécutées sans FileNotFoundError",
      "3 recommandations métier rédigées à la fin"
    ]
  };

  // Exercices supplémentaires rattachés au carnet
  const extraSections = [
    {
      title: "D. Entraînement Anaconda / Jupyter",
      exercises: [
        {
          id: "cD1",
          prompt: "Dans Jupyter, importez pandas, puis affichez pd.__version__."
        },
        {
          id: "cD2",
          prompt: "Depuis notebooks/, chargez ../data/ventes.csv et affichez df.shape."
        },
        {
          id: "cD3",
          prompt: "Affichez les 10 premières lignes, puis df.dtypes."
        },
        {
          id: "cD4",
          prompt: "Calculez le taux de manquants par colonne en pourcentage."
        },
        {
          id: "cD5",
          prompt: "Créez un filtre Kinshasa + montant_cdf >= 300000 et comptez les lignes."
        }
      ]
    },
    {
      title: "E. Projet métier — livrables",
      exercises: [
        {
          id: "cE1",
          prompt: "Rédigez le brief en 5 lignes : contexte, données, question principale, KPI, décision attendue."
        },
        {
          id: "cE2",
          prompt: "Produisez un tableau total par ville + un tableau total par type_client (après merge)."
        },
        {
          id: "cE3",
          prompt: "Tracez l’évolution mensuelle des ventes (courbe ou barres) avec titre et axes."
        },
        {
          id: "cE4",
          prompt: "Identifiez le produit le plus contributeur et justifiez en une phrase chiffrée."
        },
        {
          id: "cE5",
          prompt: "Écrivez 3 recommandations actionnables (stock, ciblage, qualité données)."
        },
        {
          id: "cE6",
          prompt: "Préparez une mini-soutenance orale de 2 minutes : 1 constat, 1 graphique, 1 décision."
        }
      ]
    },
    {
      title: "F. Quiz blanc (à faire après le bilan)",
      exercises: [
        {
          id: "cF1",
          prompt: "Sans regarder vos notes : citez le pipeline en 7 étapes du Data Analyst."
        },
        {
          id: "cF2",
          prompt: "Écrivez de mémoire le code d’un groupby somme par ville."
        },
        {
          id: "cF3",
          prompt: "Expliquez à un non-informaticien la différence entre moyenne et médiane (4 phrases max)."
        }
      ]
    },
    {
      title: "G. Épreuve de maîtrise (transfert)",
      exercises: [
        { id: "cG1", prompt: "Sans guide : chargez un CSV « sale » (séparateur/typage). Listez dtypes, NA, et 3 corrections pandas." },
        { id: "cG2", prompt: "Justifiez 3 choix : merge how=, groupby agrégat, gestion NA." },
        { id: "cG3", prompt: "Détectez 2 pièges : merge many-to-many non contrôlé ; groupby sur object mal typé ; fillna(0) silencieux." },
        { id: "cG4", prompt: "Notebook transfert : KPI + 1 merge + 1 groupby + note 6 lignes." },
        { id: "cG5", prompt: "Auto-éval (0–2) : transfert · justification · erreurs · quiz ≥80 %." },
      ],
    }
  ];

  if (window.ATELIER.carnet && Array.isArray(window.ATELIER.carnet.sections)) {
    window.ATELIER.carnet.sections = window.ATELIER.carnet.sections.concat(extraSections);
  } else {
    window.ATELIER.carnet = {
      title: "Carnet d’exercices — Python Atelier",
      subtitle: "Entraînement imprimable",
      sections: extraSections
    };
  }
})();
