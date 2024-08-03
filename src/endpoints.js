import axios from 'axios';

const api = axios.create({
  baseURL: 'https://restcountries.com/v3.1/',
});

class Endpoints {
  async getCountries() {
    const response = await api.get('all');
    console.log(response.data)
    return response.data;
  }
}

export default new Endpoints();
