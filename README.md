# Fastify + Vercel & Postgres + Neon

Simple API with Vercel and Neon

## Run
- Install [PostgreSQL](https://www.postgresql.org/download/)
- Create a new Database
- Create `.env` & `.postgratorrc.json` to store sensitive configuration values
~~~
npm i
npx postgrator
npm run dev
~~~

## Deploy DB
- Log in to [Neon](https://neon.tech/) account
- Set up a new project
- Create a new Database
- Add tables using the Neon SQL Editor

## Deploy API
- Log in to [Vercel](https://vercel.com/) account
- Set up a new project
- Import Git Repository
- Set Environment Variables
