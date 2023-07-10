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

import { FiLock } from 'react-icons/fi' // Importing FI Icons
import * as Yup from 'yup' // Importing Yup for validation
import { ThreeDots } from 'react-loader-spinner' // importing  Loader spinner
// =============

// Authentication and Redux
import { connect } from 'react-redux'
import { resetPassword } from '../Auth/actions/userActions'
import { useNavigate, useParams } from 'react-router-dom'

const PasswordReset = ({ resetPassword }) => {
  const navigate = useNavigate()
  const { userId, resetString } = useParams()

  return (
    <StyledContainerAuth>
      <StyledFormArea>
        <FormTitle>Reset Password</FormTitle>
        <Formik
          initialValues={{
            newPassword: '',
            confirmNewPassword: '',
            userId,
            resetString,
          }}
          validationSchema={Yup.object({
            newPassword: Yup.string()
              .min(8, 'Password is too short')
              .max(30, 'Password is too long')
              .required('Password is required'),
            confirmNewPassword: Yup.string()
              .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
              .required('Confirm New Password is required'),
          })}
          onSubmit={(values, { setSubmitting, setFieldError }) => {
           resetPassword(values, navigate, setFieldError, setSubmitting)
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextInput
                name='newPassword'
                type='password'
                label='New Password'
                placeholder='************'
                icon={
                  <StyledIcons>
                    <FiLock />
                  </StyledIcons>
                }
              />

              <TextInput
                name='confirmNewPassword'
                type='password'
                label='Confirm New Password'
                placeholder='************'
                icon={
                  <StyledIcons>
                    <FiLock />
                  </StyledIcons>
                }
              />
              <StyledFormBtnGroup>
                {!isSubmitting && (
                  <StyledFormButton type='submit'>Password Reset</StyledFormButton>
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

export default connect(null, { resetPassword })(PasswordReset)
