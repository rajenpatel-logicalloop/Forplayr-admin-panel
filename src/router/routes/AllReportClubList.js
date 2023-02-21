// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const ReportsList = lazy(() => import('../../views/reportClubList/list'))
const ReportView = lazy(() => import('../../views/reportClubList/view'))

const AppRoutes = [
    {
        element: <ReportsList />,
        path: '/apps/all-reportclub-list',
    },
    {
        element: <Navigate to='/all-reportclub-list/view/1' />,
        path: '/apps/all-reportclub-list/view'
    },
    {
        element: <ReportView />,
        path: '/apps/all-reportclub-list/view/:id'
    }
]

export default AppRoutes
