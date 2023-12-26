export const showErrors = (actionData, fieldName) => {
    return actionData?.error instanceof Array && actionData?.error?.some(field => fieldName === field.path[0])
}
export const showMessage = (actionData, fieldName) => {
    let index = actionData?.error?.findIndex(field => fieldName === field.path[0])
    return actionData?.error[index].message
} 