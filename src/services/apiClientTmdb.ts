import axios, { AxiosRequestConfig } from "axios";

const apiUrl = "https://api.themoviedb.org/3";
const axiosInstance = axios.create({
  baseURL: apiUrl,
});

class APIClientTMDB<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async get(params: AxiosRequestConfig) {
    const response = await axiosInstance.get<T>(this.endpoint, params);
    return response.data;
  }
}

export default APIClientTMDB;
