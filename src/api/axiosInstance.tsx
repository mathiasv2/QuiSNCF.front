import axios from "axios";

const api = axios.create({
    baseURL: "/api/",
    headers: {"Content-Type": "application/json"}
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log("le con de ta mère : ", error.message)
        return Promise.reject(error);
    }
)

export default api;