import { Suspense, lazy, useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import PublicRoutes from "./public";
import PrivateRoutes from './private';
import { RouteProps } from "../interfaces/router";

import Loader from '../components/loader';
import { AuthContext } from '../context/authcontext';
import NoPageFound from '../components/404/NoPageFound';


const SignIn = lazy(() => import('../pages/auth/signin/index'))
const Layout = lazy(() => import('../components/layout'))



const AppRoutes = () => {

    const { user, checkUserStatus } = useContext(AuthContext)


    useEffect(() => {
        if (!user?.isAuthenticated) {
            checkUserStatus()
        }
    }, [])
    return (
        <Suspense fallback={<Loader />}>
            <Router>
                <Routes>
                    <Route path='/' element={<SignIn />} />
                    {
                        user?.isAuthenticated && <Route path='/dashboard' element={<Layout />}>

                            {
                                PrivateRoutes?.map((route: RouteProps) => {
                                    return <Route index={route.isIndex} path={route.path} key={route.name} element={route.element} />
                                })
                            }
                        </Route>
                    }
                    {
                        !user?.isAuthenticated && PublicRoutes?.map((route: RouteProps) => {
                            return <Route path={route.path} key={route.name} element={route.element} />
                        })
                    }
                    <Route path='*' element={<NoPageFound />} />

                </Routes>
            </Router>
        </Suspense>

    )
}

export default AppRoutes