FROM node:13 as node

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install

COPY ./ /app/
RUN npm run build

FROM nginx:alpine
COPY --from=node /app/build /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf