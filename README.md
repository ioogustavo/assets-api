# 🧩 Assets API

API RESTful para la gestión de activos (assets) desarrollada con NestJS, Prisma y PostgreSQL.

## 📚 Tabla de Contenido

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución del proyecto](#ejecución-del-proyecto)
- [Documentación Swagger](#documentación-swagger)
- [Endpoints principales](#endpoints-principales)
- [Autor](#autor)

## 🧠 Descripción

Proyecto backend desarrollado con NestJS que implementa un CRUD completo para la gestión de activos (assets).
Utiliza Prisma ORM para la interacción con una base de datos PostgreSQL y cuenta con documentación interactiva generada con Swagger.
Incluye validaciones con class-validator y una arquitectura modular escalable.

## ⚙️ Tecnologías

- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Swagger](https://swagger.io/)
- [Class Validator](https://github.com/typestack/class-validator)
- TypeScript

## 🧩 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/ioogustavo/assets-api.git

# Entrar al directorio
cd assets-api

# Instalar dependencias
npm install
```

## ⚙️ Configuración

1. Crear la base de datos en PostgreSQL:

```sql
CREATE DATABASE assets_db;
Importar schema.sql en la base assets_db

2. Crear un nuevo archivo en el directorio raiz, que se llame .env y copiar el contenido del .env.template, luego pegarlo dentro del .env

```

## ▶️ Ejecución del proyecto

```
# Ejecuta el proyecto
npm start

# Compila el proyecto
npm run build

# Ejecuta en producción
npm run start:prod
```

## 📖 Documentación Swagger

La documentación interactiva de la API está disponible en:

```
http://localhost:3000/api
```

# 🚀 Endpoints

| Método | Endpoint    | Descripción                |
| ------ | ----------- | -------------------------- |
| POST   | /create     | Crear un nuevo asset       |
| GET    | /all        | Listar todos los assets    |
| PUT    | /update/:id | Actualizar un asset por id |
| DELETE | /delete/:id | Eliminar un asset por id   |

## 👨‍💻 Autor

Rubén Gustavo Altamiranda
Proyecto desarrollado como challenge técnico de Backend NestJS con Prisma y PostgreSQL.
