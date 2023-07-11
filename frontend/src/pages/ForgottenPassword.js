import React from 'react'
import {

  FormTitle,
  StyledContainerAuth,
  StyledFormArea,
  StyledFormBtnGroup,
  StyledFormButton,
  StyledIcons,

} from '../components/Styles'

// Importing Formik
import { Formik, Form } from 'formik'
import { TextInput } from '../components/FormLibs' // Form Libraries
// =============

import { FiMail } from 'react-icons/fi' // Importing FI Icons
import * as Yup from 'yup' // Importing Yup for validation
import { ThreeDots } from 'react-loader-spinner' // importing  Loader spinner
// =============

// Authentication and Redux
import { connect } from 'react-redux'
import { ForgotPassword } from '../Auth/actions/userActions'
import { useNavigate, useParams } from 'react-router-dom'

const ForgottenPassword = ({ ForgotPassword }) => {
  const navigate = useNavigate()
  const { userEmail } = useParams()

  return (
    <StyledContainerAuth>
      <StyledFormArea>
        <FormTitle>Forgot Password</FormTitle>
        <Formik
          initialValues={{
            email: userEmail,
            redirectUrl: 'https://ekoenergy.vercel.app/passwordreset',
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Invalid email address')
              .required('Email is required'),
          })}
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            ForgotPassword(values, navigate, setFieldError, setSubmitting)
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextInput
                name='email'
                type='email'
                label='Enter your email Address'
                placeholder='Jondoe@gmail.com'
                icon={
                  <StyledIcons>
                    <FiMail />
                  </StyledIcons>
                }
              />

              <StyledFormBtnGroup>
                {!isSubmitting && (
                  <StyledFormButton type='submit'>Reset</StyledFormButton>
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
      </StyledFormArea>
    </StyledContainerAuth>
  )
}

export default connect(null, { ForgotPassword })(ForgottenPassword)
