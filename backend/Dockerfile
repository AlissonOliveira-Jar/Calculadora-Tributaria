FROM node:26-alpine

RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN chmod +x ./start.sh

EXPOSE 3000

CMD ["./start.sh"]
