FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
# Build-time placeholder only; real AUTH_SECRET is supplied at runtime via Compose.
RUN AUTH_SECRET=temporary-build-only-do-not-use-as-real-secret npm run build
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
