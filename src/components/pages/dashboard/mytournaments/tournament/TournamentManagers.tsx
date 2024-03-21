import { Avatar, Box, Grid, GridItem, Spinner, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getManagersByTournament } from '../../../../../api/managers'

const TournamentManagers = ({ tournamentId }) => {


    const [isLoading, setIsLoading] = useState(false)
    const [managers, setManagers] = useState([])

    const getManagers = async () => {

        try {
            setIsLoading(true)
            if (tournamentId) {
                const response = await getManagersByTournament(tournamentId)
                if (response.length !== 0) {
                    setManagers(response)
                }
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getManagers()
    }, [])


    return (
        <GridItem gridArea='p' paddingTop='20px'>
            <Heading>Managers</Heading>
            <Grid gridTemplateColumns='repeat(4,1fr)' minHeight='70px' alignContent='center' bg='black' paddingLeft='20px' >
                <GridItem>Slno</GridItem>
                <GridItem>Name</GridItem>
                <GridItem>Mobile</GridItem>
                <GridItem>Team Name</GridItem>
            </Grid>
            {managers && managers?.length !== 0 ? managers?.map((manager, index) => {
                return <Grid key={manager?._id} gridTemplateColumns='repeat(4,1fr)' bg='white' color='black' paddingLeft='20px' minH='50px' alignContent='center' marginTop='2px'>
                    <GridItem>{index + 1}</GridItem>
                    <GridItem> <Avatar size='sm' backgroundColor='green' color='white' />{manager?.managerName}</GridItem>
                    <GridItem>{manager?.mobile}</GridItem>
                    <GridItem>{manager?.teamName}</GridItem>
                </Grid>
            }) : <Spinner />}
        </GridItem>

    )
}

export default TournamentManagers