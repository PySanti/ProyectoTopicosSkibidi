import { mongoose } from "mongoose";
import {jokeSchema, Joke} from "../models/joke.js"



export const req_6 = async (req, res) => {
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