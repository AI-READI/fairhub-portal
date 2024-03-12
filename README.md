# FAIRhub Data Portal

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies, pull the latest database schema, and start the development server.

```bash
# yarn
yarn install
yarn prisma:db:pull
yarn prisma:generate
```

## Development Server

Start the development server on `http://localhost:3000`

```bash
yarn dev
```

## Production

Build the application for production:

```bash
yarn build
```

Locally preview production build:

```bash
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
