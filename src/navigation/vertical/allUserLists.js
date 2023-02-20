import { User } from "react-feather"
//import { Club } from "../../assets/images/icons/Club.png"

import { convertLang, Title } from  '../../utility/Utils'

export default [
    {
        
        header: 'Dettagli', //<Title str="Detail"/> //'Detail'
        //header: <text>{{ $t("Detail") }}</text>
    },
    {
        id: 'allUserList',
        title:   'Utenti Liste', //<Title str='AllUserList' />, 
        icon: <img style={{ height: '20px', width: '20px', borderRadius: '5px'}} src={require('@src/assets/images/icons/user.png').default} alt="brand logo" />, //<User size={20} />,
        navLink: '/apps/all-user-list',
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
    },
    {
        id: 'allReportUserList',
        title: 'Elenchi di rapporti', //'  Utente segnalato',
        icon: <img style={{ height: '20px', width: '20px', borderRadius: '5px'}} src={require('@src/assets/images/icons/user.png').default} alt="brand logo" />, //<User size={20} />,
        //navLink: '/apps/all-reportuser-list',
        // badge: 'light-success',
        // // badgeText: 'New',        
        children:[
            {
                id: 'reportuserList',
                title: 'Utente segnalato',
                //icon: <Circle size={12} />,
                navLink: '/apps/all-reportuser-list'
            },
            {
                id: 'reportClubList',
                title: 'Societa sportive',
                //icon: <Circle size={12} />,
                navLink: '/cards/advance'
             }            
        ]
    }
]
