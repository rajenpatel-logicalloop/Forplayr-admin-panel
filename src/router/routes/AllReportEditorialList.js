// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const ReportsList = lazy(() => import('../../views/reportEditorialList/list'))
const ReportView = lazy(() => import('../../views/reportEditorialList/view'))

const AppRoutes = [
    {
        element: <ReportsList />,
        path: '/apps/all-reporteditorial-list',
    },
    {
        element: <Navigate to='/all-reporteditorial-list/view/1' />,
        path: '/apps/all-reporteditorial-list/view'
    },
    {
        element: <ReportView />,
        path: '/apps/all-reporteditorial-list/view/:id'
    }
]

export default AppRoutes
