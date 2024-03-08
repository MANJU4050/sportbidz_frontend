import { lazy } from 'react'

import { Open } from "../../interfaces/router/public"
import { RouteProps } from "../../interfaces/router"

const PlayerRegistration = lazy(()=> import('../../pages/playerregistration/index'))


const OpenRoutes: RouteProps[] = [

  {
    path: Open.playerregistration,
    name: 'PlayerRegistration',
    element: <PlayerRegistration />,
    isVisible: true,
  },
  

]

export default OpenRoutes