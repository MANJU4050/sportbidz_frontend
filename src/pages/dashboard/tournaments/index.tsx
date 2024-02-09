import { Spinner, Box, Button, Center, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Textarea, useDisclosure, useToast } from "@chakra-ui/react"
import { useFormik } from "formik"
import { useRef, memo } from "react"

import styles from '../../../assets/css/pages/dashboard/tournaments/tournaments.module.css'
import { tournamentRegistrationSchema } from "../../../validators/tournamentValidation"
import { getTournamentsByUser, regiserTournamentApi } from "../../../api/tournaments"
import { useEffect, useState } from "react"
import TournamentsCard from "../../../components/pages/dashboard/mytournaments/TournamentsCard"

const Tournaments = () => {

  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [isLoading, setIsLoading] = useState(false)
  const [tournaments, setTournaments] = useState([])
  const [page, setPage] = useState(1)
  const [isPageLoading, setIsPageLoading] = useState(false)
  const [limit, setLimit] = useState(10)
  const [hasMore, setHasMore] = useState(true)
  const [search, setSearch] = useState('')
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [observerEnabled, setIsObserverEnable] = useState(true)
  const [refreshPage, setIsRefreshPage] = useState(false)

  const loader = useRef(null)

  const getTournaments = async () => {
    if (!hasMore || (!isInitialLoad && tournaments?.length === 0)) return;

    setIsPageLoading(true);
    try {
      const response = await getTournamentsByUser({page, limit, search});
      if (response?.length > 0) {
        const combinedTournaments = [...tournaments, ...response];
        const uniqueTournaments = Array.from(new Map(combinedTournaments?.map(tournament => [tournament._id, tournament])).values());
        setTournaments(uniqueTournaments)
        setHasMore(response.length === limit);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      setHasMore(false)
      console.error(error);
    } finally {
      setIsInitialLoad(false);
      setIsPageLoading(false);
      setIsObserverEnable(true)
    }
  };






  useEffect(() => {
    if (!isInitialLoad || tournaments?.length === 0) {
      getTournaments();
    }
  }, [page, refreshPage]);



  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const target = entries[0];

      if (target.isIntersecting && hasMore && !isPageLoading && observerEnabled) {
        setPage(prev => prev + 1);
      }
    }, { threshold: 1 });

    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [hasMore, isPageLoading, observerEnabled]);


  const initialValues = {
    tournamentName: "",
    tournamentStartDate: "",
    numberOfTeams: 0,
    tournamentType: "",
    playersPerTeam: 0,
    maximumRegistrations: 0,
    address: "",
    mobile: "",
    registrationStartDate: "",
    registrationEndDate: ""
  }

  const handleSubmit = async (values, { resetForm }) => {

    try {
      setIsLoading(true)
      const response = await regiserTournamentApi(values)

      toast({
        title: 'registration successfull',
        status: 'success',
        position: 'top-right',
        isClosable: true
      })

      setIsObserverEnable(false)
      setTournaments([]);
      setPage(1);
      setHasMore(true);
      setIsInitialLoad(true);
      setIsRefreshPage((prev) => {
        return !prev
      })
      resetForm()
      onCloseModal()
    } catch (error) {
      setIsLoading(false)
      console.log(error)
      toast({
        title: `${error?.response.data.error}`,
        status: 'error',
        position: 'top-right',
        isClosable: true
      })

    } finally {
      setIsLoading(false)

    }

  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: tournamentRegistrationSchema,
    onSubmit: handleSubmit

  })

  const onCloseModal = () => {

    formik.setValues(initialValues)
    formik.setTouched({
      tournamentName: false,
      tournamentStartDate: false,
      numberOfTeams: false,
      tournamentType: false,
      playersPerTeam: false,
      maximumRegistrations: false,
      address: false,
      mobile: false,
      registrationStartDate: false,
      registrationEndDate: false
    })
    onClose()
  }

  const handleChangeSearch = (e) => {
    setSearch(e.target.value)
  }


  return (
    <div className={styles.container}>
      <Box display='flex' flexDirection='column' gap='20px' w="100%">

        <Box w='100%' >
          <Flex gap='20px'>
            <Box flexGrow='10'>
              <form>
                <Flex gap='10px'>
                  <FormControl>

                    <Input type="text" onChange={handleChangeSearch} value={search} placeholder="tournament name or location" />
                  </FormControl>
                  <Button >Search</Button>
                </Flex>
              </form>
            </Box>
            <Box flexGrow='1'  >
              <Center h='40px'>
                <Divider orientation='vertical' border='1px solid white' />
              </Center>
            </Box>
            <Box flexGrow='1'  >
              <Button w='100%' bg='darkblue' color='white' onClick={onOpen}>Create tournament</Button>
            </Box>
          </Flex>
        </Box>


        <Modal isOpen={isOpen} onClose={onCloseModal} size='xl' isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Register Tournament</ModalHeader>
            <ModalCloseButton />
            <ModalBody w='100%' paddingBottom='20px'>
              <div>
                <form onSubmit={formik.handleSubmit}>
                  <div className={styles.formcontainer}>
                    <div className={styles.tname}>

                      <FormControl isRequired isInvalid={formik.errors.tournamentName && formik.touched.tournamentName ? true : undefined}>
                        <FormLabel>tournament name</FormLabel>
                        <Input
                          type="text"
                          name="tournamentName"
                          placeholder="tournament name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.tournamentName}
                        />
                        <FormErrorMessage>{formik.errors.tournamentName}</FormErrorMessage>
                      </FormControl>
                    </div>

                    <div className={styles.tdate} >
                      <FormControl isRequired isInvalid={formik.errors.tournamentStartDate && formik.touched.tournamentStartDate ? true : undefined}>
                        <FormLabel>tournament date</FormLabel>
                        <Input
                          type="date"
                          name="tournamentStartDate"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.tournamentStartDate}
                        />
                        <FormErrorMessage>{formik.errors.tournamentStartDate}</FormErrorMessage>
                      </FormControl>
                    </div>

                    <div className={styles.ttype}>
                      <FormControl isRequired
                        isInvalid={formik.errors.tournamentType && formik.touched.tournamentType ? true : undefined}>
                        <FormLabel>tournament type</FormLabel>
                        <Select
                          name="tournamentType"
                          placeholder="tournament type"
                          onChange={(e) => {
                            formik.setFieldValue('tournamentType', e.target.value)
                          }}
                          onBlur={() => {
                            formik.setFieldTouched('tournamentType', true)
                          }}
                          value={formik.values.tournamentType}

                        >
                          <option value='cricket'>cricket</option>
                        </Select>
                        <FormErrorMessage>{formik.errors.tournamentType}</FormErrorMessage>
                      </FormControl>
                    </div>

                    <div className={styles.tteams}>
                      <FormControl isRequired isInvalid={formik.errors.numberOfTeams && formik.touched.numberOfTeams ? true : undefined}>
                        <FormLabel>Total Teams</FormLabel>
                        <Input
                          type="number"
                          name="numberOfTeams"
                          placeholder="number of teams"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.numberOfTeams}
                        />
                        <FormErrorMessage>{formik.errors.numberOfTeams}</FormErrorMessage>
                      </FormControl>
                    </div>

                    <div className={styles.tplayers}>
                      <FormControl isRequired isInvalid={formik.errors.playersPerTeam && formik.touched.playersPerTeam ? true : undefined}>
                        <FormLabel>players per team</FormLabel>
                        <Input
                          type="number"
                          name="playersPerTeam"
                          placeholder="players per team"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.playersPerTeam}
                        />
                        <FormErrorMessage>{formik.errors.playersPerTeam}</FormErrorMessage>
                      </FormControl>
                    </div>

                    <div className={styles.tlocation}>
                      <FormControl isRequired isInvalid={formik.errors.address && formik.touched.address ? true : undefined}>
                        <FormLabel>Ground Location</FormLabel>
                        <Textarea
                          name="address"
                          placeholder="location"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.address}
                        />
                        <FormErrorMessage>{formik.errors.address}</FormErrorMessage>
                      </FormControl>
                    </div>

                    <div className={styles.tmobile}>
                      <FormControl isRequired isInvalid={formik.errors.mobile && formik.touched.mobile ? true : undefined}>
                        <FormLabel>mobile</FormLabel>
                        <Input
                          type="text"
                          name="mobile"
                          placeholder="mobile number"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.mobile}
                        />
                        <FormErrorMessage>{formik.errors.mobile}</FormErrorMessage>
                      </FormControl>
                    </div>

                    <div className={styles.tsdate}>
                      <FormControl isRequired isInvalid={formik.errors.registrationStartDate && formik.touched.registrationStartDate ? true : undefined}>
                        <FormLabel>registration Start Date</FormLabel>
                        <Input
                          type="date"
                          name="registrationStartDate"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.registrationStartDate}
                        />
                        <FormErrorMessage>{formik.errors.registrationStartDate}</FormErrorMessage>
                      </FormControl>
                    </div>

                    <div className={styles.tedate}>
                      <FormControl isRequired isInvalid={formik.errors.registrationEndDate && formik.touched.registrationEndDate ? true : undefined}>
                        <FormLabel>registration End Date</FormLabel>
                        <Input
                          type="date"
                          name="registrationEndDate"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.registrationEndDate}
                          isRequired={false}
                        />
                        <FormErrorMessage>{formik.errors.registrationEndDate}</FormErrorMessage>
                      </FormControl>
                    </div>

                    <div className={styles.tmax}>
                      <FormControl isRequired isInvalid={formik.errors.maximumRegistrations && formik.touched.maximumRegistrations ? true : undefined}>
                        <FormLabel>Maximum Registrations</FormLabel>
                        <Input
                          type="number"
                          name="maximumRegistrations"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.maximumRegistrations}
                        />
                        <FormErrorMessage>{formik.errors.maximumRegistrations}</FormErrorMessage>
                      </FormControl>
                    </div>
                    <div className={styles.tbutton}>
                      <Button bg='green' color='white' isLoading={isLoading} isDisabled={isLoading} w='100%' type="submit">Register</Button>
                    </div>
                  </div>
                </form>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>

        <TournamentsCard tournaments={tournaments} />

        <Center>  {isPageLoading && <Spinner />}</Center>

      </Box>
      <div ref={loader} id="loader" />

    </div>
  )
}

export default memo(Tournaments)



