import { mongoose } from "mongoose";
import {jokeSchema, Joke} from "../models/joke.js"



export const req_6 = async (req, res) => {
    // Funcion creada para cumplir con el requisito 6
    // Retorna la cantidad de chistes de la categoria recibida por url
    // En caso de que la categoria recibida por url sea invalida, se retorna un mensaje de error.
    const {categoria} = req.params;
    try{
        if (["humor negro", "dad joke", "chistoso", "malo"].includes(categoria.toLowerCase())){
            const cantidad  = await Joke.countDocuments({"categoria" : categoria})
            return res.status(200).json({"cantidad":cantidad})
        } else {
            return res.status(404).json({error : "categoría no encontrada"})
        }
    } catch(error){
        return res.status(400).json({error : "Error buscando chistes por categoria"})
    }
} 