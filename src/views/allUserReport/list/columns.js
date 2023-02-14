// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getUser, deleteUser, permitUser, blockUser } from '../store'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, CheckSquare, Slash } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

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

export const columns = [
  {
    name: 'utente',
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
          <small className='text-truncate text-muted mb-0'>{row?.emailAddress}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Ruolo', //Role
    sortable: false,
    minWidth: '172px',
    sortField: 'role',
    selector: (row) => row?.role,
    cell: (row) => renderRole(row)
  },
  {
    name: 'Entra con', //'Login With',
    minWidth: '138px',
    sortable: false,
    sortField: 'loginWith',
    selector: row => row?.loginWith,
    cell: row => <span className='text-capitalize'>{row?.loginWith}</span>
  },
  {
    name: 'Genere',   //'Gender',
    minWidth: '230px',
    sortable: false,
    sortField: 'gender',
    selector: row => row?.gender,
    cell: row => <span className='text-capitalize'>{row?.gender?.slice(0, 100)}</span>
  },
  {
    name:  'Autorizzazione',  //'Permission',
    minWidth: '138px',
    sortable: false,
    sortField: 'isPermited',
    selector: row => row?.isPermited,
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row?.status ? 'active' : 'inactive']} pill>
        {row?.status ? 'Allowed' : 'Not Allowed'}
      </Badge>
    )
  },
  {
    name: 'Stato', //'Status',
    minWidth: '138px',
    sortable: false,
    sortField: 'status',
    selector: row => row?.status,
    cell: row => (
      <Badge 
        className='text-capitalize' 
        color={statusObj[row?.status === "active" ? 'active' : row?.status === "deactive" ? 'inactive' : 'blocked']} 
        pill>
        {
          row?.status === "active" ? 'active' : row?.status === "deactive" ? 'inactive' : 'blocked'
        }
      </Badge>
    ) 
  },
  {
    name: 'Azioni',  //'Actions',
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
              to={`/apps/all-user-list/view/${row?._id}`}
              onClick={() => store.dispatch(getUser(row?._id))}
            >
              <FileText size={14} className='me-50' />
              {/* /<span className='align-middle'>Details</span> */}
              <span className='align-middle'>Dettagli</span>
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
              {/* <span className='align-middle'>Delete</span> */}
              <span className='align-middle'>Eliminare</span>
            </DropdownItem> 
            <DropdownItem
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(blockUser({
                  id: row._id,
                  status: row.status === "blocked" ? "active" : "blocked"
                }))
              }}
            >
              <Slash size={14} className='me-50' />
              <span className='align-middle'>{row.status === "blocked" ? "Unblock" : "Block"}</span>
            </DropdownItem> 
            {/*!row?.isPermited && */<DropdownItem
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(permitUser(row._id))
              }}
            >
              <CheckSquare size={14} className='me-50' />
              <span className='align-middle'>{row?.isPermited ? "Disallow" : "Allow"}</span>
            </DropdownItem>}
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
