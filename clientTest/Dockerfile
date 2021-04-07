FROM node:12
WORKDIR /usr/share/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
CMD ["npm", "run", "start"]
