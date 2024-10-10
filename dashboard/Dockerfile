FROM node:16-alpine AS build-stage

WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# PORT
EXPOSE 3000

# Serve the app
CMD [ "npm", "run", "serve" ]