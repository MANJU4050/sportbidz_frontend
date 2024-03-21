import { Box, Grid, GridItem } from '@chakra-ui/react'
import ManagerRegistrationForm from '../../components/pages/managerregistration/ManagerRegistrationForm'

const ManagerRegistration = () => {
    return (
        <Box w='100%' minHeight='100vh' padding='10px'>
            <Grid gridTemplateColumns='repeat(5,1fr)' gridTemplateAreas={`"s s s f f"`} alignContent='center' gap='30px' >
                <GridItem bg='violet' minH='95vh' display='flex' justifyContent='center' alignItems='center' gridArea='s'>
                    Tournament Details
                </GridItem>
                <GridItem gridArea='f'>
                    <ManagerRegistrationForm />
                </GridItem>
            </Grid>
        </Box>
    )
}

export default ManagerRegistration