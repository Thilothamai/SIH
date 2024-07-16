import { back_to_field, login } from "./login.js";

let otp = document.querySelector("input");

let submit = document.querySelector("button");

let verify = JSON.parse(localStorage.getItem("login"));

let err = document.querySelector(".error");

let inputs = document.querySelectorAll("input");

back_to_field(inputs, err);

submit.addEventListener("click", () => {
  if (String(verify.otp).length < 6) {
    if (verify.otp == otp.value) {
      location.href = "/newpass";
    } else {
      err.classList.remove("hide");
    }
  } else if (String(verify.otp).length >= 6) {
    if (verify.otp == otp.value) {
      let others = JSON.parse(localStorage.getItem("details"))
      others.udyog = "yes"
      others.selected = "no"
      fetch("/saveregistration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phno: verify.phno,
          email: verify.email,
          jobid : JSON.parse(localStorage.getItem("applied")),
          others: others
        })
      });
      location.href = "/jobs";
    } else {
      err.classList.remove("hide");
    }
  }
});
