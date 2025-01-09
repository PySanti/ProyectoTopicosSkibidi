
import request from 'supertest';  
import app from '../app.js'; // Importa tu aplicación Express  
import { disconnectDb } from '../db/connect_to_mongo.js';   
import { startServer, stopServer } from '../server.js'; // Ajusta según tu estructura de archivos  
import { Joke } from '../models/joke.js';  


describe('DELETE /req_4/:id', () => {   
    afterAll(async () => {  
        await disconnectDb();   
        await stopServer();  
    });  


    it("debería eliminar un chiste existente y retornar un mensaje de éxito", async () => {  
        const jokeToDelete = new Joke({ texto: 'Chiste a eliminar',puntaje:10, categoria : "Chistoso"  });  
        await jokeToDelete.save(); // Guardar un chiste en la base de datos para la prueba  

        const response = await request(app).delete(`/req_4/${jokeToDelete._id}`);  

        expect(response.status).toBe(200);  
        expect(response.body).toHaveProperty("message", 'Chiste eliminado correctamente');  
    });  

    it("debería retornar un error 404 si el chiste no existe", async () => {  
        const invalidId = '507f1f77bcf86cd799439011'; // ID no válido que no está en la base de datos  
        const response = await request(app).delete(`/req_4/${invalidId}`);  

        expect(response.status).toBe(404);  
        expect(response.body).toHaveProperty("error", 'Chiste no encontrado');  
    });  
    a
});
