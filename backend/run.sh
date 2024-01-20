#!/bin/bash

# Script para ejecutar la aplicación

# Configuración de la base de datos (puedes personalizar esto según tu entorno)
DB_USERNAME="postgres"
DB_PASSWORD="1597"
DB_NAME="ensolvers"

# Crear archivo de configuración si no existe
if [ ! -f .env ]; then
  echo "DB_DEPLOY=postgres://${DB_USERNAME}:${DB_PASSWORD}@localhost:5432/${DB_NAME}" > .env
  echo "Configuración de la base de datos creada en el archivo .env"
fi

# Instalar dependencias
npm install

# Configurar la base de datos (sincronizar modelos)
npx sequelize db:migrate

# Iniciar la aplicación
npm start
