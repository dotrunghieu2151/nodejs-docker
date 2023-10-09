#!/bin/bash
set -e

echo "down prod..."
docker-compose -f docker-compose.prod.yml --env-file .env.prod down
