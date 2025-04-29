Journalist - Backend API
Journalist es una API RESTful construida en Node.js, diseñada para gestionar registros de entrada, salida y resumen de jornadas laborales.

Tecnologías utilizadas
Node.js + Express

PostgreSQL (almacenamiento de usuarios)

MongoDB (almacenamiento de sesiones laborales)

JWT (autenticación de usuarios)

Docker y Docker Compose (dockerizacion)

Mongoose (ODM para MongoDB)

pg (cliente PostgreSQL)

Jest (pruebas unitarias)


Configuración inicial

git clone https://github.com/tu-usuario/journalist-back.git
cd journalist-back


Crea tu archivo .env:
PORT=8081

# PostgreSQL
POSTGRES_HOST=postgres
DB_USER=postgres
DB_PASS=12345
DB_NAME=journalist_back

# MongoDB
MONGO_URL=mongodb://mongo:27017/journalist_back

# Tokens
ACCESS_TOKEN_SECRET=youraccesstokensecret
REFRESH_TOKEN_SECRET=yourrefreshtokensecret


Levanta los servicios con Docker Compose:
docker-compose up --build

Esto iniciará:

MongoDB

PostgreSQL

Backend Node.js en el puerto 8081

y tambien levantara el frontend React.js en el puerto 8080


Endpoints principales

Método	Ruta	Descripción	Autenticación
POST	/api/login	Iniciar sesión y obtener token	
POST	/api/register	Registrar un nuevo usuario
POST	/api/sessions/entry	Registrar hora de entrada	(Bearer Token)
POST	/api/sessions/exit	Registrar hora de salida	(Bearer Token)
GET	/api/sessions/resume?date=YYYY-MM-DD	Obtener resumen de jornada (Bearer Token)


Ejecutar pruebas unitarias
npm run test

Actualmente se prueban los servicios de:
Registro de usuarios (AuthRegisterService)

Inicio de sesión (LoginService)

Registros de entradas (MarkEntryService)



Autho 
Duwerney Santiago Hernandez Arcila
Desarrollador Backend - Fullstack 🚀
GitHub: @duwerney99