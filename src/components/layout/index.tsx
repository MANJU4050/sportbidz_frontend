import { lazy, useContext, useEffect } from 'react'
import { AuthContext } from '../../context/authcontext'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../app/reduxHooks'

const Header = lazy(() => import('./header/index'))
const Sidebar = lazy(() => import('./sidebar/index'))
const Content = lazy(() => import('./content/index'))

const Layout = () => {

  return (
    <div>
      <Header />
      <Sidebar />
      <Content />
    </div>
  )
}

export default Layout