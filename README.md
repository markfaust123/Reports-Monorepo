# Reports Template - A Reports App Template

This is the template for an app to help JHU research groups work more efficiently and optimize their productivity. Mark Faust built this template because he believes this is what research groups need to succeed. The app template includes the following features:

- Report mutations and queries
- Pagination and search
- User authentication (JWT)
- Request interception and filtering
- Data persistence in Docker PostgreSQL database
- Dynamic, client-side routing

NOTE: All Tasks have been completed! The state of this monorepo is the default state following Task 16; therefore, important TODO's are still yet to be addressed.


## Reports Template Monorepo

This is a monorepo that contains the client and server applications for the templated Reports app.

- The client is a React app bootstrapped with Vite.
- The server is a Nest.js application.

## Getting Started

To get started with this project, follow these steps:

1. **Prerequisites**: Make sure you have Git, Node, and PNPM (the new package manager for Node) installed. If you don't have PNPM, you can install it globally with `npm install -g pnpm`. Additionally, you need to have Docker set up and running to spin up a local Postgres server. If you're new to Docker, you can refer to [this helpful guide](https://docs.docker.com/get-started/).
2. **Repository Setup**: Clone the repository and navigate to the root folder in the terminal.
3. **Dependencies**: Run `pnpm install` to install the dependencies for both the client and server.
4. **Environment Configuration**: Add a `.env` file in each the `app` and `api` sub-folders, similar to their respective `.env.example` files, and fill in the required environment variables.
5. **Database Setup**: Run `pnpm docker:up` to initialize the Postgres server.
6. **Run Locally**: To start the server, run `pnpm start:api`. To start the client, run `pnpm start:app`. Alternatively, you can run `pnpm start:all` to start both the client and server applications.
