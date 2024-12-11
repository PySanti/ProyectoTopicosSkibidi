const express = require("express");
const connect_to_mongo = require("./db/connect_to_mongo").connect_to_mongo;
const save_sample_user = require("./db/save_sample_user").save_sample_user;

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

connect_to_mongo();

app.get("/", (req, res) => {
    res.send("¡Hola, mundo desde Express.js y MongoDB!");
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
