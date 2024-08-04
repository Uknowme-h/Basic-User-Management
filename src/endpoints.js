import axios from 'axios';

const api = axios.create({
  baseURL: 'https://restcountries.com/v3.1/',
});

class Endpoints {
  async getCountries() {
    const response = await api.get('all');
    console.log(response.data.name.common)
    return response.data.name;
  }
}

export default new Endpoints();
