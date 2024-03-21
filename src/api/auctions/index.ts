import api from "..";
import { registerAuctionDetails } from "../../interfaces/api/auctions";

export const registerAuction = async (payload: registerAuctionDetails) => {
    const { data } = await api.post(`/auctions/register`, payload)
    return data
}