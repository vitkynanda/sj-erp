FROM node:16.13.0 as builder

WORKDIR /usr/src/app/
USER root
COPY package.json ./
RUN yarn install:clean

COPY ./ ./

RUN yarn build

FROM nginx:latest

WORKDIR /usr/share/nginx/html/

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /usr/src/app/build  /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

