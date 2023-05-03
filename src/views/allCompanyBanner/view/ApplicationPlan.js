import { Fragment } from 'react'
import {
  Row,
  Col,
  Card,
  Badge,
  Alert,
  CardBody,
  Progress,
  CardTitle,
  CardHeader
} from 'reactstrap'

const ApplicationPlan = ({ selectedUser }) => {

  return (
    <Fragment>
      {selectedUser?.resumeAppliedInCompanies?.length !== 0 ? (
        selectedUser?.resumeAppliedInCompanies?.map((list, index) => {
          return (
            <Card key={index}>
              <CardHeader>
                <CardTitle tag='h4'>{list?.vacancy?.title}</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md='6'>
                    <div className='mb-2 pb-50'>
                      <h5>
                        {selectedUser?.firstName} have current applied for <strong>{list?.vacancy?.title}</strong>
                      </h5>
                      <span>{list?.vacancy?.description.slice(0, 70)}...</span>
                    </div>
                    <div className='mb-2 pb-50'>
                      <h5>Skills</h5>
                      {list?.vacancy?.skills?.map((list2, index2) => {
                        return (
                          <Badge color='light-primary' className='ms-50' key={index2}>
                            {list2}
                          </Badge>
                        )
                      })}
                    </div>
                    <div className='mb-2 mb-md-1'>
                      <h5>
                        Package Details
                      </h5>
                      <span>Starting from </span>
                      <Badge color='light-primary'>
                        {list?.vacancy?.packageStart}
                      </Badge>
                      <span> / </span>
                      <Badge color='light-primary'>
                        {list?.vacancy?.packageEnd}
                      </Badge>
                    </div>
                  </Col>
                  <Col md='6'>
                    <Alert color='warning' className='mb-2'>
                      <h4 className='alert-heading'>Vacancy Type: {list?.vacancy?.type}</h4>
                      <div className='alert-body'>Vacancy Status: {list?.vacancy?.vacancyStatus}</div>
                    </Alert>
                    <div className='plan-statistics pt-1'>
                      <div className='d-flex justify-content-between'>
                        <h5 className='fw-bolder'>Vacancies</h5>
                        <h5 className='fw-bolder'>1 of {list?.vacancy?.numberOfVacancies}</h5>
                      </div>
                      <Progress className='mb-50' value={list?.vacancy?.numberOfVacancies} />
                      <p className='mt-50'>There are {list?.vacancy?.numberOfVacancies} vacancies remaining.</p>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          )
        })
      ) : (
        <Card>
          <CardHeader>
            <CardTitle tag='h4'>Not applied in any vacancies.</CardTitle>
          </CardHeader>
        </Card>
      )}
    </Fragment>
  )
}

export default ApplicationPlan
