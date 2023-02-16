// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
import { getUser } from '../store'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
import UserTabs from './Tabs'
import UserInfoCard from './UserInfoCard'

// ** Styles
import '@styles/react/apps/app-users.scss'
import { Title } from '../../../utility/Utils'

const UserView = () => {
  // ** Store Vars
  const store = useSelector(state => state.userList)
  const dispatch = useDispatch()

  // ** Hooks
  const { id } = useParams()

  // ** Get suer on mount
  useEffect(() => {
    dispatch(getUser(id))
  }, [dispatch])

  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  return store.selectedUser !== null && store.selectedUser !== undefined ? (
    <div className='app-user-view'>
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard selectedUser={store.selectedUser} />
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
      <h4 className='alert-heading'>{<Title str='User' />} {<Title str='notfound' />}</h4>
      <div className='alert-body'>
        {<Title str='Userwithid' />}: {id} {<Title str='doesnotexist' />}. { <Title str='Check list of all' />} {<Title str='User'/>}: <Link to='/apps/user/list'>{<Title str='User' />} {<Title str='List' />}</Link>
      </div>
    </Alert>
  )
}
export default UserView
