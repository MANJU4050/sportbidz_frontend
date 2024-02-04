import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRoutes from "./public";
import { RouteProps } from "../interfaces/router";

const AppRoutes = () => {


    return (
        <Router>
            <Routes>
                {/* <Route path="/" element={<SignUp />}> */}
                    {
                        PublicRoutes?.map((route: RouteProps) => {
                            return <Route path={route.path} key={route.name} element={route.element} />
                        })
                    }
                {/* </Route> */}

            </Routes>
        </Router>
    )
}

export default AppRoutes