// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const ClubsList = lazy(() => import('../../views/allClubReport/list'))
const ClubView = lazy(() => import('../../views/allClubReport/view'))

const AppRoutes = [
    {
        element: <ClubsList />,
        path: '/apps/all-club-list'
    },
    {
        element: <Navigate to='/apps/all-club-list/view/1' />,
        path: '/apps/all-club-list/view'
    },
    {
        element: <ClubView />,
        path: '/apps/all-club-list/view/:id'
    }
]

export default AppRoutes
