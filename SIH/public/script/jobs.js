import {
  header,
  search,
  apply_filter,
  default_filter,
  default_filter_fun,
  save,
  checkadmin,
  signout,
  reffer,
} from "./common.js";

localStorage.setItem("testpreview", JSON.stringify({}));

let headerblock = document.querySelector("header");

localStorage.setItem("dailsearched", JSON.stringify(""));

let login = JSON.parse(localStorage.getItem("login"));

header(headerblock, ".jobs");

search();

let dataArray = [
  {
    label: "Lastdate",
    value: [
      { label: "Default", value: "Default" },
      { label: "Live", value: "Live" },
      { label: "Expired", value: "Expired" },
      { label: "All", value: "All" },
    ],
  },
];

let footer_section = document.querySelector("footer section");

function filter() {
  return (footer_section.innerHTML = dataArray
    .map((obj) => {
      return `<div>
            <h4>${obj.label}</h4>
            <select name="" id="${obj.label}">
            ${obj.value.map((obj2) => {
              return `<option value="${obj2.value}">${obj2.label}</option>`;
            })}
            </select>
          </div>`;
    })
    .join(""));
}

filter();

let local_filters = JSON.parse(localStorage.getItem("default_filter"));

document.querySelector("#Lastdate").value = local_filters.lastdate;

let searched_jobs = JSON.parse(localStorage.getItem("jobs"));

let searched = localStorage.getItem("searched");

function alljobs() {
  fetch("/alljobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      localStorage.setItem("alljobs", JSON.stringify(data));
    });
}

function fetchJobs() {
  if (
    (searched_jobs.length != 0 && searched.length != 0) ||
    local_filters == default_filter
  ) {
    Promise.resolve(jobs(searched_jobs)).then(() => {
      save();
    });
  } else {
    fetch("/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        let ids = [];
        fetch("/savedregistration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: login.email,
          }),
        })
          .then((data) => {
            return data.json();
          })
          .then((data) => {
            data.forEach((obj) => {
              ids.push(obj.jobid);
            });
          });
        jobs(data);
        data.forEach((obj) => {
          if (ids.includes(obj._id)) {
            document
              .querySelector(`#button${obj._id}`)
              .setAttribute("disabled", "true");
            document.querySelector(`#button${obj._id}`).innerHTML = "Applied";
          }
        });
      })
      .then(() => {
        alljobs();
      })
      .then(() => {
        save();
      })
      .then(() => {
        let admin = checkadmin(login.email);
        if (admin) {
          let deletebuttons = document.querySelectorAll(".deletebutton");
          deletebuttons.forEach((button) => {
            button.classList.remove("hide");
          });
        }
      })
      .then(() => {
        deletejob();
      })
      .then(() => {
        share();
      })
      .then(() => {
        let applybutton = document.querySelectorAll(".applybutton");

        applybutton.forEach((button) => {
          button.addEventListener("click", () => {
            let ok = confirm("Do You want to continue");
            if (ok) {
              let login = JSON.parse(localStorage.getItem("login"));
              let otp = String(
                Math.floor(Math.random() * (9 - 1 + 1) + 1) * 1000000
              );
              login.otp = otp;
              localStorage.setItem("login", JSON.stringify(login));
              localStorage.setItem(
                "applied",
                JSON.stringify(button.parentElement.getAttribute("id"))
              );
              let msg = `otp for registrtion is ${otp}`;
              fetch("/sendemail", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  to: login.email,
                  msg: msg,
                }),
              });
              location.href = "/otp";
            }
          });
        });
      });
  }
}

let main = document.querySelector("main");

function jobs(data) {
  return (main.innerHTML = data
    .map((obj) => {
      let udyogs = 0;
      let total = 0;
      fetch("/count", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: obj._id,
        }),
      })
        .then((result) => {
          return result.json();
        })
        .then((result) => {
          udyogs = result.udyogs;
          total = result.total;
        });
      return `<section class="box">
          <div>
            <h4>Role: </h4>
            <p>${obj.Name}</p>
          </div>
          <div>
            <h4>Source : </h4>
            <p>${obj.Qualification}</p>
          </div>
          <div class="hide">
            <h4>Remuneration: </h4>
            <p>${obj.Remuneration}</p>
          </div>
          <div>
            <h4>Vacancies: </h4>
            <p>${obj.Vacancy}</p>
          </div>
          <div class="hide">
            <h4>Adv no: </h4>
            <p>${obj.AdvNo}</p>
          </div>
          <div class="hide">
            <h4>Announced : </h4>
            <p>${obj.Date}</p>
          </div>
          <div>
            <h4>Lastdate: </h4>
            <p>${obj.LastDate}</p>
          </div>
          <div id="${obj._id}" class="apply buttons">
            <a href="${obj.Link}" target="_blank"><button>Apply <i class="fa-solid fa-download"></i></button></a>
            <button class="savebutton">Save <i class="fa-solid fa-bookmark"></i></button>
            <button id="${obj._id}" class="share">Share <i class="fa-solid fa-share"></i></button>
            <button class="deletebutton hide">Delete <i class="fa-solid fa-trash"></i></button>
          </div>
        </section>`;
    })
    .join(""));
}

apply_filter();

let filterbutton = document.querySelector(".fa-filter");

filterbutton.addEventListener("click", () => {
  document.querySelector("footer").classList.toggle("hide");
});

fetchJobs();

let clearbutton = document.querySelector(".clearbutton");

clearbutton.addEventListener("click", () => {
  localStorage.setItem("jobs", JSON.stringify([]));
  default_filter_fun();
  location.href = "/jobs";
});

function deletejob() {
  let deletebuttons = document.querySelectorAll(".deletebutton");
  deletebuttons.forEach((button) => {
    button.addEventListener("click", () => {
      fetch("/deletejob", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: button.parentElement.getAttribute("id"),
        }),
      }).then(() => {
        location.href = "/jobs";
      });
    });
  });
}

signout();

reffer();

function share() {
  let share = document.querySelectorAll(".share");
  share.forEach((button) => {
    button.addEventListener("click", () => {
      let email = prompt("Enter the refferal email : ");
      let msg = "";
      fetch("/findjob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: button.getAttribute("id"),
        }),
      })
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          msg = JSON.stringify(data);
        })
        .then(() => {
          fetch("/sendemail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: email,
              msg: msg,
            }),
          });
        })
        .then(() => {
          fetch("/shareemails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              msg: msg,
              user: login.email,
              jobid: button.getAttribute("id"),
            }),
          });
        });
    });
  });
}

let microphone = document.querySelector(".fa-microphone")

microphone.addEventListener("click",runSpeechRecognition)

function runSpeechRecognition() {
  // get output div reference
  // new speech recognition object
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var recognition = new SpeechRecognition();

  // This runs when the speech recognition service starts

  recognition.onspeechend = function () {
      recognition.stop();
  }

  // This runs when the speech recognition service returns result
  recognition.onresult = function (event) {
      var transcript = event.results[0][0].transcript;
      var confidence = event.results[0][0].confidence;
      document.querySelector("#searchbar").value = transcript
  };

  // start recognition
  recognition.start();
}