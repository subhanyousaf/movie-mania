import axios, { AxiosRequestConfig } from "axios";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.subhanyousaf.me/api"
    : "http://192.168.0.102:5000/api";
const axiosInstance = axios.create({
  baseURL: apiUrl,
});

class APIClient<T, U = T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async get(params: AxiosRequestConfig) {
    const response = await axiosInstance.get<T>(this.endpoint, params);
    return response.data;
  }

  async post(data: T) {
    const response = await axiosInstance.post<U>(this.endpoint, data);
    return response.data;
  }
}

export default APIClient;
