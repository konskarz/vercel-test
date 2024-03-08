# Fastify + Vercel & Postgres + Neon

Simple API with Vercel and Neon

## Demo

https://vercel-test-konskar.vercel.app/

## Run
- Install PostgreSQL
- Create a new Database
- Create `.env` & `.postgratorrc.json` to store sensitive configuration values
~~~
npm i
npx postgrator
npm run dev
~~~

## Deploy
- Log in to Neon account
- Set up a new project
- Create a new Database
- Add tables using the Neon SQL Editor
- Log in to Vercel account
- Set up a new project
- Import Git Repository
- Set Environment Variables
