import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Background from '../assets/background.jpg'
import { Navbar, Form, NavDropdown } from 'react-bootstrap'
import '../index.css'

export const colors = {
  primary: '#fff',
  theme: '#DCE3F4',
  dark1: '#1A2C54',
  footer: '#8352A8',
  darkBlue: '#B45EBA',
  button: '#4D7B94',
  headersLinks: '#1A2C54',
  formBG: '#DCE3F4',
  Hover: '#2e0f38',
  red: '#f6c0c0',
  dark: '#000',
  textInput: '#e1b4f1',
  invalid: '#FF0000',
  navbar: '#2E0F38',
}

export const StyledNavbar = styled(Navbar)`
  background-color: ${colors.navbar};
  border-bottom: 2px solid ${colors.darkBlue};
`
export const StyledNavForm = styled(Form)`
  width: 250px;
  margin: auto;
  display: block;
  align-self: center;
`
export const StyledNavLink = styled(Link)`
  color: ${colors.primary};
  text-transform: uppercase;
  font-family: 'Open Sans', sans-serif;
  font-size: 13px;
  font-weight: 400;

  &:hover {
    color: ${colors.darkBlue};
    text-decoration: none;
    transition: ease-in-out 0.6s;
  }
`
export const StyledNavDropdown = styled(NavDropdown)`
  color: ${colors.primary};
  font-family: 'Open Sans', sans-serif;
`
export const StyledNavDropdownLink = styled(Link)`
  color: ${colors.navbar};
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 400;
  text-decoration: none;

  &:hover {
    text-decoration: none;
    background-color: ${colors.theme};
  }
`

export const StyledContainerHome = styled.div`
  margin: 0;
  min-height: 83vh;
  display: flex;
  justify-content: right;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${Background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`

export const StyledContainerAuth = styled.div`
  margin: 0;
  min-height: 83vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.theme};

  @media (max-width: 980px) {
    padding:20px;
  }
`

export const LoginRegisterMain = styled.div`
  min-height: 83vh;
  display: flex;
  background-color: #dce3f4;
  margin: auto;
`
export const HomePageLoginForm = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  height: 500px;
`
export const LoginFormHome = styled.div`
  padding: 2rem;
  border: 2px solid #4c1162;
  border-radius: 20px;
  background-color: #ffffff;
  text-align: center;
`
/* Form styling */

export const StyledButtonHome = styled(Link)`
  padding: 5px;
  min-width: 100px;
  outline: none;
  background-color: transparent;
  text-align: center;
  text-decoration: none;
  transition: ease-in-out 0.4s;
  border-radius: 25px;
  color: ${colors.darkBlue};
  font-size: 16px;
  border: 3px solid ${colors.darkBlue};

  &:hover {
    background-color: ${colors.darkBlue};
    color: ${colors.primary};
    cursor: pointer;
    border: none;
  }
`
export const StyledTextInputHome = styled.input`
  width: 320px;
  padding: 11px;
  padding-left: 60px;
  font-size: 17px;
  letter-spacing: 1px;
  color: ${colors.dark1};
  border: 2 solid ${colors.dark1};
  border-radius: 15px;
  display: block;
  margin: 2px auto 5px auto;
  transition: ease-in-out 0.4s;
  position: relative;

  ${(props) =>
    props.invalid &&
    `background-color: ${colors.red}; color: ${colors.primary}`};

  &:focus {
    background-color: ${colors.theme};
    border: 1px;
  }
`

export const StyledFieldDisplay = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  @media (max-width: 980px) {
    flex-direction: column;
    width: 100%;
    gap: 0;
  }
`

export const StyledPasswordHome = styled.div`
  text-align: right;
`

export const StyledPassHome = styled(Link)`
  text-decoration: none;
  color: ${colors.dark1};
  transition: ease-in-out 0.3s;
  font-weight: bold;

  &hover {
    text-decoration: underline;
    letter-spacing: 2px;
    font-weight: bold;
  }
`

// ============================================== HOME STYLE ENDS

export const StyledButton = styled(Link)`
  padding: 20px 30px;
  background-color: ${colors.button};
  text-align: center;
  text-decoration: none;
  transition: ease-in-out 0.4s;
  border-radius: 10px;
  color: ${colors.primary};
`

/* Input field */

export const StyledTextInput = styled.input`
  width: 320px;
  padding: 11px;
  padding-left: 60px;
  font-size: 17px;
  letter-spacing: 1px;
  color: ${colors.dark1};
  border: 2 solid ${colors.dark1};
  border-radius: 15px;
  display: block;
  /* margin: 2px auto 5px auto; */
  transition: ease-in-out 0.4s;
  position: relative;

  ${(props) =>
    props.invalid &&
    `background-color: ${colors.red}; color: ${colors.primary}`};

  &:focus {
    background-color: ${colors.theme};
    border: 1px;
  }

  @media (max-width: 980px) {
    width: 100%;
    max-width: 320px;
  }
`

export const StyledLabel = styled.p`
  text-align: left;
  font-size: 15px;
  font-weight: bold;
  color: ${colors.dark1};
`

export const StyledFormArea = styled.div`
  background-color: ${(props) => props.bg || colors.primary};
  text-align: center;
  padding: 10px 45px;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  border-radius: 15px;
  margin: 10px;

  @media (max-width: 980px) {
    padding: 30px 60px;
  }
`

export const StyledFormButton = styled.button`
  padding: 10px;
  min-width: 200px;
  outline: none;
  background-color: transparent;
  text-align: center;
  text-decoration: none;
  transition: ease-in-out 0.4s;
  border-radius: 25px;
  color: ${colors.darkBlue};
  font-size: 16px;
  border: 3px solid ${colors.darkBlue};

  &:hover {
    background-color: ${colors.darkBlue};
    color: ${colors.primary};
    cursor: pointer;
    border: none;
  }
`

export const StyledFormBtnGroup = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  margin-top: 15px;
`

// TEXT H2

export const FormTitle = styled.h3`
  color: ${colors.dark1};
  text-align: center;
  font-size: 25px;
  letter-spacing: 2px;
  padding: 2px;
  font-weight: bold;

  @media (min-width: 768px) {
    font-size: 36px;
    padding: 4px;
  }
`

export const StyledIcons = styled.p`
  color: ${colors.darkBlue};
  position: absolute;
  font-size: 21px;
  top: 22px;

  ${(props) => props.right && `right: 15px; top: 42px`};
  ${(props) => !props.right && `left: 15px;`};
`

/* Error Handing */

export const ErrorMsg = styled.div`
  font-size: 12px;
  color: ${colors.invalid};
  margin-top: 3px;
  margin-bottom: 5px;
  text-align: left;
`

export const ExtraText = styled.p`
  font-size: ${(props) => props.size};
  text-align: center;
  color: ${(props) => (props.color ? props.color : colors.darkBlue)};
  padding: 2px;
  margin-top: 10px;
`

// Text Links

export const TextLink = styled(Link)`
  text-decoration: none;
  color: ${colors.dark1};
  transition: ease-in-out 0.3s;
  font-weight: bold;

  &hover {
    text-decoration: underline;
    letter-spacing: 2px;
    font-weight: bold;
  }
`
export const StyledLogoutBtn = styled.button`
border: none;
background-color: transparent;
text-transform: uppercase;
d

&:hover{
  color: ${colors.dark1}
}
`