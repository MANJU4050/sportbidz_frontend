import { GridItem, Text, Box } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

import { getTournamentDetails } from '../../../../../api/tournaments'

const TournamentDetails = ({ tournamentId }: { tournamentId: string }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [tournament, setTournament] = useState([])

    const getTournament = async () => {
        try {
            setIsLoading(true)
            const response = await getTournamentDetails(tournamentId)
            setTournament(response)
            setIsLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getTournament()
    }, [])


    return (
        <GridItem gridArea='t' >
            <Box bg='black' borderRadius='5px' padding='30px' minH='320px'>
                <Text>Tournament name : {tournament?.tournamentName} </Text>
                <Text>Tournament Date : {tournament?.tournamentStartDate}</Text>
                <Text>Tournament Type : {tournament?.tournamentType}</Text>
                <Text>Total Teams : {tournament?.numberOfTeams}</Text>
                <Text>Player per Team : {tournament?.playersPerTeam}</Text>
                <Text>Registration Start Date : {tournament?.registrationStartDate}</Text>
                <Text>Registration End Date : {tournament?.registrationEndDate}</Text>
                <Text> Location : {tournament?.address}</Text>
                <Text>Maximum Registrations : {tournament?.maximumRegistrations}</Text>
            </Box>
        </GridItem>
    )
}

export default TournamentDetails