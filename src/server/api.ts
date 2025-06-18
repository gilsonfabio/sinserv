import axios from "axios";

export const api = axios.create({
    //baseURL: "http://localhost:3333"
    baseURL: "https://backcaldascard.vercel.app/"
    //baseURL: "https://backbeer.vercel.app/"
})
