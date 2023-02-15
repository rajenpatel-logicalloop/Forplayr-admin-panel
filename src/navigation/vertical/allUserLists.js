import { User } from "react-feather"
//import { Club } from "../../assets/images/icons/Club.png"

import { convertLang, Title } from  '../../utility/Utils'

export default [
    {
        
        header: 'Detail', //<Title str="Detail"/> //'Detail'
        //header: <text>{{ $t("Detail") }}</text>
    },
    {
        id: 'allUserList',
        title: '  Utenti Liste',
        icon: <img style={{ height: '20px', width: '20px', borderRadius: '5px'}} src={require('@src/assets/images/icons/user.png').default} alt="brand logo" />, //<User size={20} />,
        navLink: '/apps/all-user-list'
    },
    {
        id: 'allClubList',
        title:  '  Societa sportive',
        icon: <img style={{ height: '20px', width: '20px', borderRadius: '5px'}} src={require('@src/assets/images/icons/Club.png').default} alt="brand logo" />, //<User size={20} />,
        navLink:'/apps/all-club-list'
    },
    {
        id: 'allEditorialList',
        title: '  Redazioni Liste',
        icon: <img style={{ height: '20px', width: '20px', borderRadius: '5px'}} src={require('@src/assets/images/icons/Editorial.png').default} alt="brand logo" />, //<User size={20} />,
        navLink: '/apps/all-editorial-list'
    }
]
