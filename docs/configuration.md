# Configuration initiale des outils

Suivez ces étapes **dans l'ordre** après le premier `docker compose up -d`.

## Étape 1 — Créer un compte Langfuse

1. Ouvrez `http://localhost:3000`
2. Cliquez **Sign Up** et créez votre compte administrateur
3. Créez un **projet** (ex: `clauselens`)
4. Allez dans **Settings** → **API Keys** → copiez la **Public Key** et la **Secret Key**

## Étape 2 — Connecter Langfuse à LiteLLM

Renseignez les clés Langfuse dans `.env` :

```env
LANGFUSE_PUBLIC_KEY=pk-lf-...
LANGFUSE_SECRET_KEY=sk-lf-...
```

Redémarrez LiteLLM :

```bash
docker compose up -d litellm
```

## Étape 3 — Vérifier LiteLLM

1. Ouvrez `http://localhost:4000/ui`
2. Connectez-vous avec `admin` / votre `LITELLM_MASTER_KEY`
3. Vérifiez que les modèles sont listés (`gpt-4o`, `gpt-4o-mini`, etc.)

Générez une **Virtual Key** pour n8n : **Virtual Keys** → **Create New Key**

## Étape 4 — Créer un compte n8n

1. Ouvrez `http://localhost:5678`
2. Créez votre compte administrateur

## Étape 5 — Importer les workflows n8n

Importez les workflows avant de configurer les credentials — cela permet à n8n d'afficher les types de credentials utilisés.

```bash
docker compose up n8n-import
```

## Étape 6 — Configurer la credential LiteLLM dans n8n

Dans n8n, les credentials sont accessibles depuis l'icône **Credentials** dans la barre latérale gauche (et non via Settings → Credentials, qui n'existe plus dans les versions récentes).

**Barre latérale gauche** → **Credentials** → **Add credential** → **OpenAI** :

- **API Key** : la Virtual Key générée à l'étape 3
- **Base URL** : `http://litellm:4000`

> Tous les nœuds OpenAI de n8n passeront par LiteLLM et seront tracés dans Langfuse.

## Étape 7 — Configurer la credential Langfuse dans n8n

**Barre latérale gauche** → **Credentials** → **Add credential** → **Langfuse** :

- **Langfuse URL** : `http://langfuse:3000`
- **Public Key** : votre Public Key Langfuse
- **Secret Key** : votre Secret Key Langfuse

> Utilisez `langfuse` et non `localhost` — n8n communique avec Langfuse via le réseau Docker interne.

## Étape 8 — Importer les prompts dans Langfuse

```bash
# Tous les prompts
./langfuse/prompts/import.sh

# Un seul prompt
./langfuse/prompts/import.sh nom-du-prompt
```

Pour plus de détails sur la gestion des prompts, voir [prompts.md](prompts.md).
