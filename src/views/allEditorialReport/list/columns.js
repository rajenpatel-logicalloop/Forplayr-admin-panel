// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getEditorial, deleteEditorial, permitEdiorial, blockEditorial, approvedEditorial } from '../store'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, CheckSquare, Slash } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Renders Client Columns
const renderClient = (row) => {
  if (row?.shield !== null) {
    return <Avatar className='me-1' img={`https://forplayr.s3.ap-south-1.amazonaws.com/${row?.shield}`} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color='light-primary'
        content={row?.businessName}
      />
    )
  }
}

const statusObj = {
  pending: 'light-warning',
  active: 'light-success',
  banned: 'light-secondary',
  inactive: 'light-secondary',
  approved: 'light-success',
  rejected:'light-secondary'
}

export const columns = [
  {
    name: 'Editorial',
    sortable: false,
    minWidth: '250px',
    sortField: 'businessName',
    selector: row => row?.businessName,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/view/${row?._id}`}
            className='business_name text-truncate text-body'
            onClick={() => store.dispatch(getEditorial(row?._id))}
          >
            <span className='fw-bolder'>{row?.businessName}</span>
          </Link>
          <small className='text-truncate text-muted mb-0'>{row?.companyEmail}</small>
        </div>
      </div>
    )
  },
  {
    name: 'CompanyPhoneNo',
    sortable: false,
    minWidth: '172px',
    sortField: 'companyPhoneNo',
    selector: (row) => row?.companyPhoneNo,
    cell: (row) => row?.companyPhoneNo //renderRole(row)
  },
  {
    name: 'City',
    sortable: false,
    minWidth: '172px',
    sortField: 'city',
    selector: (row) => row?.city,
    cell: (row) => row?.city
  },            
  {
    name: 'Province',
    sortable: false,
    minWidth: '172px',
    sortField: 'province',
    selector: (row) => row?.province?.name,
    cell: (row) => row?.province?.name
  },
  // {
  //   name: 'Banned',
  //   minWidth: '138px',
  //   sortable: false,
  //   sortField: 'isPermited',
  //   selector: row => row?.isBanned,
  //   cell: row => (
  //     <Badge className='text-capitalize' color={statusObj[row?.isBanned ? 'banned' : 'active']} pill>
  //       {row?.isBanned ? 'Banned' : 'Active'}
  //     </Badge>
  //   )
  // },
  {
    name: 'Status',
    minWidth: '138px',
    sortable: false,
    sortField: 'status',
    selector: row => row?.status,
    cell: row => (
      <Badge 
        className='text-capitalize' 
        color={statusObj[row?.status === "approved" ? 'approved' : row?.status === "refused" ? 'refused' : 'blocked']} 
        pill>
        {
          row?.status === "approved" ? 'approved' : row?.status === "refused" ? 'refused' : 'blocked'
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
              to={`/allClubReport/view/${row?._id}`}
              onClick={() => store.dispatch(getEditorial(row?._id))}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>Details</span>
            </DropdownItem>
            {/* <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Archive size={14} className='me-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem> */}

            <DropdownItem
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(approvedEditorial({
                  id: row._id,
                  status: row.status === "refused" ? "approved" : "refused"
                }))
              }}
            >
              <Slash size={14} className='me-50' />
              <span className='align-middle'>{row.status === "refused" ? "Approved" : "Refused"}</span>
            </DropdownItem> 

            <DropdownItem
              // tag='a'
              // href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(deleteEditorial(row._id))
              }}
            >
              <Trash2 size={14} className='me-50' />
              <span className='align-middle'>Delete</span>
            </DropdownItem> 
            {/* <DropdownItem
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(blockClub({
                  id: row._id,
                  status: row.status === "blocked" ? "active" : "blocked"
                }))
              }}
            >
              <Slash size={14} className='me-50' />
              <span className='align-middle'>{row.status === "blocked" ? "Unblock" : "Block"}</span>
            </DropdownItem>  */}

            {/*!row?.isPermited && */
            <DropdownItem
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(permitEdiorial(row._id))
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
