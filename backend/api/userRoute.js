const express = require('express')
const router = express.Router()


const UserVerify = require('../models/UserVerify')
const User = require('../models/userModel') // 
const PasswordReset = require('../models/PasswordReset')




const bcrypt = require('bcrypt') // password hashing
const nodemailer = require('nodemailer') // mail handler 
const { v4: uuidv4 } = require('uuid') // unique string
require("dotenv").config()
const path = require('path')
const { error } = require('console')

// Node mailer configuration

let transporter = nodemailer.createTransport({
  // Specify your email configuration here (e.g., SMTP settings)
  service: process.env.SERVICE,
  host: process.env.HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.SECURE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

transporter.verify((error, success) => {
  if (error) {
    console.log(error)
  } else {
    console.log("Ready to send emails ")
    console.log(success)
  }
})

// User Registration
router.post('/signup', (req, res) => {
 //declaring the variables we want to receive
 let {
    firstName,
    lastName,
    email,
    address,
    phoneNumber,
    password,
    confirmPassword
 } = req.body

 // trimming for any white space
   firstName = firstName.trim()
   lastName = lastName.trim()
   email =  email.trim()
   address =  address.trim()
   phoneNumber =  phoneNumber.trim()
   password = password.trim()
   confirmPassword = confirmPassword.trim()
 
 // checking to see if any variable is empty
 if (firstName == "" || lastName == "" || email == "" || address == "" || phoneNumber == ""  || password == "" || confirmPassword == "") {
  
  // if any variable is empty
  res.json({
    status: 'FAILED',
    message: 'Empty input fields!'
  })
 }//if none of the variables are empty we check for the format of the each field (REGREX)
 else if (!/^[A-Za-z\s]{2,}$/.test(firstName)) {
  res.json({
    status: 'FAILED',
    message: 'Invalid First Name'
  })
 }
 else if (!/^[A-Za-z\s]{2,}$/.test(lastName)) {
  return res.json({
    status: 'FAILED',
    message: 'Invalid Last Name'
  })
 }
 else if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) {
  res.json({
    status: 'FAILED',
    message: 'Invalid Email address'
  })
 }
 else if (!/^[A-Za-z0-9\s,.#-]{2,}$/.test(address)) {
  res.json({
    status: 'FAILED',
    message: 'Invalid Address'
  })
 }
 else if (!/^\d{8,12}$/.test(phoneNumber)) {
  res.json({
    status: 'FAILED',
    message: 'Invalid Phone Number',
  })
 }
 else if (password.length < 8) {
  res.json({
    status: 'FAILED',
    message: 'Password should be at least 8 characters long!'
  })
 }
 
 else if (password !== confirmPassword) {
  res.json({
    status: 'FAILED',
    message: 'Password and Confirm Password do not match!'
  })
 }
 else {
  // Checking if User already exists
  User.find({ email }).then(result => {

    // checking if a user exist and returning an error
   if (result.length) {
    res.json({
      status: 'FAILED',
      message: 'User with the email already exists'
    })
   }// end of if for checking if user exists
   else {
    // try to create a new user in the database


    // password handling
    const saltRounds = 10
    bcrypt.hash(password, saltRounds).then(hashedPassword => {
     const newUser = new User({
       firstName,
       lastName,
       email,
       address,
       phoneNumber,
       password: hashedPassword,
       isVerified: false,
      //  confirmPassword,
      

     })
     console.log(password, hashedPassword)
     // after creating we save the User
     newUser.save().then(result => {
      console.log(result)
       sendVerificationEmail(result, res)
      
     })
      .catch(err => {
       console.log(err)
         res.json({
           status: 'FAILED',
           message: 'An error occurred while creating account'
         })
     })

    }) // bcrypt success else this error below
     .catch(err => {
        console.log(err);
         res.json({
           status: 'FAILED',
           message: 'An error occurred while hashing Password!'
         })
     })
    
} // end of else for creating the user

   
  }).catch(err => {
     console.log(err);
       res.json({
         status: 'FAILED',
         message: 'An error occurred while checking for existing user!',
       })

   
  })// end User.find promise

 }//end of else
 
})// user router ends


// Email verification 

const sendVerificationEmail = ({ _id, email, firstName }, res) => {
  
  const url = 'https://eko-energy.vercel.app/'
  const uniqueString = uuidv4() + _id;
  const appName = 'Eko Energy';
  const supportEmail = 'support@ekoenergy.com'
  // mailer options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification',
    html: `<p>Hello, ${firstName} </p>
            <p>Thank you for signing up with Eko Energy. To complete your registration, please click on the link below to verify your email address:</p><a href=${url + 'users/verify/' + _id + '/' + uniqueString}>Verify Email Address</a>
            <p>If you did not create an account on ${appName}, please ignore this email.</p>
            <p>By verifying your email address, you will be able to access all the features of our app and receive important notifications.</p>
            <p>If you have any questions or need further assistance, please don't hesitate to contact our support team at ${supportEmail} .</p><p>Best regards,<br>${appName} Team</p>`,
  } 

  const saltRounds = 10;
  bcrypt
    .hash(uniqueString, saltRounds)
    .then((hashedUniqueString) => {
      // set values for verification
      const newUserVerify = new UserVerify({
        userId: _id,
        uniqueString: hashedUniqueString,
        createdAt: Date.now(),
        expiresAt: Date.now() + 1800000,
      })

      newUserVerify
        .save()
        .then(() => {
          transporter
            .sendMail(mailOptions)
            .then(() => {
              // Verification send and save
              res.json({
                status: 'PENDING',
                message: 'Verification Email Sent Successfully',
              })
            })
            .catch((error) => {
              console.log(error)
              res.json({
                status: 'FAILED',
                message: "Couldn't send email verification ",
              })
            })
        })
        .catch(error => {
          console.log(error)
          res.json({
            status: 'FAILED',
            message: "Couldn't save verification details",
          })
         })
    })
    .catch(() => {
      res.json({
        status: 'FAILED',
        message: 'Error ocurred while hashing email data',
      })
    })

}

// Route to email verification link

router.get('/verify/:userId/:uniqueString', (req, res) => {
  let { userId, uniqueString } = req.params
  UserVerify
    .find({ userId })
    .then((result) => {
      if (result.length > 0) {
        
        // checking if it has expire
        const { expiresAt } = result[0]
        const hashedUniqueString = result[0].uniqueString
        if (expiresAt < Date.now()) {
          
          UserVerify
            .deleteOne()
            .then((result) => {
              User 
                .deleteOne({_id: userId})
                .then((result) => {
                   let message = 'User verification has expire, kindly sign up again '
                    res.redirect(`/users/verified/error=true&message=${message}`)
                })
                .catch(error => {
                  console.log(error)
                  let message =
                    'An error ocurred clearing users unique verification data '
                  res.redirect(`/users/verified/error=true&message=${message}`)
                })
            })
            .catch(error => {
              console.log(error)
              let message =
                'An error ocurred clearing users verification data'
              res.redirect(`/users/verified/error=true&message=${message}`)
            })
        } else {
          // valid verification
          bcrypt
             .compare(uniqueString, hashedUniqueString)
            .then((result) => {
              if (result) {
                
                User
                  .updateOne({ _id: userId }, {isVerified: true})
                  .then(() => {
                    UserVerify
                      .deleteOne()
                      .then(() => {
                        res.sendFile(
                          path.join(__dirname, './../views/verify.html')
                        )
                      })
                      .catch(error => {
                         let message =
                           ' An error occurred while finalizing user verification  '
                         res.redirect(
                           ` /users/verified/error=true&message=${message}`
                         )
                      })
                  })
                  .catch(error => {
                   let message =' Invalid verification details passed. check your inbox '
                   res.redirect(`/users/verified/error=true&message=${message}`
                   )
                })
              } else {
                 let message = ' Invalid verification details passed. check your inbox '
                 res.redirect(` /users/verified/error=true&message=${message}`)
              }
            })
            .catch(error => {
              let message = 'Record not found user has been verified'
              res.redirect(` /users/verified/error=true&message=${message}`)
            })
        } 
        
      } else {
        let message = 'Record not found user has been verified'
        res.redirect(` /users/verified/error=true&message=${message}`)
      }
    })
    .catch( error => {
      console.log(error)
      let message = "An error ocurred when checking for existing users verification data"
      res.redirect(`/users/verified/error=true&message=${message}`)
     })
})


 
router.get("/verified", (req, res) => {
  res.sendFile(path.join(__dirname, "./../views/verify.html"))
})



router.post('/login', (req, res) => {
  let { email, password } = req.body
 email = email.trim();
 password = password.trim();
 
  // checking if variables are empty
  if (email == '' || password == '') {
    res.json({
      status: 'FAILED',
      message: 'Empty input fields!',
    })
  } else {
   // checking if User exists
   User.find({ email })
    .then(data => {
      if (data.length) {
       
        if (!data[0].isVerified) {
          res.json({
            status: 'FAILED',
            message: 'Email is not verified, check your email for verification link ',
           
          })
        } else {

          const hashedPassword = data[0].password
          console.log(hashedPassword, password)
          bcrypt
            .compare(password, hashedPassword)
            .then((result) => {
              if (result) {
                // password matched
                console.log(result)
                res.json({
                  status: 'Successful',
                  message: 'Logged in successfully',
                  data: data,
                })
              } else {
                res.json({
                  status: 'FAILED',
                  message: 'Invalid Password entered! ',
                })
              }
            })
            .catch((err) => {
              res.json({
                status: 'FAILED',
                message:
                  'An error occurred while checking for comparing Password!',
              })
            })
          
        }

     } else {
      res.json({
        status: 'FAILED',
        message: 'Invalid Credentials!',
      })
     }
    
    })
    .catch(err => {
     console.log(err)
    res.json({
      status: 'FAILED',
      message: 'An error occurred while checking for existing user!',
    }) 
     
    })
   
  }//end of checking for existing users
 
 
 
 
}) // Login router ends


// Password Reset
router.post('/requestResetPassword', (req, res) => {
  const { email, redirectUrl } = req.body;

  User
    .find({ email })
    .then((data) => {
      if (data.length) {
        

        // check if user has been verified
           if (!data[0].isVerified) {
             res.json({
               status: 'FAILED',
               message: "Email hasn't been verified yet. proceed to verify  ",
             })
           } else {
             sendResetEmail(data[0], redirectUrl, res)
           }

      } else {  
        res.json({
          status: 'FAILED',
          message: 'User account was not found!',
        }) 
      }
    })
    .catch(err => {
      console.log(err)
      res.json({
        status: 'FAILED',
        message: 'An error occurred while checking for existing user!',
      }) 
    })
})

// Sent email function

const sendResetEmail = ({ _id, email , firstName}, redirectUrl, res) => {
  const resetString = uuidv4() + _id;
  const appName = 'Eko Energy'
  const supportEmail = 'support@ekoenergy.com'

  PasswordReset
    .deleteMany({userId: _id})
    .then((result) => {
      // Now we can sent the reset email

            const mailOptions = {
              from: process.env.EMAIL_USER,
              to: email,
              subject: 'Password Reset Request',
              html: `<p>Hello, ${firstName}</p>
                    <p>We have received a request to reset your password for Eko Energy. To proceed with the password reset, please click on the link below: </p>
                    <a href=${redirectUrl + '/' + _id + '/' + resetString}>Reset Password</a>
                    <p>If you did not request a password reset, please ignore this email. Your current password will remain unchanged.</p>
                    <p>Please note that the password reset link will expire after 30 minutes, so make sure to reset your password promptly.</p>
                    <p>If you have any questions or need further assistance, please don't hesitate to contact our support team at ${supportEmail}</p>
                    <p>Best regards,<br>${appName} Team</p>`,
            } 

      // hashing the resetSting
           const saltRounds = 10;
      bcrypt
        .hash(resetString,saltRounds  )
        .then((hashedResetString) => {
          const newPasswordReset = new PasswordReset({
            userId: _id,
            resetString:hashedResetString,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
          })
          newPasswordReset
            .save()
            .then(() => {
                transporter
                  .sendMail(mailOptions)
                  .then(() => {
                    // Password send and save
                    res.json({
                      status: 'PENDING',
                      message: 'Password Reset sent',
                    })
                  })
                  .catch((error) => {
                    console.log(error)
                    res.json({
                      status: 'FAILED',
                      message: "Password Reset Failed  ",
                    })
        })
              
            })
            .catch(error => {
              console.log(error)
              res.json({
                status: 'FAILED',
                message: 'An error occurred while saving resetString!',
              }) 
            })
        })
        .catch(error => {
          console.log(error)
          res.json({
            status: 'FAILED',
            message: 'An error occurred while hashing resetString!',
          }) 
        })


    })
    .catch(error => {
      console.log(error)
      res.json({
        status: 'FAILED',
        message: 'An error occurred while checking for existing user!',
      }) 
    })
}

// pASSWORD RESET

router.post('/resetPassword', (req, res) => {
  let { userId, resetString, newPassword } = req.body  
   
  // checking to see if resetString exist
  PasswordReset
    .find({ userId })
    .then(result => {
      if (result.length > 0) {
        
        // checking if password reset link expiring date
        const { expiresAt } = result[0]
        const hashedResetString = result[0].resetString;
          if (expiresAt < Date.now()) {
            PasswordReset
              .deleteOne({ userId })
              .then(() => {
                // Reset link has expired
                res.json({
                  status: 'FAILED',
                  message: 'Sorry Reset link has expired',
                })
              })
              .catch(error => {
                // Deletion Failed
                console.log(error)
                res.json({
                  status: 'FAILED',
                  message: 'Clearing reset Password failed',
                })
              })
          } else {
              // Valid reset record exist so we are validating the reset string
            
            bcrypt
              .compare(resetString, hashedResetString)
              .then((result) => {
                if (result) {
                    // Hashing the new password and storing in the database
                  const saltRounds = 10;
                  bcrypt
                    .hash(newPassword, saltRounds)
                    .then(hashedNewPassword => {
                      // Update user Password
                      User
                        .updateOne({_id: userId }, { password: hashedNewPassword })
                        .then(() => {
                          PasswordReset
                            .deleteOne({ userId })
                            .then(() => {
                              // both user record and reset record updated
                              res.json({
                                status: 'Successful',
                                message: 'Password reset successfully',
                              })
                            })
                            .catch(error => {
                              console.log(error)
                              res.json({
                                status: 'FAILED',
                                message: 'An error occurred while finalizing password rest',
                              })
                            })
                        })
                        .catch(error => {
                          console.log(error)
                          res.json({
                            status: 'FAILED',
                            message: 'Updating Failed',
                          })
                        })
                    })
                    .catch(error => {
                      console.log(error)
                        res.json({
                          status: 'FAILED',
                          message: 'An error occurred when hashing new password',
                        })
                    })
                } else {
                    res.json({
                      status: 'FAILED',
                      message: 'Invalid password reset details',
                    })
                }
              })
              .catch(error => {
                res.json({
                  status: 'FAILED',
                  message: 'Comparing password reset strings failed',
                })
              })
            }

      } else {
          res.json({
            status: 'FAILED',
            message: "Password reset request not found",
          })
      } 
    })
    .catch(error => {
        console.log(error)
        res.json({
          status: 'FAILED',
          message: "Checking for existing password record failed "
        })
    })
})








// Exporting router
module.exports = router
