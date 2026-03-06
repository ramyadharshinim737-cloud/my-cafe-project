# 1. Node.js version-ah use panrom
FROM node:22

# 2. Folder-ah create panrom
WORKDIR /app

# 3. Dependencies-ah copy panni install panrom
COPY package*.json ./
RUN npm install

# 4. Full code-ah copy panrom
COPY . .

# 5. Port 5000-ah open panrom
EXPOSE 5000

# 6. Server-ah start panrom
CMD ["node", "server.js"]