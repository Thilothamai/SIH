import { back_to_field} from "./login.js";

import { header,default_filter_fun,signout,reffer} from "./common.js";

localStorage.setItem("searched",JSON.stringify(""))

let headerblock = document.querySelector("header");

header(headerblock, ".fa-user");

let search_block = document.querySelector(".searchblock")

search_block.classList.add("hide")

default_filter_fun()

localStorage.setItem("testpreview",JSON.stringify({}))

let personal_details_arr = [
  {
    label: "Name",
    type: "text",
  },
  {
    label: "UDID",
    type: "text",
  },
  {
    label: "E-Mail Id",
    type: "email",
  },
  {
    label: "Mobile Number",
    type: "tel",
  },
  {
    label: "District",
    type: "text",
  },
  {
    label: "Pincode",
    type: "text",
  },
  {
    label: "Guardian Email",
    type: "email",
  },
  {
    label: "Guardian MobileNo",
    type: "text",
  },

];

let personal_details_section = document.querySelector(
  ".personal_details_section1"
);

function personal_details() {
  return (personal_details_section.innerHTML = personal_details_arr
    .map((obj) => {
      return `<div class="${obj.label.replace(" ", "")}">
                <p>${obj.label}</p>
                <input type=${obj.type}>
            </div>`;
    })
    .join(""));
}

personal_details();

let select_data = [
  {
    label: "State",
    options: [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
      "Andaman and Nicobar Islands",
      "Chandigarh",
      "Dadra and Nagar Haveli and Daman and Diu",
      "Delhi",
      "Lakshadweep",
      "Puducherry",
    ],
  },
  {
    label: "Gender",
    options: ["Male", "Female", "Transgender", "others"],
  },
  {
    label: "Income",
    options: [
      "Below 10000",
      "From 10000 to 100000",
      "100000 to 500000",
      ">500000",
    ],
  },
  {
    label: "Employment Status",
    options: ["Employed", "Unemployed"],
  },
  {
    label: "Qualification",
    options: [
      "Primary",
      "High School",
      "Graduate",
      "Post Graduate",
      "Illeterate",
    ],
  },
  {
    label: "Disability Type",
    options: ["NONE","LOCOMOTOR","VISION","AUTISM","HEARING","MULTIPLE"]
  },
];

let select_details_section = document.querySelector(
  ".personal_details_section2"
);

function select_details() {
  return (select_details_section.innerHTML = select_data
    .map((obj) => {
      return `<div class="${obj.label.replace(" ", "")}">
            <p>${obj.label}</p>
            <select name="" id="">
            ${obj.options.map((val) => {
              return `<option value="${val}">${val}</option>`;
            })}
            </select>
            </div>`;
    })
    .join(""));
}

select_details();

let data = JSON.parse(localStorage.getItem("details"));

let logindata = JSON.parse(localStorage.getItem("login"));

document.querySelector(".Name input").value = data.name
document.querySelector(".UDID input").value = data.udid
document.querySelector(".E-MailId input").value = data.mail
document.querySelector(".MobileNumber input").value = data.mobno
document.querySelector(".District input").value = data.district
document.querySelector(".Pincode input").value = data.pincode
document.querySelector(".GuardianEmail input").value = data.gdemail
document.querySelector(".GuardianMobileNo input").value = data.gdphno
document.querySelector(".State select").value = data.state
document.querySelector(".Gender select").value = data.gender
document.querySelector(".Income select").value = data.income
document.querySelector(".EmploymentStatus select").value = data.empstatus
document.querySelector(".Qualification select").value = data.qualification
document.querySelector(".DisabilityType select").value = data.distype

let email = document.querySelector(".E-MailId input");

email.value = logindata.email

let phno = document.querySelector(".MobileNumber input")

phno.value = logindata.phno

email.setAttribute("readonly", false);

phno.setAttribute("readonly", false);

let err = document.querySelector(".error");

let inputs = document.querySelectorAll("input");

back_to_field(inputs, err);

function update_details() {
  let details = {
    name: document.querySelector(".Name input").value,
    udid: document.querySelector(".UDID input").value,
    mail: document.querySelector(".E-MailId input").value,
    mobno: document.querySelector(".MobileNumber input").value,
    district: document.querySelector(".District input").value,
    pincode: document.querySelector(".Pincode input").value,
    gdemail : document.querySelector(".GuardianEmail input").value,
    gdphno : document.querySelector(".GuardianMobileNo input").value,
    state: document.querySelector(".State select").value,
    gender: document.querySelector(".Gender select").value,
    income: document.querySelector(".Income select").value,
    empstatus: document.querySelector(".EmploymentStatus select").value,
    qualification: document.querySelector(".Qualification select").value,
    distype: document.querySelector(".DisabilityType select").value,
  };

  fetch("/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email : logindata.email,
      details : details
    }),
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      if (data.value) {
        localStorage.setItem("details", JSON.stringify(details));
      } else {
        err.classList.remove("hide");
      }
    })
    .then(()=>{
      location.href = "/home"
    })
}

let button = document.querySelector(".submit");

button.addEventListener("click", () => {
  let distype = document.querySelector(".DisabilityType select").value
  if (distype != data.distype) {
  let answers = {
    q1 : "",
    q2 : "",
    q3 : "",
    q4 : ""
  }
  localStorage.setItem("answers",JSON.stringify(answers))
}
  update_details();
});

reffer()

signout()