const submitBtn = document.querySelector(".btn");
const empty = document.querySelector(".empty");
const completed = document.querySelector(".completed");
const repayCheck = document.querySelector("#repayment-radio");
const interestCheck = document.querySelector("#interest-radio");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  empty.style.display = "none";
  completed.style.display = "block";

  const amount = document.querySelector("#mortgage-amt").value;
  const rate = document.querySelector("#interest-rate").value;
  const time = document.querySelector("#mortgage-term").value;

  validateForm(amount, time, rate);
});

// const container = document.querySelector("#container-0");
// amount.display.border = "1px solid var(--primary-red-clr)";
// container.display.backgroundColor = "var(--primary-red-clr)";

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
    // container1.classList.add("error");
    // container1.appendChild(errorWrap);
    // container2.classList.add("error");
    // container2.appendChild(errorWrap);
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
    monthlyDue.innerText = monthlyRepayment;
    totalDue.innerText = totalRepayment;
  } else if (interestCheck.checked) {
    let monthlyPayDue = amt / term;
    const monthlyInterest = monthlyRepayment - monthlyPayDue;
    const totalInterest = totalRepayment - amt;
    monthlyDue.innerText = monthlyInterest;
    totalDue.innerText = totalInterest;
  }
}
// let M;
// let P = 300000;
// let I = 5.25 / 100 / 12;
// let N = 25 * 12;
// M = stackOverflow(P, N, I);

// console.log("Stackoverflow:", M);

// function stackOverflow(p, n, i) {
//   const monthly = (p * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
//   console.log("monthly: ", monthly);
//   const yearly = monthly * 25 * 12;
//   console.log("yearly: ", yearly);
// }
