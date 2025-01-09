import { mongoose } from "mongoose";
import {jokeSchema, Joke} from "../models/joke.js"

export const req_7 = async (req, res) => {
    let {puntaje} = req.params;
    try{
        if (!isNaN(Number(puntaje))){
            puntaje = Number(puntaje)
            const cantidad = await Joke.countDocuments({"puntaje":puntaje})
            return res.status(200).json({"cantidad":cantidad})
        } else {
            return res.status(404).json({error : "puntaje invalido"})
        }
    } catch(error){
        return res.status(400).json({error : "Error buscando chistes por puntaje"})
    }
} 