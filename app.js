import express  from "express";
import { connect_to_mongo } from "./db/connect_to_mongo.js";
import { save_sample_user } from "./db/save_sample_user.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

connect_to_mongo();
save_sample_user();
app.get("/", (req, res) => {
    res.send("¡Hola, mundo desde Express.js y MongoDB!");
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
export default app;