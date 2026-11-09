# FAIRhub Data Portal

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

## Prerequisites/Dependencies

You will need the following installed on your system:

- mise
- Node.js (via mise)
- pnpm (via mise)
- Docker

Make sure to install the dependencies, pull the latest database schema, and start the development server.

```bash
mise trust # only needed if you are using mise on this project for the first time
mise install

pnpm prisma:db:pull
pnpm prisma:generate
```

## Development Server

Start the development server on `http://localhost:3000`

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
