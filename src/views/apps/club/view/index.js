// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
import { getClub } from '../../clubList/store'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
import ClubTabs from './Tabs'
import PlanCard from './PlanCard'
import ClubInfoCard from './ClubInfoCard'

// ** Styles
import '@styles/react/apps/app-users.scss'

const ClubView = () => {
  // ** Store Vars
  const store = useSelector(state => state.clubs)
  const dispatch = useDispatch()

  // ** Hooks
  const { id } = useParams()

  // ** Get suer on mount
  useEffect(() => {
    dispatch(getClub(parseInt(id)))
  }, [dispatch])

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  return store.selectedClub !== null && store.selectedClub !== undefined ? (
    <div className='app-club-view'>
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <ClubInfoCard selectedClub={store.selectedClub} />
          <PlanCard />
        </Col>
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <ClubTabs active={active} toggleTab={toggleTab} />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>User not found</h4>
      <div className='alert-body'>
        Club with id: {id} doesn't exist. Check list of all Clubs: <Link to='/apps/club/list'>Clubs List</Link>
      </div>
    </Alert>
  )
}
export default ClubView
