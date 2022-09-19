const passport = require('passport');
require('../config/passport')(passport)
const router = require('express').Router()

// MIDDLEWARE ====================================================================================================
const auth = require("../middlewares/auth-session");

// CONTOLLERS ====================================================================================================
const userAuthAccessController = require('../controllers-users/user-account-access.controller')
const userAccountRecovery = require('../controllers-users/user-account-recovery.controller')


// @Desc         Register user 
// @controller   /controllers/user-auth-access.controller: {POST register}
// @route        /user/get/data
router.post('/register', (userAuthAccessController.register))

// @Desc         Update user 
// @controller   /controllers/user-auth-access.controller: {POST update}
// @route        /user/update
router.post('/update', (userAuthAccessController.updateUser))

// @Desc         Log in user  
// @controller   /controllers/user-auth-access.controller: {POST login}
// @route        /user/login
router.post('/login', (userAuthAccessController.login)) //Log in user normal

// Log out user  
// @controller   /controllers/user-auth-access.controller: {POST logout}
// @route        /user/logout
router.get('/logout', (userAuthAccessController.logout)) //Logout user google

// @desc         Auth with Google
// @route        GET /auth/google
// @route        /user/login
router.get('/login/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc         Google auth callback
// @route        GET /auth/google/callback
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => userAuthAccessController.loginGoogle)

// @desc         Get user data 
// @route        /user/get/data
router.get('/get/data', auth,(userAuthAccessController.getUseData))

// Send password recovery email link
router.post('/recover/password', (userAccountRecovery.sendRecoveryEmail_link))

// Recive and update new password 
router.post('/passwordReset/:userId/:token', (userAccountRecovery.updateRecoveredPassword)) 

module.exports = router