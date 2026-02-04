# Time Tracker - Code Improvements

This document outlines the refactoring improvements made to the Time Tracker codebase.

## Architecture Overview

### Module Structure

The frontend JavaScript has been organized into focused modules under `public/modules/`:

- **`utils.js`** — Utility functions (text parsing, formatting, UUIDs)
- **`security.js`** — Security helpers (URL validation, safe DOM manipulation, XSS prevention)
- **`api.js`** — API communication (fetch wrappers for state/books)
- **`state.js`** — Global application state and accessors
- **`monsters.js`** — Monster book normalization and queries
- **`calendar.js`** — Calendar/date conversion and formatting

### Backend Improvements

**`server.js`** enhancements:
- ✅ Error logging with logger utility
- ✅ Atomic writes using temp files + rename
- ✅ Path safety checks (prevents path traversal)
- ✅ Request size limits (1-5MB configurable)
- ✅ Request timeouts (30s)
- ✅ Improved `renderIncludes` with depth limit and try/catch

## Development Setup

### Installation

```bash
npm install
```

### Scripts

```bash
# Start server
npm start

# Development (with auto-reload - requires nodemon)
npm run dev

# Lint code with ESLint (auto-fix)
npm run lint

# Format code with Prettier
npm run format

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Configuration Files

- **`.eslintrc.json`** — Linting rules (ES2021, browser/node/jest environments)
- **`.prettierrc.json`** — Code formatting (2-space indent, 100-char line length)
- **`jest.config.js`** — Test configuration (50% coverage threshold)

## Security

### XSS Prevention

New security utilities prevent common XSS vulnerabilities:

```javascript
// Safe background-image assignment
setBackgroundImage(element, userUrl);

// Safe URL opening
safeOpenUrl(userProvidedUrl);

// URL validation
if (isSafeUrl(url)) {
  // Safe to use
}
```

### Path Traversal Prevention

File serving validates all paths:
- Resolved path must be within `public/` or `books/` directories
- Returns 403 Forbidden for invalid requests
- Logged for security monitoring

### Request Limits

- POST body size: 1-5MB (configurable per endpoint)
- Request timeout: 30 seconds
- File uploads validated before writing

## Testing

Unit tests are located in `__tests__/`:

- **`utils.test.js`** — Tests for utility functions
- **`calendar.test.js`** — Tests for date/calendar functions

Run tests with:
```bash
npm test
```

Coverage thresholds enforce:
- 50%+ branch coverage
- 50%+ function coverage
- 50%+ line coverage
- 50%+ statement coverage

## Migration Guide

### For Developers

When adding new code:

1. **Utilities** → Move to `public/modules/utils.js`
2. **Security checks** → Use `public/modules/security.js`
3. **API calls** → Wrap in `public/modules/api.js`
4. **Add tests** → Create in `__tests__/`
5. **Lint before commit** → `npm run lint`

### Gradual Migration

The existing `public/script.js` can coexist with modules. Eventually, migrate:

```javascript
// Old (in script.js)
const stripHtml = (v) => v.replace(/<[^>]*>/g, '');

// New (in modules/utils.js)
// Already extracted - import and use
```

## Performance Recommendations

### Frontend

1. **Debounce `saveState()`** — Currently POSTs on every change; add 1-2s debounce
2. **Virtual scrolling** — For long monster/event lists (1000+ items)
3. **Lazy load modules** — Use dynamic `import()` for optional features

### Backend

1. **Stream large files** — Use `fs.createReadStream()` for images
2. **Caching headers** — Set `ETag`, `Cache-Control` on static assets
3. **Compression** — Add gzip middleware for responses

## Next Steps

### High Priority

- [ ] Install devDependencies: `npm install --save-dev`
- [ ] Run linter: `npm run lint`
- [ ] Run tests: `npm test`
- [ ] Add `.prettierrc` to CI/CD pipeline

### Medium Priority

- [ ] Split `public/script.js` into `modules/main.js`, `modules/render.js`
- [ ] Add E2E tests (Cypress, Playwright)
- [ ] Set up CI/CD (GitHub Actions, GitLab CI)
- [ ] Add pre-commit hooks (husky) for lint + format

### Future

- [ ] Migrate to lightweight framework (Preact, Lit)
- [ ] Add TypeScript for type safety
- [ ] Implement request debouncing for state saves
- [ ] Add content security policy (CSP) headers

## Security Checklist

- ✅ Path traversal protection
- ✅ Request size limits
- ✅ XSS prevention (URL validation, safe DOM)
- ✅ Error logging (no stack traces to client)
- ⚠️ TODO: CORS policy (if API accessed cross-origin)
- ⚠️ TODO: Authentication (if deployed publicly)
- ⚠️ TODO: CSP headers
- ⚠️ TODO: HTTPS enforced (if production)

## References

- [ESLint Docs](https://eslint.org/)
- [Prettier Docs](https://prettier.io/)
- [Jest Docs](https://jestjs.io/)
- [OWASP XSS Prevention](https://owasp.org/www-community/attacks/xss/)
