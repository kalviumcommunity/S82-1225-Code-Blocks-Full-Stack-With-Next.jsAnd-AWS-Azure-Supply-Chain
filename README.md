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

## Unit 2.17 – API Route Structure & Naming

API routes are implemented using the Next.js App Router.

### Features
- RESTful, resource-based API design
- File-based routing
- Dynamic routes for resource identifiers

### Endpoints
- GET /api/health
- GET /api/users
- POST /api/users
- GET /api/habits
- POST /api/habits
- GET /api/habits/:id
- DELETE /api/habits/:id

## Unit 2.18 – Global API Response Handler

A centralized API response utility is implemented to standardize all backend responses.

### Features
- Consistent success and error response structure
- Centralized response handling
- Improved frontend integration and debugging

All API routes now return predictable JSON responses.

## Unit 2.19 – API Error Handling & Custom Errors

Custom API error classes are implemented to standardize backend error handling.

### Features
- Custom error classes with HTTP status codes
- Centralized error handler
- Clean and predictable API error responses

This improves debugging, maintainability, and frontend integration.

## Unit 2.20 – Request Validation with Zod

Request validation is implemented using Zod to ensure API safety.

### Features
- Schema-based request validation
- Early rejection of invalid input
- Clean error messages with proper status codes

This ensures robust and predictable backend APIs.

## Unit 2.21 – Authentication Basics

Authentication foundations are implemented using JWT.

### Features
- Password hashing with bcrypt
- JWT token generation and verification
- Login endpoint issuing access tokens

This establishes the foundation for secure authentication and protected routes.

## Unit 2.22 – Protected Routes & Auth Middleware

Authentication middleware is implemented to protect API routes.

### Features
- JWT-based route protection
- Centralized auth verification
- Clear separation of public and protected endpoints

Protected routes now require valid authorization tokens.

## Unit 2.23 – User Registration (Signup)

User registration functionality is implemented with proper validation and security.

### Features
- Signup API with email & password
- Zod-based request validation
- Password hashing with bcrypt
- Duplicate user prevention

This enables secure user onboarding.

# Unit 2.29 – Client-Side Data Fetching with SWR

This unit demonstrates efficient client-side data fetching in Next.js using **SWR (Stale-While-Revalidate)**.


##  Why SWR?

SWR is a React hook library by Vercel that improves UX and performance by:

- Returning cached (stale) data instantly
- Revalidating data in the background
- Avoiding unnecessary network requests
- Supporting optimistic UI updates

## Installation

```bash
npm install swr
```


## Unit 2.30 – Forms with React Hook Form & Zod

### Tools Used
- React Hook Form for form state management
- Zod for schema-based validation
- @hookform/resolvers for integration

### Features
- Schema-driven validation
- Reusable FormInput component
- Accessible labels and error messages
- Type-safe form data

### Validation Rules
- Email must be a valid email address
- Role must be USER or ADMIN

### Reflection
React Hook Form minimized re-renders and simplified form state,
while Zod ensured predictable and reusable validation logic.
This combination improves maintainability and accessibility.
