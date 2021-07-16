const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/dbFllo";
// session
var MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
store.on('error', function (error) {
  console.log(error);
});
const sessionOptions = {
  secret: process.env.SESSION_SECRET || 'This is a secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store
};
// mongoose
mongoose.connect(
  MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session(sessionOptions));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

// Add routes, both API and view
app.use(require("./routes/api.js"));

app.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
