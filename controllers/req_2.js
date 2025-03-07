import {Joke} from '../models/joke.js'; 




export const req_2 = async (req, res) => {
    // Funcion creada para cumplir con el requerimiento 2
    // Crea un chiste con los datos recibidos en el cuerpo de la consulta
    // Retorna los datos del nuevo chiste creado

    const { texto, autor, puntaje, categoria } = req.body;

    if (!texto || !puntaje || !categoria) {
        return res.status(400).json({ error: 'Error. El texto, el puntaje y la categoria son campos obligatorios' });
    }

    if (puntaje < 1 || puntaje > 10) {
        return res.status(400).json({ error: 'El puntaje debe ser entre 1 y 10' });
    }

    try {
        const newJoke = new Joke({
            texto,
            autor: autor || 'Se perdió en el Ávila como Led',
            puntaje,
            categoria
        });
        const savedJoke = await newJoke.save();
        return res.status(201).json({ id: savedJoke._id });
    } catch (error) {
        return res.status(500).json({ error: 'Error al guardar el chiste' });
    }
};
