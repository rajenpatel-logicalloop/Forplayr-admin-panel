import { Fragment } from 'react'
import ApplicationPlan from './ApplicationPlan'

const Application = ({ selectedUser }) => {
  return (
    <Fragment>
      <ApplicationPlan selectedUser={selectedUser} />
    </Fragment>
  )
}

export default Application
