import express from "express";
import { connect_to_mongo } from "./db/connect_to_mongo.js";
import { save_sample_user } from "./db/save_sample_user.js";
import { req_1 } from "./controllers/req_1.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get("/", req_1); // 1er requisito mandatorio

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
export default app;
