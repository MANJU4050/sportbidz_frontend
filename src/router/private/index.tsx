import { lazy } from 'react'

import { Private } from "../../interfaces/router/public"
import { RouteProps } from "../../interfaces/router"

const Tournaments = lazy(() => import('../../pages/dashboard/tournaments/index'))
const Home = lazy(() => import('../../pages/dashboard/home/index'))
const Tournament = lazy(() => import('../../pages/dashboard/tournaments/tournament/index'))
const ManagerRegistrationForm = lazy(() => import('../../pages/dashboard/home/managerregistration'))

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
    {
        path: Private.Tournament,
        name: 'Tournament',
        element: <Tournament />,
        isVisible: true,
    },
    {
        path: Private.Manager,
        name: 'Tournament',
        element: <ManagerRegistrationForm />,
        isVisible: true,
    },
   


]

export default PrivateRoutes