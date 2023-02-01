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

const roleColors = {
  job_seeker: 'light-info',
  employer: 'light-danger',
  freelancer: 'light-warning',
  service: 'light-success',
  admin: 'light-primary'
}

const statusColors = {
  active: 'light-success',
  pending: 'light-warning',
  inactive: 'light-secondary'
}

const ClubInfoCard = ({ selectedClub }) => {

  // ** render user img
  const renderClubImg = () => {
    //console.log("selectedclub==>", selectedClub.data.shield)
    if (selectedClub !== null && `https://forplayr.s3.ap-south-1.amazonaws.com/${selectedClub?.data?.shield}` !== null) {
      return (
        <img
          height='110'
          width='110'
          alt='club-avatar'
          src={`https://forplayr.s3.ap-south-1.amazonaws.com/${selectedClub?.data?.shield}`}
          className='img-fluid rounded mt-3 mb-2'
        />
      )
    } else {
      return (
        <Avatar
          initials
          color={'light-primary'}
          className='rounded mt-3 mb-2'
          content={selectedClub?.data?.businessName}
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
              {renderClubImg()}
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='club-info'>
                  <h4>{selectedClub?.data?.businessName}</h4>
                  {/* {selectedClub !== null ? (
                    <Badge color={roleColors[selectedClub?.role[0]?.name]} className='text-capitalize'>
                      {selectedUser?.role[0]?.name}
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
                <h4 className='mb-0'>{Number(selectedUser?.profileStatus).toFixed(2)}</h4>
                <small>Profile Status</small>
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
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>Details</h4>
          <div className='info-container'>
            {selectedClub !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>ClubName : </span>
                  <span>{selectedClub?.data?.businessName}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>CompanyEmail : </span>
                  <span>{selectedClub?.data?.companyEmail}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>CompanyPhoneNo : </span>
                  <span>{selectedClub?.data?.companyPhoneNo}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Address:</span>
                  <span>{selectedClub?.data?.address}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>City:</span>
                  <span>{selectedClub?.data?.city}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Province:</span>
                  <span>{selectedClub?.data?.province}</span>
                </li>

                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Status: </span>
                  <Badge className='text-capitalize' color={statusColors[selectedClub?.data?.status === 'approved' ? 'approved' : 'rejcected']}>
                    {selectedClub?.data?.status === 'approved' ? 'approved' : 'rejected'}
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
