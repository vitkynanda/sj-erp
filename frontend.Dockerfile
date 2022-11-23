FROM node:16.13.0 as builder

WORKDIR /usr/src/app/
USER root
COPY package.json ./
RUN npm install --force

COPY ./ ./

RUN npm run build

FROM nginx:latest

WORKDIR /usr/share/nginx/html/

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /usr/src/app/build  /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


