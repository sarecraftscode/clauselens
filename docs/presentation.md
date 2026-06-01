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

## Rencontrez Marie

**34 ans — Responsable marketing dans une PME**

> *"Je clique sur J'accepte comme tout le monde.<br>Je sais que c'est risqué, mais 47 pages de juridique…"*

<br>

Marie commande sur Amazon, réserve une voiture sur un comparateur, souscrit son assurance habitation en ligne, prend un abonnement streaming, achète ses billets de train.

À chaque fois, une condition générale l'attend.
À chaque fois, elle signe sans lire.

---

## Le quotidien de Marie

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

## Marie ne lit pas — comme 7 Français sur 10

**7 Français sur 10** ne lisent pas ou rarement les conditions générales — *[OpinionWay](https://www.isoc.fr/cgu-opinionway/)*

**Jusqu'à 6h52** pour lire certaines CGV en entier — *[Que Choisir](https://www.quechoisir.org/actualite-conditions-generales-a-l-epreuve-du-chrono-n98457/)*

<br>

### Pourquoi Marie ne lit pas ?

- Vocabulaire juridique inaccessible, dizaines de pages, structure non linéaire
- Clauses défavorables, parfois volontairement peu visibles
- Manque de temps
- **Risques cachés — découverts seulement en cas de problème**

---

## Le jour où Marie a eu un problème

<br>

> Marie souscrit un abonnement de streaming en période d'essai.
>
> Trois mois plus tard, elle constate un prélèvement mensuel.
>
> La clause de **renouvellement automatique** était à la page 34.
>
> Elle n'avait jamais lu la page 34.

<br>

*Ce scénario arrive tous les jours, pour des millions de Français.*

---

<!-- _class: divider -->

## Problématique

> ### Comment aider Marie — et des millions d'utilisateurs — à identifier rapidement les clauses importantes **sans remplacer l'expertise juridique ?**

---

<!-- _class: divider -->

## Solution proposée

ClauseLens

---

## ClauseLens — L'assistant qui lit pour Marie

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

## Périmètre du MVP

✅ **7 types de documents**
Conditions Générales de Vente · d'Achat · d'Utilisation · d'Abonnement · d'Assurance · de Garantie · de Location

✅ **Deux modes de saisie** — texte collé ou import de fichier PDF

✅ **Interface web** — accessible depuis un navigateur, sans installation

✅ **Sortie HTML structurée** — résumé hiérarchisé des clauses importantes

✅ **Langue française** — documents en français uniquement

✅ **Stack auto-hébergée** — déployable sur un serveur ou en local via Docker

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
>
> 🛡️ **Surveillance de la conformité** via guardrails — modération du contenu, détection de PII, audit des appels *(ex : LiteLLM permet de configurer ces politiques nativement)*

---

## RGPD — Position de ClauseLens

Les CGV/CGU sont des **documents publics** — risque faible, mais pas nul.

✅ Modèle hébergé en **UE** — pas de transfert de données hors Europe
✅ Les appels API **ne servent pas à entraîner** les modèles
✅ Le contenu du document **n'est pas stocké** après analyse
✅ L'utilisateur est **informé** de ce qui est envoyé au LLM

⚠️ Certains documents peuvent contenir des données personnelles — traitement à surveiller

🛡️ **Surveillance de la conformité** via guardrails — modération du contenu, détection de PII, audit des appels *(ex : LiteLLM permet de configurer ces politiques nativement)*

---

<!-- _class: divider -->

## Limites

---

## Limites de ClauseLens

- ⚖️ **Ne remplace pas un juriste** — aucune valeur juridique contraignante
- 📄 **Ne dispense pas d'une lecture complète** — assistant, pas substitut
- 🤖 **Risques d'hallucinations résiduels** — les LLM peuvent produire des erreurs
- 🔍 **Absence de sources** — le résumé ne cite pas les numéros d'article ou de clause du document original
- 🎯 **Biais des prompts** — seules les clauses prévues sont extraites, les clauses inhabituelles sont ignorées même si importantes

---

## Limites MVP — Performance & Couverture

| Limite | Description |
|---|---|
| 📏 **Fenêtre contextuelle** | Un document très long peut dépasser la limite du modèle et être tronqué silencieusement — sans avertissement |
| 🌍 **Français uniquement** | Documents étrangers non gérés |

---

## Limites MVP — Qualité de la détection

| Limite | Description |
|---|---|
| ⚠️ **Erreurs de détection du type** | Le type peut être mal identifié si les clauses sont non reconnues, si le document mélange plusieurs types de conditions, ou si la structure est atypique |
| 🔀 **Mauvaise classification** | Un document peut être pris pour un autre (ex : CGV vs conditions bancaires) |
| 📄 **Documents composés** | CGV + CGU dans le même fichier (ex : SNCF) — seule une partie est extraite |
| 📉 **Drift de détection** | Formulations inhabituelles ou atypiques dégradent la classification |

---

<!-- _class: divider -->

## Roadmap

---

## Roadmap

```
Phase 1 — Lancement    Phase 2 — Consolidation     Phase 3 — Enrichissement    Phase 4 — Expansion
~1 mois                ~3 mois                      ~6 mois                     ~9 mois
──────────────────     ─────────────────────────    ─────────────────────────   ──────────────────────
✅ MVP fonctionnel     🔧 Amélioration des prompts  ⚖️ IHM juriste              🔊 Résumé audio
🔒 Sécurisation IHM    🎨 Amélioration UX résultat  📑 Nouveaux types de docs   🌍 Multilingue
🧪 Tests 10 utilis.    🔗 Traçabilité dans résultat                             📱 Mobile + OCR
                       🎯 Détection type améliorée                              🔌 Serveur MCP
                       📏 Gestion documents longs

──────────────────────────────────────────────────────────────────────────────────────────────
💡 À envisager si succès : modèle dédié · fine-tuning sur corpus de conditions générales
```

---

<!-- _class: title -->

# Merci

**ClauseLens** utilise l'IA pour réduire la charge de lecture
et améliorer la compréhension des conditions générales,
tout en gardant l'humain au centre de la décision.

> *"Un document illisible ne devrait pas rester illisible."*

