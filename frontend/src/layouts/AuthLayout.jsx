import { useEffect } from "react"
import { useAuthContext } from "../context/AuthProvider";
import { Outlet, useNavigate, useLocation } from "react-router-dom"
const AuthLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {auth, loadingAuth} = useAuthContext();
  useEffect( () => {
    if (location.pathname === '/') navigate('/login');
    if (!!auth?.email) navigate('/projects');
  }, [auth])

  return (
    <main className="container mx-auto flex justify-center items-center min-h-screen">
        <div className="w-11/12 md:w-2/3 lg:w-5/12 py-5">
          <Outlet/>
        </div>
    </main>
  )
}

export default AuthLayout