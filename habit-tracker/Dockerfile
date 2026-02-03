# ---- Base image ----
FROM node:18-alpine AS base

WORKDIR /app

# ---- Dependencies ----
COPY package*.json ./
RUN npm install

# ---- Build ----
COPY . .
RUN npm run build

# ---- Production runner ----
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=base /app/package*.json ./
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]
