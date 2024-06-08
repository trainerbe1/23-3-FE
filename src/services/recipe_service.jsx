import app from "../common/app";
import axiosClient from "../common/axios_client";

export async function getRecipes() {
    return (await axiosClient.get(`${app.apiUrl}/v1/recipes`)).data;
}