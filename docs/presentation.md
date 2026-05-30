---
marp: true
theme: default
paginate: true
---

# ClauseLens
### Comprendre les conditions générales avant de signer

---

## Contexte — Ce que font les Français

> **41,6 millions** de Français ont effectué au moins un achat en ligne
> soit **73% de la population** de plus de 15 ans *(FEVAD)*

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

## Contexte — Ce que personne ne lit

- **7 Français sur 10** ne lisent pas ou rarement les conditions générales *(OpinionWay)*
- Jusqu'à **6h52** pour lire certaines CGV en entier *(Que Choisir)*

### Pourquoi personne ne lit ?

- Vocabulaire juridique inaccessible
- Des dizaines de pages, structure non linéaire
- Des clauses défavorables, parfois volontairement peu visibles
- Manque de temps
- Risques cachés — découverts seulement en cas de problème

---

## Problématique

> **Comment aider les utilisateurs à identifier rapidement
> les clauses importantes d'une condition générale
> sans remplacer l'expertise juridique ?**

---

## Solution proposée — ClauseLens

Un assistant IA qui, en fonction du **type** de conditions générales :

✅ **Extrait et met en lumière** les points d'attention avant de signer

✅ **Réduit le temps de lecture** (de plusieurs heures à quelques secondes)

✅ **Améliore la compréhension** grâce à une reformulation accessible

### Types de documents supportés
`CGV` · `CGA` · `CG Abonnement` · `CG Assurance` · `CGU` · `CG Garantie` · `CG Location`

---

## Parties prenantes

| Rôle | Responsabilité |
|---|---|
| **Juristes** | Validation des prompts d'extraction, définition des clauses importantes par type |
| **Product Manager** | Priorisation, roadmap, coordination |
| **Développeur IA** | Architecture LLM, prompts, guardrails, intégrations |
| **Développeur frontend** | Interface utilisateur |
| **UX Designer** | Expérience de lecture, présentation des résultats |
| **Utilisateurs finaux** | Tests, retours, validation de l'utilité |

---

## Architecture technique — Vision utilisateur

```
┌─────────────────────────────────────────────────────┐
│                    UTILISATEUR                       │
│                                                      │
│  1. Colle ou dépose son document (texte ou PDF)      │
│  2. Clique sur Analyser                              │
│  3. Reçoit un résumé structuré des clauses clés      │
└─────────────────────────────────────────────────────┘
         │                          ▲
         │ Document                 │ Résumé HTML structuré
         ▼                          │
┌─────────────────────────────────────────────────────┐
│                   CLAUSELENS                         │
│                                                      │
│  • Détecte automatiquement le type de document       │
│  • Applique le prompt expert correspondant           │
│  • Extrait uniquement les clauses importantes        │
└─────────────────────────────────────────────────────┘
```

---

## Architecture technique — Vision juriste

```
Document entrant (texte ou PDF)
         │
         ▼
┌─────────────────────┐
│ Détection du type   │  ← Mistral (modèle léger et rapide)
│ de document         │
└─────────┬───────────┘
          │ Type détecté : CGV / CGA / CGU / ...
          ▼
┌─────────────────────┐
│ Sélection du prompt │  ← Prompts versionnés dans Langfuse
│ expert (par type)   │     rédigés et validés par des juristes
└─────────┬───────────┘
          │ Prompt + document
          ▼
┌─────────────────────┐
│ Extraction LLM      │  ← OpenAI / Anthropic (modèle puissant)
│ des clauses clés    │
└─────────┬───────────┘
          │ HTML structuré
          ▼
   Restitution à l'utilisateur
```

---

## Architecture MVP

```
┌──────────────┐     POST      ┌──────────────────────────────────┐
│ clause-      │ ──────────▶  │  n8n — Orchestration              │
│ radar.html   │              │                                    │
│ (interface)  │ ◀──────────  │  Main Workflow                     │
└──────────────┘   Résultat   │  ├── Webhook (entrée)             │
                              │  ├── Switch (texte / fichier)      │
                              │  └── Execute Sub-Workflow          │
                              │                                    │
                              │  Sub-Workflow                      │
                              │  ├── Détection type (Mistral)      │
                              │  ├── Get prompt (Langfuse)         │
                              │  └── Extraction (OpenAI/Anthropic) │
                              └──────────────┬───────────────────┘
                                             │
                    ┌────────────────────────┼──────────────────┐
                    ▼                        ▼                  ▼
             ┌────────────┐        ┌──────────────┐   ┌──────────────┐
             │  LiteLLM   │        │   Langfuse   │   │  PostgreSQL  │
             │  (proxy)   │        │ (traces +    │   │  + Redis     │
             │            │        │  prompts)    │   │  (données)   │
             └─────┬──────┘        └──────────────┘   └──────────────┘
                   │
       ┌───────────┼───────────┐
       ▼           ▼           ▼
   OpenAI     Anthropic     Mistral
```

---

## RGPD et conformité EU AI Act

### Classification
ClauseLens est un système à **risque limité** selon l'EU AI Act :
il assiste sans décider — l'utilisateur reste maître de sa signature.

### Mesures techniques (via LiteLLM)
| Mesure | Outil | Statut |
|---|---|---|
| Pseudonymisation PII avant envoi LLM | Presidio (guardrail) | Configurable |
| Modération du contenu | LlamaGuard (guardrail) | Configurable |
| Traçabilité de chaque appel LLM | Langfuse | ✅ Actif |
| Non-log des messages bruts | `redact_messages_in_logging_by_default` | Configurable |
| Résidence des données (UE) | Modèles locaux / Mistral EU | Configurable |

---

## Limites de ClauseLens

- ⚖️ **Ne remplace pas un juriste** — aucune valeur juridique contraignante
- 📄 **Ne dispense pas d'une lecture complète** — assistant, pas substitut
- 🤖 **Risques d'hallucinations résiduels** — les LLM peuvent produire des erreurs
- 👁️ **Supervision humaine nécessaire** — les résultats doivent être vérifiés
- 📊 **Qualité dépendante des prompts** — amélioration continue requise

---

## Roadmap — 9 mois

| Phase | Mois | Objectif |
|---|---|---|
| **MVP** | M1–M2 | Stack opérationnelle, 7 types de documents, interface web |
| **Qualité** | M3–M4 | Amélioration des prompts avec les juristes, tests utilisateurs, feedback loop |
| **Enrichissement** | M5–M6 | Traitement batch (multi-documents), API publique, nouveaux types |
| **Conformité** | M7–M8 | Guardrails RGPD (Presidio), audit EU AI Act, documentation légale |
| **Scale** | M9 | Déploiement cloud EU, monitoring avancé, intégrations partenaires |

---

# Merci

**ClauseLens** — Comprendre avant de signer

> *"Un document illisible ne devrait pas rester illisible."*

---

## Annexe — Prompts disponibles

| Prompt | Type de document | Points d'attention extraits |
|---|---|---|
| `CGAssurance` | Conditions d'assurance | Événements couverts, exclusions, franchises, plafonds |
| `CGVente` | Conditions de vente | Prix, livraison, rétractation, garanties légales |
| `CGAbonnement` | Abonnements | Durée, renouvellement, résiliation, évolution tarifs |
| `CGAchat` | Conditions d'achat | Facturation, paiement, livraison, garanties fournisseur |
| `CGGarantie` | Garanties | Couverture, exclusions, franchise, plafonds |
| `CGLocation` | Location | Durée, dépôt de garantie, état des lieux, responsabilités |
| `CGUtilisation` | CGU | Données personnelles, interdictions, responsabilité plateforme |
