const User = require('../models/User.js')
const generateID = require('../helpers/generateID.js')
const generateJWT = require('../helpers/generateJWT.js')

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
        const savedUser = await newUser.save();
        return res.json(savedUser);
    } catch (error) {
        console.error(error)
        return res.json({
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
            msg: error.message
        })
    }
    if (!user.confirmation) {
        const error = new Error('El usuario no está confirmado')
        return res.status(401).json({
            msg: error.message
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
        return res.json({
            msg: error.message
        })
    }
}

const confirm = async (req, res) => {
    const { token } = req.params;
    const user = await User.findOne({
        token
    })

    if (!user) {
        const error = new Error('El token no existe')
        return res.status(404).json({
            msg: error.message
        })
    }
    try {
        user.confirmation = true;
        user.token = "";
        await user.save();
        return res.json({ msg: 'La cuenta fue verificada exitosamente' })
    } catch (error) {
        console.error(error)
        return res.json(
            { msg: error.message }
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
        return res.json({
            msg: error.message
        })
    }
    try {
        user.token = generateID();
        await user.save();
        return res.json({
            msg: 'Le hemos enviado el enlace con las instrucciones para recuperar su contraseña al correo'
        })
    } catch (error) {
        console.error(error)
        return res.json(
            { msg: error.message }
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
            msg: error.message
        })
    }
    return res.json({ msg: 'El token es válido' })

}

const newPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    if (typeof password !== 'string') {
        const error = new Error('La contraseña debe ser una cadena')
        return res.status(404).json({
            msg: error.message
        })
    }

    if (password === '') {
        const error = new Error('La contraseña no puede ser una cadena vacía')
        return res.status(404).json({
            msg: error.message
        })
    }

    const user = await User.findOne({
        token
    })

    if (!user) {
        const error = new Error('El token no existe')
        return res.status(404).json({
            msg: error.message
        })
    }

    try {
        user.token = "";
        user.password = password;
        await user.save();
        return res.json({ msg: 'La contraseña se modificó con éxito' })
    } catch (error) {
        console.error(error)
        return res.json(
            { msg: error.message }
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