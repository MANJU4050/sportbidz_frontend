import { lazy } from 'react'

import { Private } from "../../interfaces/router/public"
import { RouteProps } from "../../interfaces/router"

const DashboardHome = lazy(() => import('../../pages/dashboard/home/index'))
const Tournaments = lazy(()=> import('../../pages/dashboard/tournaments/index'))

const PrivateRoutes: RouteProps[] = [

    {
        path: Private.DashboardHome,
        name: 'DashboardHome',
        element: <DashboardHome />,
        isVisible: true,
        isIndex: true
    },
    {
        path: Private.Tournaments,
        name: 'DashboardHome',
        element: <Tournaments />,
        isVisible: true,
    },

]

export default PrivateRoutes