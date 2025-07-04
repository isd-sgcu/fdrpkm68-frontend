# Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install pnpm (specific version to match local)
RUN npm install -g pnpm@10.12.4

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --no-frozen-lockfile

# Copy pre-built application (built in GitHub Actions)
COPY ./dist ./dist

# Build args for runtime env vars (not used for building)
ARG PUBLIC_API_URL
ARG PUBLIC_SITE_URL
ENV PUBLIC_API_URL=$PUBLIC_API_URL
ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL

# Verify the build was copied correctly
RUN ls -la ./dist && \
    test -f "./dist/server/entry.mjs" || (echo "❌ Server entry missing" && exit 1) && \
    test -d "./dist/client/_astro" || (echo "❌ Client assets missing" && exit 1) && \
    echo "✅ Pre-built application verified"

# Production stage
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Install pnpm (specific version to match local)
RUN npm install -g pnpm@10.12.4

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install production dependencies only
RUN pnpm install --prod --no-frozen-lockfile

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Create non-root user
RUN addgroup --system --gid 1001 astro && \
    adduser --system --uid 1001 astro

# Change ownership of app directory
RUN chown -R astro:astro /app
USER astro

# Expose port
EXPOSE 4321

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:4321/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
CMD ["node", "./dist/server/entry.mjs"]