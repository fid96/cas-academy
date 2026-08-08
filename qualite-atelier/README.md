# Qualité Atelier

Un **socle qualité & gouvernance**, deux parcours métier :

- **Data Analyst** — `index.html?pack=data-analyst`
- **Expert S&E** — `index.html?pack=se`

## Message clé

- Pas de chiffre sans source ni contrôle.
- Dictionnaire → règles QC → journal → version clean → go/no-go.
- Bloquer vaut mieux que publier faux.

## Contenu

| Bloc | Contenu |
|------|---------|
| Socle (commun) | Pourquoi la qualité, dimensions, dictionnaire & règles, journal / versions / go-no-go |
| Track DA | Fichier clean défendable + contrôles répétables |
| Track S&E | Seuils d’acceptation + décision de publication |
| Labo | QC CSV Kalunga, checklist gouvernance, matrice indicateur (S&E) |
| Bilan | Quiz 10 questions (seuil 75 %) — complète le module LMS |

## Données

- `data/kalunga_nutrition_mensuel.csv` — doublons, manquants, valeurs négatives
- `data/kalunga_wash_sites.csv` — cohérence statut / ménages
- `data/kalunga_registre_benef.csv` — unicité, validité, PII

## Lancer

```bash
cd "C:\Users\FIDELE\Projects\ATELIER DATA ANALYST"
python -m http.server 8765
```

- DA : http://localhost:8765/qualite-atelier/index.html?pack=data-analyst  
- S&E : http://localhost:8765/qualite-atelier/index.html?pack=se  

Via la plateforme CAS : modules **10 · Qualité** (chaque formation).

## Place dans les packs

- **Data Analyst** : module 10 après SIG  
- **Expert S&E** : module 10 après SIG S&E  
