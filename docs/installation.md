# Installation et démarrage

## Prérequis

- [Docker](https://docs.docker.com/get-docker/) et [Docker Compose](https://docs.docker.com/compose/) installés
- [jq](https://stedolan.github.io/jq/) installé : `sudo apt install jq`
- Des clés API pour au moins un provider LLM (OpenAI, Anthropic, etc.)

## 1. Cloner le dépôt

```bash
git clone <url-du-repo> clauselens
cd clauselens
```

## 2. Créer le fichier d'environnement

```bash
cp .env.example .env
```

Générez les secrets requis :

```bash
echo "LANGFUSE_NEXTAUTH_SECRET=$(openssl rand -base64 32)" >> .env
echo "LANGFUSE_SALT=$(openssl rand -base64 32)" >> .env
echo "LANGFUSE_ENCRYPTION_KEY=$(openssl rand -base64 32)" >> .env
echo "N8N_ENCRYPTION_KEY=$(openssl rand -base64 32)" >> .env
```

Renseignez ensuite vos clés API et la master key LiteLLM dans `.env` :

```env
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
LITELLM_MASTER_KEY=sk-changeme   # changez cette valeur
```

## 3. Lancer la stack

```bash
docker compose up -d
```

Vérifiez que tous les services sont démarrés :

```bash
docker compose ps
```

Tous les services doivent afficher `healthy` ou `Up` (environ 30 secondes au premier démarrage).

## Accès aux interfaces

| Interface | URL | Identifiants |
|---|---|---|
| Langfuse | http://localhost:3000 | compte créé au premier lancement |
| LiteLLM | http://localhost:4000/ui | `admin` / `LITELLM_MASTER_KEY` |
| n8n | http://localhost:5678 | compte créé au premier lancement |

Une fois la stack démarrée, suivez le guide de [configuration initiale](configuration.md).
