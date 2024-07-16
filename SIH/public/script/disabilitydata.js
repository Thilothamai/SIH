import { header, jobdown,signout ,reffer} from "./common.js"

let headerblock = document.querySelector("header")

let answers = JSON.parse(localStorage.getItem("answers"))

let logindata = JSON.parse(localStorage.getItem("login"))

header(headerblock, ".fa-user")

jobdown()

let search_block = document.querySelector(".searchblock")

search_block.classList.add("hide")

let questions = document.querySelector(".questions")

let questionsarr = []

let details = JSON.parse(localStorage.getItem("details"))

fetch("/disability", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        type: details.distype
    })
})
    .then((data) => {
        return data.json();
    })
    .then((data) => {
        questionsarr = data.questions;
    })
    .then(() => {
        showquestions();
    })
    .then(()=>{
        default_value()
    })

function showquestions() {
    return (questions.innerHTML = questionsarr
        .map((obj) => {
            let options = obj.options
            return `<div class="container">
      <div>
        <h4>${obj.sno}) </h4>
        <h3>${obj.question}</h3>
      </div>
      <div class="options">
        <div>
        <input value="${options[0]}" id="${obj.answer}" type="radio" name="${obj.sno}" />
          <p>${options[0]}</p>
        </div>
        <div>
        <input value="${options[1]}" id="${obj.answer}" type="radio" name="${obj.sno}" />
          <p>${options[1]}</p>
        </div>
        <div>
        <input value="${options[2]}" id="${obj.answer}" type="radio" name="${obj.sno}" />
          <p>${options[2]}</p>
        </div>
        <div>
        <input value="${options[3]}" id="${obj.answer}" type="radio" name="${obj.sno}" />
          <p>${options[3]}</p>
        </div>
      </div>
    </div>`;
        })
        .join(""));
}


function default_value () {

    let option1 = document.getElementsByName("1")
    option1.forEach((obj) => {
        if (obj.getAttribute("value") == answers.q1) {
            obj.setAttribute("checked","true")
        }
    })
    let option2 = document.getElementsByName("2")
    option2.forEach((obj) => {
        if (obj.getAttribute("value") == answers.q2) {
            obj.setAttribute("checked","true")
        }
    })
    let option3 = document.getElementsByName("3")
    option3.forEach((obj) => {
        if (obj.getAttribute("value") == answers.q3) {
            obj.setAttribute("checked","true")
        }
    })
    let option4 = document.getElementsByName("4")
    option4.forEach((obj) => {
        if (obj.getAttribute("value") == answers.q4) {
            obj.setAttribute("checked","true")
        }
    })

}


let submit = document.querySelector(".submit")

submit.addEventListener("click", () => {
    let option1 = document.getElementsByName("1")
    let q1 = "";
    option1.forEach((obj) => {
        if (obj.checked) {
            q1 = obj.getAttribute("value")
        }
    })
    let option2 = document.getElementsByName("2")
    let q2 = "";
    option2.forEach((obj) => {
        if (obj.checked) {
            q2 = obj.getAttribute("value")
        }
    })
    let option3 = document.getElementsByName("3")
    let q3 = "";
    option3.forEach((obj) => {
        if (obj.checked) {
            q3 = obj.getAttribute("value")
        }
    })
    let option4 = document.getElementsByName("4")
    let q4 = "";
    option4.forEach((obj) => {
        if (obj.checked) {
            q4 = obj.getAttribute("value")
        }
    })
    let answers = {
        q1: q1,
        q2: q2,
        q3: q3,
        q4: q4,
    }

    fetch("/setanswers", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email : logindata.email,
            answers: answers
        })
    })

    localStorage.setItem("answers",JSON.stringify(answers))

    location.href = "/profile"

})

signout()

reffer()