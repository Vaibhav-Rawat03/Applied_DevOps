#!/bin/bash

IMAGE_NAME="vaibhavrawat/to-do-list-frontend"
CONTAINER_NAME="todo-list-frontend"

echo "Pulling Docker image: $IMAGE_NAME"
docker pull $IMAGE_NAME

CONTAINER_ID=$(docker ps -aq --filter="name=$CONTAINER_NAME")
if [ -n "$CONTAINER_ID" ]; then
    echo "Container $CONTAINER_NAME is already running with ID $CONTAINER_ID"
    echo "Stopping and removing the existing container..."
    docker stop $CONTAINER_ID
    docker rm $CONTAINER_ID
fi

echo "Running Docker container: $CONTAINER_NAME"
docker run -d --name $CONTAINER_NAME -p 3000:3000 $IMAGE_NAME

CONTAINER_IP=$(docker inspect --format '{{ .NetworkSettings.IPAddress }}' $CONTAINER_NAME)
echo "Docker container $CONTAINER_NAME is running with IP: $CONTAINER_IP"
