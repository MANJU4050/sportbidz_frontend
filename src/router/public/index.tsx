
import SportBidz from "../../pages"
import { Public } from "../../interfaces/router/public"
import { RouteProps } from "../../interfaces/router"

const PublicRoutes: RouteProps[] = [

  {
    path: Public.Home,
    name: 'SignUp',
    element: <SportBidz />,
    isVisible: true,
    isIndex:true
  }

]

export default PublicRoutes