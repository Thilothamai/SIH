let express = require("express")


let router = express.Router()


let getr  = require("../controller/get.js")


let postr  = require("../controller/post.js")


let updater  = require("../controller/update.js")

let deleter  = require("../controller/delete.js")


router.get("/signup",getr.signup);

router.get("/signin",getr.signin);

router.get("/forget",getr.forget)

router.get("/otp",getr.otp)

router.get("/newpass",getr.newpass)

router.get("/profile",getr.profile)

router.get("/jobs",getr.jobs)

router.get("/dailjobs",getr.dailljobs)

router.get("/home",getr.home)

router.get("/training",getr.training)

router.get("/about",getr.about)

router.get("/contact",getr.contact);

router.get("/tnpsc",getr.tnpscjobs);

router.get("/saved",getr.saved);

router.get("/disabilitydata",getr.disabilitydata);

router.get("/history",getr.history)

router.get("/coachingcenters",getr.coachingcenters)

router.get("/trainingdetails",getr.trainingdetails)

router.get("/addtest",getr.newtest)

router.post("/history",postr.history)

router.post("/findhistory",postr.findhistory)

router.post("/tnpscjobs",postr.tnpscjobs)

router.post("/finddepartment",postr.finddepartment)

router.post("/findjob",postr.findjob)

router.post("/subscribes",postr.subscribes)

router.post("/signup",postr.signup)

router.post("/signin",postr.signin)

router.post("/forget",postr.forget)

router.post("/profile",postr.profile)

router.post("/jobs",postr.jobs)

router.post("/dailjobs",postr.dailjobs)

router.post("/alljobs",postr.alljobs)

router.post("/dailalljobs",postr.dailalljobs)

router.post("/category",postr.category)

router.post("/category2",postr.category2);

router.post("/quiz",postr.quizdata)

router.post("/sendemail",postr.sendemail)

router.post("/savedregistration",postr.savedregistration)

router.post("/saveregistration",postr.saveregistration)

router.post("/disability",postr.disability)

router.post("/getdetails",postr.getdetails)

router.post("/count",postr.count)

router.post("/loadsaved",postr.loadsaved)

router.post("/shareemails",postr.shareemails)

router.put("/newpass",updater.newpass)

router.put("/save",updater.save)

router.put("/unsave",updater.unsave)

router.put("/updatescore",updater.updatescore)

router.put("/setanswers",updater.setanswers)

router.put("/deletejob",updater.deletejob)

router.put("/deletedailjob",updater.deletedailjob)

router.put("/newtest",updater.newtest)

module.exports = router