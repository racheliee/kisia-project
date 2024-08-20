# Base image
FROM node:18-alpine

# Install Dockerize
ENV DOCKERIZE_VERSION v0.2.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

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

COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh
ENTRYPOINT [ "sh", "/usr/src/app/docker-entrypoint.sh" ]

# Expose the port the app runs on
EXPOSE 8000

# Serve the app
# CMD [ "npm", "run", "start" ]