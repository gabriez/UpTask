import axios from "axios";

export const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export const configAxios = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }
}