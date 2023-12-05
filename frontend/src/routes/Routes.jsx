import { createBrowserRouter } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import ForgotPassword from '../pages/public/ForgotPassword';
import NewPassword from '../pages/public/NewPassword';
import ConfirmAccount from '../pages/public/ConfirmAccount';

const router = createBrowserRouter([
    {
    path: '/',
    element: <AuthLayout/>,
    children: [
        {
            index: true,
            element: <Login/>
        },
        {
            path:'/register',
            element: <Register/>
        },
        {
            path:'/forgot-password',
            element: <ForgotPassword/>
        },
        {
            path:'/forgot-password/:token',
            element: <NewPassword/>
        },
        {
            path: '/confirm/:id',
            element: <ConfirmAccount/>
        }
    ]
    }
])

export default router;