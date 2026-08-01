# Python Atelier

Parcours pédagogique **de zéro à Data Analyst Python** : fondations d’abord, puis le métier complet (pas un bonus).

## Objectif

Former quelqu’un sans bagage informatique à devenir un **Data Analyst Python digne et complet** :

- poser une question métier
- importer CSV / Excel
- explorer et nettoyer
- calculer des KPI (groupby, jointures)
- visualiser
- recommander

## Méthode

**Voir → Comprendre → Pratiquer → Vérifier**

## Lancer l’outil

1. Ouvrir `index.html` dans le navigateur  
   ou servir le dossier : `python -m http.server 8765`
2. Suivre **Parcours** (fondations puis Data Analyst)
3. Passer le **Quiz bilan** (20 questions, score + thèmes faibles)
4. Utiliser **Carnet** pour imprimer / PDF les exercices
5. Ouvrir **Labo Anaconda** puis le notebook projet

## Anaconda / Jupyter (déjà installés chez vous)

1. Anaconda Navigator → Launch **Jupyter Notebook**
2. Aller dans `C:\Users\FIDELE\Projects\python-atelier\notebooks\`
3. Ouvrir `projet_analyste_ventes.ipynb`
4. Exécuter les cellules (Shift+Entrée) — chemins `../data/...`

## Données d’entraînement (`data/`)

| Fichier | Rôle |
|---------|------|
| `ventes.csv` | Jeu principal de ventes (santé) |
| `clients.csv` | Table clients pour les jointures |
| `ventes_apercu.xlsx` | Extrait Excel |
| `ventes_pointvirgule.csv` | CSV avec séparateur `;` |

Pour pandas + fichiers : travaillez en local (VS Code / Jupyter) à la racine du projet.

## Structure du parcours

### Fondations Python
1. Penser avant de coder  
2. Premiers pas en Python  
3. Décisions  
4. Boucles  
5. Listes & dictionnaires  
6. Fonctions  

### Data Analyst Python (cœur)
7. Métier de Data Analyst  
8. Fichiers CSV & Excel  
9. pandas : explorer & sélectionner  
10. Nettoyage & qualité  
11. Agrégations, groupby, jointures  
12. Visualisation pour décider  
13. Statistiques utiles  
14. Projet Data Analyst  

## Structure des fichiers

```
python-atelier/
├── index.html
├── README.md
├── assets/
├── data/
├── css/styles.css
└── js/
    ├── content.js        # fondations
    ├── content-data.js   # Data Analyst + carnet
    └── app.js
```
