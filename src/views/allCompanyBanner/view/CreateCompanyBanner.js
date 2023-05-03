/* Icon imports */
import { Type, User, Coffee, X  } from "react-feather";

// ** Reactstrap Imports
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Row,
    Col,
    Input,
    Form,
    Button,
    CardText,
    FormFeedback,
    Label,
  } from "reactstrap";

  // ** Third Party Components
import { useForm, Controller } from "react-hook-form";
// ** Custom Components
// import { addUser, getStationsList } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../../../configs/api";
import axios from "axios";
import { getCompanyBanner } from '../store'
import { React, Fragment, useState, useEffect } from "react";

// ** Custom Components
import toast from 'react-hot-toast'
import Avatar from '@components/avatar'

const defaultValues = {
    businessName:'',
    url:'',
    image:''
}

const ToastContent = ({ t, name, role }) => {
    return (
      <div className='d-flex'>
        <div className='me-1'>
          <Avatar size='sm' color='warning' icon={<Coffee size={12} />} />
        </div>
        <div className='d-flex flex-column'>
          <div className='d-flex justify-content-between'>
            <h6>{name}</h6>
            <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
          </div>
          <span>{role}</span>
        </div>
      </div>
    )
  }

  const CreateCompanyBanner = () => {

    const { id } = useParams()
    const flagValue = id === undefined ? "create" : "update";
  
    /* CSS Style for columns */
    const styles = {
      carduserinfo: {
        backgroundColor: "white",
      },
      cardBody: {},
      cardDiv: {},
      cardRow: {},
      cardCol: {
        backgroundColor: "#005EF8",
        borderRadius: 5,
        padding: 10.0,
      },
      cardLabel: {
        fontSize: "1.1rem",
        fontWeight: 2,
      },
    };
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState([]);
    const [imageKey, setImageKey] = useState();
    const {
      control,
      setValue,   
      setError,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({ defaultValues });
  
    useEffect(() => {
      if (id !== undefined) {
        dispatch(getCompanyBanner(id))
      }
    }, [dispatch])
  
    const store = useSelector((state) => state.companyBannerList)
    const companyBannerData = id !== undefined ? 
    useSelector(
      (state) => state.companyBannerList?.selectedCompanyBanner?.data
    ) : null;
  
    console.log("Station Data ==>", companyBannerData);
    useEffect(() => {
      setValue("businessName", companyBannerData?.businessName || "");
      setValue("image", companyBannerData?.image || "");
      setValue("url", companyBannerData?.url || "");
    }, [companyBannerData]);
  
    const handleFileChange = async (event) => {
      if (event.target.files) {
        // setImageFile(event.target.files[0]);
        try {
            const config = {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                  "Content-Type": "multipart/form-data"
                },
                /* Directory name for store image*/
                params: {
                  directory:"companysponsor"
                } 
              }
              const formdata = new FormData()
              formdata.append('image', event.target.files[0])
              const res = await axios.post(`${API}upload/image`, formdata, config)
              console.log("Data saved successfully", res)
              if (res.status === 201) {
                // navigate('/apps/all-companybanner-list/view')
                // console.log("Upload image data===>", res);
                setImageKey(res?.data?.data?.key)
              }
        } catch (error) {
            toast((t) => (
                <ToastContent
                  t={t}
                  name={`Sponsor aziendale`}
                  role={`${error.response.data.errors[0].detail}`}
                />
              ))               
        }
      }
    };
  
    const onSubmit = async(data) => {
        data.image = imageKey
        const tempData = { ...data }
        console.log("Temp Data ==>", tempData)
        if (Object.values(tempData).every(field => field !== null)) {
            /* Create CompanyBanner */
            try {
              const config = {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
              }
 
            const res = await axios.post(`${API}companybanner`, data, config)
              console.log("Data saved successfully", res)
              if (res.status === 201) {
                navigate('/apps/all-companybanner-list/view')
              }
            } catch (error) {
              console.log(error)
              toast((t) => (
                <ToastContent
                  t={t}
                  name={`Sponsor aziendale`}
                  role={`Dettagli dello sponsor non salvati`}
                />
              ))            
            }
  
          } else {
            for (const key in data) {
              if (data[key].length === 0) {
                setError(key, {
                  type: 'manual',
                  message: `Inserisci un valore valido ${key}`
                })
              }
              if (key === 'terms' && data.terms === false) {
                setError('terms', {
                  type: 'manual'
                })
              }
            }
          }
    }
  
    const onUpdate = async(data) => {
      const tempData = { ...data }
      console.log("new updated data ==>", data)
      if (Object.values(tempData).every(field => field !== null)) {
          /* Create Stattion */
          try {
            const config = {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                "Content-Type": "multipart/form-data"
              },
              /* Directory name for store image*/
              params: {
                directory:"companysponsor"
              } 
            }
          const uformdata = new FormData()
          uformdata.append('image', imageFile)
          uformdata.append('data', JSON.stringify(data))
          console.log("Formdata==>", uformdata.data);
  
          const res = await axios.patch(`${API}companybanner/update/${id}`, uformdata, config)
            console.log("Data updated successfully", res)
            if (res.status === 200) {
              navigate('/apps/all-companybanner-list/view')
            }
          } catch (error) {
            console.log(error)
          }
  
        } else {
          for (const key in data) {
            if (data[key].length === 0) {
              setError(key, {
                type: 'manual',
                message: `Inserisci un valore valido ${key}`
              })
            }
            if (key === 'terms' && data.terms === false) {
              setError('terms', {
                type: 'manual'
              })
            }
          }
        }
  }  
  
    return (
      <Card className="card-compnaybannerinfo">
        <CardHeader>
          <CardTitle tag="h4">Creare uno sponsor aziendale</CardTitle>
        </CardHeader>
        <CardBody>
          <div>
            <Form className="auth-station-form mt-2" encType="multipart/form">
              <Row className="match-height">
                {/* Station Name col  */}
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="companybanner-businessName">
                  Ragione Sociale
                  </Label>
                  <Controller
                    id="businessName"
                    name="businessName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        autoFocus
                        placeholder="Ragione Sociale"
                        invalid={errors.businessName && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.businessName ? (
                    <FormFeedback>{errors.businessName.message}</FormFeedback>
                  ) : null}
                </Col>
                {/* image col  */}
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="companybanner-image">
                    Immagine
                  </Label>
                  <Input
                    id="imageFile"
                    name="imageFile"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    autoFocus
                    placeholder="Selezione delle immagini"
                    // invalid={errors.imageFile && true}
                    // {...field}
                  />
                  {/* {errors.imageFile ? (
                                  <FormFeedback>{errors.imageFile.message}</FormFeedback>
                              ) : null} */}
                </Col>
                {/* Url column*/}
                <Col md="6" sm="12" className="mb-1">
                  <Label className="form-label" for="companybanner-url">
                    Url:
                  </Label>
                  <Controller
                    id="url"
                    name="url"
                    control={control}
                    render={({ field }) => (
                      <Input
                        autoFocus
                        placeholder="Url"
                        invalid={errors.url && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.url ? (
                    <FormFeedback>{errors.url.message}</FormFeedback>
                  ) : null}
                </Col>
                 {/* /* Blank Column*/ }
                 <Col md="6" sm="12" className="mb-1">               
                 </Col>
                <Col sm="3">
                  <div className="d-flex">
                  {flagValue === "create" ? (
                    <Button
                      className="me-1"
                      type="submit"
                      block
                      color="primary"
                      onClick={handleSubmit(onSubmit)}
                    >
                      Creare uno sponsor aziendale
                    </Button>
                     ) : (
                      <Button
                      className="me-1"
                      type="submit"
                      block
                      color="primary"
                      onClick={handleSubmit(onUpdate)}
                    >
                      Aggiorna lo sponsor dell'azienda
                    </Button>                    
                      )}
                    <Button
                      outline
                      color="secondary"
                      type="reset"
                      onClick={reset}
                    >
                      Ripristina
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
            {/* <CardText className='m-auto w-75'>
                          {allUserData}
                      </CardText>  */}
              
          </div>
        </CardBody>
      </Card>
    );
  };
  
  export default CreateCompanyBanner;
  