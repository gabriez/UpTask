import { createBrowserRouter } from 'react-router-dom'

import AuthLayout from '../layouts/AuthLayout'
import ProtectedRoutes from './ProtectedRoutes';

import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import ForgotPassword from '../pages/public/ForgotPassword';
import NewPassword from '../pages/public/NewPassword';
import ConfirmAccount from '../pages/public/ConfirmAccount';
import Projects from '../pages/private/Projects';
import CreateProject from '../pages/private/CreateProject';
import EditProject from '../pages/private/EditProject';
import NewColaborator from '../pages/private/NewColaborator';

import {
    actionRegister,
    actionForgot,
    actionNewPassword,
    actionLogin,
    actionCProject,
    actionEProject,
    actionDProject,
    actionATask,
    actionETask,
    actionDTask
} from '../helpers/actions';
import Project from '../pages/private/Project';
import { getProject } from '../helpers/loaders';

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
                element: <Projects />,
            },
            {
                path: 'create-project',
                element: <CreateProject />,
                action: actionCProject
            },
            {
                path: ':id',
                element: <Project />,
                loader: getProject
            },
            {
                path: 'edit/:id',
                element: <EditProject />,
                loader: getProject,
                action: actionEProject
            },
            {
                path: 'delete/:id',
                action: actionDProject
            },
            {
                path: 'addTask',
                action: actionATask
            },
            {
                path: 'editTask/:id',
                action: actionETask
            },
            {
                path: 'deleteTask/:id',
                action: actionDTask
            },
            {
                path: 'new-colaborator/:id',
                element: <NewColaborator />
            }
        ]
    }
])

export default router;