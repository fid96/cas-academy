# SQL Atelier

Parcours pédagogique **de zéro à Data Analyst SQL** — même finalité que Python Atelier.

## Objectif

Former un débutant à :

- lire un schéma
- écrire des `SELECT` / `WHERE` / `ORDER BY`
- calculer des KPI (`GROUP BY`, `SUM`, `COUNT`…)
- joindre des tables (`JOIN`)
- conclure avec des recommandations métier

## Lancer

1. Ouvrir `index.html` dans le navigateur  
   ou : `python -m http.server 8766` dans ce dossier
2. Suivre **Parcours**
3. Pratiquer dans **Atelier SQL** (SQLite intégré)
4. Passer le **Quiz bilan**

> Connexion Internet nécessaire au premier chargement du moteur SQLite (`sql.js`).

## Base intégrée

Tables :

- `ventes` — ventes de produits de santé
- `clients` — organisations clientes

Données alignées avec le projet `python-atelier` (mêmes CSV dans `data/`).

## Structure

```
sql-atelier/
├── index.html
├── README.md
├── assets/
├── data/
├── css/styles.css
└── js/
    ├── content.js
    ├── sql-engine.js
    └── app.js
```

## Lien avec Python Atelier

- **SQL** : extraire et agréger
- **Python** : analyser, visualiser, automatiser

Les deux ateliers se complètent pour un profil Data Analyst complet.
