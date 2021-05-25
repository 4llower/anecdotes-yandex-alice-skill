FROM node:12.19

COPY package*.json yarn.lock /app/

WORKDIR /app/

RUN yarn

EXPOSE 9000

CMD ["yarn", "start"]
