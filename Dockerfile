# Multi-stage Dockerfile for FullStackLovable Project
# Optimized for Docker Swarm deployment with Traefik

# Stage 1: Build the application
FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY bun.lockb ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production runtime
FROM nginx:alpine

# Install necessary packages for health checks
RUN apk add --no-cache curl

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create nginx user and set permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:80/ || exit 1

# Expose port
EXPOSE 80

# Traefik Labels for Docker Swarm
LABEL traefik.enable=true
LABEL traefik.http.routers.fullstacklovable.rule=Host(`ds.websolutions.eti.br`)
LABEL traefik.http.routers.fullstacklovable.tls=true
LABEL traefik.http.routers.fullstacklovable.tls.certresolver=letsencrypt
LABEL traefik.http.services.fullstacklovable.loadbalancer.server.port=80
LABEL traefik.docker.network=traefik-public

# Metadata
LABEL maintainer="Guilherme Puentes <guilherme@websolutions.eti.br>"
LABEL version="1.0.0"
LABEL description="FullStackLovable - Sistema MVC Modular para WebSolutions ETI"
LABEL org.websolutions.project="fullstacklovable"
LABEL org.websolutions.environment="production"

# Start nginx
CMD ["nginx", "-g", "daemon off;"]