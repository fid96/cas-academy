/* Statistiques Atelier — contenu pédagogique */

window.ATELIER = {
  brand: "Statistiques Atelier",
  mission:
    "Maîtriser la lecture des chiffres sous incertitude — pour décider comme un Data Analyst junior opérationnel.",
  tracks: [
    {
      id: "fondations",
      title: "Fondations statistiques",
      subtitle: "Décrire un jeu de données avec clarté.",
      goal: "Effectifs, moyenne, médiane, pourcentages, min/max."
    },
    {
      id: "data-analyst",
      title: "Stats pour Data Analyst",
      subtitle: "Comparer, interpréter, approfondir, décider.",
      goal: "Comparaisons, échantillonnage, pièges, note défendable, épreuve de transfert."
    }
  ],
  method: {
    title: "La méthode en quatre gestes",
    steps: [
      { num: "01", title: "Voir", text: "On regarde la question et le tableau avant tout calcul." },
      { num: "02", title: "Comprendre", text: "On choisit l’indicateur juste : total, moyenne, %, médiane…" },
      { num: "03", title: "Pratiquer", text: "On calcule sur les ventes santé, à la main ou dans le labo." },
      { num: "04", title: "Vérifier", text: "On contrôle le sens du résultat, puis on ancre avec un quiz." }
    ],
    principles: [
      {
        title: "Un chiffre sans question est du bruit",
        text: "Toujours : quelle décision ce KPI éclaire-t-il ?"
      },
      {
        title: "Moyenne ≠ vérité seule",
        text: "Une moyenne peut cacher des extrêmes. La médiane et le min/max complètent le portrait."
      },
      {
        title: "Comparer à bon escient",
        text: "Même unité, même période, populations comparables — sinon la comparaison ment."
      },
      {
        title: "Complément du trio technique",
        text: "SQL/Excel/Python produisent des chiffres. Les stats disent s’ils ont du sens."
      }
    ]
  },
  glossary: [
    { term: "Effectif (n)", def: "Nombre d’observations (lignes) dans le calcul." },
    { term: "Total / Somme", def: "Addition de toutes les valeurs." },
    { term: "Moyenne", def: "Somme divisée par le nombre de valeurs." },
    { term: "Médiane", def: "Valeur du milieu quand on trie la liste." },
    { term: "Minimum / Maximum", def: "Plus petite et plus grande valeur." },
    { term: "Pourcentage / Part", def: "Proportion sur 100 : (partie / tout) × 100." },
    { term: "KPI", def: "Indicateur clé suivi pour piloter une activité." },
    { term: "Valeur manquante", def: "Case vide (NULL) — à compter avant de conclure." },
    { term: "Biais", def: "Déformation du résultat par une mauvaise méthode ou un mauvais échantillon." },
    { term: "Comparaison relative", def: "Écart en % par rapport à une référence." },
    { term: "Outlier / Extrême", def: "Valeur très éloignée des autres, qui tire la moyenne." },
    { term: "Interprétation", def: "Traduction du chiffre en constat utile à un décideur." },
    { term: "Échantillon", def: "Sous-ensemble observé ; ses conclusions ne valent que si le tirage est représentatif." },
    { term: "Distribution", def: "Façon dont les valeurs se répartissent (centrées, étirées, asymétriques…)." },
    { term: "Causalité", def: "Lien cause → effet ; une simple corrélation ne la prouve pas." },
    { term: "Transfert", def: "Capacité à analyser un jeu / période nouveau sans refaire le tutoriel guidé." }
  ],
  pieges: [
    {
      title: "Moyenne tirée par un extrême",
      text: "Une seule très grosse vente peut faire monter la moyenne. Regardez aussi médiane, min et max."
    },
    {
      title: "Pourcentage sans dénominateur clair",
      text: "« +50 % » de quoi ? Par rapport à quelle base ? Toujours préciser le tout."
    },
    {
      title: "Comparer des inégalités",
      text: "Comparer Kinshasa (beaucoup de lignes) à une ville avec 2 ventes sans le dire fausse le récit."
    },
    {
      title: "Oublier les valeurs manquantes",
      text: "Si quantite est vide, la moyenne des quantités ignore ces lignes — mentionnez-le."
    },
    {
      title: "Corrélation n’est pas causalité",
      text: "Deux courbes qui montent ensemble ne prouvent pas qu’une cause l’autre."
    },
    {
      title: "Graphique trompeur",
      text: "Un axe qui ne commence pas à zéro peut exagérer une petite différence."
    },
    {
      title: "Généraliser hors échantillon",
      text: "Conclure pour « tout le pays » à partir d’un mois ou d’une ville sans le dire est un biais de couverture."
    },
    {
      title: "Petit n, grande histoire",
      text: "Avec n=2 ou n=3, un écart de revue peut être du bruit. Exigez l’effectif avant l’alarme."
    }
  ],
  modules: [
    {
      id: "m1",
      title: "Penser en indicateurs",
      track: "fondations",
      level: "Fondations",
      image: "assets/illu-logique.jpg",
      summary: "De la question métier au bon chiffre.",
      lessons: [
        {
          id: "m1-l1",
          title: "Qu’est-ce qu’un bon indicateur ?",
          goal: "Relier question, population et mesure.",
          image: "assets/illu-donnees.jpg",
          caption: "Un KPI répond à une question, pas l’inverse.",
          voir: {
            paragraphs: [
              "« Comment vont les ventes ? » est trop vague. Mieux : « Quel est le total des montants sur la période ? » ou « Quelle ville pèse le plus ? »",
              "Les stats descriptives résument un tableau pour décider."
            ],
            analogy: {
              title: "Analogie du tableau de bord voiture",
              text: "La vitesse est un indicateur. Elle ne dit pas tout, mais elle répond à une question précise pendant la route."
            }
          },
          comprendre: {
            paragraphs: ["Trois éléments d’un indicateur propre :"],
            bullets: [
              "Population : quelles lignes ? (toutes les ventes, une ville…)",
              "Mesure : total, moyenne, %…",
              "Unité / période : CDF, janvier–mars…"
            ],
            code: {
              label: "brief.txt",
              lines: "Question : Quelle ville concentre le plus de chiffre d’affaires ?\nMesure : somme(montant_cdf) par ville\nLecture : part (%) de chaque ville"
            },
            annotation: "Sans brief, le calcul est décoratif."
          },
          pratiquer: {
            prompt: "Formulez une question métier précise sur les ventes (1–2 phrases) et citez la mesure que vous calculeriez.",
            placeholder: "Question : …\nMesure : …",
            hint: "Ex. total, moyenne, part d’une ville",
            checkType: "keywords",
            keywords: ["?"],
            success: "Bien : vous partez d’une question.",
            fail: "Posez une vraie question (avec ?)."
          },
          verifier: {
            question: "Un bon KPI commence par…",
            options: ["Un graphique 3D", "Une question claire", "Supprimer les moyennes", "Ignorer les unités"],
            answer: 1,
            explain: "La question guide le calcul."
          },
          retenir: [
            "Question → population → mesure.",
            "Préciser unité et période.",
            "Le KPI sert la décision."
          ]
        },
        {
          id: "m1-l2",
          title: "Effectif, total, unité",
          goal: "Ne jamais publier un chiffre sans n et unité.",
          image: "assets/illu-variables.jpg",
          caption: "n = combien de lignes derrière le résumé.",
          voir: {
            paragraphs: [
              "Dire « moyenne 250 000 » sans dire « sur 30 ventes, en CDF » prête à confusion.",
              "L’effectif (n) protège le lecteur : 2 lignes ≠ 2000 lignes."
            ],
            analogy: {
              title: "Analogie du verdict médical",
              text: "« Température élevée » ne suffit pas : chez combien de patients, avec quel thermomètre ?"
            }
          },
          comprendre: {
            paragraphs: ["Checklist minimale :"],
            bullets: [
              "n (effectif)",
              "unité (CDF, unités physiques…)",
              "période ou filtre appliqué",
              "présence éventuelle de valeurs manquantes"
            ],
            code: {
              label: "exemple",
              lines: "Total montant = 6 785 000 CDF\nn = 30 ventes\nPériode = janv.–mars 2024"
            },
            annotation: "Le contexte fait partie du résultat."
          },
          pratiquer: {
            prompt: "Réécrivez ce résultat flou en version propre : « moyenne 200000 ». Ajoutez n, unité, objet.",
            placeholder: "Moyenne du montant_cdf = … CDF (n = …)",
            hint: "montant, CDF, n",
            checkType: "keywords",
            keywords: ["n", "cdf"],
            success: "Oui : contexte + unité.",
            fail: "Mentionnez au moins n et CDF."
          },
          verifier: {
            question: "Pourquoi indiquer n ?",
            options: ["Pour décorer", "Pour savoir sur combien d’observations repose le chiffre", "Pour remplacer l’unité", "Pour cacher les erreurs"],
            answer: 1,
            explain: "n mesure la solidité du résumé."
          },
          retenir: [
            "Toujours n + unité.",
            "Dire le filtre utilisé.",
            "Un chiffre nu est fragile."
          ]
        }
      ]
    },
    {
      id: "m2",
      title: "Moyenne et médiane",
      track: "fondations",
      level: "Fondations",
      image: "assets/illu-conditions.jpg",
      summary: "Deux centres différents — utiles tous les deux.",
      lessons: [
        {
          id: "m2-l1",
          title: "Calculer une moyenne",
          goal: "Maîtriser somme ÷ n et son sens métier.",
          image: "assets/illu-analyste.jpg",
          caption: "La moyenne répond : « en typique, autour de combien ? »",
          voir: {
            paragraphs: [
              "Moyenne des montants = total des montants ÷ nombre de ventes.",
              "Utile pour un niveau « habituel », mais sensible aux extrêmes."
            ],
            analogy: {
              title: "Analogie des salaires",
              text: "Si un directeur gagne très cher, la moyenne salariale monte — sans que la plupart aient ce salaire."
            }
          },
          comprendre: {
            paragraphs: ["Formule :"],
            bullets: [
              "moyenne = somme(valeurs) / n",
              "N’inclure que les valeurs numériques valides",
              "Comparer ensuite avec médiane / min / max"
            ],
            code: {
              label: "pense-bete",
              lines: "moyenne_montant = SOMME(montant) / NB(montant)\nDans le labo : carte « Moyenne montant »"
            },
            annotation: "Le labo calcule pour vous ; vous interprétez."
          },
          pratiquer: {
            prompt: "Si 3 ventes font 100, 200 et 300, quelle est la moyenne ? (réponse numérique)",
            placeholder: "200",
            hint: "(100+200+300)/3",
            checkType: "regex",
            pattern: "^\\s*200\\s*$",
            success: "Exact : 200.",
            fail: "Calculez (100+200+300)/3."
          },
          verifier: {
            question: "La moyenne est…",
            options: ["Toujours égale à la médiane", "La somme divisée par n", "Le maximum", "Un pourcentage"],
            answer: 1,
            explain: "somme / n."
          },
          retenir: [
            "Moyenne = somme / n.",
            "Sensible aux extrêmes.",
            "À compléter par d’autres indicateurs."
          ]
        },
        {
          id: "m2-l2",
          title: "Médiane : le milieu",
          goal: "Comprendre quand la médiane raconte mieux la réalité.",
          image: "assets/illu-logique.jpg",
          caption: "On trie, on prend la valeur du centre.",
          voir: {
            paragraphs: [
              "Liste triée : 54 000 ; 90 000 ; 440 000. Médiane = 90 000.",
              "Si une valeur est énorme, la médiane bouge moins que la moyenne."
            ],
            analogy: {
              title: "Analogie de la file d’attente",
              text: "La personne du milieu représente mieux « le cas typique » que la moyenne tirée par un géant."
            }
          },
          comprendre: {
            paragraphs: ["Règle simple :"],
            bullets: [
              "Trier les valeurs",
              "n impair : valeur centrale",
              "n pair : moyenne des deux valeurs centrales",
              "Analyste : publier moyenne ET médiane si elles divergent"
            ],
            code: {
              label: "signal",
              lines: "Si moyenne >> médiane :\n→ présence probable de montants élevés extrêmes"
            },
            annotation: "L’écart moyenne/médiane est un signal."
          },
          pratiquer: {
            prompt: "Valeurs : 10, 20, 1000. Moyenne et médiane ? Écrivez : moyenne=… ; médiane=…",
            placeholder: "moyenne=343.33 ; médiane=20",
            hint: "Milieu après tri = 20",
            checkType: "keywords",
            keywords: ["médiane", "20"],
            success: "Oui : la médiane reste 20, la moyenne est tirée vers le haut.",
            fail: "Mentionnez la médiane 20."
          },
          verifier: {
            question: "La médiane résiste mieux que la moyenne aux…",
            options: ["En-têtes", "Valeurs extrêmes", "Filtres Excel", "Couleurs de graphique"],
            answer: 1,
            explain: "Les extrêmes déplacent surtout la moyenne."
          },
          retenir: [
            "Médiane = milieu trié.",
            "Utile si distribution asymétrique.",
            "Comparer moyenne vs médiane."
          ]
        }
      ]
    },
    {
      id: "m3",
      title: "Pourcentages et parts",
      track: "fondations",
      level: "Fondations",
      image: "assets/illu-donnees.jpg",
      summary: "Transformer un total en poids relatif.",
      lessons: [
        {
          id: "m3-l1",
          title: "Part = partie / tout",
          goal: "Calculer et lire un pourcentage métier.",
          image: "assets/illu-analyste.jpg",
          caption: "Kinshasa représente X % du montant total.",
          voir: {
            paragraphs: [
              "Part (%) = (montant du groupe / montant total) × 100.",
              "C’est l’outil n°1 pour dire « qui pèse lourd »."
            ],
            analogy: {
              title: "Analogie du budget familial",
              text: "Savoir que le loyer prend 40 % du budget parle plus que le seul montant du loyer."
            }
          },
          comprendre: {
            paragraphs: ["Piège classique : changer le dénominateur sans le dire."],
            bullets: [
              "Toujours écrire le tout (dénominateur)",
              "Les parts d’un découpage complet ≈ 100 %",
              "Arrondir à 1 décimale suffit souvent"
            ],
            code: {
              label: "formule",
              lines: "part_ville = 100 * somme_ville / somme_totale"
            },
            annotation: "Le labo affiche la part de Kinshasa en un clic."
          },
          pratiquer: {
            prompt: "Si Kinshasa = 3 000 000 et total = 6 000 000, quelle part (%) ?",
            placeholder: "50",
            hint: "3000000/6000000*100",
            checkType: "regex",
            pattern: "^\\s*50\\s*%?\\s*$",
            success: "Oui : 50 %.",
            fail: "Le résultat est 50."
          },
          verifier: {
            question: "Dans part = partie/tout, le tout est…",
            options: ["Optionnel", "Le dénominateur de référence", "Toujours 30", "La médiane"],
            answer: 1,
            explain: "Sans dénominateur clair, le % ment."
          },
          retenir: [
            "% = partie / tout × 100.",
            "Nommer le tout.",
            "Utile pour prioriser."
          ]
        }
      ]
    },
    {
      id: "m4",
      title: "Min, max et dispersion simple",
      track: "fondations",
      level: "Fondations",
      image: "assets/illu-conditions.jpg",
      summary: "Voir l’étendue avant de conclure.",
      lessons: [
        {
          id: "m4-l1",
          title: "Lire min et max",
          goal: "Situer le champ des possibles.",
          image: "assets/illu-variables.jpg",
          caption: "Du plus petit montant au plus grand.",
          voir: {
            paragraphs: [
              "Min et max donnent l’étendue. Une moyenne de 200 000 n’a pas le même sens si les ventes vont de 50 000 à 480 000.",
              "Ils aident aussi à détecter des erreurs (montant négatif, zéro absurde…)."
            ],
            analogy: {
              title: "Analogie de la température",
              text: "Dire « 25 °C en moyenne » sans dire qu’il a fait 10 °C la nuit et 38 °C le jour perd la réalité du climat."
            }
          },
          comprendre: {
            paragraphs: ["Réflexe analyste :"],
            bullets: [
              "Publier min–max avec la moyenne",
              "Vérifier les extrêmes : erreur ou vrai événement ?",
              "Compter les valeurs manquantes à part"
            ],
            code: {
              label: "controle",
              lines: "min / moyenne / médiane / max\n+ nb de NULL sur quantite"
            },
            annotation: "Le portrait en 5 chiffres vaut mieux qu’un seul."
          },
          pratiquer: {
            prompt: "Pourquoi regarder le max en plus de la moyenne ? (2 phrases)",
            placeholder: "…",
            hint: "extrême, erreur, réalité",
            checkType: "minLines",
            minLines: 2,
            success: "Bonne intuition de contrôle.",
            fail: "Développez en 2 phrases."
          },
          verifier: {
            question: "Min et max servent surtout à…",
            options: ["Remplacer n", "Décrire l’étendue et contrôler les extrêmes", "Calculer un JOIN", "Effacer les %"],
            answer: 1,
            explain: "Étendue + contrôle qualité."
          },
          retenir: [
            "Min/max = étendue.",
            "Contrôler les extrêmes.",
            "Compléter la moyenne."
          ]
        }
      ]
    },
    {
      id: "m5",
      title: "Comparer des groupes",
      track: "data-analyst",
      level: "Data Analyst",
      image: "assets/illu-analyste.jpg",
      summary: "Ville A vs ville B : écart absolu et relatif.",
      lessons: [
        {
          id: "m5-l1",
          title: "Comparaison juste",
          goal: "Comparer moyennes/totaux en rappelant n.",
          image: "assets/illu-donnees.jpg",
          caption: "Même mesure, groupes clairs, écart en %.",
          voir: {
            paragraphs: [
              "Pour comparer Kinshasa et Goma : totals, moyennes, et effectifs.",
              "Écart relatif ≈ (A − B) / B × 100."
            ],
            analogy: {
              title: "Analogie du match",
              text: "Comparer le score sans dire le temps de jeu de chaque équipe fausse le jugement."
            }
          },
          comprendre: {
            paragraphs: ["Conditions d’une comparaison honnête :"],
            bullets: [
              "Même indicateur (ex. moyenne montant)",
              "Période comparable",
              "n suffisant de chaque côté (sinon prudence)",
              "Dire si on compare total ou moyenne"
            ],
            code: {
              label: "labo",
              lines: "Labo chiffres → mode Comparer\nChoisir ville A et ville B"
            },
            annotation: "Le labo calcule l’écart ; vous rédigez le constat."
          },
          pratiquer: {
            prompt: "Écrivez une phrase de comparaison type : « A est supérieur à B de X % sur la moyenne, avec nA=… et nB=… ».",
            placeholder: "…",
            hint: "Incluez le % et les n",
            checkType: "keywords",
            keywords: ["%"],
            success: "Structure de comparaison correcte.",
            fail: "Incluez un pourcentage dans la phrase."
          },
          verifier: {
            question: "Comparer seulement les totaux sans n peut…",
            options: ["Être trompeur si les volumes diffèrent", "Remplacer la médiane", "Supprimer les filtres", "Créer des CSV"],
            answer: 0,
            explain: "Un gros total peut venir d’un gros volume."
          },
          retenir: [
            "Comparer avec n.",
            "Absolu + relatif.",
            "Même mesure des deux côtés."
          ]
        }
      ]
    },
    {
      id: "m6",
      title: "Qualité des données",
      track: "data-analyst",
      level: "Data Analyst",
      image: "assets/illu-conditions.jpg",
      summary: "NULL, extrêmes, définitions — avant le storytelling.",
      lessons: [
        {
          id: "m6-l1",
          title: "Ce qui manque fausse le récit",
          goal: "Intégrer les manquants dans l’interprétation.",
          image: "assets/illu-variables.jpg",
          caption: "Une quantité vide n’est pas un zéro.",
          voir: {
            paragraphs: [
              "Dans nos ventes, au moins une quantité est manquante. La moyenne des quantités ignore cette ligne.",
              "Un analyste le signale : « moyenne calculée sur n valides, k manquants »."
            ],
            analogy: {
              title: "Analogie du registre incomplet",
              text: "Si 5 fiches n’ont pas d’âge, on ne dit pas que personne n’a d’âge : on dit que l’info manque."
            }
          },
          comprendre: {
            paragraphs: ["Gestes :"],
            bullets: [
              "Compter les NULL",
              "Ne pas remplacer silencieusement par 0 sans règle métier",
              "Séparer « zéro réel » et « inconnu »",
              "Documenter le choix dans la note"
            ],
            code: {
              label: "phrase-type",
              lines: "Moyenne quantité = …\ncalculée sur 29 lignes (1 valeur manquante)."
            },
            annotation: "La transparence construit la confiance."
          },
          pratiquer: {
            prompt: "Rédigez une phrase honnête signalant 1 quantité manquante sur 30 ventes.",
            placeholder: "…",
            hint: "manquante / NULL / 29",
            checkType: "keywords",
            keywords: ["manqu"],
            success: "Oui : vous rendez le calcul transparent.",
            fail: "Mentionnez le caractère manquant."
          },
          verifier: {
            question: "Une cellule vide (NULL)…",
            options: ["Est forcément égale à 0", "Signifie souvent une information absente", "Supprime la moyenne à jamais", "Remplace le max"],
            answer: 1,
            explain: "Absent ≠ zéro, sauf règle métier explicite."
          },
          retenir: [
            "Compter les manquants.",
            "NULL ≠ 0 par défaut.",
            "Le dire dans le livrable."
          ]
        }
      ]
    },
    {
      id: "m8",
      title: "Approfondissement — maîtrise",
      track: "data-analyst",
      level: "Maîtrise",
      image: "assets/illu-conditions.jpg",
      summary: "Échantillonnage, causalité opérationnelle, comparaison sous pièges — avant l’épreuve.",
      lessons: [
        {
          id: "m8-l1",
          title: "Échantillon, couverture, distribution",
          goal: "Limiter les conclusions à ce que l’échantillon permet vraiment.",
          image: "assets/illu-donnees.jpg",
          caption: "Vos 30 ventes ne sont pas « tout le pays ».",
          voir: {
            paragraphs: [
              "Un fichier est toujours un échantillon d’une réalité plus large : période, zones, canaux couverts.",
              "La distribution des montants (min, max, moyenne vs médiane) dit si le portrait est stable ou tiré par des extrêmes."
            ],
            analogy: {
              title: "Analogie du puits de village",
              text: "Goûter l’eau d’un seul puits ne prouve pas que tous les puits du territoire sont potables."
            }
          },
          comprendre: {
            paragraphs: ["Avant toute généralisation, notez :"],
            bullets: [
              "Période couverte (ex. jan–mars)",
              "Unités / zones présentes (et absentes)",
              "n effectif vs n souhaité",
              "Forme : moyenne ≈ médiane ou non",
              "Phrase type : « Sur cet échantillon… »"
            ],
            code: {
              label: "cadre",
              lines: "Périmètre : ventes santé, 3 mois, 5 villes\nn = 30\nLimite : pas de zone rurale hors liste\n→ conclusions valables dans ce cadre"
            },
            annotation: "Labo → mode Transfert : filtrez un mois et bornez votre récit."
          },
          pratiquer: {
            prompt: "En 4 lignes : période, n, 1 zone absente possible, 1 phrase « Sur cet échantillon… ».",
            placeholder: "1) Période : …\n2) n : …\n3) Absente : …\n4) Sur cet échantillon…",
            hint: "échantillon / période / n",
            checkType: "keywords",
            keywords: ["échantillon"],
            success: "Cadre d’inférence posé.",
            fail: "Mentionnez explicitement l’échantillon."
          },
          verifier: {
            question: "Généraliser à tout le pays à partir d’un mois et de 5 villes…",
            options: [
              "Est toujours valide si la moyenne est belle",
              "Dépasse le cadre sauf preuve de représentativité",
              "Est obligatoire pour un KPI",
              "Remplace le calcul de n"
            ],
            answer: 1,
            explain: "Couverture et représentativité d’abord."
          },
          retenir: [
            "Fichier = échantillon.",
            "Nommer le périmètre.",
            "Distribution complète le total."
          ]
        },
        {
          id: "m8-l2",
          title: "Corrélation ≠ causalité (terrain)",
          goal: "Écrire un constat prudent quand deux indicateurs bougent ensemble.",
          image: "assets/illu-variables.jpg",
          caption: "Deux courbes qui montent ≠ une cause prouvée.",
          voir: {
            paragraphs: [
              "Exemple : plus de tests rapides et plus de CA diagnostic le même mois — lien possible, pas preuve que les tests « causent » le CA sans autre facteur.",
              "L’analyste junior maîtrise le langage : association, hypothèse, besoin d’enquête — pas d’affirmation magique."
            ],
            analogy: {
              title: "Analogie des parapluies et de la pluie",
              text: "On voit plus de parapluies les jours de pluie ; ce n’est pas le parapluie qui fait pleuvoir."
            }
          },
          comprendre: {
            paragraphs: ["Réflexe opérationnel :"],
            bullets: [
              "Dire « associé à » plutôt que « causé par »",
              "Lister 2 autres explications possibles (saison, campagne, stock)",
              "Proposer une vérif (période, zone témoin, donnée manquante)",
              "Garder une recommandation d’investigation, pas une fausse certitude"
            ],
            code: {
              label: "phrase-type",
              lines: "Les ventes Diagnostic et le volume de tests\nmontanent ensemble en février.\nHypothèse : campagne de dépistage.\nÀ vérifier : stocks, prix, autres catégories."
            },
            annotation: "Dans la note : 1 association + 1 hypothèse + 1 vérif."
          },
          pratiquer: {
            prompt: "Rédigez 3 lignes : association observée, hypothèse, vérif proposée (sans affirmer la cause).",
            placeholder: "Association : …\nHypothèse : …\nVérif : …",
            hint: "associé / hypothèse",
            checkType: "keywords",
            keywords: ["hypoth"],
            success: "Posture causale maîtrisée.",
            fail: "Incluez une hypothèse (pas une cause affirmée)."
          },
          verifier: {
            question: "Deux indicateurs qui montent ensemble…",
            options: [
              "Prouvent toujours la causalité",
              "Suggèrent une association à investiguer",
              "Interdisent toute recommandation",
              "Remplacent n et l’unité"
            ],
            answer: 1,
            explain: "Association ≠ cause."
          },
          retenir: [
            "Association d’abord.",
            "Hypothèses alternatives.",
            "Vérifier avant d’affirmer."
          ]
        },
        {
          id: "m8-l3",
          title: "Comparer sous pièges",
          goal: "Détecter les comparaisons fragiles (petit n, bases différentes).",
          image: "assets/illu-analyste.jpg",
          caption: "Un écart sans n solide est une anecdote.",
          voir: {
            paragraphs: [
              "Comparer Goma (peu de lignes) à Kinshasa (beaucoup) sans le dire crée une fausse alerte ou une fausse victoire.",
              "Checklist : même mesure, même période, n des deux côtés, écart absolu + relatif, seuil de prudence si n < 5."
            ],
            analogy: {
              title: "Analogie des deux files d’attente",
              text: "Comparer le temps moyen d’une file de 2 personnes à une file de 200 sans le dire trompe le chef de poste."
            }
          },
          comprendre: {
            paragraphs: ["Avant de crier à l’écart :"],
            bullets: [
              "Afficher n_A et n_B",
              "Préférer médiane si extrêmes",
              "Écart relatif = (A−B)/B × 100",
              "Si n < 5 d’un côté : « signal fragile »",
              "Action : investiguer ou collecter plus, pas décider sur le bruit"
            ],
            code: {
              label: "checklist",
              lines: "Mesure OK ? Période OK ?\nn_A=… n_B=…\nÉcart % = …\nFragile si n<5 → le dire"
            },
            annotation: "Labo → Comparer + mode Transfert (mois filtré)."
          },
          pratiquer: {
            prompt: "Rédigez 4 lignes de revue d’une comparaison (mesure, n A/B, écart, verdict fragile ou solide).",
            placeholder: "1) Mesure : …\n2) n : …\n3) Écart : …\n4) Verdict : …",
            hint: "n / fragile",
            checkType: "keywords",
            keywords: ["n"],
            success: "Comparaison sous contrôle.",
            fail: "Rappelez les effectifs (n)."
          },
          verifier: {
            question: "Un écart de moyenne avec n=2 d’un côté…",
            options: [
              "Est une preuve définitive",
              "Doit être signalé comme fragile",
              "Autorise à cacher n",
              "Remplace le total"
            ],
            answer: 1,
            explain: "Petit n = prudence."
          },
          retenir: [
            "Toujours n des deux côtés.",
            "Absolu + relatif.",
            "Fragile ≠ décision ferme."
          ]
        }
      ]
    },
    {
      id: "m7",
      title: "Projet : note de décision",
      track: "data-analyst",
      level: "Projet",
      image: "assets/illu-analyste.jpg",
      summary: "Du labo à une note défendable pour un coordonnateur.",
      lessons: [
        {
          id: "m7-l1",
          title: "Constat → recommandation",
          goal: "Enchaîner KPI, comparaison, piège évité, action — livrable junior.",
          image: "assets/hero-atelier.jpg",
          caption: "Le décideur veut une action, pas 30 statistiques.",
          voir: {
            paragraphs: [
              "Livrable type : total, part de la ville leader, comparaison utile, 1 limite (manquants/extrêmes/échantillon), 3 recommandations.",
              "Enchaînez labo (y compris Transfert sur un mois) puis rédigez sans rouvrir le tutoriel."
            ],
            analogy: {
              title: "Analogie du briefing terrain",
              text: "On ne lit pas le registre entier à voix haute : on dit ce qui compte et ce qu’il faut faire."
            }
          },
          comprendre: {
            paragraphs: ["Structure de note (maîtrise) :"],
            bullets: [
              "1. Contexte (période, n, périmètre)",
              "2. 3 KPI avec unité",
              "3. 1 comparaison (n des deux côtés)",
              "4. 1 limite / prudence",
              "5. 3 actions recommandées",
              "6. 3 justifications de choix (indicateur, comparaison, limite)"
            ],
            code: {
              label: "plan",
              lines: "Total / moyenne / part Kinshasa\nComparer 2 villes (n!)\nSignaler manquants + cadre échantillon\nReco : prioriser, investiguer, suivre"
            },
            annotation: "Carnet D = épreuve de maîtrise. Quiz bilan seuil 80 %."
          },
          pratiquer: {
            prompt: "Rédigez une mini-note en 6 lignes (contexte+n, 2 KPI, comparaison, limite, reco, 1 justification).",
            placeholder: "1) …\n2) …\n3) …\n4) …\n5) …\n6) …",
            hint: "Une idée par ligne",
            checkType: "minLines",
            minLines: 6,
            success: "Note de niveau junior. Passez au carnet D puis au quiz bilan.",
            fail: "Il faut 6 lignes."
          },
          verifier: {
            question: "La fin d’une analyse data…",
            options: ["Doit éviter toute recommandation", "Doit proposer des actions liées aux chiffres", "Doit cacher n", "Doit maximiser le jargon"],
            answer: 1,
            explain: "Chiffre → décision."
          },
          retenir: [
            "Peu de KPI, bien choisis.",
            "Dire les limites.",
            "Finir par l’action."
          ]
        }
      ]
    }
  ],
  carnet: {
    title: "Carnet d’exercices — Statistiques Atelier",
    subtitle: "Calculs + labo + épreuve de maîtrise (transfert)",
    sections: [
      {
        title: "A. Fondations",
        exercises: [
          { id: "sA1", prompt: "Calculez à la main la moyenne de 120, 180, 90." },
          { id: "sA2", prompt: "Trouvez la médiane de 54k, 90k, 440k." },
          { id: "sA3", prompt: "Part : 2,1M / 7M ≈ ? %" },
          { id: "sA4", prompt: "Citez n, unité, période pour un KPI inventé." },
          { id: "sA5", prompt: "Pourquoi moyenne et médiane peuvent diverger ?" }
        ]
      },
      {
        title: "B. Data Analyst",
        exercises: [
          { id: "sB1", prompt: "Dans le labo : total et moyenne des montants." },
          { id: "sB2", prompt: "Labo : totaux par ville — quelle ville mène ?" },
          { id: "sB3", prompt: "Comparer Kinshasa vs Goma (moyenne + n)." },
          { id: "sB4", prompt: "Signaler les quantités manquantes." },
          { id: "sB5", prompt: "Rédiger 3 recommandations." },
          { id: "sB6", prompt: "Relier un KPI SQL/Excel à son interprétation stats." }
        ]
      },
      {
        title: "C. Pièges",
        exercises: [
          { id: "sC1", prompt: "Donnez un exemple de moyenne trompeuse." },
          { id: "sC2", prompt: "Corrigez : « les ventes ont augmenté de 50 % » (phrase complète)." },
          { id: "sC3", prompt: "Expliquez « corrélation ≠ causalité » en 3 phrases simples." }
        ]
      },
      {
        title: "D. Épreuve de maîtrise (transfert)",
        exercises: [
          {
            id: "sD1",
            prompt:
              "Labo mode Transfert — mois mars uniquement. Sans rouvrir les leçons : total, moyenne, médiane, n, part Kinshasa."
          },
          {
            id: "sD2",
            prompt:
              "Justifiez 3 choix : (1) moyenne vs médiane pour mars, (2) 2 villes comparées, (3) une limite d’échantillon."
          },
          {
            id: "sD3",
            prompt:
              "Détectez 2 erreurs dans ce récit faux : « Mars prouve que Goma est la meilleure ville du pays (moyenne plus haute) ; les tests causent le CA ; n inutile. »"
          },
          {
            id: "sD4",
            prompt:
              "Note défendable 8 lignes pour un coordonnateur (contexte mars, KPI, comparaison, limite, 2 reco, go/no-go sur une alerte)."
          },
          {
            id: "sD5",
            prompt: "Auto-évaluez (0–2 chacun) : transfert sans guide · justification · détection d’erreurs · seuil quiz ≥80 %."
          }
        ]
      }
    ]
  },
  bilan: {
    title: "Quiz bilan — Statistiques pour Data Analyst",
    subtitle: "26 questions — lecture, prudence, échantillonnage, maîtrise junior (seuil 80 %).",
    passScore: 80,
    questions: [
      { id: "b1", theme: "bases", themeLabel: "Bases", question: "Un bon KPI commence par…", options: ["Un effet visuel", "Une question claire", "Supprimer n", "Cacher l’unité"], answer: 1, explain: "Question d’abord." },
      { id: "b2", theme: "bases", themeLabel: "Bases", question: "n désigne…", options: ["La moyenne", "L’effectif", "Le maximum", "Un filtre Excel"], answer: 1, explain: "Nombre d’observations." },
      { id: "b3", theme: "moyenne", themeLabel: "Moyenne", question: "Moyenne =", options: ["max − min", "somme / n", "n / somme", "toujours la médiane"], answer: 1, explain: "somme ÷ n." },
      { id: "b4", theme: "mediane", themeLabel: "Médiane", question: "La médiane est…", options: ["La valeur du milieu après tri", "Toujours le max", "Un JOIN", "Un biais volontaire"], answer: 0, explain: "Milieu de la liste triée." },
      { id: "b5", theme: "moyenne", themeLabel: "Moyenne", question: "La moyenne est surtout perturbée par…", options: ["Les en-têtes", "Les valeurs extrêmes", "La couleur du graphique", "Le nom du fichier"], answer: 1, explain: "Outliers." },
      { id: "b6", theme: "pct", themeLabel: "Pourcentages", question: "Part (%) =", options: ["partie − tout", "(partie / tout) × 100", "tout / 2", "médiane × n"], answer: 1, explain: "Proportion × 100." },
      { id: "b7", theme: "pct", themeLabel: "Pourcentages", question: "Il faut toujours préciser…", options: ["Le dénominateur (le tout)", "Un dégradé", "Un mot de passe", "La médiane seule"], answer: 0, explain: "% de quoi ?" },
      { id: "b8", theme: "dispersion", themeLabel: "Dispersion", question: "Min et max décrivent…", options: ["L’étendue", "Uniquement n", "Un TCD", "Une jointure"], answer: 0, explain: "Plus petit / plus grand." },
      { id: "b9", theme: "comparaison", themeLabel: "Comparaison", question: "Comparer sans rappeler n peut…", options: ["Être trompeur", "Être obligatoire", "Remplacer l’unité", "Supprimer les NULL"], answer: 0, explain: "Volumes différents." },
      { id: "b10", theme: "qualite", themeLabel: "Qualité", question: "NULL veut souvent dire…", options: ["Zéro garanti", "Information absente", "Maximum", "100 %"], answer: 1, explain: "Manquant." },
      { id: "b11", theme: "metier", themeLabel: "Métier", question: "Après les KPI, l’analyste…", options: ["S’arrête", "Propose des recommandations", "Efface n", "Évite tout contexte"], answer: 1, explain: "Décision." },
      { id: "b12", theme: "pieges", themeLabel: "Pièges", question: "Corrélation…", options: ["Prouve toujours la cause", "N’est pas la causalité", "Remplace la moyenne", "Interdit les %"], answer: 1, explain: "Lien ≠ cause." },
      { id: "b13", theme: "mediane", themeLabel: "Médiane", question: "Si moyenne >> médiane, on suspecte…", options: ["Des extrêmes élevés", "n = 0", "Un CSV parfait", "L’absence de total"], answer: 0, explain: "Asymétrie / outliers." },
      { id: "b14", theme: "bases", themeLabel: "Bases", question: "Publier un chiffre sans unité…", options: ["Est recommandé", "Prête à confusion", "Calcule la médiane", "Crée un biais positif"], answer: 1, explain: "CDF, %, etc." },
      { id: "b15", theme: "comparaison", themeLabel: "Comparaison", question: "Écart relatif typique…", options: ["(A−B)/B × 100", "A+B", "A×B", "min/max seulement"], answer: 0, explain: "Variation en %." },
      { id: "b16", theme: "qualite", themeLabel: "Qualité", question: "Remplacer tous les NULL par 0 sans règle…", options: ["Est toujours juste", "Peut fausser moyennes et totaux", "Obligatoire en stats", "Supprime le max"], answer: 1, explain: "Choix métier explicite." },
      { id: "b17", theme: "pieges", themeLabel: "Pièges", question: "Un axe tronqué sur un graphique peut…", options: ["Clarifier sans risque", "Exagérer une petite différence", "Calculer n", "Remplacer la médiane"], answer: 1, explain: "Effet visuel trompeur." },
      { id: "b18", theme: "moyenne", themeLabel: "Moyenne", question: "Moyenne de 10, 20, 30…", options: ["10", "20", "30", "60"], answer: 1, explain: "60/3 = 20." },
      { id: "b19", theme: "metier", themeLabel: "Métier", question: "Stats + SQL + Excel + Python…", options: ["Se contredisent", "Se complètent pour un profil Data Analyst", "Sont inutiles", "Remplacent le métier santé"], answer: 1, explain: "Chaîne complète." },
      { id: "b20", theme: "pct", themeLabel: "Pourcentages", question: "2 sur 8 vaut…", options: ["2 %", "25 %", "80 %", "8 %"], answer: 1, explain: "2/8×100 = 25." },
      { id: "b21", theme: "echantillon", themeLabel: "Échantillon", question: "Un CSV de 30 ventes sur 3 mois…", options: ["Représente forcément tout le pays", "Est un échantillon à borner dans le récit", "Interdit toute moyenne", "Remplace l’unité"], answer: 1, explain: "Cadre d’inférence." },
      { id: "b22", theme: "echantillon", themeLabel: "Échantillon", question: "Avant de généraliser, on précise surtout…", options: ["La police du slide", "Période, zones couvertes, n", "Le dégradé", "Le nom du fichier seul"], answer: 1, explain: "Périmètre." },
      { id: "b23", theme: "causalite", themeLabel: "Causalité", question: "Langage junior correct…", options: ["« X cause Y » dès que les courbes montent", "« X est associé à Y ; hypothèse à vérifier »", "« n est inutile »", "« La médiane prouve la cause »"], answer: 1, explain: "Association + vérif." },
      { id: "b24", theme: "comparaison", themeLabel: "Comparaison", question: "n=2 d’un côté dans une comparaison…", options: ["Preuve définitive", "Signal souvent fragile à déclarer", "Autorise à cacher l’effectif", "Remplace le %"], answer: 1, explain: "Petit n." },
      { id: "b25", theme: "maitrise", themeLabel: "Maîtrise", question: "L’épreuve de transfert sert à…", options: ["Recopier le tutoriel", "Analyser un mois/jeu sans guide et justifier", "Éviter les KPI", "Supprimer le carnet"], answer: 1, explain: "Autonomie." },
      { id: "b26", theme: "maitrise", themeLabel: "Maîtrise", question: "Seuil de validation du quiz bilan (maîtrise junior)…", options: ["50 %", "70 %", "80 %", "100 % obligatoire dès la 1re fois"], answer: 2, explain: "80 %." }
    ]
  }
};
