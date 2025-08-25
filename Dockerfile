# Etapa de build con Node 20 (glibc en lugar de Alpine/musl)
FROM node:20-slim AS build

WORKDIR /app

# Copiar dependencias primero
COPY package*.json ./

# Instalar todas las dependencias (incluyendo devDependencies para build)
RUN npm install

# Copiar el resto del código
COPY . .

# Compilar la aplicación
RUN npm run build




EXPOSE 3001
CMD ["npm", "run", "dev"]
