import { Box, Grid, GridItem, Switch, Text } from '@chakra-ui/react'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

const TournamentSettings = ({ tournamentId }) => {

  const [isActive, setIsActive] = useState(true)
  const [isCopied, setIsCopied] = useState(false)

  const setActive = () => {
    setIsActive(!isActive)
  }

  const copyToClip = () => {
    if (isCopied) return
    navigator.clipboard.writeText(`http://localhost:5173/tournament/register/${tournamentId}`)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 5000)
  }
  return (
    <GridItem bg='black' gridArea='c' padding='20px' minH='320px' >
      <Grid gap='10px' >
        <GridItem padding='10px' bg='green' borderRadius='5px'>
          <Grid gridTemplateColumns='repeat(12,1fr)' gridTemplateAreas={`"t t t t t t t t t t i c"`} gap='10px'>
            <Text gridArea='t'> Player Registration Link </Text>
            <Box gridArea='i' cursor='pointer' onClick={copyToClip}>
              <FontAwesomeIcon icon={faCopy} size='2xl' />
            </Box>
            <Text gridArea='c'>{isCopied ? `copied` : `copy`}</Text>
          </Grid>
        </GridItem>
        <GridItem padding='10px' bg='green' borderRadius='5px'>
          <Grid gridTemplateColumns='repeat(12,1fr)' gridTemplateAreas={`"tr tr tr tr tr tr tr tr tr tr ts"`} gap='10px'>
            <Text gridArea='tr'>Accept Registrations</Text>
            <Switch gridArea='ts' isChecked={isActive} onChange={setActive} />
          </Grid>

        </GridItem>
      </Grid>
    </GridItem>
  )
}

export default TournamentSettings