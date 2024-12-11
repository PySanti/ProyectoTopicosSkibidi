const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de la URI de conexión
const dbUser = "pysanti"; // Reemplaza con tu nombre de usuario de MongoDB
const dbPassword = "16102005"; // Reemplaza con tu contraseña de MongoDB
const dbName = "proyecto_topicos_db"; // Nombre de tu base de datos
const uri = `mongodb://localhost:27017/${dbName}`; // Cambia localhost si es necesario
mongoose
    .connect(uri, {})
    .then(() => {
        console.log("Conectado a MongoDB");
    })
    .catch((error) => {
        console.error("Error de conexión a MongoDB:", error);
    });

const usuarioSchema = new mongoose.Schema({
    nombre: String,
    edad: Number,
    email: String,
});
const Usuario = mongoose.model("Usuario", usuarioSchema);
const nuevoUsuario = new Usuario({
    nombre: "Maria",
    edad: 22,
    email: "maria@example.com",
});
nuevoUsuario
    .save()
    .then(() => console.log("Usuario guardado"))
    .catch((err) => console.error("Error al guardar usuario:", err));

app.use(express.json());
app.get("/", (req, res) => {
    res.send("¡Hola, mundo desde Express.js y MongoDB!");
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
