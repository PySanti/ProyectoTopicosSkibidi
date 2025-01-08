import request from 'supertest';
import app from '../app.js';
import { connect_to_mongo, disconnectDb} from '../db/connect_to_mongo.js'; 
import { startServer, stopServer } from '../server.js';

let server;
const testPort = 3000;

describe('GET /?type=$type', () => { 
  afterAll(async () => {
      await disconnectDb(); 
      await stopServer();
    });
  it("GET /?type=Chuck debería traer un chiste de Chuck Norris", async () => {
    const response = await request(app).get("/?type=Chuck");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("joke"); 
  });

  it("GET /?type=Dad deberia de traer una chiste de papa", async ()=> {
    const response = await request(app).get("/?type=Chuck");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("joke");
  });

  it("GET /?type=Propio deberia de traer un chiste propio", async ()=> {
    const response = await request(app).get("/?type=Propio");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("joke");
  });

  it ("GET /?type=Invalido deberia de traer un error 400", async () => {
    const response = await request(app).get("/?type=Invalido");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

});
