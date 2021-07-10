const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PropertySchema = new Schema({
  addressOne: {
    type: String,
    trim: true,
    required: "Enter address 1 field"
  },
  addressTwo: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true,
    required: "Enter city"
  },
  state: {
    type: String,
    trim: true,
    required: "Enter state"
  },
  zipcode: {
    type: Number,
    trim: true,
    required: "Enter zipcode"
  },
  propertyType: {
    type: String,
    trim: true,
    required: "Enter property type"
  },
  propertyClass: {
    type: String,
    trim: true,
    required: "Enter property class"
  },
  propertyReason: {
    type: String,
    trim: true,
    required: "Enter reason"
  },
  loanType: {
    type: String,
    trim: true,
    required: "Enter loan type"
  },
  ltv: {
    type: Number,
    trim: true,
    required: "Enter ltv"
  },
  expectedAmount: {
    type: Number,
    trim: true,
    required: "Enter expected amount"
  },
  image: {
    type: String,
    trim: true
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company"
  },
  offers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Offer"
    }
  ]
});

const Property = mongoose.model("Property", PropertySchema);

module.exports = Property;
