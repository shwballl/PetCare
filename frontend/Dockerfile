FROM node:20-alpine

# Install build tools for native modules that Expo/Metro may need (e.g. sharp)
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy only dependency manifests first for better layer caching
COPY package*.json ./

# Prefer reproducible installs; fall back to npm install if no lockfile
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy the rest of the app
COPY . .

# New line to change ownership of all files to the 'node' user
RUN chown -R node:node /app

# Expo/Metro dev ports (and Metro 8081)
EXPOSE 19000 19001 19002 8081

# Make Expo DevTools listen on all interfaces in container
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0 \
	EXPO_NO_TELEMETRY=1

# Run as non-root where possible
USER node

# Default to starting the Expo dev server; override in docker-compose if needed
CMD ["npm", "run", "start"]