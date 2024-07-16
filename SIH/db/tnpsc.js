let mongoose = require("mongoose")

let model = new mongoose.Schema({

  _id : String,
  notification_no : String,
  notification_date : String,
  post_name : String,
  app_start_date : String,
  app_end_date : String,
  payment_last_date : String,
  notification_link : String,
  exam_date : String,
  activity : String
})

module.exports = mongoose.model("tnpsc",model)