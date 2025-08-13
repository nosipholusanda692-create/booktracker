import axios from "axios";

const API_URL = 'http://localhost:8080/api/books'; // backend port

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    
});

export const getBooks = () => api.get('');
export const getBookById = (id) => api.get(`/${id}`);
export const createBook = (book) => api.post('', book);
export const updateBook = (id, book) => api.put(`/${id}`, book);
export const deleteBook = (id) => api.delete(`/${id}`);


export default api;
