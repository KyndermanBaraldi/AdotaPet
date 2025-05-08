# Stage 1: Build
FROM node:20-bullseye AS builder
WORKDIR /app
# Atualiza libaom e dependências de sistema
RUN apt-get update \
    && apt-get install -y --only-upgrade libaom0 libaom-dev \
    && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
ENV NODE_OPTIONS="--max-old-space-size=512"
ENV NPM_CONFIG_MAX_SOCKETS=3
ENV NPM_CONFIG_AUDIT=false
ENV NPM_CONFIG_FUND=false
RUN npm ci --prefer-offline --no-audit
COPY . .
RUN npm run build

# Stage 2: Produção
FROM node:20-bullseye-slim
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
USER nextjs
EXPOSE 3000
CMD ["npm", "start"]

