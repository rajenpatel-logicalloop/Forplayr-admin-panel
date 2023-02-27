// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Card, CardBody, Badge, Button } from "reactstrap";

// ** Third Party Components
import { Check, Briefcase } from "react-feather";

// ** Store & Actions
import { store } from "@store/store";
import { 
  getEditorial,  
  deleteEditorial,  
  permitEdiorial,  
  blockEditorial,  
  approvedEditorial,
} from "../store";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { Title } from "../../../utility/Utils";

const roleColors = {
  job_seeker: "light-info",
  employer: "light-danger",
  freelancer: "light-warning",
  service: "light-success",
  admin: "light-primary",
};

const statusColors = {
  active: "light-success",
  pending: "light-warning",
  inactive: "light-secondary",
  banned: "light-secondary",
};


const NotificationInfoCard = ({ selectedNotification }) => {
  // ** render user img
  const renderReportImg = () => {
    if (
      selectedReport !== null &&
      `https://forplayr.s3.ap-south-1.amazonaws.com/${selectedReport[0]?._id?.userData?.avatar}` !==
        null
    ) {
      return (
        <img
          height="110"
          width="110"
          alt="report-avatar"
          src={`https://forplayr.s3.ap-south-1.amazonaws.com/${selectedReport[0]?._id?.userData?.avatar}`}
          className="img-fluid rounded mt-3 mb-2"
        />
      );
    } else {
      return (
        <Avatar
          initials
          color={"light-primary"}
          className="rounded mt-3 mb-2"
          content={selectedNotification[0]?._id?.userData?.firstName} 
          contentStyles={{
            borderRadius: 0,
            fontSize: "calc(48px)",
            width: "100%",
            height: "100%",
          }}
          style={{
            height: "110px",
            width: "110px",
          }}
        />
      );
    }
  };
  return (
    <Fragment>
      <Card>
        <CardBody>
          
          <div className="report-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderReportImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="club-info">
                  {/* <h4>{selectedReport[0]?.userId?.firstName} {selectedReport[0]?.userId?.lastName}</h4> */}
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
          <h4 className="fw-bolder border-bottom pb-50 mb-1">{<Title str='Details'/>}</h4>
          <div className="info-container">
            {selectedReport[0] !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">{<Title str='Reportuser' />} : </span>
                  <span>{selectedNotification[0]?._id?.userData?.firstName} {selectedNotification[0]?._id?.userData?.lastName}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">{<Title str='ReportCount' />} : </span>
                  <span>{selectedNotification[0]?.userCount}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">{<Title str='Email' />} : </span>
                  <span>{selectedNotification[0]?._id?.userData?.email}</span>
                </li>

                {/* <li className="mb-75">
                  <span className="fw-bolder me-25">{<Title str='Reportreason'/>} : </span>
                  <span>{selectedReport[0]?.reportReason}</span>
                  <Badge 
                    className='text-capitalize' 
                    color={statusColors[selectedUser?.status === "active" ? 'active' : selectedUser?.status === "deactive" ? 'pending' : 'inactive']} 
                    pill>
                    {selectedUser?.status === "active" ? 'active' : selectedUser?.status === "deactive" ? 'inactive' : 'blocked'}
                  </Badge> 
                </li> */}
                {/* <li>
                <span className="fw-bolder me-25"> 
                    <Button onClick={(e) => {
                        console.log("On click button==>", selectedReport?._id) ;
                        e.preventDefault();
                        store.dispatch(
                          approvedEditorial({
                            id: selectedEditorial?._id,
                            status:
                              selectedEditorial.status === "refused" ? "approved" : "refused",
                          })
                        );
                      }}
                    >
                      {selectedEditorial?.status === "approved"
                        ? "refused"
                        : selectedEditorial?.status === "refused"
                        ? "approved"
                        : "inactive"}
                    </Button>
                  </span>
                  <span>
                    <Button onClick={(e) => {
                        console.log("On Delete button click==>", selectedEditorial?._id) ;
                        e.preventDefault();
                        store.dispatch(
                          deleteEditorial(selectedEditorial?._id)
                        );
                      }}
                    >Delete</Button>
                  </span>                    
                </li> */}
              </ul>
            ) : null}
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default NotificationInfoCard;
