// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const CompanyBannerList = lazy(() => import('../../views/allCompanyBanner/list'))
const CompanyBannerView = lazy(() => import('../../views/allCompanyBanner/view'))

const AppRoutes = [
    {
        element: <CompanyBannerList/>,
        path: '/apps/all-companybanner-list'
    },
    {
        path: '/apps/all-companybanner-list/view',
        element: <Navigate to='/apps/all-companybanner-list/view/1' />
    },
    {
        element: <CompanyBannerView />,
        path: '/apps/all-companybanner-list/view/:id'
    },
]

export default AppRoutes