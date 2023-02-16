// ** React Imports
import { useEffect /*, useState*/ } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
//import { getClub } from '../store'
import { getClub } from '../../clubList/store'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
import UserTabs from './Tabs'
import ClubInfoCard from './ClubInfoCard'

// ** Styles
import '@styles/react/apps/app-users.scss'
import { Title } from '../../../utility/Utils'

const ClubView = () => {
  // ** Store Vars
  const store = useSelector(state => state.clubList)
  console.log("Club view store=>", store.selectedClub);
  const dispatch = useDispatch()

  // ** Hooks
  const { id } = useParams()

  // ** Get suer on mount
  useEffect(() => {
    dispatch(getClub(id))
  }, [dispatch])

  // const [active, setActive] = useState('1')

  // const toggleTab = tab => {
  //   if (active !== tab) {
  //     setActive(tab)
  //   }
  // }


  return store.selectedClub !== null && store.selectedClub !== undefined ? (
    <div className='app-club-view'>
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <ClubInfoCard selectedClub={store.selectedClub} />
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
      <h4 className='alert-heading'>{<Title str='Club' />} { <Title str="notfound" />}</h4>
      <div className='alert-body'>
        {/* Club with id: {id} doesn't exist. Check list of all Clubs: <Link to='/apps/all-club-list'>All Clubs List</Link> */}
        {<Title str='ClubClubwithid' />}: {id} {<Title str='doesnot exist' />}. {<Title str='Check list of all' />} {<Title str="Club" />}: <Link to='/apps/all-club-list'>{<Title str='Check list of all' />} { <Title str='Club' />}</Link>
      </div>
    </Alert>
  )
}
export default ClubView
