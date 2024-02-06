import { Container, Spinner } from "@chakra-ui/react"

const Loader = () => {
    return (
        <Container height='100vh' w='100%' display='flex' justifyContent='center' alignItems='center'>
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        </Container>
    )
}

export default Loader