# base image
FROM python:3.9-slim

# set working directory
WORKDIR /app

# install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    wget \
    curl \
    && apt-get clean

#install node.js and npm from NodeSource
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean

# install python dependencies
COPY requirements.txt ./
RUN pip3 install --upgrade pip
RUN pip3 install --no-cache-dir -r requirements.txt

# Install Node.js dependencies
COPY package*.json ./
RUN npm install

# copy the rest of the application code
COPY . .

# expose port
EXPOSE 8080

# run 
CMD [ "python3", "-m", "flask", "run", "--host=0.0.0.0", "--port=8080" ]