// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getUser } from '../store'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Delete } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import moment from 'moment'

import { convertLang, Title } from '../../../utility/Utils'

// ** Renders Client Columns
const renderClient = (row) => {
  if (row?.avatar !== null) {
    return <Avatar className='me-1' img={`https://forplayr.s3.ap-south-1.amazonaws.com/${row?.avatar}`} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color='light-primary'
        content={row?.firstName}
      />
    )
  }
}

// ** Renders Role Columns
const renderRole = row => {
  const roleObj = {
    user: {
      class: 'text-primary',
      icon: User
    },
    employer: {
      class: 'text-success',
      icon: Database
    },
    freelancer: {
      class: 'text-info',
      icon: Edit2
    },
    service: {
      class: 'text-warning',
      icon: Settings
    },
    admin: {
      class: 'text-danger',
      icon: Slack
    }
  }

  const Icon = roleObj[row?.role[0]?.name] ? roleObj[row?.role[0]?.name]?.icon : Edit2

  return (
    <span className='text-truncate text-capitalize align-middle'>
      <Icon size={18} className={`${roleObj[row?.role[0]?.name] ? roleObj[row?.role[0]?.name]?.class : ''} me-50`} />
      {row?.role[0]?.name}
    </span>
  )
}

const statusObj = {
  pending: 'light-warning',
  active: 'light-success',
  inactive: 'light-secondary'
}

const age = row => {
  const dobyears = new Date(row?.dateOfBirth).getFullYear() //new Date().years;
   const todaydate = new Date()
   const birthage =  moment(todaydate).subtract(Number(dobyears), 'years').format('yy')
   const isMinor = birthage < 14 ? 'Minor' : 'Adult'
  return (
    <span className='text-truncate text-capitalize align-middle'>
      {isMinor}
    </span>

  )
}

export const columns = [
  {
    name: <Title str='User' />, //'User',
    sortable: false,
    minWidth: '250px',
    sortField: 'fullName',
    selector: row => row?.firstName,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/userList/view/${row?._id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getUser(row?._id))}
          >
            <span className='fw-bolder'>{row?.firstName} {row?.lastName}</span>
          </Link>
          <small className='text-truncate text-muted mb-0'>{row?.email}</small>
        </div>
      </div>
    )
  },
  {
    name: <Title str='Roles' />, //'Role',
    sortable: false,
    minWidth: '172px',
    sortField: 'role',
    selector: (row) => row?.role,
    cell: (row) => renderRole(row)
  },
  {
    name: <Title str='Login With' />, //'Login With',
    minWidth: '138px',
    sortable: false,
    sortField: 'loginWith',
    selector: row => row?.loginWith,
    cell: row => <span className='text-capitalize'>{row?.loginWith}</span>
  },
  {
    name: <Title str='Gender' />, //'Gender',
    minWidth: '230px',
    sortable: false,
    sortField: 'gender',
    selector: row => row?.gender,
    cell: row => <span className='text-capitalize'>{row?.gender?.slice(0, 100)}</span>
  },
  {
    name: <Title str='Minor' />, //'Minor',
    minWidth: '230px',
    sortable: false,
    sortField: 'gender',
    selector: row => row?.dateOfBirth,
    cell: row => age(row)
  },
  {
    name: <Title str='Status' />, //'Status',
    minWidth: '138px',
    sortable: false,
    sortField: 'status',
    selector: row => row?.status,
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row?.status === "active" ? 'active' : 'inactive']} pill>
        {row?.status === "active" ? 'active' : 'inactive'}
      </Badge>
    )
  },
  {
    name: <Title str='Actions' />, //'Actions',
    minWidth: '100px',
    cell: row => (
      <div className='column-action'>
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className='w-100'
              to={`/apps/userList/view/${row?._id}`}
              onClick={() => store.dispatch(getUser(row?._id))}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>{<Title str='Details' />}</span>
            </DropdownItem>
            {/* <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Archive size={14} className='me-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem> */}
            <DropdownItem
              // tag='a'
              // href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(deleteUser(row._id))
              }}
            >
              <Trash2 size={14} className='me-50' />
              <span className='align-middle'>{<Title str='Delete' />}</span>
            </DropdownItem> 
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
