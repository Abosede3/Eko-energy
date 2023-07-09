import React from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import {
  StyledLogoutBtn,
  StyledNavDropdown,
  StyledNavDropdownLink,
  StyledNavForm,
  StyledNavLink,
  StyledNavbar,
} from './Styles'

import './HeaderFooter.css'
import { connect } from 'react-redux'
import { LogoutUser } from '../Auth/actions/userActions'
import { useNavigate } from 'react-router-dom'

const Header = ({ LogoutUser, user }) => {
  const navigate = useNavigate()
  const title = user ? user.firstName : 'Account'

  return (
    <StyledNavbar expand='lg'>
      <Container>
        <Navbar.Brand>
          <Link to='/'>
            <img
              src={logo}
              alt='EKO ENERGY'
              srcset=''
              height='43'
              width='120px'
              className='d-inline-block align-top'
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <StyledNavForm className='d-flex'>
            <Form.Control
              type='search'
              placeholder='Search'
              className='me-2'
              aria-label='Search'
              width='300px'
            />
          </StyledNavForm>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link>
              <StyledNavLink to='/faq'>FAQ</StyledNavLink>
            </Nav.Link>
            <StyledNavDropdown
              title={title}
              id='navbarScrollingDropdown'
              color='#fff'
            >
              <NavDropdown.Item>
                <StyledNavDropdownLink to='/profile'>
                  Profile
                </StyledNavDropdownLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <StyledNavDropdownLink to='/billing'>
                  Billing
                </StyledNavDropdownLink>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <StyledLogoutBtn onClick={() => LogoutUser(navigate)}>
                  Logout
                </StyledLogoutBtn>
              </NavDropdown.Item>
            </StyledNavDropdown>
            <Nav.Link>
              <StyledNavLink to='/login'>Sign in</StyledNavLink>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  )
}

const mapStateToProps = ({ session }) => ({
  user: session.user,
})

export default connect(mapStateToProps, { LogoutUser })(Header)
