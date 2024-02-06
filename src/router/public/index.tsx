import { lazy } from 'react'

import { Public } from "../../interfaces/router/public"
import { RouteProps } from "../../interfaces/router"

const SportzBid = lazy(() => import('../../pages/index'))
const SignUp = lazy(() => import('../../pages/auth/signup/index'))
const SignIn = lazy(() => import('../../pages/auth/signin/index'))

const PublicRoutes: RouteProps[] = [

  {
    path: Public.Home,
    name: 'Home',
    element: <SportzBid />,
    isVisible: true,
    isIndex: true
  },
  {
    path: Public.SignUp,
    name: 'SignUp',
    element: <SignUp />,
    isVisible: true,
  },
  {
    path: Public.SignIn,
    name: 'SignIn',
    element: <SignIn />,
    isVisible: true,
  },

]

export default PublicRoutes