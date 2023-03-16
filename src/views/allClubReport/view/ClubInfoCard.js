// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Card, CardBody, Badge } from 'reactstrap'

// ** Third Party Components
import { Check, Briefcase } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import { Title } from '../../../utility/Utils'
import S3BUCKET from '../../../configs/s3bucket'

const roleColors = {
  job_seeker: 'light-info',
  employer: 'light-danger',
  freelancer: 'light-warning',
  service: 'light-success',
  admin: 'light-primary'
}

const statusColors = {
  actived: 'light-success',
  pending: 'light-warning',
  inactive: 'light-secondary',
  banned: 'light-secondary',
  refused: 'light-secondary',
  approved: 'light-success'
}

const ClubInfoCard = ({ selectedClub }) => {

  // ** render user img
  const renderUserImg = () => {
    if (selectedClub !== null && `${S3BUCKET}${selectedClub?.shield}` !== null) {
      return (
        <img
          height='110'
          width='110'
          alt='user-avatar'
          src={`${S3BUCKET}${selectedClub?.shield}`}
          className='img-fluid rounded mt-3 mb-2'
        />
      )
    } else {
      return (
        <Avatar
          initials
          color={'light-primary'}
          className='rounded mt-3 mb-2'
          content={selectedClub?.firstName}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(48px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '110px',
            width: '110px'
          }}
        />
      )
    }
  }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className='club-avatar-section'>
            <div className='d-flex align-items-center flex-column'>
              {renderUserImg()}
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='club-info'>
                  <h4>{selectedClub?.businessName}</h4>
                  {/* {selectedClub !== null ? (
                    <Badge color={roleColors[selectedClub?.role?.name]} className='text-capitalize'>
                      {selectedClub?.role?.name}
                    </Badge>
                  ) : null} */}
                </div>
              </div>
            </div>
          </div>
          {/* <div className='d-flex justify-content-around my-2 pt-75'>
            <div className='d-flex align-items-start me-2'>
              <Badge color='light-primary' className='rounded p-75'>
                <Check className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>{Number(selectedUser?.companyEmail).toFixed(2)}</h4>
                <small>companyEmail : </small>
              </div>
            </div>
            <div className='d-flex align-items-start'>
              <Badge color='light-primary' className='rounded p-75'>
                <Briefcase className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>{selectedUser?.points}</h4>
                <small>Points Achieved</small>
              </div>
            </div>
          </div> */}
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>{<Title str='Details' />}</h4>
          <div className='info-container'>
            {selectedClub !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>{<Title str='Name'/>} : </span>
                  <span>{selectedClub?.businessName}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>{<Title str='Email' />} :</span>
                  <span>{selectedClub?.companyEmail}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>{<Title str='PhoneNo' />} : </span>
                  <span>{selectedClub?.companyPhoneNo}</span>
                  {/* <Badge 
                    className='text-capitalize' 
                    color={statusColors[selectedUser?.status === "active" ? 'active' : selectedUser?.status === "deactive" ? 'pending' : 'inactive']} 
                    pill>
                    {selectedUser?.status === "active" ? 'active' : selectedUser?.status === "deactive" ? 'inactive' : 'blocked'}
                  </Badge> */}
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>{<Title str='Address' />} : </span>
                  <span>{selectedClub?.address.slice(0, 10)}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>{<Title str='City' />} : </span>
                  <span>{selectedClub?.city}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>{<Title str='Province' />} : </span>
                  <span>{selectedClub?.province}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>{<Title str='Status' />}:</span>
                  <Badge 
                    className='text-capitalize' 
                    color={statusColors[selectedClub?.status === "approved" ? 'approved' : selectedClub?.status === "refused" ? 'refused' : 'inactive']} 
                    pill>
                    {<Title str={selectedClub?.status === "approved" ? 'approved' : selectedClub?.status === "refused" ? 'refused' : 'block'} />}
                  </Badge>
                </li>              
                </ul>
            ) : null}
          </div>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default ClubInfoCard
