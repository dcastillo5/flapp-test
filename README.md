# Flapp Test 🚛

Este es un monorepo, contiene el frontend y el backend de la aplicación. Ambos servicios están dockerizados, por lo tanto, para correr la aplicación solo se necesita tener instalado Docker y Docker Compose, y ejecutar los siguientes comandos:

```bash
docker-compose build
docker-compose up
```
Se puede acceder al frontend en `http://localhost:3000` y al backend en `http://localhost:8000`.

De igual manera, se pueden correr los servicios de manera independiente fuera de Docker. Las instrucciones se encuentran en el Set up de cada servicio.

## Estructura

### Frontend 🎨

Se ubica en la carpeta `frontend/`. Fue desarrollado con:
- TypeScript y React
- Bun como administrador de paquetes, 
- Tanstack Router para el manejo de rutas
- TailwindCSS para el estilo. 

El proyecto se inicializó utilizando el template de [tsrouter-app](https://tanstack.com/router/latest/docs/framework/react/quick-start#scaffolding-your-first-tanstack-router-project) que incluye las principales dependencias y configuraciones.

#### Set up

Para correr el frontend es necesario tener instalado node y bun([guía de instalación](https://bun.sh/docs/installation#installing)).

Dentro de la carpeta `frontend` seguir los siguientes pasos:

1. Crear un archivo `.env` con las variables de entorno del archivo `.env.example`.

2. Instalar las dependencias con el siguiente comando:

```bash
bun install
```

3. Correr el frontend con el siguiente comando:

```bash
bun run start
```

4. Acceder al frontend en `http://localhost:3000`.

### Backend 💻

Se ubica en la carpeta `backend/`. Fue desarrollado con:
- Python 
- FastAPI 
- Pydantic para la validación de los datos.

#### Set up

Para correr el backend es necesario tener instalado Python. Dentro de la carpeta `backend` hacer los siguientes pasos:

1. Crear un archivo `.env` con las variables de entorno del archivo `.env.example`.

2. De manera opcional, utilizar un entorno virtual para instalar las dependencias:

```bash
python -m venv venv
source venv/bin/activate
```

3. Instalar las dependencias con el siguiente comando:

```bash
pip install -r requirements.txt
```

4. Correr el backend con el siguiente comando:

```bash
fastapi dev app/main.py
```

5. Acceder al backend en `http://127.0.0.1:8000`.

## Supuestos

En el desarrollo de la aplicación se asumio que:

- En el backend, la API dummyjson únicamente es consultada con paginación de 10 en 10. No se utilizan endpoints para obtener la información de los productos de manera individual.

- El precio de la tarifa de uder viene dada por `fee` en USD y el precio de la tarifa de traeloYa viene dada por `pricing.total` en CLP. Para poder comparar los precios y estandarizar la moneda, se convierte el precio de traeloYa a USD. Para simplificar la conversión se asume que 1 USD = 922,74 CLP.

- Todos los precios obtenidos se truncan a dos decimales.

- Independiente del error (400) que envie el backend, siempre se muestra el mensaje de fallo "No hay envíos disponibles"

- La vista de checkout muestra los detalles del carrito y permite ingresar los datos de envío del comprador.
