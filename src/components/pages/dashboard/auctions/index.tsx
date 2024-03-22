import { useEffect, useState } from "react"
import { getAuctionById } from "../../../../api/auctions"
import { useParams } from "react-router-dom"
import { Avatar, Box, Button, Text, Heading, FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react"

const Auction = () => {

    const { auctionId } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [auction, setAuction] = useState({})
    const [isAdmin, setIsAdmin] = useState(false)
    const [currentBids, setCurrentBids] = useState([])
    const [currentHikePoints, setCurrentHikePoints] = useState(0)
    const [currentPlayer, setCurrentPlayer] = useState({
        name: "Manjunath",
        mobile: "5555555555",
        playerType: "batsman",
        address: "Palakkad"
    })

    const getAuctionDetails = async () => {
        try {
            setIsLoading(false)
            const response = await getAuctionById(auctionId)
            if (response) {
                setAuction(response?.auction)
                setIsAdmin(response?.isAdmin)
                setCurrentHikePoints(response?.auction?.currentHikePoints)
            }
            console.log(response)


        } catch (error) {
            setIsLoading(false)
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getAuctionDetails()

    }, [])

    const items = Array.from({length: auction?.numberOfTeams},(_, index) => index)
    return (
        <>
            <Box display='grid' gap='10px' gridTemplateRows='50px 400px 310px' gridTemplateColumns='repeat(12,1fr)' gridTemplateAreas={`"h h h h h h h h h h h h"
                                                                                                    "p p p s s s s t t t t t"
                                                                                                    "m m m m m m m b b b b b"`}>
                <Heading textAlign='center' gridArea='h' bg='orange' w='100%'>{auction?.auctionStatus}</Heading>
                <Box gap='10px' paddingLeft='20px' paddingRight='20px' bg='darkgreen' gridArea='p' display='grid' gridTemplateAreas={`"a a"
                "a a"
                "n m"
                "b p"`}>
                    <Box gridArea='a' display='flex' justifyContent='center' alignItems='center'>
                        <Avatar size='2xl' name={currentPlayer?.name} />
                    </Box>

                    <Box gridArea='n' display='flex' justifyContent='flex-start' alignItems='center'>
                        <Text>Name : {currentPlayer?.name}</Text>
                    </Box>
                    <Box gridArea='m' display='flex' justifyContent='flex-start' alignItems='center'>
                        <Text>Mobile : {currentPlayer?.mobile}</Text>
                    </Box>
                    <Box gridArea='b' display='flex' justifyContent='flex-start' alignItems='center'>
                        <Text>Player Type : {currentPlayer?.playerType}</Text>
                    </Box>
                    <Box gridArea='p' display='flex' justifyContent='flex-start' alignItems='center'>
                        <Text>Place : {currentPlayer?.address}</Text>
                    </Box>
                </Box>

                <Box overflowY="auto" bg='darkcyan' gridArea='s' display='flex' width='100%' flexDirection='column-reverse' gap='5px' p='5px' >
                    <Box display='flex' bg='black' minHeight='60px' justifyContent='space-around' alignItems='center'>
                        <Box>team : Demons</Box>
                        <Box>points : 150</Box>
                    </Box>
                    <Box display='flex' bg='black' minHeight='60px' justifyContent='space-around' alignItems='center'>
                        <Box>team : Mighty Demons</Box>
                        <Box>points : 200</Box>
                    </Box>
                    <Box display='flex' bg='black' minHeight='60px' justifyContent='space-around' alignItems='center'>
                        <Box>team : Mighty Demons</Box>
                        <Box>points : 200</Box>
                    </Box>
                    <Box display='flex' bg='black' minHeight='60px' justifyContent='space-around' alignItems='center'>
                        <Box>team : Mighty Demons</Box>
                        <Box>points : 200</Box>
                    </Box>
                    <Box display='flex' bg='black' minHeight='60px' justifyContent='space-around' alignItems='center'>
                        <Box>team : Mighty Demons</Box>
                        <Box>points : 200</Box>
                    </Box>
                    <Box display='flex' bg='black' minHeight='60px' justifyContent='space-around' alignItems='center'>
                        <Box>team : Mighty Demons</Box>
                        <Box>points : 200</Box>
                    </Box>
                    <Box display='flex' bg='black' minHeight='60px' justifyContent='space-around' alignItems='center'>
                        <Box>team : Mighty Demons</Box>
                        <Box>points : 200</Box>
                    </Box>
                    <Box display='flex' bg='black' minHeight='60px' justifyContent='space-around' alignItems='center'>
                        <Box>team : Mighty Demons</Box>
                        <Box>points : 200</Box>
                    </Box>
                    <Box display='flex' bg='black' minHeight='60px' justifyContent='space-around' alignItems='center'>
                        <Box>team : Mighty Demons</Box>
                        <Box>points : 200</Box>
                    </Box>
                    <Box display='flex' bg='black' minHeight='60px' justifyContent='space-around' alignItems='center'>
                        <Box>team : Mighty Demons</Box>
                        <Box>points : 200</Box>
                    </Box>
                    <Box display='flex' bg='black' minHeight='60px' justifyContent='space-around' alignItems='center'>
                        <Box>team : Mighty Demons</Box>
                        <Box>points : 200</Box>
                    </Box>
                    <Box display='flex' bg='black' minHeight='60px' justifyContent='space-around' alignItems='center'>
                        <Box>team : Mighty Demons</Box>
                        <Box>points : 200</Box>
                    </Box>
                    <Box display='flex' bg='black' minHeight='60px' justifyContent='space-around' alignItems='center'>
                        <Box>team : Mighty Demons</Box>
                        <Box>points : 200</Box>
                    </Box>
                </Box>

                <Box gap='10px' p='10px' bg='darkgray' gridArea='t' display='grid' gridTemplateColumns='repeat(3,1fr)' gridTemplateAreas={`"tl tl tl"
                                                                                                                        "tm pl rp"
                                                                                                                        " bp mp hp"`}>
                    <Box bg='purple' gridArea='tl' display='flex' justifyContent='center' alignItems='center'><Text>Power Rangers League</Text></Box>
                    <Box bg='red' gridArea='tm' display='flex' justifyContent='center' alignItems='center'><Text>Total Teams : {auction?.numberOfTeams}</Text></Box>
                    <Box bg='turquoise' gridArea='pl' display='flex' justifyContent='center' alignItems='center'><Text>players per team : {auction?.playersPerTeam}</Text></Box>
                    <Box bg='tan' gridArea='rp' display='flex' justifyContent='center' alignItems='center'><Text>total registered players</Text></Box>
                    <Box bg='teal' gridArea='bp' display='flex' justifyContent='center' alignItems='center'><Text>base price : {auction?.basePlayerPoints}</Text></Box>
                    <Box bg='darkgreen' gridArea='mp' display='flex' justifyContent='center' alignItems='center'><Text>max price : {auction?.maxPlayerPoints}</Text></Box>
                    <Box bg='yellowgreen' gridArea='hp' display='flex' justifyContent='center' alignItems='center'><Text>current hike points : {auction?.currentHikePoints}</Text></Box>
                </Box>
 
                <Box overflowY="auto" overflowX='auto'  bg='darkcyan' gridArea='m' display='flex' height='100%' w='100%'  flexDirection='column' gap='5px' p='5px' >
                    {auction && auction?.managers?.length !== 0 && auction?.managers?.map((team) => {
                        return <Box key={team?._id} display='flex' bg='indigo' flexWrap='nowrap' gap='25px' minHeight='60px' height='100%'  justifyContent='stretch' alignItems='center' paddingLeft='20px'>
                            <Box  minW='150px'  flexWrap='nowrap'    display='flex' justifyContent='center' alignItems='center'>  {team?.teamName}</Box>
                            {items?.map((item)=>{
                                return  <Box key={item} > <Avatar size='sm' /></Box>
                            })}
                           
                            
                        </Box>
                    })}
                 
                </Box>

                <Box bg='rose' gridArea='b' display='grid' padding='20px' border='2px solid white'>
                    
                    {isAdmin &&<> <Box display='flex' justifyContent='center' alignItems='center' gap='10px'>
                        <FormControl>
                            <Input type='number' value={currentHikePoints} />
                            <FormErrorMessage>error</FormErrorMessage>
                        </FormControl>
                        <Button bg='blue' color='white'>Update</Button>
                    </Box>
                    
                    <Box display='flex' justifyContent='space-evenly' alignItems='center' gap='10px'>
                        <Button bg='green' color='white' w='100%'>start</Button>
                        <Button bg='magenta' color='white' w='100%'>Sell Player</Button>
                        <Button bg='orange' color='white' w='100%'>Next Player</Button>
                    </Box> </>}
                    {!isAdmin && <Button>bid</Button>}
                </Box>
            </Box>
        </>
    )
}

export default Auction