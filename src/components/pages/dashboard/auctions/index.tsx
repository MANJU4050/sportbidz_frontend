import io from 'socket.io-client'
import { motion } from 'framer-motion'
import { useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFaceFrown, faFaceGrin } from "@fortawesome/free-solid-svg-icons"
import {
    Avatar, Box, Button, Text, Heading, FormControl, Input, FormErrorMessage, useToast,
    Badge, Tooltip, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure
} from "@chakra-ui/react"

import { getAuctionById } from "../../../../api/auctions"
import sold from '../../../../assets/audio/notification/sold.mp3'
import unSold from '../../../../assets/audio/notification/unsold.mp3'
import notification from '../../../../assets/audio/notification/notification.mp3'
import newPlayer from '../../../../assets/audio/notification/newPlayer.mp3'



const MotionBox = motion(Box);
const Auction = () => {

    const { auctionId, tournamentId } = useParams()
    const toast = useToast()
    const { onOpen, onClose, isOpen } = useDisclosure()

    const navigate = useNavigate()
    const notificationRef = useRef(null)
    const soldRef = useRef(null)
    const unSoldRef = useRef(null)
    const newPlayerRef = useRef(null)
    const [auctionStatus, setAuctionStatus] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [auction, setAuction] = useState({})
    const [isAdmin, setIsAdmin] = useState(false)
    const [manager, setManager] = useState({})
    const [teams, setTeams] = useState([])
    const [totalPlayerRegistrations, setTotalPlayerRegistrations] = useState(0)
    const [currentBids, setCurrentBids] = useState([])
    const [currentHikePoints, setCurrentHikePoints] = useState(0)
    const [playerStatus, setPlayerStatus] = useState('')
    const [bidDetails, setBidDetails] = useState({})
    const [player, setPlayer] = useState({})
    const [animationKey, setAnimationKey] = useState(0)
    const [disableBid, setDisableBid] = useState(true)
    const [disableSell, setDisableSell] = useState(true)
    const [disableNextPlayer, setDisableNextPlayer] = useState(true)
    const [disableStart, setDisableStart] = useState(false)
    const [disableUnsold, setDisableUnSold] = useState(true)
    const [maxBidPoints, setMaxBidPoints] = useState(0)
    const [currentPlayerNumber, setCurrentPlayerNumber] = useState(0)
    const [currentAuctionPlayers, setCurrentAuctionPlayers] = useState(0)
    const [points, setPoints] = useState({
        pointsUsed: 0,
        pointsRemaining: 0
    })
    const [currentBiddingPlayer, setCurrentPlayer] = useState({
        playerName: "",
        mobile: "",
        playerType: "",
        address: ""
    })

    const [socket, setSocket] = useState(null)

    console.log(auctionId, "auction id")


    const getAuctionDetails = async () => {
        try {
            setIsLoading(false)
            const response = await getAuctionById(auctionId, tournamentId)
            if (response) {
                console.log(response, "auction by id")
                setAuction(response?.auction)
                setIsAdmin(response?.isAdmin)
                setTeams(response?.auction?.managers)
                setCurrentPlayer(response?.auction?.currentBiddingPlayer)
                setCurrentHikePoints(response?.auction?.currentHikePoints)
                setTotalPlayerRegistrations(response?.totalPlayerRegistrations)
                setManager(response?.manager)
                setPoints({
                    pointsUsed: response?.manager?.pointsUsed,
                    pointsRemaining: response?.manager?.pointsRemaining
                })

                setCurrentPlayerNumber(response?.auction?.currentPlayerNumber)
                setCurrentAuctionPlayers(response?.auction?.players?.length)

                console.log(response?.auction?.currentBiddingPlayer, "current bidding player")

                setPlayerStatus(response?.auction?.currentPlayerStatus)
                if (response?.auction?.currentPlayerStatus === 'new' && response?.auction?.currentPlayerBids.length === 0 && response?.auction?.auctionStatus !== 'upcoming') {
                    setDisableUnSold(false)
                }

                if (response?.auction?.auctionStatus === 'started') {
                    setDisableStart(true)
                }

                if (response?.auction?.currentPlayerBids !== 0) {
                    const sortedBids = response?.auction?.currentPlayerBids?.sort((a, b) => {
                        return b.bid - a.bid
                    })
                    setCurrentBids(sortedBids)
                }
                console.log(response?.manager, "manager")
                if (response?.manager?.playersBought !== response?.auction?.playersPerTeam &&
                    response?.auction?.currentPlayerStatus !== 'sold' &&
                    response?.auction?.currentPlayerStatus !== 'unsold' &&
                    response?.auction?.auctionStatus !== 'upcoming') {
                    setDisableBid(false)
                }


                if (response?.manager?.playersRequired === 0) {
                    setMaxBidPoints(response?.manager?.pointsRemaining)
                } else {
                    const auctionablePoints = response?.manager?.pointsRemaining - ((response?.manager?.playersRequired - 1) * response?.auction?.basePlayerPoints)
                    setMaxBidPoints(auctionablePoints)
                }
                if (response?.auction?.currentPlayerBids.length > 0 && response?.auction?.currentPlayerStatus === 'new') {
                    setDisableSell(false)
                }
                if (response?.auction?.currentPlayerStatus === 'sold' || response?.auction?.currentPlayerStatus === 'unsold') {
                    setDisableNextPlayer(false)
                }

            }


        } catch (error) {
            setIsLoading(false)
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e) => {
        setCurrentHikePoints(e.target.value)
    }

    const openPlayerModal = (player) => {
        setPlayer(player)
        onOpen()

    }

    const reRunAnimation = () => {
        setAnimationKey(prev => prev + 1)
    }

    useEffect(() => {
        getAuctionDetails()

        const newSocket = io(`http://localhost:4000/auctions`, {
            withCredentials: true,
            query: {
                auctionId: auctionId
            }
        })

        if (newSocket) {
            setSocket(newSocket)
        }

        newSocket.on('connect', () => {
            console.log('connected to server')
        })

        newSocket.on('started', (firstPlayer) => {
            getAuctionDetails()
            setCurrentPlayer(firstPlayer)
            setDisableBid(false)
            setDisableStart(true)
            reRunAnimation()
            if (newPlayerRef.current !== null) {
                newPlayerRef.current.play()
            }
        })

        newSocket.on('newBid', (newBid) => {
            console.log(newBid, "new bid")
            setCurrentBids((prev) => {
                return [newBid, ...prev]
            })
            setDisableSell(false)
            setDisableNextPlayer(true)
            setDisableUnSold(true)
            if (notificationRef.current !== null) {
                notificationRef.current.play()
            }
        })

        newSocket.on('sold', (auctionDetails, teams) => {
            setPlayerStatus('sold')
            setTeams(teams)
            setBidDetails(auctionDetails)
            setDisableBid(true)
            setDisableNextPlayer(false)
            setDisableSell(true)
            if (soldRef.current !== null) {
                soldRef.current.play()
            }

        })

        newSocket.on('message', (data: string) => {
            console.log(data, "message")

            toast.closeAll()
            toast({
                title: data,
                position: 'top-right',
                isClosable: true,
                status: 'warning'

            })


        })

        newSocket.on('points', (points, maxBidPoint) => {
            console.log(maxBidPoint, "max bid point")
            setPoints(points)
            setMaxBidPoints(maxBidPoint)
        })

        newSocket.on('playerupdate', (player, playerNumber, auctionPlayersCount) => {
            setBidDetails({})
            setCurrentBids([])
            setCurrentPlayer(player)
            reRunAnimation()
            setPlayerStatus('new')
            setDisableUnSold(false)
            setCurrentPlayerNumber(playerNumber)
            setCurrentAuctionPlayers(auctionPlayersCount)

            if (manager?.playersRequired !== 0) {
                setDisableBid(false)
            }
            setDisableNextPlayer(true)
            if (newPlayerRef.current !== null) {
                newPlayerRef.current.play()
            }


        })

        newSocket.on('playerunsold', () => {
            setPlayerStatus('unsold')
            setDisableUnSold(true)
            setDisableBid(true)
            setDisableNextPlayer(false)
            if (unSoldRef.current !== null) {
                unSoldRef.current.play()
            }
        })

        newSocket.on('complete', () => {
            console.log('completed')
            setAuctionStatus(true)
        })

        newSocket.on('finished', () => {
            navigate(`/auction/${auctionId}`)
        })

        return () => {

            newSocket.off('started')
            newSocket.off('newBid')
            newSocket.off('sold')
            newSocket.off('message')
            newSocket.off('points')
            newSocket.off('playerupdate')
            newSocket.off('playerunsold')
            newSocket.off('complete')
            newSocket.off('connect')
            newSocket.disconnect()
        }
    }, [])


    const startAuction = async () => {
        if (socket) {
            socket.emit('start', auctionId, tournamentId)
        }
    }

    const bidHandler = async () => {
        if (socket) {
            await socket.emit('bid', manager, auctionId)
        }
    }

    const sellHandler = async () => {
        if (socket) {
            await socket.emit('sell', auctionId)
        }
    }

    const nextPlayer = async () => {
        if (socket) {
            await socket.emit('nextplayer', auctionId)
        }
    }

    const unSoldPlayer = async () => {
        if (socket) {
            await socket.emit('unsold', auctionId)
        }
    }

    const finishAuction = async () => {
        if (socket) {
            await socket.emit('finish', auctionId)
        }
    }


    // const items = Array.from({ length: auction?.numberOfTeams }, (_, index) => index)
    return (
        <>
            <Box display='grid' gap='10px' gridTemplateRows='50px 400px 310px' gridTemplateColumns='repeat(12,1fr)' gridTemplateAreas={`"h h h h h h h h h h h h"
                                                                                                    "p p p s s s s t t t t t"
                                                                                                    "m m m m m m m b b b b b"`}>
                <Heading textAlign='center' gridArea='h' bg='orange' w='100%'>{auction?.auctionStatus}</Heading>
                {/* <Box gap='10px' paddingLeft='20px' paddingRight='20px' bg='lavender' color='black' gridArea='p' display='grid' gridTemplateAreas={`
                "i i"
                "a a"
                "a a"
                "n m"
                "b p"
                "t t"
                `}> */}
                <MotionBox
                    key={animationKey}
                    gap='10px' paddingLeft='20px' paddingRight='20px' bg='lavender' color='black' gridArea='p' display='grid' gridTemplateAreas={`
                     "i i"
                     "a a"
                     "a a"
                     "n m"
                     "b p"
                     "pn pn"
                     "t t"
                     `}
                    initial={{ scale: 0 }} // Start from scale 0
                    animate={{ scale: 1 }} // Animate to original size (scale 1)
                    transition={{ duration: 0.7 }} // Set animation duration to 0.5 seconds
                // Add any additional styling or props for the Box component
                >
                    <Box gridArea='a' display='flex' justifyContent='center' alignItems='center'>
                        <Avatar size='2xl' name={currentBiddingPlayer?.playerName} />
                    </Box>

                    <Box gridArea='n' display='flex' justifyContent='flex-start' alignItems='center'>
                        <Text>Name : {currentBiddingPlayer?.playerName}</Text>
                    </Box>
                    <Box gridArea='m' display='flex' justifyContent='flex-start' alignItems='center'>
                        <Text>Mobile : {currentBiddingPlayer?.mobile}</Text>
                    </Box>
                    <Box gridArea='b' display='flex' justifyContent='flex-start' alignItems='center'>
                        <Text>Player Type : {currentBiddingPlayer?.playerType}</Text>
                    </Box>
                    <Box gridArea='p' display='flex' justifyContent='flex-start' alignItems='center'>
                        <Text>Place : {currentBiddingPlayer?.address}</Text>
                    </Box>
                    <Box gridArea='pn' display='flex' justifyContent='center' alignItems='center' bg='yellow'>
                        <Text>Player {currentPlayerNumber} of {currentAuctionPlayers}</Text>
                    </Box>


                    {playerStatus !== 'new' && <Box gridArea='i' position='relative' display='flex' justifyContent='center' alignItems='center'  >
                        <Badge colorScheme={playerStatus !== 'unsold' ? 'green' : 'red'}>{playerStatus}</Badge>
                        {playerStatus !== 'unsold' ? <FontAwesomeIcon icon={faFaceGrin} size='2x' color='green' /> : <FontAwesomeIcon icon={faFaceFrown} size='2x' color='orange' />}
                    </Box>}

                    {playerStatus !== 'new' && playerStatus !== 'unsold' && <Box gridArea='t' display='flex' bg='green' color='white' minHeight='60px' justifyContent='space-around' alignItems='center'>
                        <Box>team : {bidDetails?.bidder?.teamName}</Box>
                        <Box>points : {bidDetails?.bid}</Box>

                    </Box>}
                </MotionBox>


                {/* </Box> */}

                <Box overflowY="auto" bg='darkcyan' gridArea='s' display='flex' width='100%' flexDirection='column-reverse' gap='5px' p='5px' >
                    {currentBids && currentBids?.length !== 0 && currentBids?.map((bid, index) => {
                        const isLast = index === 0;
                        return <Box key={bid?._id} display='flex' bg={isLast ? 'green' : 'white'} color={isLast ? 'white' : 'black'} minHeight='60px' justifyContent='space-around' alignItems='center'>
                            <Box>team : {bid?.bidder?.teamName}</Box>
                            <Box>points : {bid?.bid}</Box>
                        </Box>
                    })}
                </Box>

                <Box gap='10px' p='10px' bg='darkgray' gridArea='t' display='grid' gridTemplateColumns='repeat(3,1fr)' gridTemplateAreas={`"tl tl tl"
                                                                                                                        "tm pl rp"
                                                                                                                        " bp mp hp"`}>
                    <Box bg='purple' gridArea='tl' display='flex' justifyContent='center' alignItems='center'><Text>Power Rangers League</Text></Box>
                    <Box bg='red' gridArea='tm' display='flex' justifyContent='center' alignItems='center'><Text>Total Teams : {auction?.numberOfTeams}</Text></Box>
                    <Box bg='turquoise' gridArea='pl' display='flex' justifyContent='center' alignItems='center'><Text>players per team : {auction?.playersPerTeam}</Text></Box>
                    <Box bg='tan' gridArea='rp' display='flex' justifyContent='center' alignItems='center'><Text>total registered players : {totalPlayerRegistrations}</Text></Box>
                    <Box bg='teal' gridArea='bp' display='flex' justifyContent='center' alignItems='center'><Text>base price : {auction?.basePlayerPoints}</Text></Box>
                    <Box bg='darkgreen' gridArea='mp' display='flex' justifyContent='center' alignItems='center'><Text>max price : {auction?.maxPlayerPoints}</Text></Box>
                    <Box bg='yellowgreen' gridArea='hp' display='flex' justifyContent='center' alignItems='center'><Text>current hike points : {auction?.currentHikePoints}</Text></Box>
                </Box>

                <Box overflowY="auto" overflowX='auto' bg='darkcyan' gridArea='m' display='flex' height='100%' w='100%' flexDirection='column' gap='5px' p='5px' >
                    {teams && teams?.length !== 0 && teams?.map((team) => {
                        return <Box key={team?._id} display='flex' bg='indigo' flexWrap='nowrap' gap='25px' minHeight='60px' height='100%' justifyContent='stretch' alignItems='center' paddingLeft='20px'>
                            <Box minW='150px' flexWrap='nowrap' display='flex' justifyContent='center' alignItems='center'>  {team?.teamName}</Box>
                            {team?.players?.map((player) => {
                                return <Box onClick={() => {
                                    openPlayerModal(player)
                                }} cursor='pointer' key={player._id} ><Tooltip label={player?.playerName}>
                                        <Avatar size='sm' name={player?.playerName} />
                                    </Tooltip> </Box>
                            })}


                        </Box>
                    })}

                </Box>

                <Box bg='rose' gridArea='b' display='grid' padding='20px' border='2px solid white'>

                    {isAdmin && <> <Box display='flex' justifyContent='center' alignItems='center' gap='10px'>
                        <FormControl>
                            <Input type='number' onChange={handleChange} value={currentHikePoints} />
                            <FormErrorMessage>error</FormErrorMessage>
                        </FormControl>
                        <Button bg='blue' color='white'>Update</Button>
                    </Box>

                        <Box display='flex' justifyContent='space-evenly' alignItems='center' gap='10px'>
                            <Button isDisabled={disableStart} onClick={startAuction} bg='green' color='white' w='100%'>start</Button>
                            <Button isDisabled={disableSell} onClick={sellHandler} bg='magenta' color='white' w='100%'>Sell Player</Button>
                            {auctionStatus ?
                                <Button isDisabled={disableNextPlayer} onClick={nextPlayer} bg='orange' color='white' w='100%'>Next Player</Button>
                                :
                                <Button isDisabled={!auctionStatus} onClick={finishAuction} bg='orange' color='white' w='100%'>Finish Auction</Button>

                            }
                            <Button isDisabled={disableUnsold} onClick={unSoldPlayer} bg='red' color='white' w='100%'>UnSold</Button>

                        </Box> </>}
                    {!isAdmin &&

                        <Box display='grid' gridTemplateColumns='repeat(3,1fr)' gridTemplateAreas={`"t r m u"
                                                                                                    "b b b b"`} gap='50px'>
                            <Box bg='blue' gridArea='t' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                                <Text>total Points </Text>
                                <Text> {auction?.totalTeamPoints}</Text>

                            </Box>
                            <Box bg='blue' gridArea='u' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                                <Text>points used</Text>
                                <Text>{points?.pointsUsed}</Text>

                            </Box>
                            <Box bg='blue' gridArea='r' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                                <Text>points remaining</Text>
                                <Text>{points?.pointsRemaining}</Text>

                            </Box>
                            <Box bg='blue' gridArea='m' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                                <Text>max biddable points</Text>
                                <Text>{maxBidPoints}</Text>

                            </Box>
                            <Box gridArea='b'>
                                <Button isDisabled={disableBid} w='100%' bg='green' color='white' onClick={bidHandler}>bid</Button>
                            </Box>
                        </Box>

                    }
                </Box>
            </Box>
            <audio ref={notificationRef} src={notification}>
                Your browser does not support the audio element.
            </audio>
            <audio ref={soldRef} src={sold}>
                Your browser does not support the audio element.
            </audio>
            <audio ref={unSoldRef} src={unSold}>
                Your browser does not support the audio element.
            </audio>
            <audio ref={newPlayerRef} src={newPlayer}>
                Your browser does not support the audio element.
            </audio>
            <Modal isOpen={isOpen} onClose={onClose} size='md' isCentered >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Player</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <Box gap='10px' minHeight='300px' paddingLeft='20px' paddingRight='20px' bg='lavender' color='black' gridArea='p' display='grid' gridTemplateAreas={`
                "a a"
                "a a"
                "n m"
                "b p"
                `}>
                            <Box gridArea='a' display='flex' justifyContent='center' alignItems='center'>
                                <Avatar size='2xl' name={player?.playerName} />
                            </Box>

                            <Box gridArea='n' display='flex' justifyContent='flex-start' alignItems='center'>
                                <Text>Name : {player?.playerName}</Text>
                            </Box>
                            <Box gridArea='m' display='flex' justifyContent='flex-start' alignItems='center'>
                                <Text>Mobile : {player?.mobile}</Text>
                            </Box>
                            <Box gridArea='b' display='flex' justifyContent='flex-start' alignItems='center'>
                                <Text>Player Type : {player?.playerType}</Text>
                            </Box>
                            <Box gridArea='p' display='flex' justifyContent='flex-start' alignItems='center'>
                                <Text>Place : {player?.address}</Text>
                            </Box>

                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>

        </>
    )
}

export default Auction