const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OfferSchema = new Schema({
  loanAmount: {
    type: Number,
    trim: true,
    required: "Enter address 1 field"
  },
  interestRate: {
    type: Number,
    trim: true,
    required: "Enter address 1 field"
  },
  ltv: {
    type: Number,
    trim: true,
    required: "Enter address 1 field"
  },
  term: {
    type: Number,
    trim: true,
    required: "Enter address 1 field"
  },
  amortization: {
    type: Number,
    trim: true,
    required: "Enter address 1 field"
  },
  status: {
    type: String,
    trim: true,
    default: "Pending"
  },
  bank: {
    type: Schema.Types.ObjectId,
    ref: "Company"
  },
  property: {
    type: Schema.Types.ObjectId,
    ref: "Property"
  }
});

const Offer = mongoose.model("Offer", OfferSchema);

module.exports = Offer;
