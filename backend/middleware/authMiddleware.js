const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const authenticateUser = asyncHandler(async (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    res.status(401).json({ status: 'FAILED', message: 'Unauthorized' })
    return
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'your_secret_key')

    // Find the user based on the decoded token
    const user = await User.findById(decoded.userId)

    if (!user) {
      res.status(401).json({ status: 'FAILED', message: 'User not found' })
      return
    }

    // Attach the user object to the request
    req.user = user

    next()
  } catch (error) {
    res.status(401).json({ status: 'FAILED', message: 'Invalid token' })
  }
})

module.exports = authenticateUser
