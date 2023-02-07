// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const EditorialList = lazy(() => import('../../views/allEditorialReport/list'))
const EditorialView = lazy(() => import('../../views/allEditorialReport/view'))

const AppRoutes = [
    {
        element: <EditorialList />,
        path: '/apps/all-editorial-list'
    },
    {
        element: <Navigate to='/apps/all-editorial-list/view/1' />,
        path: '/apps/all-editorial-list/view'
    },
    {
        element: <EditorialView />,
        path: '/apps/all-editorial-list/view/:id'
    }
]

export default AppRoutes
