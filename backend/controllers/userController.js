const User = require('../models/User.js')
const generateID = require('../helpers/generateID.js')
const generateJWT = require('../helpers/generateJWT.js')
const { emailRegister, emailForgot } = require('../helpers/email.js')


const register = async (req, res) => {
    const { email } = req.body;
    const emailExist = await User.findOne({ email })
    if (emailExist) {
        const error = new Error('El email ya existe')
        return res.status(404).json({
            message: error.message
        })
    }

    try {
        const newUser = new User(req.body);
        newUser.token = generateID();
        await newUser.save();
        emailRegister({
            name: newUser.name,
            email, 
            token: newUser.token
        })
        return res.json({
            message: 'Se registró exitosamente, revise su correo para confirmar su cuenta'
        });
    } catch (error) {
        console.error(error)
        return res.status(400).json({
            message: error.message
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        const error = new Error('El usuario no existe')
        return res.status(404).json({
            message: error.message
        })
    }
    if (!user.confirmation) {
        const error = new Error('El usuario no está confirmado')
        return res.status(401).json({
            message: error.message
        })
    }

    if (await user.authenticatePassword(password)) {
        return res.json({
            token: generateJWT({
                id: user._id,
                email: user.email,
                name: user.name
            })

        })
    } else {
        const error = new Error('La contraseña es incorrecta')
        return res.status(400).json({
            message: error.message
        })
    }
}

const confirm = async (req, res) => {
    const { token } = req.params;
    const user = await User.findOne({
        token
    })
    if (!user) {
        const error = new Error('El token no es válido')
        return res.status(404).json({
            message: error.message
        })
    }
    try {
        user.confirmation = true;
        user.token = "";
        await user.save();
        return res.json({ message: 'La cuenta fue verificada exitosamente' })
    } catch (error) {
        return res.json(
            { message: error.message }
        )
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({
        email
    })
    if (!user) {
        const error = new Error('El usuario no existe')
        return res.status(404).json({
            message: error.message
        })
    }
    if (!user.confirmation) {
        const error = new Error('El usuario no está confirmado')
        return res.status(404).json({
            message: error.message
        })
    }

    try {
        user.token = generateID();
        await user.save();
        emailForgot({
            email: user.email,
            name: user.name,
            token: user.token
        })
        return res.json({
            message: 'Le hemos enviado el enlace con las instrucciones para recuperar su contraseña al correo'
        })
    } catch (error) {
        console.error(error)
        return res.json(
            { message: error.message }
        )
    }
}

const confirmPassword = async (req, res) => {
    const { token } = req.params;
    const user = await User.findOne({
        token
    })

    if (!user) {
        const error = new Error('El token no existe')
        return res.status(404).json({
            message: error.message
        })
    }
    return res.json({ message: 'El token es válido' })

}

const newPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    if (typeof password !== 'string') {
        const error = new Error('La contraseña debe ser una cadena')
        return res.status(404).json({
            message: error.message
        })
    }

    if (password === '') {
        const error = new Error('La contraseña no puede ser una cadena vacía')
        return res.status(404).json({
            message: error.message
        })
    }

    const user = await User.findOne({
        token
    })

    if (!user) {
        const error = new Error('El token no existe')
        return res.status(404).json({
            message: error.message
        })
    }

    try {
        user.token = "";
        user.password = password;
        await user.save();
        return res.json({ message: 'La contraseña se modificó con éxito' })
    } catch (error) {
        console.error(error)
        return res.json(
            { message: error.message }
        )
    }
}

const profile = async (req, res) => {
    const {user} = req
    return res.json(user) 
}

module.exports = {
    register,
    login,
    confirm,
    forgotPassword,
    confirmPassword,
    newPassword,
    profile
}