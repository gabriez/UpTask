import { useState } from "react";
import { useLoaderData, useNavigation, Link } from "react-router-dom"
import NotFound from "../../components/NotFound";
import NoAuthorized from "../../components/NoAuthorized";
import MainLoader from "../../components/MainLoader";
import ModalFormTask from "../../components/projects/ModalFormTask";
import { useUpTask } from "../../context/UpTaskProvider";
import Task from "../../components/projects/Task";
import ModalDeleteTask from "../../components/projects/ModalDeleteTask";

const Project = () => {
    const {handleModal} = useUpTask();
    const navigation = useNavigation();
    const loaderData = useLoaderData();
    const project = loaderData?.data;

    
    if (navigation.state === 'loading') return (
            <MainLoader />
    )

    if (!loaderData.success) {
        if (loaderData.error.message === 'Recurso no encontrado') return <NotFound />
        if (loaderData.error.message === 'Acceso no autorizado') return <NoAuthorized />
    }

    return (
        <>
            <div className="flex justify-between gap-2">
                <h1 className="font-black text-4xl">
                    {project?.name}
                </h1>
                <div className="flex items-center gap-2 text-gray-400 hover:text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                    <Link
                        to={`/projects/edit/${project._id}`}
                        className="uppercase font-bold cursor-pointer"
                    >
                        Editar
                    </Link>
                </div>

            </div>

            <button
                type="button"
                className="text-sm px-5 py-3 w-full mt-5 md:w-auto rounded-lg uppercase font-bold
                bg-sky-400 text-white text-center"
                onClick={handleModal}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

                Nueva tarea
            </button>

            <h3 className="font-bold text-2xl mt-6">Tareas del proyecto</h3>
            <div className="bg-white shadow mt-6 rounded-lg">
                {
                    project.tasks?.length > 0? 
                        project.tasks.map(task => <Task key={task._id} task={task}/>)
                    : <p className="text-center my-5 p-10">
                        No hay tareas
                    </p>
                }
            </div>

            <div className="flex items-center justify-between mt-6">
                <p className="font-bold text-2xl">Colaboradores</p>
                <Link 
                    to={`/projects/new-colaborator/${project._id}`}
                    className="text-gray-400 hover:text-black font-bold"
                > AÑADIR 
                </Link>
            </div>

            <ModalFormTask projectID = {project._id} />
            <ModalDeleteTask/>
        </>
    )
}

export default Project