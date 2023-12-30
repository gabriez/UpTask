import { useEffect } from "react"
import { Link, Form, useActionData } from "react-router-dom"
import { toast } from "react-toastify"
import { showErrors, showMessage } from "../../helpers/helpers";


const ForgotPassword = () => {
  const actionData = useActionData();
  useEffect(() => {
    if (actionData?.error?.message) {
      toast.error(actionData.error.message)
    }
    if (actionData?.success) {
      toast.success(actionData.message)
        }
  }, [actionData])

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl text-center">
        Recupera tu acceso y no pierdas tus <span className="text-slate-700">proyectos</span>
      </h1>
      <Form method="POST" action='/forgot-password' className="mt-10 mb-5 bg-white shadow rounded-lg p-10">
        <div className="my-5">
          <label htmlFor="email" className="text-gray-600 block text-xl font-bold">Email</label>
          <input placeholder="Ingresa tu email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            type="email" name="email" id="email" />
          {showErrors(actionData, 'email') && (<p className="text-white mt-2 bg-red-500 rounded px-2 py-2 w-fit text-sm"> {showMessage(actionData, 'email')} </p>)}

        </div>
        <button type="submit" className="uppercase w-full bg-blue-700 text-white text-xl font-bold
          rounded hover:bg-blue-800 cursor-pointer py-3 transition-colors mb-5">
          Recuperar
        </button>
      </Form>
      <nav className="lg:flex lg:justify-between">
        <Link to="/login" className="block text-center my-5 text-slate-500 uppercase text-sm">
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
        <Link to="/register" className="block text-center my-5 text-slate-500 uppercase text-sm">
          ¿No tienes una cuenta? Regístrate
        </Link>
      </nav>
    </>
  )
}

export default ForgotPassword