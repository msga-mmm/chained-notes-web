<h1 align="center">CHAINED NOTES WEB</h1>

A web interface for chained notes.

<img src="docs/demo.png" alt="Chained notes demo" />

## BUILD PROCESS

### Dependencies

- [docker compose](https://docs.docker.com/compose/install/)
- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [mkcert](https://github.com/FiloSottile/mkcert#installation)

### Getting started

1. Clone or download this repository.

   ```sh
   git clone https://github.com/msga-mmm/chained-notes-web.git
   cd chained-notes-web
   ```

2. Create local SSl certificate to be able to run the application in https locally for development and production parity https://12factor.net/dev-prod-parity.

   ```sh
   # change directory where the certificate and key will be created
   cd nginx/ssl

   # create SSL certificate and key for `localhost`
   mkcert -install -key-file dev.pem -cert-file cert.pem localhost
   ```

3. Start all the docker compose services:

   ```sh
   # start the services
   docker compose up

   # start the services in the background
   docker compose up --detach
   ```

4. After all the services have started the frontend will be running at https://localhost.

## Testing

To run the end-to-end tests is necessary to install first playwright:

```sh
bunx playwright install
```

The above command will install playwright for all the browsers: firefox, chrome and webkit. To install playwright for a specific browser the following command can be used:

```sh
# chrome
bunx playwright install chrome

# firefox
bunx playwright install firefox

# webkit
bunx playwright install webkit
```

After the installation finishes the tests can be run with the following command:

```sh
# all browsers (headless mode)
bun run test:e2e

# all browsers (ui mode)
bun run test:e2e:ui

# specific browser (headless mode)
bun run test:e2e:chrome

# specific browser (ui mode)
bun run test:e2e:chrome:ui
```

## Code design

### Dependencies

- AJV: this package is defined as a dev dependency to fix the issue between bun and orval `SyntaxError: Unexpected token ':'`. More information at https://github.com/orval-labs/orval/issues/1454

- eslint-plugin-react-hooks: this package is defined with the canary release `5.1.0` to solve the issue `TypeError: context.getSource is not a function`. More information at https://github.com/facebook/react/pull/28773
