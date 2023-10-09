#!/bin/bash
set -e

echo "start prod..."
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d
