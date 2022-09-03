FROM node:16.17-alpine AS deps
ARG PROJECT_PATH

WORKDIR /var/www/app
COPY ${PROJECT_PATH}/package.json ./
RUN npm install


FROM node:16.17-alpine AS runner
ARG PROJECT_PATH

WORKDIR /var/www/app/src
COPY ${PROJECT_PATH} .
COPY --from=deps /var/www/app/node_modules ./node_modules

EXPOSE 80

CMD ["npm", "run", "start:dev"]
