const mongoose = require("mongoose");

function save_sample_user(){
    const usuarioSchema = new mongoose.Schema({
        nombre: String,
        edad: Number,
        email: String,
    });
    const Usuario = mongoose.model("Usuario", usuarioSchema);
    const nuevoUsuario = new Usuario({
        nombre: "Santiago",
        edad: 22,
        email: "maria@example.com",
    });
    nuevoUsuario
        .save()
        .then(() => console.log("Usuario guardado"))
        .catch((err) => console.error("Error al guardar usuario:", err));
}
module.exports = {save_sample_user}