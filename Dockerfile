FROM oven/bun:1.2.7-alpine

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

USER nonroot

WORKDIR /home/nonroot/app

# Copy files to install the dependencies
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY ./public ./public
COPY ./src ./src
COPY ./tests ./tests

COPY ./eslint.config.js \
  ./index.html \
  ./knip.ts \
  ./orval.config.ts \
  ./playwright.config.ts \
  ./tsconfig.json \
  ./vite.config.ts \
  ./

# Start the Vite dev server
CMD ["bun", "run", "dev"]
