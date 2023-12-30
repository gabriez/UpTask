import { useAuthContext } from "../context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Loader";
import Header from "../components/projects/Header";
import Sidebar from "../components/projects/Sidebar";

const ProtectedRoutes = ({ children }) => {
  const { auth, loadingAuth } = useAuthContext();
  if (loadingAuth) return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <Loader />
    </div>
  )
  return (
    <>
      {!!auth?.email ? (
        <div className="bg-gray-100">
          <Header />
          <div className="md:flex md:min-h-[500px]">
            <Sidebar />
            <main className="p-10 flex-1">
              <Outlet />
            </main>
          </div>
        </div>
      ) : <Navigate to='/login' />}
    </>
  )
}

export default ProtectedRoutes