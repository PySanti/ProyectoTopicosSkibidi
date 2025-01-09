import { mongoose } from "mongoose";
import {jokeSchema, Joke} from "../models/joke.js"



export const req_7 = async (req, res) => {
    // Funcion creada para cumplir con el requisito 7
    // Retorna los datos de todos los chistes con el puntaje recibido por url
    // En caso de que el parametro no sea un numero, se retornara un mensaje de error
    let {puntaje} = req.params;
    try{
        if (!isNaN(Number(puntaje))){
            puntaje = Number(puntaje)
            const respuesta = await Joke.find({"puntaje":puntaje})
            return res.status(200).json({"registros encontrados":respuesta})
        } else {
            return res.status(404).json({error : "puntaje invalido"})
        }
    } catch(error){
        return res.status(400).json({error : "Error buscando chistes por puntaje"})
    }
} 