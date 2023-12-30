import MainLoader from "../../components/MainLoader";
import CardProject from "../../components/projects/CardProject";
import { useUpTask } from "../../context/UpTaskProvider"

const Projects = () => {
  const { projects, loading } = useUpTask();
  
  


  return (
    <>
      <h1 className="text-4xl font-black">
        Proyectos
      </h1>
      <div className="bg-white shadow mt-10 rounded-lg">
        { 
          projects.length ? 
          projects.map((project) => <CardProject key={project._id} project={project}/>) : loading ?  <MainLoader /> :
          <p className="text-center text-gray-600 uppercase p-5"> No hay proyectos </p>
        }
      </div>
    </>
  )
}

export default Projects