# Step 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
# Use legacy peer deps to avoid install errors
RUN npm install --legacy-peer-deps

# Copy the rest of your frontend source code
COPY . .

# Build the Next.js app
RUN npm run build

# Step 2: Run the built app with a lightweight web server
FROM node:18-alpine AS runner

WORKDIR /app

# Copy only the necessary files from the build step
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Port to expose
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
