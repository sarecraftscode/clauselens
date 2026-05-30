# Gestion des prompts

Les prompts d'extraction sont versionnés dans Langfuse, ce qui permet de les modifier en production sans toucher au code ni redéployer.

## Structure des fichiers

Déposez vos prompts dans `langfuse/prompts/` :

```
langfuse/prompts/
├── extraction-clauses.txt    ← prompt en texte brut
├── resume-contrat.txt
└── analyse-risques.json      ← prompt avec configuration complète
```

## Formats supportés

### Fichier `.txt`

Le nom du fichier devient l'identifiant du prompt dans Langfuse. Le contenu est le texte brut du prompt.

Les variables s'écrivent avec la syntaxe `{{variable}}` :

```
Tu es un expert juridique spécialisé en {{type_contrat}}.
Extrais les clauses importantes du document suivant et classe-les par catégorie.
Réponds en {{langue}}.
```

### Fichier `.json`

Permet de définir la configuration complète du prompt :

```json
{
  "name": "extraction-clauses",
  "prompt": "Tu es un expert juridique...",
  "labels": ["production"],
  "config": {
    "model": "gpt-4o",
    "temperature": 0.2
  }
}
```

## Importer les prompts

```bash
# Importer tous les prompts
./langfuse/prompts/import.sh

# Importer un seul prompt (sans extension)
./langfuse/prompts/import.sh extraction-clauses
```

## Utiliser un prompt depuis n8n

Dans un nœud **HTTP Request** avec la credential Langfuse :

- **Method** : `GET`
- **URL** : `http://langfuse:3000/api/public/v2/prompts/extraction-clauses?label=production`

La réponse contient le texte du prompt que vous pouvez injecter dans un nœud OpenAI.

## Modifier un prompt en production

1. Éditez le prompt directement dans l'UI Langfuse (`http://localhost:3000`)
2. Sauvegardez → une nouvelle version est créée automatiquement
3. Marquez la version souhaitée comme **production**

Les workflows n8n récupèrent toujours la version `production` sans nécessiter de redémarrage.
