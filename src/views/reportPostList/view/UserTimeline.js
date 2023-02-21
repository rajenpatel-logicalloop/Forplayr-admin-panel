import { Fragment } from 'react'
// ** Custom Components
import Avatar from '@components/avatar'
import Timeline from '@components/timeline'

// ** Images
import pdf from '@src/assets/images/icons/file-icons/pdf.png'
// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Button, UncontrolledCollapse, ListGroup, ListGroupItem } from 'reactstrap'
import { BookOpen, Home, X, Check, MapPin } from 'react-feather'
import moment from 'moment'


const UserTimeline = ({ resume, selectedUser }) => {
  // ** Timeline Data
  const data = [
    {
      title: `${resume?.title}`,
      content: `Hey my self ${selectedUser?.firstName} ${selectedUser?.lastName} from ${resume?.nationality}. I am ${resume?.type} at ${resume?.title}.`,
      meta: `${moment(resume?.createdAt).format('MMM-DD-YYYY')}`,
      customContent: (
        <div className='d-flex align-items-center'>
          <img className='me-1' src={pdf} alt='pdf' height='23' />
          <span>invoice.pdf</span>
        </div>
      )
    },
    {
      title: `Education ${resume?.education[0]?.degree}`,
      content: `${resume?.education[0]?.description}`,
      color: 'secondary',
      customContent: (
        <Fragment>
          <Button size='sm' color='primary' id='reportToggler1' outline>
            Show Report
          </Button>
          <UncontrolledCollapse toggler='#reportToggler1'>
            <ListGroup className='mt-1' flush >
              {resume?.education.map((list, index) => {
                return (
                  <ListGroupItem key={index} className='list-group-item'>
                    <div>
                      <p className='mb-50'><BookOpen size={17} /> {list?.degree} from <span className='fw-bold'>({list?.location})</span></p>
                      <p className='mb-50'><Home size={17} /> {list?.institute}</p>
                      <hr className='m-50' />
                      <div className='d-flex justify-content-between'>
                        <p className='timeline-event-time mb-0'>{list?.startDate}</p>
                        <p className='timeline-event-time mb-0'>{list?.endDate}</p>
                      </div>
                    </div>
                  </ListGroupItem>
                )
              })}
            </ListGroup>
          </UncontrolledCollapse>
        </Fragment>
      )
    },
    {
      title: 'Skills',
      content: `${selectedUser?.firstName} have total ${resume?.skills?.length} skills to display companies.`,
      meta: `${moment(resume?.createdAt).format('MMM-DD-YYYY')}`,
      color: 'success',
      customContent: (
        <Fragment>
          <Button size='sm' color='primary' id='reportToggler2' outline>
            Show Report
          </Button>
          <UncontrolledCollapse toggler='#reportToggler2'>
            <ListGroup className='mt-1' flush>
              {resume?.skills?.map((list, index) => {
                return (
                  <ListGroupItem key={index} className='list-group-item'>
                    <span>
                      {list?.skillName} : <span className='fw-bold'>{list?.totalExperienceInMonths} Year Exp</span>
                    </span>
                  </ListGroupItem>
                )
              })}
            </ListGroup>
          </UncontrolledCollapse>
        </Fragment>
      )
    },
    {
      title: 'Experience',
      content: `${selectedUser?.firstName} have total ${resume?.experience?.length} skills to display companies.`,
      meta: `${moment(resume?.createdAt).format('MMM-DD-YYYY')}`,
      color: 'warning',
      customContent: (
        <Fragment>
          {resume?.experience?.map((list, index) => {
            return (
              <>
                <div className='d-flex justify-content-between flex-wrap' key={index}>
                  <div className='d-flex align-items-center'>
                    <Avatar
                      initials
                      className='me-1'
                      color='light-primary'
                      content={list?.business_name}
                    />
                    <div>
                      <h6 className='mb-0'>{list?.business_name}</h6>
                      <span className='text-muted'>{list?.job_title}</span>
                    </div>
                  </div>
                  <div className='d-flex flex-wrap align-items-center cursor-pointer mt-sm-0 mt-50'>
                    {list?.isCurrentlyWorking ? (
                      <Check size={20} />
                    ) : (
                      <X size={20} />
                    )}
                  </div>
                </div>
                <hr />
                <div className='d-flex align-items-center'>
                  <MapPin size={15} />
                  <p className='mb-0 ms-50'>{list?.address || 'Not Added'}</p>
                </div>
              </>
            )
          })}
        </Fragment>
      )
    },
    {
      title: `${selectedUser?.firstName}'s achievements.`,
      content: `${selectedUser?.firstName} have achieve total ${resume?.achivements?.length} achievements to display companies.`,
      meta: `${moment(resume?.createdAt).format('MMM-DD-YYYY')}`,
      color: 'success',
      customContent: (
        <Fragment>
          <Button size='sm' color='primary' id='reportToggler3' outline>
            Show Report
          </Button>
          <UncontrolledCollapse toggler='#reportToggler3'>
            <ListGroup className='mt-1' flush>
              {resume?.achivements?.map((list, index) => {
                return (
                  <ListGroupItem className='list-group-item' key={index}>
                    <div>
                      <h6 className='mb-0'>{list?.title}</h6>
                      <span className='text-muted'>{list?.location}</span>
                      <p>{list?.description}</p>
                    </div>
                    <hr className='m-50' />
                    <div className='d-flex justify-content-between'>
                      <p className='timeline-event-time mb-0'>{list?.startDate}</p>
                      <p className='timeline-event-time mb-0'>{list?.endDate}</p>
                    </div>
                  </ListGroupItem>
                )
              })}
            </ListGroup>
          </UncontrolledCollapse>
        </Fragment>
      )
    }
  ]
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>User Resume</CardTitle>
      </CardHeader>
      <CardBody className='pt-1'>
        <Timeline data={data} className='ms-50' />
      </CardBody>
    </Card>
  )
}

export default UserTimeline
