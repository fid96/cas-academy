/* Python Atelier — contenu pédagogique (français, débutant absolu) */

window.ATELIER = {
  brand: "Python Atelier",
  mission: "Devenir un Data Analyst Python digne et complet — en partant de zéro.",
  tracks: [
    {
      id: "fondations",
      title: "Fondations Python",
      subtitle: "Penser clairement, puis parler Python.",
      goal: "Acquérir la logique et le langage indispensables avant les données."
    },
    {
      id: "data-analyst",
      title: "Data Analyst Python",
      subtitle: "Le cœur du métier, pas un bonus.",
      goal: "Importer, nettoyer, analyser, visualiser et conclure comme un analyste."
    }
  ],
  method: {
    title: "La méthode en quatre gestes",
    steps: [
      {
        num: "01",
        title: "Voir",
        text: "On observe une situation concrète. Pas de jargon d’abord : une image mentale claire."
      },
      {
        num: "02",
        title: "Comprendre",
        text: "On traduit l’idée en règles simples, puis en Python, ligne par ligne."
      },
      {
        num: "03",
        title: "Pratiquer",
        text: "On écrit un petit exercice guidé. La main apprend autant que la tête."
      },
      {
        num: "04",
        title: "Vérifier",
        text: "On teste ce qu’on a retenu. L’erreur n’est pas un échec : c’est un professeur."
      }
    ],
    principles: [
      {
        title: "Une idée à la fois",
        text: "Chaque leçon porte un seul objectif. On ne surcharge jamais la mémoire de travail."
      },
      {
        title: "Du quotidien vers le code",
        text: "Avant le symbole, l’analogie. Une variable est une boîte étiquetée, une condition est un carrefour."
      },
      {
        title: "Petite réussite, grande confiance",
        text: "Mieux vaut un exercice réussi de 5 lignes qu’un exercice long abandonné."
      },
      {
        title: "Progression verrouillée avec bienveillance",
        text: "Les modules s’ouvrent quand le précédent est maîtrisé. Vous avancez sur un sol ferme."
      }
    ]
  },
  glossary: [
    { term: "Programme", def: "Suite d’instructions qu’un ordinateur exécute dans un ordre précis." },
    { term: "Variable", def: "Nom qui désigne une valeur stockée en mémoire (comme une boîte étiquetée)." },
    { term: "Type", def: "Nature d’une valeur : nombre entier, texte, vrai/faux, liste, etc." },
    { term: "Condition", def: "Question oui/non qui oriente le programme vers un chemin ou un autre." },
    { term: "Boucle", def: "Répétition contrôlée d’un bloc d’instructions." },
    { term: "Fonction", def: "Bloc de code réutilisable qui reçoit des entrées et peut renvoyer un résultat." },
    { term: "Liste", def: "Collection ordonnée d’éléments, comme une file d’attente numérotée." },
    { term: "Dictionnaire", def: "Collection de paires clé → valeur, comme un annuaire." },
    { term: "Bug", def: "Erreur dans le code ou dans la logique qui produit un comportement inattendu." },
    { term: "DataFrame", def: "Tableau de données (lignes et colonnes) utilisé avec la bibliothèque pandas." },
    { term: "Bibliothèque", def: "Ensemble d’outils Python prêts à l’emploi (pandas, matplotlib…)." },
    { term: "Indentation", def: "Décalage à droite des lignes (espaces) qui indique le bloc d’un if, d’une boucle ou d’une fonction." },
    { term: "CSV", def: "Fichier texte où les colonnes sont séparées par des virgules (ou point-virgules) : format standard d’échange de données." },
    { term: "Excel", def: "Fichier tableur (.xlsx). En analyse, on l’importe souvent dans pandas pour le traiter sérieusement." },
    { term: "EDA", def: "Exploratory Data Analysis : exploration guidée des données (aperçu, distributions, anomalies) avant les conclusions." },
    { term: "Valeur manquante", def: "Case vide (NaN) : information absente qu’il faut détecter, comprendre, puis traiter." },
    { term: "Agrégation", def: "Résumer plusieurs lignes en un indicateur : somme, moyenne, médiane, comptage…" },
    { term: "Jointure", def: "Relier deux tableaux par une clé commune (ex. client_id), comme un assemblage de registres." },
    { term: "KPI", def: "Indicateur clé de performance : chiffre suivi pour décider (ex. total des ventes, taux de complétude)." },
    { term: "Outlier", def: "Valeur aberrante, très éloignée des autres : à investiguer avant de conclure." }
  ],
  modules: [
    {
      id: "m1",
      title: "Penser avant de coder",
      track: "fondations",
      level: "Fondations",
      image: "assets/illu-logique.jpg",
      summary: "La logique de programmation sans ordinateur : ordonner, décider, répéter.",
      lessons: [
        {
          id: "m1-l1",
          title: "Qu’est-ce qu’un programme ?",
          goal: "Comprendre qu’un programme est une recette précise d’instructions.",
          image: "assets/illu-logique.jpg",
          caption: "La logique, c’est ordonner des étapes comme on organise un parcours.",
          voir: {
            paragraphs: [
              "Imaginez que vous expliquez à quelqu’un qui ne connaît rien à la cuisine comment préparer un thé. Si vous dites seulement « fais du thé », la personne improvisera. Si vous donnez des étapes claires, le résultat devient fiable.",
              "Un programme informatique, c’est exactement cela : une recette d’instructions, écrite pour une machine qui ne « comprend » pas l’intention — elle exécute ce qui est écrit."
            ],
            analogy: {
              title: "Analogie du professeur",
              text: "L’ordinateur est un élève très rapide, très obéissant… et totalement littéral. Il ne comble pas vos non-dits."
            }
          },
          comprendre: {
            paragraphs: [
              "Trois qualités font une bonne instruction : elle est claire, elle est ordonnée, elle est complète.",
              "En programmation, on appelle souvent cet enchaînement un algorithme : la logique avant le langage. Python viendra ensuite comme une façon d’écrire cette logique."
            ],
            bullets: [
              "Clair : « Ajoute 2 sucres » vaut mieux que « sucrer un peu ».",
              "Ordonné : on chauffe l’eau avant de verser.",
              "Complet : on précise quand s’arrêter."
            ],
            code: {
              label: "Pseudo-code (pas encore Python)",
              lines: "1. Prendre une tasse\n2. Faire chauffer de l'eau\n3. Mettre un sachet de thé\n4. Verser l'eau\n5. Attendre 3 minutes\n6. Retirer le sachet"
            },
            annotation: "Le pseudo-code sert à raisonner. On le traduit ensuite en Python."
          },
          pratiquer: {
            prompt: "Écrivez, en 5 à 7 lignes numérotées, la « recette » pour allumer une lampe de bureau (version très précise).",
            placeholder: "1. Vérifier que la lampe est branchée\n2. ...",
            checkType: "minLines",
            minLines: 5,
            success: "Très bien. Vous avez déjà pensé comme un programmeur : étapes, ordre, précision.",
            fail: "Ajoutez au moins 5 étapes numérotées. La précision est votre alliée.",
            hint: "Pensez aux détails : interrupteur, prise, ampoule, position de la lampe…"
          },
          verifier: {
            question: "Pourquoi dit-on qu’un ordinateur est « littéral » ?",
            options: [
              "Parce qu’il lit seulement les livres",
              "Parce qu’il exécute exactement ce qui est écrit, sans deviner l’intention",
              "Parce qu’il refuse les erreurs d’orthographe dans tous les cas",
              "Parce qu’il parle toutes les langues humaines"
            ],
            answer: 1,
            explainOk: "Exact. D’où l’importance d’écrire des instructions complètes et ordonnées.",
            explainKo: "Relisez l’analogie : l’ordinateur n’interprète pas vos intentions, il suit le texte."
          },
          retenir: [
            "Un programme = une recette d’instructions.",
            "On pense d’abord la logique, ensuite on code.",
            "La précision évite les malentendus avec la machine."
          ]
        },
        {
          id: "m1-l2",
          title: "Décider et répéter",
          goal: "Reconnaître les deux piliers de la logique : conditions et boucles.",
          image: "assets/illu-conditions.jpg",
          caption: "Chaque carrefour est une condition : selon la réponse, le chemin change.",
          voir: {
            paragraphs: [
              "Dans la vie, vous décidez sans cesse : « S’il pleut, je prends un parapluie. Sinon, je m’en passe. » Vous répétez aussi : « Tant que la casserole n’a pas bouilli, j’attends. »",
              "Ces deux gestes — décider et répéter — sont le cœur de presque tous les programmes."
            ],
            analogy: {
              title: "Analogie du carrefour",
              text: "Une condition est un panneau au croisement. Une boucle est un rond-point que l’on tourne jusqu’à la bonne sortie."
            }
          },
          comprendre: {
            paragraphs: [
              "La condition pose une question dont la réponse est oui ou non. Selon la réponse, on exécute un bloc A ou un bloc B.",
              "La boucle répète un bloc tant qu’une condition reste vraie, ou pour chaque élément d’une collection."
            ],
            bullets: [
              "SI … ALORS … SINON … → décision",
              "TANT QUE … FAIRE … → répétition conditionnelle",
              "POUR CHAQUE élément … → parcours d’une liste"
            ],
            code: {
              label: "Pseudo-code",
              lines: "SI temperature > 30 ALORS\n  boire de l'eau\nSINON\n  continuer normalement\n\nTANT QUE pages_restantes > 0 FAIRE\n  lire une page\n  pages_restantes = pages_restantes - 1"
            },
            annotation: "Plus tard, SI devient if, TANT QUE devient while, POUR CHAQUE devient for."
          },
          pratiquer: {
            prompt: "Décrivez une situation quotidienne avec UNE condition (SI/SINON) et UNE répétition (TANT QUE ou POUR CHAQUE).",
            placeholder: "SI mon téléphone est déchargé ALORS...\nTANT QUE...",
            checkType: "keywords",
            keywords: ["si", "alors"],
            success: "Bien vu. Vous avez relié la vie réelle aux structures du code.",
            fail: "Incluez au moins les mots SI et ALORS dans votre description.",
            hint: "Exemple : SI le feu est rouge ALORS s’arrêter ; TANT QUE le feu n’est pas vert, attendre."
          },
          verifier: {
            question: "Quelle phrase décrit le mieux une boucle ?",
            options: [
              "Une instruction exécutée une seule fois",
              "Un commentaire destiné au lecteur humain",
              "Un bloc d’instructions répété de façon contrôlée",
              "Un fichier qui stocke des images"
            ],
            answer: 2,
            explainOk: "Oui : la boucle répète, mais avec un contrôle (compteur, condition, liste).",
            explainKo: "Une boucle sert à répéter un bloc — pas à s’exécuter une seule fois."
          },
          retenir: [
            "Décider = condition (SI/SINON).",
            "Répéter = boucle (TANT QUE / POUR CHAQUE).",
            "Ces deux idées structurent presque tout programme utile."
          ]
        }
      ]
    },
    {
      id: "m2",
      title: "Premiers pas en Python",
      track: "fondations",
      level: "Python",
      image: "assets/illu-variables.jpg",
      summary: "Installer l’état d’esprit Python : afficher, stocker, nommer, lire un type.",
      lessons: [
        {
          id: "m2-l1",
          title: "Dire bonjour à Python",
          goal: "Utiliser print() et comprendre qu’un programme s’exécute de haut en bas.",
          image: "assets/illu-variables.jpg",
          caption: "Chaque ligne est une instruction. Python les lit dans l’ordre.",
          voir: {
            paragraphs: [
              "Python est un langage de programmation. On l’écrit dans un fichier ou dans un éditeur, puis on l’exécute : la machine suit les lignes de haut en bas.",
              "Le premier geste utile est d’afficher un message. En Python, cela se fait avec print()."
            ],
            analogy: {
              title: "Analogie du tableau",
              text: "print() est comme écrire au tableau pour que tout le monde voie le résultat."
            }
          },
          comprendre: {
            paragraphs: [
              "Les parenthèses de print(...) contiennent ce que l’on veut afficher. Le texte s’écrit entre guillemets.",
              "L’ordre compte : la première ligne s’exécute avant la deuxième."
            ],
            code: {
              label: "exemple.py",
              lines: "print(\"Bonjour\")\nprint(\"Je commence Python\")\nprint(3 + 4)"
            },
            annotation: "Les deux premières lignes affichent du texte. La troisième calcule puis affiche 7.",
            bullets: [
              "Les guillemets marquent du texte (chaîne de caractères).",
              "Sans guillemets, 3 + 4 est un calcul numérique.",
              "Python est sensible à la casse : Print n’est pas print."
            ]
          },
          pratiquer: {
            prompt: "Écrivez trois lignes print qui affichent : votre prénom, votre ville, puis le calcul 10 + 5.",
            placeholder: "print(\"...\")\nprint(\"...\")\nprint(10 + 5)",
            checkType: "regex",
            pattern: "print\\s*\\([\\s\\S]*\\)[\\s\\S]*print\\s*\\([\\s\\S]*\\)[\\s\\S]*print\\s*\\(\\s*10\\s*\\+\\s*5\\s*\\)",
            success: "Parfait. Vous venez d’écrire votre premier mini-programme Python.",
            fail: "Il faut trois print, dont le dernier exactement sur 10 + 5.",
            hint: "Respectez la casse : print en minuscules. Le calcul s’écrit print(10 + 5)."
          },
          verifier: {
            question: "Que fait print(\"3 + 4\") ?",
            options: [
              "Affiche 7",
              "Affiche le texte 3 + 4",
              "Déclenche une erreur obligatoire",
              "Enregistre le calcul dans un fichier"
            ],
            answer: 1,
            explainOk: "Avec des guillemets, Python affiche le texte tel quel, sans calculer.",
            explainKo: "Les guillemets empêchent le calcul : c’est du texte affiché."
          },
          retenir: [
            "print() affiche une information.",
            "Le texte va entre guillemets.",
            "Python exécute les lignes de haut en bas."
          ]
        },
        {
          id: "m2-l2",
          title: "Variables : des boîtes étiquetées",
          goal: "Créer et utiliser des variables pour stocker des valeurs.",
          image: "assets/illu-variables.jpg",
          caption: "Une variable porte un nom et contient une valeur.",
          voir: {
            paragraphs: [
              "Souvent, on veut garder une information pour la réutiliser : un âge, un nom, un total. On ne veut pas la retaper partout.",
              "Une variable est une boîte avec une étiquette (le nom) et un contenu (la valeur)."
            ],
            analogy: {
              title: "Analogie des boîtes",
              text: "nom = \"Amina\" met \"Amina\" dans la boîte appelée nom. Plus tard, on ouvre la boîte en écrivant nom."
            }
          },
          comprendre: {
            paragraphs: [
              "En Python, on crée une variable avec le signe =. Ce n’est pas l’égalité mathématique : cela signifie « stocke ». ",
              "On peut changer le contenu d’une variable plus tard. Le nom reste, la valeur évolue."
            ],
            code: {
              label: "variables.py",
              lines: "prenom = \"Fidele\"\nage = 30\nville = \"Kinshasa\"\n\nprint(prenom)\nprint(age)\n\nage = age + 1\nprint(age)"
            },
            annotation: "À la fin, age vaut 31 : on a mis à jour la boîte.",
            bullets: [
              "Noms clairs : total_ventes plutôt que x.",
              "Pas d’espace dans un nom : utilisez _ .",
              "Un nom ne peut pas commencer par un chiffre."
            ]
          },
          pratiquer: {
            prompt: "Créez deux variables produit et prix, puis affichez-les avec print.",
            placeholder: "produit = \"...\"\nprix = ...\nprint(produit)\nprint(prix)",
            checkType: "regex",
            pattern: "produit\\s*=\\s*.+[\\s\\S]*prix\\s*=\\s*.+[\\s\\S]*print\\s*\\(\\s*produit\\s*\\)[\\s\\S]*print\\s*\\(\\s*prix\\s*\\)",
            success: "Excellent. Vous savez stocker puis réutiliser une information.",
            fail: "Définissez produit et prix, puis utilisez print(produit) et print(prix).",
            hint: "Exemple : produit = \"Riz\" puis prix = 1500 puis deux print."
          },
          verifier: {
            question: "Dans x = 5, que signifie le signe = en Python ?",
            options: [
              "Comparer si x est égal à 5",
              "Stocker la valeur 5 dans la variable x",
              "Afficher 5 à l’écran",
              "Supprimer la variable x"
            ],
            answer: 1,
            explainOk: "Oui : = assigne (stocke). La comparaison d’égalité s’écrit ==.",
            explainKo: "En Python, = stocke une valeur. Pour comparer, on utilisera =="
          },
          retenir: [
            "= signifie « stocke dans ».",
            "Une variable a un nom et une valeur.",
            "On peut modifier une variable après sa création."
          ]
        },
        {
          id: "m2-l3",
          title: "Types de base",
          goal: "Reconnaître int, float, str et bool.",
          image: "assets/illu-variables.jpg",
          caption: "Le type dit à Python comment traiter une valeur.",
          voir: {
            paragraphs: [
              "Toutes les valeurs n’ont pas la même nature. 7 n’est pas la même chose que \"7\". L’un est un nombre, l’autre est du texte.",
              "Connaître les types évite bien des erreurs, surtout en analyse de données."
            ],
            analogy: {
              title: "Analogie des contenants",
              text: "On ne verse pas de l’huile dans un compteur électrique. De même, on n’additionne pas un texte et un nombre sans conversion."
            }
          },
          comprendre: {
            paragraphs: [
              "Quatre types suffisent pour démarrer :",
            ],
            bullets: [
              "int — entier : 3, 20, -1",
              "float — décimal : 3.14, 2.0",
              "str — texte (string) : \"bonjour\"",
              "bool — booléen : True ou False"
            ],
            code: {
              label: "types.py",
              lines: "a = 10          # int\nb = 3.5         # float\nc = \"Python\"    # str\nd = True        # bool\n\nprint(type(a))\nprint(type(c))"
            },
            annotation: "type(...) révèle le type d’une valeur. Utile pour diagnostiquer."
          },
          pratiquer: {
            prompt: "Créez quatre variables : un int, un float, un str, un bool. Affichez chacune.",
            placeholder: "n = 4\nx = 2.5\n...\nprint(n)",
            checkType: "keywords",
            keywords: ["print", "true", "false"],
            keywordsMode: "anyBool",
            success: "Bien. Vous manipulez déjà les quatre types fondamentaux.",
            fail: "Il faut au moins un print, et un booléen True ou False quelque part.",
            hint: "Exemple de booléen : actif = True"
          },
          verifier: {
            question: "Quelle expression est un texte (str) ?",
            options: ["42", "3.14", "\"42\"", "True"],
            answer: 2,
            explainOk: "Les guillemets font de 42 un texte.",
            explainKo: "Sans guillemets, 42 est un nombre. Avec guillemets, c’est du texte."
          },
          retenir: [
            "int, float, str, bool : les quatre piliers.",
            "\"7\" (texte) ≠ 7 (nombre).",
            "type() aide à vérifier ce que l’on manipule."
          ]
        }
      ]
    },
    {
      id: "m3",
      title: "Décisions en Python",
      track: "fondations",
      level: "Python",
      image: "assets/illu-conditions.jpg",
      summary: "Traduire SI/SINON en if / elif / else, avec l’indentation.",
      lessons: [
        {
          id: "m3-l1",
          title: "if, else et l’indentation",
          goal: "Écrire une condition simple et respecter les blocs indentés.",
          image: "assets/illu-conditions.jpg",
          caption: "Le décalage des lignes (indentation) définit ce qui appartient au if.",
          voir: {
            paragraphs: [
              "Quand une action dépend d’une situation, on utilise if. En Python, le bloc conditionnel ne se marque pas par des accolades : on indente (on décale) les lignes avec des espaces."
            ],
            analogy: {
              title: "Analogie de la marge",
              text: "Tout ce qui est décalé sous le if appartient à la décision, comme des sous-points sous un titre."
            }
          },
          comprendre: {
            paragraphs: [
              "On compare souvent avec >, <, >=, <=, == (égal), != (différent).",
              "N’oubliez pas les deux-points : après if ... :"
            ],
            code: {
              label: "condition.py",
              lines: "note = 14\n\nif note >= 10:\n    print(\"Réussi\")\nelse:\n    print(\"À retravailler\")"
            },
            annotation: "Les lignes sous if et else sont indentées (4 espaces recommandés).",
            bullets: [
              "== compare l’égalité ; = assigne.",
              "else est optionnel mais souvent utile.",
              "Une mauvaise indentation provoque une erreur IndentationError."
            ]
          },
          pratiquer: {
            prompt: "Écrivez un if/else : si age >= 18 afficher \"Majeur\", sinon \"Mineur\". Posez age = 20 au début.",
            placeholder: "age = 20\nif age >= 18:\n    print(\"Majeur\")\nelse:\n    print(\"Mineur\")",
            checkType: "regex",
            pattern: "age\\s*=\\s*20[\\s\\S]*if\\s+age\\s*>=\\s*18\\s*:[\\s\\S]*else\\s*:",
            success: "Bravo. Vous venez d’écrire votre première décision Python.",
            fail: "Reprenez le modèle : age = 20, puis if age >= 18: … else: …",
            hint: "Pensez aux deux-points et à l’indentation des print."
          },
          verifier: {
            question: "Quel symbole compare l’égalité en Python ?",
            options: ["=", "==", "===", ":="],
            answer: 1,
            explainOk: "== compare. = stocke.",
            explainKo: "Retenez : un seul = assigne, deux == comparent."
          },
          retenir: [
            "if / else oriente le programme.",
            "Les deux-points ouvrent un bloc.",
            "L’indentation définit l’appartenance au bloc."
          ]
        },
        {
          id: "m3-l2",
          title: "Plusieurs cas avec elif",
          goal: "Enchaîner plusieurs conditions clairement.",
          image: "assets/illu-conditions.jpg",
          caption: "elif ajoute des carrefours intermédiaires avant le else final.",
          voir: {
            paragraphs: [
              "Parfois deux chemins ne suffisent pas. Exemple : mention Très bien, Bien, Passable, Insuffisant. On enchaîne avec elif (contraction de else if)."
            ],
            analogy: {
              title: "Analogie des casiers",
              text: "On teste le premier casier qui convient, puis on s’arrête. L’ordre des tests compte."
            }
          },
          comprendre: {
            paragraphs: [
              "Python évalue les conditions de haut en bas. Dès qu’une condition est vraie, il exécute son bloc et ignore le reste de la chaîne."
            ],
            code: {
              label: "mentions.py",
              lines: "note = 16\n\nif note >= 16:\n    print(\"Très bien\")\nelif note >= 14:\n    print(\"Bien\")\nelif note >= 10:\n    print(\"Passable\")\nelse:\n    print(\"Insuffisant\")"
            },
            annotation: "Avec note = 16, seul le premier bloc s’exécute."
          },
          pratiquer: {
            prompt: "Écrivez une chaîne if/elif/else pour temperature : >= 30 \"Chaud\", >= 20 \"Doux\", sinon \"Frais\". Posez temperature = 25.",
            placeholder: "temperature = 25\nif ...",
            checkType: "keywords",
            keywords: ["elif", "temperature", "if"],
            success: "Très bien. Vous savez gérer plus de deux chemins.",
            fail: "Utilisez if, elif et la variable temperature.",
            hint: "Testez d’abord le cas le plus chaud (>= 30), puis >= 20."
          },
          verifier: {
            question: "Dans une chaîne if/elif/else, que se passe-t-il quand une condition est vraie ?",
            options: [
              "Toutes les conditions sont quand même testées",
              "Son bloc s’exécute et le reste de la chaîne est ignoré",
              "Python recommence depuis le début du fichier",
              "else s’exécute toujours ensuite"
            ],
            answer: 1,
            explainOk: "Oui : premier match gagnant.",
            explainKo: "Dès qu’un cas est vrai, Python exécute ce bloc puis sort de la chaîne."
          },
          retenir: [
            "elif ajoute des cas intermédiaires.",
            "L’ordre des conditions est stratégique.",
            "Un seul bloc de la chaîne s’exécute."
          ]
        }
      ]
    },
    {
      id: "m4",
      title: "Répéter avec les boucles",
      track: "fondations",
      level: "Python",
      image: "assets/hero-atelier.jpg",
      summary: "for et while : parcourir et répéter sans se fatiguer.",
      lessons: [
        {
          id: "m4-l1",
          title: "La boucle for",
          goal: "Parcourir une séquence avec for et range.",
          image: "assets/hero-atelier.jpg",
          caption: "for dit : pour chaque élément, fais ceci.",
          voir: {
            paragraphs: [
              "Quand une action doit se répéter pour chaque élément d’une liste — ou un nombre fixe de fois — on utilise for."
            ],
            analogy: {
              title: "Analogie du trombinoscope",
              text: "Pour chaque nom sur une liste d’appel, vous dites « présent ». C’est une boucle for."
            }
          },
          comprendre: {
            paragraphs: [
              "range(n) produit les entiers de 0 à n-1. Très utile pour répéter n fois."
            ],
            code: {
              label: "boucle_for.py",
              lines: "for i in range(3):\n    print(\"Tour\", i)\n\nfruits = [\"mangue\", \"banane\", \"ananas\"]\nfor fruit in fruits:\n    print(fruit)"
            },
            annotation: "Premier exemple : 0, 1, 2. Second : chaque fruit de la liste."
          },
          pratiquer: {
            prompt: "Écrivez une boucle for avec range(5) qui affiche les nombres via print(i).",
            placeholder: "for i in range(5):\n    print(i)",
            checkType: "regex",
            pattern: "for\\s+\\w+\\s+in\\s+range\\s*\\(\\s*5\\s*\\)\\s*:",
            success: "Parfait. Vous savez répéter une action un nombre précis de fois.",
            fail: "Utilisez for ... in range(5):",
            hint: "N’oubliez ni les deux-points ni l’indentation du print."
          },
          verifier: {
            question: "Que produit range(3) ?",
            options: ["1, 2, 3", "0, 1, 2", "0, 1, 2, 3", "3 seulement"],
            answer: 1,
            explainOk: "range(3) → 0, 1, 2.",
            explainKo: "En Python, range(3) commence à 0 et s’arrête avant 3."
          },
          retenir: [
            "for parcourt une séquence.",
            "range(n) donne 0 … n-1.",
            "Le corps de la boucle est indenté."
          ]
        },
        {
          id: "m4-l2",
          title: "La boucle while",
          goal: "Répéter tant qu’une condition reste vraie.",
          image: "assets/illu-conditions.jpg",
          caption: "while continue jusqu’à ce que la condition devienne fausse.",
          voir: {
            paragraphs: [
              "while est idéal quand on ne connaît pas à l’avance le nombre exact de tours, mais on connaît la condition d’arrêt."
            ],
            analogy: {
              title: "Analogie de la casserole",
              text: "Tant que l’eau n’a pas bouilli, j’attends. Je ne compte pas les secondes à l’avance."
            }
          },
          comprendre: {
            paragraphs: [
              "Attention : si la condition ne devient jamais fausse, la boucle tourne indéfiniment. On met à jour une variable dans le corps de la boucle."
            ],
            code: {
              label: "boucle_while.py",
              lines: "compteur = 1\nwhile compteur <= 3:\n    print(compteur)\n    compteur = compteur + 1"
            },
            annotation: "Sans compteur = compteur + 1, la boucle ne s’arrêterait jamais."
          },
          pratiquer: {
            prompt: "Écrivez un while qui affiche n tant que n <= 3, en partant de n = 1, et incrémentez n à chaque tour.",
            placeholder: "n = 1\nwhile n <= 3:\n    print(n)\n    n = n + 1",
            checkType: "regex",
            pattern: "while\\s+n\\s*<=\\s*3\\s*:",
            success: "Excellent. Vous contrôlez une répétition par une condition.",
            fail: "Il faut une boucle while n <= 3:",
            hint: "Pensez à augmenter n dans la boucle."
          },
          verifier: {
            question: "Quel risque majeur existe avec while ?",
            options: [
              "Il ne peut afficher que du texte",
              "Une boucle infinie si la condition ne devient jamais fausse",
              "Il interdit les variables",
              "Il ne fonctionne que la nuit"
            ],
            answer: 1,
            explainOk: "Oui : toujours prévoir comment la condition évolue vers False.",
            explainKo: "Le danger classique est la boucle infinie."
          },
          retenir: [
            "while = tant que la condition est vraie.",
            "Il faut faire évoluer la condition.",
            "for et while sont complémentaires."
          ]
        }
      ]
    },
    {
      id: "m5",
      title: "Collections : listes et dictionnaires",
      track: "fondations",
      level: "Python",
      image: "assets/illu-donnees.jpg",
      summary: "Ranger plusieurs informations : listes ordonnées, dictionnaires clé-valeur.",
      lessons: [
        {
          id: "m5-l1",
          title: "Les listes",
          goal: "Créer une liste, lire un élément, ajouter une valeur.",
          image: "assets/illu-donnees.jpg",
          caption: "Une liste est une rangée ordonnée d’éléments.",
          voir: {
            paragraphs: [
              "Quand vous avez plusieurs valeurs du même genre — notes, villes, produits — une liste est naturelle."
            ],
            analogy: {
              title: "Analogie du tiroir compartimenté",
              text: "Chaque compartiment a une position : 0, 1, 2… En Python, on commence à 0."
            }
          },
          comprendre: {
            paragraphs: [
              "On crée une liste avec des crochets []. On accède à un élément par son indice."
            ],
            code: {
              label: "listes.py",
              lines: "notes = [12, 15, 9, 18]\nprint(notes[0])      # 12\nprint(notes[-1])     # 18 (dernier)\n\nnotes.append(14)     # ajoute à la fin\nprint(len(notes))    # longueur"
            },
            annotation: "append ajoute. len compte. L’indice 0 est le premier élément."
          },
          pratiquer: {
            prompt: "Créez une liste villes avec 3 villes, affichez la première (indice 0), puis ajoutez une 4ᵉ ville avec append.",
            placeholder: "villes = [\"...\", \"...\", \"...\"]\nprint(villes[0])\nvilles.append(\"...\")",
            checkType: "regex",
            pattern: "villes\\s*=\\s*\\[[\\s\\S]*\\][\\s\\S]*print\\s*\\(\\s*villes\\s*\\[\\s*0\\s*\\]\\s*\\)[\\s\\S]*villes\\.append\\s*\\(",
            success: "Très bien. Les listes sont partout en analyse de données.",
            fail: "Il faut villes = [...], print(villes[0]) et villes.append(...).",
            hint: "Les textes de villes vont entre guillemets."
          },
          verifier: {
            question: "Quel est l’indice du premier élément d’une liste Python ?",
            options: ["1", "0", "-1", "Aucun indice"],
            answer: 1,
            explainOk: "Python compte à partir de 0.",
            explainKo: "Le premier élément est à l’indice 0."
          },
          retenir: [
            "Liste = collection ordonnée.",
            "Indices à partir de 0.",
            "append ajoute, len mesure."
          ]
        },
        {
          id: "m5-l2",
          title: "Les dictionnaires",
          goal: "Associer des clés à des valeurs.",
          image: "assets/illu-donnees.jpg",
          caption: "Un dictionnaire répond : pour cette clé, quelle valeur ?",
          voir: {
            paragraphs: [
              "Parfois l’ordre ne suffit pas : on veut retrouver une information par un nom. Exemple : âge d’une personne, prix d’un produit."
            ],
            analogy: {
              title: "Analogie de l’annuaire",
              text: "La clé est le nom ; la valeur est le numéro. On ne cherche pas « le 3ᵉ », on cherche « Amina »."
            }
          },
          comprendre: {
            paragraphs: [
              "Un dictionnaire s’écrit avec des accolades { }. Chaque entrée est clé: valeur."
            ],
            code: {
              label: "dicos.py",
              lines: "eleve = {\n    \"nom\": \"Amina\",\n    \"age\": 17,\n    \"ville\": \"Lubumbashi\"\n}\n\nprint(eleve[\"nom\"])\neleve[\"age\"] = 18\nprint(eleve)"
            },
            annotation: "On lit et on modifie via la clé, entre crochets."
          },
          pratiquer: {
            prompt: "Créez un dictionnaire produit avec les clés nom et prix, puis affichez produit[\"nom\"].",
            placeholder: "produit = {\"nom\": \"...\", \"prix\": ...}\nprint(produit[\"nom\"])",
            checkType: "regex",
            pattern: "produit\\s*=\\s*\\{[\\s\\S]*nom[\\s\\S]*prix[\\s\\S]*\\}[\\s\\S]*print\\s*\\(\\s*produit\\s*\\[\\s*[\"']nom[\"']\\s*\\]\\s*\\)",
            success: "Parfait. Les dictionnaires préparent bien les tableaux de données.",
            fail: "Le dictionnaire doit contenir nom et prix, puis print(produit[\"nom\"]).",
            hint: "Respectez les guillemets autour des clés texte."
          },
          verifier: {
            question: "Dans un dictionnaire, on accède principalement aux valeurs via…",
            options: [
              "Un numéro de ligne Excel uniquement",
              "Une clé",
              "Le type bool seulement",
              "Le mot-clé while"
            ],
            answer: 1,
            explainOk: "Oui : clé → valeur.",
            explainKo: "Le point d’entrée d’un dictionnaire, c’est la clé."
          },
          retenir: [
            "Dictionnaire = paires clé → valeur.",
            "Accès via dico[\"cle\"].",
            "Idéal pour des fiches d’information."
          ]
        }
      ]
    },
    {
      id: "m6",
      title: "Fonctions : ranger sa pensée",
      track: "fondations",
      level: "Python",
      image: "assets/hero-atelier.jpg",
      summary: "Éviter les répétitions : écrire des fonctions claires et réutilisables.",
      lessons: [
        {
          id: "m6-l1",
          title: "Définir et appeler une fonction",
          goal: "Créer une fonction avec def, paramètres et return.",
          image: "assets/hero-atelier.jpg",
          caption: "Une fonction est une mini-machine : entrées → traitement → sortie.",
          voir: {
            paragraphs: [
              "Si vous répétez le même calcul dix fois, vous méritez un outil réutilisable. La fonction est cet outil."
            ],
            analogy: {
              title: "Analogie de la machine à café",
              text: "Vous donnez de l’eau et du café (paramètres), vous obtenez une tasse (valeur de retour). Vous n’ouvrez pas la machine à chaque fois pour réécrire le mode d’emploi."
            }
          },
          comprendre: {
            paragraphs: [
              "def crée la fonction. Les parenthèses reçoivent les paramètres. return renvoie le résultat."
            ],
            code: {
              label: "fonctions.py",
              lines: "def double(n):\n    return n * 2\n\nprint(double(5))   # 10\n\ndef saluer(prenom):\n    message = \"Bonjour \" + prenom\n    return message\n\nprint(saluer(\"Fidele\"))"
            },
            annotation: "Créer n’exécute pas. On exécute en appelant : double(5)."
          },
          pratiquer: {
            prompt: "Écrivez une fonction carre(n) qui retourne n * n, puis affichez carre(4).",
            placeholder: "def carre(n):\n    return n * n\n\nprint(carre(4))",
            checkType: "regex",
            pattern: "def\\s+carre\\s*\\(\\s*n\\s*\\)\\s*:[\\s\\S]*return\\s+n\\s*\\*\\s*n[\\s\\S]*print\\s*\\(\\s*carre\\s*\\(\\s*4\\s*\\)\\s*\\)",
            success: "Bravo. Vous factorisez une idée dans une fonction.",
            fail: "Il faut def carre(n):, un return n * n, puis print(carre(4)).",
            hint: "Attention à l’indentation sous def."
          },
          verifier: {
            question: "Que fait return dans une fonction ?",
            options: [
              "Affiche obligatoirement à l’écran",
              "Renvoie un résultat à l’appelant",
              "Efface la variable",
              "Ferme Python"
            ],
            answer: 1,
            explainOk: "return transmet le résultat. print affiche, ce n’est pas la même chose.",
            explainKo: "return renvoie une valeur ; print se contente d’afficher."
          },
          retenir: [
            "def définit, l’appel exécute.",
            "Paramètres = entrées.",
            "return = sortie de la fonction."
          ]
        },
        {
          id: "m6-l2",
          title: "Fonctions utiles à l’analyste",
          goal: "Écrire une petite fonction de calcul réutilisable (moyenne).",
          image: "assets/illu-donnees.jpg",
          caption: "Les fonctions préparent le terrain de l’analyse automatisée.",
          voir: {
            paragraphs: [
              "Un Data Analyst calcule souvent les mêmes indicateurs. Une fonction moyenne(liste) évite de recopier la logique — et réduit les erreurs."
            ],
            analogy: {
              title: "Analogie du tampon officiel",
              text: "Une fois le tampon créé, on l’applique sur chaque dossier. La fonction, c’est votre tampon de calcul."
            }
          },
          comprendre: {
            paragraphs: [
              "On peut parcourir une liste, additionner, puis diviser par la longueur."
            ],
            code: {
              label: "moyenne.py",
              lines: "def moyenne(valeurs):\n    total = sum(valeurs)\n    n = len(valeurs)\n    return total / n\n\nnotes = [12, 15, 9, 18]\nprint(moyenne(notes))"
            },
            annotation: "Plus tard, pandas fera .mean() pour vous — mais comprendre la logique vous rend autonome."
          },
          pratiquer: {
            prompt: "Écrivez une fonction somme_liste(valeurs) qui retourne sum(valeurs), puis testez avec print(somme_liste([10, 20, 5])).",
            placeholder: "def somme_liste(valeurs):\n    return sum(valeurs)\n\nprint(somme_liste([10, 20, 5]))",
            checkType: "regex",
            pattern: "def\\s+somme_liste\\s*\\(\\s*valeurs\\s*\\)\\s*:[\\s\\S]*return\\s+sum\\s*\\(\\s*valeurs\\s*\\)[\\s\\S]*print\\s*\\(\\s*somme_liste\\s*\\(",
            success: "Excellent. Vous êtes prêt pour le parcours Data Analyst.",
            fail: "Définissez somme_liste(valeurs) avec return sum(valeurs), puis un print du test.",
            hint: "Le nom de la fonction doit être exactement somme_liste."
          },
          verifier: {
            question: "Pourquoi un analyste a-t-il intérêt à écrire des fonctions ?",
            options: [
              "Pour décorer le code avec des couleurs",
              "Pour réutiliser une logique claire et limiter les erreurs de copier-coller",
              "Parce que Python refuse les variables",
              "Pour remplacer les fichiers CSV"
            ],
            answer: 1,
            explainOk: "Exact : clarté, réutilisation, fiabilité.",
            explainKo: "Les fonctions servent surtout à réutiliser une logique sans se tromper."
          },
          retenir: [
            "Les indicateurs se encapsulent bien dans des fonctions.",
            "Comprendre la moyenne à la main aide à lire .mean().",
            "Fin des fondations : place au métier Data Analyst."
          ]
        }
      ]
    }
  ]
};

/* Les modules Data Analyst sont chargés via content-data.js */
