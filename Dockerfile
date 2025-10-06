# Stage 1: Build the React app
FROM node:21 AS build

# Set the working directory in the container
WORKDIR /usr/src/app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml to install dependencies
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Optionally, add environment variables here
# ENV VITE_API_URL=https://api.example.com

# Clear cache before build to avoid caching issues
RUN pnpm store prune

# Build the application and add debug step to check files
RUN pnpm run build || (echo "Build failed. Listing files for debugging:" && ls -la && exit 1)

# Stage 2: Serve the production build with Nginx
FROM nginx:stable-alpine

# Copy the built React app from the first stage to the Nginx html folder
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
