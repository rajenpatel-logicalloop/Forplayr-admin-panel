// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getCompanyBanner, deleteCompanyBanner } from '../../allCompanyBanner/store'
// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, CheckSquare, Slash } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { Title } from '../../../utility/Utils'
import S3BUCKET from '../../../configs/s3bucket'

// ** Renders Client Columns
const renderClient = (row) => {
  if (row?.shield !== null) {
    // return <Avatar className='me-1' img={`https://forplayr.s3.ap-south-1.amazonaws.com/${row?.shield}`} width='32' height='32' />
    return <Avatar className='me-1' img={`${S3BUCKET}${row?.image}`} width='32' height='32' />
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

/* Render link columns*/


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
        name: <Title str='Sponsor aziendale' />,  //'Club',
        sortable: false,
        minWidth: '250px',
        sortField: 'businessName',
        selector: row => row?.businessName,
        cell: row => (
          <div className='d-flex justify-content-left align-items-center'>
            {/* {renderClient(row)} */}
            <div className='d-flex flex-column'>
              {/* <Link
                to={`/apps/all-companybanner-list/view/${row?._id}`}
                className='club_name text-truncate text-body'
                onClick={() => store.dispatch(getCompanyBanner(row?._id))}
              > */}
                <span className='fw-bolder'>{row?.businessName}</span>
              {/* </Link> */}
              {/* <small className='text-truncate text-muted mb-0'>{row?.companyEmail}</small> */}
            </div>
          </div>
        )
      },  

      {
        name: <Title str='Url' />, //'CompanyPhoneNo',
        sortable: false,
        minWidth: '172px',
        sortField: 'url',
        selector: (row) => row?.url,
        cell: (row) => row?.url //renderRole(row)
      },
      // {
      //   name: <Title str='City' />, //'City',
      //   sortable: false,
      //   minWidth: '172px',
      //   sortField: 'city',
      //   selector: (row) => row?.city,
      //   cell: (row) => row?.city
      // },            
      // {
      //   name: <Title str='Province' />, //'Province',
      //   sortable: false,
      //   minWidth: '172px',
      //   sortField: 'province',
      //   selector: (row) => row?.province?.name,
      //   cell: (row) => row?.province?.name
      // },
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
      // {
      //   name: <Title str='Status' />, //'Status',
      //   minWidth: '138px',
      //   sortable: false,
      //   sortField: 'status',
      //   selector: row => row?.status,
      //   cell: row => (
      //     <Badge 
      //       className='text-capitalize' 
      //       color={statusObj[row?.status === "approved" ? 'approved' : row?.status === "refused" ? 'refused' : 'blocked']} 
      //       pill>
      //       {
      //         row?.status === "approved" ? 'approved' : row?.status === "refused" ? 'refused' : 'blocked'
      //       }
      //     </Badge>
      //   ) 
      // },      
      {
        name: <Title str='Actiions' />,  //'Actions',
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
                  to={`/apps/all-companybanner-list/view/${row?._id}`}
                  onClick={() => store.dispatch(getCompanyBanner(row?._id))}
                >
                  <FileText size={14} className='me-50' />
                  <span className='align-middle'>{<Title str='Details' />}</span>
                </DropdownItem>

                <DropdownItem
                  // tag='a'
                  // href='/'
                  className='w-100'
                  onClick={e => {
                    e.preventDefault()
                    store.dispatch(deleteCompanyBanner(row._id))
                  }}
                >
                  <Trash2 size={14} className='me-50' />
                  <span className='align-middle'>{ <Title str='Delete' />}</span>
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

                {/*!row?.isPermited && */}
                {/* <DropdownItem
                  className='w-100'
                  onClick={e => {
                    e.preventDefault()
                    store.dispatch(permitClub(row._id))
                  }}
                >
                  <CheckSquare size={14} className='me-50' />
                  <span className='align-middle'>{<Title str={row?.isPermited ? "Disallow" : "Allow"} />}</span>
                </DropdownItem> */}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        )
      }      
]