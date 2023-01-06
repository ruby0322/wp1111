FROM node:16-alpine

COPY . /app
WORKDIR /app

RUN corepack enable
RUN yarn install:prod
RUN yarn build

CMD export NODE_OPTIONS="--max-old-space-size=8192"
CMD yarn start