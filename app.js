import express from "express";
import { connect_to_mongo } from "./db/connect_to_mongo.js";
import { req_1 } from "./controllers/req_1.js"; // Importa correctamente req_1

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
connect_to_mongo();

// Ruta para obtener un chiste y el primer requisito
app.get("/", req_1);
app.get("/joke", req_1); // Usa el mismo controlador

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
