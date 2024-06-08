import app from "../common/app";
import axiosClient from "../common/axios_client";

export async function getShoppingListItems(id) {
    return (await axiosClient.get(`${app.apiUrl}/v1/shopping-list-items/shopping-lists/${id}`)).data;
}