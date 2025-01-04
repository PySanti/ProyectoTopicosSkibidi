import { MongoClient } from 'mongodb';

const dbName = 'proyecto_topicos_db';
const url = `mongodb://127.0.0.1:27017/${dbName}`;
const client = new MongoClient(url);

export const getInternalJoke = async () => {
    try {
        await client.connect();
        const database = client.db(dbName);
        const jokes = database.collection('jokes');

        const joke = await jokes.findOne();
        return joke ? joke.text : null;
    } finally {
        await client.close();
    }
};
