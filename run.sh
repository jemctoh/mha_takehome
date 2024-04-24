#! /bin/bash

# Build docker image
docker build -t pet-store .

# Run docker container
docker run -d --name pet-store -p 3000:3000 pet-store

# commands to run before packaging, and SCP to server
# docker build --platform linux/amd64 -t pet-store-1 .
# docker save -o pet-store-1.tar pet-store-1