# Éthique Atelier

Un **socle éthique & protection des données**, deux parcours métier :

- **Data Analyst** — `index.html?pack=data-analyst`
- **Expert S&E** — `index.html?pack=se`

## Message clé

- La personne avant le tableau.
- Minimiser, classer, masquer, documenter.
- Pas de PII dans les prompts IA.

## Contenu

| Bloc | Contenu |
|------|---------|
| Socle (commun) | Pourquoi l’éthique, sensibilité & minimisation, consentement / partage / IA |
| Track DA | Exports partageables + IA & outils sans fuite |
| Track S&E | Consentement & AAP + partager / masquer |
| Labo | Classement variables, scénarios, checklist, matrice (S&E) |
| Bilan | Quiz 8 questions (seuil 75 %) |

## Données

- `data/kalunga_variables.csv` — liste pédagogique de variables à classer (exemples masqués)

## Lancer

```bash
cd "C:\Users\FIDELE\Projects\ATELIER DATA ANALYST"
python -m http.server 8765
```

- DA : http://localhost:8765/ethique-atelier/index.html?pack=data-analyst  
- S&E : http://localhost:8765/ethique-atelier/index.html?pack=se  

Via CAS : modules **11 · Éthique**.

## Place

Module 11 après Qualité (DA et S&E). Durée cible : 3–5 h.
