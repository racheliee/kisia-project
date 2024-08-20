# Base image
FROM node:18-alpine

# Install Dockerize
RUN apk add --no-cache curl \
    && curl -sSL https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz | tar -C /usr/local/bin -xzv

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy prisma schema and generate client
COPY prisma/ ./prisma/
RUN npx prisma generate

# Bundle app source
COPY . . 

# Build the app
RUN npm run build

RUN chmod +x docker-entrypoint.sh
ENTRYPOINT [ "sh", "usr/src/app/docker-entrypoint.sh" ]

# Expose the port the app runs on
EXPOSE 8000

# Serve the app
CMD [ "npm", "run", "start" ]