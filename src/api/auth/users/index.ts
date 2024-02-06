import api from "../../index";
import { UserRegistration } from "../../../interfaces/api/users";

export const registerUserApi = async (payload: UserRegistration) => {
    const { data } = await api.post(`/users/register`, payload)
    return data
}

