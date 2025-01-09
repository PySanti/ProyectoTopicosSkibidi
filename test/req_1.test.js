import request from 'supertest';  
import app from '../app.js'; // Importa tu aplicación Express  
import { disconnectDb } from '../db/connect_to_mongo.js';   
import { startServer, stopServer } from '../server.js'; // Ajusta según tu estructura de archivos  
import axios from 'axios';  
import { getInternalJoke } from '../db/getJoke.js';   

jest.mock('axios'); // Mockear axios  
jest.mock('../db/getJoke.js'); // Mockear la función getInternalJoke  

let server;  
const testPort = 3000;  

describe('GET /:type (req_1)', () => {   
    afterAll(async () => {  
        await disconnectDb();   
        await stopServer();  
    });  

    it("GET /Chuck debería traer un chiste de Chuck Norris", async () => {  
        const chuckJoke = { value: "Esto es un chiste de Chuck Norris" };  
        
        // Simular la respuesta de la API de Chuck Norris  
        axios.get.mockResolvedValue({ data: chuckJoke });  

        const response = await request(app).get("/req_1/Chuck");  

        expect(response.status).toBe(200);  
        expect(response.body).toHaveProperty("joke", chuckJoke.value);  
    });  

    it("GET /Dad debería traer un chiste de Dad", async () => {  
        const dadJoke = { joke: "Esto es un Dad Joke" };  
        
        // Simular la respuesta de la API de Dad Joke  
        axios.get.mockResolvedValue({ data: dadJoke });  

        const response = await request(app).get("/req_1/Dad");  

        expect(response.status).toBe(200);  
        expect(response.body).toHaveProperty("joke", dadJoke.joke);  
    });  

    it("GET /Propio debería traer un chiste interno", async () => {  
        const internalJoke = "Esto es un chiste interno";  
        
        // Mockear getInternalJoke para que retorne un chiste  
        getInternalJoke.mockResolvedValue(internalJoke);  

        const response = await request(app).get("/req_1/Propio");  

        expect(response.status).toBe(200);  
        expect(response.body).toHaveProperty("joke", internalJoke);  
    });  

    it("GET /Propio cuando no hay chistes debería retornar el mensaje adecuado", async () => {  
        // Mockear getInternalJoke para que retorne undefined  
        getInternalJoke.mockResolvedValue(undefined);  

        const response = await request(app).get("/req_1/Propio");  

        expect(response.status).toBe(200);  
        expect(response.body).toHaveProperty("joke", "Aun no hay chistes, cree uno!");  
    });  

    it("GET /Invalid debería retornar un error 400", async () => {  
        const response = await request(app).get("/req_1/Invalid");  

        expect(response.status).toBe(400);  
        expect(response.body).toHaveProperty("error", 'Parametro invalido, intenta usar "Chuck", "Dad" o "Propio"');  
    });  

    it("GET / sin tipo debería retornar un error 400", async () => {  
        const response = await request(app).get("/req_1/");  

        expect(response.status).toBe(404);  
        expect(response.body).toHaveProperty("error", 'Parametro invalido, intenta usar "Chuck", "Dad" o "Propio"');  
    });  
});