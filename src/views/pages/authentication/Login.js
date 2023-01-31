// ** React Imports
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Coffee, X } from 'react-feather'

// ** Actions
import { handleLogin } from '@store/authentication'

// ** Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Custom Components
import Avatar from '@components/avatar'
import InputPasswordToggle from '@components/input-password-toggle'

// ** Utils
import { getHomeRouteForLoggedInUser } from '@utils'

// ** Reactstrap Imports
import { Row, Col, Form, Input, Label, Button, CardText, CardTitle } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import axios from 'axios'
import API from '../../../configs/api'
import { getAllData } from '../../userList/store'

const ToastContent = ({ t, name, role }) => {
  return (
    <div className='d-flex'>
      <div className='me-1'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
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

const Login = () => {
  // ** Hooks
  const { skin } = useSkin()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ability = useContext(AbilityContext)
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  const onSubmit = async(data) => {
    console.log("data : ", data)
    dispatch(getAllData())
    try {
    if (Object.values(data).every(field => field.length > 0)) {
      const body = {
        login_with:'email',
        password: data.password,
        email: data.loginEmail
      }
      const url = `${API}auth/login`
      await axios
        .post(url, body)
        .then(async(response) => {
          
          if (response.status === 200) {
            //console.log("Accesstoken from logn==>", response.data.data.accessToken)            

            /* get user full detils for display name and role*/
            const config = {
              headers: { Authorization: `Bearer ${response.data.data.accessToken}` }
            }
            let firstName = ""
            let userRole = ""
            let avatar = ""
            const userUrl =  `${API}user/fetch/${response.data.data.userId}`
            await axios
            .get(userUrl, config)
            .then(async(res) => {
              if (res.status === 200) {
                //console.log("role Details==>", res.data.data.role)
                
                firstName = res.data.data.firstName
                userRole = res.data.data.role.name
                avatar = res.data.data.avatar           
              }
            })
            .catch((err) => {
              console.log("error here", err)
              toast((t) => (
                <ToastContent
                  t={t}
                  name={`User not found`}
                  role={`${err}`}
                />
              ))
            })

            // toast((t) => (
            //   <ToastContent
            //     t={t}
            //     name={`User data`}
            //     role={`${avatar}`}
            //   />
            // ))                          
            //const tavatar = ("https://forplayr.s3.ap-south-1.amazonaws.com/").concat(avatar)
            // toast((t) => (
            //   <ToastContent
            //     t={t}
            //     name={`User data`}
            //     role={`${tavatar}`}
            //   />
            // ))  
                        
            const userData = {
              avatar:  `https://forplayr.s3.ap-south-1.amazonaws.com/${avatar}`, // "/static/media/avatar-s-11.1d46cc62.jpg", //"https://forplayr.s3.ap-south-1.amazonaws.com/" &  avatar" 
              email: body.email,
              extras: { eCommerceCartItemsCount: 5 },
              fullName: firstName,
              username: firstName, //"Forplayr Admin",
              id: response.data.data.userId
            }

            const abilityValue = [{ action: "manage", subject: "all" }]
            const data = {
              ...userData,
              role: "admin",
              ability: abilityValue,
              accessToken: response.data.data.accessToken,
              refreshToken: response.data.data.refreshToken
            }

            
            dispatch(handleLogin(data))
            ability.update(abilityValue)
            navigate(getHomeRouteForLoggedInUser(data.role))
            toast((t) => (
              <ToastContent
                t={t}
                name={`Login Successfully`}
                role={`You have successfully logged in as an ${data.role || 'admin'} user to Forplayr. Now you can start to explore. Enjoy!`}
              />
            ))
          }
        })
        .catch((err) => {
          console.log("error here", err)
          toast((t) => (
            <ToastContent
              t={t}
              name={`Login Failed`}
              role={`${err.response.data}`} //
            />
          ))
        })
        .finally(() => {
        })
    }
  } catch {
      for (const key in data) {
        // if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        // }
      }
    }
  }

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()} style={{display:'flex', alignItems:'center'}}>
          <img style={{ height: '40px', width: '40px', borderRadius: '5px' }} src={require('@src/assets/images/logo/localskillsquare.png').default} alt="brand logo" />
          <h2 className='brand-text text-primary ms-1'>Forplayr</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Welcome to Forplayr! 👋
            </CardTitle>
            <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Controller
                  id='loginEmail'
                  name='loginEmail'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='email'
                      placeholder='john@example.com'
                      invalid={errors.loginEmail && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  <Link to='/forgot-password'>
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
                  )}
                />
              </div>
              <div className='form-check mb-1'>
                <Input type='checkbox' id='remember-me' />
                <Label className='form-check-label' for='remember-me'>
                  Remember Me
                </Label>
              </div>
              <Button type='submit' color='primary' block>
                Sign in
              </Button>
            </Form>
            {/* <p className='text-center mt-2'>
              <span className='me-25'>New on our platform?</span>
              <Link to='/register'>
                <span>Create an account</span>
              </Link>
            </p>
            <div className='divider my-2'>
              <div className='divider-text'>or</div>
            </div>
            <div className='auth-footer-btn d-flex justify-content-center'>
              <Button color='facebook'>
                <Facebook size={14} />
              </Button>
              <Button color='twitter'>
                <Twitter size={14} />
              </Button>
              <Button color='google'>
                <Mail size={14} />
              </Button>
              <Button className='me-0' color='github'>
                <GitHub size={14} />
              </Button>
            </div> */}
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
