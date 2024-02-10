import { Box, Grid, GridItem, Text } from "@chakra-ui/react"
import { useNavigate, useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { getTournamentDetails } from "../../../../api/tournaments"

const Tournament = () => {

  const navigate = useNavigate()
  const { tournamentId } = useParams()
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

  console.log(tournament)


  return (
    <Box w='100%'>
      <Box w='100%' minH='70px' display='flex' justifyContent='flex-start' alignItems='flex-start' paddingLeft='10px'>
        <FontAwesomeIcon cursor='pointer' onClick={() => navigate(-1)} icon={faArrowAltCircleLeft} size='2xl' />
      </Box>
      <Box w='100%' minH='80vh'>
        <Grid
          gridTemplateColumns='repeat(2,1fr)'
          gridTemplateAreas={`"t  s"
                              "t  s"`}
          gap='10px'>
          <GridItem>
            <Box bg='black' borderRadius='5px' padding='30px' minH='280px'>
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
          <GridItem>
            <Box bg='black' borderRadius='5px' padding='30px' minH='280px' >
              <Grid gridTemplate={`"rt rs tr"
                                  "sl rs pr"
                                    "bw bm al" `}
                gap='20px'>
                <GridItem gridArea='tr' bg='green' textAlign='center' borderRadius='5px' padding='10px'>
                  <Text>Total Registrations : 20</Text>
                </GridItem>
                <GridItem gridArea='rt' bg='green' textAlign='center' borderRadius='5px' padding='10px'>
                  <Text>Registrations Today : 2</Text>
                </GridItem>
                <GridItem gridArea='sl' bg='green' textAlign='center' borderRadius='5px' padding='10px'>
                  <Text>Slots Left : 178</Text>
                </GridItem>
                <GridItem gridArea='pr' bg='green' textAlign='center' borderRadius='5px' padding='10px'>
                  <Text>Players Required : 352</Text>
                </GridItem>
                <GridItem gridArea='bw' bg='green' textAlign='center' borderRadius='5px' padding='10px'>
                  <Text>Bowlers : 10</Text>
                </GridItem>
                <GridItem gridArea='bm' bg='green' textAlign='center' borderRadius='5px' padding='10px'>
                  <Text >Batsman : 10</Text>
                </GridItem>
                <GridItem gridArea='al' bg='green' textAlign='center' borderRadius='5px' padding='10px'>
                  <Text>Allrounders : 2</Text>
                </GridItem>
                <GridItem gridArea='rs' bg='green' textAlign='center' display='flex' justifyContent='center' alignItems='center' borderRadius='5px' padding='10px'>
                  <Text>Registration Status : active</Text>
                </GridItem>

              </Grid>
            </Box>

          </GridItem>
        </Grid>
      </Box>
      <Box>
        <Box>
          <Text></Text>

        </Box>
        <Box>

        </Box>

      </Box>

    </Box>
  )
}

export default Tournament