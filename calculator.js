const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => {
    if (b === 0) return "Can't divide by zero";
    return a / b;
};

let firstNumber;
let secondNumber;
let operator; 