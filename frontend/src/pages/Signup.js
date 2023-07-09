import React from 'react'
import {
  ExtraText,
  FormTitle,
  StyledContainerAuth,
  StyledFieldDisplay,
  StyledFormArea,
  StyledFormBtnGroup,
  StyledFormButton,
  StyledIcons,
  TextLink,
} from '../components/Styles'
import { Formik, Form } from 'formik'
import { TextInput } from '../components/FormLibs'
import {
  FiMail,
  FiLock,
  FiUser,
  FiBook,
  FiPhoneIncoming,
  FiDollarSign,
  FiEye,
} from 'react-icons/fi'
import * as Yup from 'yup'
import { ThreeDots } from 'react-loader-spinner'

// Authentication and Redux
import { connect } from 'react-redux'
import { RegisterUser } from '../Auth/actions/userActions'
import { useNavigate } from 'react-router-dom'

const Signup = ({ RegisterUser }) => {
  const navigate = useNavigate()

  return (
    <StyledContainerAuth>
      <StyledFormArea>
        <FormTitle>Create Account</FormTitle>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            accountNumber: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
          }}
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
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            console.log(values)
            RegisterUser(values, navigate, setFieldError, setSubmitting)
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <StyledFieldDisplay >
                <TextInput
                  name='firstName'
                  type='text'
                  label='First Name'
                  placeholder='Jon'
                  icon={
                    <StyledIcons>
                      <FiUser />
                    </StyledIcons>
                  }
                />
                <TextInput
                  name='lastName'
                  type='text'
                  label='Last Name'
                  placeholder='Doe'
                  icon={
                    <StyledIcons>
                      <FiUser />
                    </StyledIcons>
                  }
                />
              </StyledFieldDisplay>
              <StyledFieldDisplay>
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
                  icon={
                    <StyledIcons>
                      <FiBook />
                    </StyledIcons>
                  }
                />
              </StyledFieldDisplay>
              <StyledFieldDisplay>
                <TextInput
                  name='accountNumber'
                  type='text'
                  label='Account Number'
                  placeholder='2299929900'
                  icon={
                    <StyledIcons>
                      <FiDollarSign />
                    </StyledIcons>
                  }
                />
                <TextInput
                  name='phoneNumber'
                  type='text'
                  label='Phone Number'
                  placeholder='44 377 2882 33'
                  icon={
                    <StyledIcons>
                      <FiPhoneIncoming />
                    </StyledIcons>
                  }
                />
              </StyledFieldDisplay>
              <StyledFieldDisplay>
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
              </StyledFieldDisplay>
              <StyledFormBtnGroup>
                {!isSubmitting && (
                  <StyledFormButton type='submit'>Sign Up</StyledFormButton>
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
          Have an account? <TextLink to='/login'>Sign In</TextLink>
        </ExtraText>
      </StyledFormArea>
    </StyledContainerAuth>
  )
}

export default connect(null, { RegisterUser })(Signup)
