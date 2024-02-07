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

//check user status
export const userStatusCheck = async () => {
    const { data } = await api.get(`/users/checkstatus`)
    return data
}

export const logoutApi = async () => {
    const { data } = await api.delete(`/users/logout`)
    return data
}