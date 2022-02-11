FROM node:17.4.0

WORKDIR /match/

COPY . .

RUN npm install 
RUN npm install nodemon
RUN npm run build

CMD ["npm", "start"]

EXPOSE 5000