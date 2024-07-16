import { header, default_filter_fun, signout, reffer } from "./common.js";

let headerblock = document.querySelector("header");

default_filter_fun();

localStorage.setItem("searched", JSON.stringify(""));

localStorage.setItem("dailsearched", JSON.stringify(""));

header(headerblock, ".training");

let search_block = document.querySelector(".searchblock");

search_block.classList.add("hide");

let testpreview = JSON.parse(localStorage.getItem("testpreview"));

let questions = document.querySelector(".questions");

let history = testpreview.history;

let department = document.querySelector("#department");

if (Object.keys(testpreview).length == 0) {
  let localdepartment = localStorage.getItem("department");

  department.value = localdepartment;

  department.addEventListener("change", () => {
    if (department.value == "Logical" || department.value == "Verbal" || department.value == "Aptitude") {
    localStorage.setItem("department", department.value);
    location.href = "/training";
    }
    else {
      if (department.value == "Cognitive") {
        window.open("https://www.practiceaptitudetests.com/cognitive-ability-tests/", '_blank')
      }
      else {
        window.open("https://www.practiceaptitudetests.com/psychometric-tests/",'_blank')
      }
      department.value = "Logical"
    }
  });

  let questionsarr = [];

  let nums = [];
  while (nums.length < 10) {
    let num = Math.floor(Math.random() * 20) + 1;
    if (nums.includes(num) == false) {
      nums.push(num);
    }
  }

  fetch("/quiz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      department: department.value,
    }),
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      let result = data.questions;
      result.forEach((obj) => {
        if (nums.includes(obj.sno)) {
          questionsarr.push(obj);
        }
      });
      document.querySelector("#syllabus").setAttribute("href", data.syllabus);
      document.querySelector("#books").setAttribute("href", data.books);
      document.querySelector("#materials").setAttribute("href", data.materials);
      document.querySelector("#video").setAttribute("href", data.video);
    })
    .then(() => {
      showquestions(questionsarr);
    });

  let submit = document.querySelector(".submit");

  submit.addEventListener("click", () => {
    let score = 0;
    let history = [];
    for (let i = 1; i <= 10; i++) {
      let option = document.getElementsByName(String(i));
      let q1 = "";
      let checked = 0;
      option.forEach((obj) => {
        if (obj.checked) {
          checked = 1;
          q1 = obj.getAttribute("value");
          let shortdata = {
            sno: obj.getAttribute("class"),
            answer: q1,
          };
          history.push(shortdata);
          if (q1 == obj.getAttribute("id")) {
            score++;
          }
        }
      });
      if (checked == 0) {
        let shortdata = {
          sno: option[0].getAttribute("class"),
          answer: q1,
        };
        history.push(shortdata);
      }
    }

    let answers = document.querySelectorAll(".questionsblock .hide");
    answers.forEach((obj) => {
      obj.classList.remove("hide");
    });
    document.querySelector(".score span").innerHTML = score;
    submit.classList.add("hide");
    let login = JSON.parse(localStorage.getItem("login"));
    let msg = `you have scored ${score} in ${department.value}`;
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

    let store = {
      department: department.value,
      score: score,
      email: login.email,
      history: history,
      date: String(new Date()),
      syllabus: document.querySelector("#syllabus").getAttribute("href"),
      books: document.querySelector("#books").getAttribute("href"),
      materials: document.querySelector("#materials").getAttribute("href"),
      video: document.querySelector("#video").getAttribute("href"),
    };

    fetch("/updatescore", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(store),
    });
  });
} else {
  document.querySelector("#department").value = testpreview.department;
  let result = [];
  fetch("/finddepartment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      department: testpreview.department,
    }),
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      result = data.questions;
      document.querySelector("#syllabus").setAttribute("href", data.syllabus);
      document.querySelector("#books").setAttribute("href", data.books);
      document.querySelector("#materials").setAttribute("href", data.materials);
      document.querySelector("#video").setAttribute("href", data.video);
    })
    .then(() => {
      let sno = [];
      let finalarr = [];
      history.forEach((obj) => {
        sno.push(obj.sno);
      });

      result.forEach((obj) => {
        if (sno.includes(String(obj.sno))) {
          finalarr.push(obj);
        }
      });
      showquestions(finalarr);
    })
    .then(() => {
      let inputs = document.querySelectorAll("input");
      let answers = [];
      history.forEach((obj) => {
        answers.push(obj.answer);
      });

      inputs.forEach((input) => {
        if (answers.includes(input.getAttribute("value"))) {
          input.setAttribute("checked", "true");
        }
      });
    })
    .then(() => {
      let answers = document.querySelectorAll(".questionsblock .hide");
      answers.forEach((obj) => {
        obj.classList.remove("hide");
      });
      document.querySelector(".submit").classList.add("hide");
      document.querySelector(".score span").innerHTML = testpreview.score;
    });
}

let reattempt = document.querySelector(".reattempt");

reattempt.addEventListener("click", () => {
  location.href = "/training";
});

function showquestions(questionsarr) {
  let num = 0;
  return (questions.innerHTML = questionsarr
    .map((obj) => {
      num = num + 1;
      let options = obj.options;
      return `<div class="container">
      <div>
        <h4>${num}) </h4>
        <h3>${obj.question}</h3>
      </div>
      <div class="options">
        <div>
        <input value="${options[0]}" id="${obj.answer}" type="radio" name="${num}" class="${obj.sno}" />
          <p>${options[0]}</p>
        </div>
        <div>
        <input value="${options[1]}" id="${obj.answer}" type="radio" name="${num}" class="${obj.sno}" />
          <p>${options[1]}</p>
        </div>
        <div>
        <input value="${options[2]}" id="${obj.answer}" type="radio" name="${num}" class="${obj.sno}" />
          <p>${options[2]}</p>
        </div>
        <div>
        <input value="${options[3]}" id="${obj.answer}" type="radio" name="${num}" class="${obj.sno}" />
          <p>${options[3]}</p>
        </div>
        <div class="hide">
          <h4>Answer : </h4>
          <p>${obj.answer}</>
        </div>
      </div>
    </div>`;
    })
    .join(""));
}

signout();

reffer();

// let tnpsc = [
//   {
//     value: "Psychometric",
//   },
//   {
//     value: "Cognitive",
//   },
//   {
//     value: "History",
//   },
//   {
//     value: "Current_Events",
//   },
//   {
//     value: "Language",
//   },
//   {
//     value: "Aptitude",
//   },
//   {
//     value: "G.K",
//   },
// ];

// let bank = [
//   {
//     value: "Psychometric",
//   },
//   {
//     value: "Cognitive",
//   },
//   {
//     value: "Reasoning",
//   },
//   {
//     value: "Computer",
//   },
//   {
//     value: "Language",
//   },
//   {
//     value: "Aptitude",
//   },
//   {
//     value: "G.K",
//   },
// ];

// let upsc = [
//   {
//     value: "Psychometric",
//   },
//   {
//     value: "Cognitive",
//   },
//   {
//     value: "History",
//   },
//   {
//     value: "Constitution",
//   },
//   {
//     value: "Maths",
//   },
//   {
//     value: "Geography",
//   },
//   {
//     value: "Current_Affairs",
//   },
// ];

// let rrb = [
//   {
//     value: "Current_Affairs",
//   },
//   {
//     value: "Aptitude",
//   },
//   {
//     value: "Maths",
//   },
//   {
//     value: "Politics",
//   },
//   {
//     value: "Sports",
//   },
//   {
//     value: "Psychometric",
//   },
//   {
//     value: "Cognitive",
//   },
// ];

// function changeopion () {
//   let arr = []
//   let examtype = JSON.parse(localStorage.getItem("examtype"))
//   if (examtype == "tnpsc") {
//     arr = tnpsc
//   }
//   if (examtype == "bank") {
//     arr = tnpsc
//   }
//   if (examtype == "tnpsc") {
//     arr = tnpsc
//   }
//   if (examtype == "tnpsc") {
//     arr = tnpsc
//   }
// }
