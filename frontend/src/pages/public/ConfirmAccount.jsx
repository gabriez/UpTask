import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import { instance } from "../../config/axiosClient";

const ConfirmAccount = () => {
  const { token } = useParams()
  const navigate = useNavigate();
  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const { data } = await instance(`${import.meta.env.VITE_API_URL}/users/confirm/${token}`)
        toast.success(data.message)
        setTimeout(() => {
          navigate('/')
        }, 2000)
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    confirmAccount()
  },[])

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl text-center">
          Confirma tu cuenta y crea nuevos <span className="text-slate-700">proyectos</span>
      </h1>
    </>
  )
}

export default ConfirmAccount