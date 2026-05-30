# Installation et démarrage

## Prérequis

### Outils système

| Outil | Version minimale | Installation |
|---|---|---|
| [Docker](https://docs.docker.com/get-docker/) | 24+ | `https://docs.docker.com/get-docker/` |
| Docker Compose v2 | 2.20+ | intégré à Docker Desktop / `apt install docker-compose-plugin` |
| [Git](https://git-scm.com/) | 2+ | `sudo apt install git` |
| [openssl](https://www.openssl.org/) | — | pré-installé sur Linux/macOS, inclus dans Git Bash sur Windows |
| [curl](https://curl.se/) | — | `sudo apt install curl` |
| [jq](https://stedolan.github.io/jq/) | 1.6+ | `sudo apt install jq` |

> **Docker Compose v2** — les commandes de ce guide utilisent `docker compose` (sans tiret). Si vous avez l'ancienne version (`docker-compose`), mettez à jour vers le plugin v2.

### Ressources machine recommandées

| Ressource | Minimum | Recommandé |
|---|---|---|
| RAM | 4 Go | 8 Go |
| Disque libre | 5 Go | 10 Go |
| CPU | 2 cœurs | 4 cœurs |

### Clés API

Au moins une clé API pour un provider LLM :

- **OpenAI** : `OPENAI_API_KEY=sk-...`
- **Anthropic** : `ANTHROPIC_API_KEY=sk-ant-...`
- **Groq** : `GROQ_API_KEY=gsk_...`

## 1. Cloner le dépôt

```bash
git clone <url-du-repo> clauselens
cd clauselens
```

## 2. Créer le fichier d'environnement

```bash
cp .env.example .env
```

### Générer les secrets

Exécutez ces commandes pour obtenir des valeurs aléatoires :

```bash
openssl rand -base64 32   # pour LANGFUSE_NEXTAUTH_SECRET
openssl rand -base64 32   # pour LANGFUSE_SALT
openssl rand -hex 32      # pour LANGFUSE_ENCRYPTION_KEY
openssl rand -base64 32   # pour N8N_ENCRYPTION_KEY
```

> **Important — ne pas utiliser `echo >> .env`** : `.env.example` contient déjà ces variables (vides). Ajouter des lignes en fin de fichier crée des doublons ; Docker Compose lit la **première** occurrence et ignore les suivantes. Renseignez les valeurs directement dans `.env`.

### Variables Langfuse

| Variable | Commande de génération | Format attendu |
|---|---|---|
| `LANGFUSE_NEXTAUTH_SECRET` | `openssl rand -base64 32` | base64 (44 chars) |
| `LANGFUSE_SALT` | `openssl rand -base64 32` | base64 (44 chars) |
| `LANGFUSE_ENCRYPTION_KEY` | `openssl rand -hex 32` | **hex 64 chars** — pas base64 |

> `LANGFUSE_ENCRYPTION_KEY` **doit** être en hexadécimal (64 caractères). Utiliser `openssl rand -base64 32` provoque une erreur au démarrage : `ENCRYPTION_KEY must be 256 bits, 64 string characters in hex format`.

Exemple de `.env` correctement rempli pour Langfuse :

```env
LANGFUSE_NEXTAUTH_SECRET=U2FsdGVkX1+ABCDEFGhijklmnopqrstuvwxyz12345=
LANGFUSE_SALT=U2FsdGVkX1+ABCDEFGhijklmnopqrstuvwxyz12345=
LANGFUSE_ENCRYPTION_KEY=4a8f3c2d1e9b7a6f5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2
```

### Variables LiteLLM et n8n

```env
LITELLM_MASTER_KEY=sk-changeme        # changez cette valeur
N8N_ENCRYPTION_KEY=<openssl rand -base64 32>
```

### Clés API LLM

Au moins une clé est requise :

```env
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GROQ_API_KEY=gsk_...
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
