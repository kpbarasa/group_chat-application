var session = require('express-session')
const moment = require('moment');
const fs = require('fs');
const uuid = require("uuid");
// const user = mongoose.model("User");
const sha256 = require("js-sha256");
const jwt = require("jwt-then");
const userDataModel = require('../models/user.data.model')


// @desc    Register user 
// @route   POST /register
// @Model   /models/user.data.model 
exports.register = async (req, res, next) => {
  try {
    const { displayName, firstName, lastName, email, password, image } = req.body;

    const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;

    if (!emailRegex.test(email)) throw "Email is not supported from your domain.";
    if (password.length < 6) throw "Password must be atleast 6 characters long.";

    const userExists = await userDataModel.findOne({
      email,
      password: sha256(password + process.env.SALT),
    }).catch((err) => new Error(err));
    
    if (userExists) throw "User with same email already exits.";

    const splitted = image[0].split(';base64,');
    const format = splitted[0].split('/')[1];

    const fileName = 'img-profile-' + displayName + '-' + uuid.v4() + '.' + format;

    const userData = new userDataModel({
      displayName,
      firstName,
      lastName,
      email,
      password: sha256(password + process.env.SALT),
      image: fileName,
      googleId: 0
    });

    await userData.save();
    fs.writeFileSync('./assets/images/' + fileName, splitted[1], { encoding: 'base64' });
    console.log("saved");

    res.json({
      message: "User [" + firstName + "] registered successfully!",
    });

  } catch (error) {
     console.log(error);
    res.json({
      status: "fail",
      message: error
    });
  }
};

// @desc    Register user 
// @route   POST /register
// @Model   /models/user.data.model 
exports.updateUser = async (req, res) => {
  console.log("req.body");
  const { userName, firstName, lastName, email, password, image } = req.body;

  const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;

  // if (!emailRegex.test(email)) throw "Email is not supported from your domain.";
  // if (password.length < 8) throw "Password must be atleast 6 characters long.";
  // if (userName.length < 6 || userName.length > 16) throw "User Name must be atleast 6 characters long.";

  const userExists = await userDataModel.find({ _id: req.session.sessId })

  // if (userExists) throw "Sorry Unable to locate  user";

  const splitted = image[0].split(';base64,');
  const format = splitted[0].split('/')[1];

  const fileName = 'img-profile-' + userExists._id + '-' + uuid.v4() + '.' + format;

  userExists.map(async updateUser => {

    updateUser.displayName = userName
    updateUser.firstName = firstName
    updateUser.lastName = lastName
    updateUser.email = email
    updateUser.image = fileName
    updateUser.password = sha256(password + process.env.SALT),

    await updateUser.save()
      .catch(err => {
        if (err) throw err;
      })

    fs.writeFileSync('./assets/images/' + fileName, splitted[1], { encoding: 'base64' });

    console.log("saved");

  })

  res.json({
    message: "User account updated successfully!",
  });
};

// @desc    Log in  
// @route   POST /login
// @Model   /models/user.data.model 
exports.login = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    const userData = await userDataModel.findOne({
      email,
      password: sha256(password + process.env.SALT),
    });
    console.log(userData);
    if (!userData) throw new Error("throw Email and Password did not match.");

    const token = await jwt.sign({ id: userData.id }, process.env.SECRET);

    // Create session 
    today = new Date(),
      session = req.session,
      session.sessId = userData.id,
      session.userId = userData.id,
      session.token = token,
      session.sessionStart = moment().format(),
      session.sessionEnd = 00,
      console.log("Logged in");
      res.json({
        status: "success",
        message: "User logged in successfully!",
        userName: userData.displayName,
        token,
      });

  } catch (Err) {

    let errMsg = Err;

    res.json({
      code: 404,
      status: "fail",
      message: errMsg.toString()
    });

  }

};

// @desc    Log in google 
// @route   POST /:userId/:token
// @Model   /models/user.data.model 
exports.loginGoogle = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    const userData = await userDataModel.findOne({
      email,
      password: sha256(password + process.env.SALT),
    });

    if (!userData) throw new Error("throw Email and Password did not match.");

    const token = await jwt.sign({ id: userData.id }, process.env.SECRET);

    // Create session 
    today = new Date(),
      session = req.session,
      session.sessId = userData.id,
      session.userId = userData.id,
      session.token = token,
      session.sessionStart = moment().format(),
      session.sessionEnd = 00,

      res.json({
        message: "User logged in successfully!",
        token,
      });
    errMsg
  } catch (Err) {

    let errMsg = Err;

    res.json({
      code: 404,
      status: "fail",
      message: errMsg.toString()
    });

  }

};


// @desc    Log out user
// @route   POST /:userId/:token
exports.logout = async (req, res) => {

  try {

    // Clear session 
    today = new Date(),
      session = req.session,
      session.sessionEnd = moment().format(),
      session.destroy(function (err) {
        if (err) throw err;
      })

    res.json({
      status: "success",
      message: "Logged out successfully!"
    });

  } catch (error) {

    let errMsg = Err;

    res.json({
      code: 404,
      status: "fail",
      message: error,
      error: errMsg.toString()
    });

  }

};

// @desc    Get use data
// @route   GET /user
// @Model   /models/user.data.model 
exports.getUseData = async (req, res, next) => {
  try {
    console.log(req.session.sessId);
    const userData = await userDataModel.find({ _id: req.session.sessId })
    console.log(userData);

    // if(!userData) throw "Sorry unable to  load user data"; 

    res.json(userData);

  } catch (error) {

    res.json({
      status: "fail",
      message: error,
    });
  }
};

