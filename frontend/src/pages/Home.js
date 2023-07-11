import React from 'react'

import {
  FormTitle,
  StyledButtonHome,
  StyledIcons,
  TextLink,
  HomePageLoginForm,
  StyledContainerHome,
  LoginFormHome,
  StyledPasswordHome,
  StyledPassHome,
} from '../components/Styles'
import { Container } from 'react-bootstrap'

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
                <LoginFormHome>
                  <FormTitle>EKO Login</FormTitle>
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
                  <StyledPasswordHome>
                    <StyledPassHome to='/forgottenpassword'>
                      Forgot Password
                    </StyledPassHome>
                  </StyledPasswordHome>

                  <div className='form-actions'>
                    <StyledButtonHome type='submit'>Sign In</StyledButtonHome>
                    <TextLink to='/signup'>Sign Up</TextLink>
                  </div>
                </LoginFormHome>
              </Form>
            )}
          </Formik>
        </HomePageLoginForm>
      </Container>
    </StyledContainerHome>
  )
}

export default connect(null, { LoginUser })(Home)
