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
        if (shouldResetDisplay) {
            firstNumber = "";
            secondNumber = "";
            operator = "";
            shouldResetDisplay = false;
        }

        if (operator === "") {
            if (button.textContent === "." && secondNumber.includes(".")) return;

            firstNumber += button.textContent;
            updateDisplay(firstNumber);
        } else {
            if (button.textContent === "." && secondNumber.includes(".")) return;

            secondNumber += button.textContent;
            updateDisplay(secondNumber);
        }
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (firstNumber === "") return;

        if (operator !== "" && secondNumber !== "") {
            operator = button.textContent;
            return;
        }

        if (operator !== "" && secondNumber !== "") {
            let result = operate(operator, Number(firstNumber), Number(secondNumber));

            if (typeof result === "string") {
                updateDisplay(result);
                resetCalculator();
                return;
            }

            result = roundResult(result);
            updateDisplay(result);

            firstNumber = result.toString();
            secondNumber = "";
        }

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