// ** React Imports
import { useEffect /*, useState*/ } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
//import { getClub } from '../store'
import { getEditorial } from '../store'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
import UserTabs from './Tabs'
import EditoriaInfoCard from './EditoriaInfoCard'

// ** Styles
import '@styles/react/apps/app-users.scss'

const EditorialView = () => {
  // ** Store Vars
  const store = useSelector(state => state.editorialList)
  console.log("Club view store=>", store.selectedEditorial);
  const dispatch = useDispatch()

  // ** Hooks
  const { id } = useParams()

  // ** Get suer on mount
  useEffect(() => {
    dispatch(getEditorial(id))
  }, [dispatch])

  // const [active, setActive] = useState('1')

  // const toggleTab = tab => {
  //   if (active !== tab) {
  //     setActive(tab)
  //   }
  // }


  return store.selectedEditorial !== null && store.selectedEditorial !== undefined ? (
    <div className='app-editorial-view'>
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <EditoriaInfoCard selectedEditorial={store.selectedEditorial} />
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
      <h4 className='alert-heading'>Editorial not found</h4>
      <div className='alert-body'>
        Editorial with id: {id} doesn't exist. Check list of all Editorials: <Link to='/apps/all-editorial-list'>All Editorials List</Link>
      </div>
    </Alert>
  )
}
export default EditorialView
