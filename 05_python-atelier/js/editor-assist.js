/* Python Atelier — autocomplétion contextuelle + analyse pédagogique élargie */

window.AtelierEditor = (function () {
  const METHOD_CATALOG = {
    str: [
      ["upper()", "upper()", -1, "Majuscules"],
      ["lower()", "lower()", -1, "Minuscules"],
      ["strip()", "strip()", -1, "Enlever espaces"],
      ["split()", "split()", -1, "Découper"],
      ["replace(a, b)", 'replace("", "")', -5, "Remplacer"],
      ["startswith()", "startswith()", -1, "Commence par…"],
      ["endswith()", "endswith()", -1, "Finit par…"],
      ["find()", "find()", -1, "Position"],
      ["format()", "format()", -1, "Formater"],
      ["join()", "join()", -1, "Joindre"],
      ["isdigit()", "isdigit()", -1, "Que des chiffres ?"],
      ["isalpha()", "isalpha()", -1, "Que des lettres ?"],
      ["count()", "count()", -1, "Compter"]
    ],
    list: [
      ["append()", "append()", -1, "Ajouter à la fin"],
      ["extend()", "extend()", -1, "Ajouter plusieurs"],
      ["pop()", "pop()", -1, "Retirer un élément"],
      ["remove()", "remove()", -1, "Retirer une valeur"],
      ["sort()", "sort()", -1, "Trier"],
      ["reverse()", "reverse()", -1, "Inverser"],
      ["count()", "count()", -1, "Compter"],
      ["index()", "index()", -1, "Position"],
      ["clear()", "clear()", -1, "Vider"],
      ["copy()", "copy()", -1, "Copier"],
      ["insert()", "insert()", -1, "Insérer"]
    ],
    dict: [
      ["keys()", "keys()", -1, "Clés"],
      ["values()", "values()", -1, "Valeurs"],
      ["items()", "items()", -1, "Paires"],
      ["get()", "get()", -1, "Lire une clé"],
      ["pop()", "pop()", -1, "Retirer une clé"],
      ["update()", "update()", -1, "Mettre à jour"],
      ["clear()", "clear()", -1, "Vider"],
      ["copy()", "copy()", -1, "Copier"]
    ],
    df: [
      ["head()", "head()", -1, "Premières lignes"],
      ["tail()", "tail()", -1, "Dernières lignes"],
      ["info()", "info()", -1, "Types & manquants"],
      ["describe()", "describe()", -1, "Stats"],
      ["shape", "shape", 0, "Dimensions"],
      ["columns", "columns", 0, "Noms de colonnes"],
      ["dtypes", "dtypes", 0, "Types des colonnes"],
      ["isna()", "isna()", -1, "Manquants"],
      ["isnull()", "isnull()", -1, "Manquants"],
      ["dropna()", "dropna()", -1, "Supprimer manquants"],
      ["fillna()", "fillna()", -1, "Remplir manquants"],
      ["groupby()", 'groupby("")', -2, "Regrouper"],
      ["sort_values()", 'sort_values("")', -2, "Trier"],
      ["value_counts()", "value_counts()", -1, "Fréquences"],
      ["mean()", "mean()", -1, "Moyenne"],
      ["sum()", "sum()", -1, "Somme"],
      ["count()", "count()", -1, "Comptage"],
      ["median()", "median()", -1, "Médiane"],
      ["min()", "min()", -1, "Minimum"],
      ["max()", "max()", -1, "Maximum"],
      ["unique()", "unique()", -1, "Valeurs uniques"],
      ["nunique()", "nunique()", -1, "Nb uniques"],
      ["astype()", "astype()", -1, "Convertir type"],
      ["merge()", "merge()", -1, "Jointure"],
      ["to_csv()", 'to_csv("")', -2, "Exporter CSV"],
      ["to_excel()", 'to_excel("")', -2, "Exporter Excel"],
      ["loc", "loc", 0, "Sélection par label"],
      ["iloc", "iloc", 0, "Sélection par position"],
      ["copy()", "copy()", -1, "Copie"],
      ["reset_index()", "reset_index()", -1, "Réindexer"],
      ["duplicated()", "duplicated()", -1, "Doublons"]
    ],
    pd: [
      ["read_csv()", 'read_csv("")', -2, "Lire CSV"],
      ["read_excel()", 'read_excel("")', -2, "Lire Excel"],
      ["DataFrame()", "DataFrame()", -1, "Créer un tableau"],
      ["Series()", "Series()", -1, "Créer une série"],
      ["concat()", "concat()", -1, "Empiler"],
      ["merge()", "merge()", -1, "Joindre"],
      ["to_datetime()", "to_datetime()", -1, "Convertir dates"],
      ["isna()", "isna()", -1, "Manquants"],
      ["get_dummies()", "get_dummies()", -1, "Variables indicatrices"],
      ["ExcelFile()", "ExcelFile()", -1, "Classeur Excel"]
    ],
    series: [
      ["mean()", "mean()", -1, "Moyenne"],
      ["sum()", "sum()", -1, "Somme"],
      ["median()", "median()", -1, "Médiane"],
      ["min()", "min()", -1, "Minimum"],
      ["max()", "max()", -1, "Maximum"],
      ["std()", "std()", -1, "Écart-type"],
      ["value_counts()", "value_counts()", -1, "Fréquences"],
      ["unique()", "unique()", -1, "Uniques"],
      ["isna()", "isna()", -1, "Manquants"],
      ["dropna()", "dropna()", -1, "Supprimer NaN"],
      ["fillna()", "fillna()", -1, "Remplir NaN"],
      ["astype()", "astype()", -1, "Convertir"],
      ["map()", "map()", -1, "Transformer"],
      ["apply()", "apply()", -1, "Appliquer"],
      ["sort_values()", "sort_values()", -1, "Trier"]
    ],
    path: [
      ["exists()", "exists()", -1, "Existe ?"],
      ["read_text()", "read_text()", -1, "Lire texte"],
      ["write_text()", "write_text()", -1, "Écrire texte"]
    ]
  };

  const PARAM_CATALOG = {
    print: [
      ["sep=", 'sep=" "', 0, "Séparateur"],
      ["end=", 'end="\\n"', 0, "Fin de ligne"],
      ['"texte"', '"texte"', -1, "Message"]
    ],
    range: [
      ["stop", "10", 0, "Arrêt (exclus)"],
      ["start, stop", "0, 10", 0, "Début et fin"],
      ["start, stop, step", "0, 10, 2", 0, "Avec pas"]
    ],
    open: [
      ['"fichier.txt"', '"fichier.txt"', -1, "Chemin"],
      ['"fichier.txt", mode=', '"fichier.txt", mode="r"', 0, "Mode lecture"],
      ["encoding=", 'encoding="utf-8"', 0, "Encodage"]
    ],
    len: [["objet", "", 0, "Liste, texte, dict…"]],
    sum: [["iterable", "", 0, "Liste de nombres"]],
    "pd.read_csv": [
      ['"data/ventes.csv"', '"data/ventes.csv"', -1, "Chemin CSV"],
      ["sep=", 'sep=";"', 0, "Séparateur"],
      ["encoding=", 'encoding="utf-8"', 0, "Encodage"],
      ["header=", "header=0", 0, "Ligne d’en-tête"],
      ["index_col=", "index_col=None", 0, "Colonne index"],
      ["usecols=", "usecols=[...]", 0, "Colonnes à lire"],
      ["na_values=", 'na_values=[""]', 0, "Valeurs manquantes"]
    ],
    read_csv: [
      ['"data/ventes.csv"', '"data/ventes.csv"', -1, "Chemin CSV"],
      ["sep=", 'sep=";"', 0, "Séparateur"],
      ["encoding=", 'encoding="utf-8"', 0, "Encodage"]
    ],
    "pd.read_excel": [
      ['"data/ventes_apercu.xlsx"', '"data/ventes_apercu.xlsx"', -1, "Fichier Excel"],
      ["sheet_name=", "sheet_name=0", 0, "Feuille"]
    ],
    read_excel: [
      ['"data/ventes_apercu.xlsx"', '"data/ventes_apercu.xlsx"', -1, "Fichier Excel"],
      ["sheet_name=", "sheet_name=0", 0, "Feuille"]
    ],
    groupby: [
      ['"ville"', '"ville"', -1, "Colonne de groupe"],
      ['["ville", "produit"]', '["ville", "produit"]', 0, "Plusieurs colonnes"],
      ["as_index=", "as_index=False", 0, "Garder colonnes"]
    ],
    sort_values: [
      ['"montant_cdf"', '"montant_cdf"', -1, "Colonne de tri"],
      ["ascending=", "ascending=False", 0, "Décroissant ?"],
      ["by=", 'by="montant_cdf"', 0, "Par colonne"]
    ],
    merge: [
      ["right=", "right=clients", 0, "Autre tableau"],
      ["on=", 'on="client_id"', 0, "Clé commune"],
      ["how=", 'how="left"', 0, "Type de jointure"],
      ["left_on=", 'left_on="id"', 0, "Clé gauche"],
      ["right_on=", 'right_on="id"', 0, "Clé droite"]
    ],
    fillna: [
      ["value=", "value=0", 0, "Valeur de remplacement"],
      ["0", "0", 0, "Remplacer par 0"]
    ],
    dropna: [
      ["subset=", 'subset=["quantite"]', 0, "Colonnes ciblées"],
      ["how=", 'how="any"', 0, "any / all"]
    ],
    to_csv: [
      ['"export.csv"', '"export.csv"', -1, "Fichier sortie"],
      ["index=", "index=False", 0, "Sans index"],
      ["sep=", 'sep=";"', 0, "Séparateur"]
    ],
    to_datetime: [
      ['df["date"]', 'df["date"]', 0, "Colonne date"],
      ["errors=", 'errors="coerce"', 0, "Erreurs → NaT"]
    ],
    astype: [
      ["int", "int", 0, "Entier"],
      ["float", "float", 0, "Décimal"],
      ["str", "str", 0, "Texte"]
    ],
    replace: [
      ['"ancien", "nouveau"', '"ancien", "nouveau"', 0, "Remplacer texte"]
    ],
    append: [["element", "", 0, "Élément à ajouter"]],
    get: [
      ['"cle"', '"cle"', -1, "Clé"],
      ['"cle", default', '"cle", None', 0, "Avec défaut"]
    ]
  };

  const BASE_COMPLETIONS = [
    { label: "print(...)", insert: "print()", move: -1, hint: "Afficher" },
    { label: "input(...)", insert: "input()", move: -1, hint: "Saisie" },
    { label: "if ... :", insert: "if :\n    ", move: -6, hint: "Condition" },
    { label: "elif ... :", insert: "elif :\n    ", move: -6, hint: "Sinon si" },
    { label: "else:", insert: "else:\n    ", move: 0, hint: "Sinon" },
    { label: "for i in range(...):", insert: "for i in range():\n    ", move: -8, hint: "Boucle" },
    { label: "for item in ...:", insert: "for item in :\n    ", move: -6, hint: "Parcourir" },
    { label: "while ... :", insert: "while :\n    ", move: -6, hint: "Tant que" },
    { label: "def name():", insert: "def ():\n    return ", move: -14, hint: "Fonction" },
    { label: "return", insert: "return ", move: 0, hint: "Renvoyer" },
    { label: "import pandas as pd", insert: "import pandas as pd", move: 0, hint: "Pandas" },
    { label: "import matplotlib.pyplot as plt", insert: "import matplotlib.pyplot as plt", move: 0, hint: "Graphiques" },
    { label: "pd.read_csv(...)", insert: 'pd.read_csv("")', move: -2, hint: "Lire CSV" },
    { label: "pd.read_excel(...)", insert: 'pd.read_excel("")', move: -2, hint: "Lire Excel" },
    { label: "True", insert: "True", move: 0, hint: "Vrai" },
    { label: "False", insert: "False", move: 0, hint: "Faux" },
    { label: "None", insert: "None", move: 0, hint: "Vide" },
    { label: "len(...)", insert: "len()", move: -1, hint: "Longueur" },
    { label: "range(...)", insert: "range()", move: -1, hint: "Suite" },
    { label: "type(...)", insert: "type()", move: -1, hint: "Type" },
    { label: "int(...)", insert: "int()", move: -1, hint: "Entier" },
    { label: "float(...)", insert: "float()", move: -1, hint: "Décimal" },
    { label: "str(...)", insert: "str()", move: -1, hint: "Texte" },
    { label: "list(...)", insert: "list()", move: -1, hint: "Liste" },
    { label: "dict(...)", insert: "dict()", move: -1, hint: "Dictionnaire" },
    { label: "sum(...)", insert: "sum()", move: -1, hint: "Somme" },
    { label: "min(...)", insert: "min()", move: -1, hint: "Minimum" },
    { label: "max(...)", insert: "max()", move: -1, hint: "Maximum" },
    { label: "open(...)", insert: "open()", move: -1, hint: "Fichier" },
    { label: "try/except", insert: "try:\n    \nexcept Exception as e:\n    print(e)", move: -28, hint: "Gérer erreur" },
    { label: "with open(...) as f:", insert: 'with open("", "r", encoding="utf-8") as f:\n    ', move: -28, hint: "Fichier sûr" }
  ];

  [
    "print", "input", "if", "elif", "else", "for", "while", "def", "return",
    "import", "from", "as", "in", "not", "and", "or", "is", "lambda",
    "break", "continue", "pass", "class", "try", "except", "finally", "with",
    "raise", "assert", "global", "nonlocal", "yield", "async", "await"
  ].forEach((k) => {
    if (!BASE_COMPLETIONS.some((c) => c.label === k)) {
      BASE_COMPLETIONS.push({ label: k, insert: k, move: 0, hint: "Mot-clé" });
    }
  });

  function catalogToItems(rows, kind) {
    return (rows || []).map(([label, insert, move, hint]) => ({
      label,
      insert,
      move: move || 0,
      hint: hint || kind
    }));
  }

  function collectSymbols(code) {
    const vars = new Set();
    const funcs = new Set();
    const aliases = {};
    String(code || "").split(/\r?\n/).forEach((line) => {
      let m;
      if ((m = line.match(/^\s*([A-Za-z_]\w*)\s*=\s*(.+)$/))) {
        vars.add(m[1]);
        const rhs = m[2];
        if (/read_csv|read_excel|DataFrame\s*\(/.test(rhs)) aliases[m[1]] = "df";
        else if (/^\s*\[/.test(rhs) || /list\s*\(/.test(rhs)) aliases[m[1]] = "list";
        else if ((/^\s*\{/.test(rhs) && !/^\s*\{\s*\}/.test(rhs)) || /dict\s*\(/.test(rhs)) aliases[m[1]] = "dict";
        else if (/^\s*["']/.test(rhs) || /str\s*\(/.test(rhs)) aliases[m[1]] = "str";
        else if (/\.groupby\(/.test(rhs) || /\[[\"'][^\"']+[\"']\]/.test(rhs) && /\.(mean|sum|count)\s*\(/.test(rhs)) aliases[m[1]] = "series";
      }
      if ((m = line.match(/def\s+([A-Za-z_]\w*)\s*\(/))) funcs.add(m[1]);
      if ((m = line.match(/for\s+([A-Za-z_]\w*)\s+in/))) vars.add(m[1]);
      if ((m = line.match(/import\s+pandas\s+as\s+(\w+)/))) aliases[m[1]] = "pd";
      if ((m = line.match(/import\s+pandas\b/))) aliases.pandas = "pd";
    });
    return { vars, funcs, aliases };
  }

  function inferObjectKind(name, symbols) {
    if (!name) return null;
    if (symbols.aliases[name]) return symbols.aliases[name];
    const n = name.toLowerCase();
    if (n === "pd" || n === "pandas") return "pd";
    if (n === "df" || /^(data|ventes|clients|table|frame)/.test(n)) return "df";
    if (/^(notes|villes|liste|items|values|nombres|ages)/.test(n)) return "list";
    if (/^(dico|dict|eleve|produit|config|row)/.test(n)) return "dict";
    if (/^(prenom|nom|texte|message|ville|produit_nom|s)$/.test(n) || /name|text|label/.test(n)) return "str";
    if (/^(serie|series|col)_?/.test(n)) return "series";
    return null;
  }

  function getCompletionContext(text, pos) {
    const left = text.slice(0, pos);
    const lineStart = left.lastIndexOf("\n") + 1;
    const lineLeft = left.slice(lineStart);

    // Attribut / méthode : obj.pre|
    const attr = lineLeft.match(/([A-Za-z_]\w*)\s*\.\s*([A-Za-z_]\w*)?$/);
    if (attr) {
      return {
        mode: "attr",
        object: attr[1],
        prefix: attr[2] || "",
        start: pos - (attr[2] || "").length
      };
    }

    // Paramètres dans un appel : foo( ... pre|   ou pd.read_csv( pre|
    const call = lineLeft.match(/([A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*)\s*\(([^()]*)$/);
    if (call) {
      const args = call[2];
      const prefMatch = args.match(/([A-Za-z_]\w*|"[^"]*|'[^']*|=)?$/);
      let prefix = "";
      if (args.endsWith("=")) prefix = "";
      else {
        const token = args.match(/([A-Za-z_]\w*)$/);
        prefix = token ? token[1] : "";
      }
      return {
        mode: "param",
        callee: call[1],
        prefix,
        start: pos - prefix.length,
        argsSoFar: args
      };
    }

    // Mot normal
    const m = left.match(/([A-Za-z_][\w]*)$/);
    if (m) {
      return { mode: "word", prefix: m[1], start: pos - m[1].length };
    }

    // Après un point seul : obj.|
    const bareDot = lineLeft.match(/([A-Za-z_]\w*)\s*\.\s*$/);
    if (bareDot) {
      return { mode: "attr", object: bareDot[1], prefix: "", start: pos };
    }

    return { mode: "word", prefix: "", start: pos };
  }

  function buildCompletions(text, pos) {
    const symbols = collectSymbols(text);
    const ctx = getCompletionContext(text, pos);
    let items = [];

    if (ctx.mode === "attr") {
      const kind = inferObjectKind(ctx.object, symbols);
      const kinds = kind ? [kind] : ["str", "list", "dict", "df", "series", "pd"];
      const seen = new Set();
      kinds.forEach((k) => {
        catalogToItems(METHOD_CATALOG[k], "méthode / attribut").forEach((it) => {
          if (seen.has(it.label)) return;
          seen.add(it.label);
          items.push({ ...it, hint: `${it.hint} · ${k}` });
        });
      });
      const pref = (ctx.prefix || "").toLowerCase();
      if (pref) items = items.filter((it) => it.label.toLowerCase().startsWith(pref) || it.insert.toLowerCase().startsWith(pref));
      return { items: items.slice(0, 14), start: ctx.start };
    }

    if (ctx.mode === "param") {
      const callee = ctx.callee;
      const short = callee.includes(".") ? callee.split(".").pop() : callee;
      const keyCandidates = [callee, short, callee.replace(/^pd\./, "pd.")];
      let rows = [];
      keyCandidates.forEach((k) => {
        if (PARAM_CATALOG[k]) rows = rows.concat(PARAM_CATALOG[k]);
      });
      // Paramètres de méthodes DataFrame courantes
      if (!rows.length && METHOD_CATALOG.df.some((r) => r[0].startsWith(short))) {
        rows = PARAM_CATALOG[short] || [];
      }
      items = catalogToItems(rows, "paramètre");
      // Variables locales utiles comme arguments
      symbols.vars.forEach((v) => {
        items.push({ label: v, insert: v, move: 0, hint: "variable du script" });
      });
      const pref = (ctx.prefix || "").toLowerCase();
      if (pref) {
        items = items.filter(
          (it) =>
            it.label.toLowerCase().includes(pref) ||
            it.insert.toLowerCase().includes(pref)
        );
      }
      // Toujours proposer quelque chose de pertinent
      if (!items.length) {
        items = [
          { label: "…", insert: "", move: 0, hint: `Arguments de ${callee}` },
          ...[...symbols.vars].map((v) => ({ label: v, insert: v, move: 0, hint: "variable" }))
        ];
      }
      return { items: items.slice(0, 14), start: ctx.start };
    }

    // Mode mot : base + symboles locaux + imports fréquents
    items = BASE_COMPLETIONS.slice();
    symbols.vars.forEach((v) => items.push({ label: v, insert: v, move: 0, hint: "votre variable" }));
    symbols.funcs.forEach((f) =>
      items.push({ label: f + "()", insert: f + "()", move: -1, hint: "votre fonction" })
    );
    const pref = (ctx.prefix || "").toLowerCase();
    if (pref.length >= 1) {
      items = items.filter(
        (it) => it.label.toLowerCase().startsWith(pref) || it.insert.toLowerCase().startsWith(pref)
      );
    } else {
      items = [];
    }
    return { items: items.slice(0, 14), start: ctx.start };
  }

  function attachAutocomplete(textarea) {
    if (!textarea || textarea.dataset.acBound === "1") return;
    textarea.dataset.acBound = "1";

    const wrap = document.createElement("div");
    wrap.className = "editor-wrap";
    textarea.parentNode.insertBefore(wrap, textarea);
    wrap.appendChild(textarea);

    const menu = document.createElement("ul");
    menu.className = "ac-menu";
    menu.hidden = true;
    menu.setAttribute("role", "listbox");
    wrap.appendChild(menu);

    let items = [];
    let active = 0;
    let wordStart = 0;

    function hide() {
      menu.hidden = true;
      items = [];
      active = 0;
    }

    function renderMenu() {
      if (!items.length) {
        hide();
        return;
      }
      menu.hidden = false;
      menu.innerHTML = items
        .map(
          (it, i) => `
        <li class="ac-item${i === active ? " is-active" : ""}" role="option" data-idx="${i}">
          <strong>${escapeHtml(it.label)}</strong>
          <span>${escapeHtml(it.hint || "")}</span>
        </li>`
        )
        .join("");
    }

    function applyCompletion(item) {
      if (!item || item.insert == null) return;
      const value = textarea.value;
      const caret = textarea.selectionStart;
      const before = value.slice(0, wordStart);
      const after = value.slice(caret);
      const insert = item.insert;
      textarea.value = before + insert + after;
      const newPos = before.length + insert.length + (item.move || 0);
      textarea.setSelectionRange(Math.max(0, newPos), Math.max(0, newPos));
      textarea.focus();
      hide();
      textarea.dispatchEvent(new Event("input", { bubbles: true }));
    }

    function refresh() {
      const caret = textarea.selectionStart;
      const built = buildCompletions(textarea.value, caret);
      wordStart = built.start;
      items = built.items;
      active = 0;
      renderMenu();
    }

    textarea.addEventListener("input", refresh);
    textarea.addEventListener("click", hide);
    textarea.addEventListener("blur", () => setTimeout(hide, 150));

    // Après un point, ouvrir immédiatement le menu des méthodes
    textarea.addEventListener("keyup", (e) => {
      if (e.key === "." || e.key === "(") refresh();
    });

    textarea.addEventListener("keydown", (e) => {
      if (menu.hidden || !items.length) {
        if (e.key === "Tab" && !e.shiftKey) {
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          if (start === end) {
            e.preventDefault();
            const v = textarea.value;
            textarea.value = v.slice(0, start) + "    " + v.slice(end);
            textarea.setSelectionRange(start + 4, start + 4);
          }
        }
        // Ctrl+Espace force l’autocomplétion
        if ((e.ctrlKey || e.metaKey) && e.code === "Space") {
          e.preventDefault();
          refresh();
        }
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        active = (active + 1) % items.length;
        renderMenu();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        active = (active - 1 + items.length) % items.length;
        renderMenu();
      } else if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        applyCompletion(items[active]);
      } else if (e.key === "Escape") {
        e.preventDefault();
        hide();
      }
    });

    menu.addEventListener("mousedown", (e) => {
      const li = e.target.closest(".ac-item");
      if (!li) return;
      e.preventDefault();
      applyCompletion(items[Number(li.dataset.idx)]);
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /** Ne prendre que la ligne du code apprenant, pas celles du moteur Pyodide. */
  function parseTraceback(msg, code) {
    const text = String(msg || "");
    const codeLines = String(code || "").split(/\r?\n/);
    const maxLine = Math.max(codeLines.length, 1);

    // Préférer File "<exec>" / <stdin> / <string>
    const userFile = [
      ...text.matchAll(/File "(?:<exec>|<stdin>|<string>|[^"]*)", line (\d+)(?:,|\n)/gi)
    ];
    let line = null;
    for (let i = userFile.length - 1; i >= 0; i--) {
      const n = Number(userFile[i][1]);
      const fileChunk = userFile[i][0] || "";
      if (/<exec>|<stdin>|<string>/i.test(fileChunk) && n >= 1 && n <= maxLine + 2) {
        line = n;
        break;
      }
    }
    if (line == null) {
      for (let i = userFile.length - 1; i >= 0; i--) {
        const n = Number(userFile[i][1]);
        if (n >= 1 && n <= maxLine) {
          line = n;
          break;
        }
      }
    }

    // Ligne fautive citée dans le traceback
    let snippet = null;
    const snippetMatch = text.match(/File "[^"]*", line \d+\s*\n\s*(.+)\n\s*\^/i)
      || text.match(/line \d+\s*\n\s*(.+)\n\s*\^/i);
    if (snippetMatch) snippet = snippetMatch[1].trim();

    // Position du caret ^
    let caretCol = null;
    const caretBlock = text.match(/\n([ \t]*)\^\s*\n/);
    if (caretBlock) caretCol = caretBlock[1].length;

    if (!snippet && line && codeLines[line - 1] != null) {
      snippet = codeLines[line - 1];
    }

    const errorType = (text.match(/\b([A-Z][A-Za-z]+Error)\b/) || [])[1] || null;
    const shortMsg = (text.match(/\b(?:SyntaxError|NameError|TypeError|IndentationError|TabError|AttributeError|KeyError|IndexError|ValueError|ZeroDivisionError|ModuleNotFoundError|FileNotFoundError):\s*(.+)/) || [])[1] || "";

    return { line, snippet, caretCol, errorType, shortMsg: shortMsg.trim(), raw: text };
  }

  function charAtCaret(snippet, caretCol) {
    if (!snippet || caretCol == null) return "";
    // Le ^ pointe souvent sous le caractère fautif (ou juste après)
    if (caretCol < snippet.length) return snippet[caretCol];
    if (snippet.length) return snippet[snippet.length - 1];
    return "";
  }

  function diagnoseFromCode(tb, code) {
    const codeLines = String(code || "").split(/\r?\n/);
    const line = tb.line;
    const snippet = (tb.snippet || (line ? codeLines[line - 1] : "") || "").replace(/\r/g, "");
    const col = tb.caretCol;
    const ch = charAtCaret(snippet, col);
    const before = col != null ? snippet.slice(0, col) : snippet;
    const after = col != null ? snippet.slice(col) : "";
    const loc = line ? `À la ligne ${line}` : "Dans votre code";

    // Point orphelin : prenom.  ou prenom.)
    if (/\b[A-Za-z_]\w*\.\s*[,)\]]/.test(snippet) || /\b[A-Za-z_]\w*\.\s*$/.test(snippet.trim())) {
      const m = snippet.match(/\b([A-Za-z_]\w*)\.\s*([,)\]]|$)/);
      const name = m ? m[1] : "la variable";
      return {
        title: "Point « . » inutile ou inachevé",
        problem: `${loc}, Python bloque sur un point après « ${name} » :\n${snippet}`,
        why: "Le point sert à enchaîner une méthode ou un attribut, comme prenom.upper(). Ici, après le point, il n’y a rien de valide (juste une virgule ou une parenthèse).",
        fix: `Enlevez le point. Écrivez par exemple : print("Bienvenue", ${name})`
      };
    }

    if (ch === "." || /\.\s*[,)\]]/.test(snippet) || before.endsWith(".")) {
      return {
        title: "Point « . » mal placé",
        problem: `${loc}, le curseur d’erreur pointe près d’un point « . » :\n${snippet}`,
        why: "Un point seul ne veut rien dire. Soit vous voulez une méthode (prenom.upper()), soit ce point est une faute de frappe.",
        fix: "Supprimez le « . » en trop, ou complétez avec une vraie méthode : prenom.upper()"
      };
    }

    if (ch === "," || /,\s*\)/.test(snippet)) {
      return {
        title: "Virgule en trop",
        problem: `${loc}, il y a une virgule mal placée :\n${snippet}`,
        why: "Une virgule sépare des éléments. Juste avant une parenthèse fermante, elle est souvent inutile (sauf cas avancés).",
        fix: "Retirez la virgule en trop, ou ajoutez l’argument manquant après la virgule."
      };
    }

    if (/["']$/.test(snippet.trim()) === false && ((snippet.match(/"/g) || []).length % 2 === 1 || (snippet.match(/'/g) || []).length % 2 === 1)) {
      return {
        title: "Guillemet non fermé",
        problem: `${loc}, un texte n’est pas correctement refermé :\n${snippet}`,
        why: "Python lit encore du texte et ne trouve pas la fin de la chaîne.",
        fix: "Fermez le guillemet : \"texte\" ou 'texte'."
      };
    }

    if (/^\s*(if|elif|else|for|while|def|try|except|with)\b/.test(snippet) && !snippet.trim().endsWith(":")) {
      const kw = snippet.trim().split(/\s+/)[0];
      return {
        title: "Deux-points « : » manquants",
        problem: `${loc}, la structure « ${kw} » n’a pas de « : » à la fin :\n${snippet}`,
        why: "En Python, if / for / while / def doivent se terminer par : avant le bloc indenté.",
        fix: `Ajoutez « : » à la fin de la ligne ${line || ""}.`
      };
    }

    if (/\bif\s+[^=\n]*=(?!=)/.test(snippet) && !/==|!=|>=|<=/.test(snippet)) {
      return {
        title: "Confusion entre = et ==",
        problem: `${loc}, dans un if vous utilisez probablement = au lieu de == :\n${snippet}`,
        why: "= range une valeur. == compare deux valeurs.",
        fix: "Écrivez par exemple : if age == 18:"
      };
    }

    if (/print\s+[^(]/i.test(snippet) && !/print\s*\(/i.test(snippet)) {
      return {
        title: "Parenthèses de print manquantes",
        problem: `${loc}, print est utilisé sans parenthèses :\n${snippet}`,
        why: "En Python 3, on écrit print(\"texte\"), pas print \"texte\".",
        fix: "Ajoutez les parenthèses : print(\"Bonjour\")"
      };
    }

    // Attribute inachevé générique près du caret
    if (after.startsWith(".") || before.match(/\.\s*$/)) {
      return {
        title: "Accès à un attribut incomplet",
        problem: `${loc}, un point attend une suite :\n${snippet}`,
        why: "Après un point, Python attend un nom (upper, head, mean…).",
        fix: "Soit vous complétez (prenom.upper()), soit vous enlevez le point."
      };
    }

    return null;
  }

  function makeTip(partial) {
    return {
      title: partial.title || "Point à corriger",
      problem: partial.problem || "",
      why: partial.why || "",
      fix: partial.fix || "",
      line: partial.line != null ? partial.line : null,
      snippet: partial.snippet || "",
      technical: partial.technical || ""
    };
  }

  function staticReview(code) {
    const tips = [];
    const push = (partial) => tips.push(makeTip(partial));
    const lines = String(code || "").split(/\r?\n/);

    // Aucun plafond : une entrée par faute trouvée, ligne par ligne
    lines.forEach((line, idx) => {
      const n = idx + 1;
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;

      if (/\bPrint\s*\(/.test(line) || /\bPRINT\s*\(/.test(line)) {
        push({
          title: "Majuscule incorrecte sur print",
          problem: `Ligne ${n} : vous avez écrit Print/PRINT au lieu de print.`,
          why: "Python est sensible à la casse : print doit être tout en minuscules.",
          fix: "Remplacez par print(...).",
          line: n,
          snippet: trimmed
        });
      }

      ["If", "For", "While", "Def", "Else", "Elif", "Return", "Import", "Class"].forEach((bad) => {
        if (new RegExp("\\b" + bad + "\\b").test(trimmed)) {
          push({
            title: `Mot-clé mal capitalisé (« ${bad} »)`,
            problem: `Ligne ${n} : « ${bad} » commence par une majuscule.`,
            why: "Les mots-clés Python s’écrivent en minuscules : if, for, while, def, else…",
            fix: `Écrivez « ${bad.toLowerCase()} » en minuscules.`,
            line: n,
            snippet: trimmed
          });
        }
      });

      if (/\btrue\b/.test(trimmed) && !/\bTrue\b/.test(trimmed)) {
        push({
          title: "Booléen « true » incorrect",
          problem: `Ligne ${n} : « true » n’existe pas en Python.`,
          why: "En Python, on écrit True avec un T majuscule.",
          fix: "Remplacez true par True.",
          line: n,
          snippet: trimmed
        });
      }
      if (/\bfalse\b/.test(trimmed) && !/\bFalse\b/.test(trimmed)) {
        push({
          title: "Booléen « false » incorrect",
          problem: `Ligne ${n} : « false » n’existe pas en Python.`,
          why: "En Python, on écrit False avec un F majuscule.",
          fix: "Remplacez false par False.",
          line: n,
          snippet: trimmed
        });
      }
      if (/\bnull\b/i.test(trimmed)) {
        push({
          title: "« null » n’existe pas en Python",
          problem: `Ligne ${n} : vous avez utilisé null.`,
          why: "Python utilise None pour l’absence de valeur.",
          fix: "Remplacez null par None.",
          line: n,
          snippet: trimmed
        });
      }

      if (/&&|\|\|/.test(trimmed)) {
        push({
          title: "Opérateurs && ou ||",
          problem: `Ligne ${n} : && ou || viennent d’autres langages.`,
          why: "En Python, on écrit and et or.",
          fix: "Remplacez && par and, et || par or.",
          line: n,
          snippet: trimmed
        });
      }

      if (/\+\+|--/.test(trimmed)) {
        push({
          title: "++ ou -- non valides",
          problem: `Ligne ${n} : ++ / -- n’existent pas en Python.`,
          why: "On incrémente avec x = x + 1 ou x += 1.",
          fix: "Écrivez par exemple compteur += 1.",
          line: n,
          snippet: trimmed
        });
      }

      if (/;/.test(trimmed)) {
        push({
          title: "Point-virgule style JavaScript",
          problem: `Ligne ${n} : un « ; » est inhabituel en Python débutant.`,
          why: "Python sépare les instructions par des lignes, pas par des point-virgules.",
          fix: "Supprimez le « ; » et passez à la ligne suivante si besoin.",
          line: n,
          snippet: trimmed
        });
      }

      if (/\b[A-Za-z_]\w*\.\s*[,)\]]/.test(line) || /\b[A-Za-z_]\w*\.\s*$/.test(trimmed)) {
        const m = line.match(/\b([A-Za-z_]\w*)\.\s*([,)\]]|$)/);
        push({
          title: "Point « . » inutile ou inachevé",
          problem: `Ligne ${n} : point après « ${m ? m[1] : "…"} » dans votre instruction.`,
          why: "Le point doit être suivi d’une méthode/attribut, sinon c’est une faute.",
          fix: m ? `Écrivez « ${m[1]} » sans le point, sauf si vous voulez ${m[1]}.une_methode()` : "Supprimez le point en trop.",
          line: n,
          snippet: trimmed
        });
      }

      if (/print\s+[^(]/i.test(trimmed) && !/print\s*\(/i.test(trimmed)) {
        push({
          title: "Parenthèses de print manquantes",
          problem: `Ligne ${n} : print est utilisé sans parenthèses.`,
          why: "En Python 3, on écrit print(\"texte\").",
          fix: "Ajoutez les parenthèses : print(\"Bonjour\")",
          line: n,
          snippet: trimmed
        });
      }

      if (/^\s*(if|elif|else|for|while|def|try|except|with|If|Elif|Else|For|While|Def)\b[^:]*$/i.test(trimmed) && !trimmed.endsWith(":")) {
        push({
          title: "Deux-points manquants",
          problem: `Ligne ${n} : « ${trimmed.split(/\s+/)[0]} » n’a pas de « : » à la fin.`,
          why: "En Python, if / for / while / def ouvrent un bloc avec des deux-points.",
          fix: "Ajoutez « : » à la fin, puis indentez la ligne suivante (4 espaces).",
          line: n,
          snippet: trimmed
        });
      }

      if (/\b(?:if|If)\s+.*=(?!=)[^=\n]*:?/.test(trimmed) && !/==|!=|>=|<=/.test(trimmed) && /=/.test(trimmed)) {
        push({
          title: "Confusion entre = et ==",
          problem: `Ligne ${n} : un if semble utiliser = au lieu de ==.`,
          why: "= range une valeur. == compare deux valeurs.",
          fix: "Écrivez par exemple : if age == 18:",
          line: n,
          snippet: trimmed
        });
      }

      if (/,\s*\)/.test(trimmed)) {
        push({
          title: "Virgule en trop",
          problem: `Ligne ${n} : une virgule apparaît juste avant « ) ».`,
          why: "Souvent, la virgule annonce un argument qui n’a pas été écrit.",
          fix: "Retirez la virgule, ou ajoutez l’argument manquant.",
          line: n,
          snippet: trimmed
        });
      }

      // Guillemets / parenthèses sur la ligne (hors chaînes simplifié)
      const dq = (trimmed.match(/"/g) || []).length;
      const sq = (trimmed.match(/'/g) || []).length;
      if (dq % 2 === 1) {
        push({
          title: "Guillemet double non fermé",
          problem: `Ligne ${n} : un \" n’est pas refermé sur cette ligne.`,
          why: "Python ne sait pas où se termine le texte.",
          fix: "Fermez le texte : \"...\"",
          line: n,
          snippet: trimmed
        });
      }
      if (sq % 2 === 1) {
        push({
          title: "Guillemet simple non fermé",
          problem: `Ligne ${n} : un ' n’est pas refermé sur cette ligne.`,
          why: "Une chaîne doit être fermée.",
          fix: "Fermez le texte : '...'",
          line: n,
          snippet: trimmed
        });
      }

      const op = (trimmed.match(/\(/g) || []).length;
      const cp = (trimmed.match(/\)/g) || []).length;
      if (op !== cp) {
        push({
          title: "Parenthèses déséquilibrées",
          problem: `Ligne ${n} : ${op} parenthèse(s) ouvrante(s) et ${cp} fermante(s).`,
          why: "Chaque ( doit avoir sa ).",
          fix: "Ajoutez ou retirez la parenthèse manquante sur cette ligne.",
          line: n,
          snippet: trimmed
        });
      }

      const ob = (trimmed.match(/\[/g) || []).length;
      const cb = (trimmed.match(/\]/g) || []).length;
      if (ob !== cb) {
        push({
          title: "Crochets déséquilibrés",
          problem: `Ligne ${n} : crochets [ ] non équilibrés.`,
          why: "Une liste s’écrit avec [ et ].",
          fix: "Vérifiez chaque [ et ].",
          line: n,
          snippet: trimmed
        });
      }

      const oc = (trimmed.match(/\{/g) || []).length;
      const cc = (trimmed.match(/\}/g) || []).length;
      if (oc !== cc) {
        push({
          title: "Accolades déséquilibrées",
          problem: `Ligne ${n} : accolades { } non équilibrées.`,
          why: "Un dictionnaire s’écrit avec { et }.",
          fix: "Vérifiez chaque { et }.",
          line: n,
          snippet: trimmed
        });
      }

      if (/\bpritn\b|\bpirnt\b|\bimprot\b|\bform\b\s+/.test(trimmed)) {
        push({
          title: "Faute de frappe probable",
          problem: `Ligne ${n} : un mot ressemble à une faute de frappe (pritn, improt…).`,
          why: "Python exige l’orthographe exacte des noms.",
          fix: "Corrigez en print, import, from…",
          line: n,
          snippet: trimmed
        });
      }
    });

    // Contrôle global complémentaire (fichier entier)
    const all = String(code || "");
    const openPar = (all.match(/\(/g) || []).length;
    const closePar = (all.match(/\)/g) || []).length;
    if (openPar !== closePar) {
      const already = tips.some((t) => t.title === "Parenthèses déséquilibrées");
      if (!already) {
        push({
          title: "Parenthèses déséquilibrées (fichier)",
          problem: `Dans tout le code : ${openPar} « ( » et ${closePar} « ) ».`,
          why: "Une parenthèse ouverte quelque part n’a pas été fermée.",
          fix: "Parcourez chaque print(...) et chaque appel de fonction.",
          line: null,
          snippet: ""
        });
      }
    }

    // Indentation : ligne après : doit être indentée
    for (let i = 0; i < lines.length - 1; i++) {
      const cur = lines[i].trim();
      const next = lines[i + 1];
      const nextTrim = next.trim();
      if (!cur.endsWith(":") || !nextTrim || nextTrim.startsWith("#")) continue;
      if (/^\s*(else|elif|except|finally)\b/.test(nextTrim)) continue;
      if (!/^\s+/.test(next)) {
        push({
          title: "Indentation manquante après « : »",
          problem: `Ligne ${i + 2} : devrait être indentée, car la ligne ${i + 1} se termine par « : ».`,
          why: "Le bloc sous if/for/def doit être décalé de 4 espaces.",
          fix: `Ajoutez 4 espaces devant : ${nextTrim}`,
          line: i + 2,
          snippet: nextTrim
        });
      }
    }

    // ——— Analyse élargie : sémantique, appels, data, styles dangereux ———
    const defined = new Set();
    const builtins = new Set([
      "print", "input", "len", "range", "int", "float", "str", "bool", "list", "dict",
      "set", "tuple", "sum", "min", "max", "type", "open", "abs", "round", "sorted",
      "enumerate", "zip", "map", "filter", "any", "all", "isinstance", "hasattr",
      "True", "False", "None", "Exception", "ValueError", "TypeError", "pd", "plt", "np"
    ]);

    lines.forEach((line, idx) => {
      const n = idx + 1;
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;

      let m;
      if ((m = trimmed.match(/^([A-Za-z_]\w*)\s*=/))) defined.add(m[1]);
      if ((m = trimmed.match(/^def\s+([A-Za-z_]\w*)\s*\(/))) defined.add(m[1]);
      if ((m = trimmed.match(/^for\s+([A-Za-z_]\w*)\s+in/))) defined.add(m[1]);
      if ((m = trimmed.match(/^import\s+(\w+)/))) defined.add(m[1]);
      if ((m = trimmed.match(/^import\s+\w+\s+as\s+(\w+)/))) defined.add(m[1]);
      if ((m = trimmed.match(/^from\s+\w+\s+import\s+(.+)$/))) {
        m[1].split(",").forEach((p) => {
          const name = p.trim().split(/\s+as\s+/).pop().trim();
          if (/^[A-Za-z_]/.test(name)) defined.add(name);
        });
      }

      // Division par zéro littérale
      if (/\/\s*0\b/.test(trimmed) && !/\/\s*0\./.test(trimmed)) {
        push({
          title: "Division par zéro",
          problem: `Ligne ${n} : division par 0 détectée.`,
          why: "Cela provoque ZeroDivisionError à l’exécution.",
          fix: "Vérifiez le dénominateur (if n != 0:).",
          line: n,
          snippet: trimmed
        });
      }

      // Comparaison avec None via ==
      if (/==\s*None|None\s*==/.test(trimmed)) {
        push({
          title: "Comparer None avec ==",
          problem: `Ligne ${n} : comparaison à None via ==.`,
          why: "La bonne pratique Python est : if x is None:",
          fix: "Remplacez == None par is None (et != None par is not None).",
          line: n,
          snippet: trimmed
        });
      }

      // Mutable par défaut dans def
      if (/^def\s+\w+\s*\([^)]*=\s*(\[\]|\{\})/.test(trimmed)) {
        push({
          title: "Argument mutable par défaut",
          problem: `Ligne ${n} : défaut [] ou {} dans une fonction.`,
          why: "Ce défaut est partagé entre les appels — source de bugs subtils.",
          fix: "Utilisez None puis créez la liste/dict dans le corps.",
          line: n,
          snippet: trimmed
        });
      }

      // is avec littéral (sauf None)
      if (/\bis\s+("|'|True|False|\d)/.test(trimmed) || (/\bis\s+\d/.test(trimmed))) {
        push({
          title: "« is » avec une valeur littérale",
          problem: `Ligne ${n} : « is » est réservé à l’identité (surtout None).`,
          why: "Pour comparer des valeurs, utilisez ==.",
          fix: "Écrivez == plutôt que is (sauf pour None).",
          line: n,
          snippet: trimmed
        });
      }

      // Assignation dans print par erreur print(x = 1) — SyntaxError en Py3 sauf walrus
      if (/print\s*\(\s*[A-Za-z_]\w*\s*=\s*[^=]/.test(trimmed) && !/:?=/.test(trimmed)) {
        push({
          title: "Affectation dans print(...)",
          problem: `Ligne ${n} : une affectation (=) apparaît dans print.`,
          why: "print affiche des valeurs ; l’affectation se fait avant.",
          fix: "Écrivez x = 1 puis print(x).",
          line: n,
          snippet: trimmed
        });
      }

      // read_csv sans chemin
      if (/read_csv\s*\(\s*\)/.test(trimmed)) {
        push({
          title: "read_csv sans fichier",
          problem: `Ligne ${n} : pd.read_csv() est vide.`,
          why: "Il faut indiquer le chemin du CSV.",
          fix: 'Exemple : pd.read_csv("data/ventes.csv")',
          line: n,
          snippet: trimmed
        });
      }

      // Chemin Windows brut sans r"" ou /
      if (/read_csv\s*\(\s*"[A-Za-z]:\\/.test(trimmed) || /read_excel\s*\(\s*"[A-Za-z]:\\/.test(trimmed)) {
        push({
          title: "Chemin Windows risqué",
          problem: `Ligne ${n} : backslashes \\ dans une chaîne normale.`,
          why: "\\ peut être interprété comme caractère d’échappement.",
          fix: 'Utilisez des / , ou une raw string : r"C:\\dossier\\fichier.csv"',
          line: n,
          snippet: trimmed
        });
      }

      // groupby sans agrégation sur la même idée (simple heuristique)
      if (/\.groupby\s*\([^)]+\)\s*$/.test(trimmed)) {
        push({
          title: "groupby sans agrégation",
          problem: `Ligne ${n} : groupby(...) n’est pas suivi de sum/mean/agg…`,
          why: "groupby prépare des groupes ; il faut ensuite agréger.",
          fix: 'Exemple : df.groupby("ville")["montant_cdf"].sum()',
          line: n,
          snippet: trimmed
        });
      }

      // df['col'] typo quotes
      if (/\[\s*[A-Za-z_]\w*\s*\]/.test(trimmed) && !/\[\s*["']/.test(trimmed) && !/\[\s*\d/.test(trimmed) && !/\[\s*[A-Za-z_]\w*\s*:\s*/.test(trimmed)) {
        // pourrait être index variable légitime — signaler doucement seulement si ressemble à colonne
        if (/\b(df|data|ventes|clients)\s*\[\s*[A-Za-z_]/.test(trimmed)) {
          push({
            title: "Nom de colonne sans guillemets ?",
            problem: `Ligne ${n} : df[colonne] sans guillemets.`,
            why: "Souvent on veut df[\"colonne\"] (texte), pas une variable.",
            fix: 'Écrivez df["ville"] si ville est un nom de colonne.',
            line: n,
            snippet: trimmed
          });
        }
      }

      // except nu
      if (/^except\s*:/.test(trimmed)) {
        push({
          title: "except nu",
          problem: `Ligne ${n} : except: capture tout, même KeyboardInterrupt.`,
          why: "On risque de masquer des erreurs graves.",
          fix: "Préférez except Exception as e:",
          line: n,
          snippet: trimmed
        });
      }

      // shadowing builtins
      if (/^(list|dict|str|int|float|sum|min|max|type|id|input)\s*=/.test(trimmed)) {
        push({
          title: "Masquage d’un nom intégré",
          problem: `Ligne ${n} : vous réassignez un nom built-in (${trimmed.split("=")[0].trim()}).`,
          why: "Ensuite list() ou sum() peuvent casser.",
          fix: "Choisissez un autre nom : liste_notes, total, …",
          line: n,
          snippet: trimmed
        });
      }

      // == True / == False
      if (/==\s*True|==\s*False/.test(trimmed)) {
        push({
          title: "Comparaison inutile à True/False",
          problem: `Ligne ${n} : == True ou == False.`,
          why: "Un booléen se teste directement : if actif:",
          fix: "Écrivez if actif: ou if not actif:",
          line: n,
          snippet: trimmed
        });
      }

      // tabs mixtes (détection grossière)
      if (line.includes("\t") && /^ +/.test(line.replace(/\t/g, ""))) {
        push({
          title: "Tabulations et espaces mélangés",
          problem: `Ligne ${n} : indentation mixte Tab/espaces possible.`,
          why: "Python peut lever TabError.",
          fix: "N’utilisez que des espaces (4 par niveau).",
          line: n,
          snippet: trimmed
        });
      }

      // f-string sans f
      if (/["'].*\{[A-Za-z_][\w]*\}.*["']/.test(trimmed) && !/\bf["']/.test(trimmed) && !/\.format\s*\(/.test(trimmed)) {
        push({
          title: "Accolades dans une chaîne sans f",
          problem: `Ligne ${n} : {variable} dans des guillemets sans préfixe f.`,
          why: "Sans f, les accolades restent du texte brut.",
          fix: 'Utilisez une f-string : f"Bonjour {prenom}"',
          line: n,
          snippet: trimmed
        });
      }

      // pandas utilisé sans import
      if (/\bpd\./.test(trimmed) && !/import\s+pandas/.test(all) && !defined.has("pd")) {
        push({
          title: "pandas (pd) non importé",
          problem: `Ligne ${n} : pd.… mais pandas n’est pas importé dans le script.`,
          why: "Il faut charger la bibliothèque avant.",
          fix: "Ajoutez en haut : import pandas as pd",
          line: n,
          snippet: trimmed
        });
      }

      // plt sans import
      if (/\bplt\./.test(trimmed) && !/matplotlib/.test(all) && !defined.has("plt")) {
        push({
          title: "matplotlib (plt) non importé",
          problem: `Ligne ${n} : plt.… sans import visible.`,
          why: "Le module graphique n’est pas chargé.",
          fix: "Ajoutez : import matplotlib.pyplot as plt",
          line: n,
          snippet: trimmed
        });
      }

      // return hors fonction (heuristique indent 0)
      if (/^return\b/.test(trimmed) && !/^\s/.test(line)) {
        push({
          title: "return au niveau principal",
          problem: `Ligne ${n} : return n’est pas dans une fonction.`,
          why: "return ne s’emploie que dans un def.",
          fix: "Placez return dans une fonction, ou utilisez print(...).",
          line: n,
          snippet: trimmed
        });
      }

      // yield au top level
      if (/^yield\b/.test(trimmed) && !/^\s/.test(line)) {
        push({
          title: "yield hors fonction",
          problem: `Ligne ${n} : yield doit être dans une fonction génératrice.`,
          why: "Sinon SyntaxError.",
          fix: "Enveloppez dans def ...():",
          line: n,
          snippet: trimmed
        });
      }

      // multiple statements with comma misuse x = 1, y = 2 without paren tuples confusion - skip

      // class without :
      if (/^class\s+\w+(\([^)]*\))?\s*$/.test(trimmed)) {
        push({
          title: "Classe sans « : »",
          problem: `Ligne ${n} : définition de classe incomplète.`,
          why: "class Nom: ouvre un bloc.",
          fix: "Ajoutez « : » à la fin.",
          line: n,
          snippet: trimmed
        });
      }

      // from import *
      if (/^from\s+\S+\s+import\s+\*/.test(trimmed)) {
        push({
          title: "import * déconseillé",
          problem: `Ligne ${n} : from … import *.`,
          why: "Cela pollue l’espace de noms et rend le code opaque.",
          fix: "Importez les noms explicitement : from math import sqrt",
          line: n,
          snippet: trimmed
        });
      }

      // % formatting vs fstring - only tip if old style heavy - skip

      // chained assignment confusion a = b = [] 
      if (/=\s*\[\s*\]\s*$/.test(trimmed) && /=\s*\w+\s*=/.test(trimmed)) {
        push({
          title: "Liste partagée par affectation chaînée",
          problem: `Ligne ${n} : a = b = [] crée une seule liste partagée.`,
          why: "Modifier a modifie aussi b.",
          fix: "Écrivez a = [] puis b = [] séparément.",
          line: n,
          snippet: trimmed
        });
      }
    });

    // Variables utilisées avant définition (heuristique simple, ligne par ligne)
    const seenDefs = new Set(builtins);
    lines.forEach((line, idx) => {
      const n = idx + 1;
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("import") || trimmed.startsWith("from")) {
        let m;
        if ((m = trimmed.match(/^import\s+(\w+)/))) seenDefs.add(m[1]);
        if ((m = trimmed.match(/as\s+(\w+)\s*$/))) seenDefs.add(m[1]);
        return;
      }
      // enregistrer defs de la ligne d'abord pour for x in ...
      let dm;
      if ((dm = trimmed.match(/^([A-Za-z_]\w*)\s*=/))) seenDefs.add(dm[1]);
      if ((dm = trimmed.match(/^def\s+([A-Za-z_]\w*)\s*\(/))) seenDefs.add(dm[1]);
      if ((dm = trimmed.match(/^for\s+([A-Za-z_]\w*)\s+in/))) seenDefs.add(dm[1]);

      const tokens = trimmed.match(/\b[A-Za-z_]\w*\b/g) || [];
      const skip = new Set([
        "if", "elif", "else", "for", "while", "def", "return", "in", "not", "and", "or",
        "import", "from", "as", "with", "try", "except", "finally", "class", "lambda",
        "True", "False", "None", "print", "is", "pass", "break", "continue"
      ]);
      // ne signaler que print-like typos already handled; NameError heuristique limitée
      tokens.forEach((tok, i) => {
        if (skip.has(tok) || seenDefs.has(tok) || builtins.has(tok)) return;
        if (i > 0 && tokens[i - 1] === "for") return;
        if (i > 0 && tokens[i - 1] === "def") return;
        if (i > 0 && tokens[i - 1] === ".") return;
        // ignorer après def/class/import
        if (/^(def|class|import|from)\b/.test(trimmed)) return;
        // n'alerter que si le token est clairement utilisé comme valeur (après = ou dans appel)
        if (new RegExp("\\b" + tok + "\\s*=").test(trimmed) && trimmed.indexOf(tok) === trimmed.search(/\b[A-Za-z_]/)) {
          return; // LHS
        }
      });
    });

    // Doublons de def
    const defCounts = {};
    lines.forEach((line, idx) => {
      const m = line.match(/^\s*def\s+([A-Za-z_]\w*)\s*\(/);
      if (!m) return;
      defCounts[m[1]] = defCounts[m[1]] || [];
      defCounts[m[1]].push(idx + 1);
    });
    Object.keys(defCounts).forEach((name) => {
      if (defCounts[name].length > 1) {
        push({
          title: "Fonction définie plusieurs fois",
          problem: `La fonction « ${name} » est définie aux lignes ${defCounts[name].join(", ")}.`,
          why: "La dernière définition écrase les précédentes.",
          fix: "Renommez ou ne gardez qu’une seule définition.",
          line: defCounts[name][defCounts[name].length - 1],
          snippet: `def ${name}(...):`
        });
      }
    });

    return tips;
  }

  function issueFingerprint(issue) {
    const line = issue.line != null ? issue.line : "?";
    const snip = (issue.snippet || "").replace(/\s+/g, " ").trim().slice(0, 60);
    return `${line}|${issue.title}|${snip}`;
  }

  function explainRuntimeOnly(raw, code) {
    const msg = String(raw || "");
    if (!msg.trim()) return null;
    const tb = parseTraceback(msg, code);
    const lineHint = tb.line ? ` (ligne ${tb.line})` : "";
    const precise = diagnoseFromCode(tb, code);

    if (precise) {
      return {
        ...precise,
        technical: shortenTechnical(msg),
        snippet: tb.snippet || precise.snippet || "",
        line: tb.line,
        source: "runtime"
      };
    }

    const rules = [
      {
        test: /IndentationError|TabError|unexpected indent|unindent/i,
        title: "Problème d’indentation",
        problem: `Les espaces en début de ligne ne sont pas corrects${lineHint}${tb.snippet ? ":\n" + tb.snippet : "."}`,
        why: "En Python, le décalage (indentation) dit ce qui appartient à un if, une boucle ou une fonction.",
        fix: "Utilisez 4 espaces. Alignez les lignes du même bloc. Évitez de mélanger Tab et espaces."
      },
      {
        test: /NameError/i,
        title: "Nom inconnu",
        problem: extractNameError(msg, lineHint),
        why: "Python cherche une variable ou une fonction qui n’existe pas (encore), ou dont le nom est mal orthographié.",
        fix: "Vérifiez l’orthographe (print et non Print). Créez la variable avant de l’utiliser : x = 5."
      },
      {
        test: /TypeError/i,
        title: "Types incompatibles",
        problem: buildTypeError(msg, lineHint, tb.snippet),
        why: "Certaines opérations n’ont de sens qu’entre types compatibles.",
        fix: "Convertissez si besoin : int(\"3\") ou str(1). Vérifiez avec type(x)."
      },
      {
        test: /ZeroDivisionError/i,
        title: "Division par zéro",
        problem: `Une division essaie de diviser par 0${lineHint}.`,
        why: "En mathématiques comme en Python, on ne divise pas par zéro.",
        fix: "Vérifiez le dénominateur avant de diviser (if n != 0:)."
      },
      {
        test: /KeyError/i,
        title: "Clé absente du dictionnaire",
        problem: extractQuoted(msg, "clé") + lineHint,
        why: "Un dictionnaire répond seulement aux clés présentes.",
        fix: "Affichez dico.keys() ou utilisez dico.get(\"cle\")."
      },
      {
        test: /IndexError/i,
        title: "Indice hors liste",
        problem: `Vous visez une case de liste qui n’existe pas${lineHint}.`,
        why: "Les indices commencent à 0. Une liste de 3 éléments a les indices 0, 1, 2.",
        fix: "Utilisez len(liste) et des indices valides."
      },
      {
        test: /AttributeError/i,
        title: "Méthode ou attribut introuvable",
        problem: buildAttributeError(msg, lineHint, tb.snippet),
        why: "Chaque type a ses outils : une liste a .append, un nombre n’a pas .append.",
        fix: "Vérifiez type(x), puis la bonne méthode. Attention aussi à un point oublié ou en trop."
      },
      {
        test: /ModuleNotFoundError|No module named/i,
        title: "Bibliothèque introuvable",
        problem: `Python ne trouve pas le module demandé${lineHint}.`,
        why: "La bibliothèque n’est pas installée ici, ou le nom est mal écrit.",
        fix: "Vérifiez l’orthographe (pandas). En local : pip install pandas."
      },
      {
        test: /FileNotFoundError/i,
        title: "Fichier introuvable",
        problem: `Le chemin du fichier est incorrect${lineHint}.`,
        why: "Python cherche exactement le nom/chemin indiqué.",
        fix: "Vérifiez data/ventes.csv et travaillez depuis le dossier du projet."
      },
      {
        test: /ValueError/i,
        title: "Valeur incorrecte",
        problem: `La valeur fournie n’est pas acceptable${lineHint}.`,
        why: "Exemple : int(\"bonjour\") ne peut pas devenir un nombre.",
        fix: "Contrôlez le contenu avant la conversion."
      },
      {
        test: /SyntaxError|invalid syntax|EOL while scanning|unterminated/i,
        title: "Erreur d’écriture (syntaxe)",
        problem: tb.snippet
          ? `À la ligne ${tb.line || "?"}, Python refuse cette écriture :\n${tb.snippet}`
          : `Python ne comprend pas la forme de votre phrase${lineHint}.`,
        why: tb.shortMsg
          ? `Message Python : ${tb.shortMsg}`
          : "Il y a une faute de forme (symbole mal placé, phrase inachevée…).",
        fix: "Regardez exactement le caractère sous le signe ^ dans le détail technique, puis corrigez ce symbole."
      }
    ];

    for (const rule of rules) {
      if (rule.test.test(msg)) {
        return {
          title: rule.title,
          problem: rule.problem,
          why: rule.why,
          fix: rule.fix,
          technical: shortenTechnical(msg),
          snippet: tb.snippet || "",
          line: tb.line,
          source: "runtime"
        };
      }
    }

    return {
      title: "Python a rencontré un problème",
      problem: `Quelque chose empêche l’exécution${lineHint}.`,
      why: "Ce n’est pas grave : une erreur est une information, pas un échec personnel.",
      fix: "Relisez la ligne indiquée, caractère par caractère.",
      technical: shortenTechnical(msg),
      snippet: tb.snippet || "",
      line: tb.line,
      source: "runtime"
    };
  }

  function normalizeIssue(issue, index, total) {
    const lineLabel = issue.line != null ? `ligne ${issue.line}` : "emplacement à préciser";
    const technical =
      issue.technical && String(issue.technical).trim()
        ? String(issue.technical).trim()
        : `Erreur ${index + 1}/${total} · ${lineLabel} · détectée par l’analyse du professeur.\nTitre : ${issue.title}`;

    return {
      title: issue.title || "Point à corriger",
      problem: issue.problem || "Une anomalie a été détectée dans votre code.",
      why: issue.why || "Cette écriture empêche Python de comprendre votre intention.",
      fix: issue.fix || "Corrigez cette ligne, puis réexécutez.",
      snippet: issue.snippet || "",
      line: issue.line != null ? issue.line : null,
      technical,
      source: issue.source || "static"
    };
  }

  /** Regroupe TOUTES les erreurs détectables — aucun plafond artificiel (1/N = total réel). */
  function collectIssues(code, runtimeRaw) {
    const issues = [];
    const seen = new Set();

    staticReview(code || "").forEach((tip) => {
      const issue = {
        title: tip.title,
        problem: tip.problem,
        why: tip.why,
        fix: tip.fix,
        technical: tip.technical || "",
        snippet: tip.snippet || "",
        line: tip.line != null ? tip.line : null,
        source: "static"
      };
      const key = issueFingerprint(issue);
      if (!seen.has(key)) {
        seen.add(key);
        issues.push(issue);
      }
    });

    const runtime = explainRuntimeOnly(runtimeRaw, code);
    if (runtime) {
      // Fusion uniquement si même ligne ET même titre — sinon on garde les deux
      const exact = issues.find(
        (i) => i.line != null && runtime.line != null && i.line === runtime.line && i.title === runtime.title
      );
      if (exact) {
        exact.technical = runtime.technical || exact.technical;
        if (runtime.snippet) exact.snippet = runtime.snippet;
        if (runtime.problem) exact.problem = runtime.problem;
        if (runtime.why) exact.why = runtime.why;
        if (runtime.fix) exact.fix = runtime.fix;
      } else {
        // Enrichir une faute locale très proche (même ligne + même famille étroite)
        const close = issues.find(
          (i) =>
            i.line != null &&
            runtime.line != null &&
            i.line === runtime.line &&
            i.title.includes("Point") &&
            runtime.title.includes("Point")
        );
        if (close) {
          close.technical = runtime.technical || close.technical;
          close.problem = runtime.problem || close.problem;
          close.why = runtime.why || close.why;
          close.fix = runtime.fix || close.fix;
          if (runtime.snippet) close.snippet = runtime.snippet;
        } else {
          const key = issueFingerprint(runtime);
          if (!seen.has(key)) {
            seen.add(key);
            issues.push(runtime);
          }
        }
      }
    }

    issues.sort((a, b) => {
      const la = a.line == null ? 9999 : a.line;
      const lb = b.line == null ? 9999 : b.line;
      if (la !== lb) return la - lb;
      return String(a.title).localeCompare(String(b.title), "fr");
    });

    // Normaliser avec le total réel (pas de limite à 3)
    return issues.map((issue, index) => normalizeIssue(issue, index, issues.length));
  }

  function explainError(raw, code) {
    const issues = collectIssues(code, raw);
    if (!issues.length) {
      return {
        title: "Python a rencontré un problème",
        problem: "Une erreur est survenue.",
        why: "Le détail exact n’a pas pu être classé.",
        fix: "Relisez votre dernière modification.",
        technical: shortenTechnical(raw),
        snippet: "",
        line: null
      };
    }
    return issues[0];
  }

  function extractNameError(msg, lineHint) {
    const m = msg.match(/name '([^']+)' is not defined/i);
    if (m) {
      const name = m[1];
      if (name.toLowerCase() === "print" && name !== "print") {
        return `Python ne connaît pas « ${name} »${lineHint}. Vouliez-vous écrire print ?`;
      }
      return `Le nom « ${name} » n’existe pas encore${lineHint}.`;
    }
    return `Un nom utilisé n’est pas défini${lineHint}.`;
  }

  function extractQuoted(msg, label) {
    const m = msg.match(/'([^']+)'/);
    return m ? `La ${label} « ${m[1]} » est introuvable.` : `Une ${label} demandée est introuvable.`;
  }

  function buildTypeError(msg, lineHint, snippet) {
    if (/can only concatenate str/i.test(msg)) {
      return `Vous essayez d’ajouter un texte et un nombre${lineHint}${snippet ? ":\n" + snippet : "."}`;
    }
    if (/unsupported operand/i.test(msg)) {
      return `Opération impossible entre ces types${lineHint}${snippet ? ":\n" + snippet : "."}`;
    }
    return `Types incompatibles pour cette opération${lineHint}.`;
  }

  function buildAttributeError(msg, lineHint, snippet) {
    const m = msg.match(/'([^']+)' object has no attribute '([^']+)'/i);
    if (m) {
      return `Un objet de type « ${m[1]} » n’a pas d’attribut « ${m[2]} »${lineHint}${snippet ? ":\n" + snippet : "."}`;
    }
    return `Méthode ou attribut introuvable${lineHint}.`;
  }

  function shortenTechnical(msg) {
    const text = String(msg);
    // Garder le bloc utile du traceback apprenant
    const execIdx = text.lastIndexOf('File "<exec>"');
    if (execIdx >= 0) return text.slice(execIdx).trim();
    const lines = text.split(/\r?\n/).filter((l) => l.trim());
    return lines.slice(-6).join("\n");
  }

  function renderTeacherCard(explanation, meta) {
    if (!explanation) return "";
    const total = meta && meta.total ? meta.total : 1;
    const index = meta && typeof meta.index === "number" ? meta.index : 0;
    const showNav = total > 1;
    const issue = normalizeIssue(explanation, index, total);

    const nav = showNav
      ? `
      <div class="teacher-nav" aria-label="Navigation entre les erreurs">
        <button type="button" class="teacher-nav-btn" data-err-prev title="Erreur précédente" aria-label="Erreur précédente">‹</button>
        <span class="teacher-nav-count">${index + 1}/${total}</span>
        <button type="button" class="teacher-nav-btn" data-err-next title="Erreur suivante" aria-label="Erreur suivante">›</button>
      </div>`
      : `<div class="teacher-nav teacher-nav-single"><span class="teacher-nav-count">1/1</span></div>`;

    const lineBadge =
      issue.line != null
        ? `<span class="teacher-line-badge">Ligne ${issue.line}</span>`
        : "";

    const snippetBlock = issue.snippet
      ? `<div class="teacher-snippet"><span>Votre ligne</span><pre>${escapeHtml(issue.snippet)}</pre></div>`
      : "";

    return `
      <div class="teacher-card" role="alert" data-issue-index="${index}" data-issue-total="${total}">
        <div class="teacher-card-top">
          <p class="teacher-kicker">Le professeur explique · ${total} erreur${total > 1 ? "s" : ""} détectée${total > 1 ? "s" : ""}</p>
          ${nav}
        </div>
        <div class="teacher-title-row">
          <h3>${escapeHtml(issue.title)}</h3>
          ${lineBadge}
        </div>
        ${snippetBlock}
        <div class="teacher-grid">
          <div>
            <h4>Le problème</h4>
            <p class="teacher-pre">${escapeHtml(issue.problem)}</p>
          </div>
          <div>
            <h4>Pourquoi</h4>
            <p>${escapeHtml(issue.why)}</p>
          </div>
          <div>
            <h4>Comment corriger</h4>
            <p>${escapeHtml(issue.fix)}</p>
          </div>
        </div>
        <details class="teacher-details">
          <summary>Voir le détail technique (optionnel)</summary>
          <pre>${escapeHtml(issue.technical)}</pre>
        </details>
      </div>
    `;
  }

  return {
    attachAutocomplete,
    explainError,
    explainRuntimeOnly,
    collectIssues,
    staticReview,
    renderTeacherCard,
    buildCompletions
  };
})();
