import api from "../../index";
import { UserLogin, UserRegistration } from "../../../interfaces/api/users";

//signup API
export const registerUserApi = async (payload: UserRegistration) => {
    const { data } = await api.post(`/users/register`, payload)
    return data
}

//signin API
export const loginUserApi = async (payload: UserLogin) => {
    const { data } = await api.post(`/users/login`, payload)
    return data
}