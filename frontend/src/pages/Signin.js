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

// Importing Formik
import { Formik, Form } from 'formik'
import { TextInput } from '../components/FormLibs' // Form Libraries
// =============

import { FiMail, FiLock } from 'react-icons/fi' // Importing FI Icons
import * as Yup from 'yup' // Importing Yup for validation
import {ThreeDots} from 'react-loader-spinner' // importing  Loader spinner 
// =============

// Authentication and Redux
import { connect } from 'react-redux'
import { LoginUser } from '../Auth/actions/userActions'
import { useNavigate, useParams } from 'react-router-dom'


const SignIn = ({ LoginUser }) => {

  const navigate = useNavigate()
  const { userEmail } = useParams()

  return (
    <StyledContainerAuth>
      <StyledFormArea>
        <FormTitle>Member Login</FormTitle>
        <Formik
          initialValues={{
            email: userEmail,
            password: '',
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Invalid email address')
              .required('Email is required'),
            password: Yup.string()
              .min(8, 'Password is too short')
              .max(30, 'Password is too long')
              .required('Password is required'),
          })}
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            LoginUser(values, navigate, setFieldError, setSubmitting)
          }}
        >
          {({ isSubmitting }) => (
            <Form>
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
              <StyledFormBtnGroup>
                {!isSubmitting && (
                  <StyledFormButton type='submit'>Sign In</StyledFormButton>
                )}
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
          <TextLink to='/forgottenpassword'>Forgot Password</TextLink>
        </ExtraText>
        <ExtraText>
          Create Account? <TextLink to='/signup'>Sign Up</TextLink>
        </ExtraText>
      </StyledFormArea>
    </StyledContainerAuth>
  )
}

export default connect(null, {LoginUser})(SignIn)