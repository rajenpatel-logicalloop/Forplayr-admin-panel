// ** React Imports
import { useEffect /*, useState*/ } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
//import { getClub } from '../store'
import { getReport, getUser } from '../store'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
import UserTabs from './Tabs'
import ReportInfoCard from './ReportInfoCard'

// ** Styles
import '@styles/react/apps/app-users.scss'
import { Title } from '../../../utility/Utils'

const ReportView = () => {
  // ** Store Vars
  const store = useSelector(state => state.reportPostList)
  // console.log("Report view store=>", store.selectedReport);
  const dispatch = useDispatch()

  // ** Hooks
  const { id } = useParams()

  // ** Get suer on mount
  useEffect(() => {
    dispatch(getReport(id))
  }, [dispatch])

  // const [active, setActive] = useState('1')

  // const toggleTab = tab => {
  //   if (active !== tab) {
  //     setActive(tab)
  //   }
  // }


  return store.selectedReport !== null && store.selectedReport !== undefined ? (
    <div className='app-report-view'>
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <ReportInfoCard selectedReport={store.selectedReport} />
        </Col>
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          {/* <UserTabs
            active={active}
            toggleTab={toggleTab}
            selectedUser={store.selectedUser}
          /> */}
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>{<Title str='Report' />} {<Title str='notfound' />}</h4>
      <div className='alert-body'>
        {<Title str='Reportwithid' />}: {id} {<Title str='doesnotexist' />}. {<Title str="Check list of all" />} {<Title str='Report' />}: <Link to='/apps/all-reportpost-list'>{<Title str='allrerportlist' />}</Link>
      </div>
    </Alert>
  )
}
export default ReportView
