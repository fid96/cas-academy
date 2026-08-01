/* IA Atelier — levier après maîtrise, usage responsable */

window.ATELIER = {
  brand: "IA Atelier",
  mission: "Utiliser l’IA comme levier Data Analyst après maîtrise — jamais comme source de vérité.",
  tracks: [
    {
      id: "fondations",
      title: "IA responsable",
      subtitle: "Quand s’en servir, quand s’en méfier.",
      goal: "Poser le cadre éthique et pratique."
    },
    {
      id: "pratique",
      title: "IA dans la chaîne DA",
      subtitle: "Prompts SQL, Excel, Python, storytelling + vérification.",
      goal: "Accélérer sans abdiquer le contrôle."
    }
  ],
  method: {
    title: "La méthode levier",
    steps: [
      { num: "01", title: "Voir", text: "On clarifie la tâche : brouillon, explication, plan — pas « donne-moi la vérité »." },
      { num: "02", title: "Comprendre", text: "On choisit un prompt cadré + les interdits (chiffres inventés, données sensibles)." },
      { num: "03", title: "Pratiquer", text: "On copie un prompt du Labo, on l’adapte, on exécute le résultat dans l’outil réel." },
      { num: "04", title: "Vérifier", text: "Checklist : recalculer, n/unité/période, responsabilité humaine." }
    ],
    principles: [
      {
        title: "Règle d’or",
        text: "Vérifier tout chiffre avant de publier. Sans exception."
      },
      {
        title: "L’IA propose, l’analyste dispose",
        text: "Code, structure, formulation : oui. Verdict métier non contrôlé : non."
      },
      {
        title: "Pas de données sensibles dans le prompt",
        text: "Noms de patients, téléphones, GPS fins, dossiers individuels : anonymiser ou ne pas coller."
      },
      {
        title: "Levier après maîtrise, pas fondation",
        text: "L’impact peut être fort — mais seulement si SQL/Excel/Stats/Storytelling sont déjà là. Sinon l’IA accélère surtout les erreurs."
      }
    ]
  },
  traffic: {
    go: [
      "Brouillon de requête / formule / code à partir d’un schéma connu",
      "Expliquer une erreur (traceback, message SQL)",
      "Reformuler une note déjà chiffrée correctement",
      "Proposer un plan d’étapes outils"
    ],
    slow: [
      "Interprétation statistique ambiguë",
      "Choix de KPI sensibles politiquement",
      "Traduction d’un jargon métier local mal spécifié"
    ],
    stop: [
      "Demander des résultats chiffrés sans exécuter le calcul",
      "Coller des données personnelles / médicales identifiables",
      "Publier un dashboard « parce que l’IA l’a dit »",
      "Laisser l’IA inventer des sources"
    ]
  },
  glossary: [
    { term: "Levier / copilote", def: "L’IA accélère après maîtrise ; l’humain reste responsable du livrable." },
    { term: "Hallucination", def: "Réponse confiante mais fausse (chiffre, colonne, fait inventé)." },
    { term: "Prompt", def: "Consigne donnée à l’IA ; plus elle est cadré, moins elle dérive." },
    { term: "Règle d’or", def: "Vérifier tout chiffre avant publication." },
    { term: "Donnée sensible", def: "Info qui peut nuire ou identifier une personne (santé, contact, localisation fine…)." },
    { term: "Anonymisation", def: "Retirer ou masquer les identifiants avant tout partage / prompt." },
    { term: "Vérification indépendante", def: "Recalcul dans SQL/Excel/Python, pas re-demander à l’IA de « confirmer »." },
    { term: "Responsabilité", def: "C’est votre nom (ou celui du programme) sur la note — pas celui du modèle." }
  ],
  modules: [
    {
      id: "m1",
      title: "Cadre levier",
      track: "fondations",
      level: "Fondations",
      image: "assets/illu-logique.jpg",
      summary: "Fort impact possible — après maîtrise du métier.",
      lessons: [
        {
          id: "m1-l1",
          title: "À quoi sert l’IA pour un Data Analyst ?",
          goal: "Séparer levier utile et illusion de compétence.",
          image: "assets/illu-analyste.jpg",
          caption: "Brouillon, explication, structure — puis vous validez.",
          voir: {
            paragraphs: [
              "Bien utilisée (après les fondations), l’IA est un levier : moins de temps perdu sur la syntaxe et le blocage.",
              "Mal utilisée (trop tôt ou sans contrôle), elle invente des totaux, des colonnes, des causes… avec un ton très sûr."
            ],
            analogy: {
              title: "Analogie du stagiaire rapide",
              text: "Brillant pour une première version, dangereux si vous signez sans relire."
            }
          },
          comprendre: {
            paragraphs: ["Bon usage :"],
            bullets: [
              "Aide à écrire SQL / formules / pandas",
              "Aide à comprendre une erreur",
              "Aide à structurer une note",
              "Pas : « Calcule le vrai CA et je publie »"
            ],
            code: {
              label: "mantra",
              lines: "IA = levier (brouillon)\nOutil = exécution\nHumain = responsabilité\nFondations d’abord"
            },
            annotation: "Le pack DA reste la fondation ; l’IA multiplie ensuite."
          },
          pratiquer: {
            prompt: "Citez 2 bons usages et 2 mauvais usages de l’IA en analyse de données.",
            placeholder: "Bon 1: …\nBon 2: …\nMauvais 1: …\nMauvais 2: …",
            hint: "brouillon vs vérité chiffrée",
            checkType: "minLines",
            minLines: 4,
            success: "Cadre clair.",
            fail: "4 lignes."
          },
          verifier: {
            question: "L’IA pour le DA est surtout…",
            options: ["Une source de vérité finale", "Un levier / copilote à vérifier après maîtrise", "Un remplacement de Stats", "Un export Kobo"],
            answer: 1,
            explain: "Levier après maîtrise."
          },
          retenir: [
            "Levier ≠ vérité.",
            "Fondations d’abord.",
            "Responsabilité humaine."
          ]
        }
      ]
    },
    {
      id: "m2",
      title: "Quand oui / quand non",
      track: "fondations",
      level: "Fondations",
      image: "assets/illu-conditions.jpg",
      summary: "Feu vert, orange, rouge.",
      lessons: [
        {
          id: "m2-l1",
          title: "Savoir s’arrêter",
          goal: "Reconnaître les cas où l’IA est dangereuse.",
          image: "assets/illu-donnees.jpg",
          caption: "Le ton confiant n’est pas une preuve.",
          voir: {
            paragraphs: [
              "Feu vert : syntaxe, explication d’erreur, reformulation.",
              "Feu rouge : chiffres non exécutés, données sensibles collées, publication sans contrôle."
            ],
            analogy: {
              title: "Analogie du GPS",
              text: "Utile pour l’itinéraire ; si l’écran dit « traversez la rivière », vous regardez la route."
            }
          },
          comprendre: {
            paragraphs: ["Signaux d’hallucination :"],
            bullets: [
              "Colonnes qui n’existent pas",
              "Pourcentages trop ronds sans source",
              "« Selon l’étude… » sans étude fournie",
              "Code qui ignore vos noms de champs"
            ],
            code: {
              label: "reflexe",
              lines: "Si l’IA donne un chiffre\n→ où a-t-il été calculé ?\nSi nulle part → ne pas publier"
            },
            annotation: "Page Checklist pour l’ancrage."
          },
          pratiquer: {
            prompt: "Classez : (a) expliquer KeyError pandas (b) inventer le CA 2025 (c) coller une liste de patients. → vert / orange / rouge + pourquoi.",
            placeholder: "a) …\nb) …\nc) …",
            hint: "vert / rouge / rouge",
            checkType: "keywords",
            keywords: ["vert", "rouge"],
            success: "Bon discernement.",
            fail: "Utilisez vert/orange/rouge."
          },
          verifier: {
            question: "Publier un chiffre seulement fourni par l’IA…",
            options: ["Est la règle d’or", "Viole la règle d’or", "Est obligatoire en Kobo", "Remplace le n"],
            answer: 1,
            explain: "Toujours vérifier."
          },
          retenir: [
            "Vert / orange / rouge.",
            "Méfiance des chiffres « magiques ».",
            "Arrêter vaut mieux que publier faux."
          ]
        }
      ]
    },
    {
      id: "m3",
      title: "Données sensibles",
      track: "fondations",
      level: "Fondations",
      image: "assets/illu-variables.jpg",
      summary: "Santé, identité, localisation : prudence absolue.",
      lessons: [
        {
          id: "m3-l1",
          title: "Ce qu’on ne colle pas dans un prompt",
          goal: "Protéger les personnes et l’organisation.",
          image: "assets/illu-logique.jpg",
          caption: "Schéma oui · données individuelles non.",
          voir: {
            paragraphs: [
              "Dans un prompt, préférez le schéma (noms de colonnes) et des exemples fictifs.",
              "Évitez : noms, téléphones, adresses, GPS précis, diagnostics individuels, fichiers bruts non anonymisés."
            ],
            analogy: {
              title: "Analogie de la salle d’attente",
              text: "On ne lit pas le dossier médical à voix haute. Un prompt cloud, c’est une conversation potentiellement exposée."
            }
          },
          comprendre: {
            paragraphs: ["Alternatives sûres :"],
            bullets: [
              "Anonymiser (ID fictifs)",
              "Agréger avant (totaux par zone)",
              "Décrire le problème sans coller le fichier",
              "Utiliser les politiques de votre organisation (outil validé / local)"
            ],
            code: {
              label: "safe",
              lines: "OK : colonnes = ville, montant_cdf\nOK : « 1 ligne a quantite vide »\nNON : coller 500 lignes patients réels"
            },
            annotation: "La prudence fait partie du professionnalisme DA."
          },
          pratiquer: {
            prompt: "Réécrivez ce prompt de façon sûre : « Voici l’Excel des malades du CS X avec noms et téléphones, dis-moi la moyenne d’âge ». ",
            placeholder: "Version sûre : …",
            hint: "schéma + agrégats / sans identifiants",
            checkType: "keywords",
            keywords: ["sans", "nom"],
            success: "Réflexe protection OK.",
            fail: "Indiquez clairement l’absence de noms/identifiants."
          },
          verifier: {
            question: "Coller des données de santé identifiables dans une IA cloud…",
            options: ["Est recommandé", "Est à éviter / souvent interdit selon les règles", "Remplace le consentement", "Est obligatoire"],
            answer: 1,
            explain: "Données sensibles."
          },
          retenir: [
            "Schéma > données brutes.",
            "Anonymiser.",
            "Respecter les règles org."
          ]
        }
      ]
    },
    {
      id: "m4",
      title: "Prompts utiles par outil",
      track: "pratique",
      level: "Pratique",
      image: "assets/illu-analyste.jpg",
      summary: "SQL, Excel, Python, storytelling — avec garde-fous.",
      lessons: [
        {
          id: "m4-l1",
          title: "Un bon prompt DA",
          goal: "Cadre, contexte, interdit d’inventer des chiffres.",
          image: "assets/illu-donnees.jpg",
          caption: "Contexte + tâche + format + interdits.",
          voir: {
            paragraphs: [
              "Structure : rôle, schéma/données autorisées, question, format de réponse, interdiction d’inventer des résultats.",
              "Le Labo prompts contient des modèles prêts à copier."
            ],
            analogy: {
              title: "Analogie du brief terrain",
              text: "Plus le brief est précis, moins l’équipe improvise. Pareil pour l’IA."
            }
          },
          comprendre: {
            paragraphs: ["Ingrédients :"],
            bullets: [
              "Outil cible (SQL / Excel / Python / note)",
              "Colonnes réelles",
              "Question métier",
              "« N’invente aucun chiffre de résultat »",
              "Demander aussi les pièges / contrôles"
            ],
            code: {
              label: "skeleton",
              lines: "Rôle\nContexte (schéma)\nTâche\nFormat de sortie\nInterdits (chiffres, données sensibles)"
            },
            annotation: "Ensuite : exécuter dans l’outil du pack."
          },
          pratiquer: {
            prompt: "Écrivez un prompt SQL pour « somme montant par produit » avec interdiction d’inventer les totaux.",
            placeholder: "…",
            hint: "schéma ventes + interdit chiffres",
            checkType: "keywords",
            keywords: ["invent"],
            success: "Prompt cadré.",
            fail: "Mentionnez l’interdiction d’inventer."
          },
          verifier: {
            question: "Après un prompt SQL réussi, l’étape suivante est…",
            options: ["Publier les chiffres de l’IA", "Exécuter et contrôler dans SQL/outil", "Supprimer le schéma", "Ignorer n"],
            answer: 1,
            explain: "Exécution réelle."
          },
          retenir: [
            "Prompt cadré.",
            "Interdire l’invention.",
            "Exécuter ensuite."
          ]
        }
      ]
    },
    {
      id: "m5",
      title: "Vérifier avant de publier",
      track: "pratique",
      level: "Projet",
      image: "assets/hero-atelier.jpg",
      summary: "Checklist finale du levier responsable.",
      lessons: [
        {
          id: "m5-l1",
          title: "La règle d’or en action",
          goal: "Passer la checklist sur un cas ventes.",
          image: "assets/illu-conditions.jpg",
          caption: "Si vous ne pouvez pas expliquer le chiffre, ne le publiez pas.",
          voir: {
            paragraphs: [
              "Cas : l’IA propose une note avec « Kinshasa = 55 % ». Or votre calcul dit ≈ 43 %.",
              "Vous publiez 43 % (votre source), pas 55 % (hallucination possible)."
            ],
            analogy: {
              title: "Analogie du laboratoire",
              text: "On ne publie pas un résultat d’analyse sans contrôle qualité — même si l’appareil « a l’air sûr »."
            }
          },
          comprendre: {
            paragraphs: ["Mini-protocole :"],
            bullets: [
              "Recalcul indépendant (Excel/SQL/Python)",
              "Contrôler n et filtres",
              "Comparer à un ordre de grandeur",
              "Faire relire la reco par un humain métier si enjeu fort",
              "Cocher la Checklist de l’atelier"
            ],
            code: {
              label: "or",
              lines: "RÈGLE D'OR\nVérifier tout chiffre\navant de publier."
            },
            annotation: "C’est le cœur de l’atelier."
          },
          pratiquer: {
            prompt: "Rédigez votre protocole perso en 5 lignes (avant prompt → après réponse → avant publication).",
            placeholder: "1) …\n2) …\n3) …\n4) …\n5) …",
            hint: "vérifier, anonymiser, exécuter…",
            checkType: "minLines",
            minLines: 5,
            success: "Protocole responsable. Levier IA maîtrisé.",
            fail: "5 lignes."
          },
          verifier: {
            question: "La règle d’or est…",
            options: ["Faire confiance au ton de l’IA", "Vérifier tout chiffre avant de publier", "Coller toutes les données brutes", "Éviter SQL"],
            answer: 1,
            explain: "Vérification."
          },
          retenir: [
            "Recalculer.",
            "Checklist.",
            "Responsabilité humaine."
          ]
        }
      ]
    }
  ],
  carnet: {
    title: "Carnet — IA responsable",
    subtitle: "Prompts, garde-fous, vérification",
    sections: [
      {
        title: "A. Cadre",
        exercises: [
          { id: "iA1", prompt: "Listez 5 tâches DA où l’IA est feu vert." },
          { id: "iA2", prompt: "Listez 5 tâches feu rouge." },
          { id: "iA3", prompt: "Écrivez votre règle d’or en 1 phrase." },
          { id: "iA4", prompt: "Politique perso données sensibles (5 lignes)." }
        ]
      },
      {
        title: "B. Prompts",
        exercises: [
          { id: "iB1", prompt: "Adaptez 1 prompt SQL du Labo à votre question." },
          { id: "iB2", prompt: "Adaptez 1 prompt Excel." },
          { id: "iB3", prompt: "Adaptez 1 prompt Python." },
          { id: "iB4", prompt: "Adaptez 1 prompt storytelling AVEC chiffres déjà vérifiés." },
          { id: "iB5", prompt: "Documentez 1 hallucination rencontrée + comment vous l’avez détectée." }
        ]
      },
      {
        title: "C. Publication",
        exercises: [
          { id: "iC1", prompt: "Passez la checklist sur une vraie note." },
          { id: "iC2", prompt: "Faites recaler un total par un collègue / vous-même hors IA." },
          { id: "iC3", prompt: "Décidez : quels outils IA sont autorisés dans votre org ?" }
        ]
      }
    ]
  },
  bilan: {
    title: "Quiz bilan — IA pour Data Analyst",
    subtitle: "12 questions — levier après maîtrise, exigences élevées sur l’éthique.",
    passScore: 75,
    questions: [
      { id: "b1", theme: "role", themeLabel: "Rôle", question: "L’IA est…", options: ["La source de vérité", "Un levier / copilote à vérifier après maîtrise", "Un remplacement de la collecte", "Un type SQL"], answer: 1, explain: "Levier après maîtrise." },
      { id: "b2", theme: "or", themeLabel: "Règle d’or", question: "Avant de publier un chiffre…", options: ["Demander confirmation à l’IA seulement", "Le vérifier dans un outil / calcul réel", "Changer l’unité au hasard", "Retirer n"], answer: 1, explain: "Vérifier." },
      { id: "b3", theme: "risk", themeLabel: "Risques", question: "Une hallucination, c’est…", options: ["Une réponse confiante mais fausse", "Un JOIN", "Un TCD", "Un segment Power BI"], answer: 0, explain: "Faux confiant." },
      { id: "b4", theme: "data", themeLabel: "Données", question: "Coller des noms de patients dans un prompt cloud…", options: ["Est une bonne pratique", "Est à éviter", "Est obligatoire", "Remplace Kobo"], answer: 1, explain: "Sensible." },
      { id: "b5", theme: "prompt", themeLabel: "Prompt", question: "Un bon prompt DA inclut souvent…", options: ["L’interdiction d’inventer des résultats", "Aucune mention du schéma", "Une demande de chiffres sans exécution", "Le mot de passe serveur"], answer: 0, explain: "Garde-fou." },
      { id: "b6", theme: "use", themeLabel: "Usage", question: "Feu vert typique…", options: ["Expliquer une erreur SQL", "Publier sans contrôle", "Inventer une source", "Uploader un dossier médical brut"], answer: 0, explain: "Aide technique." },
      { id: "b7", theme: "use", themeLabel: "Usage", question: "Feu rouge typique…", options: ["Reformuler une note", "Demander le « vrai total » sans calcul", "Demander un plan d’étapes", "Demander le sens d’une erreur"], answer: 1, explain: "Chiffre non exécuté." },
      { id: "b8", theme: "chain", themeLabel: "Chaîne", question: "L’IA remplace-t-elle Stats/SQL ?", options: ["Oui totalement", "Non : elle est un levier après les fondations", "Oui pour Kobo seulement", "Oui pour le storytelling seulement"], answer: 1, explain: "Levier après maîtrise." },
      { id: "b9", theme: "verify", themeLabel: "Vérification", question: "La meilleure vérif d’un total…", options: ["Redemander à la même IA « es-tu sûr ? »", "Recalculer dans SQL/Excel/Python", "Choisir le plus beau graphique", "Supprimer la limite"], answer: 1, explain: "Indépendant." },
      { id: "b10", theme: "data", themeLabel: "Données", question: "Dans un prompt, préférer…", options: ["Le schéma + exemples fictifs", "Le fichier nominatif complet", "Les mots de passe", "Les GPS individuels"], answer: 0, explain: "Minimisation." },
      { id: "b11", theme: "story", themeLabel: "Storytelling", question: "Pour une note, l’IA peut…", options: ["Ajouter des % « pour faire joli »", "Structurer à partir de faits déjà vérifiés", "Remplacer le public", "Effacer la reco"], answer: 1, explain: "Faits fournis." },
      { id: "b12", theme: "or", themeLabel: "Règle d’or", question: "Responsable final du livrable…", options: ["Le modèle d’IA", "L’analyste / l’équipe humaine", "Le fabricant du laptop", "Le hasard"], answer: 1, explain: "Humain." }
    ]
  }
};
