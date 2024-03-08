import api from "..";
import { registerPlayerDetails } from "../../interfaces/api/players";


export const registerPlayer = async (payload:registerPlayerDetails) => {
    const { data } = await api.post('/players/register', payload)
    return data
}

export const getPlayersByTournament = async (tournamentId: string) => {

    const { data } = await api.get(`/players/getplayers/${tournamentId}`)
    return data
}