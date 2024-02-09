import { lazy } from 'react'

import { Private } from "../../interfaces/router/public"
import { RouteProps } from "../../interfaces/router"


const Tournaments = lazy(() => import('../../pages/dashboard/tournaments/index'))
const Home = lazy(() => import('../../pages/dashboard/home/index'))

const PrivateRoutes: RouteProps[] = [

    {
        path: '',
        name: 'DashboardHome',
        element: <Home />,
        isVisible: true,
        isIndex: true
    },
    {
        path: Private.Tournaments,
        name: 'Tournaments',
        element: <Tournaments />,
        isVisible: true,
    },

]

export default PrivateRoutes