import { createBrowserRouter } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import ForgotPassword from '../pages/public/ForgotPassword';
import NewPassword from '../pages/public/NewPassword';
import ConfirmAccount from '../pages/public/ConfirmAccount';
import { actionRegister, actionForgot, actionNewPassword, actionLogin } from '../helpers/actions';
import ProtectedRoutes from './ProtectedRoutes';
import Projects from '../pages/private/Projects';

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                path: '/login',
                element: <Login />,
                action: actionLogin
            },
            {
                path: '/register',
                element: <Register />,
                action: actionRegister
            },
            {
                path: '/forgot-password',
                element: <ForgotPassword />,
                action: actionForgot
            },
            {
                path: '/forgot-password/:token',
                element: <NewPassword />,
                action: actionNewPassword
            },
            {
                path: '/confirm/:token',
                element: <ConfirmAccount />
            }
        ]
    },
    {
        path: '/projects',
        element: <ProtectedRoutes />,
        children: [
            {
                index: true,
                element: <Projects />
            }
        ]
    }
])

export default router;