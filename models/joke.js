import mongoose from 'mongoose';

export const jokeSchema = new mongoose.Schema({
    texto: { type: String, required: true },
    autor: { type: String, default: 'Se perdió en el Ávila como Led' },
    puntaje: { type: Number, required: true, min: 1, max: 10 },
    categoria: {
        type: String,
        required: true,
        enum: ['Dad joke', 'Humor Negro', 'Chistoso', 'Malo']
    }
});

export const Joke = mongoose.model('Joke', jokeSchema);

