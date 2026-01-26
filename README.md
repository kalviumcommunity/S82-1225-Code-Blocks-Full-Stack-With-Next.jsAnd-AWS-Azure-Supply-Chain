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
