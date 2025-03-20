# Flapp Test

## Estructura

### Frontend 🎨

Se ubica en la carpeta `frontend`. El frontend fue desarrollado con TypeScript, utilizando React, bun como administrador de paquetes, tanstack-router para el manejo de rutas y TailwindCSS para el estilo. El proyecto se inicializó utilizando un template de [tsrouter-app](https://tanstack.com/router/latest/docs/framework/react/quick-start#scaffolding-your-first-tanstack-router-project) que incluía las principales dependencias y configuraciones para el desarrollo.

#### Set up

Para correr el frontend es necesario tener instalado node y bun. Para instalar bun se puede seguir la [guía de instalación](https://bun.sh/docs/installation#installing).

Dentro de la carpeta `frontend` hacer los siguientes pasos:

1. Crear un archivo `.env` con las variables de entorno del archivo `.env.example`.

2. Instalar las dependencias con el siguiente comando:

```bash
bun install
```

3. Correr el frontend con el siguiente comando:

```bash
bun run start
```

4. El frontend estará disponible en `http://localhost:3000`.

### Backend 💻

Se ubica en la carpeta `backend`. El backend fue desarrollado en Python utilizando FastAPI con pydantic para la validación de los datos.

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

5. El backend estará disponible en `http://127.0.0.1:8000`.

## Supuestos

En el desarrollo de la aplicación se asumieron los siguientes supuestos:

- En el backend, a la API dummyjson unicamente se le hace la consulta paginada de 10 en 10. No se utilizan endpoints para obtener la información de los productos de manera individual.

- El precio de la tarifa de uder viene dada por `fee` en USD y el precio de la tarifa de traeloYa viene dada por `pricing.total` en CLP. Para poder comparar los precios y estandarizar la moneda, se convierte el precio de traeloYa a USD. Para simplificar la conversión se asume que 1 USD = 922,74 CLP.

- Todos los precios obtenidos se truncan a 2 decimales.

- Independiente del error que envío el backend, se muestra el mensaje de fallo "No hay envíos disponibles"

- La vista de checkout muestra los detalles del carrito y permite ingresar los datos de envío del comprador.
