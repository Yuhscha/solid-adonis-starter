# SolidJS + AdonisJS Development Commands
# Use 'just <command>' to run these recipes

# Show available commands
default:
  @just --list

# === Internal Helper Commands ===

# Docker compose command for dev container environment
_compose-dev *args:
  docker compose -f compose.yaml -f compose.devcontainer.yaml {{args}}

# Docker compose command for host environment
_compose-host *args:
  docker compose {{args}}

# Docker compose command for production environment
_compose-prod *args:
  docker compose -f compose.prod.yaml {{args}}

# === Docker Development Commands ===

# Start development environment with watch mode (Dev Container - Default)
dev:
  just _compose-dev up --watch

# Start development environment with watch mode (Host)
dev-host:
  just _compose-host up --watch

# Start development environment in background (Dev Container - Default)
dev-detached:
  just _compose-dev up -d

# Start development environment in background (Host)
dev-host-detached:
  just _compose-host up -d

# Start development environment with rebuild (Dev Container - Default)
dev-build:
  just _compose-dev up --build

# Start development environment with rebuild (Host)
dev-host-build:
  just _compose-host up --build

# Stop development environment (Dev Container - Default)
dev-down:
  just _compose-dev down

# Stop development environment (Host)
dev-host-down:
  just _compose-host down

# Show logs for all services or specific service (Dev Container - Default)
dev-logs service="":
  #!/usr/bin/env bash
  if [ -z "{{service}}" ]; then
    just _compose-dev logs -f
  else
    just _compose-dev logs -f {{service}}
  fi

# Show logs for all services or specific service (Host)
dev-host-logs service="":
  #!/usr/bin/env bash
  if [ -z "{{service}}" ]; then
    just _compose-host logs -f
  else
    just _compose-host logs -f {{service}}
  fi

# Restart all services or specific service (Dev Container - Default)
dev-restart service="":
  #!/usr/bin/env bash
  if [ -z "{{service}}" ]; then
    just _compose-dev restart
  else
    just _compose-dev restart {{service}}
  fi

# Restart all services or specific service (Host)
dev-host-restart service="":
  #!/usr/bin/env bash
  if [ -z "{{service}}" ]; then
    just _compose-host restart
  else
    just _compose-host restart {{service}}
  fi

# === Docker Production Commands ===

# Start production environment with generated APP_KEY
prod:
  #!/usr/bin/env bash
  APP_KEY=$(docker run --rm -w /workspace/apps/backend ci-image:latest node ace generate:key --show)
  APP_KEY="$APP_KEY" just _compose-prod up

# Start production environment in background with generated APP_KEY
prod-detached:
  #!/usr/bin/env bash
  APP_KEY=$(docker run --rm -w /workspace/apps/backend ci-image:latest node ace generate:key --show)
  APP_KEY="$APP_KEY" just _compose-prod up -d

# Start production environment with rebuild and generated APP_KEY
prod-build:
  #!/usr/bin/env bash
  APP_KEY=$(docker run --rm -w /workspace/apps/backend ci-image:latest node ace generate:key --show)
  APP_KEY="$APP_KEY" just _compose-prod up --build

# Build and test production with generated APP_KEY
prod-test:
  #!/usr/bin/env bash
  echo "Building production images..."
  just _compose-prod build
  echo "Generating APP_KEY..."
  APP_KEY=$(docker run --rm -w /workspace/apps/backend ci-image:latest node ace generate:key --show)
  echo "Starting production services with generated APP_KEY..."
  APP_KEY="$APP_KEY" just _compose-prod up -d
  echo "Production services started successfully!"
  echo "Frontend: http://localhost:8081"
  echo "Backend: http://localhost:8080"

# Stop production environment
prod-down:
  just _compose-prod down

# Show production logs
prod-logs service="":
  #!/usr/bin/env bash
  if [ -z "{{service}}" ]; then
    just _compose-prod logs -f
  else
    just _compose-prod logs -f {{service}}
  fi

# === Database Commands ===

# Run database migrations (Dev Container - Default)
db-migrate:
  just _compose-dev exec backend node ace migration:run

# Rollback database migrations (Dev Container - Default)
db-rollback:
  just _compose-dev exec backend node ace migration:rollback

# Fresh database migration (Dev Container - Default)
db-fresh:
  just _compose-dev exec backend node ace migration:fresh

# Seed database (Dev Container - Default)
db-seed:
  just _compose-dev exec backend node ace db:seed

# === Container Management ===

# Execute command in running container (exec) - Dev Container Default
exec service command="bash":
  just _compose-dev exec {{service}} {{command}}

# Execute command in running container (exec) - Host
exec-host service command="bash":
  just _compose-host exec {{service}} {{command}}

# Run one-time command in new container (run) - Dev Container Default
run service command="bash":
  just _compose-dev run --rm {{service}} {{command}}

# Run one-time command in new container (run) - Host
run-host service command="bash":
  just _compose-host run --rm {{service}} {{command}}

# Quick access commands for each service (Dev Container - Default)
frontend-exec command="bash":
  just _compose-dev exec frontend {{command}}

frontend-run command="bash":
  just _compose-dev run --rm frontend {{command}}

backend-exec command="bash":
  just _compose-dev exec backend {{command}}

backend-run command="bash":
  just _compose-dev run --rm backend {{command}}

postgres-exec command="bash":
  just _compose-dev exec postgres {{command}}

postgres-run command="bash":
  just _compose-dev run --rm postgres {{command}}

# Open shell in container (deprecated, use exec instead) - Dev Container Default
shell service:
  just _compose-dev exec {{service}} sh

# Clean up containers and volumes (Dev Container - Default)
clean:
  just _compose-dev down --rmi all -v --remove-orphans
  docker system prune -f

# Clean up containers and volumes (Host)
clean-host:
  just _compose-host down --rmi all -v --remove-orphans
  docker system prune -f

# Clean up everything including images (Dev Container - Default)
clean-all:
  just _compose-dev down --rmi all -v --remove-orphans
  docker system prune -af
  docker volume prune -f

# Clean up everything including images (Host)
clean-all-host:
  just _compose-host down --rmi all -v --remove-orphans
  docker system prune -af
  docker volume prune -f

# Clean up production containers and volumes
prod-clean:
  #!/usr/bin/env bash
  APP_KEY=$(docker run --rm -w /workspace/apps/backend ci-image:latest node ace generate:key --show) || APP_KEY=""
  APP_KEY="$APP_KEY" just _compose-prod down --rmi all -v --remove-orphans
  docker system prune -f

# Clean up everything for production including images
prod-clean-all:
  #!/usr/bin/env bash
  APP_KEY=$(docker run --rm -w /workspace/apps/backend ci-image:latest node ace generate:key --show) || APP_KEY=""
  APP_KEY="$APP_KEY" just _compose-prod down --rmi all -v --remove-orphans
  docker system prune -af
  docker volume prune -f

# === Development Commands (Docker) ===

# Install dependencies (Dev Container - Default)
install:
  just _compose-dev run --rm frontend pnpm install

# Build all packages (Dev Container - Default)
build:
  just _compose-dev run --rm frontend pnpm build

# Build shared package only (Dev Container - Default)
build-shared:
  just _compose-dev run --rm frontend pnpm build:shared

# Run linter
lint:
  pnpm lint

# Format code
format:
  pnpm format

# Run all tests
test:
  just test-backend && just test-frontend-run

# Run frontend tests (Dev Container - Default)
test-frontend:
  just _compose-dev run --rm frontend pnpm test

# Run frontend tests with UI (Dev Container - Default)
test-frontend-ui:
  just _compose-dev run --rm frontend pnpm test:ui

# Run frontend tests once (Dev Container - Default)
test-frontend-run:
  just _compose-dev run --rm frontend pnpm test:run

# Run frontend tests with coverage (Dev Container - Default)
test-frontend-coverage:
  just _compose-dev run --rm frontend pnpm test:coverage

# Run backend tests (Dev Container - Default)
test-backend:
  just _compose-dev run --rm backend pnpm test

# Type check (backend only) (Dev Container - Default)
typecheck:
  just _compose-dev run --rm backend pnpm typecheck

# === CI Commands ===

# Build CI Docker image
ci-build:
  docker build -f ./.github/docker/Dockerfile.ci -t ci-image:latest .

# Run complete CI pipeline locally
ci-test:
  #!/usr/bin/env bash
  echo "=== Running complete CI pipeline ==="
  just ci-lint && echo "✅ Lint passed" || exit 1
  just ci-test-frontend && echo "✅ Frontend tests passed" || exit 1
  just ci-test-backend && echo "✅ Backend tests passed" || exit 1
  just ci-typecheck && echo "✅ Backend typecheck passed" || exit 1
  just ci-build-all && echo "✅ Builds passed" || exit 1
  echo "🎉 All CI steps completed successfully!"

# Run CI lint only
ci-lint:
  docker run --rm ci-image:latest pnpm lint

# Run CI frontend tests only
ci-test-frontend:
  docker run --rm ci-image:latest pnpm --filter frontend test:run

# Run CI backend tests only
ci-test-backend:
  #!/usr/bin/env bash
  APP_KEY=$(docker run --rm -w /workspace/apps/backend ci-image:latest node ace generate:key --show)
  docker run --rm \
    -e NODE_ENV=test \
    -e HOST=0.0.0.0 \
    -e LOG_LEVEL=info \
    -e SESSION_DRIVER=cookie \
    -e APP_KEY="$APP_KEY" \
    ci-image:latest pnpm --filter backend test

# Run CI backend typecheck only
ci-typecheck:
  docker run --rm ci-image:latest pnpm --filter backend typecheck

# Run CI builds only
ci-build-all:
  #!/usr/bin/env bash
  docker run --rm ci-image:latest pnpm --filter frontend build
  docker run --rm ci-image:latest pnpm --filter backend build

# Fix Biome formatting issues in CI container
ci-format:
  docker run --rm -v "$(pwd):/workspace" ci-image:latest npx biome format --write .

# === Setup Commands ===

# Copy environment file and generate APP_KEY
env-setup:
  #!/usr/bin/env bash
  if [ ! -f "apps/backend/.env" ]; then
    echo "Copying .env.example to .env..."
    cp apps/backend/.env.example apps/backend/.env
    echo "Generating APP_KEY..."
    just generate-key
  else
    echo ".env file already exists"
  fi

# Generate APP_KEY for AdonisJS
generate-key:
  cd apps/backend && node ace generate:key

# Setup development environment
setup:
  @echo "Setting up Solid Adonis Starter..."
  pnpm install
  just env-setup
  @echo "Setup complete! Run 'just dev' for Docker or 'just local-dev' for local development."

# Show project info
info:
  @echo "Solid Adonis Starter Project"
  @echo "============================="
  @echo "Node version: $(node --version)"
  @echo "pnpm version: $(pnpm --version)"
  @echo "Just version: $(just --version)"
  @echo "Docker version: $(docker --version)"
  @echo "Project directory: $(pwd)"

claude-code-install:
  npm install -g @anthropic-ai/claude-code
