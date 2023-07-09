// router.post('/signin', (req, res) => {
//  let { email, password } = req.body
//  email = email.trim()
//  password = password.trim()

//  if (email == "" || password == "") {
//   res.json({
//     status: 'FAILED',
//     message: 'Empty input fields!',
//   })
//  } else {
//   // checking if user exist
//   User.find({ email }).then(data => {
//    if (data.length) {
//     // user exist
//     const hashedPassword = data[0].password;
//     bcrypt.compare(password, hashedPassword).then(result => {
//      if (result) {
//       // Password Matched
//       res.json({
//        status: "Successful",
//        message: "Signed in Successfully",
//        data: data
//       })
//      } else {
//       res.json({
//         status: 'FAILED',
//         message: 'Invalid password entered!',
//       })
//      }
//     }).catch(err => {
//      res.json({
//        status: 'FAILED',
//        message: 'An error occurred while comparing passwords',
//      })
//     })
//    } else {
//     res.json({
//       status: 'FAILED',
//       message: 'Invalid Credentials entered',
//     })
//    }
//   }).catch(err => {
//    res.json({
//      status: 'FAILED',
//      message: 'An error occurred while checking for existing user',
//    })
//   })
//  }
// })


router.post('/signup', (req, res) => {
  let {
    firstName,
    lastName,
    email,
    address,
    phoneNumber,
    accountNumber,
    password,
    confirmPassword,
  } = req.body
  firstName = firstName.trim()
  lastName = lastName.trim()
  email = email.trim()
  address = address.trim()
  phoneNumber = phoneNumber.trim()
  accountNumber = accountNumber.trim()
  password = password.trim()
  confirmPassword = confirmPassword.trim()

  if (
    firstName == '' ||
    lastName == '' ||
    email == '' ||
    address == '' ||
    accountNumber == '' ||
    phoneNumber == '' ||
    password == '' ||
    confirmPassword == ''
  ) {
    res.json({
      status: 'FAILED',
      message: 'Empty input fields!',
    })
  } else if (!/^[A-Za-z\s]{2,}$/.test(firstName)) {
    res.json({
      status: 'FAILED',
      message: 'Invalid First Name',
    })
  } else if (!/^[A-Za-z\s]{2,}$/.test(lastName)) {
    res.json({
      status: 'FAILED',
      message: 'Invalid Last Name',
    })
  } else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) {
    res.json({
      status: 'FAILED',
      message: 'Invalid Email address',
    })
  } else if (!/^[A-Za-z0-9\s,.#-]{2,}$/.test(address)) {
    res.json({
      status: 'FAILED',
      message: 'Invalid Address',
    })
  } else if (!/^\d{8,12}$/.test(phoneNumber)) {
    res.json({
      status: 'FAILED',
      message: 'Invalid Phone Number',
    })
  } else if (!/^\d{8,12}$/.test(accountNumber)) {
    res.json({
      status: 'FAILED',
      message: 'Invalid Account Number',
    })
  } else if (!password.length > 7) {
    res.json({
      status: 'FAILED',
      message: 'Password should be at least 8 characters long!',
    })
  } else if (password !== confirmPassword) {
    res.json({
      status: 'FAILED',
      message: 'Password and confirm password do not match!',
    })
  } else {
    // Checking if user already exists
    User.find({ email })
      .then((result) => {
        if (result.length) {
          // A user already exists
          res.json({
            status: 'FAILED',
            message: 'User with the email already exists',
          })
        } else {
          // Creating a new User

          const saltRounds = 10
          bcrypt
            .hash(password, saltRounds)
            .then((hashedPassword) => {
              let newUser = new User({
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
                .catch((err) => {
                  res.json({
                    status: 'FAILED',
                    message: 'An error occurred while creating new user!',
                  })
                })
            })
            .catch((err) => {
              res.json({
                status: 'FAILED',
                message: 'An error occurred while hashing Password!',
              })
            })
        }
      })
      .catch((err) => {
        console.log(err)
        res.json({
          status: 'FAILED',
          message: 'An error occurred while checking for existing user!',
        })
      })
  }
})