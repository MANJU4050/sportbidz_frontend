import { createContext, useState, useMemo, ReactElement } from "react";
import { loginUserApi, logoutApi, userStatusCheck } from "../../api/auth/users";
import { UserLogin } from "../../interfaces/api/users";

export const AuthContext = createContext({
    user: {},
    isAuthenticated: false,
    isLoading: true,
    isReloading: true,
    checkUserStatus: () => { },
    logoutUser: () => { },
    loginUser: () => { }
})


export const AuthProvider = ({ children }: { children: ReactElement }) => {


    const [user, setUser] = useState({
        user: {},
        isAuthenticated: false,
        isLoading: true,
        isReloading: true
    })

    const checkUser = async () => {
        try {
            const response = await userStatusCheck()
            console.log(response, "respnse context")
            setUser({
                user: response?.user,
                isAuthenticated: response?.isAuthenticated,
                isLoading: false,
                isReloading: false
            })
        } catch (error) {
            console.error(error)
            setUser({
                user: {},
                isAuthenticated: false,
                isLoading: false,
                isReloading: false
            })
        }
    }

    const checkUserStatus = () => {
        checkUser()
    }

    const logout = async () => {
        try {
            const response = await logoutApi()
            setUser({
                user: {},
                isAuthenticated: false,
                isLoading: false,
                isReloading: false
            })

            console.log(response)
        } catch (error) {
            console.error(error)
            setUser({
                user: {},
                isAuthenticated: false,
                isLoading: false,
                isReloading: false
            })
        }
    }

    const login = async (payload: UserLogin) => {
        try {
            const response = await loginUserApi(payload)
            setUser({
                user: response?.user,
                isAuthenticated: response?.isAuthenticated,
                isLoading: false,
                isReloading: false
            })

        } catch (error) {
            console.error(error)

        }
    }

    const logoutUser = () => {
        logout()
    }

    const loginUser = (payload: UserLogin) => {
        login(payload)
    }



    const context = useMemo(() => ({
        user,
        checkUserStatus,
        logoutUser,
        loginUser,
    }), [user])

    return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>

}

