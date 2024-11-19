# [Aspirants](https://aspirants-six.vercel.app)

This platform is an AI-powered solution designed to enhance answer-writing skills for UPSC Mains aspirants. It provides AI-based answer evaluation, giving users valuable insights to improve their writing. Now open for open-source contributions, the platform invites the community to help make high-quality answer-writing practice even more accessible and effective for all UPSC aspirants.

### Our Tech Stack

1. [Next](https://nextjs.org/) : Core framework.
2. [Postgres](https://www.postgresql.org/): Database.
3. [Prisma](https://www.prisma.io/): ORM.
4. [Shadcn](https://ui.shadcn.com/): Component library.
5. [Tailwind](https://tailwindcss.com/): CSS utility.
6. [AuthJS](https://authjs.dev/): Authentication

## Getting Started

### Follow these steps to set up and run the development server for the project.

### Prerequisites

Ensure you have the following installed:

- [Docker](https://www.docker.com) : To run the PostgreSQL database in a container.
- [Node.js](https://nodejs.org/en) : For running scripts and the development server (v20.11.0).
- [npm](https://www.npmjs.com/) : For package management.

### Steps

1. Clone the repository.
   ```bash
   https://github.com/aayushpagare21-compcoder/aspirants.git
   ```
2. Create an env file
   ```bash
   npm run copy-env
   ```
3. Install all the dependencies
   ```bash
   npm install
   ```
4. Start the database server. This will spin up a postgres container.
   ```bash
   npm run start-db
   ```
5. Run all prisma migrations
   ```bash
   npm run migrate-up
   ```
6. Start the development server
   ```
   npm run dev
   ```
   Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.

For contributing please check [this](https://github.com/aayushpagare21-compcoder/aspirants/blob/main/CONTRIBUTING.md)
