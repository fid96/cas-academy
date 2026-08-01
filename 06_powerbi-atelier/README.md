# Power BI Atelier

Parcours **tableaux de bord + design dashboard professionnel**, complément de SQL, Excel, Python et Statistiques Atelier.

## Objectif

- Brief (public, décision, questions)
- Architecture de page (zones, grille, hiérarchie, tailles)
- Matching données → visuels (cartes, barres, courbes, tableaux, segments)
- Style sobre, titres métier, cohérence, accessibilité
- Mise en œuvre dans **Power BI Desktop** avec `data/ventes.csv` et `data/clients.csv`

## Lancer l’atelier web

1. Ouvrir `index.html`  
   ou : `python -m http.server 8769`
2. Suivre **Parcours**
3. Explorer **Studio dashboard** (layouts Exécutif / Analytique / Chaos + scores)
4. Pratiquer **Choix des visuels**
5. Passer le **Quiz bilan**

## Power BI Desktop (pratique réelle)

1. Obtenir des données → CSV (`ventes`, `clients`)
2. Relier `clients[client_id]` → `ventes[client_id]`
3. Créer des mesures (`SUM`, `COUNTROWS`)
4. Reproduire le wireframe du Studio :
   - Haut : KPI + segments
   - Centre : visuel héros
   - Bas : secondaire / détail / reco

## Design pro (rappel)

| Zone | Contenu | Taille |
|------|---------|--------|
| Haut | Titre, 3–4 KPI, 2–4 segments | Compact, aligné |
| Centre | Message principal (barres ou courbe) | Plus grand bloc |
| Bas / côté | Secondaire, tableau, qualité | Plus petit |

## Suite du parcours Data Analyst

SQL → Excel → Python → Statistiques → **Power BI** → (ensuite) Storytelling data
