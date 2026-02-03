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

## Unit 2.31 – Feedback Layers

### Implemented Feedback
- Toast notifications using `react-hot-toast`
- Confirmation modal before saving data
- Loader shown during async operations

### User Flow
1. User submits form
2. Confirmation modal appears
3. Loader shown during save
4. Toast shows success or error

### Accessibility
- aria-live used for loaders and toasts
- modal uses role="dialog" and aria-modal
- keyboard-friendly controls

### UX Reflection
Feedback layers improve clarity and trust by:
- preventing accidental actions
- reducing uncertainty during async work
- clearly communicating system state


## Unit 2.32 – Responsive & Theme‑Aware UI 

- Built a responsive homepage using semantic HTML and inline styles
- Ensured mobile‑first layout with max‑width and flexible spacing
- Prepared structure for future light/dark theming using CSS variables
- Verified layout across mobile, tablet, and desktop viewports

### Reflection
Even without Tailwind, responsive and accessible UIs can be achieved
using semantic HTML, spacing discipline, and scalable layout patterns.


## Unit 2.33 – Loading & Error States

### Why this matters
Handling loading and error states improves user trust and prevents blank screens or crashes during async operations.

### Implementation
- Used Next.js App Router `loading.tsx` for skeleton UI
- Used `error.tsx` for route-level error boundaries
- Implemented retry using `reset()`

### States demonstrated
- Loading skeleton during slow network
- Error fallback UI with retry button
- Successful render after retry

### Reflection
Skeleton loaders give users visual context while waiting.
Error boundaries prevent crashes and improve resilience.

## Unit 2.34 – JWT Authentication & Refresh Tokens

### JWT Structure
- Header: Algorithm & token type
- Payload: userId, role, expiry
- Signature: Server-side verification

### Token Strategy
- Access Token: 15 minutes (Authorization header)
- Refresh Token: 7 days (HTTP-only cookie)

### Security Measures
- No tokens stored in localStorage
- Refresh token stored as HttpOnly + SameSite cookie
- Short-lived access tokens prevent replay attacks

### Refresh Flow
1. Client sends request with access token
2. If expired → 401
3. Client calls `/api/auth/refresh`
4. New access token issued automatically

### Threat Mitigation
- XSS: Tokens not accessible to JS
- CSRF: SameSite cookies
- Replay Attacks: Token expiry + rotation

##  Role-Based Access Control (Unit 2.35)

### Roles & Permissions

| Role   | Permissions                  |
|-------|------------------------------|
| ADMIN | create, read, update, delete |
| EDITOR| read, update                 |
| USER  | read                         |

### Enforcement Strategy
- Roles are embedded in JWT payloads
- Permissions are evaluated in API middleware
- UI components conditionally render based on role

### Security Guarantees
- Backend enforcement prevents privilege escalation
- Unauthorized access returns HTTP 403
- All RBAC decisions are logged


## Unit 2.36 – Input Sanitization & Security (OWASP)

### Why This Matters
User input is never trusted. Without sanitization, applications are vulnerable
to XSS and SQL Injection attacks.

### XSS Prevention
- All user inputs are sanitized using `sanitize-html`
- HTML tags and attributes are stripped before storing data
- React’s default output escaping is relied upon for rendering

### SQL Injection Prevention
- Prisma ORM is used for all database operations
- Parameterized queries prevent SQL injection by design
- No raw SQL queries are constructed from user input

### Before / After Example
**Input:**
```html
<script>alert("XSS")</script>
```

## 🔐 Unit 2.37 – Secure Communication & Security Headers

This unit focuses on enforcing HTTPS and protecting the application using essential security headers.

### Security Headers Implemented

| Header | Purpose |
|------|--------|
| HSTS | Forces HTTPS to prevent MITM attacks |
| CSP | Restricts scripts, styles, and assets to trusted sources |
| X-Frame-Options | Prevents clickjacking |
| X-Content-Type-Options | Prevents MIME sniffing |
| Referrer-Policy | Limits referrer leakage |

### Configuration Location
- Global headers: `next.config.js`
- API CORS protection: `app/api/users/route.ts`

### CORS Strategy
- Only trusted frontend origin allowed
- No wildcard (`*`) used
- Explicit methods and headers defined

### Verification
- Headers verified via Chrome DevTools → Network tab
- Confirmed presence of HSTS, CSP, and CORS headers

### Reflection
Security headers act as a silent defense layer. They significantly reduce risks like XSS, MITM, and clickjacking without impacting user experience. Careful CSP configuration ensures security without breaking functionality.


## 🔐 Unit 2.40 – Secure Secret Management

### Why Secret Management?
Environment variables contain sensitive credentials such as database URLs and JWT secrets. Storing them directly in `.env` files can lead to leaks. Cloud secret managers provide encrypted, access-controlled storage.

### Implementation
- Used **AWS Secrets Manager** for secure secret storage.
- Secrets are retrieved at **runtime** using AWS SDK.
- Local development uses safe fallback values.
- Secrets are never hardcoded or logged.

### Security Measures
- IAM-based access (read-only secrets)
- Encrypted at rest and in transit
- Supports secret rotation without redeploying the app

### Verified By
- Runtime API test (`/api/secrets-test`)
- Console logs showing successful retrieval (keys only)

### Reflection
This approach improves security, scalability, and production readiness by separating configuration from code.


