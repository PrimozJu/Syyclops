import axios from 'axios';

//switch between local and remote API
//const API_BASE_URL = 'https://dummyjson.com/';
const API_BASE_URL = 'http://127.0.0.1:8000/';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchData = async () => {
    try {
        //const response = await api.get('/users/?limit=20'); //hardcoded 20 users
        const response = await api.get('/users'); //connection to localhost without limit

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const updateData = async (endpoint, data) => {
    try {
        const response = await api.put(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
};

export const deleteData = async (id) => {
    try {
        const response = await api.delete('/user/' + id);
        return response.data;
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
};
