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

const ReportsList = () => {
  return (
    <div className='app-report-list' >
      <Table/>
    </div>
  )
}

export default ReportsList
