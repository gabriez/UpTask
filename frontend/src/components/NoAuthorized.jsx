const NoAuthorized = () => {
    return (
      <div className='h-full flex justify-center items-center'>
          <div className="text-center">
              <h3 className="text-6xl font-bold text-red-500">
                  Código 401
              </h3>
              <p className="text-4xl font-bold">
                 Acceso no autorizado
              </p>
          </div>
  
      </div>
    )
  }
  
  export default NoAuthorized