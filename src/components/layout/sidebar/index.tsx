
import { Box, Button } from '@chakra-ui/react'
import styles from '../../../assets/css/components/layout/sidebar/sidebar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../../context/authcontext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {

  const navigate = useNavigate()
  const { logoutUser } = useContext(AuthContext)
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Box fontWeight='bold' fontSize='20px' className={styles.header}>SPORTZBID</Box>
        <div className={styles.body}>
          <Link to='/dashboard' className={styles.item}>home</Link>
          <Link to='/dashboard/tournaments' className={styles.item}>tournaments</Link>
          <Link to='/dashboard/auctions' className={styles.item}>auctions</Link>

        </div>
        <div className={styles.footer}><Button width='100%'  display='flex' gap='10px' onClick={() => {
          logoutUser()
          return navigate('/signin')
        }}><FontAwesomeIcon icon={faRightFromBracket}  />Logout</Button></div>
      </div>
    </div>
  )
}

export default Sidebar