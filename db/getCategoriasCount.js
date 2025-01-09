import { mongoose } from "mongoose";
import { jokeSchema, Joke } from "../models/joke.js";

export const getCategoriasCount = async (categoria) => {
    return Joke.countDocuments({categoria:""});
};

