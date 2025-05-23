# DefyCommerce Monorepo

A modern commerce platform monorepo, containing:

- **Medusa** (Headless backend, TypeScript, Docker-ready)
- **Nuxt 3** (Frontend, Vue 3, TypeScript, Docker-ready)

## Table of Contents

- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Development](#development)
- [Build & Production](#build--production)
- [Docker Usage](#docker-usage)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)
- [Alternative Solutions](#alternative-solutions)

---

## Project Structure

```
defycommerce/
  apps/
    medusa/   # Medusa backend (TypeScript)
    nuxt/     # Nuxt 3 frontend (Vue 3)
  data/       # Docker volumes for Postgres/Redis
  packages/   # (Optional) Shared packages
  docker-compose.yml
  package.json
  lerna.json
  ...
```

## Requirements

- [Node.js](https://nodejs.org/) (18+ recommended)
- [Yarn](https://yarnpkg.com/) (preferred package manager)
- [Docker](https://www.docker.com/) & Docker Compose
- [Git](https://git-scm.com/)

## Getting Started

### 1. Install Dependencies

```powershell
yarn install
```

### 2. Environment Variables

- Copy `.env.example` to `.env` in both `apps/medusa` and `apps/nuxt` if available.
- Fill in required values (DB, Redis, API keys, etc).

### 3. Start Development Environment

This will run Medusa, Nuxt, Postgres, and Redis in development mode:

```powershell
yarn run server:up --profile=dev
```

Or, to run only the apps (without Docker):

```powershell
yarn run dev
```

## Development

- **Medusa**: `apps/medusa`
  - `yarn run dev:medusa`
- **Nuxt**: `apps/nuxt`
  - `yarn run dev:nuxt`

## Build & Production

Build all apps:

```powershell
yarn run build
```

Start all apps:

```powershell
yarn run start
```

## Docker Usage

### Start All Services (DB, Redis, Medusa, Nuxt)

```powershell
yarn run server:up --profile=prod
```

- **Medusa**: http://localhost:9000
- **Nuxt**: http://localhost:3000
- **Postgres**: localhost:5432
- **Redis**: localhost:6379

To stop all services:

```powershell
yarn run server:down --profile=prod
```

### Development Docker Compose

```powershell
yarn run server:up --profile=dev
```

## Scripts

| Script         | Description                            |
| -------------- | -------------------------------------- |
| `dev`          | Run all apps in dev mode               |
| `build`        | Build all apps                         |
| `start`        | Start all apps                         |
| `dev:medusa`   | Dev mode for Medusa backend            |
| `dev:nuxt`     | Dev mode for Nuxt frontend             |
| `build:medusa` | Build Medusa backend                   |
| `build:nuxt`   | Build Nuxt frontend                    |
| `start:medusa` | Start Medusa backend                   |
| `start:nuxt`   | Start Nuxt frontend                    |
| `migrate`      | Run Medusa DB migrations               |
| `seed`         | Seed Medusa DB                         |
| `clean`        | Clean node_modules and build artifacts |

## Environment Variables

- **Medusa**: `apps/medusa/.env`
- **Nuxt**: `apps/nuxt/.env`
- **Database/Redis**: Set in `docker-compose.yml` or override with your own `.env` files.

## Troubleshooting

- Ensure Docker is running for DB/Redis.
- Use `yarn` for all package management.
- If ports are in use, update them in `.env` or `docker-compose.yml`.

## Alternative Solutions

- You can run Medusa and Nuxt independently without Docker for local development.

---

**Note:** For more details, see the `README.md` files in each app directory.
