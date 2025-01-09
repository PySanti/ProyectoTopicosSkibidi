import request from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';
import { disconnectDb} from '../db/connect_to_mongo.js'; 
import { stopServer } from '../server.js';


describe('POST /?type=$type', () => { 
  afterAll(async () => {
     await disconnectDb(); 
     await mongoose.connection.close();
     await stopServer();
     });

     it('Debería crear un chiste en la db', async () => { 
        const chiste = { 
            texto: 'mama mama en la escuela me dicen mentiroso, hijo no tienes escuela',
            puntaje: 3, 
            categoria: 'Humor Negro', 
           }; 
          const response = await request(app).post('/req_2/').send(chiste); 
          expect(response.status).toBe(201);
         // expect(response.body.chiste.id).toBe(chiste.id);
      });


    it('Debería responder con un error 400 si faltan campos obligatorios', async () => {
        const chiste = {
        texto: '',
        puntaje: 8,
        categoria: 'Chistoso',
        };
        const response = await request(app).post('/req_2/').send(chiste);
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Error. El texto, el puntaje y la categoria son campos obligatorios');
    });

  it('Debería responder con un error 400 si el puntaje está fuera del rango permitido', async () => {
    const chiste = {
      texto: 'Un chiste fuera de rango',
      puntaje: 100,
      categoria: 'HumorNegro',
    };
    const response = await request(app).post('/req_2/').send(chiste);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('El puntaje debe ser entre 1 y 10');
  });
});