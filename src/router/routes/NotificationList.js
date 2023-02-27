import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const NotificationsList = lazy(() => import('../../views/notificationList/list'))
const NotificationView = lazy(() => import('../../views/notificationList/view'))

const AppRoutes = [
    {
        element: <NotificationsList />,
        path: '/apps/all-notification-list',
    },
    {
        element: <Navigate to='/all-notification-list/view/1' />,
        path: '/apps/all-notification-list/view'
    },
    {
        element: <NotificationView />,
        path: '/apps/all-notification-list/view/:id'
    }
]

export default AppRoutes