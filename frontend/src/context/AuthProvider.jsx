import { useContext, createContext, useEffect, useState } from 'react'
import { instance } from '../config/axiosClient';
const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
    const tokenLS = localStorage.getItem('token') ?? '';
    const [token, setToken] = useState(tokenLS);
    const [auth, setAuth] = useState({});
    const [loadingAuth, setLoadingAuth] = useState(true)
    useEffect(() => {
        const getAuthInfo = () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            instance('/users/profile', config)
                .then((response) => {
                    setAuth(response.data)
                })
                .catch(err => {
                    console.error(err)
                })
                .finally(() => {
                    setLoadingAuth(false)
                })
        }

        if (token !== '') {
            localStorage.setItem('token', token)
            getAuthInfo();
        } else {
            setLoadingAuth(false)
            setAuth({})
        }
    }, [token])

    return (
        <AuthContext.Provider value={{
            setToken,
            auth,
            loadingAuth,
            token
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider