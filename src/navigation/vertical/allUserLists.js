import { User } from "react-feather"
//import { Club } from "../../assets/images/icons/Club.png"

export default [
    {
        header: 'Details'
    },
    {
        id: 'allUserList',
        title: '  All Users',
        icon: <img style={{ height: '20px', width: '20px', borderRadius: '5px'}} src={require('@src/assets/images/icons/user.png').default} alt="brand logo" />, //<User size={20} />,
        navLink: '/apps/all-user-list'
    },
    {
        id: 'allClubList',
        title:  '  Club Lists',
        icon: <img style={{ height: '20px', width: '20px', borderRadius: '5px'}} src={require('@src/assets/images/icons/Club.png').default} alt="brand logo" />, //<User size={20} />,
        navLink:'/apps/all-club-list'
    },
    {
        id: 'allEditorialList',
        title: '  Editorial Lists',
        icon: <img style={{ height: '20px', width: '20px', borderRadius: '5px'}} src={require('@src/assets/images/icons/Editorial.png').default} alt="brand logo" />, //<User size={20} />,
        navLink: '/apps/all-editorial-list'
    }
]
