# ClauseLens — Instructions Claude Code

## Commits

Utiliser les **Conventional Commits** pour tous les messages de commit.

Format : `<type>(<scope>): <description>`

### Types

| Type | Usage |
|---|---|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `docs` | Documentation uniquement |
| `chore` | Maintenance, config, dépendances |
| `refactor` | Refactoring sans changement de comportement |
| `test` | Ajout ou modification de tests |

### Scopes courants

`n8n`, `litellm`, `langfuse`, `docker`, `docs`, `prompts`

### Exemples

```
feat(n8n): add PDF extraction workflow
fix(langfuse): use hex format for ENCRYPTION_KEY
docs(installation): add prerequisites section
chore(docker): pin postgres to 16.3
```

## Vider le cache LiteLLM

Utiliser l'endpoint `/cache/flushall` (et non `/cache/delete` ni `/cache/flush`) :

```bash
source .env && curl -s -X POST http://localhost:4000/cache/flushall \
  -H "Authorization: Bearer $LITELLM_MASTER_KEY"
```

Réponse attendue : `{"status": "success"}`

> `/cache/delete` nécessite une liste de clés spécifiques — ne pas passer un tableau vide.
> `/cache/flush` n'existe pas dans cette version de LiteLLM.
