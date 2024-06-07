import axios from "axios";
import apiMessage from "../common/api_message";
import refreshToken from "../services/auth_service";

const axiosClient = axios.create();

axiosClient.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
);

axiosClient.interceptors.response.use(
    async function (response) {
      const res = response.data;
      
      if(res.message === apiMessage.tokenExpired) {
        await refreshAccessToken();
        return axiosClient.request(response.config);
      } else {
        return Promise.reject(error);
      }
    },
    function (error) {
      return Promise.reject(error);
    }
);

const refreshAccessToken = async (res) => {
    try {
      const tokens = await refreshToken();
      localStorage.setItem('token', tokens.data.accessToken);
      localStorage.setItem('refreshToken', tokens.data.refreshToken);
    } catch (error) {
        localStorage.clear();
        location.href = '/';
        Promise.reject(error);
    }
}