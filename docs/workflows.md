# Gestion des workflows n8n

## Structure des fichiers

Déposez vos workflows exportés depuis n8n dans `n8n/workflows/` :

```
n8n/workflows/
├── extraction-principale.json
└── sous-workflow-analyse.json
```

## Exporter un workflow depuis n8n

Dans n8n → ouvrez le workflow → menu **⋮** → **Download** → sauvegardez le fichier JSON dans `n8n/workflows/`.

## Importer les workflows

```bash
docker compose up n8n-import
```

Le container `n8n-import` démarre, importe tous les fichiers JSON du dossier, puis s'arrête automatiquement.

> Les workflows sont importés en état **inactif**. Activez-les depuis l'UI n8n après l'import.

## Mettre à jour un workflow existant

Relancez simplement l'import — les workflows existants sont mis à jour avec le contenu du fichier JSON :

```bash
docker compose up n8n-import
```

## Bonnes pratiques

- Versionnez vos fichiers JSON dans le dépôt git pour garder un historique des workflows
- Exportez et committez après chaque modification importante d'un workflow
- Nommez les fichiers de façon explicite (`extraction-clauses.json`, `sous-workflow-ocr.json`)
- Les sous-workflows doivent être importés avant les workflows principaux qui en dépendent
