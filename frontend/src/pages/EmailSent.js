import React from 'react'
import { useParams } from 'react-router-dom'
import { StyledButtonEmailVerify, StyledEmailVerifyHome, StyledEmailVerifySubtitle, StyledEmailVerifyTitle, StyledInnerEmailVerify } from '../components/Styles'


const EmailSent = () => {
  const { userEmail, reset } = useParams()

  return (
    <div>
      {reset && userEmail && (
        <StyledEmailVerifyHome>
          <StyledInnerEmailVerify>
            <StyledEmailVerifyTitle>Password Reset Link</StyledEmailVerifyTitle>
            <StyledEmailVerifySubtitle>
              A Password reset link has been sent to the email account{' '}
              <bold>{userEmail}</bold>.{' '}
            </StyledEmailVerifySubtitle>
            <StyledEmailVerifySubtitle>
              The link expires in the next 30 minutes.
            </StyledEmailVerifySubtitle>
          </StyledInnerEmailVerify>
        </StyledEmailVerifyHome>
      )}

      {!reset && userEmail && (
        <StyledEmailVerifyHome>
          <StyledInnerEmailVerify>
            <StyledEmailVerifyTitle>
              Email verification sent
            </StyledEmailVerifyTitle>
            <StyledEmailVerifySubtitle>
              A confirmation link has been sent to the email account kindly click on the link before you process{' '}
              <bold>{userEmail}</bold>.{' '}
            </StyledEmailVerifySubtitle>
            <StyledEmailVerifySubtitle>
              The link expires in the next 30 minutes. 
            </StyledEmailVerifySubtitle>
            <StyledButtonEmailVerify to={`/login/${userEmail}`}>
              Proceed
            </StyledButtonEmailVerify>
          </StyledInnerEmailVerify>
        </StyledEmailVerifyHome>
      )}

      {!reset && !userEmail && (
        <StyledEmailVerifyHome>
          <StyledInnerEmailVerify>
            <StyledEmailVerifyTitle>
             Password Reset was Successful
            </StyledEmailVerifyTitle>
            <StyledEmailVerifySubtitle>
                You may click proceed to go the login page
            </StyledEmailVerifySubtitle>
            <StyledButtonEmailVerify to={`/login`}>
              Login
            </StyledButtonEmailVerify>
          </StyledInnerEmailVerify>
        </StyledEmailVerifyHome>
      )}
    </div>
  )
}

export default EmailSent
