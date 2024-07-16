let mongoose = require("mongoose");

let model = new mongoose.Schema({
  phno: String,
  email: String,
  jobid : String,
  others: Object
});

module.exports = mongoose.model("jobregistrations", model);