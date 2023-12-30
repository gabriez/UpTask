import { Link } from "react-router-dom"
import { useAuthContext } from "../../context/AuthProvider"

const Sidebar = () => {
  const {auth} = useAuthContext()
  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10 md:sticky top-0">
      <p className="text-xl font-bold">Hola, {auth.name}</p>
      <Link to='create-project'
      className="bg-sky-600 w-full p-3 text-white font-bold 
      block mt-5 text-center rounded-lg uppercase">
        Nuevo proyecto
      </Link>
    </aside>
    )
}

export default Sidebar