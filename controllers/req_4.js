import {Joke} from '../models/joke.js'; 


export const req_4 = async (req, res) => {
    // Funcion creada para cumplir con el requisito 4
    // Busca el chiste relacionado con el id recibido por url y lo elimina
    // En caso de que el id sea invalido y no se encuentre el chiste, se retorna un mensaje de error 
    const { id } = req.params;
    try {
        const joke = await Joke.findByIdAndDelete(id);
        if (!joke) {
            console.log('Chiste no encontrado');
            return res.status(404).json({ error: 'Chiste no encontrado' });
        }
        console.log('Chiste eliminado:', joke);
        return res.status(200).json({ message: 'Chiste eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el chiste:', error);
        return res.status(500).json({ error: 'Error al eliminar el chiste' });
    }
};