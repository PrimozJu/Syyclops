import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com/';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
export const fetchData = async () => {
    try {
        const response = await api.get('/users/?limit=20'); //hardcoded 20 users
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
