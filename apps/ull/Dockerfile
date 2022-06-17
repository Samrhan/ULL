FROM nginx:1.21-alpine

COPY default.nginx /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*
COPY ./dist/apps/ull /usr/share/nginx/html

RUN touch /var/run/nginx.pid && \
  chown -R nginx:nginx /var/run/nginx.pid && \
  chown -R nginx:nginx /var/cache/nginx

USER 101