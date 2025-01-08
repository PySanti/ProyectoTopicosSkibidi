import express from "express";
import { req_1 } from "./controllers/req_1.js"; 
import { saveJoke } from "./controllers/req_2.js";
import{validarObjectId, actualizarJoke } from "./controllers/req_3.js"
import { eliminarJoke } from "./controllers/req_4.js";
import { getJokeById } from "./controllers/req_5.js";

const app = express();

app.use(express.json());
app.get("/", req_1);
app.get("/joke", req_1);
app.post("/joke", saveJoke);
app.put("/joke/:id", validarObjectId,actualizarJoke);
app.delete("/joke/:id", eliminarJoke);
app.get("/joke/:id", getJokeById);

export default app;


