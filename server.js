import app from './app.js';
import { connect_to_mongo } from "./db/connect_to_mongo.js";

const PORT = process.env.PORT || 3000;

export async function startServer() {
  await connect_to_mongo();
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
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