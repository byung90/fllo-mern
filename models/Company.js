const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Enter company name"
  },
  isBank: {
    type: Boolean,
    default: false
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  properties: [
    {
      type: Schema.Types.ObjectId,
      ref: "Property"
    }
  ],
  offers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Offer"
    }
  ]
});

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
