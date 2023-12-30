import { Form, useActionData, useNavigate, useNavigation } from "react-router-dom"
import { useUpTask } from "../../context/UpTaskProvider";
import { useEffect } from "react";
import { dateToForm, showErrors, showMessage} from "../../helpers/helpers";
import { toast } from "react-toastify";


const FormProject = ({project, action}) => {
  let actionData = useActionData();
  const navigate = useNavigate();
  const { setProjects, projects } = useUpTask();
  useEffect(() => {
    if (actionData?.error?.message) {
      toast.error(actionData.error.message)
    }

    if (actionData?.success) {
      toast.success(actionData.message)

      if (!actionData.edit){ 
        setProjects(prevState => [...prevState, actionData.project]);
      } 
      if (actionData.edit) {
        const newProjects = projects.map( item => {
          if (item._id === actionData.project._id) {
            return actionData.project
          } else {
            return item
          }
        })

        setProjects(newProjects)
      }
      navigate('/projects')
      actionData = null
    }
  }, [actionData])

  return (
    <Form method="POST" action={action} className="bg-white py-10 px-5 md:w-1/2 rounded-lg">
      <div className="mb-5">
        <label htmlFor="name" className="text-gray-700 uppercase font-bold text-sm">
          Nombre del proyecto
        </label>
        <input type="text"
          name="name"
          id="name"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
          defaultValue={project?.name}
          />
        {showErrors(actionData, 'name') && (<p className="text-white mt-2 bg-red-500 rounded px-2 py-2 w-fit text-sm"> {showMessage(actionData, 'name')} </p>)}

      </div>
      <div className="mb-5">
        <label htmlFor="description" className="text-gray-700 uppercase font-bold text-sm">
          Descripción del proyecto
        </label>
        <textarea
          name="description"
          id="description"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
          defaultValue={project?.description}></textarea>
            {showErrors(actionData, 'description') && (<p className="text-white mt-2 bg-red-500 rounded px-2 py-2 w-fit text-sm"> {showMessage(actionData, 'description')} </p>)}

      </div>
      <div className="mb-5">
        <label htmlFor="date-deliver" className="text-gray-700 uppercase font-bold text-sm">
          Fecha de entrega
        </label>
        <input type="date"
          name="dateDeliver"
          id="date-deliver"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
          defaultValue={dateToForm(project?.dateDeliver)}
          
          />
            {showErrors(actionData, 'dateDeliver') && (<p className="text-white mt-2 bg-red-500 rounded px-2 py-2 w-fit text-sm"> {showMessage(actionData, 'dateDeliver')} </p>)}

      </div>
      <div className="mb-5">
        <label htmlFor="client" className="text-gray-700 uppercase font-bold text-sm">
          Nombre del cliente
        </label>
        <input type="text"
          name="client"
          id="client"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          defaultValue={project?.client}
           />
            {showErrors(actionData, 'client') && (<p className="text-white mt-2 bg-red-500 rounded px-2 py-2 w-fit text-sm"> {showMessage(actionData, 'client')} </p>)}

      </div>
      <button type="submit" 
        className="bg-sky-600 w-full p-3 font-bold text-white 
        rounded cursor-pointer hover:bg-sky-700 transition-colors" > { project?.name ? 'EDITAR PROYECTO' :  'CREAR PROYECTO'} </button>
    </Form>
  )
}

export default FormProject