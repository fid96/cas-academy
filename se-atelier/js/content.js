/* Atelier S&E — Expert Suivi & Évaluation opérationnel standard
   Cas fil rouge (exercice public) : projet humanitaire fictif Kalunga — Nutrition & WASH
*/

window.ATELIER = {
  brand: "Atelier S&E",
  mission:
    "Former un Expert S&E opérationnel junior prêt à piloter un système utile — jugement, transfert, go/no-go sur l’évidence.",
  caseStudy: {
    name: "Kalunga — Nutrition & WASH",
    type: "Projet humanitaire fictif (style ONG / UNICEF / OMS / ECHO)",
    duration: "12 mois (urgence → transition)",
    summary:
      "District fictif de Kalunga : malnutrition aiguë, accès limité à l’eau potable, structures de santé sous tension. ONG implémenteur, clusters Nutrition/WASH, autorités sanitaires, bailleur.",
  },
  tracks: [
    {
      id: "fondations",
      title: "Fondations S&E",
      subtitle: "Métier, résultats, indicateurs, plan.",
      goal: "Poser le système avant les outils.",
    },
    {
      id: "operationnel",
      title: "S&E opérationnel",
      subtitle: "Collecte, qualité, reporting, maîtrise, évaluation.",
      goal: "Faire vivre le système jusqu’au dossier défendable (SIG & Qualité plateforme avant le dossier sur le campus).",
    },
  ],
  method: {
    title: "La méthode Expert S&E",
    steps: [
      { num: "01", title: "Voir", text: "Clarifier la décision à éclairer : qui a besoin de quoi, pour quoi faire." },
      { num: "02", title: "Comprendre", text: "Relier résultats → indicateurs → sources → responsabilités." },
      { num: "03", title: "Pratiquer", text: "Produire un artefact du dossier S&E (cadre, fiche, plan, note…)." },
      { num: "04", title: "Vérifier", text: "Contrôler utilité, faisabilité, éthique et lisibilité pour le pilotage." },
    ],
    principles: [
      {
        title: "S&E = pilotage, pas paperasse",
        text: "Un indicateur ou un tableau qui ne change aucune décision est du bruit.",
      },
      {
        title: "Standard d’abord, outils ensuite",
        text: "Kobo, Excel, Power BI servent le système S&E — ils ne le remplacent pas.",
      },
      {
        title: "Cas Kalunga = terrain d’exercice",
        text: "Le métier appris est transférable à d’autres secteurs (santé, éducation, développement…).",
      },
      {
        title: "Éthique et do-no-harm",
        text: "Consentement, données sensibles, redevabilité aux populations : non négociables.",
      },
    ],
  },
  glossary: [
    { term: "S&E", def: "Suivi & Évaluation : produire et utiliser de l’information pour piloter et rendre compte." },
    { term: "MEAL", def: "Monitoring, Evaluation, Accountability, Learning — cadre élargi courant chez les ONG." },
    { term: "Cadre de résultats", def: "Chaîne activités → outputs → outcomes → impact, avec hypothèses." },
    { term: "Indicateur", def: "Mesure précise d’un résultat ; doit avoir définition, calcul, source, fréquence." },
    { term: "Baseline", def: "Valeur de référence avant ou au démarrage ; sert à juger le progrès." },
    { term: "Cible", def: "Niveau attendu à une échéance ; oriente le pilotage." },
    { term: "Output", def: "Produit immédiat des activités (biens/services livrés)." },
    { term: "Outcome", def: "Changement chez les bénéficiaires / institutions, au-delà de la livraison." },
    { term: "Plan de suivi", def: "Qui collecte quoi, comment, quand, pour qui — matrice opérationnelle." },
    { term: "QC", def: "Contrôle qualité des données (complétude, cohérence, aberrances, doublons)." },
    { term: "AAP", def: "Accountability to Affected People — redevabilité envers les populations affectées." },
    { term: "OCDE-CAD", def: "Critères d’évaluation (pertinence, cohérence, efficacité, efficience, impact, durabilité) — esprit de référence." },
  ],
  modules: [],
  carnet: {
    title: "Carnet Expert S&E",
    subtitle: "Dossier Kalunga + épreuve de maîtrise (transfert secteur).",
    sections: [
      {
        title: "A — Système",
        exercises: [
          { id: "A1", prompt: "En 5 lignes : à quelles décisions le S&E de Kalunga doit servir (coordination, bailleur, terrain) ?" },
          { id: "A2", prompt: "Esquissez la chaîne de résultats (activités → impact) en 6–8 cases." },
          { id: "A3", prompt: "Choisissez 4 indicateurs et justifiez pourquoi ils sont utiles (pas « jolis »)." },
        ],
      },
      {
        title: "B — Opération",
        exercises: [
          { id: "B1", prompt: "Pour 2 indicateurs : source, outil, fréquence, responsable, utilisateur de l’info." },
          { id: "B2", prompt: "Listez 5 contrôles QC à faire avant tout reporting." },
          { id: "B3", prompt: "Rédigez une note de suivi (faits → lecture → recommandation → responsable)." },
        ],
      },
      {
        title: "C — Transfert",
        exercises: [
          { id: "C1", prompt: "Reprenez la même méthode pour un projet éducation (hors humanitaire) : 3 indicateurs + 1 risque." },
          { id: "C2", prompt: "Formulez 3 questions évaluatives pour une revue à mi-parcours." },
        ],
      },
      {
        title: "D — Épreuve de maîtrise (transfert)",
        exercises: [
          {
            id: "D1",
            prompt:
              "Sans rouvrir les leçons : projet éducation (ou santé primaire hors Kalunga) — 4 indicateurs + plan de suivi mini + 1 question évaluative mi-parcours.",
          },
          {
            id: "D2",
            prompt: "Justifiez 3 choix : (1) output vs outcome, (2) type d’échantillon / couverture, (3) go/no-go de publication d’un chiffre fragile.",
          },
          {
            id: "D3",
            prompt:
              "Détectez 2 erreurs : « outcome sans baseline ; échantillon de convenance présenté comme national ; reco sans responsable ; évaluation = liste d’indicateurs seulement ».",
          },
          {
            id: "D4",
            prompt: "Note de pilotage 8 lignes (faits → lecture → 2 reco assignées → limite des données → go/no-go).",
          },
          {
            id: "D5",
            prompt: "Auto-éval (0–2) : transfert · justification · détection d’erreurs · quiz ≥80 %.",
          },
        ],
      },
    ],
  },
  bilan: {
    title: "Quiz bilan — Expert S&E",
    subtitle: "Maîtrise opérationnelle junior — métier, jugement, transfert (seuil 80 %).",
    passScore: 80,
    questions: [],
  },
};

(function build() {
  const A = window.ATELIER;

  function L(partial) {
    return Object.assign(
      {
        image: "",
        caption: "",
        voir: { paragraphs: [], analogy: null },
        comprendre: { paragraphs: [], bullets: [] },
        pratiquer: {
          prompt: "",
          placeholder: "",
          hint: "",
          checkType: "keywords",
          keywords: [],
          minLines: 3,
          success: "Bien. Vous produisez un artefact S&E utile.",
          fail: "Complétez avec les éléments demandés.",
        },
        verifier: { question: "", options: [], answer: 0, explain: "" },
        retenir: [],
      },
      partial
    );
  }

  A.modules = [
    {
      id: "m1",
      title: "01 · Métier S&E",
      track: "fondations",
      level: "Fondations",
      summary: "Situer le S&E dans le pilotage de projet.",
      lessons: [
        L({
          id: "m1-l1",
          title: "S&E : à quoi ça sert vraiment ?",
          goal: "Séparer pilotage, redevabilité et paperasse.",
          caption: "Le S&E éclaire des décisions.",
          voir: {
            paragraphs: [
              "Le Suivi & Évaluation existe pour aider à décider, apprendre et rendre compte — pas pour remplir des tableaux.",
              "Sur Kalunga (Nutrition & WASH), sans S&E clair, on livre des activités sans savoir si les enfants guérissent ou si l’eau reste accessible.",
            ],
            analogy: {
              title: "Analogie du tableau de bord véhicule",
              text: "Les voyants servent à conduire. Un voyant décoratif qui n’entraîne aucune action est inutile — voire dangereux.",
            },
          },
          comprendre: {
            paragraphs: [
              "Suivi (monitoring) : information régulière pour piloter pendant le projet.",
              "Évaluation : jugement plus approfondi à un moment clé (mi-parcours, finale…).",
              "MEAL ajoute souvent redevabilité (AAP) et apprentissage organisationnel.",
            ],
            bullets: [
              "S&E ≠ collecte seule",
              "S&E ≠ dashboard seul",
              "S&E = système relié à des décisions",
            ],
          },
          pratiquer: {
            prompt: "Listez 3 décisions concrètes que le S&E doit éclairer sur Kalunga (1 ligne chacune).",
            placeholder: "Ex. 1) Ajuster les rations si…\n2) …",
            hint: "Pensez coordination, terrain, bailleur.",
            checkType: "minLines",
            minLines: 3,
            keywords: [],
            success: "Vous ancrez le S&E dans des décisions — bon réflexe d’expert.",
            fail: "Écrivez au moins 3 lignes de décisions.",
          },
          verifier: {
            question: "Quelle phrase décrit le mieux un Expert S&E opérationnel ?",
            options: [
              "Il maîtrise surtout Power BI.",
              "Il conçoit et fait vivre un système d’info utile au pilotage et à la redevabilité.",
              "Il produit le plus grand nombre d’indicateurs possible.",
              "Il remplace le chef de projet.",
            ],
            answer: 1,
            explain: "L’expertise S&E est systémique : résultats, indicateurs, collecte, qualité, usage.",
          },
          retenir: [
            "S&E sert d’abord à décider.",
            "Outils = moyens.",
            "Kalunga est un cas d’exercice ; la méthode est standard.",
          ],
        }),
        L({
          id: "m1-l2",
          title: "Rôles, éthique, do-no-harm",
          goal: "Clarifier qui fait quoi et les limites éthiques.",
          voir: {
            paragraphs: [
              "Un système S&E implique programme, terrain, S&E, partenaires, parfois clusters et bailleur.",
              "Collecter des données sur la malnutrition ou l’eau touche à la dignité et à la sécurité des personnes.",
            ],
            analogy: {
              title: "Analogie du dossier médical",
              text: "Utile aux soignants, dangereux s’il circule sans cadre. Même logique pour les données S&E sensibles.",
            },
          },
          comprendre: {
            paragraphs: [
              "Responsabilités typiques : définition des indicateurs (S&E + programme), collecte (terrain), QC (S&E), usage (coordination).",
              "Éthique : consentement, minimisation des données, protection, restitution / feedback aux communautés (AAP).",
            ],
            bullets: ["Qui décide ?", "Qui collecte ?", "Qui vérifie ?", "Qui utilise ?", "Qui est exposé au risque ?"],
          },
          pratiquer: {
            prompt: "Pour Kalunga, attribuez en 4 lignes : S&E / Chef de projet / Agent terrain / Bailleur — une responsabilité clé chacun.",
            placeholder: "S&E : …\nChef de projet : …",
            hint: "Une responsabilité claire par acteur.",
            checkType: "keywords",
            keywords: ["s&e", "terrain"],
            success: "Vous cartographiez les rôles — base d’un système réaliste.",
            fail: "Mentionnez au moins S&E et terrain dans votre répartition.",
          },
          verifier: {
            question: "Que signifie « do-no-harm » en S&E ?",
            options: [
              "Ne jamais publier de chiffres.",
              "Éviter que la collecte ou l’usage des données n’aggrave les risques pour les personnes.",
              "Supprimer tous les indicateurs sensibles.",
              "Laisser le bailleur décider seul.",
            ],
            answer: 1,
            explain: "Do-no-harm = ne pas nuire via la collecte, le partage ou l’usage de l’information.",
          },
          retenir: [
            "Rôles clairs = système tenable.",
            "Éthique et AAP font partie du métier.",
            "Moins de données inutiles = moins de risque.",
          ],
        }),
      ],
    },
    {
      id: "m2",
      title: "02 · Cadre de résultats",
      track: "fondations",
      level: "Fondations",
      summary: "Construire une chaîne de résultats défendable.",
      lessons: [
        L({
          id: "m2-l1",
          title: "De l’activité au résultat",
          goal: "Distinguer outputs et outcomes.",
          voir: {
            paragraphs: [
              "Beaucoup de « cadres » listent des activités déguisées en résultats.",
              "Exemple Kalunga : « former 40 agents » est une activité/output ; « pratiques d’hygiène améliorées » vise un outcome.",
            ],
            analogy: {
              title: "Analogie de la cuisine",
              text: "Couper les légumes = activité. Plat servi = output. Invités rassasiés en bonne santé = outcome (simplifié).",
            },
          },
          comprendre: {
            paragraphs: [
              "Activités → outputs (produits/services) → outcomes (changements) → impact (changement de long terme).",
              "Sans hypothèses (si… alors…), la chaîne est magique, pas logique.",
            ],
            bullets: ["Output = livré", "Outcome = changé chez les gens / institutions", "Impact = contribution longue"],
          },
          pratiquer: {
            prompt: "Écrivez une mini-chaîne Kalunga (4 lignes) : 1 activité, 1 output, 1 outcome, 1 impact.",
            placeholder: "Activité : …\nOutput : …\nOutcome : …\nImpact : …",
            hint: "Utilisez les mots Activité / Output / Outcome / Impact.",
            checkType: "keywords",
            keywords: ["output", "outcome"],
            success: "Chaîne posée. Vérifiez qu’aucun outcome n’est en réalité une activité.",
            fail: "Incluez au minimum les mots output et outcome.",
          },
          verifier: {
            question: "« 12 points d’eau réhabilités » est surtout…",
            options: ["Un impact", "Un outcome comportemental", "Un output (produit livré)", "Une hypothèse"],
            answer: 2,
            explain: "C’est un produit/service livré (output). L’usage durable et la réduction des maladies seraient plus proches d’outcomes.",
          },
          retenir: [
            "Nommer correctement le niveau de résultat.",
            "Les hypothèses rendent la chaîne honnête.",
            "Un indicateur orphelin signale un cadre flou.",
          ],
        }),
        L({
          id: "m2-l2",
          title: "Hypothèses, risques, cohérence",
          goal: "Rendre le cadre réaliste et défendable.",
          voir: {
            paragraphs: [
              "Un cadre sans risques est un souhait. Sur Kalunga : rupture de stock RUTF, accès sécuritaire, saison des pluies…",
              "La cohérence relie besoins → réponse → résultats.",
            ],
            analogy: {
              title: "Analogie du pont",
              text: "Les hypothèses sont les piles du pont. Si elles craquent, le résultat ne traverse pas.",
            },
          },
          comprendre: {
            paragraphs: [
              "Hypothèse : condition externe nécessaire (ex. routes praticables pour l’approvisionnement).",
              "Risque : événement qui peut casser la chaîne ; prévoir des signes de suivi.",
            ],
            bullets: ["Écrire 2–4 hypothèses clés", "Lier au moins un indicateur de suivi au risque majeur", "Éviter la surpromesse d’impact"],
          },
          pratiquer: {
            prompt: "Citez 2 hypothèses et 2 risques pour Kalunga (4 lignes).",
            placeholder: "Hypothèse 1 : …\nRisque 1 : …",
            hint: "Soyez concrets (stock, accès, acceptabilité…).",
            checkType: "minLines",
            minLines: 4,
            success: "Vous rendez le cadre défendable — compétence d’expert.",
            fail: "Quatre lignes minimum.",
          },
          verifier: {
            question: "Pourquoi documenter les hypothèses ?",
            options: [
              "Pour allonger le document bailleur",
              "Pour expliquer sous quelles conditions les résultats sont attendus",
              "Pour remplacer les indicateurs",
              "Pour éviter l’évaluation",
            ],
            answer: 1,
            explain: "Les hypothèses clarifient la logique de contribution et les limites du projet.",
          },
          retenir: [
            "Cadre = logique + conditions.",
            "Risques suivis = pilotage anticipatif.",
            "Cohérence > volume de texte.",
          ],
        }),
      ],
    },
    {
      id: "m3",
      title: "03 · Indicateurs & dictionnaire",
      track: "fondations",
      level: "Fondations",
      summary: "Définir, calculer, baseliner, cibler.",
      lessons: [
        L({
          id: "m3-l1",
          title: "Un indicateur utile",
          goal: "Choisir des indicateurs qui servent une décision.",
          voir: {
            paragraphs: [
              "Un indicateur « joli » mais non calculable ou non utilisé est un coût net.",
              "Kalunga : taux de guérison, admissions, % ménages avec eau améliorée — utiles s’ils ont une fiche claire.",
            ],
            analogy: {
              title: "Analogie du thermomètre",
              text: "Il mesure une chose précise. Dix thermomètres mal calibrés n’aident personne.",
            },
          },
          comprendre: {
            paragraphs: [
              "Fiche minimale : nom, définition, numérateur/dénominateur, désagrégation, fréquence, source, responsable.",
              "Baseline et cible transforment l’indicateur en outil de pilotage.",
            ],
            bullets: ["Clair", "Mesurable", "Lié à un résultat", "Faisable à collecter", "Utilisé par quelqu’un"],
          },
          pratiquer: {
            prompt: "Rédigez une fiche courte pour « taux de guérison » (définition + formule + fréquence).",
            placeholder: "Définition : …\nFormule : …\nFréquence : …",
            hint: "Incluez les mots définition et formule.",
            checkType: "keywords",
            keywords: ["définition", "formule"],
            success: "Fiche amorcée — base du dictionnaire d’indicateurs.",
            fail: "Incluez définition et formule.",
          },
          verifier: {
            question: "Sans baseline, que perd-on surtout ?",
            options: [
              "La couleur du dashboard",
              "La capacité à juger le progrès par rapport à un point de départ",
              "Le droit d’évaluer",
              "La collecte Kobo",
            ],
            answer: 1,
            explain: "La baseline est la référence pour interpréter les résultats.",
          },
          retenir: [
            "Pas d’indicateur sans fiche.",
            "Baseline + cible = sens.",
            "Moins d’indicateurs, mieux définis.",
          ],
        }),
        L({
          id: "m3-l2",
          title: "Dictionnaire & désagrégation",
          goal: "Documenter pour que toute l’équipe calcule pareil.",
          voir: {
            paragraphs: [
              "Sans dictionnaire, chaque base calcule « à sa façon » : les réunions deviennent des disputes de chiffres.",
              "Désagréger (sexe, âge, zone) révèle des inégalités invisibles dans la moyenne.",
            ],
            analogy: {
              title: "Analogie du glossaire projet",
              text: "Si « ménage » n’est pas défini, l’enquête mesure des choses différentes.",
            },
          },
          comprendre: {
            paragraphs: [
              "Le dictionnaire est la loi interne du calcul.",
              "Choisir 2–3 désagrégations prioritaires plutôt que tout découper.",
            ],
            bullets: ["Définition opérationnelle", "Règles d’inclusion/exclusion", "Qui valide une modification de fiche"],
          },
          pratiquer: {
            prompt: "Pour Kalunga, proposez 3 désagrégations prioritaires et pourquoi (3 lignes).",
            placeholder: "1) … parce que …",
            hint: "Ex. sexe, aire de santé, statut déplacé…",
            checkType: "minLines",
            minLines: 3,
            success: "Vous priorisez l’analyse utile — bon réflexe.",
            fail: "Trois lignes minimum.",
          },
          verifier: {
            question: "Le dictionnaire d’indicateurs sert surtout à…",
            options: [
              "Remplacer le cadre de résultats",
              "Garantir une définition et un calcul communs",
              "Impressionner le cluster",
              "Éviter la baseline",
            ],
            answer: 1,
            explain: "Il standardise le langage et le calcul dans l’équipe et avec les partenaires.",
          },
          retenir: [
            "Dictionnaire = contrat de calcul.",
            "Désagréger avec intention.",
            "Toute modification de fiche se documente.",
          ],
        }),
      ],
    },
    {
      id: "m4",
      title: "04 · Plan de suivi",
      track: "fondations",
      level: "Fondations",
      summary: "Qui collecte quoi, quand, pour qui.",
      lessons: [
        L({
          id: "m4-l1",
          title: "Matrice opérationnelle",
          goal: "Transformer le cadre en plan exécutable.",
          voir: {
            paragraphs: [
              "Un beau cadre sans plan de suivi reste théorique.",
              "La matrice relie indicateur → source → outil → fréquence → responsable → utilisateur.",
            ],
            analogy: {
              title: "Analogie de la tournée terrain",
              text: "Sans planning de qui passe où et quand, les données arrivent en retard — ou jamais.",
            },
          },
          comprendre: {
            paragraphs: [
              "Chaque indicateur doit avoir un « propriétaire » de la donnée et un « consommateur » de l’info.",
              "Si personne n’utilise l’info, retirez l’indicateur.",
            ],
            bullets: ["Source primaire vs secondaire", "Fréquence réaliste", "Charge de travail terrain"],
          },
          pratiquer: {
            prompt: "Pour 1 indicateur Kalunga, écrivez : source / outil / fréquence / responsable / utilisateur.",
            placeholder: "Indicateur : …\nSource : …\nOutil : …\nFréquence : …\nResponsable : …\nUtilisateur : …",
            hint: "Incluez les mots source et fréquence.",
            checkType: "keywords",
            keywords: ["source", "fréquence"],
            success: "Ligne de matrice posée.",
            fail: "Précisez au moins source et fréquence.",
          },
          verifier: {
            question: "Un plan de suivi « mort » est souvent dû à…",
            options: [
              "Trop peu d’indicateurs",
              "Fréquences irréalistes ou responsabilités floues",
              "Absence de Power BI",
              "Trop de baseline",
            ],
            answer: 1,
            explain: "Faisabilité et clarté des rôles déterminent si le plan vit.",
          },
          retenir: [
            "Matrice = cœur opérationnel.",
            "Pas d’indicateur sans utilisateur.",
            "La charge terrain limite le système.",
          ],
        }),
        L({
          id: "m4-l2",
          title: "Calendrier & flux d’information",
          goal: "Synchroniser collecte, analyse et reporting.",
          voir: {
            paragraphs: [
              "Reporting cluster/bailleur impose des échéances. Le flux interne doit les anticiper.",
              "Kalunga : données hebdo nutrition, mensuel WASH, note de pilotage mensuelle.",
            ],
            analogy: {
              title: "Analogie de la chaîne du froid",
              text: "Si un maillon est en retard, tout le reporting « tourne ».",
            },
          },
          comprendre: {
            paragraphs: [
              "Flux typique : terrain → consolidation → QC → analyse → décision → feedback.",
              "Prévoir des dates de gel des données (data cut-off).",
            ],
            bullets: ["Calendrier interne", "Calendrier externe", "Cut-off", "Responsable de consolidation"],
          },
          pratiquer: {
            prompt: "Proposez un mini-calendrier mensuel Kalunga (4 étapes avec semaine approximative).",
            placeholder: "S1 : collecte…\nS2 : …",
            hint: "4 lignes.",
            checkType: "minLines",
            minLines: 4,
            success: "Calendrier amorcé — base d’un rythme de pilotage.",
            fail: "Quatre étapes minimum.",
          },
          verifier: {
            question: "À quoi sert un data cut-off ?",
            options: [
              "À supprimer les anciennes données",
              "À figer une période pour analyser/reporter de façon cohérente",
              "À éviter l’évaluation",
              "À remplacer le QC",
            ],
            answer: 1,
            explain: "Le cut-off évite de comparer des chiffres qui bougent pendant la rédaction du rapport.",
          },
          retenir: [
            "Le rythme fait le système.",
            "Anticiper les échéances externes.",
            "Feedback vers le terrain ferme la boucle.",
          ],
        }),
      ],
    },
    {
      id: "m5",
      title: "05 · Collecte S&E",
      track: "operationnel",
      level: "Opérationnel",
      summary: "Relier indicateurs et données terrain.",
      lessons: [
        L({
          id: "m5-l1",
          title: "Indicateur → questions / variables",
          goal: "Ne collecter que ce qui sert.",
          voir: {
            paragraphs: [
              "La collecte S&E part de l’indicateur, pas de l’envie d’un long formulaire.",
              "Registres santé, enquêtes ménages, observation, Kobo : choisir selon la source prévue dans le plan.",
            ],
            analogy: {
              title: "Analogie de la liste de courses",
              text: "On achète pour la recette. Pas tout le supermarché « au cas où ».",
            },
          },
          comprendre: {
            paragraphs: [
              "Matrice indicateur ↔ variables/questions ↔ contrôles de saisie.",
              "Formation des enquêteurs = qualité à la source.",
            ],
            bullets: ["Variable nécessaire", "Variable nice-to-have (souvent à couper)", "Métadonnées (date, lieu, équipe)"],
          },
          pratiquer: {
            prompt: "Pour « % ménages avec source d’eau améliorée », listez 3 variables/questions indispensables.",
            placeholder: "1) …\n2) …\n3) …",
            hint: "Pensez définition de ménage, type de source, usage.",
            checkType: "minLines",
            minLines: 3,
            success: "Vous reliez indicateur et collecte — cœur du S&E opérationnel.",
            fail: "Trois variables/questions minimum.",
          },
          verifier: {
            question: "Que faire d’une question du formulaire qui ne sert aucun indicateur ni décision ?",
            options: [
              "La garder pour la beauté du dataset",
              "La supprimer ou la justifier explicitement",
              "La mettre en premier",
              "La demander à l’IA",
            ],
            answer: 1,
            explain: "Minimiser la collecte réduit charge, coût et risques éthiques.",
          },
          retenir: [
            "Collecte pilotée par les indicateurs.",
            "Former ceux qui saisissent.",
            "Métadonnées = traçabilité.",
          ],
        }),
        L({
          id: "m5-l2",
          title: "Éthique de collecte & AAP léger",
          goal: "Protéger les personnes tout en informant le projet.",
          voir: {
            paragraphs: [
              "Consentement, confidentialité, lieux sûrs d’entretien : non optionnels.",
              "AAP : canaux de plainte/feedback et boucle de réponse — le S&E y contribue.",
            ],
            analogy: {
              title: "Analogie de la porte ouverte",
              text: "Recueillir sans écouter les plaintes, c’est extraire sans relation.",
            },
          },
          comprendre: {
            paragraphs: [
              "Données de nutrition et santé : sensibilité élevée.",
              "Anonymisation / agrégation avant partage large.",
            ],
            bullets: ["Consentement éclairé", "Minimisation", "Stockage sécurisé", "Feedback communautaire"],
          },
          pratiquer: {
            prompt: "Rédigez 3 règles d’or éthiques pour les enquêteurs Kalunga.",
            placeholder: "1) …\n2) …\n3) …",
            hint: "Consentement, refus possible, données sensibles…",
            checkType: "minLines",
            minLines: 3,
            success: "Règles posées — à intégrer au briefing terrain.",
            fail: "Trois règles minimum.",
          },
          verifier: {
            question: "AAP désigne surtout…",
            options: [
              "Un logiciel de BI",
              "La redevabilité envers les populations affectées",
              "Un type d’indicateur output",
              "Un cluster WASH",
            ],
            answer: 1,
            explain: "Accountability to Affected People : écouter, répondre, adapter.",
          },
          retenir: [
            "Éthique = compétence S&E.",
            "Feedback ferme la boucle AAP.",
            "Partager le minimum nécessaire.",
          ],
        }),
      ],
    },
    {
      id: "m6",
      title: "06 · Qualité & analyse",
      track: "operationnel",
      level: "Opérationnel",
      summary: "Fiabiliser puis lire pour décider.",
      lessons: [
        L({
          id: "m6-l1",
          title: "Contrôles qualité (QC)",
          goal: "Détecter les données qui trompent.",
          voir: {
            paragraphs: [
              "Une courbe élégante sur données sales induit de mauvaises décisions.",
              "QC : complétude, doublons, valeurs aberrantes, cohérence (ex. guérisons > admissions).",
            ],
            analogy: {
              title: "Analogie du filtre à eau",
              text: "Avant de boire (décider), on filtre. Le reporting sans QC, c’est boire l’eau du marigot.",
            },
          },
          comprendre: {
            paragraphs: [
              "Documenter les corrections (journal QC).",
              "Séparer erreur de saisie et signal métier réel.",
            ],
            bullets: ["Complétude", "Unicité", "Bornes", "Cohérence croisée", "Ponctualité"],
          },
          pratiquer: {
            prompt: "Listez 5 contrôles QC que vous appliqueriez avant le reporting mensuel Kalunga.",
            placeholder: "1) …",
            hint: "Cinq contrôles.",
            checkType: "minLines",
            minLines: 5,
            success: "Checklist QC amorcée.",
            fail: "Cinq contrôles minimum.",
          },
          verifier: {
            question: "Pourquoi journaliser les corrections QC ?",
            options: [
              "Pour la décoration du dossier",
              "Pour traçabilité, auditabilité et apprentissage",
              "Pour ralentir l’équipe",
              "Pour éviter les indicateurs",
            ],
            answer: 1,
            explain: "La traçabilité protège l’équipe et la crédibilité des chiffres.",
          },
          retenir: [
            "Pas de reporting sans QC.",
            "Journaliser les corrections.",
            "Distinguer erreur et signal.",
          ],
        }),
        L({
          id: "m6-l2",
          title: "Lire les écarts pour piloter",
          goal: "Passer du chiffre à la question de décision.",
          voir: {
            paragraphs: [
              "Réalisé vs cible, tendance, désagrégation : trois lectures de base.",
              "Un écart n’est pas une accusation — c’est une question : pourquoi ? que fait-on ?",
            ],
            analogy: {
              title: "Analogie du GPS",
              text: "L’écart à l’itinéraire propose un recalcul — pas un jugement moral.",
            },
          },
          comprendre: {
            paragraphs: [
              "Formuler des alertes (seuils) quand c’est pertinent.",
              "Toujours relier l’analyse à un responsable d’action.",
            ],
            bullets: ["Écart", "Cause plausible", "Option d’action", "Qui décide"],
          },
          pratiquer: {
            prompt: "Écart fictif : taux de guérison 62% vs cible 75%. Écrivez 2 causes plausibles et 1 action.",
            placeholder: "Cause 1 : …\nCause 2 : …\nAction : …",
            hint: "3 lignes.",
            checkType: "minLines",
            minLines: 3,
            success: "Vous transformez l’écart en pilotage.",
            fail: "Trois lignes minimum.",
          },
          verifier: {
            question: "Une bonne analyse S&E se termine souvent par…",
            options: [
              "Plus de graphiques",
              "Une question/action de pilotage claire",
              "Une excuse",
              "La suppression de la cible",
            ],
            answer: 1,
            explain: "L’analyse doit ouvrir une décision, pas seulement décrire.",
          },
          retenir: [
            "Écart → question → action.",
            "Désagréger pour voir les inégalités.",
            "Seuils d’alerte utiles s’ils sont tenus.",
          ],
        }),
      ],
    },
    {
      id: "m7",
      title: "07 · Reporting & pilotage",
      track: "operationnel",
      level: "Opérationnel",
      summary: "Informer pour faire agir.",
      lessons: [
        L({
          id: "m7-l1",
          title: "Le bon format pour le bon public",
          goal: "Adapter dashboard et note de suivi.",
          voir: {
            paragraphs: [
              "Coordination, bailleur, communauté, équipe terrain : besoins différents.",
              "Dashboard pour surveiller ; note pour décider et tracer des responsabilités.",
            ],
            analogy: {
              title: "Analogie du briefing",
              text: "On ne lit pas le même briefing au pilote et aux passagers.",
            },
          },
          comprendre: {
            paragraphs: [
              "Éviter vanity metrics (chiffres flatteurs sans lien à la décision).",
              "Une page claire bat dix pages non lues.",
            ],
            bullets: ["Public", "Décision attendue", "Indicateurs clés", "Recommandations"],
          },
          pratiquer: {
            prompt: "Pour une note mensuelle Kalunga, proposez le plan en 4 blocs (titres seuls).",
            placeholder: "1) …\n2) …",
            hint: "Faits / lecture / reco / responsable…",
            checkType: "minLines",
            minLines: 4,
            success: "Structure de note posée.",
            fail: "Quatre blocs minimum.",
          },
          verifier: {
            question: "Un reporting réussit si…",
            options: [
              "Il est très long",
              "Il change ou confirme une action de pilotage",
              "Il a le plus de couleurs",
              "Il évite les écarts négatifs",
            ],
            answer: 1,
            explain: "L’utilité se mesure à l’usage décisionnel.",
          },
          retenir: [
            "Public d’abord.",
            "Note = faits + lecture + action.",
            "Couper le superflu.",
          ],
        }),
        L({
          id: "m7-l2",
          title: "Recommandations actionnables",
          goal: "Écrire des reco que quelqu’un peut exécuter.",
          voir: {
            paragraphs: [
              "« Il faut améliorer la qualité » n’est pas une recommandation.",
              "Mieux : « D’ici le 15, superviser 4 sites à faible guérison (liste) — responsable nutritioniste. »",
            ],
            analogy: {
              title: "Analogie de l’ordonnance",
              text: "Dose, durée, responsable — sinon ce n’est pas exécutable.",
            },
          },
          comprendre: {
            paragraphs: [
              "Reco = action + délai + responsable + moyen de vérification.",
              "Limiter à 3 reco prioritaires par note.",
            ],
            bullets: ["Spécifique", "Assignée", "Datée", "Vérifiable"],
          },
          pratiquer: {
            prompt: "Réécrivez une reco actionnable pour un site WASH en panne (1–2 phrases).",
            placeholder: "Action : … d’ici … responsable …",
            hint: "Incluez un délai ou un responsable.",
            checkType: "keywords",
            keywords: ["responsable"],
            success: "Reco exécutable — signature de l’expert S&E.",
            fail: "Mentionnez un responsable (ou équivalent clair).",
          },
          verifier: {
            question: "Combien de recommandations prioritaires viser par note courte ?",
            options: ["15+", "Environ 1–3", "Aucune", "Une par indicateur"],
            answer: 1,
            explain: "Trop de reco = aucune priorisée.",
          },
          retenir: [
            "Reco = action + qui + quand.",
            "Prioriser.",
            "Suivre l’exécution des reco.",
          ],
        }),
      ],
    },
    {
      id: "m9",
      title: "08 · Maîtrise S&E",
      track: "operationnel",
      level: "Maîtrise",
      summary: "Échantillonnage, qualité d’indicateur, méthodes d’éval légères, go/no-go de reporting.",
      lessons: [
        L({
          id: "m9-l1",
          title: "Échantillon & couverture (jugement)",
          goal: "Borner ce que les données permettent vraiment de conclure.",
          caption: "Un échantillon de convenance n’est pas « le pays ».",
          voir: {
            paragraphs: [
              "Recensement vs échantillon ; convenance vs raisonné ; biais d’accès/sécurité à Kalunga.",
              "Phrase type : « Sur les sites atteints ce mois… » — pas « toute la province » sans preuve.",
            ],
            analogy: {
              title: "Analogie du projecteur",
              text: "Le projecteur éclaire une zone. On ne décrit pas toute la salle comme si elle était illuminée.",
            },
          },
          comprendre: {
            paragraphs: ["Avant de généraliser :"],
            bullets: [
              "Population / unité (ménage, site, aire)",
              "Couverture réelle vs souhaitée",
              "Biais possibles (accès, refus, saison)",
              "Niveau de confiance dans le reporting",
            ],
            code: {
              label: "cadre",
              lines: "Unité : site WASH\nn atteints : 12 / 40 prévus\nLimite : pas de tirage aléatoire\n→ conclusions bornées",
            },
          },
          pratiquer: {
            prompt: "En 4 lignes : unité, n, 1 biais, phrase « Sur cet échantillon… » pour Kalunga ou un autre secteur.",
            placeholder: "1) …\n2) …\n3) …\n4) …",
            hint: "échantillon / couverture",
            checkType: "keywords",
            keywords: ["échantillon"],
            success: "Cadre d’inférence S&E posé.",
            fail: "Mentionnez l’échantillon.",
          },
          verifier: {
            question: "Présenter un échantillon de convenance comme représentatif national…",
            options: [
              "Est toujours correct",
              "Est un risque de fausse décision",
              "Remplace la baseline",
              "Est exigé par le cadre de résultats",
            ],
            answer: 1,
            explain: "Borner la généralisation.",
          },
          retenir: ["Borner la couverture.", "Nommer les biais.", "Phrase « Sur cet échantillon… »."],
        }),
        L({
          id: "m9-l2",
          title: "Indicateur utile vs indicateur « joli »",
          goal: "Détecter les indicateurs non calculables ou qui sur-déclarent l’outcome.",
          caption: "Mesurable, lié à une décision, baseline/cible réalistes.",
          voir: {
            paragraphs: [
              "Pièges : outcome formulé comme un output ; cible sans baseline ; indicateur sans source ni calcul.",
              "Le junior S&E refuse l’indicateur décoratif même s’il plaît au slide.",
            ],
            analogy: {
              title: "Analogie du tableau de bord voiture",
              text: "Une jauge sans capteur relié est un sticker — pas un indicateur.",
            },
          },
          comprendre: {
            paragraphs: ["Checklist qualité de conception :"],
            bullets: [
              "Définition + formule",
              "Source / fréquence / responsable",
              "Baseline et cible réalistes",
              "Niveau (output vs outcome) cohérent",
              "Utilisateur de l’info identifié",
            ],
          },
          pratiquer: {
            prompt: "Prenez 1 mauvais indicateur inventé et réécrivez-le en 5 lignes (définition, calcul, source, baseline/cible, usage).",
            placeholder: "Mauvais : …\nRéécrit : …",
            hint: "calcul / source",
            checkType: "minLines",
            minLines: 5,
            success: "Conception d’indicateur sous contrôle.",
            fail: "5 lignes.",
          },
          verifier: {
            question: "Un indicateur sans méthode de calcul…",
            options: [
              "Reste utile pour le pilotage",
              "Est fragile / non défendable",
              "Remplace le cadre",
              "Est obligatoire en annexe",
            ],
            answer: 1,
            explain: "Calculable ou rien.",
          },
          retenir: ["Calcul + source.", "Niveau cohérent.", "Usage décisionnel."],
        }),
        L({
          id: "m9-l3",
          title: "Éval légère & go/no-go reporting",
          goal: "Choisir une méthode d’apprentissage légère et savoir quand ne pas publier un chiffre.",
          caption: "Questions → méthode simple ; évidence insuffisante → caveat ou silence.",
          voir: {
            paragraphs: [
              "Méthodes légères : revue documentaire, KII, FGD, sondage court — selon la question, pas selon la mode.",
              "Go/no-go reporting : peut-on piloter / publier avec ce niveau d’évidence, ou faut-il un caveat / un report ?",
            ],
            analogy: {
              title: "Analogie du feu de signalisation",
              text: "Vert = publier ; orange = publier avec limite ; rouge = ne pas prétendre savoir.",
            },
          },
          comprendre: {
            paragraphs: ["Jugement junior :"],
            bullets: [
              "Question évaluative d’abord",
              "Méthode proportionnée (coût / délai / risque)",
              "QC et couverture avant le slide",
              "Reco assignées ou pas de reco",
              "Go / caveat / no-go explicite",
            ],
            code: {
              label: "gate",
              lines: "Évidence OK ? Couverture OK ?\nQC documenté ?\n→ GO / CAVEAT / NO-GO\n+ 1 phrase de limite",
            },
            annotation: "Carnet D = épreuve de maîtrise. Quiz bilan seuil 80 %.",
          },
          pratiquer: {
            prompt: "Scénario : n=8 sites, 2 indicateurs sans baseline. Décision go/caveat/no-go + 3 lignes de justification.",
            placeholder: "Décision : …\n1) …\n2) …\n3) …",
            hint: "go / caveat / no-go",
            checkType: "keywords",
            keywords: ["go"],
            success: "Jugement de publication posé.",
            fail: "Indiquez go, caveat ou no-go.",
          },
          verifier: {
            question: "Publier un chiffre fragile sans caveat…",
            options: [
              "Est la bonne pratique S&E",
              "Risque de fausse décision / perte de crédibilité",
              "Remplace l’évaluation",
              "Est exigé par le reporting",
            ],
            answer: 1,
            explain: "Redevabilité = honnêteté sur l’évidence.",
          },
          retenir: ["Question → méthode.", "Proportionnalité.", "Go / caveat / no-go."],
        }),
      ],
    },
    {
      id: "m8",
      title: "09 · Évaluation & dossier",
      track: "operationnel",
      level: "Projet",
      summary: "Questions évaluatives et dossier défendable — après maîtrise.",
      lessons: [
        L({
          id: "m8-l1",
          title: "Évaluer sans confondre avec le suivi",
          goal: "Formuler des questions évaluatives utiles.",
          voir: {
            paragraphs: [
              "Le suivi dit « où en est-on ? ». L’évaluation interroge valeur, effets, apprentissages.",
              "Esprit OCDE-CAD : pertinence, efficacité, etc. — adaptés au niveau du projet.",
            ],
            analogy: {
              title: "Analogie du match",
              text: "Le score en direct = suivi. Le debrief tactique = évaluation.",
            },
          },
          comprendre: {
            paragraphs: [
              "Types courants : temps réel, mi-parcours, finale — selon besoin d’apprentissage.",
              "Les questions évaluatives ne se réduisent pas à une liste d’indicateurs.",
            ],
            bullets: ["Pourquoi ce résultat ?", "Pour qui ça marche / ne marche pas ?", "Que faut-il changer ?"],
          },
          pratiquer: {
            prompt: "Formulez 3 questions évaluatives pour une revue à mi-parcours Kalunga.",
            placeholder: "1) …",
            hint: "Questions ouvertes, orientées usage.",
            checkType: "minLines",
            minLines: 3,
            success: "Questions posées — base d’une évaluation utile.",
            fail: "Trois questions minimum.",
          },
          verifier: {
            question: "Une évaluation sans intention d’usage est…",
            options: [
              "Idéale",
              "Surtout un coût administratif",
              "Obligatoire pour Kobo",
              "Un output WASH",
            ],
            answer: 1,
            explain: "Évaluer pour apprendre et décider — sinon effort gaspillé.",
          },
          retenir: [
            "Suivi ≠ évaluation.",
            "Questions avant méthodes.",
            "Prévoir l’usage des findings.",
          ],
        }),
        L({
          id: "m8-l2",
          title: "Dossier S&E prêt revue",
          goal: "Assembler les pièces d’un système crédible.",
          voir: {
            paragraphs: [
              "Un Expert S&E laisse un dossier : cadre, dictionnaire, plan, outils, QC, reports, reco, apprentissages.",
              "Kalunga : checklist finale de complétude avant revue bailleur / audit léger.",
            ],
            analogy: {
              title: "Analogie du dossier patient structuré",
              text: "On doit pouvoir retracer comment un chiffre est né.",
            },
          },
          comprendre: {
            paragraphs: [
              "Traçabilité : de l’indicateur à la cellule/source.",
              "Capitalisation : 5 apprentissages actionnables valent mieux qu’un long récit.",
            ],
            bullets: ["Cadre", "Dictionnaire", "Plan", "Collecte", "QC", "Reporting", "Éval / apprentissages"],
          },
          pratiquer: {
            prompt: "Cochez mentalement et listez 5 pièces déjà prêtes / manquantes pour votre dossier Kalunga.",
            placeholder: "Prêt : …\nManquant : …",
            hint: "Au moins 5 lignes d’inventaire.",
            checkType: "minLines",
            minLines: 5,
            success: "Inventaire dossier — vous pilotez la complétude.",
            fail: "Cinq lignes minimum.",
          },
          verifier: {
            question: "La marque d’un Expert S&E standard, c’est surtout…",
            options: [
              "Posséder un certificat outil",
              "Savoir faire vivre un système S&E utile et défendable, transférable d’un projet à l’autre",
              "Produire le plus de pages",
              "Éviter le terrain",
            ],
            answer: 1,
            explain: "L’expertise est systémique, opérationnelle et transférable — cas Kalunga = terrain d’entraînement.",
          },
          retenir: [
            "Dossier = mémoire du système.",
            "Traçabilité des chiffres.",
            "Méthode standard > dépendance à un seul projet.",
          ],
        }),
      ],
    },
  ];

  A.bilan.questions = [
    {
      id: "q1",
      theme: "metier",
      themeLabel: "Métier",
      question: "Le S&E opérationnel vise d’abord à…",
      options: ["Remplir des annexes", "Éclairer des décisions de pilotage et de redevabilité", "Remplacer le programme", "Maximiser le nombre d’indicateurs"],
      answer: 1,
    },
    {
      id: "q2",
      theme: "cadre",
      themeLabel: "Cadre",
      question: "Un output désigne…",
      options: ["Un changement de long terme", "Un produit/service livré par les activités", "Une hypothèse", "Un bailleur"],
      answer: 1,
    },
    {
      id: "q3",
      theme: "indicateurs",
      themeLabel: "Indicateurs",
      question: "Une fiche indicateur doit au minimum préciser…",
      options: ["La couleur du graphique", "Définition et méthode de calcul", "Le logo du cluster", "Le salaire des enquêteurs"],
      answer: 1,
    },
    {
      id: "q4",
      theme: "indicateurs",
      themeLabel: "Indicateurs",
      question: "La baseline sert à…",
      options: ["Décorer le cadre", "Disposer d’une référence pour juger le progrès", "Remplacer la cible", "Éviter le QC"],
      answer: 1,
    },
    {
      id: "q5",
      theme: "plan",
      themeLabel: "Plan de suivi",
      question: "Dans la matrice de suivi, chaque indicateur devrait avoir…",
      options: ["Un responsable et un utilisateur de l’information", "Uniquement un bel intitulé", "Dix sources", "Aucun lien au cadre"],
      answer: 0,
    },
    {
      id: "q6",
      theme: "collecte",
      themeLabel: "Collecte",
      question: "La collecte S&E doit être…",
      options: ["La plus longue possible", "Pilotée par les besoins d’indicateurs/décisions", "Indépendante du plan", "Sans métadonnées"],
      answer: 1,
    },
    {
      id: "q7",
      theme: "ethique",
      themeLabel: "Éthique",
      question: "Do-no-harm en S&E signifie surtout…",
      options: ["Ne pas évaluer", "Ne pas aggraver les risques via la donnée", "Ne pas parler aux communautés", "Ne pas utiliser Excel"],
      answer: 1,
    },
    {
      id: "q8",
      theme: "qc",
      themeLabel: "Qualité",
      question: "Avant reporting, on devrait…",
      options: ["Publier vite", "Appliquer des contrôles QC et documenter les corrections", "Supprimer les écarts négatifs", "Changer la baseline"],
      answer: 1,
    },
    {
      id: "q9",
      theme: "analyse",
      themeLabel: "Analyse",
      question: "Un écart à la cible doit mener à…",
      options: ["Une question/action de pilotage", "La panique", "L’abandon du S&E", "Plus de couleurs"],
      answer: 0,
    },
    {
      id: "q10",
      theme: "reporting",
      themeLabel: "Reporting",
      question: "Une recommandation actionnable précise souvent…",
      options: ["Seulement le problème", "Action, délai et responsable", "Le sentiment de l’auteur", "Le nombre de pages"],
      answer: 1,
    },
    {
      id: "q11",
      theme: "evaluation",
      themeLabel: "Évaluation",
      question: "Suivi et évaluation…",
      options: ["Sont strictement identiques", "Répondent à des besoins différents (pilotage régulier vs jugement/apprentissage plus profond)", "S’excluent", "Remplacent le cadre"],
      answer: 1,
    },
    {
      id: "q12",
      theme: "metier",
      themeLabel: "Transfert",
      question: "Le cas Kalunga dans ce pack sert surtout à…",
      options: [
        "Limiter l’expertise au seul humanitaire",
        "Entraîner une méthode S&E standard transférable à d’autres projets",
        "Remplacer les standards OCDE",
        "Éviter les indicateurs",
      ],
      answer: 1,
    },
    {
      id: "q13",
      theme: "echantillon",
      themeLabel: "Échantillon",
      question: "Un échantillon de convenance présenté comme national…",
      options: ["Est toujours valide", "Risque de fausse décision", "Remplace la baseline", "Est obligatoire"],
      answer: 1,
      explain: "Borner la couverture.",
    },
    {
      id: "q14",
      theme: "indicateurs",
      themeLabel: "Indicateurs",
      question: "Un indicateur sans méthode de calcul…",
      options: ["Reste défendable", "Est fragile pour le pilotage", "Remplace le cadre", "Est un output"],
      answer: 1,
      explain: "Calculable.",
    },
    {
      id: "q15",
      theme: "evaluation",
      themeLabel: "Évaluation",
      question: "Avant de choisir une méthode d’évaluation légère, on…",
      options: ["Choisit l’outil à la mode", "Pose la question évaluative et l’usage prévu", "Ignore le coût", "Remplace le suivi"],
      answer: 1,
      explain: "Question d’abord.",
    },
    {
      id: "q16",
      theme: "reporting",
      themeLabel: "Reporting",
      question: "Go / caveat / no-go sert à…",
      options: ["Décorer la note", "Décider si l’évidence permet de publier / piloter", "Supprimer les reco", "Éviter le QC"],
      answer: 1,
      explain: "Jugement d’évidence.",
    },
    {
      id: "q17",
      theme: "maitrise",
      themeLabel: "Maîtrise",
      question: "L’épreuve de transfert S&E demande surtout…",
      options: ["Recopier Kalunga", "Appliquer la méthode à un autre secteur sans guide", "Éviter les justifications", "Baisser le seuil"],
      answer: 1,
      explain: "Autonomie.",
    },
    {
      id: "q18",
      theme: "maitrise",
      themeLabel: "Maîtrise",
      question: "Seuil du quiz bilan (maîtrise junior)…",
      options: ["50 %", "70 %", "80 %", "0 %"],
      answer: 2,
      explain: "80 %.",
    },
  ];
})();
