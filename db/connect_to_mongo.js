import { load_secrets } from "../utils/load_secrets.js";
import mongoose from "mongoose";

export async function connect_to_mongo() {
    const secretData = await load_secrets("./secrets.json");
    const dbUser = secretData.DB_USERNAME;
    const dbPassword = secretData.DB_PWD;
    const dbName = "proyecto_topicos_db";
    const uri = `mongodb://127.0.0.1:27017/${dbName}`;
    mongoose
        .connect(uri, {})
        .then(() => {
            console.log("Conectado a MongoDB");
        })
        .catch((error) => {
            console.error("Error de conexión a MongoDB:", error);
        });
}

export async function disconnectDb() {
    await mongoose.disconnect();
    await mongoose.connection.close();
    console.log("Desconectado de MongoDB");
}
