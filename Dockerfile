# ================================
# Only For Test
# ================================
FROM node:24

# Switch to the staging area
WORKDIR /app

# Let Docker bind to port 8080
COPY ./src /app/src

# Start the Vapor service when the image is run, default to listening on 8080 in production environment
ENTRYPOINT ["ls"]
CMD ["-a"]
