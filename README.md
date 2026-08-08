# CAS Academy

**Campus Analyse & Suivi** — plateforme unique de formation professionnelle.

Objectif pédagogique : **maîtrise opérationnelle junior** — transfert, justifications, détection d’erreurs, quiz ≥ 80 %.

Deux spécialisations **autonomes** (pas une suite DA → S&E) :

1. **Data Analyst** (DA)  
2. **Expert S&E** (Suivi & Évaluation)

Puis suit un parcours guidé, avec progression et attestation propres à chaque formation.

## Lancer

```bash
cd "C:\Users\FIDELE\Projects\ATELIER DATA ANALYST"
python -m http.server 8765
```

Ouvrir : **http://localhost:8765/**

## Parcours utilisateur

```
Campus (#/)  — CAS Academy
  ├─ Data Analyst     →  #/formation/data-analyst
  └─ Expert S&E       →  #/formation/se
```

## Identité visuelle

- Marque : **CAS Academy**
- Signature : **Campus Analyse & Suivi**
- Logo / favicon : `platform/assets/logo-cas.svg`, `favicon.svg`

## Structure

```
index.html                 ← entrée campus
platform/                  ← coque LMS (css, js, assets)
01_…08_*/                  ← ateliers Data Analyst
sig-atelier/               ← SIG (parcours DA | S&E via ?pack=)
qualite-atelier/           ← Qualité & gouvernance (parcours DA | S&E via ?pack=)
ethique-atelier/           ← Éthique & protection des données (parcours DA | S&E via ?pack=)
se-atelier/                ← atelier Expert S&E
attestation-modele.html    ← certificat dynamique
```
