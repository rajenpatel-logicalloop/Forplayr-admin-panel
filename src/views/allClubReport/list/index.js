// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather'

// ** Styles
import '@styles/react/apps/app-users.scss'

const ClubsList = () => {
  //console.log("allclubereport\list==>", localStorage.getItem('accessToken')) 
  return (
    <div className='app-class-list'>
      <Table />
    </div>
  )
}

export default ClubsList
