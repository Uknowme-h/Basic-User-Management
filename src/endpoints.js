import axios from "axios";

const api = axios.create({
  baseURL: "https://restcountries.com/v3.1/",
});

class Endpoints {
  async getCountries() {
    const response = await api.get("all");
    const countryNames = response?.data?.map((country) => country.name.common);
    return countryNames;
  }
}

const endpoints = new Endpoints();
export default endpoints;
