import Joi from 'joi';
import { json, redirect } from 'react-router-dom';
import { configAxios, instance } from '../config/axiosClient';
import { toast } from 'react-toastify';
const API_URL = import.meta.env.VITE_API_URL

const formDataToObject = form => {
    let formObject = {};
    for (const [key, value] of form.entries()) {
        formObject[key] = value;
    }
    return formObject
}


/* 
----------------------------------------------------
-----------SCHEMA AND ACTION REGISTER---------------
----------------------------------------------------
*/

const schemaRegister = Joi.object({
    name: Joi.string().required().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "string.empty":
                    err.message = "El campo no puede estar vacío";
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "string.empty":
                    err.message = "El campo no puede estar vacío";
                    break;
                case "string.email":
                    err.message = "Debe ingresar un email válido";
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),
    password: Joi.string()
        .regex(/[0-9a-zA-Z]*\d[0-9a-zA-Z]*/)
        .regex(/[0-9a-zA-Z]*[a-zA-Z][0-9a-zA-Z]*/)
        .min(6)
        .required()
        .error(errors => {
            errors.forEach(err => {
                switch (err.code) {
                    case "string.pattern.base":
                        err.message = "La contraseña debe contener como mínimo un número y una letra";
                        break;
                    case "string.empty":
                        err.message = "El campo no puede estar vacío";
                        break;
                    case "string.min":
                        err.message = "La contraseña debe tener mínimo 6 carácteres";
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
    password2: Joi.string().valid(Joi.ref('password')).error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "any.only":
                    err.message = "Las contraseñas deben ser iguales";
                    break;
                case "any.required":
                    err.message = "El campo no puede estar vacío";
                    break;
                default:
                    break;
            }
        });
        return errors;
    })
})



export const actionRegister = async ({ request }) => {
    const form = await request.formData();
    let formObject = formDataToObject(form);
    const { error, value } = schemaRegister.validate({
        name: formObject.name,
        email: formObject.email,
        password: formObject.password,
        password2: formObject.password2
    }, { abortEarly: false })
    if (error) {
        return json(
            {
                error: error.details
            }
        )
    }
    try {
        let { password2, ...sendData } = value;
        const { data } = await instance.post(`${API_URL}/users/register`, sendData);
        return json({
            success: true,
            message: data.message,
            error: []
        })
    } catch (err) {
        return json(
            {
                error: err.response.data
            }
        )
    }

}

/* 
----------------------------------------------------
-----------SCHEMA AND ACTION FORGOT PASSWORD--------
----------------------------------------------------
*/

const schemaForgot = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "string.empty":
                    err.message = "El campo no puede estar vacío";
                    break;
                case "string.email":
                    err.message = "Debe ingresar un email válido";
                    break;
                default:
                    break;
            }
        });
        return errors;
    })
})

export const actionForgot = async ({ request }) => {
    const form = await request.formData();
    let formObject = formDataToObject(form);
    const { error, value } = schemaForgot.validate({
        email: formObject.email
    })
    if (error) {
        return json(
            {
                error: error.details
            }
        )
    }
    try {
        const { data } = await instance.post(`${API_URL}/users/forgot-password`, value);
        return json({
            success: true,
            message: data.message,
            error: []
        })
    } catch (err) {
        return json(
            {
                error: err.response.data
            }
        )
    }
}


/* 
----------------------------------------------------
-----------SCHEMA AND ACTION NEW PASSWORD-----------
----------------------------------------------------
*/

const schemaNewPassword = Joi.object({
    password: Joi.string()
        .regex(/[0-9a-zA-Z]*\d[0-9a-zA-Z]*/)
        .regex(/[0-9a-zA-Z]*[a-zA-Z][0-9a-zA-Z]*/)
        .min(6)
        .required()
        .error(errors => {
            errors.forEach(err => {
                switch (err.code) {
                    case "string.pattern.base":
                        err.message = "La contraseña debe contener como mínimo un número y una letra";
                        break;
                    case "string.empty":
                        err.message = "El campo no puede estar vacío";
                        break;
                    case "string.min":
                        err.message = "La contraseña debe tener mínimo 6 carácteres";
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
    password2: Joi.string().valid(Joi.ref('password')).error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "any.only":
                    err.message = "Las contraseñas deben ser iguales";
                    break;
                case "any.required":
                    err.message = "El campo no puede estar vacío";
                    break;
                default:
                    break;
            }
        });
        return errors;
    })
})

export const actionNewPassword = async ({ request, params }) => {
    const form = await request.formData();
    const { token } = params;
    let formObject = formDataToObject(form);
    const { error, value } = schemaNewPassword.validate({
        password: formObject.password,
        password2: formObject.password2
    }, { abortEarly: false })
    if (error) {
        return json(
            {
                error: error.details
            }
        )
    }
    try {
        const { password } = value

        const { data } = await instance.post(`${API_URL}/users/confirm-password/${token}`, { password });
        return json({
            success: true,
            message: data.message,
            error: []
        })
    } catch (err) {
        return json(
            {
                error: err.response.data
            }
        )
    }
}

/* 
----------------------------------------------------
-----------SCHEMA AND ACTION LOGIN--------
----------------------------------------------------
*/

const schemaLogin = Joi.object({
    password: Joi.string()
        .required()
        .error(errors => {
            errors.forEach(err => {
                switch (err.code) {
                    case "string.empty":
                        err.message = "El campo no puede estar vacío";
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
    email: Joi.string().email({ tlds: { allow: false } }).required().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "string.empty":
                    err.message = "El campo no puede estar vacío";
                    break;
                case "string.email":
                    err.message = "Debe ingresar un email válido";
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),
})

export const actionLogin = async ({ request }) => {
    const form = await request.formData();
    let formObject = formDataToObject(form);
    const { error, value } = schemaLogin.validate({
        email: formObject.email,
        password: formObject.password
    }, { abortEarly: false })

    if (error) {
        return json(
            {
                error: error.details
            }
        )
    }

    try {
        const { data } = await instance.post(`${API_URL}/users/login`, value);
        return json({
            success: true,
            message: 'Inició sesión exitosamente',
            token: data.token,
            error: []
        })
    } catch (err) {
        return json(
            {
                error: err.response.data
            }
        )
    }
}

/* 
----------------------------------------------------
---SCHEMA AND ACTION CREATE AND EDIT PROJECT--------
----------------------------------------------------
*/

const schemaECProject = Joi.object({
    name: Joi.string().min(3).required().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "string.empty":
                    err.message = "El campo no puede estar vacío";
                    break;
                case "string.min":
                    err.message = "Debe tener mínimo 3 carácteres";
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),
    description: Joi.string().trim().min(20).required().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "string.empty":
                    err.message = "El campo no puede estar vacío";
                    break;
                case "string.min":
                    err.message = "Debe tener mínimo 20 carácteres";
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),
    dateDeliver: Joi.date().greater('now').required().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "date.base":
                    err.message = "El campo no puede estar vacío";
                    break;
                case "date.greater":
                    err.message = "La fecha de entrega no puede ser menor a la actual";
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),
    client: Joi.string().min(3).required().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "string.empty":
                    err.message = "El campo no puede estar vacío";
                    break;
                case "string.min":
                    err.message = "Debe tener mínimo 3 carácteres";
                    break;
                default:
                    break;
            }
        });
        return errors;
    })
})

export const actionCProject = async ({ request }) => {
    const form = await request.formData();
    const formObject = formDataToObject(form);
    const { error, value } = schemaECProject.validate({
        name: formObject.name,
        description: formObject.description,
        dateDeliver: formObject.dateDeliver,
        client: formObject.client
    }, { abortEarly: false })

    if (error) {
        return json(
            {
                error: error.details
            }
        )
    }

    try {
        const { data } = await instance.post(`${API_URL}/projects`, value, configAxios());

        return json({
            success: true,
            message: data.message,
            project: data.project,
            edit: false
        })
    } catch (err) {
        return json(
            {
                error: err.response.data
            }
        )
    }
}

export const actionEProject = async ({ request, params }) => {
    const form = await request.formData();
    const { id } = params;
    const formObject = formDataToObject(form);
    const { error, value } = schemaECProject.validate({
        name: formObject.name,
        description: formObject.description,
        dateDeliver: formObject.dateDeliver,
        client: formObject.client
    }, { abortEarly: false })

    if (error) {
        return json(
            {
                error: error.details
            }
        )
    }

    try {
        const { data } = await instance.put(`${API_URL}/projects/${id}`, value, configAxios());

        return json({
            success: true,
            message: data.message,
            project: data.project,
            edit: true
        })
    } catch (err) {
        return json(
            {
                success: false,
                error: err.response.data
            }
        )
    }
}

/* 
----------------------------------------------------
---------------ACTION DELETE PROJECT----------------
----------------------------------------------------
*/

export const actionDProject = async ({ params }) => {
    const { id } = params;

    try {
        const { data } = await instance.delete(`${API_URL}/projects/${id}`, configAxios());
        toast.success(data.message)

        return {
            success: true
        }

    } catch (err) {
        toast.error(err.response.data.message)

        return {
            success: false
        }
        
    }
}


/* 
----------------------------------------------------
---------------ACTION ADD AND EDIT TASK----------------------
----------------------------------------------------
*/

const schemaTask = Joi.object({
    title: Joi.string().min(3).required().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "string.empty":
                    err.message = "El campo no puede estar vacío";
                    break;
                case "string.min":
                    err.message = "Debe tener mínimo 3 carácteres";
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),
    description: Joi.string().trim().min(20).required().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "string.empty":
                    err.message = "El campo no puede estar vacío";
                    break;
                case "string.min":
                    err.message = "Debe tener mínimo 20 carácteres";
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),
    priority: Joi.string().valid('Baja', 'Media', 'Alta').required().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "string.empty":
                    err.message = "El campo no puede estar vacío";
                    break;
                case "any.only":
                    err.message = "Las prioridades válidas son: Baja, Media, Alta";
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),
    dateDeliver: Joi.date().required().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "date.base":
                    err.message = "El campo no puede estar vacío";
                    break;
                case "date.greater":
                    err.message = "La fecha de entrega debe ser mayor a ayer";
                    break;
                default:
                    break;
            }
        });
        return errors;
    })
})

export const actionATask = async ({request}) => {

    const form = await request.formData();
    const formObject = formDataToObject(form);
    const projectID = sessionStorage.getItem('projectID');
    sessionStorage.removeItem('projectID');

    const {error, value} = schemaTask.validate({
        title: formObject.title,
        description: formObject.description,
        priority: formObject.priority,
        dateDeliver: formObject.dateDeliver
    }, { abortEarly: false })

  

    if (error) {
        return json(
            {
                error: error.details
            }
        )
    }

    try {
        const { data } = await instance.post(`${API_URL}/tasks`, { ...value, project: projectID }, configAxios());
        toast.success(data.message)
        return json({
            success: true,
            task: data.task,
        })
    } catch (err) {
        toast.error(err.response.data.message)

        return json(
            {
                success: false,
                error: err.response.data
            }
        )
    }

}

export const actionETask = async ({request, params}) => {
    const form = await request.formData();
    const { id } = params;
    const formObject = formDataToObject(form);
    const {error, value} = schemaTask.validate({
        title: formObject.title,
        description: formObject.description,
        priority: formObject.priority,
        dateDeliver: formObject.dateDeliver
    }, { abortEarly: false })


    if (error) {
        return json(
            {
                error: error.details
            }
        )
    }

    try {
        const { data } = await instance.put(`${API_URL}/tasks/${id}`, { ...value }, configAxios());
        toast.success(data.message)
        return json({
            success: true,
            task: data.task,
        })
    } catch (err) {
        toast.error(err.response.data.message)

        return json(
            {
                success: false,
                error: err.response.data
            }
        )
    }
}

/* 
----------------------------------------------------
---------------ACTION DELETE TASK----------------------
----------------------------------------------------
*/


export const actionDTask = async ({ params }) => {
    const { id } = params;

    try {
        const { data } = await instance.delete(`${API_URL}/tasks/${id}`, configAxios());
        toast.success(data.message)

        return {
            success: true
        }

    } catch (err) {
        toast.error(err.response.data.message)

        return {
            success: false
        }
        
    }
}