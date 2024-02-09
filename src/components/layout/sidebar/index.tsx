
import { Box, Button } from '@chakra-ui/react'
import styles from '../../../assets/css/components/layout/sidebar/sidebar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../../context/authcontext'

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
        </div>
        <div className={styles.footer}><Button onClick={() => {
          logoutUser()
          return navigate('/signin')
        }}>Logout</Button></div>
      </div>
    </div>
  )
}

export default Sidebar