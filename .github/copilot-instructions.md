# Copilot Instructions for SolidStart + AdonisJS Starter

This project is a full-stack web application starter using SolidJS for the frontend and AdonisJS for the backend API.

## Project Structure

- `apps/frontend/` - SolidStart application (TypeScript, Vite)
- `apps/backend/` - AdonisJS API server (TypeScript, Node.js)
- `apps/shared/` - Shared types and utilities between frontend and backend
- `docker/` - Docker configuration files

## Development Guidelines

### Code Style
- Use TypeScript throughout the project
- Follow Biome formatting rules (configured in `biome.json`)
- Use single quotes for strings
- Arrow function parentheses only when needed
- Semicolons only when needed (ASI style)

### Frontend (SolidStart)
- Use SolidJS reactive patterns and components
- Leverage SolidStart's file-based routing
- Use TypeScript for type safety
- Follow SolidJS best practices for reactivity

### Backend (AdonisJS)
- Use AdonisJS v6 patterns and conventions
- Implement proper validation using AdonisJS validators
- Use Lucid ORM for database operations
- Follow REST API conventions
- Implement proper error handling and HTTP status codes

### Database
- PostgreSQL is the primary database
- Use AdonisJS migrations for schema changes
- Use seeders for development data
- Follow proper database naming conventions

## Available Commands

### Docker Development
- `just dev` - Start development environment
- `just dev-down` - Stop development environment
- `just db-migrate` - Run database migrations
- `just db-seed` - Seed database with test data

### Local Development
- `just install` - Install dependencies
- `just local-dev` - Start local development servers
- `just build` - Build all packages
- `just format` - Format code with Biome
- `just lint` - Run linting
- `just test` - Run tests
- `just typecheck` - Run TypeScript type checking

## Environment Setup

1. Copy `.env.example` to `.env` in the backend app
2. Generate APP_KEY using `just generate-key`
3. Configure database connection in `.env`
4. Run migrations and seeders

## API Development

- Create controllers in `apps/backend/app/controllers/`
- Define routes in `apps/backend/start/routes.ts`
- Use validators for input validation
- Implement proper authentication when needed
- Follow RESTful conventions

## Frontend Development

- Create components in `apps/frontend/src/components/`
- Use file-based routing in `apps/frontend/src/routes/`
- Implement proper type safety with shared types
- Use SolidJS resource patterns for data fetching
- Handle loading and error states appropriately

## Testing

- Write unit tests for backend controllers and services
- Implement E2E tests for critical user flows
- Use appropriate testing frameworks for each environment
- Ensure database migrations and API endpoints are tested

## Common Patterns

- Share types between frontend and backend using the shared package
- Use proper error boundaries in SolidJS
- Implement proper CORS configuration
- Use environment variables for configuration
- Follow security best practices

## When Adding New Features

1. Define shared types in `apps/shared/` if needed
2. Implement backend API endpoints with proper validation
3. Create frontend components and pages
4. Add appropriate tests
5. Update documentation if necessary

## Code Quality

- Run `just format` before committing
- Ensure `just lint` passes
- Run `just typecheck` to verify TypeScript
- Test functionality with `just test`
- Use meaningful commit messages