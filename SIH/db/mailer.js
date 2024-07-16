let nodemailer = require("nodemailer")

let transport = nodemailer.createTransport({
  service : "gmail",
  auth : {
    user : "devmadhujith@gmail.com",
    pass : "okjk gwdl prvm slnc"
  }
})

module.exports = transport