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
            return "Unknown operator selected";
    }
}

const digitButtons = document.querySelectorAll(".digit");
const display = document.querySelector("#display");
const operatorButtons = document.querySelectorAll(".operant");
const equalButton = document.querySelector("#equalsBtn");
const clearButton = document.querySelector("#clearBtn");
const backspaceButton = document.querySelector("#backspaceBtn");

function updateDisplay(value) {
    if (typeof value === "number") {
        value = Math.round(value * 1000000) / 1000000;
    }

    display.textContent = value;
}

function updateExpressionDisplay() {
    let expression = firstNumber;

    if (operator !== "") {
        expression += `${operator}`;
    }

    if (secondNumber !== "") {
        expression += `${secondNumber}`;
    }

    updateDisplay(expression || "0");
}

function roundResult(number) {
    return Math.round(number * 1000000) / 1000000;
}

function resetCalculator() {
    firstNumber = "";
    secondNumber = "";
    operator = "";
    shouldResetDisplay = false;

    updateDisplay("0");
}

function handleDigit(value) {
    if (shouldResetDisplay) {
        firstNumber = "";
        secondNumber = "";
        operator = "";
        shouldResetDisplay = false;
    }

    if (operator === "") {
        if (value === "." && firstNumber.includes(".")) return;

        firstNumber += value;
        updateExpressionDisplay();
    } else {
        if (value === "." && secondNumber.includes(".")) return;

        secondNumber += value;
        updateExpressionDisplay();
    }
}

function handleOperator(value) {
    if (firstNumber === "") return;

    if (operator !== "" && secondNumber === "") {
        operator = value;
        return;
    }

    if (operator !== "" && secondNumber !== "") {
        let result = operate(
            operator,
            Number(firstNumber),
            Number(secondNumber)
        );

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

    operator = value;
    updateExpressionDisplay();
}

function handleEquals() {
    if (firstNumber === "" || secondNumber === "" || operator === "") return;

    let result = operate(
        operator,
        Number(firstNumber),
        Number(secondNumber)
    );

    if (typeof result === "string") {
        updateDisplay(result);
        resetCalculator();
        return;
    }

    result = roundResult(result);

    updateDisplay(result);

    firstNumber = result.toString();
    secondNumber = "";
    operator = "";

    shouldResetDisplay = true;
}

function handleBackspace() {
    if (shouldResetDisplay) return;

    if (operator === "") {
        firstNumber = firstNumber.slice(0, -1);
        updateExpressionDisplay();
    } else if (secondNumber !== "") {
        secondNumber = secondNumber.slice(0, -1);
        updateExpressionDisplay();
    }
}


digitButtons.forEach((button) => {
    button.addEventListener("click", () => {
        handleDigit(button.textContent);
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        handleOperator(button.textContent);
    });
});

equalButton.addEventListener("click", handleEquals);

clearButton.addEventListener("click", resetCalculator);

backspaceButton.addEventListener("click", handleBackspace);


document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key)) {
        handleDigit(key);
    }

    if (key === ".") {
        handleDigit(".");
    }

    if (["+", "-", "*", "/"].includes(key)) {
        handleOperator(key);
    }

    if (key === "Enter" || key === "=") {
        handleEquals();
    }

    if (key === "Backspace") {
        handleBackspace();
    }

    if (key === "Escape") {
        resetCalculator();
    }
});

updateDisplay("0");