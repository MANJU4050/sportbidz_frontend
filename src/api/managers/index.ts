import api from "..";
import { registerManagerDetails } from "../../interfaces/api/managers";


export const registerManager = async (payload: registerManagerDetails) => {
    const { data } = await api.post('/managers/register', payload)
    return data
}

export const getManagersByTournament = async (tournamentId: string) => {
    const { data } = await api.get(`/managers/managers-by-tournament/${tournamentId}`)
    return data
}