/* Excel Atelier — mini-moteur de formules (sous-ensemble pédagogique) */

window.ExcelEngine = (function () {
  // Feuille de pratique : colonnes A–F, lignes 1–12
  // A = libellés / produits, B = quantités, C = prix unitaires, D = montants (à calculer), E/F exercices
  const DEFAULT_GRID = {
    A1: "Produit",
    B1: "Quantite",
    C1: "Prix",
    D1: "Montant",
    A2: "Moustiquaire",
    B2: 12,
    C2: 15000,
    A3: "ACT",
    B3: 25,
    C3: 11000,
    A4: "Test rapide",
    B4: 40,
    C4: 8000,
    A5: "Gants",
    B5: 100,
    C5: 900,
    A6: "ACT",
    B6: 18,
    C6: 11000,
    A7: "Moustiquaire",
    B7: 8,
    C7: 15000,
    A8: "",
    B8: "",
    C8: "",
    A10: "Total quantite",
    A11: "Moyenne prix",
    A12: "Seuil OK?"
  };

  let cells = { ...DEFAULT_GRID };

  function reset() {
    cells = { ...DEFAULT_GRID };
  }

  function colToIndex(col) {
    let n = 0;
    for (let i = 0; i < col.length; i++) n = n * 26 + (col.charCodeAt(i) - 64);
    return n;
  }

  function indexToCol(n) {
    let s = "";
    while (n > 0) {
      const r = (n - 1) % 26;
      s = String.fromCharCode(65 + r) + s;
      n = Math.floor((n - 1) / 26);
    }
    return s;
  }

  function parseRef(ref) {
    const m = String(ref).toUpperCase().match(/^([A-Z]+)(\d+)$/);
    if (!m) return null;
    return { col: m[1], row: Number(m[2]), key: m[1] + m[2] };
  }

  function getRaw(ref) {
    const p = parseRef(ref);
    if (!p) return null;
    return cells[p.key];
  }

  function setCell(ref, value) {
    const p = parseRef(ref);
    if (!p) return false;
    cells[p.key] = value;
    return true;
  }

  function asNumber(v) {
    if (v === "" || v === null || v === undefined) return null;
    if (typeof v === "number" && !Number.isNaN(v)) return v;
    const n = Number(String(v).replace(",", ".").replace(/\s/g, ""));
    return Number.isFinite(n) ? n : null;
  }

  function expandRange(range) {
    const m = String(range).toUpperCase().match(/^([A-Z]+)(\d+):([A-Z]+)(\d+)$/);
    if (!m) return null;
    const c1 = colToIndex(m[1]);
    const r1 = Number(m[2]);
    const c2 = colToIndex(m[3]);
    const r2 = Number(m[4]);
    const keys = [];
    for (let r = Math.min(r1, r2); r <= Math.max(r1, r2); r++) {
      for (let c = Math.min(c1, c2); c <= Math.max(c1, c2); c++) {
        keys.push(indexToCol(c) + r);
      }
    }
    return keys;
  }

  function normalizeFormula(formula) {
    return String(formula || "")
      .trim()
      .replace(/^\uFEFF/, "")
      .replace(/\s+/g, "")
      .replace(/;/g, ",")
      .toUpperCase();
  }

  function explainError(message) {
    const msg = String(message || "");
    const rules = [
      {
        test: /commence/i,
        title: "Formule incomplete",
        problem: "En Excel, une formule commence presque toujours par =.",
        why: "Sans =, Excel traite le texte comme une étiquette, pas un calcul.",
        fix: "Écrivez par exemple =B2*C2 ou =SOMME(B2:B7)."
      },
      {
        test: /référence|reference|cellule/i,
        title: "Référence incorrecte",
        problem: "Une adresse de cellule n’est pas reconnue.",
        why: "Les cellules s’écrivent Lettre+Numéro : B2, C7, A10…",
        fix: "Vérifiez l’orthographe de la référence."
      },
      {
        test: /plage|range/i,
        title: "Plage incorrecte",
        problem: "La plage n’est pas au format attendu.",
        why: "Une plage s’écrit Début:Fin, par exemple B2:B7.",
        fix: "Exemple : =SOMME(B2:B7)."
      },
      {
        test: /fonction|unknown/i,
        title: "Fonction non reconnue",
        problem: "Cette fonction n’est pas disponible dans l’atelier (ou mal orthographiée).",
        why: "Ici : SOMME/SUM, MOYENNE/AVERAGE, NB/COUNT, NBVAL/COUNTA, MIN, MAX, SI/IF, ARRONDI/ROUND.",
        fix: "Utilisez une fonction de la liste pédagogique."
      },
      {
        test: /syntaxe|unexpected|parenth/i,
        title: "Erreur de syntaxe",
        problem: "La formule est mal formée.",
        why: "Parenthèse manquante, opérateur en trop, ou argument mal placé.",
        fix: "Comparez avec l’exemple de la leçon."
      }
    ];
    for (const r of rules) {
      if (r.test.test(msg)) return { ...r, technical: msg };
    }
    return {
      title: "Erreur de formule",
      problem: "La formule n’a pas pu être calculée.",
      why: "Une erreur est un guide : on corrige, on réessaie.",
      fix: "Relisez la formule caractère par caractère.",
      technical: msg
    };
  }

  function tokenize(src) {
    const s = src.replace(/\s+/g, "");
    const tokens = [];
    let i = 0;
    while (i < s.length) {
      const ch = s[i];
      if (/[0-9.]/.test(ch)) {
        let j = i + 1;
        while (j < s.length && /[0-9.]/.test(s[j])) j++;
        tokens.push({ type: "num", value: Number(s.slice(i, j)) });
        i = j;
        continue;
      }
      if (/[A-Z]/.test(ch)) {
        let j = i + 1;
        while (j < s.length && /[A-Z0-9]/.test(s[j])) j++;
        const word = s.slice(i, j);
        if (/^[A-Z]+\d+$/.test(word)) tokens.push({ type: "ref", value: word });
        else if (/^[A-Z]+\d+:[A-Z]+\d+$/.test(word)) tokens.push({ type: "range", value: word });
        else tokens.push({ type: "ident", value: word });
        i = j;
        continue;
      }
      if (ch === '"' ) {
        let j = i + 1;
        let str = "";
        while (j < s.length && s[j] !== '"') {
          str += s[j];
          j++;
        }
        if (s[j] !== '"') throw new Error("syntaxe: guillemet non fermé");
        tokens.push({ type: "str", value: str });
        i = j + 1;
        continue;
      }
      if ("+-*/(),:<>=".includes(ch)) {
        // handle <> <= >=
        if ((ch === "<" || ch === ">") && s[i + 1] === "=") {
          tokens.push({ type: "op", value: ch + "=" });
          i += 2;
          continue;
        }
        if (ch === "<" && s[i + 1] === ">") {
          tokens.push({ type: "op", value: "<>" });
          i += 2;
          continue;
        }
        tokens.push({ type: "op", value: ch });
        i++;
        continue;
      }
      throw new Error("syntaxe inattendue près de " + ch);
    }
    return tokens;
  }

  function evaluateFormula(formula, depth = 0) {
    if (depth > 20) throw new Error("références circulaires possibles");
    let src = String(formula || "").trim();
    if (!src) throw new Error("formule vide");
    if (!src.startsWith("=")) throw new Error("commence par =");
    src = src.slice(1).replace(/;/g, ",");
    // French function aliases → English internal
    src = src
      .replace(/\bSOMME\b/gi, "SUM")
      .replace(/\bMOYENNE\b/gi, "AVERAGE")
      .replace(/\bNBVAL\b/gi, "COUNTA")
      .replace(/\bNB\b/gi, "COUNT")
      .replace(/\bSI\b/gi, "IF")
      .replace(/\bARRONDI\b/gi, "ROUND")
      .replace(/\bMAX\b/gi, "MAX")
      .replace(/\bMIN\b/gi, "MIN");

    const tokens = tokenize(src.toUpperCase().replace(/"([^"]*)"/g, (_, t) => `"${t}"`));
    // Retokenize carefully with strings preserved - simpler path: use original case-insensitive replace then tokenize on upper without breaking strings
    const tokens2 = tokenize(
      src
        .replace(/"([^"]*)"/g, (m) => m)
        .split('"')
        .map((part, idx) => (idx % 2 === 0 ? part.toUpperCase() : part))
        .map((part, idx) => (idx % 2 === 0 ? part : `"${part}"`))
        .join("")
    );

    let pos = 0;
    function peek() {
      return tokens2[pos];
    }
    function eat(type, value) {
      const t = tokens2[pos];
      if (!t || t.type !== type || (value !== undefined && t.value !== value)) {
        throw new Error("syntaxe");
      }
      pos++;
      return t;
    }

    function parseArgs() {
      const args = [];
      if (peek() && peek().type === "op" && peek().value === ")") return args;
      args.push(parseComparison());
      while (peek() && peek().type === "op" && peek().value === ",") {
        eat("op", ",");
        args.push(parseComparison());
      }
      return args;
    }

    function valuesFromArg(arg) {
      if (arg && arg.__range) {
        return arg.keys.map((k) => {
          const raw = cells[k];
          if (typeof raw === "string" && raw.startsWith("=")) {
            return evaluateFormula(raw, depth + 1);
          }
          return raw;
        });
      }
      return [arg];
    }

    function callFn(name, args) {
      const flatNums = [];
      for (const a of args) {
        for (const v of valuesFromArg(a)) {
          const n = asNumber(v);
          if (n !== null) flatNums.push(n);
        }
      }
      switch (name) {
        case "SUM":
          return flatNums.reduce((a, b) => a + b, 0);
        case "AVERAGE":
          if (!flatNums.length) return 0;
          return flatNums.reduce((a, b) => a + b, 0) / flatNums.length;
        case "COUNT":
          return flatNums.length;
        case "COUNTA": {
          let c = 0;
          for (const a of args) {
            for (const v of valuesFromArg(a)) {
              if (v !== "" && v !== null && v !== undefined) c++;
            }
          }
          return c;
        }
        case "MIN":
          if (!flatNums.length) throw new Error("fonction MIN sans nombres");
          return Math.min(...flatNums);
        case "MAX":
          if (!flatNums.length) throw new Error("fonction MAX sans nombres");
          return Math.max(...flatNums);
        case "ROUND": {
          const n = asNumber(args[0]);
          const d = asNumber(args[1] ?? 0) ?? 0;
          if (n === null) throw new Error("fonction ROUND");
          const f = 10 ** d;
          return Math.round(n * f) / f;
        }
        case "IF": {
          const cond = args[0];
          const truthy = cond === true || (typeof cond === "number" && cond !== 0);
          return truthy ? args[1] : args[2] !== undefined ? args[2] : false;
        }
        default:
          throw new Error("fonction inconnue: " + name);
      }
    }

    function parsePrimary() {
      const t = peek();
      if (!t) throw new Error("syntaxe");
      if (t.type === "num") {
        pos++;
        return t.value;
      }
      if (t.type === "str") {
        pos++;
        return t.value;
      }
      if (t.type === "ref") {
        pos++;
        const raw = cells[t.value];
        if (typeof raw === "string" && raw.startsWith("=")) {
          return evaluateFormula(raw, depth + 1);
        }
        const n = asNumber(raw);
        return n !== null ? n : raw === undefined ? 0 : raw;
      }
      if (t.type === "ident") {
        const name = t.value;
        pos++;
        eat("op", "(");
        // Special: range tokens may appear as REF OP : REF inside args — handled in parseComparison? 
        // Actually tokenize merges RANGE if written without spaces. With SUM(B2:B7) tokens are IDENT ( NUM? )
        // B2:B7 becomes: after upper — need range token. Our tokenizer: [A-Z0-9]+ stops at :, then :, then next ident/ref.
        // Fix: parse range inside args
        const args = [];
        if (!(peek() && peek().type === "op" && peek().value === ")")) {
          args.push(parseArgValue());
          while (peek() && peek().type === "op" && peek().value === ",") {
            eat("op", ",");
            args.push(parseArgValue());
          }
        }
        eat("op", ")");
        return callFn(name, args);
      }
      if (t.type === "op" && t.value === "(") {
        eat("op", "(");
        const v = parseComparison();
        eat("op", ")");
        return v;
      }
      if (t.type === "op" && t.value === "-") {
        eat("op", "-");
        return -Number(parsePrimary());
      }
      throw new Error("syntaxe");
    }

    function parseArgValue() {
      // Allow B2:B7 as range
      const t = peek();
      if (t && t.type === "ref") {
        const start = t.value;
        pos++;
        if (peek() && peek().type === "op" && peek().value === ":") {
          eat("op", ":");
          const endT = peek();
          if (!endT || endT.type !== "ref") throw new Error("plage incorrecte");
          const end = endT.value;
          pos++;
          const keys = expandRange(start + ":" + end);
          if (!keys) throw new Error("plage incorrecte");
          return { __range: true, keys };
        }
        // single ref as value
        pos--;
      }
      if (t && t.type === "range") {
        pos++;
        const keys = expandRange(t.value);
        if (!keys) throw new Error("plage incorrecte");
        return { __range: true, keys };
      }
      return parseComparison();
    }

    function parseFactor() {
      let v = parsePrimary();
      while (peek() && peek().type === "op" && (peek().value === "*" || peek().value === "/")) {
        const op = eat("op").value;
        const r = parsePrimary();
        v = op === "*" ? Number(v) * Number(r) : Number(v) / Number(r);
      }
      return v;
    }

    function parseTerm() {
      let v = parseFactor();
      while (peek() && peek().type === "op" && (peek().value === "+" || peek().value === "-")) {
        const op = eat("op").value;
        const r = parseFactor();
        v = op === "+" ? Number(v) + Number(r) : Number(v) - Number(r);
      }
      return v;
    }

    function parseComparison() {
      let v = parseTerm();
      if (peek() && peek().type === "op" && [">", "<", ">=", "<=", "=", "<>"].includes(peek().value)) {
        const op = eat("op").value;
        const r = parseTerm();
        const a = asNumber(v) !== null && asNumber(r) !== null ? Number(v) : v;
        const b = asNumber(v) !== null && asNumber(r) !== null ? Number(r) : r;
        switch (op) {
          case ">":
            return a > b;
          case "<":
            return a < b;
          case ">=":
            return a >= b;
          case "<=":
            return a <= b;
          case "=":
            return a == b;
          case "<>":
            return a != b;
        }
      }
      return v;
    }

    const result = parseComparison();
    if (pos < tokens2.length) throw new Error("syntaxe");
    return result;
  }

  function evaluate(formula) {
    try {
      const value = evaluateFormula(formula);
      return { ok: true, value };
    } catch (err) {
      return { ok: false, error: explainError(err.message || String(err)) };
    }
  }

  function formulasMatch(user, expected) {
    return normalizeFormula(user) === normalizeFormula(expected);
  }

  function getGrid(rows = 12, cols = 6) {
    const colNames = [];
    for (let c = 1; c <= cols; c++) colNames.push(indexToCol(c));
    const data = [];
    for (let r = 1; r <= rows; r++) {
      const row = { row: r, cells: {} };
      for (const col of colNames) {
        const key = col + r;
        row.cells[col] = cells[key] !== undefined ? cells[key] : "";
      }
      data.push(row);
    }
    return { cols: colNames, rows: data };
  }

  function displayValue(raw) {
    if (typeof raw === "string" && raw.startsWith("=")) {
      const res = evaluate(raw);
      if (!res.ok) return "#ERR";
      if (typeof res.value === "boolean") return res.value ? "VRAI" : "FAUX";
      if (typeof res.value === "number") {
        return Number.isInteger(res.value) ? String(res.value) : String(Math.round(res.value * 100) / 100);
      }
      return String(res.value);
    }
    return raw === undefined || raw === null ? "" : String(raw);
  }

  return {
    reset,
    setCell,
    getRaw,
    getGrid,
    evaluate,
    displayValue,
    normalizeFormula,
    formulasMatch,
    explainError
  };
})();
