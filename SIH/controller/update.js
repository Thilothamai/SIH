let users = require("../db/users.js");

let jobDetails = require("../db/jobs.js");

let dailjobDetails = require("../db/dailjobs.js");

let quizzes = require("../db/quiz.js");

exports.newpass = (req, res) => {
  let data = req.body;
  users
    .findOne({ email: data.email })
    .then((result) => {
      return users.updateOne(result, {
        $set: { email: result.email, pass: data.pass },
      });
    })
    .then(() => {
      res.json({
        newpage: "/signin",
      });
    });
};

exports.save = (req, res) => {
  let id = req.body.id;
  let email = req.body.email;
  jobDetails.findOne({ _id: id }).then((result) => {
    if (result != null) {
      jobDetails
        .findOne({ _id: id })
        .then((result) => {
          users.findOne({ email: email }).then((data) => {
            return users.updateOne(data, { $push: { saved: result } });
          });
          return result;
        })
        .then((result) => {
          res.json(result);
        });
    } else {
      dailjobDetails
        .findOne({ _id: id })
        .then((result) => {
          users.findOne({ email: email }).then((data) => {
            return users.updateOne(data, { $push: { saved: result } });
          });
          return result;
        })
        .then((result) => {
          res.json(result);
        });
    }
  });
};

exports.unsave = (req, res) => {
  let id = req.body.id;
  let email = req.body.email;
  jobDetails
    .findOne({ _id: id })
    .then((result) => {
      users.findOne({ email: email }).then((data) => {
        return users.updateOne(data, { $pull: { saved: { _id: result._id } } });
      });
      return result;
    })
    .then((result) => {
      res.json(result);
    });
};

exports.updatescore = (req, res) => {
  let obj = {
    department: req.body.department,
    score: req.body.score,
    history: req.body.history,
    date: req.body.date,
    syllabus: req.body.syllabus,
    books: req.body.books,
    materials: req.body.materials,
    video: req.body.video,
  };
  users
    .updateOne({ email: req.body.email }, { $push: { score: obj } })
    .then((data) => {
      res.json(data);
    });
};

exports.setanswers = (req, res) => {
  users
    .updateOne(
      { email: req.body.email },
      { $set: { answers: req.body.answers } }
    )
    .then((data) => {
      res.json(data);
    });
};

exports.deletejob = (req, res) => {
  jobDetails
    .updateOne({ _id: req.body.id }, { $set: { show: "2" } })
    .then((data) => {
      res.json(data);
    });
};

exports.deletedailjob = (req, res) => {
  dailjobDetails
    .updateOne({ _id: req.body.id }, { $set: { show: "2" } })
    .then((data) => {
      res.json(data);
    });
};


exports.newtest = (req, res) => {
  quizzes.findOneAndUpdate({department : req.body.department},{$push : {questions : req.body.question}}).then((data)=>{
    console.log(data);
    res.json(data)
  })
};