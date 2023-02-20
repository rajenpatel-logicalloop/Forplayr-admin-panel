// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const ReportsList = lazy(() => import('../../views/reportUserList/list'))
const ReportView = lazy(() => import('../../views/reportUserList/view'))

const AppRoutes = [
    {
        element: <ReportsList />,
        path: '/apps/all-reportuser-list',
    },
    {
        element: <Navigate to='/all-reportuser-list/view/1' />,
        path: '/apps/all-reportuser-list/view'
    },
    {
        element: <ReportView />,
        path: '/apps/all-reportuser-list/view/:id'
    }
]

export default AppRoutes
