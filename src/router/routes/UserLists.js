// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const UserList = lazy(() => import('../../views/userList/list'))
const UserView = lazy(() => import('../../views/userList/view'))

const AppRoutes = [
    {
        element: <UserList />,
        path: '/apps/userList'
    },
    {
        path: '/apps/userList/view',
        element: <Navigate to='/apps/userList/view/1' />
    },
    {
        element: <UserView />,
        path: '/apps/userList/view/:id'
    }
]

export default AppRoutes
