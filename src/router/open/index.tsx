import { lazy } from 'react'

import { Open } from "../../interfaces/router/public"
import { RouteProps } from "../../interfaces/router"

const PlayerRegistration = lazy(()=> import('../../pages/playerregistration/index'))
const ManagerRegistration = lazy(()=> import('../../pages/managerregistration'))


const OpenRoutes: RouteProps[] = [

  {
    path: Open.playerregistration,
    name: 'PlayerRegistration',
    element: <PlayerRegistration />,
    isVisible: true,
  },
  {
    path: Open.ManagerRegistration,
    name: 'ManagerRegistration',
    element: <ManagerRegistration />,
    isVisible: true,
  },
  

]

export default OpenRoutes