## Project Overview

We are developing a multilingual website using modern web technologies. The project is a Next.js application with Payload CMS for content management.

## Tech Stack

### Runtime & Package Manager
- **Bun** - We use Bun as our JavaScript runtime and package manager
  - Use `bun install` to install dependencies
  - Use `bun run dev` to start the development server
  - Use `bun run build` for production builds
  - The lockfile is `bun.lock` (not package-lock.json or yarn.lock)

### Frontend
- **Next.js 16** (App Router) with **React 19**
- **TypeScript 5** for type safety
- **Tailwind CSS v4** for styling
- **shadcn/ui** (base-vega style) for UI components
- **Base UI** for headless components
- **Lucide React** for icons

### Backend & CMS
- **Payload CMS 3.69** for content management
  - Lexical editor for rich text
  - Admin panel at `/admin`
  - GraphQL API available at `/api/graphql`
- **PostgreSQL 16** database
- **Better Auth** for authentication (when needed for the app)

### Internationalization
- Supported locales: English (`en`) and French (`fr`)
- Default locale: English
- Uses `@formatjs/intl-localematcher` and `negotiator` for locale detection

### Other Tools
- **Zod** for schema validation
- **Sharp** for image processing
- **ESLint** for linting

## Project Source Code Structure

src/
├── app/
│ ├── (app)/ # Public-facing website routes
│ │ └── [locale]/ # Locale-based routing
│ ├── (payload)/ 
├── collections/ # Payload CMS collections
└── lib/ # Shared utilities and configurations


## Development Guidelines

### Critical Rules

1. **Do Not Create New Issues When Fixing Existing Ones**
   - Before making changes, understand the full context and potential side effects
   - Run the linter (`bun run lint`) after making changes
   - Test your changes thoroughly in the browser
   - If fixing a bug, verify you haven't introduced regressions

2. **Do Not Create New Issues When Developing Features**
   - Follow existing patterns and conventions in the codebase
   - Keep changes focused and minimal
   - Avoid over-engineering or adding unnecessary abstractions
   - Don't add features beyond what was requested

### Code Quality

- Follow TypeScript best practices and ensure type safety
- Follow the established component patterns with shadcn/ui
- ALWAYS rely on shadcn components when possiblr
- NEVER modify shadcn components

### Authentication

- Better Auth handles user authentication if it's needed in the app
- Configuration is in `src/lib/auth.ts`
- Client-side auth utilities are in `src/lib/auth-client.ts`

## Before Submitting Changes

1. Run the linter: `bun run lint`
2. Ensure the code compiles: `bun run build`
3. Verify there's no error