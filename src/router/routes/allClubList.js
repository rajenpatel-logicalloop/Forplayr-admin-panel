// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const clubsList = lazy(() => import('../../views/allClubList/list'))
const ClubView = lazy(() => import('../../views/allClubList/view'))

const AppRoutes = [
    {
        element: <clubsList />,
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
