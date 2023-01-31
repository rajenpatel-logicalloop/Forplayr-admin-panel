// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const ClubList = lazy(() => import('../../views/clubList/list'))
const ClubView = lazy(() => import('../../views/clubList/view'))

const AppRoutes = [
    {
        element: <ClubList />,
        path: '/apps/clubList'
    },
    {
        path: '/apps/clubList/view',
        element: <Navigate to='/apps/clubList/view/1' />
    },
    {
        element: <ClubView />,
        path: '/apps/clubList/view/:id'
    }
]

export default AppRoutes
