---
marp: true
theme: default
paginate: true
style: |
  :root {
    --color-dark: #0f172a;
    --color-primary: #1d4ed8;
    --color-accent: #3b82f6;
    --color-light: #f8fafc;
    --color-muted: #64748b;
  }
  section {
    background: #ffffff;
    color: var(--color-dark);
    font-family: 'Segoe UI', Arial, sans-serif;
    padding: 48px 64px;
  }
  section.title {
    background: var(--color-dark);
    color: #ffffff;
    justify-content: center;
    text-align: center;
  }
  section.title h1 { color: #ffffff; font-size: 2.6em; margin-bottom: 12px; }
  section.title h3 { color: #93c5fd; font-weight: 400; font-size: 1.1em; }
  section.divider {
    background: var(--color-primary);
    color: #ffffff;
    justify-content: center;
    text-align: center;
  }
  section.divider h2 { color: #ffffff; font-size: 2em; border: none; }
  section.divider p { color: #bfdbfe; font-size: 1em; }
  h1 { color: var(--color-dark); font-size: 1.8em; }
  h2 {
    color: var(--color-primary);
    font-size: 1.4em;
    border-bottom: 2px solid var(--color-accent);
    padding-bottom: 8px;
    margin-bottom: 24px;
  }
  h3 { color: var(--color-dark); font-size: 1.1em; margin-top: 20px; }
  blockquote {
    border-left: 4px solid var(--color-accent);
    background: #eff6ff;
    padding: 16px 20px;
    border-radius: 0 8px 8px 0;
    color: var(--color-dark);
    font-style: normal;
  }
  strong { color: var(--color-primary); }
  table { width: 100%; border-collapse: collapse; font-size: 0.85em; }
  th { background: var(--color-dark); color: #fff; padding: 8px 12px; text-align: left; }
  td { padding: 8px 12px; border-bottom: 1px solid #e2e8f0; }
  tr:nth-child(even) td { background: #f8fafc; }
  code { background: #eff6ff; color: var(--color-primary); padding: 2px 6px; border-radius: 4px; }
  ul li { margin-bottom: 6px; }
  .stat { font-size: 2.5em; font-weight: 700; color: var(--color-primary); }
---

<!-- _class: title -->

# ClauseLens

### Comprendre les conditions générales avant de signer

---

## Ce que font les Français chaque jour

> **41,6 millions** de Français ont effectué au moins un achat en ligne —
> soit **73% de la population** de plus de 15 ans — *[FEVAD](https://www.fevad.com/edition-2025-des-chiffres-cles-du-e-commerce/)*

À chaque acte du quotidien, une condition générale :

| Acte | Type de document |
|---|---|
| 🛍️ Acheter | CGV — Conditions Générales de Vente |
| 📋 Souscrire une assurance | CGA — Conditions Générales d'Assurance |
| 💻 Utiliser un site internet | CGU — Conditions Générales d'Utilisation |
| 🔄 Prendre un abonnement | CG Abonnement |
| 🚗 Louer (voiture, outils…) | CG Location |
| 🛡️ Bénéficier d'une garantie | CG Garantie |

---

## Ce que personne ne lit

<br>

**7 Français sur 10** ne lisent pas ou rarement les conditions générales — *[OpinionWay](https://www.isoc.fr/cgu-opinionway/)*

**Jusqu'à 6h52** pour lire certaines CGV en entier — *[Que Choisir](https://www.quechoisir.org/actualite-conditions-generales-a-l-epreuve-du-chrono-n98457/)*

<br>

### Pourquoi ?

- Vocabulaire juridique inaccessible, dizaines de pages, structure non linéaire
- Clauses défavorables, parfois volontairement peu visibles
- Manque de temps
- **Risques cachés — découverts seulement en cas de problème**

---

<!-- _class: divider -->

## Problématique

> ### Comment aider les utilisateurs à identifier rapidement les clauses importantes d'une condition générale **sans remplacer l'expertise juridique ?**

---

<!-- _class: divider -->

## Solution proposée

ClauseLens

---

## ClauseLens — L'assistant qui lit pour vous

Un assistant IA qui, en fonction du **type** de conditions générales :

<br>

✅ **Extrait et met en lumière** les points d'attention avant de signer

✅ **Réduit le temps de lecture** — de plusieurs heures à quelques minutes

✅ **Améliore la compréhension** grâce à une reformulation accessible

---

## Comment ça marche — 3 étapes

<br>

**① Déposez votre document**
Collez le texte ou importez un fichier PDF

<br>

**② ClauseLens analyse**
Détecte le type de document → applique le prompt expert → extrait les clauses clés

<br>

**③ Lisez ce qui compte**
Un résumé structuré et hiérarchisé — vous signez en connaissance de cause

---

## Parties prenantes

| Rôle | Responsabilité |
|---|---|
| **Product Manager** | Priorisation, roadmap, coordination, portage du projet |
| **Juristes** | Définir les clauses importantes par type, rédiger et affiner les prompts |
| **Développeur** | Architecture LLM, guardrails, interface utilisateur, déploiement |
| **UX Designer** | Expérience de lecture, présentation des résultats |
| **DPO (Délégué à la Protection des Données)** | Conformité traitement des données, analyse d'impact (DPIA — Data Protection Impact Assessment) |
| **Utilisateurs finaux** | Tests, retours, validation de l'utilité |

---

<!-- _class: divider -->

## Architecture technique

---

## Vision utilisateur

![Vision utilisateur w:850](diagrams/vision-utilisateur.png)

---

## Vision juriste

![Vision juriste w:550](diagrams/vision-juriste.png)

---

## Architecture MVP

![Architecture MVP w:850](diagrams/architecture-mvp.png)

---

<!-- _class: divider -->

## Coûts

---

## Coût d'une analyse — Exemple concret

**Document : Conditions Générales de Location — 35 pages**
Modèle : mistral-small-2603 — 0,1275€ / M tokens entrée · 0,51€ / M tokens sortie
Durée d'exécution : **9,1 secondes**

| Étape | Tokens entrée | Tokens sortie | Coût |
|---|---|---|---|
| 🔍 Détection du type | 20 988 | 3 | ~0 € |
| 🤖 Extraction des clauses | 22 301 | 1 899 | ~0 € |
| **Total** | **43 289** | **1 902** | **~0 € (< 0,01 €)** |

---

<!-- _class: divider -->

## Conformité

RGPD & EU AI Act

---

## EU AI Act — Niveaux de risque

🚫 **Inacceptable** — Interdit *(notation sociale, surveillance biométrique)*
🔴 **Élevé** — Conformité obligatoire *(recrutement, crédit, justice)*
🟡 **Limité** — Transparence requise *(chatbots, assistants IA)*
🟢 **Minimal** — Aucune obligation *(filtres anti-spam, jeux vidéo)*

---

<br>

> ### ClauseLens — Risque limité 🟡
>
> Assiste sans décider — l'utilisateur reste maître de sa signature.
>
> **Obligation** : l'utilisateur est informé qu'il interagit avec une IA avant toute analyse.

---

## RGPD — Analyse du contexte ClauseLens

Les CGV/CGU sont des **documents publics** — risque RGPD globalement faible.

**Pas de données personnelles :**
téléphone entreprise, `contact@société.fr`, adresse du siège → données de **personne morale**, hors champ RGPD

**Données personnelles possibles :**
nom d'un représentant légal, email nominatif d'un DPO → **personne physique identifiable**

**Ce qu'il faut traiter :**

| Obligation | Action |
|---|---|
| Envoi à un LLM tiers | Exiger un **DPA** avec le fournisseur de modèle |
| Transfert hors UE | Privilégier des modèles **hébergés en UE** (ex : Mistral) |
| Rétention des données | **Ne pas stocker** le contenu du document après analyse |
| Transparence | Informer l'utilisateur de ce qui est envoyé au LLM |
| Entraînement des modèles | LLM configuré pour **ne pas utiliser les appels API pour entraîner les modèles** |

---

<!-- _class: divider -->

## Limites

---

## Limites de ClauseLens

- ⚖️ **Ne remplace pas un juriste** — aucune valeur juridique contraignante
- 📄 **Ne dispense pas d'une lecture complète** — assistant, pas substitut
- 🤖 **Risques d'hallucinations résiduels** — les LLM peuvent produire des erreurs
- 👁️ **Supervision humaine nécessaire** — les résultats doivent être vérifiés
- 📊 **Qualité dépendante des prompts** — amélioration continue requise

---

## Limites MVP — Performance & Couverture

| Limite | Description |
|---|---|
| ⏳ **Temps d'attente** | Long sur les documents volumineux |
| 🧠 **Limite du modèle** | Quota de tokens par minute (GPT-4o mini) |
| 💸 **Coût par analyse** | Pas de mutualisation sur le MVP |
| 👥 **Scalabilité limitée** | Architecture mono-utilisateur, sans gestion de charge |
| 🌍 **Français uniquement** | Documents étrangers non gérés |

---

## Limites MVP — Qualité de la détection

| Limite | Description |
|---|---|
| 🔀 **Mauvaise classification** | Un document peut être pris pour un autre (ex : CGV vs conditions bancaires) |
| 📄 **Documents composés** | CGV + CGU dans le même fichier (ex : SNCF) — seule une partie est extraite |
| 📉 **Drift de détection** | Formulations inhabituelles ou atypiques dégradent la classification |
| 📚 **Pas de base de connaissance** | Aucun RAG — pas de croisement avec le Code civil ou le Code des assurances |

---

<!-- _class: divider -->

## Roadmap

---

## Court terme — ~1 mois

| | |
|---|---|
| ✅ | MVP fonctionnel — interface web, stack complète |
| 📄 | 7 types de documents : `CGV` · `CGA` · `CG Abonnement` · `CG Assurance` · `CGU` · `CG Garantie` · `CG Location` |
| 🧪 | Tests internes et validation de la qualité d'extraction |
| 🏗️ | Mise à jour de l'architecture selon les retours techniques |
| 👥 | Déploiement à un échantillon réduit d'utilisateurs |

---

## Moyen terme — ~3 mois

| | |
|---|---|
| 🔧 | Amélioration des prompts suite aux premières utilisations réelles |
| 💰 | Optimisation des coûts (modèles, cache, routing LiteLLM) |
| 🎨 | Hiérarchisation et priorisation des clauses pour une meilleure UX |
| 📖 | Amélioration de l'UX sur le résultat pour faciliter la lecture |
| ⚖️ | IHM dédiée aux juristes pour identifier et valider les clauses importantes |
| 📚 | RAG sur documents de référence (Code civil, Code des assurances) |

---

## Long terme — ~9 mois

| | |
|---|---|
| 🔊 | Résumé audio des clauses importantes |
| 🌍 | Support multilingue |
| 📑 | Prise en charge de nouveaux types de documents |
| 📱 | Application mobile avec OCR pour les versions papier |
| 🤖 | Serveur MCP — accessibilité depuis les chatbots (ChatGPT, Claude…) |

---

<!-- _class: title -->

# Merci

**ClauseLens** utilise l'IA pour réduire la charge de lecture
et améliorer la compréhension des conditions générales,
tout en gardant l'humain au centre de la décision.

> *"Un document illisible ne devrait pas rester illisible."*

---

## Annexe — Prompts d'extraction disponibles

| Prompt | Type de document | Clauses extraites |
|---|---|---|
| `CGAssurance` | Conditions d'assurance | Événements couverts, exclusions, franchises, plafonds |
| `CGVente` | Conditions de vente | Prix, livraison, rétractation, garanties légales |
| `CGAbonnement` | Abonnements | Durée, renouvellement, résiliation, évolution tarifs |
| `CGAchat` | Conditions d'achat | Facturation, paiement, livraison, garanties fournisseur |
| `CGGarantie` | Garanties | Couverture, exclusions, franchise, plafonds |
| `CGLocation` | Location | Durée, dépôt de garantie, état des lieux, responsabilités |
| `CGUtilisation` | CGU | Données personnelles, interdictions, responsabilité plateforme |
| `DocumentDetection` | *(tous types)* | Prompt de classification du type de document |
