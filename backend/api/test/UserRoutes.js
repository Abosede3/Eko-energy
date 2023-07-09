const express = require('express')
const router = express.Router()
const User = require('../../models/userModel')
const bcrypt = require('bcrypt')

// SignUp
router.post('/signup', (req, res) => {
  const {
    firstName,
    lastName,
    email,
    address,
    phoneNumber,
    accountNumber,
    password,
    confirmPassword,
  } = req.body

  if (
    !firstName ||
    !lastName ||
    !email ||
    !address ||
    !phoneNumber ||
    !accountNumber ||
    !password ||
    !confirmPassword
  ) {
    return res.json({
      status: 'FAILED',
      message: 'Empty input fields!',
    })
  }

  if (!/^[A-Za-z\s]{2,}$/.test(firstName)) {
    return res.json({
      status: 'FAILED',
      message: 'Invalid First Name',
    })
  }

  if (!/^[A-Za-z\s]{2,}$/.test(lastName)) {
    return res.json({
      status: 'FAILED',
      message: 'Invalid Last Name',
    })
  }

  if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) {
    return res.json({
      status: 'FAILED',
      message: 'Invalid Email address',
    })
  }

  if (!/^[A-Za-z0-9\s,.#-]{2,}$/.test(address)) {
    return res.json({
      status: 'FAILED',
      message: 'Invalid Address',
    })
  }

  if (!/^\d{8,12}$/.test(phoneNumber)) {
    return res.json({
      status: 'FAILED',
      message: 'Invalid Phone Number',
    })
  }

  if (!/^\d{8,12}$/.test(accountNumber)) {
    return res.json({
      status: 'FAILED',
      message: 'Invalid Account Number',
    })
  }

  if (password.length < 8) {
    return res.json({
      status: 'FAILED',
      message: 'Password should be at least 8 characters long!',
    })
  }

  if (password !== confirmPassword) {
    return res.json({
      status: 'FAILED',
      message: 'Password and confirm password do not match!',
    })
  }

  User.find({ email })
    .then((result) => {
      if (result.length) {
        return res.json({
          status: 'FAILED',
          message: 'User with the email already exists',
        })
      }

      bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
          const newUser = new User({
            firstName,
            lastName,
            email,
            address,
            phoneNumber,
            accountNumber,
            password: hashedPassword,
            confirmPassword,
          })

          newUser
            .save()
            .then((result) => {
              res.json({
                status: 'Successful',
                message: 'Account created successfully',
                data: result,
              })
            })
            .catch(() => {
              res.json({
                status: 'FAILED',
                message: 'An error occurred while creating new user!',
              })
            })
        })
        .catch(() => {
          res.json({
            status: 'FAILED',
            message: 'An error occurred while hashing Password!',
          })
        })
    })
    .catch(() => {
      res.json({
        status: 'FAILED',
        message: 'An error occurred while checking for existing user!',
      })
    })
})

// Sign in
router.post('/signin', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.json({
      status: 'FAILED',
      message: 'Empty input fields!',
    })
  }

  User.find({ email })
    .then((data) => {
      if (!data.length) {
        return res.json({
          status: 'FAILED',
          message: 'User not found',
        })
      }

      const hashedPassword = data[0].password

      bcrypt
        .compare(password, hashedPassword)
        .then((result) => {
          if (result) {
            return res.json({
              status: 'Successful',
              message: 'Signed in successfully',
              data,
            })
          } else {
            return res.json({
              status: 'FAILED',
              message: 'Invalid password entered!',
            })
          }
        })
        .catch(() => {
          res.json({
            status: 'FAILED',
            message: 'An error occurred while comparing passwords',
          })
        })
    })
    .catch(() => {
      res.json({
        status: 'FAILED',
        message: 'An error occurred while checking for existing user',
      })
    })
})



// Update Profile







module.exports = router
