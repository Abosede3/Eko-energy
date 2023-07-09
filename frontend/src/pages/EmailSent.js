import React from 'react'
import { useParams } from 'react-router-dom'
import { StyledButtonEmailVerify, StyledEmailVerifyHome, StyledEmailVerifySubtitle, StyledEmailVerifyTitle, StyledInnerEmailVerify } from '../components/Styles'


const EmailSent = () => {
  const { userEmail } = useParams()

  return (
    <StyledEmailVerifyHome>
      <StyledInnerEmailVerify>
        <StyledEmailVerifyTitle>Email verification sent</StyledEmailVerifyTitle>
        <StyledEmailVerifySubtitle>
          A confirmation link has been sent to the email account{' '}
          <bold>{userEmail}</bold>.{' '}
        </StyledEmailVerifySubtitle>
        <StyledEmailVerifySubtitle>
          The link expires in the next 30 minutes.
        </StyledEmailVerifySubtitle>
        <StyledButtonEmailVerify to={`/login/${userEmail}`}>Proceed</StyledButtonEmailVerify>
      </StyledInnerEmailVerify>
    </StyledEmailVerifyHome>
  )
}

export default EmailSent
