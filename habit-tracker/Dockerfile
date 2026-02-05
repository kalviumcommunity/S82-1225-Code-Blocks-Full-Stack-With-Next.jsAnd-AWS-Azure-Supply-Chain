# 1️⃣ Base image
FROM node:18-alpine AS builder

# 2️⃣ Set working directory
WORKDIR /app

# 3️⃣ Copy dependencies
COPY package*.json ./
RUN npm ci

# 4️⃣ Copy source code
COPY . .

# 5️⃣ Build Next.js app
RUN npm run build

# -----------------------------

# 6️⃣ Production image
FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

# 7️⃣ Copy build output
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# 8️⃣ Expose port
EXPOSE 3000

# 9️⃣ Start app
CMD ["npm", "start"]
