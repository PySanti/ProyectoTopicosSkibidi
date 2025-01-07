import express from "express";
import { connect_to_mongo } from "./db/connect_to_mongo.js";
import { req_1 } from "./controllers/req_1.js"; 
import { saveJoke } from "./controllers/req_2.js";
import{validarObjectId, actualizarJoke } from "./controllers/req_3.js"

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
connect_to_mongo();

app.get("/", req_1);
app.get("/joke", req_1); 
app.post("/joke", saveJoke);
app.put("/joke/:id", validarObjectId,actualizarJoke);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
