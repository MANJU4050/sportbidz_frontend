import { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import PublicRoutes from "./public";
import { RouteProps } from "../interfaces/router";
import Loader from '../components/loader';


const AppRoutes = () => {


    return (
        <Suspense fallback={<Loader />}>
            <Router>
                <Routes>
                    {
                        PublicRoutes?.map((route: RouteProps) => {
                            return <Route path={route.path} key={route.name} element={route.element} />
                        })
                    }
                </Routes>
            </Router>
        </Suspense>

    )
}

export default AppRoutes