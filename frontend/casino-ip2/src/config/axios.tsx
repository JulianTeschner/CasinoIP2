import env from "./env";
import axios from "axios";

const instance = axios.create({
  baseURL: env.API_ENDPOINT,
  headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
});

export default instance;