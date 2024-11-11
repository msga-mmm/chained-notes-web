FROM oven/bun:1.1.34-alpine

WORKDIR /app

# Copy files to install the dependencies
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY . .

# Start the Vite dev server
CMD ["bun", "run", "dev"]
