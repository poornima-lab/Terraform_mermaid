# Use the official Node.js image.
FROM node:14

LABEL author="Poornima"

# Create and change to the app directory.
WORKDIR /app

# Copy application dependency manifests to the container image.
COPY . /app

VOLUME ["my-data"]

# Install http-server globally
RUN npm install -g http-server

# Copy the start script and provide executable permission
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh


# Start the application
CMD ["/app/start.sh"]