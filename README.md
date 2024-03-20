# REST API - Authentication - Store App - Email validation - Node, TS, Jest

## Node with TypeScript - TS-Node-dev (better than nodemon when use typescript)

NOTE: After clone:

1. Create and config .env file with:

   ```text

   PORT=3000

   MONGO_URL=mongodb://mongo-user:123456@localhost:27017
   MONGO_DB_NAME=mystore

   JWT_SEED=your_secret_seed

   # Change to true to send validation email
   SEND_EMAIL_ENABLE=false
   MAILER_SERVICE=gmail
   MAILER_EMAIL=your_gmail
   MAILER_SECRET_KEY=your_secret_key

   # change http://localhost:3000/ to given url from ngrok after command ngrok http 3000

   WEBSERVICE_URL=http://localhost:3000/api

   ```

   _[Get gmail secret key here](https://myaccount.google.com/u/0/apppasswords)_

2. You need to install Ngrok to expose a port and then, you will can test the validation email from any device of any network.
   NOTE: Only for testing purpose.
   [Setup guide](https://dashboard.ngrok.com/get-started/setup/linux): For Linux. See other setup SO into web of Ngrok.

   Once installed, run with:

   ```sh
   ngrok http http://localhost:3000 # same port of your api
   ```

   OR:

   ```sh
   ngrok http 3000 # same port of your api
   ```

   UPDATE: Now, from Vscode you can use forward port (abrir puerto) open terminal and then, go to ports tab. Set as public and share. With this you can skip using of ngrok dependency.

3. Next, run:

   ```sh
   pnpm i
   docker compose up -d
   pnpm seed # to populate db
   pnpm dev
   ```

### This app was initialized with this steps

1. Install TypeScript and other dependencies

   ```sh
   pnpm i -D typescript @types/node ts-node-dev rimraf
   ```

2. Initialize TypeScript config file (then, add other config that you like)

   ```sh
   pnpm exec tsc --init --outDir dist/ --rootDir src
   ```

3. Create scripts dev, build and start ([More about TS-Node-dev here](https://www.npmjs.com/package/ts-node-dev))

   ```JSON
   "dev": "tsnd --respawn --clear src/app.ts",
   "build": "rimraf ./dist && tsc",
   "start": "npm run build && node dist/app.js"
   ```

4. If you get permission error, you can run:

   ```sh
   sudo chown -R $USER:$GROUP postgres # Or whatever folder/s with error
   ```

## Dependencies

### Development

- [Git linter](https://www.npmjs.com/package/git-commit-msg-linter): A lightweight, independent, 0 configurations and joyful git commit message linter. 👀 Watching your every git commit message INSTANTLY 🚀.

![allowed commits](https://raw.githubusercontent.com/legend80s/commit-msg-linter/master/assets/demo-7-compressed.png)

- [Typescript](https://www.npmjs.com/package/typescript): TypeScript is a language for application-scale JavaScript. TypeScript adds optional types to JavaScript that support tools for large-scale JavaScript applications for any browser, for any host, on any OS. TypeScript compiles to readable, standards-based JavaScript.

- [Node types](https://www.npmjs.com/package/@types/node): This package contains type definitions for node [https://nodejs.org/](https://nodejs.org/).

- [Ts Node Dev](https://www.npmjs.com/package/ts-node-dev): It restarts target node process when any of required files changes (as standard node-dev) but shares Typescript compilation process between restarts. This significantly increases speed of restarting comparing to node-dev -r ts-node/register ..., nodemon -x ts-node ... variations because there is no need to instantiate ts-node compilation each time.

- [rimraf](https://www.npmjs.com/package/rimraf): The UNIX command rm -rf for node.

- [Express types](https://www.npmjs.com/package/@types/express):This package contains type definitions for express.

- [Nodemailer types](https://www.npmjs.com/package/@types/nodemailer):This package contains type definitions for nodemailer.
- [Bcryptjs types](https://www.npmjs.com/package/@types/bcryptjs):This package contains type definitions for bcryptjs.
- [Jsonwebtoken types](https://www.npmjs.com/package/@types/jsonwebtoken):This package contains type definitions for jsonwebtoken.

### Production

- [Express](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for Node.js.

- [Dotenv](https://www.npmjs.com/package/dotenv): Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

- [Env-Var](https://www.npmjs.com/package/env-var): Verification, sanitization, and type coercion for environment variables in Node.js and web applications. Supports TypeScript!

- [Nodemailer](https://www.npmjs.com/package/nodemailer): Send emails from Node.js – easy as cake! 🍰✉️

- [Mongoose](https://www.npmjs.com/package/mongoose): Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports Node.js and Deno (alpha).

- [Bcryptjs](https://www.npmjs.com/package/bcryptjs): Bcryptjs hash and check passwords. Optimized bcrypt in JavaScript with zero dependencies. Compatible to the C++ bcrypt binding on node.js and also working in the browser.
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): An implementation of JSON Web Tokens.
  This was developed against draft-ietf-oauth-json-web-token-08. It makes use of node-jws
