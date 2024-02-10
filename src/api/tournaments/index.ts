import api from "..";
import { RegisterTournament, getTournaments } from "../../interfaces/api/tournaments";

export const regiserTournamentApi = async (payload: RegisterTournament) => {
    const { data } = await api.post('/tournaments/register', payload)
    return data
}

export const getTournamentsByUser = async ({ page, limit, search }: getTournaments) => {
    const { data } = await api.get(`/tournaments/getbyuser?page=${page}&limit=${limit}&search=${search}`)
    return data
}

export const getAllTournaments = async ({ page, limit, search }: getTournaments) => {
    const { data } = await api.get(`/tournaments/getall?page=${page}&limit=${limit}&search=${search}`)
    return data
}

export const getTournamentDetails = async (tournamentId: string) => {
    const { data } = await api.get(`/tournaments/tournamentdetails/${tournamentId}`)
    return data
}