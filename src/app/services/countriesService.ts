import axios from 'axios';

// Configuración básica de Axios
const api = axios.create({
  baseURL: 'https://restcountries.com/v3.1'
});

export const CountryService = {
  getAllCountries: async () => {
    try {
      const response = await api.get('/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw error;
    }
  }
};