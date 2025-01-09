import {Joke} from '../models/joke.js'; 

export const getJokeById = async (req, res) => {
    const {id} = req.params;
    const {texto, autor, puntaje, categoria} = req.body;
    try {
        const joke = await Joke.findById(id);
        if (!joke) {
            return res.status(404).json({ error: 'Chiste no encontrado' });
        }
        return res.status(200).json(joke);

    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener el chiste' });
    }
};