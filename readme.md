Nodejs - docker

## Setup local (ko dùng docker)

Khởi tạo ENV

```sh
cp .env-sample ./src/.env
```
Install dependencies

```sh
cd ./src
npm install
```

Chạy 

```sh
cd ./src
npm run start:dev
```

URL
```sh
http://localhost:${WEB_PORT_HTTP}
```

## Setup local (dùng docker)

Khởi tạo ENV

```sh
cd {root} (ko phải trong src)
cp .env-sample .env
```

Chạy 

```sh
bash ./devOps/dev/deploy.sh
```
Hoặc
```sh
sh ./devOps/dev/deploy.sh
```

URL
```sh
http://localhost:${WEB_PORT_HTTP}
```

## Deploy

Khởi tạo ENV prod

```sh
cp .env-sample .env.prod
```

Chạy 

```sh
bash ./devOps/prod/deploy.sh
```
Hoặc
```sh
sh ./devOps/prod/deploy.sh
```