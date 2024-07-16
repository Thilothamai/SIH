let mongoose = require("mongoose");

let model = new mongoose.Schema({
  phno: Number,
  email: String,
  pass: String,
  others: {
    name: String,
    udid: String,
    district: String,
    pincode: String,
    state: String,
    geneder: String,
    income: String,
    empstatus: String,
    qualification: String,
    distype: String,
    gdemail : String,
    gdphno : String
  },
  answers: {
    q1 : String,
    q2 : String,
    q3 : String,
    q4 : String,
  },
  saved: Array,
  score : Array
});

module.exports = mongoose.model("users", model);
