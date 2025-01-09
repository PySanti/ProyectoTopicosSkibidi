import {Joke} from '../models/joke.js'; 



export const req_5 = async (req, res) => {
    // Funcion creada para cumplir con el requerimiento 5
    // Recibe el id de un chiste y retorna la data del mismo
    const {id} = req.params;
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