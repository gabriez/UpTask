import { useUpTask } from "../../context/UpTaskProvider";
import { convertDate } from "../../helpers/helpers";

const Task = ({ task }) => {
    const { title, description, dateDeliver, priority, _id, state } = task;
    const { handleEditTask, handleModalDelete } = useUpTask()


    return (
        <div className="border-b p-5 flex justify-between items-center overflow-hidden lg:flex-nowrap flex-wrap gap-3 md:gap-1">
            <div className=" md:max-w-auto max-w-[90%]">
                <p className="mb-2 text-2xl font-semibold"> {title} </p>
                <p className="mb-2 text-xl break-words text-gray-500 whitespace-pre-wrap"> {description} </p>
                <p className="mb-2 text-xl"> {convertDate(dateDeliver)} </p>
                <p className="mb-2 text-gray-600"> Prioridad: {priority} </p>

            </div>
            <div className="flex gap-2">
                <button onClick={ () => {
                    handleEditTask(task)
                }} className="bg-indigo-600 px-4 py-3 text-white font-bold text-sm rounded-lg">
                    EDITAR
                </button>

                {state ?
                    <button className="bg-gray-600 px-4 py-3 text-white font-bold text-sm rounded-lg">
                        INCOMPLETA
                    </button>
                    :
                    <button className="bg-sky-600 px-4 py-3 text-white font-bold text-sm rounded-lg">
                        COMPLETA
                    </button>}

                <button onClick={() => handleModalDelete(_id)} className="bg-red-600 px-4 py-3 text-white font-bold text-sm rounded-lg">
                    ELIMINAR
                </button>
            </div>
        </div>

    )
}

export default Task