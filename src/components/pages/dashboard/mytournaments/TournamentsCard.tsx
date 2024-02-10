import { Grid, GridItem, Card, CardHeader, Heading, CardBody, CardFooter, Button, Box, Text, Center } from "@chakra-ui/react"
import React from "react"
import { useNavigate } from "react-router-dom"

const TournamentsCard = ({ tournaments, isHome }) => {

  const navigate = useNavigate()
  return (
    <Grid templateColumns='repeat(3,1fr)' gap={6}>

      {
        tournaments && tournaments?.length !== 0 ? tournaments?.map((tournament) => {
          return <GridItem key={tournament?._id}>
            <Card key={tournament?._id}>
              <CardHeader>
                <Box
                  bg=''
                  borderRadius='5px'
                  padding='5px'
                  color='green'
                  textAlign="center"
                >

                  <Heading>{tournament?.tournamentName}</Heading>
                </Box>
              </CardHeader>

              <CardBody fontFamily='monospace'>
                <Grid
                  gap={2}
                  templateAreas={`"ttype tsdate"
                                    "tmobile tmobile"
                                    "tteams tplayers"
                                    "rsdate redate"
                                    "taddress tmax"`}
                >

                  <GridItem gridArea='ttype'>
                    <Box bg='' >
                      <Text>Type : {tournament?.tournamentType}</Text>
                    </Box>
                  </GridItem>

                  <GridItem gridArea='tsdate'>
                    <Box bg=''>
                      <Text>Start Date : {tournament?.tournamentStartDate}</Text>
                    </Box>
                  </GridItem>

                  <GridItem gridArea='tmobile'>
                    <Box bg=''>
                      <Text>Mobile : {tournament?.mobile}</Text>
                    </Box>
                  </GridItem>

                  <GridItem gridArea='tteams'>
                    <Box bg=''>
                      <Text>Total Teams : {tournament?.numberOfTeams}</Text>
                    </Box>
                  </GridItem>

                  <GridItem gridArea='tplayers'>
                    <Box bg=''>
                      <Text>Players Per Team : {tournament?.playersPerTeam}</Text>
                    </Box>
                  </GridItem>

                  <GridItem gridArea='rsdate'>
                    <Box bg=''>
                      <Text> Registration Start Date : {tournament?.registrationStartDate}</Text>
                    </Box>
                  </GridItem>

                  <GridItem gridArea='redate'>
                    <Box bg=''>
                      <Text>Registration End Date : {tournament?.registrationEndDate}</Text>
                    </Box>
                  </GridItem>

                  <GridItem gridArea='taddress'>
                    <Box bg=''>
                      <Text>Location : {tournament?.address}</Text>
                    </Box>
                  </GridItem>

                  <GridItem gridArea='tmax'>
                    <Box bg=''>
                      <Text>Maximum Registrations : {tournament?.maximumRegistrations}</Text>
                    </Box>
                  </GridItem>
                </Grid>

              </CardBody>

              <CardFooter >
                {!isHome && <Box w='100%' textAlign='end'>
                  <Button onClick={() => navigate(`/dashboard/tournament/${tournament?._id}`)} bg='green' color='white'>Manage</Button>
                </Box>}
              </CardFooter>

            </Card>
          </GridItem>
        }) : <Center ><Box><Text>No Tournaments created by you</Text></Box></Center>
      }



    </Grid>
  )
}

export default React.memo(TournamentsCard)