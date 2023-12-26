const nodemailer = require('nodemailer')

const emailRegister = async ({email, name, token}) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      const info = await transport.sendMail({
        from: '"UpTask - Administrador de proyectos" <cuentas@uptask.com',
        to: email,
        subject: 'UpTask - Comprueba tu cuenta',
        text: 'Comprueba tu cuenta en UpTask',
        html: `
        <style> 
            .saludo{ 
                font-weight: 900;
                font-size: 18px;
            }

            p {
                text-align:center;
                }
        </style>
        <p class="saludo"> Hola, ${name}. Comprueba tu cuenta en UpTask </p>
        <p> Tu cuenta ya está casi lista, solo debes comprobarla en el siguiente enlace: 
        <a href="${process.env.FRONTEND_URL}/confirm/${token}"> Comprobar cuenta </a> </p>
        
        <p> Si tú no creaste la cuenta, puedes ignorar el mensaje </p>
        `
      })
}

const emailForgot = async ({email, name, token}) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      const info = await transport.sendMail({
        from: '"UpTask - Administrador de proyectos" <cuentas@uptask.com',
        to: email,
        subject: 'UpTask - Recupera tu contraseña',
        text: 'Reestablece la contraseña de tu cuenta en UpTask',
        html: `
        <style> 
            .saludo{ 
                font-weight: 900;
                font-size: 18px;
            }

            p {
                text-align:center;
                }
        </style>
        <p class="saludo"> Hola, ${name}. Has socilitado reestablecer la contraseña de tu cuenta en UpTask </p>
        <p> Sigue el siguiente enlace para recuperar la contraseña de tu cuenta: 
        <a href="${process.env.FRONTEND_URL}/forgot-password/${token}"> Reestablecer contraseña </a> </p>
        
        <p> Si tú no solicitaste reestablecer la contraseña, puedes ignorar el mensaje </p>
        `
      })
}
module.exports = {
    emailRegister,
    emailForgot
}