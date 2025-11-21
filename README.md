# ZPL Kit

Monorepo for ZPL Kit project.

## Structure

- `apps/react-zpl` - React ZPL library
- `docs` - Documentation site (RSPress)
- `tests` - Test suite (Vitest)
- `demos` - Demo applications

## Getting Started

### Prerequisites

- Node.js >= 22.0.0
- pnpm >= 10.0.0

### Installation

```bash
pnpm install
```

### Development

```bash
# Run all apps in development mode
pnpm dev

# Run docs in development mode
pnpm docs:dev

# Run tests
pnpm test
```

### Build

```bash
# Build all apps
pnpm build

# Build docs
pnpm docs:build
```

### Linting & Formatting

```bash
# Lint code
pnpm lint

# Format code
pnpm format

# Check formatting
pnpm format:check
```
