import axios, { AxiosResponse, AxiosError } from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Update with your API URL


// Function to handle Axios errors
const handleAxiosError = (error: AxiosError) => {
    console.error(error);
    throw new Error('An error occurred while making the API request.');
};

// Function to store a search term
export const storeSearchTerm = async (term: string): Promise<void> => {
    try {
        await axios.post(`${API_BASE_URL}/store-search`, { term });
    } catch (error) {
        handleAxiosError(error);
    }
};

// Function to fetch search suggestions
export const fetchSearchSuggestions = async (): Promise<string[]> => {
    try {
        const response: AxiosResponse<string[]> = await axios.get(`${API_BASE_URL}/get-suggestions`);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};
