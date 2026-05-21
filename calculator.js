const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => {
    if (b === 0) return "Can't divide by zero";
    return a / b;
};

let firstNumber = "";
let secondNumber = "";
let operator = "";
let shouldResetDisplay = false;

function operate(operator, firstNumber, secondNumber) {
    switch (operator) {
        case "+":
            return add(firstNumber, secondNumber);

        case "-":
            return subtract(firstNumber, secondNumber);

        case "*":
            return multiply(firstNumber, secondNumber);

        case "/":
            return divide(firstNumber, secondNumber);

        default:
            return "Unknown operant was selected";
    }
}

const digitButtons = document.querySelectorAll(".digit");
const display = document.querySelector("#display");
const operatorButtons = document.querySelectorAll(".operant");
const equalButton = document.querySelector("#equalsBtn");

digitButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (operator === "") {
            firstNumber += button.textContent;
            display.textContent = firstNumber;
        } else {
            secondNumber += button.textContent;
            display.textContent = secondNumber;
        }
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        operator = button.textContent;
    });
});

equalButton.addEventListener("click", () => {
    const result = operate(operator, Number(firstNumber), Number(secondNumber));
    display.textContent = result;

    firstNumber = result.toString();
    secondNumber = "";
    operator = "";
});

function updateDisplay(value) {
    if (typeof value === "number") {
        value = Math.round(value * 1000000) / 1000000;
    }

    display.textContent = value;
}