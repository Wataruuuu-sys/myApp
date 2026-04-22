# ---- base ----
FROM oven/bun:1 AS base
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .

# ---- ci ----
FROM base AS ci
CMD ["sh", "-c", "bun run prisma:generate && bun run prisma:push && bun run test"]

# ---- build ----
FROM base AS build
RUN bun run build

# ---- prod ----
FROM build AS prod
CMD ["bun", "start"]
