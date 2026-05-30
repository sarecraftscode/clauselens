# Conformité RGPD et EU AI Act

LiteLLM permet d'activer des guardrails et des paramètres de conformité directement dans sa configuration ou via son interface d'administration.

---

## Contexte réglementaire

| Règlement | Obligations principales pour ClauseLens |
|---|---|
| **RGPD** | Ne pas transmettre de données personnelles aux LLM, pseudonymiser les entrées, ne pas logger les messages bruts |
| **EU AI Act** | Traçabilité des décisions automatisées, modération du contenu, supervision humaine, transparence envers l'utilisateur |

ClauseLens est classifié comme système à **risque limité** au sens de l'EU AI Act (traitement de documents contractuels, sans décision autonome à fort impact). L'obligation principale est la **transparence** : l'utilisateur doit savoir qu'il interagit avec un système d'IA.

---

## RGPD — Configuration LiteLLM

### 1. Pseudonymisation des données avec Presidio

[Microsoft Presidio](https://microsoft.github.io/presidio/) détecte et masque les entités personnelles (noms, emails, IBAN, numéros de téléphone, etc.) avant qu'elles ne soient envoyées au LLM.

**Prérequis** : ajouter le service Presidio à la stack.

Ajoutez dans `docker-compose.yml` :

```yaml
presidio-analyzer:
  image: mcr.microsoft.com/presidio-analyzer:latest
  ports: ["5001:3000"]
  networks: [ai-net]

presidio-anonymizer:
  image: mcr.microsoft.com/presidio-anonymizer:latest
  ports: ["5002:3000"]
  networks: [ai-net]
```

Activez le guardrail dans `litellm/config.yaml` :

```yaml
guardrails:
  - guardrail_name: "pii-masking"
    litellm_params:
      guardrail: presidio
      mode: "pre_call"                        # masquage avant envoi au LLM
      output_parse_pii: true                  # démasquage dans la réponse
      presidio_analyzer_api_base: "http://presidio-analyzer:3000"
      presidio_anonymizer_api_base: "http://presidio-anonymizer:3000"
```

### 2. Ne pas logger les messages dans Langfuse

Par défaut, LiteLLM envoie le contenu des prompts et des réponses à Langfuse. Pour exclure les messages des traces (conserver uniquement les métadonnées) :

```yaml
litellm_settings:
  redact_messages_in_logging_by_default: true
```

### 3. Résidence des données

Pour que les données ne quittent pas l'UE, utilisez des modèles hébergés en Europe ou en local. Exemple avec un modèle Mistral hébergé localement via Ollama :

```yaml
model_list:
  - model_name: mistral-local
    litellm_params:
      model: ollama/mistral
      api_base: http://ollama:11434
```

---

## EU AI Act — Configuration LiteLLM

### 1. Modération du contenu avec LlamaGuard

[LlamaGuard](https://ai.meta.com/research/publications/llama-guard-llm-based-input-output-safeguard-for-human-ai-conversations/) analyse les entrées et sorties pour détecter les contenus dangereux, haineux ou illicites.

```yaml
guardrails:
  - guardrail_name: "content-moderation"
    litellm_params:
      guardrail: llama_guard
      mode: "pre_call_and_post_call"          # contrôle entrée ET sortie
      llama_guard_model_name: "ollama/llama-guard3"
```

### 2. Traçabilité (déjà activée)

La traçabilité est déjà configurée via Langfuse (`success_callback` et `failure_callback`). Chaque appel LLM est enregistré avec : modèle utilisé, latence, coût, statut — sans messages si `redact_messages_in_logging_by_default: true`.

### 3. Supervision humaine

n8n assure la supervision humaine via son système de workflow : chaque extraction peut être soumise à validation avant restitution à l'utilisateur.

---

## Activation dans l'UI LiteLLM

Les guardrails configurés dans `config.yaml` peuvent ensuite être associés à des Virtual Keys dans l'UI LiteLLM :

1. Ouvrez `http://localhost:4000/ui`
2. Allez dans **Virtual Keys** → sélectionnez ou créez une clé
3. Section **Guardrails** → cochez les guardrails à activer pour cette clé
4. Sauvegardez

> Cela permet d'appliquer des niveaux de conformité différents selon le contexte d'utilisation (ex : clé stricte pour la production, clé permissive pour les tests).

---

## Exemple de `litellm/config.yaml` complet avec conformité

```yaml
guardrails:
  - guardrail_name: "pii-masking"
    litellm_params:
      guardrail: presidio
      mode: "pre_call"
      output_parse_pii: true
      presidio_analyzer_api_base: "http://presidio-analyzer:3000"
      presidio_anonymizer_api_base: "http://presidio-anonymizer:3000"

  - guardrail_name: "content-moderation"
    litellm_params:
      guardrail: llama_guard
      mode: "pre_call_and_post_call"
      llama_guard_model_name: "ollama/llama-guard3"

litellm_settings:
  redact_messages_in_logging_by_default: true
  success_callback: ["langfuse"]
  failure_callback: ["langfuse"]
  cache: true
  cache_params:
    type: redis
    supported_call_types: [acompletion, completion, embedding, aembedding]
```

Après modification de `config.yaml`, redémarrez LiteLLM :

```bash
docker compose up -d litellm
```
