const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: "Enter first name"
  },
  lastName: {
    type: String,
    trim: true,
    required: "Enter last name"
  },
  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company"
  },
  userCreated: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
