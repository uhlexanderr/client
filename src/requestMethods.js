import axios from "axios";


const BASE_URL = "http://localhost:5000/api/"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTA4Y2U2MTJiNjQ3MTUzZDZkY2IwNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4NzU1NzU1MiwiZXhwIjoxNjg3ODE2NzUyfQ.FzMOd0JDzRcw5wxrTriKBO_wDijTUgVn0XMZmp92-aM"


export const publicRequest = axios.create ({
    baseURL: BASE_URL,
});

export const userRequest = axios.create ({
    baseURL: BASE_URL,
    header: {token: `Bearer ${TOKEN}`},
});

