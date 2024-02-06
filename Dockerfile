FROM node:16.14.2

WORKDIR /chatnew

EXPOSE 8013

COPY . .

# RUN npm install && npm run build
RUN npm ci --silent && npm run build

ENV TZ America/Sao_Paulo

CMD ["npm", "start"]