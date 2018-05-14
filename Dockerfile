FROM node:8.11.1-alpine

ADD package.json /tmp/package.json
RUN cd /tmp && npm install 
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

WORKDIR /opt/app
ADD . /opt/app

EXPOSE 8000

CMD ["npm", "start"]
# CMD ["/bin/sh"]