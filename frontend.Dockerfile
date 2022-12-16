FROM node:16-alpine AS builder

WORKDIR /usr/src/app/
USER root
COPY package.json ./
RUN npm install

COPY ./ ./

RUN npm run build

FROM nginx:latest

WORKDIR /usr/share/nginx/html/

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /usr/src/app/build  /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


