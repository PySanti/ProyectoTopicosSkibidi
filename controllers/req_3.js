import mongoose from 'mongoose';
import Joke from '../models/joke.js'; 


export const validarObjectId = (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log('ID no válido');
        return res.status(400).json({ error: 'ID no válido' });
    }
    next();
};


export const actualizarJoke = async (req, res) => {
    const { id } = req.params;
    const { texto, autor, puntaje, categoria } = req.body;
    try {
        const joke = await Joke.findById(id);
        if (!joke) {
            console.log('Chiste no encontrado');
            return res.status(404).json({ error: 'Chiste no encontrado' });
        }

        if (texto) joke.texto = texto;
        if (autor) joke.autor = autor;
        if (puntaje !== undefined) {
            if (puntaje < 1 || puntaje > 10) {
                console.log('Puntaje fuera de rango');
                return res.status(400).json({ error: 'El puntaje debe ser entre 1 y 10' });
            }
            joke.puntaje = puntaje;
        }
        if (categoria) joke.categoria = categoria;

        const updatedJoke = await joke.save();
        console.log('Chiste actualizado:', updatedJoke);
        return res.status(200).json(updatedJoke);
    } catch (error) {
        console.error('Error al actualizar el chiste:', error);
        return res.status(500).json({ error: 'Error al actualizar el chiste' });
    }
};

