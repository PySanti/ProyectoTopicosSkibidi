import request from 'supertest';  
import app from '../app.js'; // Importa tu aplicación Express  
import { disconnectDb } from '../db/connect_to_mongo.js';  
import { startServer, stopServer } from '../server.js'; // Ajusta según tu estructura de archivos  
import { Joke } from '../models/joke.js';  

describe('GET /req_5/:id', () => {  
    afterAll(async () => {  
        await disconnectDb();  
        await stopServer();  
    });  

    it("debería retornar un chiste existente", async () => {  
        const jokeToRetrieve = new Joke({   
            texto: 'Chiste para obtener',   
            autor: 'Autor de Chistes',   
            puntaje: 8,   
            categoria: 'Chistoso'   
        });  
        await jokeToRetrieve.save(); // Guardar un chiste en la base de datos  

        const response = await request(app).get(`/req_5/${jokeToRetrieve._id}`);  

        expect(response.status).toBe(200);  
        expect(response.body).toHaveProperty("_id", jokeToRetrieve._id.toString());  
        expect(response.body).toHaveProperty("texto", jokeToRetrieve.texto);  
    });  

    it("debería retornar un error 404 si el chiste no existe", async () => {  
        const invalidId = '507f1f77bcf86cd799439011'; // ID no válido que no está en la base de datos  
        const response = await request(app).get(`/req_5/${invalidId}`);  

        expect(response.status).toBe(404);  
        expect(response.body).toHaveProperty("error", 'Chiste no encontrado');  
    });  

    it("debería retornar un error 500 si ocurre un error en el servidor", async () => {  
        jest.spyOn(Joke, 'findById').mockImplementationOnce(() => {  
            throw new Error('Error intencional'); // Simular un error  
        });  

        const response = await request(app).get(`/req_5/someInvalidId`);  

        expect(response.status).toBe(500);  
        expect(response.body).toHaveProperty("error", 'Error al obtener el chiste');  
    });  
});