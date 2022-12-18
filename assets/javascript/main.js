const numbersContainer = document.querySelector(".numbers");
const displayNow = document.querySelector(".screen__now");
const resultContainer = document.querySelector(".screen__result--result");
let numberString = "";
let num = "";
let numbers = [];
let result = 0;
let lastOperator = "";
numbersContainer.addEventListener("click", (e) => {
  for (let i = 0; i <= 9; i++) {
    if (e.target.classList.contains(`numbers__${i}`)) {
      numberString += i;
      num += i;
    }
  }
  if (
    e.target.classList.contains(`numbers__dot`) &&
    !numberString.includes(".")
  ) {
    numberString += ".";
    num += ".";
  }
  if (
    e.target.parentNode.classList.contains("numbers__back") ||
    e.target.classList.contains("numbers__back")
  ) {
    numberString = numberString.slice(0, numberString.length - 1);
    num = num.slice(0, num.length - 1);
  }
  const operators = ["plus", "minus", "multiply", "division", "equal"];
  operators.forEach((opt) => {
    if (e.target.classList.contains(`numbers__${opt}`)) {
      numbers.push(Number.parseFloat(num));
      if (numbers.length <= 1) {
        result = numbers[0];
      } else {
        switch (lastOperator) {
          case "plus":
            result = numbers[0] + numbers[1];
            break;
          case "minus":
            result = numbers[0] - numbers[1];
            break;
          case "multiply":
            result = numbers[0] * numbers[1];
            break;
          case "division":
            result = numbers[0] / numbers[1];
            break;
        }
        numbers = [];
        numbers.push(result);
      }
      switch (opt) {
        case "plus":
          numberString += "+";
          lastOperator = "plus";
          break;
        case "minus":
          numberString += "-";
          lastOperator = "minus";
          break;
        case "multiply":
          numberString += "×";
          lastOperator = "multiply";
          break;
        case "division":
          numberString += "÷";
          lastOperator = "division";
          break;
      }
      num = "";
    }
  });
  if (e.target.classList.contains("numbers__equal")) {
    if (numbers.length === 0) {
      result = 0;
    } else if (numbers.length === 1) {
      result = numbers[0];
    } else {
      switch (lastOperator) {
        case "plus":
          result = numbers[0] + numbers[1];
          break;
        case "minus":
          result = numbers[0] - numbers[1];
          break;
        case "multiply":
          result = numbers[0] * numbers[1];
          break;
        case "division":
          result = numbers[0] / numbers[1];
          break;
      }
    }
    numberString = "";
    numbers = [];
  }
  if (e.target.classList.contains("numbers__clean")) {
    result = 0;
    numberString = "";
    numbers = [];
    num = "";
    lastOperator = "";
  }
  displayNow.textContent = numberString;
  resultContainer.textContent = result;
});
