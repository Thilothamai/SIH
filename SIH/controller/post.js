let transport = require("../db/mailer.js");

let users = require("../db/users.js");

let jobDetails = require("../db/jobs.js");

let dailjobDetails = require("../db/dailjobs.js");

let email_validator = require("email-validator");

let disabilities = require("../db/disability.js");

let jobregistrations = require("../db/jobregistrations.js");

let shareemails = require("../db/shareemails.js");

let subscribes = require("../db/subscribes.js");

let tnpsc = require("../db/tnpsc.js");

let quizzes = require("../db/quiz.js");

exports.signup = (req, res) => {
  let email = email_validator.validate(req.body.email);
  let pass = String(req.body.pass);
  let phno = String(req.body.phno);
  let found = users.findOne({ email: req.body.email }).then((result) => {
    if (result) {
      res.json({
        value: false,
      });
    } else if (email && pass.length >= 8 && phno.length == 10) {
      let data = new users(req.body);
      data.save();
      res.json({
        value: true,
        data: {
          email: req.body.email,
          phno: req.body.phno,
          otp: "",
        },
        nextpage: "/home",
      });
    } else {
      res.json({
        value: false,
      });
    }
  });
};

exports.signin = (req, res) => {
  let data = req.body;
  let db = users.findOne({ email: data.email }).then((result) => {
    if (result) {
      if (result.pass == data.pass) {
        res.json({
          value: true,
          data: {
            email: req.body.email,
            phno: result.phno,
            otp: "",
          },
          nextpage: "/home",
        });
      } else {
        res.json({
          value: false,
        });
      }
    } else {
      res.json({
        value: false,
      });
    }
  });
};

exports.forget = (req, res) => {
  let data = req.body;
  users.findOne({ email: data.email }).then((result) => {
    if (result) {
      let option = {
        from: "devmadhujith@gmail.com",
        to: data.email,
        subject: "otp for login",
        text: String(Math.floor(Math.random() * 10000)),
      };
      transport.sendMail(option, (err) => {
        if (err) {
          console.log(err);
        }
      });
      res.json({
        value: true,
        verify: {
          otp: option.text,
        },
        nextpage: "/otp",
      });
    } else {
      res.json({
        value: false,
      });
    }
  });
};

exports.profile = (req, res) => {
  let data = req.body.details;
  if (
    data.name.length > 0 &&
    data.udid.length > 0 &&
    data.district.length > 0 &&
    data.pincode.length > 0
  ) {
    users
      .findOne({ email: req.body.email })
      .then((result) => {
        return users.updateOne(result, { $set: { others: data } });
      })
      .then(() => {
        res.json({
          value: true,
        });
      });
  } else {
    res.json({
      value: false,
    });
  }
};

exports.jobs = (req, res) => {
  jobDetails.find({ show: "1" }).then((result) => {
    res.json(result);
  });
};

exports.tnpscjobs = (req, res) => {
  tnpsc.find({}).then((result) => {
    res.json(result);
  });
};

exports.dailjobs = (req, res) => {
  dailjobDetails.find({ show: "1" }).then((result) => {
    res.json(result);
  });
};

exports.alljobs = (req, res) => {
  jobDetails.find({}).then((result) => {
    res.json(result);
  });
};

exports.dailalljobs = (req, res) => {
  dailjobDetails.find({}).then((result) => {
    res.json(result);
  });
};

exports.category = (req, res) => {
  let value = req.body.value;
  jobDetails
    .find({
      $or: [
        { Name: { $regex: value, $options: "i" } },
        { Qualification: { $regex: value, $options: "i" } },
        { LastDate: { $regex: value, $options: "i" } },
      ],
    })
    .then((result) => {
      res.json(result);
    });
};

exports.category2 = (req, res) => {
  let value = req.body.value;
  dailjobDetails
    .find({
      $or: [
        { name: { $regex: value, $options: "i" } },
        { lastdate: { $regex: value, $options: "i" } },
        { date: { $regex: value, $options: "i" } },
      ],
    })
    .then((result) => {
      res.json(result);
    });
};

exports.quizdata = (req, res) => {
  quizzes.findOne({ department: req.body.department}).then((data) => {
    res.json(data);
  });
};

exports.sendemail = (req, res) => {
  let to = req.body.to;
  let msg = req.body.msg;
  let option = {
    from: "devmadhujith@gmail.com",
    to: to,
    subject: "SIH",
    text: msg,
  };
  transport.sendMail(option, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

exports.disability = (req, res) => {
  disabilities.findOne({ disabilitytype: req.body.type }).then((data) => {
    res.json(data);
  });
};

exports.history = (req, res) => {
  users.findOne({ email: req.body.email }).then((data) => {
    let score = data.score;
    res.json(score);
  });
};

exports.findhistory = (req, res) => {
  users.findOne({ email: req.body.email }).then((data) => {
    let score = data.score;
    score.forEach((obj) => {
      if (obj.date == req.body.date) {
        res.json(obj);
      }
    });
  });
};

exports.finddepartment = (req, res) => {
  quizzes.findOne({ department: req.body.department }).then((data) => {
    res.json(data);
  });
};

exports.loadsaved = (req, res) => {
  users.findOne({ email: req.body.email }).then((data) => {
    let saved = data.saved;
    res.json(saved)
  });
};

exports.saveregistration = (req, res) => {
  let data = new jobregistrations(req.body);
  data.save();
};

exports.savedregistration = (req, res) => {
  jobregistrations.find({ email: req.body.email }).then((data) => {
    res.json(data);
  });
};

exports.count = (req, res) => {
  jobregistrations.find({ jobid: req.body.id }).then((data) => {
    let udyogs = data.filter((obj) => {
      return obj.others.udyog == "yes";
    });
    let result = {
      udyogs: udyogs.length,
      total: data.length,
    };
    res.json(result);
  });
};

exports.getdetails = (req, res) => {
  users.findOne({ email: req.body.email }).then((data) => {
    res.json(data.others);
  });
};

exports.shareemails = (req, res) => {
  let data = new shareemails(req.body);
  data.save();
};

exports.subscribes = (req, res) => {
  let data = new subscribes(req.body);
  data.save();
};

exports.findjob = (req, res) => {
  jobDetails.findOne({_id : req.body.id}).then((data)=>{
    res.json(data)
  })
};