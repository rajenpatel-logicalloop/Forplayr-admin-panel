import React, { Fragment } from 'react'
import { Badge, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'
// ** Custom Components
import Avatar from '@components/avatar'
import { Briefcase, Check } from 'react-feather'

const CompanyDetails = ({ selectedUser }) => {

    // ** render user img
    const renderUserImg = (list) => {
        if (list?.image !== null) {
            return (
                <img
                    height='110'
                    width='110'
                    alt='user-avatar'
                    src={list?.image}
                    className='img-fluid rounded mt-3 mb-2'
                />
            )
        } else {
            return (
                <Avatar
                    initials
                    color={'light-primary'}
                    className='rounded mt-3 mb-2'
                    content={list?.name}
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

    const statusColors = {
        active: 'light-success',
        pending: 'light-warning',
        inactive: 'light-secondary'
    }

    return (
        <>
            <Fragment>
                {selectedUser?.companies?.map((list, index) => {
                    return (
                        <>
                            <Card key={index}>
                                <CardBody>
                                    <div className='user-avatar-section'>
                                        <div className='d-flex align-items-center flex-column'>
                                            {renderUserImg(list)}
                                            <div className='d-flex flex-column align-items-center text-center'>
                                                <div className='user-info'>
                                                    <h4>{list?.name} <Badge>{list?.category?.name}</Badge></h4>
                                                    {selectedUser !== null ? (
                                                        <Badge color='light-info' className='text-capitalize'>
                                                            {selectedUser?.firstName}   {selectedUser?.lastName}
                                                        </Badge>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-around my-2 pt-75'>
                                        <div className='d-flex align-items-start me-2'>
                                            <Badge color='light-primary' className='rounded p-75'>
                                                <Check className='font-medium-2' />
                                            </Badge>
                                            <div className='ms-75'>
                                                <h4 className='mb-0'>1.23k</h4>
                                                <small>Total vacancies</small>
                                            </div>
                                        </div>
                                        <div className='d-flex align-items-start'>
                                            <Badge color='light-primary' className='rounded p-75'>
                                                <Briefcase className='font-medium-2' />
                                            </Badge>
                                            <div className='ms-75'>
                                                <h4 className='mb-0'>568</h4>
                                                <small>Applied vacancies</small>
                                            </div>
                                        </div>
                                    </div>
                                    <h4 className='fw-bolder border-bottom pb-50 mb-1'>Company Details</h4>
                                    <div className='info-container'>
                                        <Row>
                                            <Col xl='7' xs='12'>
                                                <Row tag='dl' className='mb-0'>
                                                    <Col tag='dt' sm='4' className='fw-bolder mb-1'>
                                                        Company Name:
                                                    </Col>
                                                    <Col tag='dd' sm='8' className='mb-1'>
                                                        {list?.name}
                                                    </Col>

                                                    <Col tag='dt' sm='4' className='fw-bolder mb-1'>
                                                        Company Owner:
                                                    </Col>
                                                    <Col tag='dd' sm='8' className='mb-1'>
                                                        {selectedUser?.firstName} {selectedUser?.lastName}
                                                    </Col>

                                                    <Col tag='dt' sm='4' className='fw-bolder mb-1'>
                                                        Website:
                                                    </Col>
                                                    <Col tag='dd' sm='8' className='mb-1'>
                                                        <Badge>{list?.website}</Badge>
                                                    </Col>

                                                    <Col tag='dt' sm='4' className='fw-bolder mb-1'>
                                                        Status:
                                                    </Col>
                                                    <Col tag='dd' sm='8' className='mb-1'>
                                                        <Badge className='text-capitalize' color={statusColors[selectedUser?.isVerified === true ? 'active' : 'inactive']}>
                                                            {selectedUser?.isVerified === true ? 'active' : 'inactive'}
                                                        </Badge>
                                                    </Col>

                                                    <Col tag='dt' sm='4' className='fw-bolder mb-1'>
                                                        Description:
                                                    </Col>
                                                    <Col tag='dd' sm='8' className='mb-1'>
                                                        {list?.description}
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xl='5' xs='12'>
                                                <Row tag='dl' className='mb-0'>
                                                    <Col tag='dt' sm='4' className='fw-bolder mb-1'>
                                                        Employes:
                                                    </Col>
                                                    <Col tag='dd' sm='8' className='mb-1'>
                                                        {list?.numberOfEmployees}
                                                    </Col>

                                                    <Col tag='dt' sm='4' className='fw-bolder mb-1'>
                                                        Identity No:
                                                    </Col>
                                                    <Col tag='dd' sm='8' className='mb-1'>
                                                        {list?.compIdentityNumber}
                                                    </Col>

                                                    <Col tag='dt' sm='4' className='fw-bolder mb-1'>
                                                        Address:
                                                    </Col>
                                                    <Col tag='dd' sm='8' className='mb-1'>
                                                        {list?.address || 'Not Added'}
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                </CardBody>
                            </Card>
                        </>
                    )
                })}
                {selectedUser?.companies?.length === 0 &&
                    <>
                        <Card>
                            <CardHeader>
                                <CardTitle>No Company Created</CardTitle>
                            </CardHeader>
                        </Card>
                    </>
                }
            </Fragment>
        </>
    )
}

export default CompanyDetails