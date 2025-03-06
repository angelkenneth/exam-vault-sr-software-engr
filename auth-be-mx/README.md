## Authentication Backend Microservice

## TLDR

```bash
pnpm install && \
pnpm exec drizzle-kit migrate

pnpm start

pnpm format:fix

pnpm test
```

### Steps

1. `cd` into the root directory
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up the SQLite3 database and its schemas:

   ```bash
   pnpm exec drizzle-kit migrate
   ```

## Database

```bash
pnpm exec drizzle-kit generate
```

## Initialization Scripts

```bash
pnpm create next-app@latest auth-be-mx --typescript --eslint --src-dir --turbopack --import-alias "@/*" --api
```

## References

1. [How to install nextjs with pnpm](https://medium.com/frontendweb/how-to-install-nextjs-with-pnpm-a958f1b3e9ad)
2. [Setting Up a Next.js 13 Project with ESLint and Prettier](https://medium.com/@rifantechguy55/setting-up-a-next-js-13-project-with-eslint-and-prettier-735c3ccfd26c)
3. [Setting up Vitest](https://vitest.dev/guide/)
4. [How to connect Next.js to a database (in 5 minutes)](https://www.youtube.com/watch?v=wTGaoB8EL-4)
5. [Get Started with Drizzle and SQLite](https://orm.drizzle.team/docs/get-started/sqlite-new)
6. [Guide to app architecture](https://developer.android.com/topic/architecture)
7. [How to Hash Passwords with bcrypt in Node.js](https://www.freecodecamp.org/news/how-to-hash-passwords-with-bcrypt-in-nodejs/)
