# GeniusChat

GeniusChat es una aplicación móvil desarrollada en React Native con TypeScript que te permite conversar con la inteligencia artificial Gemini de Google. Puedes hacerle cualquier tipo de pregunta, y Gemini te proporcionará respuestas precisas y detalladas.

## Características

- **Conversaciones en Tiempo Real:** Chatea con la IA Gemini para obtener respuestas instantáneas.
- **Interfaz de Usuario Moderna:** Utiliza componentes de React Native Paper para una experiencia fluida.
- **Almacenamiento de Conversaciones:** Guarda y recupera tus chats con Async Storage.

## Requisitos

- Node.js (versión 14 o superior)
- npm o yarn
- Clave API de Google Gemini

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/tu-usuario/geniuschat.git
   cd geniuschat

2. Instala las dependencias necesarias:

   ```bash
   npm install
   # o
   yarn install

3. Crea un archivo config.ts en la raíz del proyecto con el siguiente contenido:

   ```bash
   export const API_KEY = 'TU_CLAVE_API_DE_GOOGLE_GEMINI';
   #Reemplaza 'TU_CLAVE_API_DE_GOOGLE_GEMINI' con la clave API que obtuviste de Google Gemini.

4. Ejecuta la aplicación:

   ```bash
   npm run start
   # o
   yarn start

## Tecnologías Utilizadas
- **React Native:** Framework principal para el desarrollo móvil.
- **TypeScript:** Lenguaje utilizado para un desarrollo más seguro y mantenible.
- **React Native Paper:** Biblioteca de componentes para la interfaz de usuario.
- **Axios:** Cliente HTTP utilizado para hacer las solicitudes a la API.
- **Async Storage:** Para el almacenamiento local de datos.

## Contribuciones
Las contribuciones son bienvenidas. Si deseas contribuir, por favor, sigue estos pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama (**git checkout -b feature/nueva-caracteristica**).
3. Realiza los cambios necesarios y haz un commit (**git commit -m 'Añadir nueva característica'**).
4. Envía tus cambios (**git push origin feature/nueva-caracteristica**).
5. Crea un Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT. Puedes ver más detalles en el archivo [LICENSE](https://github.com/Axelrpg/GeniusChat/blob/main/LICENSE).

## Autor

Desarrollado por [Axelrpg](https://github.com/Axelrpg).

¡Gracias por usar GeniusChat! Si tienes alguna pregunta o problema, no dudes en abrir un issue en el repositorio.
