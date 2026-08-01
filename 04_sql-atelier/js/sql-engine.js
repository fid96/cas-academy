/* SQL Atelier — moteur SQLite (sql.js) + jeu de données métier */

window.SqlEngine = (function () {
  let SQL = null;
  let db = null;
  let readyPromise = null;

  const SEED_SQL = `
PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS ventes;
DROP TABLE IF EXISTS clients;

CREATE TABLE clients (
  client_id TEXT PRIMARY KEY,
  organisation TEXT NOT NULL,
  type_client TEXT NOT NULL,
  province TEXT NOT NULL
);

CREATE TABLE ventes (
  vente_id INTEGER PRIMARY KEY,
  date TEXT NOT NULL,
  ville TEXT NOT NULL,
  produit TEXT NOT NULL,
  categorie TEXT NOT NULL,
  quantite INTEGER,
  montant_cdf INTEGER NOT NULL,
  client_id TEXT NOT NULL,
  FOREIGN KEY (client_id) REFERENCES clients(client_id)
);

INSERT INTO clients (client_id, organisation, type_client, province) VALUES
('C001', 'CS Kisenso', 'Centre de sante', 'Kinshasa'),
('C002', 'Hopital Jason Sendwe', 'Hopital', 'Haut-Katanga'),
('C003', 'ZS Demba', 'Zone de sante', 'Kasai-Central'),
('C004', 'Hopital HEAL Africa', 'Hopital', 'Nord-Kivu'),
('C005', 'CS Binza', 'Centre de sante', 'Kinshasa'),
('C006', 'ZS Kabeya-Kamwanga', 'Zone de sante', 'Kasai-Oriental'),
('C007', 'Depot Provincial Kin', 'Depot', 'Kinshasa'),
('C008', 'CS Kampemba', 'Centre de sante', 'Haut-Katanga');

INSERT INTO ventes (vente_id, date, ville, produit, categorie, quantite, montant_cdf, client_id) VALUES
(1, '2024-01-05', 'Kinshasa', 'Moustiquaire', 'Prevention', 12, 180000, 'C001'),
(2, '2024-01-06', 'Lubumbashi', 'Test rapide palu', 'Diagnostic', 40, 320000, 'C002'),
(3, '2024-01-08', 'Kananga', 'ACT', 'Traitement', 25, 275000, 'C003'),
(4, '2024-01-09', 'Kinshasa', 'Gants', 'Consommable', 100, 90000, 'C001'),
(5, '2024-01-12', 'Goma', 'Moustiquaire', 'Prevention', 8, 120000, 'C004'),
(6, '2024-01-15', 'Lubumbashi', 'ACT', 'Traitement', 30, 330000, 'C002'),
(7, '2024-01-18', 'Kinshasa', 'Test rapide palu', 'Diagnostic', 55, 440000, 'C005'),
(8, '2024-01-20', 'Mbuji-Mayi', 'Gants', 'Consommable', 60, 54000, 'C006'),
(9, '2024-01-22', 'Kananga', 'Moustiquaire', 'Prevention', 15, 225000, 'C003'),
(10, '2024-01-25', 'Goma', 'ACT', 'Traitement', 18, 198000, 'C004'),
(11, '2024-02-01', 'Kinshasa', 'ACT', 'Traitement', 40, 440000, 'C005'),
(12, '2024-02-03', 'Lubumbashi', 'Gants', 'Consommable', 80, 72000, 'C002'),
(13, '2024-02-05', 'Kinshasa', 'Moustiquaire', 'Prevention', 20, 300000, 'C001'),
(14, '2024-02-08', 'Mbuji-Mayi', 'Test rapide palu', 'Diagnostic', 22, 176000, 'C006'),
(15, '2024-02-10', 'Goma', 'Test rapide palu', 'Diagnostic', 35, 280000, 'C004'),
(16, '2024-02-12', 'Kananga', 'Gants', 'Consommable', NULL, 45000, 'C003'),
(17, '2024-02-14', 'Kinshasa', 'ACT', 'Traitement', 28, 308000, 'C007'),
(18, '2024-02-16', 'Lubumbashi', 'Moustiquaire', 'Prevention', 10, 150000, 'C002'),
(19, '2024-02-18', 'Kinshasa', 'Test rapide palu', 'Diagnostic', 60, 480000, 'C005'),
(20, '2024-02-20', 'Goma', 'Moustiquaire', 'Prevention', 6, 90000, 'C004'),
(21, '2024-02-22', 'Mbuji-Mayi', 'ACT', 'Traitement', 16, 176000, 'C006'),
(22, '2024-02-25', 'Kananga', 'Test rapide palu', 'Diagnostic', 18, 144000, 'C003'),
(23, '2024-02-27', 'Kinshasa', 'Gants', 'Consommable', 120, 108000, 'C007'),
(24, '2024-03-01', 'Lubumbashi', 'ACT', 'Traitement', 35, 385000, 'C002'),
(25, '2024-03-03', 'Kinshasa', 'Moustiquaire', 'Prevention', 14, 210000, 'C001'),
(26, '2024-03-05', 'Goma', 'ACT', 'Traitement', 22, 242000, 'C004'),
(27, '2024-03-07', 'Mbuji-Mayi', 'Moustiquaire', 'Prevention', 9, 135000, 'C006'),
(28, '2024-03-09', 'Kananga', 'ACT', 'Traitement', 20, 220000, 'C003'),
(29, '2024-03-11', 'Kinshasa', 'Test rapide palu', 'Diagnostic', 48, 384000, 'C005'),
(30, '2024-03-13', 'Lubumbashi', 'Test rapide palu', 'Diagnostic', 26, 208000, 'C008');
`;

  function explainSqlError(message) {
    const msg = String(message || "");
    const rules = [
      {
        test: /no such column/i,
        title: "Colonne introuvable",
        problem: "Vous avez écrit un nom de colonne que SQLite ne connaît pas.",
        why: "Les noms doivent correspondre exactement au schéma (ville, montant_cdf, client_id…).",
        fix: "Vérifiez l’orthographe. Consultez l’onglet Schéma."
      },
      {
        test: /no such table/i,
        title: "Table introuvable",
        problem: "Le nom de table est incorrect.",
        why: "Ici, les tables s’appellent ventes et clients.",
        fix: "Écrivez FROM ventes ou FROM clients."
      },
      {
        test: /syntax error/i,
        title: "Erreur de syntaxe SQL",
        problem: "SQLite ne comprend pas la forme de votre requête.",
        why: "Mot-clé mal placé, virgule en trop, ou parenthèse manquante.",
        fix: "Relisez SELECT … FROM … WHERE … ; vérifiez les virgules entre colonnes."
      },
      {
        test: /ambiguous column/i,
        title: "Colonne ambiguë",
        problem: "Deux tables ont une colonne du même nom.",
        why: "Après un JOIN, précisez la table : ventes.client_id.",
        fix: "Préfixez la colonne : table.colonne"
      },
      {
        test: /misuse of aggregate/i,
        title: "Agrégat mal utilisé",
        problem: "Vous mélangez colonnes agrégées et non agrégées.",
        why: "Avec SUM/COUNT/AVG, les autres colonnes vont en général dans GROUP BY.",
        fix: "Ajoutez GROUP BY colonne ou retirez la colonne hors agrégat."
      }
    ];
    for (const r of rules) {
      if (r.test.test(msg)) return { ...r, technical: msg };
    }
    return {
      title: "Erreur SQL",
      problem: "La requête n’a pas pu s’exécuter.",
      why: "Ce n’est pas grave : une erreur SQL est un guide de correction.",
      fix: "Comparez avec le schéma et la leçon en cours.",
      technical: msg
    };
  }

  async function ensureReady() {
    if (db) return db;
    if (!readyPromise) {
      readyPromise = (async () => {
        if (!window.initSqlJs) {
          await new Promise((resolve, reject) => {
            const s = document.createElement("script");
            s.src = "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/sql-wasm.js";
            s.onload = resolve;
            s.onerror = () => reject(new Error("Impossible de charger sql.js (réseau)."));
            document.head.appendChild(s);
          });
        }
        SQL = await window.initSqlJs({
          locateFile: (file) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`
        });
        db = new SQL.Database();
        db.run(SEED_SQL);
        return db;
      })().catch((err) => {
        readyPromise = null;
        throw err;
      });
    }
    return readyPromise;
  }

  function reset() {
    if (!SQL) return;
    if (db) db.close();
    db = new SQL.Database();
    db.run(SEED_SQL);
  }

  function run(sql) {
    if (!db) throw new Error("Base non prête");
    const trimmed = String(sql || "").trim();
    if (!trimmed) {
      return { columns: [], rows: [], changes: 0, empty: true };
    }
    try {
      const result = db.exec(trimmed);
      if (!result.length) {
        return { columns: [], rows: [], changes: db.getRowsModified(), empty: false };
      }
      const columns = result[0].columns;
      const rows = result[0].values;
      return { columns, rows, changes: db.getRowsModified(), empty: false };
    } catch (err) {
      const explained = explainSqlError(err.message || String(err));
      const error = new Error(explained.problem);
      error.explained = explained;
      throw error;
    }
  }

  function tablesInfo() {
    if (!db) return [];
    const res = db.exec(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name"
    );
    if (!res.length) return [];
    return res[0].values.map((r) => r[0]);
  }

  function columnsInfo(table) {
    if (!db) return [];
    const res = db.exec(`PRAGMA table_info(${table})`);
    if (!res.length) return [];
    return res[0].values.map((r) => ({
      name: r[1],
      type: r[2],
      notnull: r[3],
      pk: r[5]
    }));
  }

  return { ensureReady, run, reset, tablesInfo, columnsInfo, explainSqlError };
})();
