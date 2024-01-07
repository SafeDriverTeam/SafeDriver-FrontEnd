# Utiliza una imagen base con Node.js instalado
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios para el frontend (asegúrate de haberlos copiado previamente en tu directorio local)
COPY . .

# Instala las dependencias
RUN npm install

# Construye la aplicación React para producción
RUN npm run build

# Expone el puerto en el que el servidor React estará escuchando
EXPOSE 3000

# Comando para iniciar la aplicación React
CMD ["npm", "start"]
