import { Spinner, Box, Button, Center, Flex, FormControl, Input } from "@chakra-ui/react"
import { useRef } from "react"

import styles from '../../../assets/css/pages/dashboard/tournaments/tournaments.module.css'
import { getAllTournaments } from "../../../api/tournaments"
import { useEffect, useState } from "react"

import TournamentsCard from "../../../components/pages/dashboard/mytournaments/TournamentsCard"

const Home = () => {

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
      const response = await getAllTournaments({page, limit, search});
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
                    <Input type="text" value={search} placeholder="tournament name or location" onChange={handleChangeSearch} />
                  </FormControl>
                  <Button >clear</Button>
                </Flex>
              </form>
            </Box>
          </Flex>
        </Box>

        <TournamentsCard tournaments={tournaments} />

        <Center>  {isPageLoading && <Spinner />}</Center>

      </Box>
      <div ref={loader} id="loaderhome" />

    </div>
  )
}

export default Home



