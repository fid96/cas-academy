/* SIG Atelier — socle commun + parcours Data Analyst | Expert S&E
   Cas fil rouge : district fictif Kalunga (Nutrition & WASH)
*/

window.SIG_CONTENT = (function () {
  const caseStudy = {
    name: "Kalunga — Nutrition & WASH",
    type: "Projet humanitaire fictif (style ONG / clusters)",
    summary:
      "District fictif de Kalunga : sites WASH géolocalisés, aires de santé, couverture ménages. Le SIG sert à fiabiliser les points GPS et à prioriser où agir.",
  };

  const glossary = [
    { term: "SIG", def: "Système d’Information Géographique : relier des données à un territoire pour analyser et décider." },
    { term: "CRS / SCR", def: "Système de coordonnées de référence. Pour le GPS terrain : WGS 84 (EPSG:4326) en lat/lon." },
    { term: "Vecteur", def: "Données géométriques : points, lignes, polygones (sites, routes, aires)." },
    { term: "Raster", def: "Grille de pixels (image satellitaire, modèle d’élévation) — hors cœur de cet atelier." },
    { term: "Couche", def: "Jeu de données spatiales empilable dans un projet QGIS." },
    { term: "Jointure attributaire", def: "Relier deux tables via une clé commune (ex. aire_code) sans géométrie obligatoire." },
    { term: "Choroplèthe", def: "Carte où des polygones sont colorés selon une valeur (ex. couverture %)." },
    { term: "GeoPackage", def: "Format fichier moderne pour stocker des couches SIG (préférable au shapefile pour l’export propre)." },
    { term: "QC GPS", def: "Contrôles : manquants, 0,0, hors zone, lat/lon inversés, doublons de coordonnées." },
    { term: "Couverture spatiale", def: "Part des ménages / population desservis dans une zone, comparée à une cible." },
  ];

  const method = {
    title: "Méthode SIG opérationnelle",
    steps: [
      { num: "01", title: "Voir", text: "Clarifier la question territoriale : où est le problème, pour quelle décision ?" },
      { num: "02", title: "Comprendre", text: "Choisir couches, CRS, clé de jointure et règle de qualité GPS." },
      { num: "03", title: "Pratiquer", text: "Importer, joindre, corriger, symboliser — dans QGIS ou via le labo navigateur." },
      { num: "04", title: "Vérifier", text: "Aucune carte officielle sans QC, légende, source et lecture décisionnelle." },
    ],
    principles: [
      {
        title: "La carte sert une décision",
        text: "Une carte jolie sans lecture actionnable est du bruit visuel.",
      },
      {
        title: "Données propres avant symbologie",
        text: "Corriger GPS et jointures avant de colorier. Sinon vous cartographiez l’erreur.",
      },
      {
        title: "QGIS = outil métier standard",
        text: "Gratuit, répandu en ONG/État. ArcGIS peut exister en organisation — le raisonnement reste le même.",
      },
      {
        title: "Cas Kalunga = terrain d’exercice",
        text: "La méthode se transfère à vaccination, éducation, marchés, dénombrement…",
      },
    ],
  };

  function L(partial) {
    return Object.assign(
      {
        caption: "",
        voir: { paragraphs: [], analogy: null },
        comprendre: { paragraphs: [], bullets: [] },
        pratiquer: {
          prompt: "",
          placeholder: "",
          hint: "",
          checkType: "minLines",
          keywords: [],
          minLines: 3,
          success: "Bien.",
          fail: "Complétez la réponse demandée.",
        },
        verifier: { question: "", options: [], answer: 0, explain: "" },
        retenir: [],
      },
      partial
    );
  }

  const modulesSocle = [
    {
      id: "m1",
      title: "01 · SIG pour décider",
      track: "socle",
      level: "Socle",
      packs: ["data-analyst", "se"],
      summary: "Pourquoi joindre données et territoire.",
      lessons: [
        L({
          id: "m1-l1",
          title: "À quoi sert un SIG ?",
          goal: "Relier analyse tabulaire et question « où ».",
          caption: "Le territoire révèle ce que la moyenne masque.",
          voir: {
            paragraphs: [
              "Un tableau peut dire « couverture 20 % ». Une carte dit « Sud et Nord sont à la traîne, Est un peu moins ».",
              "Sur Kalunga, les sites WASH ont des GPS : sans SIG, vous agréguez ; avec SIG, vous priorisez des zones.",
            ],
            analogy: {
              title: "Analogie du GPS véhicule",
              text: "La liste des rues ne remplace pas la carte pour choisir l’itinéraire. Les deux se complètent.",
            },
          },
          comprendre: {
            paragraphs: ["Pour un analyste / un S&E, le SIG sert surtout à :"],
            bullets: [
              "Localiser points (sites, ménages, structures)",
              "Agréger par zone (aire, AS, province)",
              "Comparer couverture / écarts / cibles",
              "Détecter erreurs de collecte GPS",
            ],
            code: {
              label: "chaine",
              lines: "Données + territoire\n→ QC spatial\n→ carte + lecture\n→ décision",
            },
          },
          pratiquer: {
            prompt: "Citez 3 décisions Kalunga qu’une carte éclaire mieux qu’un tableau seul (1 ligne chacune).",
            placeholder: "1) …\n2) …\n3) …",
            hint: "stock pièces, équipes mobiles, priorisation aires…",
            checkType: "minLines",
            minLines: 3,
            success: "Vous ancrez le SIG dans des décisions.",
            fail: "Écrivez 3 lignes de décisions.",
          },
          verifier: {
            question: "Le rôle principal du SIG pour DA / S&E est…",
            options: [
              "Remplacer Excel",
              "Relier données et territoire pour décider",
              "Faire de la 3D",
              "Remplacer Kobo",
            ],
            answer: 1,
            explain: "Territoire + décision.",
          },
          retenir: ["Où compte autant que combien.", "Carte = argument, pas décor.", "Kalunga = cas d’exercice."],
        }),
      ],
    },
    {
      id: "m2",
      title: "02 · CRS & coordonnées",
      track: "socle",
      level: "Socle",
      packs: ["data-analyst", "se"],
      summary: "WGS 84, lat/lon, pièges d’unité.",
      lessons: [
        L({
          id: "m2-l1",
          title: "Ne pas mélanger les référentiels",
          goal: "Choisir et documenter le CRS.",
          caption: "Un mauvais CRS déplace vos points de kilomètres.",
          voir: {
            paragraphs: [
              "Les GPS téléphone / Kobo sortent en général en WGS 84 : latitude et longitude en degrés décimaux.",
              "Si vous importez lat dans X et lon dans Y, ou un SCR projeté sans le dire, la carte ment.",
            ],
            analogy: {
              title: "Analogie des fuseaux horaires",
              text: "15 h sans fuseau est ambigu. Une coordonnée sans CRS aussi.",
            },
          },
          comprendre: {
            paragraphs: ["Repères opérationnels :"],
            bullets: [
              "Latitude ≈ nord/sud (en RDC souvent négative au sud de l’équateur)",
              "Longitude ≈ est/ouest (Kalunga fictif ~24°E)",
              "Dans QGIS : X = longitude, Y = latitude",
              "Documentez EPSG:4326 dans le métadonnée / README de la couche",
            ],
            code: {
              label: "import",
              lines: "X field = lon\nY field = lat\nCRS = EPSG:4326 (WGS 84)",
            },
          },
          pratiquer: {
            prompt: "Un point Kalunga affiche lat=24.52 et lon=-8.97. Que suspectez-vous ? Que faites-vous ?",
            placeholder: "Suspicion : …\nAction : …",
            hint: "inversion lat/lon",
            checkType: "keywords",
            keywords: ["invers"],
            success: "Bon réflexe : suspecter l’inversion lat/lon.",
            fail: "Mentionnez l’inversion (lat/lon inversés).",
          },
          verifier: {
            question: "Pour un CSV GPS Kobo, le choix sûr est…",
            options: ["EPSG:3857 sans vérifier", "WGS 84 (EPSG:4326), X=lon Y=lat", "Pas de CRS", "Un SCR local inventé"],
            answer: 1,
            explain: "WGS 84 + bon mapping X/Y.",
          },
          retenir: ["Documenter le CRS.", "X=lon, Y=lat.", "Inversions = points absurdes."],
        }),
      ],
    },
    {
      id: "m3",
      title: "03 · Couches & jointures",
      track: "socle",
      level: "Socle",
      packs: ["data-analyst", "se"],
      summary: "Points, zones, clé aire_code.",
      lessons: [
        L({
          id: "m3-l1",
          title: "Assembler le puzzle territorial",
          goal: "Joindre sites et aires sans casser les totaux.",
          caption: "La clé métier vaut mieux qu’un beau nom de zone.",
          voir: {
            paragraphs: [
              "Kalunga a des sites (points) et des aires (référentiel). La jointure se fait sur aire_code (AS-N, AS-S…).",
              "Joindre sur le libellé « Nord » est fragile (accents, espaces). La clé codée est plus sûre.",
            ],
            analogy: {
              title: "Analogie du numéro de dossier",
              text: "On ne classe pas les patients seulement par prénom. aire_code = numéro de dossier territorial.",
            },
          },
          comprendre: {
            paragraphs: ["Checklist jointure :"],
            bullets: [
              "Une clé unique côté référentiel aires",
              "Même orthographe / casse des codes",
              "Compter les orphelins (sites sans aire, aires sans site)",
              "Agrégats après jointure = base de la carte choroplèthe",
            ],
            code: {
              label: "cle",
              lines: "sites.aire_code = aires.aire_code\n→ menages par aire\n→ couverture_pct",
            },
          },
          pratiquer: {
            prompt: "Écrivez 3 contrôles avant d’accepter une jointure sites↔aires.",
            placeholder: "1) …\n2) …\n3) …",
            hint: "orphelins, doublons de clé, totaux",
            checkType: "minLines",
            minLines: 3,
            success: "Vous protégez les agrégats spatiaux.",
            fail: "3 contrôles minimum.",
          },
          verifier: {
            question: "La meilleure clé de jointure Kalunga est…",
            options: ["aire_sante (libellé)", "aire_code", "type_ouvrage", "date_visite"],
            answer: 1,
            explain: "Code stable.",
          },
          retenir: ["Clé codée > libellé.", "Compter les orphelins.", "Joindre puis agréger."],
        }),
      ],
    },
    {
      id: "m4",
      title: "04 · QGIS & pièges GPS",
      track: "socle",
      level: "Socle",
      packs: ["data-analyst", "se"],
      summary: "Flux d’import et erreurs classiques.",
      lessons: [
        L({
          id: "m4-l1",
          title: "Importer sans se tromper",
          goal: "Suivre un flux QGIS fiable et reconnaître les pièges.",
          caption: "Le labo navigateur entraîne le QC ; QGIS produit la carte.",
          voir: {
            paragraphs: [
              "Cet atelier ne lance pas QGIS dans le navigateur. Il vous prépare : checklist, datasets sales, lecture d’erreurs.",
              "Dans QGIS : texte délimité → CRS → jointure → symbologie → export. Le Labo SIG reprend la checklist.",
            ],
            analogy: {
              title: "Analogie du contrôle qualité labo",
              text: "On ne publie pas un résultat d’échantillon sans QC. Un GPS non contrôlé non plus.",
            },
          },
          comprendre: {
            paragraphs: ["Pièges fréquents dans kalunga_sites_gps.csv :"],
            bullets: [
              "Doublon de coordonnées (W01 / W07)",
              "Lat/lon inversés (W12)",
              "GPS manquant (W13)",
              "0,0 (W14)",
              "Hors zone (W15)",
              "Attribut aberrant (ménages=0 si fonctionnel)",
            ],
            annotation: "Ouvrez le Labo SIG et lancez le QC GPS.",
          },
          pratiquer: {
            prompt: "Listez 4 anomalies GPS que vous chercherez dans un export Kobo (mots-clés OK : manquant, doublon, hors zone, inversion…).",
            placeholder: "1) …\n2) …\n3) …\n4) …",
            hint: "voir liste ci-dessus",
            checkType: "minLines",
            minLines: 4,
            success: "Grille QC claire — passez au labo.",
            fail: "4 anomalies minimum.",
          },
          verifier: {
            question: "Avant une carte officielle, on doit…",
            options: [
              "Colorier d’abord, contrôler ensuite",
              "Faire le QC GPS / jointures puis symboliser",
              "Supprimer la légende",
              "Changer le CRS au hasard",
            ],
            answer: 1,
            explain: "QC d’abord.",
          },
          retenir: ["Flux QGIS guidé.", "QC avant carte.", "Labo = terrain d’entraînement."],
        }),
      ],
    },
  ];

  const modulesDa = [
    {
      id: "m5",
      title: "05 · Fiabiliser la couche",
      track: "metier",
      level: "Data Analyst",
      packs: ["data-analyst"],
      summary: "QC GPS + jointure + export propre.",
      lessons: [
        L({
          id: "m5-l1",
          title: "De CSV sale à couche défendable",
          goal: "Produire une couche WASH propre pour l’analyse.",
          caption: "L’analyste SIG livre une couche traçable, pas seulement une image.",
          voir: {
            paragraphs: [
              "Rôle DA : détecter W12–W15, documenter les exclusions, joindre aire_code, recalculer les ménages desservis valides.",
              "Livrable : GeoPackage / CSV QC + journal (lignes écartées, motif).",
            ],
            analogy: {
              title: "Analogie du data cleaning",
              text: "Comme un CSV ventes avec doublons : on ne graphise pas avant nettoyage.",
            },
          },
          comprendre: {
            paragraphs: ["Protocole DA recommandé :"],
            bullets: [
              "Charger sites + aires",
              "QC automatique (labo) puis revue humaine",
              "Exclure ou corriger hors zone / 0,0 / inversion",
              "Dédoublonner W01/W07 avec règle écrite",
              "Exporter couche + journal QC",
            ],
            code: {
              label: "journal",
              lines: "W13 exclu — GPS manquant\nW14 exclu — 0,0\nW15 exclu — hors zone\nW12 corrigé — swap lat/lon\nW07 exclu — doublon de W01",
            },
          },
          pratiquer: {
            prompt: "Rédigez un journal QC de 5 lignes pour Kalunga (site → action).",
            placeholder: "W13 → …\nW14 → …\n…",
            hint: "exclure / corriger / dédoublonner",
            checkType: "minLines",
            minLines: 5,
            success: "Journal défendable — bon réflexe d’analyste.",
            fail: "5 lignes site → action.",
          },
          verifier: {
            question: "Un Data Analyst SIG doit surtout…",
            options: [
              "Publier la carte la plus colorée",
              "Fiabiliser la couche et documenter le QC",
              "Ignorer les orphelins",
              "Éviter les jointures",
            ],
            answer: 1,
            explain: "Couche propre + traçabilité.",
          },
          retenir: ["Journal QC.", "Export propre.", "Traçabilité > esthétique."],
        }),
      ],
    },
    
    {
      id: "m7",
      title: "07 · Maîtrise spatiale",
      track: "metier",
      level: "Maîtrise",
      packs: ["data-analyst"],
      summary: "CRS en pratique, couverture/jointure, épreuve transfert.",
      lessons: [
        L({
          id: "m7-l1",
          title: "CRS & projections en pratique",
          goal: "Choisir et documenter un CRS sans mélanger les couches.",
          caption: "Un mauvais CRS déplace les points de kilomètres.",
          voir: {
            paragraphs: [
              "GPS Kobo → EPSG:4326 (lon/lat). Pour distances/surfaces locales, projeter (UTM) puis documenter.",
              "Règle : jamais superposer deux couches sans vérifier le CRS dans QGIS."
            ],
          },
          comprendre: {
            paragraphs: ["Checklist :"],
            bullets: [
              "Documenter EPSG source",
              "X=lon Y=lat pour CSV GPS",
              "Reprojeter si calcul de distance",
              "Noter le CRS sur la carte / métadonnées"
            ],
            code: { label: "crs", lines: "Source GPS: EPSG:4326\nCarte locale: UTM zone documentée\nJamais « on verra »" },
          },
          pratiquer: {
            prompt: "En 4 lignes : CRS source Kalunga, risque si inversé, quand reprojeter, où documenter.",
            placeholder: "1) …\n2) …\n3) …\n4) …",
            checkType: "keywords",
            keywords: ["4326"],
            success: "CRS maîtrisé.",
            fail: "Mentionnez 4326 / EPSG.",
          },
          verifier: {
            question: "CSV GPS Kobo → en pratique…",
            options: ["Sans CRS", "EPSG:4326 documenté (lon/lat)", "Toujours Web Mercator sans vérifier", "CRS inventé"],
            answer: 1,
            explain: "WGS 84.",
          },
          retenir: ["Documenter EPSG.", "Lon/lat.", "Reprojeter si besoin."],
        }),
        L({
          id: "m7-l2",
          title: "Analyse spatiale légère — couverture",
          goal: "Joindre et lire une couverture vs cible sans surcharger.",
          caption: "Une jointure aire_code + une mesure = décision.",
          voir: {
            paragraphs: [
              "Après QC : joindre sites → aires, calculer couverture, comparer à la cible (ex. 80 %).",
              "Livrer : tableau par aire + 5 lignes de lecture (pas 12 couches décoratives)."
            ],
          },
          comprendre: {
            bullets: [
              "Clé aire_code",
              "Numérateur / dénominateur clairs",
              "Écart vs cible",
              "Limite des données GPS"
            ],
          },
          pratiquer: {
            prompt: "5 lignes : jointure utilisée, 2 aires critiques, écart vs cible, 1 limite, 1 suite.",
            placeholder: "1) …\n2) …\n3) …\n4) …\n5) …",
            checkType: "minLines",
            minLines: 5,
            success: "Analyse spatiale légère OK.",
            fail: "5 lignes.",
          },
          verifier: {
            question: "Une analyse spatiale junior utile…",
            options: ["Ignore la cible", "Joint, mesure, compare à une cible, lit les écarts", "Maximise les couleurs", "Évite le QC"],
            answer: 1,
            explain: "Mesure + cible.",
          },
          retenir: ["Joindre.", "Mesurer.", "Comparer à la cible."],
        }),
      ],
    },

    {
      id: "m6",
      title: "06 · Carte & lecture analytique",
      track: "metier",
      level: "Data Analyst",
      packs: ["data-analyst"],
      summary: "Symbologie, choroplèthe, message clair.",
      lessons: [
        L({
          id: "m6-l1",
          title: "Faire parler la carte sans la surcharger",
          goal: "Choisir une symbologie et 5 lignes de lecture.",
          caption: "Une carte = une question.",
          voir: {
            paragraphs: [
              "Après QC, kalunga_couverture.csv montre des couvertures ~17–24 % vs cible 80 %.",
              "Votre job DA : carte choroplèthe (ou symboles proportionnels) + lecture factuelle pour le storytelling / Power BI.",
            ],
            analogy: {
              title: "Analogie du TCD",
              text: "La carte est un TCD spatial : une dimension (aire), une mesure (couverture), un filtre (période).",
            },
          },
          comprendre: {
            paragraphs: ["Règles de lisibilité :"],
            bullets: [
              "Une question par carte",
              "Légende + unité + source + date",
              "Éviter 12 couleurs inutiles",
              "Séparer points sites et fond couverture",
              "Écrire la lecture avant d’envoyer l’image",
            ],
          },
          pratiquer: {
            prompt: "Rédigez 5 lignes : constat spatial Kalunga + 1 limite des données + 1 suite analytique.",
            placeholder: "1) …\n2) …\n3) …\n4) Limite : …\n5) Suite : …",
            hint: "écarts vs 80 %, qualité GPS…",
            checkType: "minLines",
            minLines: 5,
            success: "Lecture analytique solide.",
            fail: "5 lignes demandées.",
          },
          verifier: {
            question: "Une bonne carte DA contient surtout…",
            options: [
              "Un maximum de couches décoratives",
              "Une question claire, une légende et une lecture",
              "Aucun titre",
              "Des GPS non contrôlés",
            ],
            answer: 1,
            explain: "Clarté + lecture.",
          },
          retenir: ["Une question / carte.", "Légende obligatoire.", "Lecture écrite."],
        }),
      ],
    },
  ];

  const modulesSe = [
    {
      id: "m5",
      title: "05 · Couverture vs cible",
      track: "metier",
      level: "Expert S&E",
      packs: ["se"],
      summary: "Lire les écarts spatiaux pour piloter.",
      lessons: [
        L({
          id: "m5-l1",
          title: "La carte comme outil de suivi",
          goal: "Comparer réalisé et cible par aire.",
          caption: "Le S&E demande : où sommes-nous sous la cible ?",
          voir: {
            paragraphs: [
              "Indicateur : % de ménages desservis par un site WASH fonctionnel (après QC) / ménages estimés, cible 80 %.",
              "Sur Kalunga, toutes les aires sont loin de la cible — mais les écarts ne sont pas identiques. La carte oriente la priorisation.",
            ],
            analogy: {
              title: "Analogie du tableau de bord véhicule",
              text: "Le voyant dit qu’il faut s’arrêter ; la carte dit où brancher l’équipe.",
            },
          },
          comprendre: {
            paragraphs: ["Lecture S&E minimale :"],
            bullets: [
              "Définir numérateur / dénominateur / cible",
              "N’utiliser que les sites GPS validés",
              "Afficher écart en points de %",
              "Relier à une décision (réparation, nouveau forage, ciblage)",
            ],
            code: {
              label: "kpi",
              lines: "couverture = menages_valides / menages_estimes\nécart = couverture - cible\n→ prioriser aires à écart le plus négatif",
            },
          },
          pratiquer: {
            prompt: "Classez les 4 aires du plus critique au moins critique (d’après kalunga_couverture) et justifiez en 1 ligne chacune.",
            placeholder: "1) …\n2) …\n3) …\n4) …",
            hint: "regarder ecart_pp",
            checkType: "minLines",
            minLines: 4,
            success: "Priorisation spatiale claire.",
            fail: "4 aires classées.",
          },
          verifier: {
            question: "Pour piloter, la carte S&E doit montrer surtout…",
            options: [
              "Le logo en grand",
              "L’écart à la cible par zone",
              "Tous les GPS bruts non contrôlés",
              "Uniquement la moyenne nationale",
            ],
            answer: 1,
            explain: "Écarts spatiaux.",
          },
          retenir: ["Cible visible.", "QC avant KPI.", "Prioriser les écarts."],
        }),
      ],
    },
    
    {
      id: "m7",
      title: "07 · Maîtrise spatiale",
      track: "metier",
      level: "Maîtrise",
      packs: ["se"],
      summary: "CRS en pratique, couverture/jointure, épreuve transfert.",
      lessons: [
        L({
          id: "m7-l1",
          title: "CRS & projections en pratique",
          goal: "Choisir et documenter un CRS sans mélanger les couches.",
          caption: "Un mauvais CRS déplace les points de kilomètres.",
          voir: {
            paragraphs: [
              "GPS Kobo → EPSG:4326 (lon/lat). Pour distances/surfaces locales, projeter (UTM) puis documenter.",
              "Règle : jamais superposer deux couches sans vérifier le CRS dans QGIS."
            ],
          },
          comprendre: {
            paragraphs: ["Checklist :"],
            bullets: [
              "Documenter EPSG source",
              "X=lon Y=lat pour CSV GPS",
              "Reprojeter si calcul de distance",
              "Noter le CRS sur la carte / métadonnées"
            ],
            code: { label: "crs", lines: "Source GPS: EPSG:4326\nCarte locale: UTM zone documentée\nJamais « on verra »" },
          },
          pratiquer: {
            prompt: "En 4 lignes : CRS source Kalunga, risque si inversé, quand reprojeter, où documenter.",
            placeholder: "1) …\n2) …\n3) …\n4) …",
            checkType: "keywords",
            keywords: ["4326"],
            success: "CRS maîtrisé.",
            fail: "Mentionnez 4326 / EPSG.",
          },
          verifier: {
            question: "CSV GPS Kobo → en pratique…",
            options: ["Sans CRS", "EPSG:4326 documenté (lon/lat)", "Toujours Web Mercator sans vérifier", "CRS inventé"],
            answer: 1,
            explain: "WGS 84.",
          },
          retenir: ["Documenter EPSG.", "Lon/lat.", "Reprojeter si besoin."],
        }),
        L({
          id: "m7-l2",
          title: "Analyse spatiale légère — couverture",
          goal: "Joindre et lire une couverture vs cible sans surcharger.",
          caption: "Une jointure aire_code + une mesure = décision.",
          voir: {
            paragraphs: [
              "Après QC : joindre sites → aires, calculer couverture, comparer à la cible (ex. 80 %).",
              "Livrer : tableau par aire + 5 lignes de lecture (pas 12 couches décoratives)."
            ],
          },
          comprendre: {
            bullets: [
              "Clé aire_code",
              "Numérateur / dénominateur clairs",
              "Écart vs cible",
              "Limite des données GPS"
            ],
          },
          pratiquer: {
            prompt: "5 lignes : jointure utilisée, 2 aires critiques, écart vs cible, 1 limite, 1 suite.",
            placeholder: "1) …\n2) …\n3) …\n4) …\n5) …",
            checkType: "minLines",
            minLines: 5,
            success: "Analyse spatiale légère OK.",
            fail: "5 lignes.",
          },
          verifier: {
            question: "Une analyse spatiale junior utile…",
            options: ["Ignore la cible", "Joint, mesure, compare à une cible, lit les écarts", "Maximise les couleurs", "Évite le QC"],
            answer: 1,
            explain: "Mesure + cible.",
          },
          retenir: ["Joindre.", "Mesurer.", "Comparer à la cible."],
        }),
      ],
    },

    {
      id: "m6",
      title: "06 · Décision & redevabilité",
      track: "metier",
      level: "Expert S&E",
      packs: ["se"],
      summary: "De la carte à 3 décisions assignées.",
      lessons: [
        L({
          id: "m6-l1",
          title: "Note spatiale actionnable",
          goal: "Transformer la carte en recommandations assignées.",
          caption: "Faits → lecture → reco → responsable.",
          voir: {
            paragraphs: [
              "Une carte sans recommandations n’entre pas dans le dossier S&E.",
              "Exemple : réparer W03 (Sud), vérifier doublon W01/W07, planifier un forage Ouest si couverture stagne.",
            ],
            analogy: {
              title: "Analogie de la note de suivi",
              text: "Même trame qu’une note 1 page — la carte est une pièce jointe, pas le livrable final.",
            },
          },
          comprendre: {
            paragraphs: ["Trame courte :"],
            bullets: [
              "3 faits spatiaux max",
              "1 lecture (équité / couverture / risque)",
              "3 recommandations : action — délai — responsable",
              "Mentionner limites (GPS exclus au QC)",
            ],
          },
          pratiquer: {
            prompt: "Rédigez 3 recommandations Kalunga au format Action — délai — responsable.",
            placeholder: "1) … — … — …\n2) …\n3) …",
            hint: "réparation, QC, ciblage aire",
            checkType: "keywords",
            keywords: ["—"],
            minLines: 3,
            success: "Reco assignées — standard S&E.",
            fail: "3 lignes avec tirets cadratins / tirets action—délai—responsable.",
          },
          verifier: {
            question: "Dans un dossier S&E, la carte doit…",
            options: [
              "Remplacer le cadre de résultats",
              "Appuyer des décisions assignées",
              "Rester sans légende",
              "Ignorer les cibles",
            ],
            answer: 1,
            explain: "Décision assignée.",
          },
          retenir: ["Carte + note.", "Reco assignées.", "Limites GPS explicites."],
        }),
      ],
    },
  ];

  const carnetDa = {
    title: "Carnet — SIG Data Analyst",
    subtitle: "QC, jointures, couche propre, lecture spatiale",
    sections: [
      {
        title: "A — Socle",
        exercises: [
          { id: "A1", prompt: "Expliquez en 5 lignes à quoi sert le SIG dans votre travail DA." },
          { id: "A2", prompt: "Documentez le CRS que vous utiliserez pour un export Kobo GPS." },
          { id: "A3", prompt: "Dessinez la chaîne sites → aires → couverture." },
        ],
      },
      {
        title: "B — Labo Kalunga",
        exercises: [
          { id: "B1", prompt: "Listez toutes les anomalies trouvées par le QC GPS (copiez depuis le labo)." },
          { id: "B2", prompt: "Rédigez le journal des corrections / exclusions." },
          { id: "B3", prompt: "Calculez (à la main ou Excel) ménages valides par aire après exclusions." },
        ],
      },
      {
        title: "C — Livrable",
        exercises: [
          { id: "C1", prompt: "Checklist QGIS cochée (écran Labo)." },
          { id: "C2", prompt: "5 lignes de lecture pour une note / slide Power BI." },
          { id: "C3", prompt: "Listez 3 risques si on publie sans QC GPS." },
        ],
      },,
      {
        title: "D — Épreuve de maîtrise (transfert)",
        exercises: [
          { id: "D1", prompt: "Nouveau jeu (autre zone ou extrait) : QC GPS sans guide — journal 5 anomalies." },
          { id: "D2", prompt: "Justifiez 3 choix : CRS, clé de jointure, symbologie." },
          { id: "D3", prompt: "Détectez 2 erreurs : carte sans QC ; X=lat ; jointure sur libellé libre ; légende absente." },
          { id: "D4", prompt: "Livrable : couverture vs cible + 5 lignes lecture + 1 limite." },
          { id: "D5", prompt: "Auto-éval (0–2) : transfert · justification · erreurs · quiz ≥80 %." },
        ],
      }
    ],
  };

  const carnetSe = {
    title: "Carnet — SIG Expert S&E",
    subtitle: "Couverture spatiale, écarts, décisions assignées",
    sections: [
      {
        title: "A — Indicateur spatial",
        exercises: [
          { id: "A1", prompt: "Rédigez la fiche indicateur couverture WASH (définition, formule, cible, source)." },
          { id: "A2", prompt: "Pourquoi le QC GPS est une étape S&E (pas seulement IT) ?" },
          { id: "A3", prompt: "Quelles désagrégations spatiales minimum pour Kalunga ?" },
        ],
      },
      {
        title: "B — Lecture pilotage",
        exercises: [
          { id: "B1", prompt: "Classez les aires par criticité et justifiez." },
          { id: "B2", prompt: "Note de suivi 1/2 page : faits → lecture → reco." },
          { id: "B3", prompt: "3 décisions assignées (action — délai — responsable)." },
        ],
      },
      {
        title: "C — Dossier",
        exercises: [
          { id: "C1", prompt: "Joignez mentalement la carte au dossier S&E : où la classez-vous ?" },
          { id: "C2", prompt: "Formulez 2 questions évaluatives à dimension spatiale." },
          { id: "C3", prompt: "Checklist S&E SIG cochée (écran Labo)." },
        ],
      },,
      {
        title: "D — Épreuve de maîtrise (transfert)",
        exercises: [
          { id: "D1", prompt: "Note spatiale sur extrait inconnu : faits → écarts → 3 décisions assignées." },
          { id: "D2", prompt: "Justifiez 3 choix : indicateur, priorisation d’aire, niveau d’agrégation GPS." },
          { id: "D3", prompt: "Détectez 2 erreurs : publier sans QC ; reco sans responsable ; cible absente." },
          { id: "D4", prompt: "Go/no-go publication carte (critères qualité + éthique)." },
          { id: "D5", prompt: "Auto-éval (0–2) : transfert · justification · erreurs · quiz ≥80 %." },
        ],
      }
    ],
  };

  const bilanDa = {
    title: "Quiz bilan — SIG Data Analyst",
    subtitle: "12 questions — technique, couverture, maîtrise (seuil 80 %).",
    passScore: 80,
    questions: [
      { id: "b1", theme: "role", themeLabel: "Rôle", question: "Pour un DA, le SIG sert surtout à…", options: ["Remplacer SQL", "Fiabiliser et analyser des données territoriales", "Faire du graphisme seul", "Remplacer la collecte"], answer: 1, explain: "Analyse territoriale." },
      { id: "b2", theme: "crs", themeLabel: "CRS", question: "CSV GPS Kobo → en général…", options: ["EPSG:4326, X=lon Y=lat", "Pas de CRS", "Toujours UTM sans vérifier", "X=lat Y=lon par défaut"], answer: 0, explain: "WGS 84." },
      { id: "b3", theme: "join", themeLabel: "Jointure", question: "Meilleure clé Kalunga…", options: ["Libellé aire_sante", "aire_code", "remarques", "type_ouvrage"], answer: 1, explain: "Code." },
      { id: "b4", theme: "qc", themeLabel: "QC", question: "lat=24.5 et lon=-8.9 suggère…", options: ["Point parfait", "Inversion lat/lon probable", "Raster", "Absence de GPS"], answer: 1, explain: "Inversion." },
      { id: "b5", theme: "qc", themeLabel: "QC", question: "Coordonnées 0,0…", options: ["Sont normales en RDC", "Sont un piège fréquent à exclure / corriger", "Remplacent le centroïde", "Valent une cible"], answer: 1, explain: "Piège." },
      { id: "b6", theme: "process", themeLabel: "Processus", question: "Ordre sain…", options: ["Colorier → importer → QC", "Importer → QC/jointure → symbologie → export", "Export → QC", "Symbologie → CRS"], answer: 1, explain: "QC avant carte." },
      { id: "b7", theme: "livrable", themeLabel: "Livrable", question: "Livrable DA typique…", options: ["Couche propre + journal QC + lecture", "Logo seul", "Carte sans source", "GPS bruts non filtrés"], answer: 0, explain: "Traçabilité." },
      { id: "b8", theme: "tool", themeLabel: "Outil", question: "Outil principal recommandé ici…", options: ["QGIS", "Photoshop", "Word Art", "Un SCR inventé"], answer: 0, explain: "QGIS." },
      { id: "b9", theme: "map", themeLabel: "Carte", question: "Une carte DA doit…", options: ["Poser une question claire", "Avoir 20 couches décoratives", "Cacher la légende", "Ignorer les unités"], answer: 0, explain: "Clarté." },
      { id: "b10", theme: "qc", themeLabel: "QC", question: "Deux sites même lat/lon…", options: ["Toujours OK", "Doublon logique à investiguer", "Preuve de raster", "CRS parfait"], answer: 1, explain: "Doublon." },
      { id: "b11", theme: "spatial", themeLabel: "Analyse", question: "Couverture vs cible sert à…", options: ["Décorer", "Mesurer l’écart et prioriser", "Remplacer le QC", "Éviter les jointures"], answer: 1, explain: "Écarts." },
      { id: "b12", theme: "maitrise", themeLabel: "Maîtrise", question: "Seuil quiz maîtrise junior…", options: ["50 %", "70 %", "80 %", "0 %"], answer: 2, explain: "80 %." },
    ],
  };

  const bilanSe = {
    title: "Quiz bilan — SIG Expert S&E",
    subtitle: "12 questions — pilotage, décision, maîtrise (seuil 80 %).",
    passScore: 80,
    questions: [
      { id: "b1", theme: "role", themeLabel: "Rôle", question: "Pour le S&E, la carte sert surtout à…", options: ["Décorer le rapport", "Éclairer des décisions de priorisation / couverture", "Remplacer le cadre de résultats", "Éviter les indicateurs"], answer: 1, explain: "Pilotage." },
      { id: "b2", theme: "kpi", themeLabel: "Indicateur", question: "Couverture spatiale utile implique…", options: ["Numérateur, dénominateur, cible", "Seulement une couleur", "Aucun QC", "Un total sans zone"], answer: 0, explain: "Définition complète." },
      { id: "b3", theme: "qc", themeLabel: "Qualité", question: "Publier une couverture avec GPS non contrôlés…", options: ["Est acceptable", "Risque de fausse priorisation", "Est exigé par QGIS", "Remplace la baseline"], answer: 1, explain: "Risque décision." },
      { id: "b4", theme: "read", themeLabel: "Lecture", question: "On priorise surtout…", options: ["Les aires les plus proches de la cible", "Les aires au plus fort écart négatif (selon contexte)", "La moyenne seule", "Le logo cluster"], answer: 1, explain: "Écarts." },
      { id: "b5", theme: "note", themeLabel: "Note", question: "Format reco attendu…", options: ["Action — délai — responsable", "Couleur — police — logo", "GPS — SCR — raster", "IA — prompt — hasard"], answer: 0, explain: "Assignation." },
      { id: "b6", theme: "crs", themeLabel: "Données", question: "WGS 84 pour GPS terrain…", options: ["Est le choix usuel à documenter", "Est interdit", "Remplace l’indicateur", "Annule la cible"], answer: 0, explain: "Standard GPS." },
      { id: "b7", theme: "ethics", themeLabel: "Éthique", question: "Points GPS ménages individuels sensibles…", options: ["Se diffusent librement", "Demandent prudence / agrégation", "Remplacent AAP", "Sont obligatoires en haute résolution publique"], answer: 1, explain: "Do-no-harm." },
      { id: "b8", theme: "dossier", themeLabel: "Dossier", question: "La carte dans le dossier S&E…", options: ["Remplace le plan de suivi", "Complète note / reporting avec preuves spatiales", "Est optionnelle sans lecture", "Interdit les cibles"], answer: 1, explain: "Pièce utile." },
      { id: "b9", theme: "tool", themeLabel: "Outil", question: "QGIS pour S&E…", options: ["Est un outil au service du système S&E", "Remplace MEAL", "Rend le QC inutile", "Interdit Excel"], answer: 0, explain: "Outil servant le système." },
      { id: "b10", theme: "read", themeLabel: "Lecture", question: "Faits spatiaux sans recommandation…", options: ["Suffisent au pilotage", "Restent incomplets pour un Expert S&E", "Valent une évaluation finale", "Remplacent la baseline"], answer: 1, explain: "Décision manquante." },
      { id: "b11", theme: "spatial", themeLabel: "Analyse", question: "Une jointure aire_code permet surtout…", options: ["Colorier sans mesure", "Relier sites et zones pour la couverture", "Supprimer la cible", "Éviter QGIS"], answer: 1, explain: "Lien spatial." },
      { id: "b12", theme: "maitrise", themeLabel: "Maîtrise", question: "Seuil quiz maîtrise junior…", options: ["50 %", "70 %", "80 %", "0 %"], answer: 2, explain: "80 %." },
    ],
  };

  function build(packId) {
    const isSe = packId === "se";
    const modules = modulesSocle.concat(isSe ? modulesSe : modulesDa);
    return {
      packId: isSe ? "se" : "data-analyst",
      moduleId: isSe ? "se-09-sig" : "09-sig",
      brand: isSe ? "SIG Atelier · S&E" : "SIG Atelier · Data Analyst",
      shortBrand: "SIG",
      mission: isSe
        ? "Cartographier pour piloter et rendre compte — couverture, écarts, décisions assignées."
        : "Analyser et fiabiliser des données spatiales — QC GPS, jointures, couche propre, lecture.",
      heroTitle: isSe
        ? "Le territoire au service du pilotage."
        : "Des données propres sur une carte utile.",
      heroLead: isSe
        ? "Parcours Expert S&E : socle SIG + couverture vs cible + note décisionnelle sur Kalunga."
        : "Parcours Data Analyst : socle SIG + QC/jointures + carte et lecture analytique sur Kalunga.",
      caseStudy,
      method,
      glossary,
      tracks: [
        {
          id: "socle",
          title: "Socle SIG",
          subtitle: "Notions, CRS, couches, QGIS, pièges GPS.",
          goal: "Partager le langage spatial.",
        },
        {
          id: "metier",
          title: isSe ? "SIG pour S&E" : "SIG pour Data Analyst",
          subtitle: isSe ? "Couverture, écarts, décisions." : "QC, jointures, livrable couche.",
          goal: isSe ? "Décider avec la carte." : "Fiabiliser puis cartographier.",
        },
      ],
      modules,
      carnet: isSe ? carnetSe : carnetDa,
      bilan: isSe ? bilanSe : bilanDa,
      checklistId: isSe ? "se" : "da",
    };
  }

  return { build, caseStudy };
})();
