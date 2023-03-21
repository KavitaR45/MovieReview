import axios from "axios";

var ReturnData = {}

export const API_URL = 'https://api.themoviedb.org/3/'

export const API_INSTANCE = axios.create({
    baseURL: API_URL,
    timeout: 5000,
});

export const AxiosGET = async (instance, url) => {
    try {
        const resp = await instance.get(url);
        ReturnData[`POST_${url}`] += `Post Request:${url} | Responce: ${resp.status}| ${resp.statusText}`
        return resp.data
    } catch (err) {
        ReturnData[`POST_${url}`] += `Request Error:${url} | Error: ${err}`
    }
}

