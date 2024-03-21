import { Box, Grid } from "@chakra-ui/react"
import { useNavigate, useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons"

import TournamentPlayers from "../../../../components/pages/dashboard/mytournaments/tournament/TournamentPlayers"
import TournamentDetails from "../../../../components/pages/dashboard/mytournaments/tournament/TournamentDetails"
import TournamentStats from "../../../../components/pages/dashboard/mytournaments/tournament/TournamentStats"
import TournamentSettings from "../../../../components/pages/dashboard/mytournaments/tournament/TournamentSettings"
import TournamentManagers from "../../../../components/pages/dashboard/mytournaments/tournament/TournamentManagers"

const Tournament = () => {

  const navigate = useNavigate()
  const { tournamentId } = useParams()

  return (
    <Box w='100%'>
      <Box w='100%' minH='70px' display='flex' justifyContent='flex-start' alignItems='flex-start' paddingLeft='10px' >
        <FontAwesomeIcon cursor='pointer' onClick={() => navigate(-1)} icon={faChevronCircleLeft} size='2xl' />
      </Box>
      <Box w='100%' minH='80vh'>
        <Grid
          gridTemplateColumns='repeat(3,1fr)'
          gridTemplateAreas={`"t s c"
                              "p p p"`}
          gap='10px'>
          <TournamentDetails tournamentId={tournamentId} />
          <TournamentStats tournamentId= {tournamentId}/>
          <TournamentSettings tournamentId={tournamentId} />
        </Grid>
        <TournamentManagers tournamentId={tournamentId} />
        <TournamentPlayers tournamentId={tournamentId} />
      </Box>

    </Box>
  )
}

export default Tournament