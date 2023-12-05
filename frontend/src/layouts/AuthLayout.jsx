import { Outlet } from "react-router-dom"
const AuthLayout = () => {
  return (
    <main className="container mx-auto flex justify-center items-center min-h-screen">
        <div className="w-11/12 md:w-2/3 lg:w-5/12">
          <Outlet/>
        </div>
    </main>
  )
}

export default AuthLayout