import request from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';
import {disconnectDb} from '../db/connect_to_mongo.js'; 
import {stopServer } from '../server.js';

const testPort = 3000;

describe('GET /joke/:id', () => {  //////modificar
  afterAll(async () => {
     await disconnectDb(); 
     await mongoose.connection.close();
      await stopServer();
     });
     it("Debería dar error porque el ID tiene mas de 24", async () => {
        const chisteId = "1234567891234567891234567";
        const primerChiste = await Chiste.findOne({});
        if (!primerChiste) {
          console.error("No hay chistes disponibles en la DB.");
          return;
        }
        const testChiste = {
          id: chisteId,
          texto: "mmmmm",
          autor: "andres",
          puntaje: 9,
          categoria: "Malo",
        };  
        const response = await request(app)
          .put(/joke/${chisteId})   //////modificar
          .send(testChiste);
        expect(response.status).toBe(400); 
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("success");
      });



      it("Debería dar error porque el ID tiene menos de 24", async () => {
        const chisteId = "1234567";
        const primerChiste = await Chiste.findOne({});
        if (!primerChiste) {
          console.error("No hay chistes disponibles en la DB.");
          return;
        }
        const testChiste = {
          id: chisteId,
          texto: "mmmmm",
          autor: "andres",
          puntaje: 9,
          categoria: CategoriaChiste.Malo,
        };  
        const response = await request(app)
          .put(/joke/${chisteId})   //////modificar
          .send(testChiste);
        expect(response.status).toBe(400); 
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("success");
      });
    });