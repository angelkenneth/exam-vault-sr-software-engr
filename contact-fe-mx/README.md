# Contact Frontend Microservice

## TLDR

```bash
pnpm install

pnpm dev

pnpm build

pnpm lint && \
pnpm format && \
pnpm test:unit run && \
pnpm test:e2e
```

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
pnpm build

# Runs the end-to-end tests
pnpm test:e2e
# Runs the tests only on Chromium
pnpm test:e2e --project=chromium
# Runs the tests of a specific file
pnpm test:e2e tests/example.spec.ts
# Runs the tests in debug mode
pnpm test:e2e --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

## Initialization Scripts

```bash
pnpm create vite contact-fe-mx
```

```
◇  Select a framework:
│  Vue
│
◇  Select a variant:
│  Official Vue Starter ↗

Vue.js - The Progressive JavaScript Framework

✔ Add TypeScript? … No / (Yes)
✔ Add JSX Support? … No / (Yes)
✔ Add Vue Router for Single Page Application development? … No / (Yes)
✔ Add Pinia for state management? … No / (Yes)
✔ Add Vitest for Unit Testing? … No / (Yes)
✔ Add an End-to-End Testing Solution? › Playwright
✔ Add ESLint for code quality? › Yes
✔ Add Prettier for code formatting? … No / (Yes)
```

## References

1. [Creating React App using Vite and PNPM](https://medium.com/@sahu.jyotirmaya26/creating-react-app-using-vite-and-pnpm-746bb0f9a0c2)
2. [Form Input Bindings](https://vuejs.org/guide/essentials/forms)
3. [Dockerize Vue.js App](https://v2.vuejs.org/v2/cookbook/dockerize-vuejs-app.html)
