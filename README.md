# REST API — Book Directory (TypeScript)

[![build status](https://img.shields.io/badge/build-pending-lightgrey)]() [![license](https://img.shields.io/badge/license-MIT-blue)]() [![language](https://img.shields.io/badge/language-TypeScript-blue)]()

A production-ready, well-documented REST API for managing a book directory, implemented in TypeScript. This repository provides a clear structure, examples, and helpful scripts for development, testing, containerization, and CI.

Table of contents
- [About](#about)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment variables](#environment-variables)
  - [Install](#install)
  - [Run (development & production)](#run-development--production)
  - [Docker](#docker)
- [API](#api)
  - [Models](#models)
  - [Endpoints](#endpoints)
  - [Examples](#examples)
- [Validation & error handling](#validation--error-handling)
- [Testing](#testing)
- [Linting & formatting](#linting--formatting)
- [CI / CD](#ci--cd)
- [Project structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## About
This project is a TypeScript REST API that manages a collection of books (the "book directory"). It demonstrates common, production-oriented practices including typed models, request validation, structured routing, tests, linting/formatting, Docker support, and CI integration.

Use this repository as:
- a starting point for new TypeScript REST APIs
- a learning resource for conventions (routing, validation, error handling)
- a template to adapt to your own domain models

## Features
- CRUD operations for books (list, get, create, update, delete)
- Pagination, filtering and basic search
- Request validation and typed request/response models
- Centralized error handling and structured API errors
- Unit and integration tests (Jest + Supertest suggested)
- ESLint + Prettier config for consistent code style
- Dockerfile and docker-compose for local dev & production
- Example GitHub Actions workflow for CI

## Tech stack
- Node.js (LTS)
- TypeScript
- Express (or an equivalent web framework — adjust if using Fastify/Nest)
- Jest + Supertest for tests
- ESLint, Prettier
- ts-node / nodemon for local development
- Docker for containerization

## Getting started

### Prerequisites
- Node.js 18+ (or LTS)
- npm 9+ or yarn
- Docker (optional, for containers)

### Environment variables
Create a `.env` file at the project root (development) or set environment variables in your deployment environment.

Example `.env`:
```bash
NODE_ENV=development
PORT=4000
DATABASE_URL=postgres://user:password@localhost:5432/bookdb
JWT_SECRET=replace-this-with-a-secure-secret
LOG_LEVEL=info
```

Document any additional env variables your implementation requires (e.g., Redis URL, SMTP creds).

### Install
```bash
# using npm
npm install

# or using yarn
yarn install
```

### Run (development & production)
Development (with hot-reload)
```bash
npm run dev
# or
yarn dev
```

Build & run production
```bash
npm run build
npm start
```

Typical package.json scripts to include:
```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc -p tsconfig.build.json",
    "start": "node dist/server.js",
    "test": "jest --runInBand",
    "lint": "eslint 'src/**/*.{ts,tsx}'",
    "format": "prettier --write 'src/**/*.{ts,tsx,json,md}'"
  }
}
```

### Docker
Build:
```bash
docker build -t book-dir-api:latest .
```

Run with docker-compose (example):
```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
      - PORT=4000
      - DATABASE_URL=${DATABASE_URL}
```

## API

> Note: Adjust base path and host according to your configuration. This README uses `/api` as the base path in examples.

Base URL (dev):
- http://localhost:4000/api

### Models
Book (example)
```ts
interface Book {
  id: string;            // uuid
  title: string;
  author: string;
  summary?: string;
  isbn?: string;
  publishedAt?: string;  // ISO date
  createdAt: string;
  updatedAt: string;
}
```

### Endpoints
- GET /api/books
  - List books (supports pagination & filtering)
  - Query params: page, limit, q (search), author, publishedBefore, publishedAfter
- POST /api/books
  - Create new book
  - Body: title, author, summary, isbn, publishedAt
- GET /api/books/:id
  - Get single book by id
- PUT /api/books/:id
  - Update book (partial or full)
- DELETE /api/books/:id
  - Remove book

Authentication endpoints (optional)
- POST /api/auth/login
- POST /api/auth/register
- POST /api/auth/refresh

Health & meta
- GET /api/health
- GET /api/metrics (optional)

### Examples

List books (first page, 10 per page)
```bash
curl "http://localhost:4000/api/books?page=1&limit=10"
```

Create a book
```bash
curl -X POST http://localhost:4000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Example Book",
    "author": "Jane Doe",
    "summary": "A short description",
    "isbn": "978-1-23456-789-7",
    "publishedAt": "2025-07-01"
  }'
```

Get book by id
```bash
curl http://localhost:4000/api/books/<book-id>
```

Update book
```bash
curl -X PUT http://localhost:4000/api/books/<book-id> \
  -H "Content-Type: application/json" \
  -d '{"title": "New title"}'
```

Delete book
```bash
curl -X DELETE http://localhost:4000/api/books/<book-id>
```

If using JWT auth, include:
```http
Authorization: Bearer <token>
```

## Validation & error handling
- Validate request payloads with a schema validator (Zod, Joi, Yup, or class-validator + class-transformer)
- Return consistent error shape:
```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    { "field": "title", "message": "Title is required" }
  ]
}
```
- Use a centralized error handler middleware to format errors and set appropriate HTTP codes.

## Testing
Suggested test tooling:
- Jest for unit tests
- Supertest for HTTP/integration tests

Example test commands:
```bash
npm run test
# watch mode
npm run test -- --watch
```

Example of an integration test (Jest + Supertest)
```ts
import request from 'supertest';
import { app } from '../src/app';

describe('Books API', () => {
  it('creates a book', async () => {
    const res = await request(app)
      .post('/api/books')
      .send({ title: 'T', author: 'A' })
      .expect(201);
    expect(res.body).toHaveProperty('id');
  });
});
```

Test considerations:
- Use an isolated test database (in-memory, Docker, or test schema)
- Reset DB between tests
- Seed fixtures for repeatable tests

## Linting & formatting
- ESLint + TypeScript plugin
- Prettier for formatting
- Run locally via `npm run lint` and `npm run format`
- Configure pre-commit hooks (husky + lint-staged) to run lint/format/test before commits

## CI / CD
Example GitHub Actions workflow:
- Install deps
- Run lint
- Run unit tests
- Build TypeScript
- Optionally build Docker image and publish to registry

Protect main branches and require passing checks before merging.

## Project structure (recommended)
```
.
├─ src/
│  ├─ controllers/
│  ├─ services/
│  ├─ repositories/
│  ├─ routes/
│  ├─ models/
│  ├─ middlewares/
│  ├─ utils/
│  ├─ app.ts
│  └─ server.ts
├─ tests/
├─ .env.example
├─ Dockerfile
├─ docker-compose.yml
├─ jest.config.js
├─ tsconfig.json
└─ package.json
```

Adjust structure to reflect your repository. Keep code modular and small single-responsibility modules.

## Contributing
Thank you for contributing! Please follow these guidelines:
1. Fork the repo and create a feature branch: `git checkout -b feat/your-feature`
2. Run tests and linters locally
3. Open a PR with a clear description and link to any relevant issues
4. Follow commit message conventions (e.g., Conventional Commits) if present

Include a CONTRIBUTING.md file with PR template and issue template for maintainers.

## License
This project is licensed under the MIT License — see the LICENSE file for details.

## Contact
Maintainer: Your Name — replace with the maintainer details or project contact.

## Acknowledgements
- Inspired by common Node.js + TypeScript API patterns
- Useful libraries: Express, Fastify, Zod, TypeORM/Prisma, Jest, Supertest, ESLint, Prettier
