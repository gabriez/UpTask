import Joi from 'joi';
import { json } from 'react-router-dom';
import { instance } from '../config/axiosClient';
const API_URL = import.meta.env.VITE_API_URL

function formDataToObject(form) {
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
        const {password} = value

        const { data } = await instance.post(`${API_URL}/users/confirm-password/${token}`, {password});
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

export const actionLogin = async ({request}) => {
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