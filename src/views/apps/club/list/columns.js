// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getClub, deleteClub } from '../store'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Renders Client Columns
const renderClient = row => {
  if (row.shield.length) {
    return <Avatar className='me-1' img={row.shield} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={row.avatarColor || 'light-primary'}
        content={row.businessName || 'Club'}
      />
    )
  }
}

// ** Renders Role Columns
const renderRole = row => {
  const roleObj = {
    subscriber: {
      class: 'text-primary',
      icon: User
    },
    maintainer: {
      class: 'text-success',
      icon: Database
    },
    editor: {
      class: 'text-info',
      icon: Edit2
    },
    author: {
      class: 'text-warning',
      icon: Settings
    },
    admin: {
      class: 'text-danger',
      icon: Slack
    }
  }

  const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit2

  return (
    <span className='text-truncate text-capitalize align-middle'>
      <Icon size={18} className={`${roleObj[row.role] ? roleObj[row.role].class : ''} me-50`} />
      {row.role}
    </span>
  )
}

const statusObj = {
  pending: 'light-warning',
  active: 'light-success',
  inactive: 'light-secondary',
  banned: 'light-secondary'
}

export const columns = [
  {
    name: 'Club',
    sortable: true,
    minWidth: '300px',
    sortField: 'businessName',
    selector: row => row.businessName,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/club/view/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getClub(row.id))}
          >
            <span className='fw-bolder'>{row.businessName}</span>
          </Link>
          <small className='text-truncate text-muted mb-0'>{row.companyEmail}</small>
        </div>
      </div>
    )
  },
  // {
  //   name: 'Role',
  //   sortable: true,
  //   minWidth: '172px',
  //   sortField: 'role',
  //   selector: row => row.role,
  //   cell: row => renderRole(row)
  // },
  {
    name: 'companyPhoneNo',
    minWidth: '138px',
    sortable: true,
    sortField: 'companyPhoneNo',
    selector: row => row.companyPhoneNo,
    cell: row => <span className='text-capitalize'>{row.companyPhoneNo}</span>
  },
  {
    name: 'City',
    minWidth: '230px',
    sortable: true,
    sortField: 'City',
    selector: row => row.city,
    cell: row => <span className='text-capitalize'>{row.city}</span>
  },
  {
    name: 'Province',
    sortable: false,
    minWidth: '172px',
    sortField: 'province',
    selector: (row) => row?.province?.name,
    cell: (row) => renderRole(row)
  },
  {
    name: 'Banned',
    minWidth: '138px',
    sortable: false,
    sortField: 'isPermited',
    selector: row => row?.isBanned,
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row?.isBanned ? 'banned' : 'active']} pill>
        {row?.isBanned ? 'Banned' : 'Active'}
      </Badge>
    )
  },
  {
    name: 'Status',
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
    name: 'Actions',
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
              to={`/apps/club/view/${row.id}`}
              onClick={() => store.dispatch(getclub(row.id))}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>Details</span>
            </DropdownItem>
            {/* <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Archive size={14} className='me-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem> */}
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(deleteClub(row.id))
              }}
            >
              <Trash2 size={14} className='me-50' />
              <span className='align-middle'>Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
