import { Link, Form } from "react-router-dom"

const Register = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl text-center">
        Regístrate y administra tus <span className="text-slate-700">proyectos</span>
      </h1>
      <Form method="POST" className="mt-10 mb-5 bg-white shadow rounded-lg p-10">
        <div className="my-5">
            <label htmlFor="name" className="text-gray-600 block text-xl font-bold">Nombre</label>
            <input placeholder="Ingresa tu nombre"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              type="text" name="name" id="name" />
          </div>
          <div className="my-5">
            <label htmlFor="email" className="text-gray-600 block text-xl font-bold">Email</label>
            <input placeholder="Ingresa tu email"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              type="email" name="email" id="email" />
          </div>
          <div className="my-5">
            <label htmlFor="password" className="text-gray-600 block text-xl font-bold">Contraseña</label>
            <input placeholder="Ingresa tu contraseña"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              type="password" name="password" id="password" />
          </div>
          <div className="my-5">
            <label htmlFor="password2" className="text-gray-600 block text-xl font-bold">Repite tu contraseña</label>
            <input placeholder="Ingresa tu contraseña"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              type="password" name="password2" id="password2" />
          </div>
          <button type="submit" className="uppercase w-full bg-blue-700 text-white text-xl font-bold
          rounded hover:bg-blue-800 cursor-pointer py-3 transition-colors mb-5">
            Iniciar sesión
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