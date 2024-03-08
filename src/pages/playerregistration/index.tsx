import { Box, Grid, GridItem } from '@chakra-ui/react'
import PlayerRegistrationForm from '../../components/pages/playeregistration/PlayerRegistrationForm'

const PlayerRegistration = () => {
  return (
    <Box w='100%' minHeight='100vh' padding='10px'>
      <Grid gridTemplateColumns='repeat(5,1fr)' gridTemplateAreas={`"s s s f f"`} alignContent='center' gap='30px' >
        <GridItem bg='violet' minH='95vh' display='flex' justifyContent='center' alignItems='center' gridArea='s'>
          Tournament Details
        </GridItem>
        <GridItem gridArea='f'>
          <PlayerRegistrationForm />
        </GridItem>
      </Grid>
    </Box>
  )
}

export default PlayerRegistration