import axios from "axios";
import app from "../common/app";

export async function refreshToken() {
    return (await axios.post(`${app.apiUrl}/v1/auth/refresh/${localStorage.getItem('refreshToken')}`)).data;
}

export async function login(username, password) {
    return (await axios.post(`${app.apiUrl}/v1/auth/login`, {
        username, 
        password
    })).data;
}

export async function register(username, password, repeatPassword) {
    return (await axios.post(`${app.apiUrl}/v1/auth/register`, {
        username, 
        password,
        repeatPassword
    })).data;
}

export async function logout() {
    return (await axios.delete(`${app.apiUrl}/v1/auth/refresh/${localStorage.getItem('refreshToken')}`)).data;
}