import express from "express";
import { req_1 } from "./controllers/req_1.js"; 
import { req_2 } from "./controllers/req_2.js";
import{ req_3 } from "./controllers/req_3.js"
import { req_4 } from "./controllers/req_4.js";
import { req_5 } from "./controllers/req_5.js";
import { req_6 } from "./controllers/req_6.js";
import { req_7 } from "./controllers/req_7.js";
import swaggerJsDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const app = express();  

const swaggerOptions = {  
    definition: {  
        openapi: '3.0.0',
        info: {  
            title: 'Mi API',  
            version: '1.0.0',  
            description: 'Documentación de mi API',  
        },  
    },  
    apis: ['app.js'],
};  
const swaggerDocs = swaggerJsDoc(swaggerOptions);  
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));  


app.use(express.json());

/**  
 * @swagger  
 * /req_1/:type:  
 *   get:  
 *     summary:  Requerimiento 1 
 *     responses:  
 *       200:  
 *         description: Retorna un chiste
 */  


app.get("/req_1/:type", req_1);

/**  
 * @swagger  
 * /req_2/:  
 *   post:  
 *     summary:  Requerimiento 2
 *     responses:  
 *       200:  
 *         description: Retorna el chiste creado con los datos recibidos en el cuerpo de la consulta
 */  
app.post("/req_2/", req_2);

/**  
 * @swagger  
 * /req_3/:id:  
 *   put:  
 *     summary:  Requerimiento 3
 *     responses:  
 *       200:  
 *         description: Retorna el los datos del chiste actualizado
 */  


app.put("/req_3/:id", req_3);


/**  
 * @swagger  
 * /req_4/:id:  
 *   delete:  
 *     summary:  Requerimiento 4
 *     responses:  
 *       200:  
 *         description: Retorna 200 en caso de haber eliminado exitosamente el chiste
 */  


app.delete("/req_4/:id", req_4);

/**  
 * @swagger  
 * /req_5/:id:  
 *   get:  
 *     summary:  Requerimiento 5
 *     responses:  
 *       200:  
 *         description: Retorna los datos del chiste encontrado
 */  


app.get("/req_5/:id", req_5);


/**  
 * @swagger  
 * /req_6/:categoria:  
 *   get:  
 *     summary:  Requerimiento 6
 *     responses:  
 *       200:  
 *         description: Retorna la cantidad de chistes de la categoria recibida
 */  


app.get("/req_6/:categoria", req_6 );

/**  
 * @swagger  
 * /req_7/:puntaje:  
 *   get:  
 *     summary:  Requerimiento 7
 *     responses:  
 *       200:  
 *         description: Retorna los datos de todos los chistes con el puntaje recibido
 */  


app.get("/req_7/:puntaje", req_7 );

export default app;


