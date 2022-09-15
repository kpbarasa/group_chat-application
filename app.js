const express = require("express");
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
const path = require("path");
const morgan = require('morgan');

const app= express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true , limit: '50mb'}));

var store = new MongoDBStore({
  uri: process.env.DATABASE,
  collection: 'chatSessions'
});

// Catch errors
store.on('error', function(error) {
  console.log(error);
});

app.use(require('express-session')({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  // Boilerplate options, see:
  // * https://www.npmjs.com/package/express-session#resave
  // * https://www.npmjs.com/package/express-session#saveuninitialized
  resave: true,
  saveUninitialized: true
}));

// Static folder 
app.use(express.static(path.join(__dirname, 'public')));


// Cross Resource Origin
app.use(require("cors")());

// Routes
// // Get images
app.use('/media/:id', (req, res) => {
  res.sendFile(path.join(__dirname+'/assets/images/'+req.params.id))
});

app.use("/user", require("./routes/user-account-access.route"));
app.use("/chatroom", require("./routes/chatroom"));

//Error handlers
const errorHandlers = require("./handlers/errorHandler");
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);

if (process.env.ENV === "DEVELOPMENT") {
    app.use(errorHandlers.developmentErrors);
    app.use(morgan('dev'));
  } else {
    app.use(errorHandlers.productionErrors);
  }

module.exports = app;