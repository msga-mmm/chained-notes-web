FROM oven/bun:1.1.34-alpine

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

USER nonroot

WORKDIR /home/nonroot/app

# Copy files to install the dependencies
COPY --chown=nonroot:nonroot package.json bun.lockb .

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY --chown=nonroot:nonroot ./public ./public
COPY --chown=nonroot:nonroot ./src ./src
COPY --chown=nonroot:nonroot ./tests ./tests

COPY --chown=nonroot:nonroot ./eslint.config.js \
  ./index.html \
  ./knip.ts \
  ./orval.config.ts \
  ./playwright.config.ts \
  ./tsconfig.json \
  ./vite.config.ts \
  .

# Start the Vite dev server
CMD ["bun", "run", "dev"]
