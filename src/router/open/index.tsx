import { lazy } from 'react'

import { Open } from "../../interfaces/router/public"
import { RouteProps } from "../../interfaces/router"
import AuctionStatus from '../../components/pages/dashboard/auctions/teamlist'

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
  {
    path: Open.AuctionStatus,
    name: 'AuctionStatus',
    element: <AuctionStatus />,
    isVisible: true,
  }
  

]

export default OpenRoutes