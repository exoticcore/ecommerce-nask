# Stage 1: Build the React application
FROM node:20 AS builder

WORKDIR /app

# Use ARG to define build-time environment variables
ARG PRODUCTION_DOMAIN
ARG API_DOMAIN

# Copy only the package files to take advantage of Docker layer caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Check if the required webpack configuration files exist
RUN ls -la /app/config

# Build the React application
RUN npm run build

# Stage 2: Serve the React application with Nginx
FROM nginx:alpine

# Copy the built files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx.conf /etc/nginx/conf.d

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
