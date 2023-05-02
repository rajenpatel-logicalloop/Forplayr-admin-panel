// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Lock, Bookmark, Aperture } from 'react-feather'

// ** User Components
import Application from './Application'
import UserTimeline from './UserTimeline'
import CompanyDetails from './CompanyDetails'

const UserTabs = ({ active, toggleTab, selectedUser }) => {
  return (
    <Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <User className='font-medium-3 me-50' />
            <span className='fw-bold'>role</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <Aperture className='font-medium-3 me-50' />
            <span className='fw-bold'>skills</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
            <Bookmark className='font-medium-3 me-50' />
            <span className='fw-bold'>subRoles</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          {/* {selectedUser?.resume?.length !== 0 ? (
            selectedUser.resume.map((list, index) => {
              return (
                <span key={index}>
                  <UserTimeline resume={list} selectedUser={selectedUser} />
                </span>
              )
            })) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>No Resume Created</CardTitle>
                </CardHeader>
              </Card>
            </>
          )} */}
          {/* <UserProjectsList />
          <InvoiceList /> */}
        </TabPane>
        <TabPane tabId='2'>
          <CompanyDetails selectedUser={selectedUser} />
        </TabPane>
        <TabPane tabId='3'>
          <Application selectedUser={selectedUser} />
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
