import { useState, useEffect } from "react"
import { Link, Form, useActionData, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { showErrors, showMessage } from "../../helpers/helpers";
const Register = () => {
  const actionData = useActionData();
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState({
    password: true,
    password2: true
  })

  const handleShowPassword = e => {
    const { name } = e.target.dataset;

    setShowPassword(prevState => ({
      ...prevState, [name]: !prevState[name]
    }))

  }

  useEffect(() => {
    if (actionData?.error?.message) {
      toast.error(actionData.error.message)
    }

    if (actionData?.success) {
      toast.success(actionData.message)
      setTimeout(() => {
        navigate('/')
      }, 1000)
    }
  }, [actionData])

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl text-center">
        Regístrate y administra tus <span className="text-slate-700">proyectos</span>
      </h1>
      <Form method="POST" className="mt-10 mb-5 bg-white shadow rounded-lg p-10" action='/register'

      >
        <div className="my-5">
          <label htmlFor="name" className="text-gray-600 block text-xl font-bold">Nombre</label>
          <input placeholder="Ingresa tu nombre"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            type="text" name="name" id="name" />
          {showErrors(actionData, 'name') && (<p className="text-white mt-2 bg-red-500 rounded px-2 py-2 w-fit text-sm"> {showMessage(actionData, 'name')} </p>)}

        </div>
        <div className="my-5">
          <label htmlFor="email" className="text-gray-600 block text-xl font-bold">Email</label>
          <input placeholder="Ingresa tu email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            type="email" name="email" id="email" />
          {showErrors(actionData, 'email') && (<p className="text-white mt-2 bg-red-500 rounded px-2 py-2 w-fit text-sm"> {showMessage(actionData, 'email')} </p>)}

        </div>
        <div className="my-5">
          <label htmlFor="password" className="text-gray-600 block text-xl font-bold">Contraseña</label>
          <div className="relative w-full mt-3">
            <input placeholder="Ingresa tu contraseña"
              className="w-full  p-3 border rounded-xl bg-gray-50"
              type={showPassword.password ? "password" : "text"} name="password" id="password"

            />
            {
              showPassword.password ?
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" onClick={handleShowPassword} data-name='password' viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute right-2 top-2/4 translate-y-[-50%] cursor-pointer">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" onClick={handleShowPassword} data-name='password' viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute right-2 top-2/4 translate-y-[-50%] cursor-pointer">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
            }
          </div>
          {showErrors(actionData, 'password') ? (<p className="text-white mt-2 bg-red-500 rounded px-2 py-2 w-fit text-sm"> {showMessage(actionData, 'password')} </p>)
            : (<p className="block mt-2 text-slate-500 text-sm"> Debe contener solo letras y números, y como mínimo 6 caracteres </p>)}
        </div>
        <div className="my-5">
          <label htmlFor="password2" className="text-gray-600 block text-xl font-bold">Repite tu contraseña</label>

          <div className="relative w-full mt-3">
            <input placeholder="Repite la contraseña"
              className="w-full p-3 border rounded-xl bg-gray-50"
              type={showPassword.password2 ? "password" : "text"} name="password2" id="password2"

            />
            {
              showPassword.password2 ?
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" onClick={handleShowPassword} data-name='password2' viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute right-2 top-2/4 translate-y-[-50%] cursor-pointer">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" onClick={handleShowPassword} data-name='password2' viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute right-2 top-2/4 translate-y-[-50%] cursor-pointer">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
            }
          </div>

          {showErrors(actionData, 'password2') && (<p className="text-white mt-2 bg-red-500 rounded px-2 py-2 w-fit text-sm"> {showMessage(actionData, 'password2')} </p>)}


        </div>
        <button type="submit" className="uppercase w-full bg-blue-700 text-white text-xl font-bold
          rounded hover:bg-blue-800 cursor-pointer py-3 transition-colors mb-5">
          Regístrate
        </button>
      </Form>
      <nav className="lg:flex lg:justify-between">
        <Link to="/" className="block text-center my-5 text-slate-500 uppercase text-sm">
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
        <Link to="/forgot-password" className="block text-center my-5 text-slate-500 uppercase text-sm">
          ¿Olvidaste tu contraseña?
        </Link>
      </nav>
    </>
  )
}

export default Register