import api from "..";
import { registerAuctionDetails } from "../../interfaces/api/auctions";

export const registerAuction = async (payload: registerAuctionDetails) => {
    const { data } = await api.post(`/auctions/register`, payload)
    return data
}

export const getAuctionsByUser = async () => {
    const { data } = await api.get('/auctions/auctions-by-user')
    return data
}

export const getAuctionById = async (auctionId: string) => {
    const { data } = await api.get(`auctions/auction-by-id/${auctionId}`)
    return data
}