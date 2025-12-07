# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/funfordima/nodejs2025Q2-service
```

## Installing NPM modules

```
npm ci or npm ci --legacy-peer-deps
```

## Postgres initialization in Docker container for development

```
npm run docker:db
```

## Run migrations

```
npm run prisma:migrate
```

## Running application for development

```
npm start
```

## Running application in the Docker container

```
npm run docker:dev
```

## Running application from DockerHub image

```
npm run docker:prod
```

## Running Docker vulnerability scan

```
npm run docker:scan (docker hub image)    or npm run docker:scan:dev (build image)
```

## Encounter any issues with Docker?

```
npm run docker:down
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
in your browser Swagger documentation by typing http://localhost:4000/api/docs.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
