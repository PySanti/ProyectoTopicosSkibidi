import { mongoose } from "mongoose";
import { jokeSchema, Joke } from "../models/joke.js";

export const getInternalJoke = async () => {
    const joke = await Joke.findOne();
    return joke ? joke.texto : null;
};
