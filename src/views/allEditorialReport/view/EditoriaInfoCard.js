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

const EditorialInfoCard = ({ selectedEditorial }) => {
  // ** render user img
  const renderEditorialImg = () => {
    if (
      selectedEditorial !== null &&
      `https://forplayr.s3.ap-south-1.amazonaws.com/${selectedEditorial?.logo}` !==
        null
    ) {
      return (
        <img
          height="110"
          width="110"
          alt="editorial-avatar"
          src={`https://forplayr.s3.ap-south-1.amazonaws.com/${selectedEditorial?.logo}`}
          className="img-fluid rounded mt-3 mb-2"
        />
      );
    } else {
      return (
        <Avatar
          initials
          color={"light-primary"}
          className="rounded mt-3 mb-2"
          content={selectedEditorial?.businessName}
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
          <div className="club-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderEditorialImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="club-info">
                  <h4>{selectedEditorial?.businessName}</h4>
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
          <h4 className="fw-bolder border-bottom pb-50 mb-1">Details</h4>
          <div className="info-container">
            {selectedEditorial !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">Editorial Name : </span>
                  <span>{selectedEditorial?.businessName}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Email:</span>
                  <span>{selectedEditorial?.companyEmail}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">PhoneNo : </span>
                  <span>{selectedEditorial?.companyPhoneNo}</span>
                  {/* <Badge 
                    className='text-capitalize' 
                    color={statusColors[selectedUser?.status === "active" ? 'active' : selectedUser?.status === "deactive" ? 'pending' : 'inactive']} 
                    pill>
                    {selectedUser?.status === "active" ? 'active' : selectedUser?.status === "deactive" ? 'inactive' : 'blocked'}
                  </Badge> */}
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Address : </span>
                  <span>{selectedEditorial?.address}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">City : </span>
                  <span>{selectedEditorial?.city}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Province : </span>
                  <span>{selectedEditorial?.province?.name}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Status : </span>
                  <Badge
                    className="text-capitalize"
                    color={
                      statusColors[
                        selectedEditorial?.status === "approved"
                          ? "approved"
                          : selectedEditorial?.status === "refused"
                          ? "refused"
                          : "inactive"
                      ]
                    }
                    pill
                  >
                    {selectedEditorial?.status === "approved"
                      ? "approved"
                      : selectedEditorial?.status === "refused"
                      ? "refused"
                      : "inactive"}
                  </Badge>
                </li>
                <li>
                <span className="fw-bolder me-25"> 
                    <Button onClick={(e) => {
                        console.log("On click button==>", selectedEditorial?._id) ;
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
                </li>
              </ul>
            ) : null}
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default EditorialInfoCard;
