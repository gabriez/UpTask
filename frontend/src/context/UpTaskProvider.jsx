import { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpTaskContext = createContext();

export const useUpTaskContext = () => {
    return useContext(UpTaskContext);
}


const UpTaskProvider = ({children}) => {
   const [project, setProject] = useState({})

  return (
    <UpTaskContext.Provider value={{setProject}}>
        <ToastContainer/>
        {children}
    </UpTaskContext.Provider>
  )
}

export default UpTaskProvider