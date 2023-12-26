import { useAuthContext } from "../context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Loader";

const ProtectedRoutes = ({children}) => {
    const { auth, loadingAuth } = useAuthContext();
    if (loadingAuth) return <Loader />
    return (
    <>
        {!!auth?.email ? <Outlet/> : <Navigate to='/login'/>}
    </>
  )
}

export default ProtectedRoutes