# Solid Adonis Starter

A full-stack starter template with SolidStart + AdonisJS in a monorepo configuration.
Get started with development immediately using a Docker Compose-based development environment.

## Features

- **Frontend**: SolidStart (apps/frontend)
- **Backend**: AdonisJS v6 (apps/backend)
- **Database**: PostgreSQL 17.6
- **Package Manager**: pnpm
- **Development Environment**: Docker Compose + DevContainer
- **Task Runner**: Just
- **Code Quality**: Biome + ESLint
- **Testing**: Vitest (frontend) + Japa (backend)
- **CI/CD**: GitHub Actions with Docker-based testing

## Requirements

- Docker & Docker Compose
- [Just](https://github.com/casey/just) (command runner)

## Quick Start

### Option 1: Command Line Setup
```bash
# 1. Clone the repository
git clone <repository-url>
cd solid-adonis-starter

# 2. Remove existing git history and initialize new repository
rm -rf .git
git init
git add .
git commit -m "Initial commit"

# 3. Initial setup (environment variables + dependencies)
just setup

# 4. Start development environment
just dev
```

### Option 2: VS Code + GitHub Integration
```bash
# 1. Clone the repository
git clone <repository-url>
cd solid-adonis-starter

# 2. Remove existing git history
rm -rf .git

# 3. Open in VS Code
code .

# 4. Use VS Code's "Publish to GitHub" feature:
#    - Open Command Palette (Ctrl/Cmd + Shift + P)
#    - Run "Git: Initialize Repository"
#    - Run "GitHub: Publish to GitHub"
#    - Choose repository name and visibility

# 5. Initial setup (environment variables + dependencies)
just setup

# 6. Start development environment
just dev
```

**Access URLs:**
- Frontend: http://localhost:8081
- Backend API: http://localhost:8080
- Database: localhost:5432

## Development Commands

### Main Commands (Recommended)

```bash
# List available commands
just

# Start development environment
just dev

# Start in background
just dev-detached

# Stop services
just dev-down

# View logs
just dev-logs           # All services
just dev-logs frontend  # Specific service

# Database operations
just db-migrate         # Run migrations
just db-seed           # Seed data
just db-fresh          # Fresh migration (drop + recreate)

# Container operations
just exec backend bash # Connect to backend container
just exec frontend bash # Connect to frontend container

# Cleanup
just clean             # Remove containers, images & volumes
just clean-all         # Complete cleanup + system cleanup
```

### Docker Compose (Direct)

```bash
# Development environment
docker compose up -d
docker compose logs -f

# Production environment
docker compose -f compose.prod.yaml up -d

# Stop & remove
docker compose down
docker compose down -v  # Also remove volumes
```

## Project Structure

```
.
├── apps/
│   ├── frontend/          # SolidStart application
│   │   ├── src/routes/   # Frontend routes
│   │   └── tests/        # Frontend tests (Vitest)
│   ├── backend/           # AdonisJS API server
│   │   ├── app/          # Controllers, models, middleware
│   │   ├── start/        # Routes configuration
│   │   └── tests/        # Backend tests (Japa)
│   └── shared/            # Shared utilities and types
├── docker/               # Dockerfiles for production
├── .github/
│   ├── workflows/        # GitHub Actions CI/CD
│   └── docker/          # CI-specific Dockerfiles
├── .devcontainer/        # VS Code DevContainer config
├── .vscode/              # VS Code settings
├── compose.yaml          # Development environment
├── compose.prod.yaml     # Production environment (Dockerfile.prod testing)
├── justfile              # Task runner configuration
├── biome.json            # Biome configuration
├── eslint.config.js      # ESLint configuration
├── pnpm-workspace.yaml   # pnpm workspace config
└── tsconfig.json         # TypeScript configuration
```

## Development Environment Details

- **Node.js**: v24
- **AdonisJS CLI**: Pre-installed
- **DevContainer**: VS Code integrated development environment
- **PostgreSQL**: v17.6
- **Just**: Tab completion enabled
- **Docker**: Graceful shutdown handling with proper signal processing
- **HMR**: Hot Module Replacement configured for Docker environments

## Common Workflows

### Development Commands
| Task | Command |
|------|---------|
| Initial setup | `just setup` |
| Start development | `just dev` |
| View logs | `just dev-logs [service]` |
| Database operations | `just db-migrate`, `just db-seed` |
| Container access | `just exec backend bash` |
| Reset environment | `just clean && just dev` |

### Code Quality Commands
| Task | Command |
|------|---------|
| Format code | `just format` |
| Run linter | `just lint` |
| Type checking | `just typecheck` |
| Run tests | `just test` |
| Run frontend tests | `just test-frontend-run` |
| Run backend tests | `just test-backend` |
| Production build | `just build` |

### Backend API Testing

The backend includes comprehensive test coverage:

**Health Endpoint Tests** (`tests/functional/health.spec.ts`):
- Health status validation
- Timestamp format verification
- Consistent response structure

**Route Tests** (`tests/functional/routes.spec.ts`):
- API Routes: Root endpoint (`/`)
- Shared API endpoints (`/api/shared/*`):
  - Greeting generation with validation
  - Mock user generation with ID validation
  - Email validation with various test cases
  - Combined data endpoint (`/api/shared/all`)
- Error handling: 404 responses and invalid endpoints

All tests use the Japa testing framework with API client assertions.

### CI Commands
| Task | Command |
|------|---------|
| Build CI image | `just ci-build` |
| Run complete CI pipeline | `just ci-test` |
| Run CI lint only | `just ci-lint` |
| Run CI frontend tests | `just ci-test-frontend` |
| Run CI typecheck | `just ci-typecheck` |
| Run CI builds | `just ci-build-all` |
| Fix formatting | `just ci-format` |

## Troubleshooting

### Port already in use error
```bash
just clean
just dev
```

### Database connection error
```bash
just db-fresh
```

### Dependency issues
```bash
just clean-all
just setup
```

### CI test failures
```bash
# Fix formatting issues
just ci-format

# Rebuild CI image and run tests
just ci-build
just ci-test
```

## Documentation

- [日本語版 README](README.ja-JP.md)

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

Pull requests and issue reports are welcome. For major changes, please open an issue first to discuss what you would like to change.