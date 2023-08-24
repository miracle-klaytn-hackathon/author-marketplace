FROM node:18.17.1 AS build
WORKDIR /workspace
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build:production

FROM nginx:1.25.2 AS run
WORKDIR /app
COPY --from=build --chown=1001 /workspace/build/ /usr/share/nginx/html

EXPOSE 80