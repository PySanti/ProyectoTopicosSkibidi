import request from 'supertest';  
import app from '../app.js'; // Importa tu aplicación Express  
import { disconnectDb } from '../db/connect_to_mongo.js';  
import { startServer, stopServer } from '../server.js'; // Ajusta según tu estructura de archivos  
import { Joke } from '../models/joke.js';  

describe('GET /req_6/:categoria', () => {  
    afterAll(async () => {  
        await disconnectDb();  
        await stopServer();  
    });  

    it("debería retornar la cantidad de chistes en la categoría 'chistoso'", async () => {  
        const joke1 = new Joke({   
            texto: 'Chiste chistoso 1',   
            autor: 'Autor 1',   
            puntaje: 8,   
            categoria: 'Chistoso'   
        });  
        const joke2 = new Joke({   
            texto: 'Chiste chistoso 2',   
            autor: 'Autor 2',   
            puntaje: 7,   
            categoria: 'Chistoso'   
        });  
        await joke1.save();  
        await joke2.save();  

        const response = await request(app).get('/req_6/chistoso');  

        expect(response.status).toBe(200);  
        expect(response.body).toHaveProperty("cantidad", 2);  
    });  

    it("debería retornar la cantidad de chistes en la categoría 'humor negro'", async () => {  
        const joke = new Joke({   
            texto: 'Chiste de humor negro',   
            autor: 'Autor 3',   
            puntaje: 5,   
            categoria: 'Humor Negro'   
        });  
        await joke.save();  

        const response = await request(app).get('/req_6/humor negro');  

        expect(response.status).toBe(200);  
        expect(response.body).toHaveProperty("cantidad", 1);  
    });  

    it("debería retornar un error 404 si la categoría no existe", async () => {  
        const response = await request(app).get('/req_6/categoria_no_existente');  

        expect(response.status).toBe(404);  
        expect(response.body).toHaveProperty("error", "categoría no encontrada");  
    });  

    it("debería retornar un error 400 si ocurre un problema al buscar chistes", async () => {  
        jest.spyOn(Joke, 'countDocuments').mockImplementationOnce(() => {  
            throw new Error('Error intencional');  
        });  

        const response = await request(app).get('/req_6/chistoso');  

        expect(response.status).toBe(400);  
        expect(response.body).toHaveProperty("error", "Error buscando chistes por categoria");  
    });  
});