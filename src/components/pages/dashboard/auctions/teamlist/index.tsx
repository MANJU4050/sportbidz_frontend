import { useParams } from "react-router-dom"
import { auctionById } from "../../../../../api/auctions"
import { useEffect, useState } from "react"
import { Avatar, Box, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react"

const AuctionStatus = () => {

    const { auctionId } = useParams()
    const { isOpen, onClose, onOpen } = useDisclosure()

    const [teams, setTeams] = useState([])
    const [team, setTeam] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [unSoldPlayers, setUnSoldPlayers] = useState([])

    const getAuction = async () => {
        try {
            setIsLoading(true)

            const response = await auctionById(auctionId || '')

            setTeams(response?.managers)
            setUnSoldPlayers(response?.unSoldPlayers)


        } catch (error) {
            setIsLoading(false)
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getAuction()
    })

    const openTeamModal = (team: any) => {

        setTeam(team)
        onOpen()
    }

    return (
        <Box display='grid'
            h='100vh'
            gridTemplateRows='100px auto'
            padding='10px'
            gap='10px'>
            <Box display='flex' justifyContent='flex-start' alignItems='center' >
                <Heading>TEAMS</Heading>
            </Box>

            <Box display='grid' gridTemplateColumns='repeat(4,1fr)'  gap='20px'  >

                {teams?.map((team) => {
                    return <Box
                        key={team?._id}
                        cursor='pointer'
                        bg='violet'
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        height='100px'
                        borderRadius='10px'
                        onClick={() => {
                            openTeamModal(team)
                        }}>

                        <Text >{team?.teamName}</Text>
                    </Box>
                })}

            </Box>
            <Box display='flex'
            flexDirection='column' gap='10px'>
                <Box>
                    <Heading>UNSOLD Players</Heading>
                </Box>
                <Box display='grid' gridTemplateColumns='repeat(6,1fr)'  gap='20px'>
                {unSoldPlayers?.map((player) => {
                    return <Box key={player?._id}
                    cursor='pointer'
                    bg='yellowgreen'
                    color='blue'
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    height='100px'
                    borderRadius='10px'
                    gap='10px'>
                        <Text>{player?.playerName}</Text>
                    </Box>
                })}

                </Box>
                
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{team?.teamName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Box display='grid' gap='20px' gridTemplateColumns='repeat(12,1fr)' gridTemplate={`"p p p"`} >

                            {team?.players?.map((player) => {
                                return <Box
                                    key={player?._id}
                                    cursor='pointer'
                                    bg='black'
                                    color='white'
                                    display='flex'
                                    justifyContent='center'
                                    alignItems='center'
                                    height='100px'
                                    borderRadius='10px'
                                    gap='10px'
                                >
                                    <Avatar name={player?.playerName} />
                                    <Text >{player?.playerName}</Text>
                                </Box>
                            })}
                        </Box>

                    </ModalBody>
                </ModalContent>
            </Modal>

        </Box>
    )
}

export default AuctionStatus