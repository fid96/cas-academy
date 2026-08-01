/* IA Atelier — banque de prompts responsables */

window.PromptLab = (function () {
  const PROMPTS = {
    sql: [
      {
        id: "sql-draft",
        title: "Brouillon de requête",
        when: "Vous savez la question, pas encore la syntaxe.",
        risk: "La requête peut être syntaxiquement jolie et métierment fausse.",
        verify: "Exécuter sur un petit échantillon ; contrôler n et total à la main.",
        prompt: `Tu es un assistant SQL pédagogique.
Contexte tables :
- ventes(vente_id, date, ville, produit, quantite, montant_cdf, client_id)
- clients(client_id, organisation, type_client, province)
Question métier : total des montants par ville, trié DESC.
Donne :
1) la requête SQLite
2) ce qu'elle répond en une phrase
3) 2 pièges possibles
N'invente aucun chiffre de résultat.`
      },
      {
        id: "sql-explain",
        title: "Expliquer une erreur",
        when: "SQLite renvoie une erreur que vous ne comprenez pas.",
        risk: "L’IA peut mal diagnostiquer si le message est incomplet.",
        verify: "Recoller le message exact ; retester après correction.",
        prompt: `Voici mon erreur SQL (SQLite) :
[COLLER L'ERREUR]
Voici ma requête :
[COLLER LA REQUÊTE]
Explique en français simple :
1) le problème
2) pourquoi
3) comment corriger
Ne donne pas de faux résultats chiffrés.`
      }
    ],
    excel: [
      {
        id: "excel-formula",
        title: "Formule Excel",
        when: "Vous cherchez SOMME / SI / TCD (démarche).",
        risk: "Références de cellules inventées.",
        verify: "Recalculer sur 3 lignes connues.",
        prompt: `Feuille Pratique :
B2:B7 quantités, C2:C7 prix, D2 doit être montant = quantité*prix.
1) Donne la formule D2
2) Comment la recopier jusqu'à D7
3) Formule du total quantités en B10
Réponds en français, sans inventer de totaux.`
      },
      {
        id: "excel-tcd",
        title: "Plan de TCD",
        when: "Avant de cliquer dans Excel / Power Pivot.",
        risk: "Mauvais champ en Valeurs.",
        verify: "Comparer le total TCD au total feuille.",
        prompt: `Je veux un TCD : somme de montant_cdf par ville.
Dis-moi :
- champ Lignes
- champ Valeurs (agrégation)
- 1 contrôle qualité après création
Pas de chiffres inventés.`
      }
    ],
    python: [
      {
        id: "py-pandas",
        title: "Pandas : groupby",
        when: "Vous avez un CSV et une question claire.",
        risk: "Code plausible mais colonnes inventées.",
        verify: "print(df.columns) ; df.head() ; contrôle somme.",
        prompt: `J'ai un CSV ventes avec colonnes :
date, ville, produit, quantite, montant_cdf, client_id
Écris un snippet pandas qui :
1) lit le CSV
2) calcule la somme de montant_cdf par ville
3) trie DESC
Ajoute des commentaires en français.
N'invente pas le résultat numérique.`
      },
      {
        id: "py-debug",
        title: "Comprendre une erreur Python",
        when: "Traceback illisible.",
        risk: "Mauvaise piste si le code complet manque.",
        verify: "Reproduire l’erreur après le correctif proposé.",
        prompt: `Voici mon erreur Python :
[COLLER TRACEBACK]
Voici mon code :
[COLLER CODE]
Explique simplement le problème et propose une correction minimale.
Ne fabrique pas de dataset fictif comme s'il était réel.`
      }
    ],
    storytelling: [
      {
        id: "story-note",
        title: "Brouillon de note",
        when: "Vous avez déjà les chiffres vérifiés.",
        risk: "L’IA peut « améliorer » en inventant des %.",
        verify: "Chaque chiffre de la note doit exister dans votre source.",
        prompt: `À partir UNIQUEMENT de ces faits vérifiés :
- Total CA = 6 785 000 CDF (n=30)
- Kinshasa = 2 940 000 CDF
- 1 quantité manquante
Rédige une note courte :
Public, Décision, Constat, Preuve, Limite, Recommandation.
INTERDICTION d'ajouter d'autres chiffres.`
      },
      {
        id: "story-clarify",
        title: "Clarifier le message",
        when: "Votre brouillon est trop long / jargon.",
        risk: "Perte de nuance ou dureté excessive.",
        verify: "Relire : le sens métier est-il intact ?",
        prompt: `Réécris ce paragraphe pour un coordonnateur non technique,
en gardant exactement les mêmes chiffres, sans en ajouter :
[COLLER TEXTE]`
      }
    ],
    general: [
      {
        id: "plan",
        title: "Plan d’analyse",
        when: "Avant de toucher aux outils.",
        risk: "Plan générique hors contexte.",
        verify: "Le plan répond-il à VOTRE décision ?",
        prompt: `Décision à éclairer : [ÉCRIRE]
Données dispo : ventes CSV + clients CSV
Propose un plan en 5 étapes max parmi :
Collecte, SQL, Excel, Stats, Python, Power BI, Storytelling.
Dis pour chaque étape : pourquoi oui/non.`
      }
    ]
  };

  const CHECKLIST = [
    { id: "c1", text: "La question métier est claire avant le prompt." },
    { id: "c2", text: "Je n’ai collé aucune donnée personnelle / médicale identifiable." },
    { id: "c3", text: "L’IA a produit une méthode ou un code — pas une vérité sacrée." },
    { id: "c4", text: "J’ai exécuté / recalculé moi-même les chiffres clés." },
    { id: "c5", text: "n, unité et période sont explicites." },
    { id: "c6", text: "Je peux expliquer le résultat sans relire l’IA." },
    { id: "c7", text: "La recommandation reste la mienne (responsabilité humaine)." }
  ];

  function listTools() {
    return [
      { id: "sql", label: "SQL" },
      { id: "excel", label: "Excel" },
      { id: "python", label: "Python" },
      { id: "storytelling", label: "Storytelling" },
      { id: "general", label: "Plan général" }
    ];
  }

  return { PROMPTS, CHECKLIST, listTools };
})();
