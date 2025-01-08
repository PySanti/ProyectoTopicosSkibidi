import app from './app.js';

const PORT = process.env.PORT || 3000;
let server;

export function startServer() {
  server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
  return server;
}

export function stopServer() {
  if (server && server.listening) {
    return new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }
  return Promise.resolve();
}


startServer();

//  const startServer = async () => {
//   try {

//     app.listen(PORT, () => {
//       console.log("Server is running on port: ${PORT}");
//       // Una vez corriendo la app, activa swagger para documentar y visualizar las rutas de la API.
//     });
//   } catch (err) {
//     console.error("Failed to start server:", err);
//   }
// };

// startServer();