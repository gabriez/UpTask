import { useNavigate, useFetcher, useLoaderData, useNavigation } from "react-router-dom";
import FormProject from "../../components/projects/FormProject"
import NotFound from "../../components/NotFound";
import MainLoader from "../../components/MainLoader";
import NoAuthorized from "../../components/NoAuthorized";
import { useUpTask } from "../../context/UpTaskProvider";
import { useEffect } from "react";

const EditProject = () => {
    const navigation = useNavigation();
    const navigate = useNavigate();
    const loaderData = useLoaderData();
    const fetcher = useFetcher();
    const { setProjects } = useUpTask();
    const project = loaderData?.data;

    if (navigation.state === 'loading') return (
        <MainLoader />
    )

    if (!loaderData.success) {
        if (loaderData.error.message === 'Recurso no encontrado') return <NotFound />
        if (loaderData.error.message === 'Acceso no autorizado') return <NoAuthorized />
    }

    useEffect(() => {
        if (fetcher.data?.success ) {
            setProjects( prevState => {
                return prevState.filter( item => item._id !== project._id)
            })
            navigate('/projects')
        }
    }, [fetcher.data])
    

    const handleSubmit = e => {
        if (!confirm('¿Está seguro de que desea eliminar el proyecto?')) e.preventDefault();
    }
    return (
        <>
            <div className="flex justify-between gap-2">
                <h1 className="text-4xl font-black">
                    Edita el proyecto {project.name}
                </h1>
                <div className="flex items-center gap-2 text-gray-400 hover:text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    <fetcher.Form method="post" action={`/projects/delete/${project._id}`} onSubmit={handleSubmit} state={{delete: true, _id: project._id}}>
                        <button
                            className="uppercase font-bold cursor-pointer"
                        >
                            Eliminar
                        </button>
                    </fetcher.Form>
                </div>
            </div>

            <div className="mt-10 flex justify-center">
                <FormProject action={`/projects/edit/${project._id}`} project={project} />
            </div>
        </>
    )
}

export default EditProject