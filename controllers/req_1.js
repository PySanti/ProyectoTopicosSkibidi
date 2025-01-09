import axios from 'axios';
import { getInternalJoke } from '../db/getJoke.js'; 

export const req_1 = async (req, res) => {
    // Funcion creada para cumplir con el requerimiento 5
    // Recibe un parametro por url
    // En caso de que el parametro sea 'Chuck', se retorna un chiste de la api chucknorris
    // En caso de que el parametro sea 'Dad', se retorna un chiste de la api dadjoke
    // En caso de que el parametro sea 'Propio' se retorna un chiste de la base de datos
    // En caso de que no sea ninguna de las anteriores se retorna un mensaje de error
    const { type } = req.params;
    try {
        let joke;
        switch (type) {
            case 'Chuck':
                const chuckResponse = await axios.get('https://api.chucknorris.io/jokes/random');
                joke = chuckResponse.data.value;
                break;
            case 'Dad':
                const dadResponse = await axios.get('https://icanhazdadjoke.com/', { headers: { 'Accept': 'application/json' } });
                joke = dadResponse.data.joke;
                break;
            case 'Propio':
                joke = await getInternalJoke(); 
                if (!joke) {
                    joke = 'Aun no hay chistes, cree uno!'
                }
                break;
            default:
                return res.status(400).json({ error: 'Parametro invalido, intenta usar "Chuck", "Dad" o "Propio"' });
        }

        return res.status(200).json({ joke });
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener el chiste' });
    }
};


