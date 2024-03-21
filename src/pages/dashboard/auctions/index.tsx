import { useEffect, useState } from "react"
import { getAuctionsByUser } from "../../../api/auctions"
import { Box, Grid } from "@chakra-ui/react"
import AuctionCard from "./auction"

const Auctions = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [auctions, setAuctions] = useState([])
    const getAuctions = async () => {
        try {

            setIsLoading(true)
            const response = await getAuctionsByUser()
            if (response.length !== 0) {
                setAuctions(response)
            }
            console.log(response, "auctions")

        } catch (error) {
            setIsLoading(false)
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getAuctions()
    }, [])


    return (
        <Box ><Grid padding='10px' gap='10px' gridTemplateColumns='repeat(12,1fr)' gridTemplateRows='auto' >

            {auctions && auctions?.length !== 0 && auctions?.map((auction) => {
                return <AuctionCard key={auction?._id} auction={auction} />
            })}

        </Grid>
        </Box>
    )
}

export default Auctions