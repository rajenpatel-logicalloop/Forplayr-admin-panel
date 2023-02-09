// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const EditorialsList = lazy(() => import('../../views/allEditorialReport/list'))
const EditorialView = lazy(() => import('../../views/allEditorialReport/view'))

const AppRoutes = [
    {
        element: <EditorialsList />,
        path: '/apps/all-editorial-list'
    },
    {
        element: <Navigate to='/all-editorial-list/view/1' />,
        path: '/apps/all-editorial-list/view'
    },
    {
        element: <EditorialView />,
        path: '/apps/all-editorial-list/view/:id'
    }
]

export default AppRoutes
