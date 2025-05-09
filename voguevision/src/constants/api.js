import axios from "axios";

export const tryonApi = axios.create({
    baseURL: "https://api.fashn.ai/v1/",
    headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_APP_API}`,
        "Content-Type":'application/json'
    }
})