import { Avatar, Box, Grid, GridItem, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { getPlayersByTournament } from '../../../../../api/players'

const TournamentPlayers = ({ tournamentId }) => {


    const [isLoading, setIsLoading] = useState(false)
    const [players, setPlayers] = useState([])

    const getPlayers = async () => {

        try {
            setIsLoading(true)
            if (tournamentId) {
                const response = await getPlayersByTournament(tournamentId)
                console.log(response, "players")
                if (response.length !== 0) {
                    setPlayers(response)
                }
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.error(error)
        }
    }

    useEffect(() => {
        getPlayers()
    }, [])


    return (
        <GridItem gridArea='p'>
            <Grid gridTemplateColumns='repeat(5,1fr)' minHeight='70px' alignContent='center' bg='black' paddingLeft='20px' >
                <GridItem>Slno</GridItem>
                <GridItem>Name</GridItem>
                <GridItem>Mobile</GridItem>
                <GridItem>Place</GridItem>
                <GridItem>Player Type</GridItem>
            </Grid>
            {players && players?.length !== 0 ? players?.map((player, index) => {
                return <Grid key={player?._id} gridTemplateColumns='repeat(5,1fr)' bg='white' color='black' paddingLeft='20px' minH='50px' alignContent='center' marginTop='2px'>
                    <GridItem>{index + 1}</GridItem>
                    <GridItem> <Avatar size='sm' backgroundColor='green' color='white' />{player?.playerName}</GridItem>
                    <GridItem>{player?.mobile}</GridItem>
                    <GridItem>{player?.address}</GridItem>
                    <GridItem>{player?.playerType}</GridItem>
                </Grid>
            }) : <Spinner />}
        </GridItem>

    )
}

export default TournamentPlayers