
import { Avatar, Box, Flex, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Tooltip } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../../../assets/css/components/layout/header/header.module.css'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { AuthContext } from '../../../context/authcontext'


const Header = () => {

  const { user } = useContext(AuthContext)
  return (
    <Box color='white' bg='#121d33' className={styles.container} >
      <Flex w='100%' h='70px' justifyContent='flex-end' alignItems='center' paddingRight='40px' gap='30px'>
        <FontAwesomeIcon icon={faBell} size='2xl' />
        <Menu >
          <Tooltip label={user?.user?.name}>
            <MenuButton >
              <Avatar size='md' name={user?.user?.name} />
            </MenuButton>
          </Tooltip>
          <MenuList color='white' bg='#121d33'>
            <MenuGroup title='Profile'>
              <MenuItem color='white' bg='#121d33'>My Account</MenuItem>
              <MenuItem color='white' bg='#121d33'>Payments </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title='Help'>
              <MenuItem color='white' bg='#121d33'>Docs</MenuItem>
              <MenuItem color='white' bg='#121d33'>FAQ</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  )
}

export default Header