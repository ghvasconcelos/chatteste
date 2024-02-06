// LINK --> IMPORTS AXIOS
import axios from "axios";
// END AXIOS


const integraAPI = axios.create({
    baseURL: "https://www.integrachat.com.br/api/",
    headers: {
        "Content-Type": "application/json; charset=utf-8"
    },
    paramsSerializer: {
        indexes: false,
    },
});

export default integraAPI;

export const localApi = axios.create({
    baseURL: "http://localhost:8010/v2/",
    headers: {
        "Content-Type": "application/json; charset=utf-8"
    },
    paramsSerializer: {
        indexes: false,
    },
});