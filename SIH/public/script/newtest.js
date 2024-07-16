import { header, default_filter_fun, signout, reffer } from "./common.js";

default_filter_fun();

localStorage.setItem("testpreview", JSON.stringify({}));

let headerblock = document.querySelector("header");

localStorage.setItem("searched", JSON.stringify(""));

localStorage.setItem("dailsearched", JSON.stringify(""));

header(headerblock, ".about");

let search_block = document.querySelector(".searchblock");

search_block.classList.add("hide");

signout();

reffer();

let button = document.querySelector("#submitbutton");

button.addEventListener("click", () => {
  let department = document.querySelector("#type").value;
  console.log(department);
  let question = {
    type: "text",
    sno: String(Math.floor(Math.random() * (9 - 1 + 1) + 1) * 1000000),
    Question: document.querySelector("#Question").value,
    options: [
      document.querySelector("#Option1").value,
      document.querySelector("#Option1").value,
      document.querySelector("#Option2").value,
      document.querySelector("#Option3").value,
      document.querySelector("#Option4").value,
    ],
    answer: document.querySelector("#Answer").value,
  };
  fetch("/newtest", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      department: department,
      question: question,
    }),
  })
});
