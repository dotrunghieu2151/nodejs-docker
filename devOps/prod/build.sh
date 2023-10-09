#!/bin/bash
set -e

echo "build prod..."
docker-compose -f docker-compose.prod.yml --env-file .env.prod build
