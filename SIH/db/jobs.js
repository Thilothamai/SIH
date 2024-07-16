let mongoose = require("mongoose")

let model = new mongoose.Schema({
    Name : String,
    Qualification : String,
    vacancy : String,
    Link : String,
    AdvNo : String,
    Date : String,
    LastDate : String,
    Remuneration : String,
    Extras : String,
    HashValue : String,
    show : String
})

module.exports = mongoose.model("jobs",model)