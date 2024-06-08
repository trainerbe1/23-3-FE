import app from "../common/app";
import axiosClient from "../common/axios_client";

export async function getRecipes(page, pageSize) {
    return (await axiosClient.get(`${app.apiUrl}/v1/recipes`, {
        params: {
            page,
            pageSize
        }
    })).data;
}