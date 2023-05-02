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

const CompanyBannerInfoCard = ({ selectedCompanyBanner }) => {

  // ** render user img
  const renderUserImg = () => {
    if (selectedCompanyBanner !== null && `${S3BUCKET}${selectedCompanyBanner?.image}` !== null) {
      return (
        <img
          height='110'
          width='110'
          alt='user-avatar'
          src={`${S3BUCKET}${selectedCompanyBanner?.image}`}
          className='img-fluid rounded mt-3 mb-2'
        />
      )
    } else {
      return (
        <Avatar
          initials
          color={'light-primary'}
          className='rounded mt-3 mb-2'
          content={selectedCompanyBanner?.businessName}
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
                  <h4>{selectedCompanyBanner?.businessName}</h4>
                  {/* {selectedClub !== null ? (
                    <Badge color={roleColors[selectedClub?.role?.name]} className='text-capitalize'>
                      {selectedClub?.role?.name}
                    </Badge>
                  ) : null} */}
                </div>
              </div>
            </div>
          </div>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>{<Title str='Details' />}</h4>
          <div className='info-container'>
            {selectedCompanyBanner !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>{<Title str='Azienda sponsor'/>} : </span>
                  <span>{selectedCompanyBanner?.businessName}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>{<Title str='url' />} :</span>
                  <span>{selectedCompanyBanner?.url}</span>
                </li>
                </ul>
            ) : null}
          </div>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default CompanyBannerInfoCard
