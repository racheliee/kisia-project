# Base image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Install system dependencies and Node.js from NodeSource
RUN apt-get update && apt-get install -y \
    build-essential \
    python3-dev \
    libssl-dev \
    libffi-dev \
    libpq-dev \ 
    wget \
    curl \
    gcc \
    && curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy and install Python dependencies
COPY requirements.txt ./
RUN pip3 install --upgrade pip && pip3 install --no-cache-dir -r requirements.txt

# Copy and install Node.js dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . . 

# Expose port
EXPOSE 8080

# Run the Flask app
CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0", "--port=8080"]
