import { createContext, useContext, useEffect, useState } from "react";
import { instance, configAxios } from "../config/axiosClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "./AuthProvider";

const UpTaskContext = createContext();

export const useUpTask = () => {
  return useContext(UpTaskContext);
}


const UpTaskProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const { auth } = useAuthContext();
  const [stateTask, setStateTask] = useState({})


  useEffect(() => {
    const getProjects = async () => {

      try {
        const { data } = await instance('/projects', configAxios());
        setProjects(data)
      } catch (err) {
        console.error(err);
        toast.error('Ocurrió un error al traer los proyectos. Recargue la página')
      }
      setLoading(false)
    }
    if (!!auth?.email) getProjects()
  }, [auth])

  const handleModal = () => {
    setModal(!modal)
    setTimeout(() => {
      setStateTask({})
    }, 500)
  }

  const handleEditTask = (task) => {
    setStateTask(task)
    setModal(!modal)
  }

  const handleModalDelete = (id) => {
    if (!modalDelete) setStateTask({id})
    else setStateTask({})
    setModalDelete(!modalDelete)
  }

  return (
    <UpTaskContext.Provider value={{
      projects, setProjects, loading, handleModal, handleEditTask, stateTask,
      modal, modalDelete, handleModalDelete
    }}>
      <ToastContainer />
      {children}
    </UpTaskContext.Provider>
  )
}

export default UpTaskProvider