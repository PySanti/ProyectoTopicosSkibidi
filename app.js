import express from "express";
import { connect_to_mongo } from "./db/connect_to_mongo.js";
import { req_1 } from "./controllers/req_1.js"; 
import { saveJoke } from "./controllers/req_2.js";
import{validarObjectId, actualizarJoke } from "./controllers/req_3.js"
import { eliminarJoke } from "./controllers/req_4.js";
import { getJokeById } from "./controllers/req_5.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
connect_to_mongo();

app.get("/", req_1);
app.get("/joke", req_1);
app.post("/joke", saveJoke);
app.put("/joke/:id", validarObjectId,actualizarJoke);
app.delete("/joke/:id", eliminarJoke);
app.get("/joke/:id", getJokeById);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
