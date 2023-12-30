import { instance, configAxios } from "../config/axiosClient"

export const getProject = async ({params}) => {
    const { id } = params;
    try {
        const { data } = await instance(`/projects/${id}`, configAxios());
        return {
            success: true,
            data
        };
    } catch (err) {
        return {
            success: false,
            error: err.response.data
        }
    }   
}