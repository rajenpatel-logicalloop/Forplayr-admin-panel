// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const ReportsList = lazy(() => import('../../views/reportPostList/list'))
const ReportView = lazy(() => import('../../views/reportPostList/view'))

const AppRoutes = [
    {
        element: <ReportsList />,
        path: '/apps/all-reportpost-list',
    },
    {
        element: <Navigate to='/all-reportpost-list/view/1' />,
        path: '/apps/all-reportpost-list/view'
    },
    {
        element: <ReportView />,
        path: '/apps/all-reportpost-list/view/:id'
    }
]

export default AppRoutes
