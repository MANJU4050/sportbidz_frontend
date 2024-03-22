import { Button, GridItem, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const AuctionCard = ({ auction }) => {

    const navigate = useNavigate()

    return (
        <GridItem bg='green' display='grid' padding='10px' borderRadius='10px'>
            <Text>Auction id : {auction?._id}</Text>
            <Text>tournament Id : {auction?.tournamentId}</Text>
            <Text>number of teams : {auction?.numberOfTeams}</Text>
            <Text>playersPerTeam : {auction?.playersPerTeam}</Text>
            <Text>Status : {auction?.auctionStatus}</Text>
            <Text>Managers : {auction?.managers?.length}</Text>
            <Button onClick={() => { navigate(`/dashboard/auction/${auction?._id}/${auction?.tournamentId}`) }}>join</Button>
        </GridItem>
    )
}

export default AuctionCard