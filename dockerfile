FROM  node:21-slim  as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install 
COPY . .
EXPOSE 8000
CMD ["npm", "start"]
