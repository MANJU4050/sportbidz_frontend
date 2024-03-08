import { GridItem, Grid, Text } from '@chakra-ui/react'

const TournamentStats = () => {
    return (
        <GridItem gridArea='s'>
            <Grid gridTemplateColumns='repeat(12,1fr)'
                gridTemplate={`"rt rt rt rt rt rt tr tr tr tr tr tr"
                                "bw bw bw bw bm bm bm bm al al al al"
                                "sl sl sl sl sl sl pr pr pr pr pr pr" `}
                gap='20px' bg='black' minH='320px' padding='30px' borderRadius='5px'>
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

            </Grid>

        </GridItem>
    )
}

export default TournamentStats