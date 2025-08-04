# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build application for production
- `npm start` - Start production server from built files
- `npm run lint` - Run ESLint for code quality checks
- `npm run format` - Format code with Prettier
- `npm run typecheck` - Run TypeScript type checking without emitting files

### Testing
- `npm test` - Run all test suites using Japa test runner
- Tests are organized in two suites:
  - Unit tests: `tests/unit/**/*.spec.(ts|js)` (2s timeout)  
  - Functional tests: `tests/functional/**/*.spec.(ts|js)` (30s timeout)
- Use `node ace test` directly for more control over test execution

### Database Operations
- Database commands are available through `node ace` (Lucid ORM commands loaded)
- Migration files located in `database/migrations/`

## Architecture Overview

This is an AdonisJS v6 application demonstrating social authentication with Ally, using:

### Core Stack
- **Backend**: AdonisJS v6 framework with TypeScript
- **Frontend**: Vue 3 with Inertia.js for SPA-like experience
- **Database**: PostgreSQL with Lucid ORM
- **Authentication**: AdonisJS Auth with session-based guards
- **Bundler**: Vite for frontend asset compilation

### Key Architecture Patterns

**Path Imports**: Uses AdonisJS import aliases defined in package.json:
- `#controllers/*`, `#models/*`, `#middleware/*`, etc. map to respective app directories
- `#config/*`, `#database/*`, `#start/*` for configuration and bootstrap files

**Authentication Flow**: 
- Session-based authentication with `web` guard (config/auth.ts:8)
- User model extends AuthFinder mixin for email/password authentication (app/models/user.ts:12)
- Middleware: `auth_middleware.ts`, `guest_middleware.ts`, `silent_auth_middleware.ts`

**Frontend Integration**:
- Inertia.js bridges backend and Vue 3 frontend
- Vue components in `inertia/pages/` with TypeScript support
- Single layout template: `resources/views/inertia_layout.edge`

**Database Layer**:
- PostgreSQL with Lucid ORM
- User model with standard auth fields (id, email, password, fullName, timestamps)
- Migrations handled through AdonisJS commands

### Application Structure
- Routes defined in `start/routes.ts` (currently single home route)
- Models use Lucid ORM with decorators for column definitions
- Middleware pipeline configured in `start/kernel.ts`
- Configuration files in `config/` for all services (database, auth, sessions, etc.)

### Development Notes
- Hot reloading configured for controllers and middleware via `hotHook` in package.json
- Experimental flags enabled: `mergeMultipartFieldsAndFiles`, `shutdownInReverseOrder`
- Build process copies Edge templates and public assets via metaFiles configuration