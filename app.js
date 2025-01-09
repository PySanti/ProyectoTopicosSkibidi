import express from "express";
import { req_1 } from "./controllers/req_1.js"; 
import { req_2 } from "./controllers/req_2.js";
import{ req_3 } from "./controllers/req_3.js"
import { req_4 } from "./controllers/req_4.js";
import { req_5 } from "./controllers/req_5.js";
import { req_6 } from "./controllers/req_6.js";
import { req_7 } from "./controllers/req_7.js";

const app = express();

app.use(express.json());
app.get("/req_1/:type", req_1);
app.post("/req_2/", req_2);
app.put("/req_3/:id", req_3);
app.delete("/req_4/:id", req_4);
app.get("/req_5/:id", req_5);
app.get("/req_6/:categoria", req_6 );
app.get("/req_7/:puntaje", req_7 );

export default app;


