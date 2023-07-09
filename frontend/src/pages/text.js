import React from 'react'
import {
  ExtraText,
  FormTitle,
  StyledContainerAuth,
  StyledFormArea,
  StyledFormBtnGroup,
  StyledFormButton,
  StyledIcons,
  TextLink,
} from '../components/Styles'
import { Formik, Form } from 'formik'
import { TextInput } from '../components/FormLibs'
import { FiMail, FiLock } from 'react-icons/fi'
import * as Yup from 'yup'
import { ThreeDots } from 'react-loader-spinner'

const Signup = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    accountNumber: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  }

  const handleSubmit = (values) => {
    // Handle form submission
    console.log(values)
  }

  return (
    <StyledContainerAuth>
      <StyledFormArea>
        <FormTitle>Create Account</FormTitle>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            firstName: Yup.string().required('First Name is required'),
            lastName: Yup.string().required('Last Name is required'),
            address: Yup.string().required('Address is required'),
            accountNumber: Yup.string().required('Account Number is required'),
            phoneNumber: Yup.string().required('Phone Number is required'),
            email: Yup.string()
              .email('Invalid email address')
              .required('Email is required'),
            password: Yup.string()
              .min(8, 'Password is too short')
              .max(30, 'Password is too long')
              .required('Password is required'),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref('password'), null], 'Passwords must match')
              .required('Confirm Password is required'),
          })}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextInput
                name='firstName'
                type='text'
                label='First Name'
                placeholder='Jon'
                // icon={
                //   <StyledIcons>
                //     <FiMail />
                //   </StyledIcons>
                // }
              />
              <TextInput
                name='lastName'
                type='text'
                label='Last Name'
                placeholder='Doe'
                // icon={
                //   <StyledIcons>
                //     <FiMail />
                //   </StyledIcons>
                // }
              />
              <TextInput
                name='email'
                type='email'
                label='Email Address'
                placeholder='Jondoe@gmail.com'
                icon={
                  <StyledIcons>
                    <FiMail />
                  </StyledIcons>
                }
              />
              <TextInput
                name='address'
                type='text'
                label='Address'
                placeholder='32 Oakeye Eldorado'
                // icon={
                //   <StyledIcons>
                //     <FiMail />
                //   </StyledIcons>
                // }
              />
              <TextInput
                name='phoneNumber'
                type='text'
                label='Phone Number'
                placeholder='44 377 2882 33'
                // icon={
                //   <StyledIcons>
                //     <FiMail />
                //   </StyledIcons>
                // }
              />
              <TextInput
                name='accountNumber'
                type='text'
                label='Account Number'
                placeholder='2299929900'
                icon={
                  <StyledIcons>
                    <FiMail />
                  </StyledIcons>
                }
              />

              <TextInput
                name='password'
                type='password'
                label='Password'
                placeholder='************'
                icon={
                  <StyledIcons>
                    <FiLock />
                  </StyledIcons>
                }
              />
              <TextInput
                name='confirmPassword'
                type='password'
                label='Confirm Password'
                placeholder='************'
                icon={
                  <StyledIcons>
                    <FiLock />
                  </StyledIcons>
                }
              />

              <StyledFormBtnGroup>
                {!isSubmitting && (
                  <StyledFormButton type='submit'>Sign In</StyledFormButton>
                )}


                    {/* <StyledFormButton type='submit' disabled={isSubmitting}>
                  Login
                </StyledFormButton> */}


                {isSubmitting && (
                  <ThreeDots
                    type='ThreeDots'
                    color='#1A2C54'
                    height={50}
                    width={100}
                  />
                )}
              </StyledFormBtnGroup>
            </Form>
          )}
        </Formik>
        <ExtraText>
          Have an account? <TextLink to='/signup'>Sign In</TextLink>
        </ExtraText>
      </StyledFormArea>
    </StyledContainerAuth>
  )
}

export default Signup



import React from 'react'
import {
  StyledContainerHome,
  HomePageLoginForm,

} from '../components/Styles'
import '../components/Home.css'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <StyledContainerHome>
      <Container>
        <HomePageLoginForm>
          <form >
            <h2>Eko Login</h2>
            <div className='form-group'>
              <label htmlFor='email'>Email Address</label>
              <input
                type='email'
                placeholder='Enter your email'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                placeholder='Enter your password'
              />
            </div>
            <div className='forgot-password'>
              <Link to='/forgotpassword'>Forgot Password</Link>
            </div>
            <div className='form-actions'>
              <button type='submit'>Sign In</button>
              <button>
                <Link to='/signup'>Sign Up</Link>
              </button>
            </div>
          </form>
        </HomePageLoginForm>
      </Container>
    </StyledContainerHome>
  )
}

export default Home


// =========================

<Navbar expand='lg' className='navBG' variant='dark'>
      <Container>
        <Navbar.Brand>
          <Link to='/'>
            <img
              src={logo}
              height='40'
              className='d-inline-block align-top'
              alt='Logo'
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav className='m-auto'>
            <Form className='d-flex'>
              <Form.Control
                type='search'
                placeholder='Search'
                className='me-2 custom-search'
                aria-label='Search'
              />
            </Form>
          </Nav>
          <Nav style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link>
              <Link to='/faq' className='navlink'>
                FAQ
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to='/reporting' className='navlink'>
                Reporting
              </Link>
            </Nav.Link>
            {user && user.firstName ? (
              <NavDropdown
                title={`Hi, ${user.firstName}`}
                id='navbarScrollingDropdown'
              >
                <NavDropdown.Item>
                  <Link to='/profile' className='navlink'>
                    Profile
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to='/billing' className='navlink'>
                    Billing
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link className='navlink' onClick={handleLogout}>
                    Logout
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link>
                <Link to='/login' className='navlink'>
                  Sign in
                </Link>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
      

      // ==================

      import React from 'react'

import {
  ExtraText,
  FormTitle,
  StyledContainerAuth,
  StyledFormArea,
  StyledFormBtnGroup,
  StyledFormButton,
  StyledIcons,
  TextLink,
  HomePageLoginForm,
  StyledContainerHome,
} from '../components/Styles'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik'

import { TextInput } from '../components/FormLibs' // Form Libraries
// =============

import { FiMail, FiLock } from 'react-icons/fi' // Importing FI Icons
import * as Yup from 'yup'


import { connect } from 'react-redux'
import { LoginUser } from '../Auth/actions/userActions'
import { useNavigate } from 'react-router-dom'

const Home = ({LoginUser}) => {
 
 const navigate = useNavigate()

  return (
    <StyledContainerHome>
      <Container>
        <HomePageLoginForm>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
              password: Yup.string()
                .min(8, 'Password is too short')
                .max(30, 'Password is too long')
                .required('Password is r equired'),
            })}
            onSubmit={(values, { setSubmitting, setFieldError }) => {
              LoginUser(values, navigate, setFieldError, setSubmitting)
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <StyledFormArea>
                  <h2>Eko Login</h2>
                  <div className='form-group'>
                    <label htmlFor='email'>Email Address</label>
                    <input
                      type='email'
                      name='email'
                      placeholder='Enter your email'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                      type='password'
                      name='password'
                      placeholder='Enter your password'
                    />
                  </div>
                  <div className='forgot-password'>
                    <Link to='/forgotpassword'>Forgot Password</Link>
                  </div>
                  <div className='form-actions'>
                    <button type='submit'>Sign In</button>
                    <button>
                      <Link to='/signup'>Sign Up</Link>
                    </button>
                  </div>
                </StyledFormArea>
              </Form>
            )}
          </Formik>
        </HomePageLoginForm>
      </Container>
    </StyledContainerHome>
  )
}

export default connect(null, { LoginUser })(Home)
