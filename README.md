# [AspirantsAI](https://www.aspirantsai.com)

This platform is an AI-powered solution designed to enhance UPSC preparation for aspirants. It is now open to open-source contributions, inviting the community to collaborate and improve its features.

It provides various AI backed tools

### Tools

1. [AI Smartcheck](https://www.aspirantsai.com/ai/smartcheck)
2. [AI AffairsQuest](https://www.aspirantsai.com/ai/affairs-quest)

### Our Tech Stack

1. [Next](https://nextjs.org/)
2. [Postgres](https://www.postgresql.org/)
3. [Prisma](https://www.prisma.io/)
4. [Shadcn](https://ui.shadcn.com/)
5. [Tailwind](https://tailwindcss.com/)
6. [AuthJS](https://authjs.dev/)
7. [Langchainjs](https://js.langchain.com/)
8. [GeminiAI](https://gemini.google.com/)
9. [AWS Textract](https://aws.amazon.com/textract/)
10. [AWS S3](https://aws.amazon.com/s3/)
11. [NeonDB](https://neon.tech)
12. [Upstash](https://upstash.com)
13. [Vercel](https://vercel.com)

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
