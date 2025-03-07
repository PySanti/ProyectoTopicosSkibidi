import mongoose from 'mongoose';
import {Joke} from '../models/joke.js'; 


export const req_3 = async (req, res) => {
    // Funcion creada para cumplir con el requisito 4
    // Actualiza los datos del chiste asociado con el id recibido por url
    const { id } = req.params;
    const { texto, autor, puntaje, categoria } = req.body;
    if (mongoose.Types.ObjectId.isValid(id)){
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
    } else {
        return res.status(400).json({ error: 'ID no válido' });
    }
};

