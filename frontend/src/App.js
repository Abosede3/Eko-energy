// import Header from "./components/Header";
// import Home from "./pages/Home";
// import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom'
// import Footer from "./components/Footer";
// import Signup from "./pages/Signup";
// import SignIn from "./pages/Signin";
// import Profile from "./pages/Profile";

// import AuthRoute from "./components/AuthRoute";
// import BasicRoutes from "./components/BasicRoutes";
// import { connect } from "react-redux";

// function App(checked) {
//   return (
//     <BrowserRouter>
//       <Header />
//       <>
//         {checked && (
//           <Routes>
//             <Route path='/' Component={Home} />     
//               <Route path='/login' Component={SignIn} />
//             <Route path='/signup' Component={Signup} />
//             <Route path='/profile' Component={Profile} />
//           </Routes>
//         )}
//       </>
//       <Footer />
//     </BrowserRouter>
//   )
// }

// const mapStateToProps = ({ session }) => ({
//    checked: session.checked
// })

// export default connect(mapStateToProps)(App);


import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

import Header from './components/Header'
import Home from './pages/Home'
import Footer from './components/Footer'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Profile from './pages/Profile'
import Billing from './pages/Billing'

const App = ({ authenticated }) => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/signup/*'
          element={
            <AuthRoute component={Signup} authenticated={authenticated} />
          }
        />
        <Route
          path='/login/*'
          element={
            <AuthRoute component={Signin} authenticated={authenticated} />
          }
        />
        <Route
          path='/profile/*'
          element={<PrivateRoute authenticated={authenticated} />}
        />
        <Route
          path='/billing/*'
          element={<PrivateRoute authenticated={authenticated} />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

const mapStateToProps = ({ session }) => ({
  authenticated: session.authenticated,
})

const AuthRoute = ({ component: Component, authenticated, ...rest }) => {
  return authenticated ? (
    <Navigate to='/profile' replace />
  ) : (
    <Component {...rest} />
  )
}

const PrivateRoute = ({ authenticated }) => {
  return authenticated ? <Profile /> : <Navigate to='/login' replace />
}

export default connect(mapStateToProps)(App)




