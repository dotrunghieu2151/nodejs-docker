FROM node:16.17-alpine AS deps
ARG PROJECT_PATH

WORKDIR /var/www/app
COPY ${PROJECT_PATH}/package.json ./
RUN npm install

# Rebuild the source code only when needed
FROM node:16.17-alpine AS builder
ARG PROJECT_PATH

WORKDIR /var/www/app/src
COPY ${PROJECT_PATH} ./
COPY --from=deps /var/www/app/node_modules ./node_modules

RUN npm run build
RUN npm prune --production

# Production image, copy all the files and run
FROM node:16.17-alpine AS runner

RUN apk add --no-cache tini
WORKDIR /var/www/app

ENV NODE_ENV production

# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nestjs -u 1001
# --chown=nestjs:nodejs 

# COPY --from=builder 
COPY --from=builder --chown=node:node /var/www/app/dist ./dist
COPY --from=builder --chown=node:node /var/www/app/src/node_modules ./node_modules
COPY --from=builder --chown=node:node /var/www/app/src/package.json ./package.json

RUN mkdir ./storage
RUN chown node:node ./storage

USER node

EXPOSE 80

CMD ["/sbin/tini", "--", "node", "dist/app/index" ]
