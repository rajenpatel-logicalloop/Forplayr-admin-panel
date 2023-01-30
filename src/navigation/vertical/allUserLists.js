import { User } from "react-feather"

export default [
    {
        header: 'Detsils'
    },
    {
        id: 'allUserList',
        title: 'All Users',
        icon: <User size={20} />,
        navLink: '/apps/all-user-list'
    },
    {
        id: 'allClubList',
        title: 'Club Lists',
        icon: <User size={20} />,
        navLink:'/apps/all-club-list'
    }
]
