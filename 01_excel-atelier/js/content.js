/* Excel Atelier — contenu pédagogique */

window.ATELIER = {
  brand: "Excel Atelier",
  mission:
    "Maîtriser Excel en autonomie junior — formules fiables, jointures, nettoyage, TCD, livrable défendable.",
  tracks: [
    {
      id: "fondations",
      title: "Fondations Excel",
      subtitle: "Cellules, formules, fonctions — le quotidien de l’analyste.",
      goal: "Lire une feuille, écrire des formules fiables, contrôler un résultat."
    },
    {
      id: "data-analyst",
      title: "Data Analyst Excel",
      subtitle: "Autonomie : refs, RECHERCHEX, Power Query, TCD, épreuve.",
      goal: "Nettoyer, joindre, pivoter, visualiser et recommander sans guide."
    }
  ],
  method: {
    title: "La méthode en quatre gestes",
    steps: [
      { num: "01", title: "Voir", text: "On regarde la feuille et la question métier avant de taper une formule." },
      { num: "02", title: "Comprendre", text: "On choisit la bonne fonction ou le bon outil Excel, une idée à la fois." },
      { num: "03", title: "Pratiquer", text: "On écrit la formule dans l’atelier ou on décrit les clics Excel." },
      { num: "04", title: "Vérifier", text: "Quiz rapide : on ancre l’essentiel avant la suite." }
    ],
    principles: [
      {
        title: "La question avant la formule",
        text: "Excel sert à répondre. Sans question claire, le plus beau tableau croisé reste inutile."
      },
      {
        title: "Une cellule, une idée",
        text: "On calcule étape par étape. Les formules longues se découpent."
      },
      {
        title: "Contrôler le résultat",
        text: "Un total absurde est un signal : filtre oublié, mauvaise plage, ou unité confuse."
      },
      {
        title: "Trio Data Analyst",
        text: "SQL extrait, Excel explore et présente, Python automatise. Les trois se renforcent."
      }
    ]
  },
  glossary: [
    { term: "Cellule", def: "Case d’une feuille, adressée par colonne+ligne (ex. B2)." },
    { term: "Plage", def: "Groupe de cellules, ex. B2:B7." },
    { term: "Formule", def: "Calcul commençant par =, ex. =B2*C2." },
    { term: "Fonction", def: "Outil nommé dans une formule : SOMME, MOYENNE, SI…" },
    { term: "Référence relative", def: "B2 qui se décale quand on recopie la formule." },
    { term: "Référence absolue", def: "$B$2 qui ne bouge pas à la recopie." },
    { term: "Référence mixte", def: "$B2 ou B$2 : une partie fixe, l’autre relative." },
    { term: "RECHERCHEX / XLOOKUP", def: "Joint une clé (ex. client_id) pour ramener un attribut depuis une autre table." },
    { term: "Power Query", def: "Outil d’import/transformation (CSV sale → table propre, étapes rejouables)." },
    { term: "Tableau Excel", def: "Plage structurée (Insertion > Tableau) avec filtres et colonnes nommées." },
    { term: "TCD", def: "Tableau croisé dynamique : résume des données par catégories." },
    { term: "Filtre", def: "Masque temporairement des lignes selon un critère." },
    { term: "KPI", def: "Indicateur clé (total, moyenne, top ville…)." },
    { term: "Valeur vide / NULL", def: "Case sans donnée — à traiter avant les totaux." },
    { term: "Graphique", def: "Représentation visuelle d’un tableau pour convaincre." },
    { term: "Transfert", def: "Réussir un brief / fichier nouveau sans refaire le tutoriel guidé." }
  ],
  modules: [
    {
      id: "m1",
      title: "Penser en feuille de calcul",
      track: "fondations",
      level: "Fondations",
      image: "assets/illu-logique.jpg",
      summary: "Classeur, feuilles, cellules — avant toute formule.",
      lessons: [
        {
          id: "m1-l1",
          title: "Qu’est-ce qu’Excel pour un analyste ?",
          goal: "Relier Excel au métier : explorer, calculer, présenter.",
          image: "assets/illu-donnees.jpg",
          caption: "Une feuille bien rangée devient un outil de décision.",
          voir: {
            paragraphs: [
              "Excel est le cahier de calcul de l’analyste : on y met des données, on calcule, on filtre, on montre.",
              "Sur le terrain (santé, ONG, admin), beaucoup de décisions passent encore par un fichier Excel clair."
            ],
            analogy: {
              title: "Analogie du registre",
              text: "Chaque ligne est une fiche ; chaque colonne une information répétée ; la formule est la règle de calcul automatique."
            }
          },
          comprendre: {
            paragraphs: ["Trois objets à retenir :"],
            bullets: [
              "Classeur (.xlsx) — le fichier",
              "Feuille — un onglet dans le fichier",
              "Cellule — une case (B2 = colonne B, ligne 2)"
            ],
            code: {
              label: "idee.txt",
              lines: "Question métier :\nQuel est le total des ventes à Kinshasa ?\n→ d’abord données propres, ensuite formule ou TCD."
            },
            annotation: "D’abord la question, ensuite l’outil."
          },
          pratiquer: {
            prompt: "Citez les 3 objets Excel (classeur, feuille, cellule) et donnez un exemple d’adresse de cellule.",
            placeholder: "Classeur = …\nFeuille = …\nCellule = B2 …",
            hint: "Une adresse typique : B2",
            checkType: "keywords",
            keywords: ["classeur", "feuille", "cellule"],
            success: "Oui. Le trio de base est clair.",
            fail: "Mentionnez bien classeur, feuille et cellule."
          },
          verifier: {
            question: "B2 désigne…",
            options: ["La feuille 2", "Colonne B, ligne 2", "Un graphique", "Un filtre"],
            answer: 1,
            explain: "Lettre = colonne, chiffre = ligne."
          },
          retenir: [
            "Excel sert à calculer et présenter pour décider.",
            "Classeur → feuille → cellule.",
            "Toujours partir de la question métier."
          ]
        },
        {
          id: "m1-l2",
          title: "Lire une grille de données",
          goal: "Repérer en-têtes, lignes utiles et cases vides.",
          image: "assets/illu-variables.jpg",
          caption: "La première ligne porte souvent les noms de colonnes.",
          voir: {
            paragraphs: [
              "Dans l’atelier, la feuille Pratique ressemble à un extrait de ventes : produit, quantité, prix.",
              "Avant de sommer, on vérifie : y a-t-il un titre en ligne 1 ? Des cases vides ?"
            ],
            analogy: {
              title: "Analogie du tableau mural",
              text: "Si le titre des colonnes est faux, tout le monde lit de travers — Excel aussi."
            }
          },
          comprendre: {
            paragraphs: ["Bonnes habitudes :"],
            bullets: [
              "Ligne 1 = en-têtes (Produit, Quantite, Prix…)",
              "Une ligne = un enregistrement",
              "Pas de lignes totalement vides au milieu des données",
              "Les nombres dans des colonnes nombres (pas de texte mélangé)"
            ],
            code: {
              label: "controle.txt",
              lines: "Avant SOMME :\n1) Plage correcte ?\n2) En-têtes exclus du calcul ?\n3) Cellules vides acceptables ?"
            },
            annotation: "Le contrôle évite les totaux magiques."
          },
          pratiquer: {
            prompt: "Dans la feuille Pratique, quelles colonnes contiennent des nombres à totaliser ? (réponse libre courte)",
            placeholder: "Colonne B (quantités) et C (prix)…",
            hint: "B et C sont numériques ; D servira aux montants.",
            checkType: "keywords",
            keywords: ["b", "c"],
            success: "Exact : B et C sont les colonnes numériques de base.",
            fail: "Citez au moins les colonnes B et C."
          },
          verifier: {
            question: "La ligne d’en-têtes sert surtout à…",
            options: ["Décorer", "Nommer les colonnes pour lire et filtrer", "Remplacer les formules", "Supprimer les données"],
            answer: 1,
            explain: "Sans bons en-têtes, filtres et TCD deviennent confus."
          },
          retenir: [
            "En-têtes clairs en ligne 1.",
            "Une ligne = une observation.",
            "Contrôler avant d’agréger."
          ]
        }
      ]
    },
    {
      id: "m2",
      title: "Formules de base",
      track: "fondations",
      level: "Excel",
      image: "assets/illu-variables.jpg",
      summary: "Le =, les opérateurs, les références de cellules.",
      lessons: [
        {
          id: "m2-l1",
          title: "Écrire sa première formule",
          goal: "Calculer un montant = quantité × prix.",
          image: "assets/illu-logique.jpg",
          caption: "Toute formule commence par =.",
          voir: {
            paragraphs: [
              "Pour la ligne 2 : quantité en B2, prix en C2. Le montant est B2×C2.",
              "En Excel on écrit cela dans D2 : =B2*C2"
            ],
            analogy: {
              title: "Analogie de la recette",
              text: "La formule est la recette ; les cellules sont les ingrédients. Changez B2, le résultat suit."
            }
          },
          comprendre: {
            paragraphs: ["Règles :"],
            bullets: [
              "Toujours commencer par =",
              "* multiplie, / divise, + ajoute, - soustrait",
              "On préfère =B2*C2 plutôt que taper 12*15000 à la main"
            ],
            code: {
              label: "D2",
              lines: "=B2*C2"
            },
            annotation: "Si B2 change, D2 se met à jour."
          },
          pratiquer: {
            prompt: "Écrivez la formule Excel du montant en D2 (quantité × prix).",
            placeholder: "=B2*C2",
            hint: "Commencez par =",
            checkType: "formula",
            expected: "=B2*C2",
            success: "Parfait. C’est la formule de base du montant.",
            fail: "Attendu : =B2*C2 (espaces ignorés)."
          },
          verifier: {
            question: "Sans le signe =, Excel…",
            options: ["Calcule quand même", "Traite souvent le texte comme une étiquette", "Crée un TCD", "Efface la feuille"],
            answer: 1,
            explain: "= dit à Excel : calcule."
          },
          retenir: [
            "Formule = calcul vivant.",
            "Référencer les cellules, ne pas recopier les chiffres à la main.",
            "=B2*C2 pour un montant ligne."
          ]
        },
        {
          id: "m2-l2",
          title: "Recopier une formule",
          goal: "Comprendre le décalage des références (relatif).",
          image: "assets/illu-conditions.jpg",
          caption: "Tirer la poignée : B2 devient B3, B4…",
          voir: {
            paragraphs: [
              "Si D2 contient =B2*C2 et que vous recopiez vers D3, Excel écrit =B3*C3.",
              "C’est une référence relative : elle suit la ligne."
            ],
            analogy: {
              title: "Analogie de l’ascenseur",
              text: "La formule descend d’étage : elle regarde la quantité et le prix du même étage."
            }
          },
          comprendre: {
            paragraphs: ["Plus tard : les dollars $ fixent une cellule ($C$1). Pour l’instant, le relatif suffit."],
            bullets: [
              "D2 → =B2*C2",
              "D3 → =B3*C3",
              "D4 → =B4*C4"
            ],
            code: {
              label: "serie",
              lines: "D2: =B2*C2\nD3: =B3*C3\nD4: =B4*C4"
            },
            annotation: "Même logique, ligne suivante."
          },
          pratiquer: {
            prompt: "Quelle formule aura D4 si on a recopié =B2*C2 depuis D2 ?",
            placeholder: "=B4*C4",
            hint: "La ligne suit le numéro 4.",
            checkType: "formula",
            expected: "=B4*C4",
            success: "Oui : la référence a suivi la ligne.",
            fail: "Attendu : =B4*C4"
          },
          verifier: {
            question: "Une référence relative…",
            options: ["Ne change jamais", "Se décale à la recopie", "Efface les filtres", "Crée un graphique"],
            answer: 1,
            explain: "C’est le comportement par défaut d’Excel."
          },
          retenir: [
            "Recopier évite de retaper.",
            "Relatif = se décale.",
            "Absolu ($B$2) viendra pour les taux fixes."
          ]
        }
      ]
    },
    {
      id: "m3",
      title: "Fonctions essentielles",
      track: "fondations",
      level: "Excel",
      image: "assets/illu-conditions.jpg",
      summary: "SOMME, MOYENNE, NB, SI — le kit minimum de l’analyste.",
      lessons: [
        {
          id: "m3-l1",
          title: "SOMME et MOYENNE",
          goal: "Totaliser et moyenner une plage.",
          image: "assets/illu-analyste.jpg",
          caption: "Les KPI naissent souvent d’une SOMME.",
          voir: {
            paragraphs: [
              "Pour totaliser les quantités B2:B7 : =SOMME(B2:B7)",
              "Pour la moyenne des prix : =MOYENNE(C2:C7)"
            ],
            analogy: {
              title: "Analogie du panier",
              text: "SOMME additionne tout le panier ; MOYENNE dit ce qu’il y a « en moyenne »."
            }
          },
          comprendre: {
            paragraphs: ["En anglais Excel accepte aussi SUM et AVERAGE. L’atelier comprend les deux."],
            bullets: [
              "SOMME(plage) / SUM(plage)",
              "MOYENNE(plage) / AVERAGE(plage)",
              "La plage s’écrit Début:Fin"
            ],
            code: {
              label: "B10",
              lines: "=SOMME(B2:B7)"
            },
            annotation: "N’incluez pas la ligne d’en-tête dans la plage."
          },
          pratiquer: {
            prompt: "Formule du total des quantités (B2 à B7).",
            placeholder: "=SOMME(B2:B7)",
            hint: "SOMME ou SUM",
            checkType: "formulaAny",
            expectedAny: ["=SOMME(B2:B7)", "=SUM(B2:B7)"],
            success: "Excellent. Voilà un KPI de volume.",
            fail: "Essayez =SOMME(B2:B7) ou =SUM(B2:B7)."
          },
          verifier: {
            question: "B2:B7 est…",
            options: ["Une fonction", "Une plage", "Un classeur", "Un graphique"],
            answer: 1,
            explain: "Début:Fin = plage."
          },
          retenir: [
            "SOMME pour les totaux.",
            "MOYENNE pour le niveau typique.",
            "Plage sans en-tête."
          ]
        },
        {
          id: "m3-l2",
          title: "La fonction SI",
          goal: "Classer un résultat selon une condition.",
          image: "assets/illu-logique.jpg",
          caption: "SI(test ; si_vrai ; si_faux)",
          voir: {
            paragraphs: [
              "Exemple : si le total quantité dépasse 150, afficher \"OK\", sinon \"Bas\".",
              "En formule : =SI(SOMME(B2:B7)>150;\"OK\";\"Bas\") — l’atelier accepte aussi les virgules."
            ],
            analogy: {
              title: "Analogie du feu rouge",
              text: "SI c’est vert → on passe ; sinon → on s’arrête. Même logique en cellule."
            }
          },
          comprendre: {
            paragraphs: ["Structure :"],
            bullets: [
              "SI(condition, valeur_si_vrai, valeur_si_faux)",
              "Comparaisons : >, <, >=, <=, =",
              "Utile pour alertes et contrôles qualité"
            ],
            code: {
              label: "A12",
              lines: "=SI(SOMME(B2:B7)>150,\"OK\",\"Bas\")"
            },
            annotation: "Le SI transforme un chiffre en message métier."
          },
          pratiquer: {
            prompt: "Écrivez un SI qui affiche OK si SOMME(B2:B7)>150, sinon Bas.",
            placeholder: "=SI(SOMME(B2:B7)>150,\"OK\",\"Bas\")",
            hint: "SI / IF + SOMME / SUM",
            checkType: "formulaAny",
            expectedAny: [
              "=SI(SOMME(B2:B7)>150,\"OK\",\"Bas\")",
              "=IF(SUM(B2:B7)>150,\"OK\",\"Bas\")",
              "=SI(SUM(B2:B7)>150,\"OK\",\"Bas\")",
              "=IF(SOMME(B2:B7)>150,\"OK\",\"Bas\")"
            ],
            success: "Très bien. Vous savez créer une alerte simple.",
            fail: "Reprenez la structure SI(test,\"OK\",\"Bas\")."
          },
          verifier: {
            question: "SI sert surtout à…",
            options: ["Fusionner des fichiers PDF", "Choisir un résultat selon une condition", "Remplacer les TCD", "Effacer les filtres"],
            answer: 1,
            explain: "Condition → deux issues possibles."
          },
          retenir: [
            "SI = décision en cellule.",
            "Trois arguments : test, vrai, faux.",
            "Idéal pour seuils et alertes."
          ]
        }
      ]
    },
    {
      id: "m4",
      title: "Préparer et filtrer",
      track: "fondations",
      level: "Excel",
      image: "assets/illu-donnees.jpg",
      summary: "Nettoyage léger, filtres, tableaux structurés.",
      lessons: [
        {
          id: "m4-l1",
          title: "Filtrer pour répondre",
          goal: "Isoler un sous-ensemble (ville, produit, période).",
          image: "assets/illu-analyste.jpg",
          caption: "Le filtre masque sans détruire.",
          voir: {
            paragraphs: [
              "Dans Excel : sélectionnez les en-têtes → Données → Filtrer.",
              "Puis choisissez par exemple un produit ou une quantité minimale."
            ],
            analogy: {
              title: "Analogie du tamis",
              text: "Le filtre garde ce qui compte pour la question du jour ; le reste est seulement caché."
            }
          },
          comprendre: {
            paragraphs: ["Gestes clés :"],
            bullets: [
              "Toujours filtrer depuis une ligne d’en-têtes",
              "Vérifier le total visible après filtre (attention aux SOMME sur cellules cachées selon contexte)",
              "Effacer le filtre avant un nouveau calcul global"
            ],
            code: {
              label: "pense-bete",
              lines: "Question : ventes de Moustiquaire ?\n1) Filtrer colonne Produit\n2) Lire ou sommer la colonne Montant"
            },
            annotation: "Filtrer = répondre plus vite."
          },
          pratiquer: {
            prompt: "Décrivez en 3 lignes comment filtrer la colonne Produit sur ACT dans Excel.",
            placeholder: "1) …\n2) …\n3) …",
            hint: "Données > Filtrer > colonne Produit",
            checkType: "minLines",
            minLines: 3,
            success: "Bonne description de démarche.",
            fail: "Écrivez au moins 3 étapes courtes."
          },
          verifier: {
            question: "Un filtre Excel…",
            options: ["Supprime définitivement les lignes", "Masque temporairement des lignes", "Crée une base SQL", "Remplace SOMME"],
            answer: 1,
            explain: "Les données restent ; elles sont cachées."
          },
          retenir: [
            "Filtrer pour une question précise.",
            "En-têtes obligatoires.",
            "Penser à enlever le filtre ensuite."
          ]
        }
      ]
    },
    {
      id: "m5",
      title: "Tableaux croisés dynamiques",
      track: "data-analyst",
      level: "Data Analyst",
      image: "assets/illu-analyste.jpg",
      summary: "Résumer des milliers de lignes en KPI par catégorie.",
      lessons: [
        {
          id: "m5-l1",
          title: "À quoi sert un TCD ?",
          goal: "Relier TCD et question métier (total par ville, par produit…).",
          image: "assets/illu-donnees.jpg",
          caption: "Le TCD est le cousin Excel du GROUP BY SQL.",
          voir: {
            paragraphs: [
              "Au lieu d’écrire dix formules SOMME.SI, un tableau croisé dynamique regroupe et totalise.",
              "Si vous avez fait SQL Atelier : TCD ≈ GROUP BY + SUM/COUNT."
            ],
            analogy: {
              title: "Analogie du tri postal",
              text: "On trie les fiches par ville, puis on additionne le montant de chaque pile."
            }
          },
          comprendre: {
            paragraphs: ["Zones du TCD :"],
            bullets: [
              "Lignes : catégories (ville, produit…)",
              "Valeurs : mesures (somme de montant, nombre de ventes…)",
              "Filtres / Colonnes : découpes supplémentaires"
            ],
            code: {
              label: "brief-tcd",
              lines: "Lignes : ville\nValeurs : Somme de montant_cdf\n→ total des ventes par ville"
            },
            annotation: "D’abord la question, ensuite les zones."
          },
          pratiquer: {
            prompt: "Pour un total par produit, que mettez-vous en Lignes et en Valeurs ?",
            placeholder: "Lignes : …\nValeurs : …",
            hint: "Produit + Somme des montants",
            checkType: "keywords",
            keywords: ["produit", "somme"],
            success: "Oui : Produit en lignes, Somme du montant en valeurs.",
            fail: "Mentionnez produit et une somme (montant)."
          },
          verifier: {
            question: "Un TCD ressemble surtout à…",
            options: ["Un GROUP BY SQL", "Un navigateur web", "Un antivirus", "Un mot de passe"],
            answer: 0,
            explain: "Regrouper + agréger = même esprit."
          },
          retenir: [
            "TCD = résumé intelligent.",
            "Lignes = catégories, Valeurs = mesures.",
            "Lien fort avec SQL."
          ]
        },
        {
          id: "m5-l2",
          title: "Construire un TCD (démarche)",
          goal: "Énoncer les clics essentiels sans se perdre.",
          image: "assets/illu-conditions.jpg",
          caption: "Insertion > Tableau croisé dynamique.",
          voir: {
            paragraphs: [
              "1) Cliquez dans vos données 2) Insertion > Tableau croisé dynamique 3) Placez les champs.",
              "Astuce : convertissez d’abord la plage en Tableau Excel pour des plages stables."
            ],
            analogy: {
              title: "Analogie du tableau de bord papier",
              text: "Vous ne recopiez pas toutes les fiches : vous affichez seulement les totaux utiles."
            }
          },
          comprendre: {
            paragraphs: ["Checklist qualité :"],
            bullets: [
              "Pas de colonnes fusionnées dans la source",
              "En-têtes uniques",
              "Actualiser le TCD si les données changent",
              "Vérifier un total à la main sur un petit extrait"
            ],
            code: {
              label: "etapes",
              lines: "1. Données propres\n2. Insertion > TCD\n3. Champs Lignes / Valeurs\n4. Contrôle du total"
            },
            annotation: "Le contrôle final fait l’analyste."
          },
          pratiquer: {
            prompt: "Listez 4 étapes pour créer un TCD « total par ville ».",
            placeholder: "1) …\n2) …\n3) …\n4) …",
            hint: "Insertion, champs ville, somme montant, contrôle",
            checkType: "minLines",
            minLines: 4,
            success: "Démarche solide.",
            fail: "Il faut au moins 4 étapes."
          },
          verifier: {
            question: "Après ajout de nouvelles lignes source, il faut souvent…",
            options: ["Ignorer le TCD", "Actualiser le TCD", "Supprimer Excel", "Désactiver les en-têtes"],
            answer: 1,
            explain: "Actualiser pour prendre les nouvelles données."
          },
          retenir: [
            "Insertion > TCD.",
            "Source propre = TCD fiable.",
            "Toujours contrôler un total."
          ]
        }
      ]
    },
    {
      id: "m6",
      title: "Graphiques et récit",
      track: "data-analyst",
      level: "Data Analyst",
      image: "assets/illu-analyste.jpg",
      summary: "Choisir un graphique et raconter une recommandation.",
      lessons: [
        {
          id: "m6-l1",
          title: "Du tableau au graphique",
          goal: "Choisir un type simple selon le message.",
          image: "assets/illu-donnees.jpg",
          caption: "Un bon graphique répond à une seule question.",
          voir: {
            paragraphs: [
              "Comparaison entre villes → barres. Part d’un total → secteurs (avec prudence). Évolution dans le temps → lignes.",
              "Moins de décor, plus de clarté."
            ],
            analogy: {
              title: "Analogie de l’affiche",
              text: "Si l’affiche dit trop de choses, personne ne retient le message."
            }
          },
          comprendre: {
            paragraphs: ["Règles analyste :"],
            bullets: [
              "Un graphique = une question",
              "Titre qui affirme un constat (pas seulement « Graphique 1 »)",
              "Axes lisibles, unités indiquées (CDF, quantités…)"
            ],
            code: {
              label: "titre",
              lines: "Mauvais : Graphique 1\nMieux : Kinshasa concentre le plus gros volume de ventes"
            },
            annotation: "Le titre porte déjà l’insight."
          },
          pratiquer: {
            prompt: "Proposez un titre de graphique pour un total des ventes par ville (une phrase).",
            placeholder: "Ex. : …",
            hint: "Affirmez un constat.",
            checkType: "minLines",
            minLines: 1,
            success: "Bien. Un titre qui parle déjà au décideur.",
            fail: "Écrivez au moins une phrase-titre."
          },
          verifier: {
            question: "Pour comparer des totaux par ville, on préfère souvent…",
            options: ["Un graphique en barres", "Un nuage de mots", "Une image décorative", "Aucun titre"],
            answer: 0,
            explain: "Les barres comparent clairement des grandeurs."
          },
          retenir: [
            "Choisir le type selon la question.",
            "Titre = constat.",
            "Clarté > fioritures."
          ]
        }
      ]
    },
    {
      id: "m8",
      title: "Autonomie analyste",
      track: "data-analyst",
      level: "Maîtrise",
      image: "assets/illu-conditions.jpg",
      summary: "Réfs absolues, RECHERCHEX, Power Query, TCD multi-champs — avant l’épreuve.",
      lessons: [
        {
          id: "m8-l1",
          title: "Références absolues et mixtes",
          goal: "Figer une cellule avec $ pour recopier sans casser le calcul.",
          image: "assets/illu-donnees.jpg",
          caption: "Sans $, la recopie décale tout — parfois à tort.",
          voir: {
            paragraphs: [
              "Relatif : =B2*$E$1 si E1 est un taux unique à ne pas décaler.",
              "Mixte : $B2 fige la colonne ; B$2 fige la ligne — utile dans les grilles."
            ],
            analogy: {
              title: "Analogie du clou et du chariot",
              text: "Le clou ($E$1) reste planté ; le chariot (B2) avance d’une case à chaque copie."
            }
          },
          comprendre: {
            paragraphs: ["Gestes :"],
            bullets: [
              "F4 (Windows) alterne relatif / absolu / mixte",
              "$E$1 = cellule totalement figée",
              "Tester la recopie sur 2–3 lignes",
              "Atelier formules : essayez =B2*$E$1 si vous placez un taux en E1"
            ],
            code: {
              label: "ex",
              lines: "E1 = 1,16 (taux)\nD2 = =B2*$E$1\nRecopier D2 → D3 : B3*$E$1"
            },
            annotation: "Maîtrise = choisir volontairement ce qui bouge."
          },
          pratiquer: {
            prompt: "Écrivez une formule avec une ref absolue (ex. =B2*$E$1) et dites en 1 ligne pourquoi le $.",
            placeholder: "=…\nPourquoi : …",
            hint: "$",
            checkType: "keywords",
            keywords: ["$"],
            success: "Référence contrôlée.",
            fail: "Incluez au moins un $."
          },
          verifier: {
            question: "$E$1 dans une formule…",
            options: ["Se décale toujours à la recopie", "Reste fixé à E1", "Supprime Excel", "Remplace un TCD"],
            answer: 1,
            explain: "Absolu."
          },
          retenir: [
            "$ fige.",
            "Tester la recopie.",
            "Mixte si besoin."
          ]
        },
        {
          id: "m8-l2",
          title: "RECHERCHEX — joindre une table",
          goal: "Ramener un attribut client (ex. type) via client_id.",
          image: "assets/illu-variables.jpg",
          caption: "Excel joint comme un VLOOKUP moderne / un JOIN SQL.",
          voir: {
            paragraphs: [
              "RECHERCHEX(valeur; plage_recherche; plage_renvoi) ramène la valeur alignée.",
              "Cas : dans ventes, colonne type_client depuis la feuille clients sur client_id."
            ],
            analogy: {
              title: "Analogie du badge et du dossier",
              text: "Le badge (client_id) ouvre le bon dossier (ligne clients) pour lire le type."
            }
          },
          comprendre: {
            paragraphs: ["Checklist :"],
            bullets: [
              "Clé unique côté table de recherche",
              "Même type de données (texte vs nombre)",
              "Gérer #N/A (absent) — ne pas le cacher",
              "Équivalent SQL : LEFT JOIN clients ON …",
              "Éviter de tout coller à la main"
            ],
            code: {
              label: "recherchex",
              lines: "=RECHERCHEX([@client_id]; clients[client_id]; clients[type_client])\n(ou plages A:A / B:B selon votre feuille)"
            },
            annotation: "Pratiquez sur data/ventes.csv + clients.csv dans Excel réel."
          },
          pratiquer: {
            prompt: "Décrivez en 4 lignes : clé, table source, valeur ramenée, que faire si #N/A.",
            placeholder: "1) Clé : …\n2) Source : …\n3) Valeur : …\n4) #N/A : …",
            hint: "client_id / RECHERCHEX",
            checkType: "keywords",
            keywords: ["client"],
            success: "Jointure mentale OK.",
            fail: "Mentionnez la clé client."
          },
          verifier: {
            question: "RECHERCHEX sert surtout à…",
            options: ["Changer la police", "Joindre une information via une clé", "Créer un PDF", "Supprimer les TCD"],
            answer: 1,
            explain: "Jointure."
          },
          retenir: [
            "Clé propre.",
            "Plage recherche / renvoi.",
            "Traiter #N/A."
          ]
        },
        {
          id: "m8-l3",
          title: "Power Query + TCD multi-champs",
          goal: "Passer d’un fichier sale à un TCD à 2 dimensions.",
          image: "assets/illu-analyste.jpg",
          caption: "Importer → nettoyer (étapes) → Tableau → TCD ville × produit.",
          voir: {
            paragraphs: [
              "Power Query (Données > À partir d’un fichier) enregistre des étapes : types, colonnes inutiles, lignes vides.",
              "TCD multi-champs : Lignes = ville, Colonnes = produit (ou l’inverse), Valeurs = somme montant."
            ],
            analogy: {
              title: "Analogie de la laverie puis du tri postal",
              text: "On lave le linge (Query) avant de le trier par casiers (évite les TCD sur du sale)."
            }
          },
          comprendre: {
            paragraphs: ["Pipeline junior :"],
            bullets: [
              "Import CSV via Power Query (ou équivalent)",
              "Types corrects + supprimer colonnes fusionnées / vides",
              "Charger en Tableau Excel",
              "TCD : 2 champs de catégorie + 1 mesure",
              "Actualiser après nouvelles lignes source"
            ],
            code: {
              label: "pipeline",
              lines: "CSV sale\n→ Power Query (étapes)\n→ Tableau\n→ TCD ville × produit\n→ Graphique + note"
            },
            annotation: "Carnet D : épreuve fichier sale → livrable."
          },
          pratiquer: {
            prompt: "Plan en 5 lignes : import Query → 2 nettoyages → Tableau → TCD 2 champs → actualisation.",
            placeholder: "1) …\n2) …\n3) …\n4) …\n5) …",
            hint: "Query / TCD",
            checkType: "minLines",
            minLines: 5,
            success: "Pipeline autonomie.",
            fail: "5 étapes."
          },
          verifier: {
            question: "Un TCD ville × produit place surtout…",
            options: ["Deux mesures en lignes seulement", "Une catégorie en lignes, une en colonnes, mesure en valeurs", "Uniquement des couleurs", "Aucune agrégation"],
            answer: 1,
            explain: "Matrice croisée."
          },
          retenir: [
            "Nettoyer avant pivoter.",
            "TCD multi-champs.",
            "Actualiser la source."
          ]
        }
      ]
    },
    {
      id: "m7",
      title: "Projet Data Analyst Excel",
      track: "data-analyst",
      level: "Projet",
      image: "assets/illu-analyste.jpg",
      summary: "Brief complet : préparer, joindre, résumer, visualiser, recommander.",
      lessons: [
        {
          id: "m7-l1",
          title: "Mission ventes santé",
          goal: "Enchaîner contrôle → jointure → KPI → TCD → recommandation (autonomie).",
          image: "assets/hero-atelier.jpg",
          caption: "Même jeu de données que SQL et Python Atelier.",
          voir: {
            paragraphs: [
              "Fichiers data/ventes.csv et clients.csv — import Query recommandé.",
              "Mission : 3 KPI, RECHERCHEX type client (ou équivalent), TCD multi-champs, 3 reco, justifications."
            ],
            analogy: {
              title: "Analogie du briefing",
              text: "Le coordonnateur n’a pas besoin de 2000 lignes : il a besoin de 3 chiffres et d’un conseil."
            }
          },
          comprendre: {
            paragraphs: ["Livrables maîtrise junior :"],
            bullets: [
              "Contrôle qualité + Query",
              "Jointure client",
              "KPI + TCD 2 champs",
              "Graphique titre-constat",
              "3 reco + 3 justifications",
              "Carnet D (transfert fichier sale)"
            ],
            code: {
              label: "plan",
              lines: "1. Import Query\n2. Tableau + RECHERCHEX\n3. KPI / TCD\n4. Graphique\n5. Note + justifications"
            },
            annotation: "Quiz bilan seuil 80 %."
          },
          pratiquer: {
            prompt: "Plan de mission en 6 lignes (import → jointure → KPI → TCD → graphique → reco).",
            placeholder: "1) …\n2) …\n3) …\n4) …\n5) …\n6) …",
            hint: "Une action par ligne",
            checkType: "minLines",
            minLines: 6,
            success: "Plan junior. Carnet D puis quiz bilan.",
            fail: "Il faut 6 étapes minimum."
          },
          verifier: {
            question: "Excel, SQL et Python ensemble…",
            options: ["Se contredisent toujours", "Se complètent dans le flux analyste", "Sont inutiles", "Remplacent le métier"],
            answer: 1,
            explain: "Extraire, explorer/présenter, automatiser."
          },
          retenir: [
            "Données → KPI → récit.",
            "Joindre puis pivoter.",
            "Quiz ≥ 80 %."
          ]
        }
      ]
    }
  ],
  carnet: {
    title: "Carnet d’exercices — Excel Atelier",
    subtitle: "Feuille pratique + data/ + épreuve de maîtrise",
    sections: [
      {
        title: "A. Fondations",
        exercises: [
          { id: "eA1", prompt: "Écrire =B2*C2 puis recopier jusqu’à D7." },
          { id: "eA2", prompt: "Total quantités : =SOMME(B2:B7)." },
          { id: "eA3", prompt: "Moyenne des prix : =MOYENNE(C2:C7)." },
          { id: "eA4", prompt: "SI sur un seuil de votre choix." },
          { id: "eA5", prompt: "Décrire comment filtrer un produit." }
        ]
      },
      {
        title: "B. Data Analyst",
        exercises: [
          { id: "eB1", prompt: "Importer data/ventes.csv (idéalement Power Query)." },
          { id: "eB2", prompt: "Créer un Tableau Excel sur les ventes." },
          { id: "eB3", prompt: "TCD : somme des montants par ville." },
          { id: "eB4", prompt: "TCD multi-champs : ville × produit." },
          { id: "eB5", prompt: "RECHERCHEX type_client depuis clients." },
          { id: "eB6", prompt: "Graphique en barres + titre-constat + 3 reco." }
        ]
      },
      {
        title: "C. Passage SQL ↔ Excel",
        exercises: [
          { id: "eC1", prompt: "Écrivez en SQL le équivalent d’un TCD total par ville." },
          { id: "eC2", prompt: "Quand préférez-vous Excel plutôt que SQL ?" },
          { id: "eC3", prompt: "Quand passerez-vous le relais à Python ?" }
        ]
      },
      {
        title: "D. Épreuve de maîtrise (transfert)",
        exercises: [
          {
            id: "eD1",
            prompt:
              "Prenez (ou simulez) un export « sale » : 1 colonne fusionnée, 2 lignes vides, 1 type faux. Pipeline Query → Tableau propre. Listez les étapes."
          },
          {
            id: "eD2",
            prompt: "Justifiez 3 choix : (1) une ref $ utilisée, (2) RECHERCHEX vs copier-coller, (3) champs du TCD multi."
          },
          {
            id: "eD3",
            prompt:
              "Détectez 2 erreurs : « TCD sur plage avec titres fusionnés ; =B2*E1 recopié sans $ alors que E1 est un taux unique ; #N/A ignorés. »"
          },
          {
            id: "eD4",
            prompt: "Livrable : 3 KPI + TCD ville×produit + 1 graphique + note 6 lignes — sans rouvrir les leçons guidées."
          },
          {
            id: "eD5",
            prompt: "Auto-éval (0–2) : transfert · justification · détection erreurs · quiz ≥80 %."
          }
        ]
      }
    ]
  },
  bilan: {
    title: "Quiz bilan — Data Analyst Excel",
    subtitle: "26 questions — formules, jointures, Query, TCD, maîtrise junior (seuil 80 %).",
    passScore: 80,
    questions: [
      { id: "b1", theme: "bases", themeLabel: "Bases", question: "Une formule Excel commence par…", options: ["#", "=", "@", "?"], answer: 1, explain: "Le = lance le calcul." },
      { id: "b2", theme: "bases", themeLabel: "Bases", question: "C5 désigne…", options: ["Ligne C colonne 5", "Colonne C ligne 5", "Une feuille", "Un TCD"], answer: 1, explain: "Lettre puis numéro." },
      { id: "b3", theme: "formules", themeLabel: "Formules", question: "Montant = quantité × prix en B2 et C2 :", options: ["B2+C2", "=B2*C2", "B2*C2 sans =", "SOMME(B2)"], answer: 1, explain: "=B2*C2." },
      { id: "b4", theme: "formules", themeLabel: "Formules", question: "B2:B7 est…", options: ["Une plage", "Une erreur", "Un classeur", "Un filtre"], answer: 0, explain: "Début:Fin." },
      { id: "b5", theme: "fonctions", themeLabel: "Fonctions", question: "Totaliser une plage :", options: ["MOYENNE", "SOMME", "SI seulement", "FILTRE"], answer: 1, explain: "SOMME / SUM." },
      { id: "b6", theme: "fonctions", themeLabel: "Fonctions", question: "MOYENNE calcule…", options: ["La somme", "La moyenne", "Le minimum seul", "Un graphique"], answer: 1, explain: "Moyenne." },
      { id: "b7", theme: "fonctions", themeLabel: "Fonctions", question: "SI sert à…", options: ["Créer un PDF", "Choisir selon une condition", "Remplacer CSV", "Fusionner des classeurs automatiquement sans règle"], answer: 1, explain: "Test → vrai/faux." },
      { id: "b8", theme: "prep", themeLabel: "Préparation", question: "Un filtre…", options: ["Détruit les lignes", "Masque temporairement", "Crée SQL", "Interdit les TCD"], answer: 1, explain: "Masquage temporaire." },
      { id: "b9", theme: "tcd", themeLabel: "TCD", question: "TCD ≈ en SQL…", options: ["DELETE", "GROUP BY", "DROP", "PASSWORD"], answer: 1, explain: "Regrouper + agréger." },
      { id: "b10", theme: "tcd", themeLabel: "TCD", question: "Dans un TCD, les mesures vont surtout en…", options: ["Valeurs", "Couleur de police uniquement", "Mot de passe", "En-tête de graphique 3D"], answer: 0, explain: "Zone Valeurs." },
      { id: "b11", theme: "metier", themeLabel: "Métier", question: "Premier réflexe analyste ?", options: ["Graphique 3D immédiat", "Clarifier la question puis contrôler les données", "Supprimer les en-têtes", "Éviter les totaux"], answer: 1, explain: "Question + qualité." },
      { id: "b12", theme: "bases", themeLabel: "Bases", question: "La ligne 1 sert souvent de…", options: ["Décor", "En-têtes de colonnes", "Mot de passe", "Macro obligatoire"], answer: 1, explain: "Noms de champs." },
      { id: "b13", theme: "formules", themeLabel: "Formules", question: "À la recopie, B2 dans =B2*C2 devient en ligne 3…", options: ["B2", "B3", "$B$2 obligatoire", "C2"], answer: 1, explain: "Référence relative." },
      { id: "b14", theme: "viz", themeLabel: "Visualisation", question: "Comparer des totaux par ville :", options: ["Barres", "Motifs aléatoires", "Sans titre", "Secteurs à 20 parts sans légende"], answer: 0, explain: "Barres lisibles." },
      { id: "b15", theme: "metier", themeLabel: "Métier", question: "Après les KPI, un analyste…", options: ["S’arrête sans récit", "Formule constat + recommandation", "Efface le fichier", "Cache les totaux"], answer: 1, explain: "La décision clôt l’analyse." },
      { id: "b16", theme: "tcd", themeLabel: "TCD", question: "Après nouvelles lignes source…", options: ["Ne rien faire", "Actualiser le TCD", "Changer de métier", "Supprimer les filtres système"], answer: 1, explain: "Actualiser." },
      { id: "b17", theme: "prep", themeLabel: "Préparation", question: "Avant un TCD, évitez surtout…", options: ["Des en-têtes clairs", "Des colonnes fusionnées dans la source", "Des noms de colonnes", "Un fichier CSV"], answer: 1, explain: "Fusion = source fragile." },
      { id: "b18", theme: "fonctions", themeLabel: "Fonctions", question: "NB / COUNT compte surtout…", options: ["Les cellules numériques", "Les couleurs", "Les feuilles cachées", "Les mots de passe"], answer: 0, explain: "Nombres." },
      { id: "b19", theme: "viz", themeLabel: "Visualisation", question: "Un bon titre de graphique…", options: ["Dit Graphique 1", "Porte déjà le constat", "Cache l’unité", "Multiplie les messages"], answer: 1, explain: "Insight dans le titre." },
      { id: "b20", theme: "metier", themeLabel: "Métier", question: "Excel Atelier avec SQL et Python…", options: ["S’oppose à eux", "Complète le parcours Data Analyst", "Les remplace totalement", "Sert uniquement au dessin"], answer: 1, explain: "Trio extract / explore / automate." },
      { id: "b21", theme: "refs", themeLabel: "Références", question: "$E$1…", options: ["Se décale toujours", "Reste fixé à E1 à la recopie", "Efface la feuille", "Remplace RECHERCHEX"], answer: 1, explain: "Absolu." },
      { id: "b22", theme: "lookup", themeLabel: "Jointure", question: "RECHERCHEX sert à…", options: ["Joindre via une clé", "Créer un pivot 3D", "Supprimer Query", "Changer le thème"], answer: 0, explain: "Lookup." },
      { id: "b23", theme: "query", themeLabel: "Power Query", question: "Power Query sert surtout à…", options: ["Décorer", "Importer/transformer avec étapes rejouables", "Remplacer le métier", "Interdire les TCD"], answer: 1, explain: "ETL léger." },
      { id: "b24", theme: "tcd", themeLabel: "TCD", question: "TCD ville × produit…", options: ["Impossible", "Catégorie en lignes, autre en colonnes, mesure en valeurs", "Deux fichiers PDF", "Sans agrégation"], answer: 1, explain: "Multi-champs." },
      { id: "b25", theme: "maitrise", themeLabel: "Maîtrise", question: "L’épreuve transfert Excel…", options: ["Recopie le tutoriel", "Nettoie un fichier sale et livre sans guide", "Interdit les formules", "Ignore #N/A"], answer: 1, explain: "Autonomie." },
      { id: "b26", theme: "maitrise", themeLabel: "Maîtrise", question: "Seuil quiz bilan…", options: ["50 %", "70 %", "80 %", "10 %"], answer: 2, explain: "80 %." }
    ]
  },
  sampleVentesPreview: [
    ["date", "ville", "produit", "quantite", "montant_cdf"],
    ["2024-01-05", "Kinshasa", "Moustiquaire", "12", "180000"],
    ["2024-01-06", "Lubumbashi", "Test rapide palu", "40", "320000"],
    ["2024-01-08", "Kananga", "ACT", "25", "275000"],
    ["2024-01-09", "Kinshasa", "Gants", "100", "90000"],
    ["2024-01-12", "Goma", "Moustiquaire", "8", "120000"]
  ]
};
