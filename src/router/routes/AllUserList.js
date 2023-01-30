// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const UserList = lazy(() => import('../../views/allUserReport/list'))
const UserView = lazy(() => import('../../views/allUserReport/view'))

const AppRoutes = [
    {
        element: <UserList />,
        path: '/apps/all-user-list'
    },
    {
        path: '/apps/all-user-list/view',
        element: <Navigate to='/apps/all-user-list/view/1' />
    },
    {
        element: <UserView />,
        path: '/apps/all-user-list/view/:id'
    }
]

export default AppRoutes
