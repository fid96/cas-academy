# Excel Atelier

Parcours pédagogique **de zéro à Data Analyst Excel** — même finalité que Python Atelier et SQL Atelier.

## Objectif

Former un débutant à :

- lire une feuille et des en-têtes
- écrire des formules (`=B2*C2`, `SOMME`, `MOYENNE`, `SI`)
- filtrer et préparer des données
- comprendre les **tableaux croisés dynamiques** (esprit `GROUP BY`)
- produire graphique + recommandations métier

## Lancer

1. Ouvrir `index.html` dans le navigateur  
   ou : `python -m http.server 8767` dans ce dossier
2. Suivre **Parcours**
3. Pratiquer dans **Atelier formules**
4. Pour TCD / graphiques Excel réels : importer les CSV de `data/`
5. Passer le **Quiz bilan**

## Données

- `data/ventes.csv`
- `data/clients.csv`

Alignées avec `sql-atelier` et `python-atelier`.

## Trio Data Analyst

| Atelier | Rôle |
|---------|------|
| SQL | Extraire / agréger |
| Excel | Explorer / présenter / décider |
| Python | Automatiser / analyser en profondeur |

## Structure

```
excel-atelier/
├── index.html
├── README.md
├── assets/
├── data/
├── css/styles.css
└── js/
    ├── content.js
    ├── formula-engine.js
    └── app.js
```
