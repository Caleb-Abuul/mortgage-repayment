const submitBtn = document.querySelector(".btn");
const form = document.querySelector("form");
const empty = document.querySelector(".empty");
const completed = document.querySelector(".completed");
const repayCheck = document.querySelector("#repayment-radio");
const interestCheck = document.querySelector("#interest-radio");
const clearBtn = document.querySelector("#clear");
submitBtn.addEventListener("click", (e) => {
  // prevent form submission
  e.preventDefault();
  empty.style.display = "none";
  completed.style.display = "block";

  const amount = document.querySelector("#mortgage-amt").value;
  const rate = document.querySelector("#interest-rate").value;
  const time = document.querySelector("#mortgage-term").value;

  // validate form
  validateForm(amount, time, rate);
});

function validateForm(amt, term, rate) {
  let errorMsg = "This field is required";
  let Principal = amt;
  let interest = rate / 100 / 12;
  let noMonths = term * 12;
  if (amt === "" || term === "" || rate === "") {
    const errorWrap = document.createElement("h6");
    const amtWrap = document.querySelector("#amt-wrap");
    const container0 = document.querySelector("#container-0");
    const signWrap = document.getElementById("sign-wrap");
    const container1 = document.querySelector("#container-1");
    const container2 = document.querySelector("#container-2");
    errorWrap.innerText = errorMsg;
    container0.classList.add("error");
    amtWrap.appendChild(errorWrap);
    container0.classList.add("error");
    signWrap.classList.add("error2");
  } else {
    calculateMortgageRepayment(Principal, noMonths, interest);
  }
}

function calculateMortgageRepayment(amt, term, rate) {
  const monthlyRepayment =
    (amt * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
  const totalRepayment = monthlyRepayment * term;
  const monthlyDue = document.querySelector("#monthly-repayment");
  const totalDue = document.querySelector("#total-repayment");
  if (repayCheck.checked) {
    monthlyDue.innerText = "\u00A3 " + monthlyRepayment.toFixed(2);
    totalDue.innerText = "\u00A3 " + totalRepayment.toFixed(2);
  } else if (interestCheck.checked) {
    let monthlyPayDue = amt / term;
    const monthlyInterest = monthlyRepayment - monthlyPayDue;
    const totalInterest = totalRepayment - amt;
    monthlyDue.innerText = "\u00A3 " + monthlyInterest.toFixed(2);
    totalDue.innerText = "\u00A3 " + totalInterest.toFixed(2);
  }
}

clearBtn.addEventListener("click", () => {
  const amt = (document.querySelector("#mortgage-amt").value = "");
  const term = (document.querySelector("#mortgage-term").value = "");
  const rate = (document.querySelector("#interest-rate").value = "");
  repayCheck.checked = false;
  interestCheck.checked = false;
});
