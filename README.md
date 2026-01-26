## Unit 2.3 – Advanced Data Fetching (SSG, SSR, ISR)

This project demonstrates all three Next.js App Router rendering strategies.

### Static Site Generation (SSG)
- Route: /about
- Generated at build time
- Used for static informational content

### Server-Side Rendering (SSR)
- Route: /dashboard
- Rendered on every request
- Used for real-time, user-specific data

### Incremental Static Regeneration (ISR)
- Route: /events
- Revalidated every 60 seconds
- Balances performance and freshness

Screenshots are included under screenshots/unit-2-3/.

## Unit 2.5 – Cloud Deployments 101 (Docker → CI/CD → Cloud)

This unit introduces the foundations of cloud deployment using Docker and CI/CD.

### Docker
- The application is containerized using Docker
- Docker ensures consistent behavior across environments

### CI/CD
- GitHub Actions is used to automate build verification
- Every push and pull request triggers a build check

### Cloud Deployment Flow
Code changes follow this path:
GitHub → CI Pipeline → Docker Image → Cloud Service (AWS/Azure)

Actual cloud deployment will be implemented in later units.

## Unit 2.9 – TypeScript & ESLint Configuration

The project uses strict TypeScript settings and ESLint rules to ensure code quality and maintainability.

### TypeScript
- Strict mode enabled
- Prevents unsafe types and runtime errors
- Enforces consistent coding patterns

### ESLint
- Enforces best practices and clean code
- Highlights unused variables and unsafe comparisons
- Integrated with Next.js core web vitals

This setup ensures the codebase remains scalable and reliable as the project grows.

## Unit 2.10 – Environment Variable Management

The project uses Next.js best practices for environment variable management.

### Client-Side Variables
- Variables prefixed with `NEXT_PUBLIC_`
- Safe to expose in the browser
- Used for configuration such as app name and API base URL

### Server-Side Variables
- No `NEXT_PUBLIC_` prefix
- Used for secrets such as database URLs and JWT keys
- Accessed only on the server via centralized helpers

This approach ensures security, clarity, and environment consistency.

## Unit 2.11 – Team Branching & PR Workflow

This project follows a PR-based Git workflow to ensure code quality and safe collaboration.

### Branching Strategy
- main: stable production-ready code
- feature/*: new features
- fix/*: bug fixes
- chore/*: maintenance and configuration

### Pull Requests
- All changes are merged via PRs
- PR template enforces consistency
- CI checks run before merge

This workflow supports scalability and reduces risk as the project grows.

## Unit 2.12 – Docker Compose Setup for Local Development

The project uses Docker Compose to manage local development environments.

### Setup
- Application runs inside a Docker container
- Environment variables are loaded using env files
- All services share a common Docker network

### Running Locally with Docker
```bash
docker compose up --build

## Unit 2.13 – PostgreSQL Schema Design

The database schema is designed using relational principles to support the Habit Tracker application.

### Core Tables
- users: stores authentication and user data
- habits: stores habits created by users
- habit_completions: tracks daily habit completion

### Design Considerations
- Normalized schema to avoid data duplication
- Foreign key constraints ensure referential integrity
- Unique constraints prevent duplicate daily completions
- Schema supports efficient streak calculations

Refer to `docs/db/schema.sql` and the ER diagram for details.

## Unit 2.14 – Prisma ORM Setup

Prisma ORM is integrated to manage database access and schema definitions.

### Setup
- Prisma initialized with PostgreSQL datasource
- Schema models match the designed database structure
- Prisma Client generated for type-safe queries

### Client Initialization
A centralized Prisma client is configured to ensure safe reuse across the application and prevent connection leaks in development.

This setup prepares the project for database migrations and queries in upcoming units.

## Unit 2.15 – Database Migrations & Seed Scripts

Database migrations and seed scripts are implemented using Prisma.

### Migrations
- Prisma migrations are used to apply schema changes
- Migrations ensure reproducible database setup

### Seeding
- Seed script populates sample users and habits
- Useful for local development and testing

This setup ensures consistent database state across environments.
