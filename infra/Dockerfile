# ---- base ----
FROM oven/bun:1 AS base
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .

# ---- dev ----
FROM base AS dev
CMD ["bun", "dev"]

# ---- build ----
FROM base AS build
RUN bun run build
