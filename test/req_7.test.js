import request from 'supertest';  
import express from 'express';  
import mongoose from 'mongoose';  
import { req_7 } from '../path/to/your/module'; // Ajusta esta ruta a la ubicación correcta de tu archivo  

// Test de una búsqueda exitosa por puntaje  
describe('GET /req_7/:puntaje', () => {  
    afterAll(async () => {  
        await mongoose.connection.close();  
    });  
    it('debería devolver chistes que coincidan con el puntaje proporcionado', async () => {  
        // Aquí podrías insertar un chiste de prueba en la base de datos  
        // Para propósitos de esta prueba, asegúrate de insertar un chiste con `puntaje` 5.  
        const joke = new Joke({ texto: 'Un chiste de prueba', autor: 'Autor de prueba', puntaje: 5, categoria: 'Chistoso' });  
        await joke.save();  

        const response = await request(app).get('/req_7/5');  
        expect(response.status).toBe(200);  
        expect(response.body['registros encontrados']).toHaveLength(1);  
        expect(response.body['registros encontrados'][0].texto).toBe('Un chiste de prueba');  
        
        // Limpia después de la prueba  
        await Joke.deleteMany({});  
    });  
    
    it('debería devolver un error si el puntaje es inválido', async () => {  
        const response = await request(app).get('/req_7/abc');  
        expect(response.status).toBe(404);  
        expect(response.body.error).toBe('puntaje invalido');  
    });  

    it('debería devolver un error si no se encuentran chistes con ese puntaje', async () => {  
        const response = await request(app).get('/req_7/10'); // Suponiendo que no hay chistes con puntaje 10  
        expect(response.status).toBe(200);  
        expect(response.body['registros encontrados']).toHaveLength(0);  
    });  

    it('debería manejar un error en la base de datos con un mensaje adecuado', async () => {  
        jest.spyOn(Joke, 'find').mockImplementationOnce(() => {  
            throw new Error('Error de prueba');  
        });  
        const response = await request(app).get('/req_7/5');  
        expect(response.status).toBe(400);  
        expect(response.body.error).toBe('Error buscando chistes por puntaje');  
    });  
});