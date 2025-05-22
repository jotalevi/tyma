FROM node:latest

WORKDIR /app

COPY package*.json ./

# Install inside the Linux container, not Windows
RUN npm install

COPY . .

EXPOSE 3010
CMD ["npm", "run", "start:dev"]
