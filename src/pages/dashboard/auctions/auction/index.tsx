import { Box, Button, GridItem, Text } from '@chakra-ui/react'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { deleteAuctionById } from '../../../../api/auctions'
import { useContext, useState } from 'react'
import { AuthContext } from '../../../../context/authcontext'
const AuctionCard = ({ auction, getAuctions }) => {

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const {user} = useContext(AuthContext)

    const deleteAuction = async () => {
        try {
            setIsLoading(true)
            await deleteAuctionById(auction?._id)
        } catch (error) {
            setIsLoading(false)
            console.error(error)
        } finally {
            setIsLoading(false)
            getAuctions()
        }
    }

    return (
        <GridItem bg='green' display='grid' padding='10px' borderRadius='10px' gap='5px'>
            <Text>Auction id : {auction?._id}</Text>
            <Text>tournament Id : {auction?.tournamentId}</Text>
            <Text>number of teams : {auction?.numberOfTeams}</Text>
            <Text>playersPerTeam : {auction?.playersPerTeam}</Text>
            <Text>Status : {auction?.auctionStatus}</Text>
            <Text>Managers : {auction?.managers?.length}</Text>

            <Box h='25px' display='flex' justifyContent='flex-end' alignItems='center' gap='30px'>
                {auction?.adminId === user?.user?._id && <Button isLoading={isLoading} onClick={deleteAuction} cursor='pointer'> delete
                    <FontAwesomeIcon icon={faTrash} />
                </Button>}

                <Button onClick={() => { navigate(`/dashboard/auction/${auction?._id}/${auction?.tournamentId}`) }}>join</Button>
            </Box>

        </GridItem>
    )
}

export default AuctionCard