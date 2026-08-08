# SIG Atelier

Un **socle SIG**, deux parcours métier :

- **Data Analyst** — `index.html?pack=data-analyst`
- **Expert S&E** — `index.html?pack=se`

## Message clé

- La carte sert une **décision**, pas la décoration.
- **QC GPS / jointures avant symbologie.**
- QGIS hors navigateur ; le labo web entraîne le contrôle qualité sur Kalunga.

## Contenu

| Bloc | Contenu |
|------|---------|
| Socle (commun) | SIG pour décider, CRS, couches/jointures, flux QGIS & pièges GPS |
| Track DA | Fiabiliser la couche + carte / lecture analytique |
| Track S&E | Couverture vs cible + décisions assignées |
| Labo | QC CSV, checklist QGIS, checklist livrable |
| Bilan | Quiz 10 questions (seuil 75 %) — complète le module LMS |

## Données

- `data/kalunga_sites_gps.csv` — sites WASH avec anomalies GPS volontaires
- `data/kalunga_aires.csv` — référentiel aires + centroïdes + cible
- `data/kalunga_couverture.csv` — couverture agrégée post-QC (exercice lecture)

## Lancer

```bash
cd "C:\Users\FIDELE\Projects\ATELIER DATA ANALYST"
python -m http.server 8765
```

- DA : http://localhost:8765/sig-atelier/index.html?pack=data-analyst  
- S&E : http://localhost:8765/sig-atelier/index.html?pack=se  

Via la plateforme CAS : modules **09 · SIG** (chaque formation).

## Place dans les packs

- **Data Analyst** : après les modules 01–08 (analyse spatiale en fin de chaîne)
- **Expert S&E** : module 09 après le socle S&E (carte pour piloter)
