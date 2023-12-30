import { Form } from "react-router-dom"
import FormProject from "../../components/projects/FormProject"

const CreateProject = () => {
    return (
      <>
        <h1 className="text-4xl font-black">
          Crear proyecto
        </h1>
        <div className="mt-10 flex justify-center">
          <FormProject action='/projects/create-project'/>
        </div>
      </>
    )
  }
  
  export default CreateProject