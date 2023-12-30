export const showErrors = (actionData, fieldName) => {
    return actionData?.error instanceof Array && actionData?.error?.some(field => fieldName === field.path[0])
}
export const showMessage = (actionData, fieldName) => {
    let index = actionData?.error?.findIndex(field => fieldName === field.path[0])
    return actionData?.error[index].message
} 

export const convertDate = (date) => {
    const options = {
        weekend: 'Long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
    return new Date(date.split('T')[0].split('-')).toLocaleDateString('es-ES', options)
}

export const dateToForm = (date) => {
    return date?.slice(0, 10);
}