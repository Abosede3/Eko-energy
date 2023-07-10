import axios from 'axios'
import { sessionService } from 'redux-react-session'

const localUrl = 'http://localhost:5000/'
const remoteUrl = 'h'
const currentUrl = localUrl

export const LoginUser = (
  credentials,
  navigate,
  setFieldError,
  setSubmitting
) => {
  
  return () => {

    axios.post(`${currentUrl}users/login`,
      credentials,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((response) => {
      const { data } = response;

      if (data.status === "FAILED") {
        const { message } = data;
        //  check for specific error
        if (message.includes('Credentials')) {
          setFieldError('email', message)
          setFieldError('password', message)
        } else if (message.includes('Password')) {
          setFieldError('password', message)
        } else if (message.toLowerCase().includes('email')) {
          setFieldError('email', message)
        }
      } else if (data.status === "Successful") {
        const userData = data.data[0]

        const token = userData._id;

        sessionService.saveSession(token).then(() => {
          sessionService.saveUser(userData).then(() => {
            navigate('/profile')

          }).catch(err => console.log(err))

        }).catch(err => console.log(err))
      }

      // complete submission
      setSubmitting(false)
     
    }).catch(err => console.log(err))
  }
}






// export const RegisterUser = (credentials, navigate, setFieldError, setSubmitting) => {}

export const RegisterUser =
  (credentials, navigate, setFieldError, setSubmitting) => {

    return (dispatch) => {
      axios
        .post(`${currentUrl}users/signup`, credentials, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          const { data } = response

          // Checking for error
          if (data.status === 'FAILED') {
            const { message } = data

            if (message.includes('First')) {
              setFieldError('firstName', message)
            } else if (message.includes('Last')) {
              setFieldError('lastName', message)
            } else if (message.includes('Email')) {
              setFieldError('email', message)
            } else if (message.includes('Address')) {
              setFieldError('address', message)
            } else if (message.includes('Phone')) {
              setFieldError('phoneNumber', message)
            } else if (message.includes('Account')) {
              setFieldError('accountNumber', message)
            } else if (message.includes('Password')) {
              setFieldError('password', message)
            } else if (message.includes('Confirm')) {
              setFieldError('confirmPassword', message)
            }
          } else if (data.status === 'PENDING') {
            const { email } = credentials
            navigate(`/emailsent/${email}`)
          }
          // completed submission
          setSubmitting(false)
        })
        .catch((err) => console.log(err))
    }
  }





export const LogoutUser = (navigate) => {
  return () => {
    sessionService.deleteSession()
    sessionService.deleteUser()
    navigate('/')
  }

}

