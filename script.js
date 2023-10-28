
let firstNum;
let secondNum;
let operator;

function add (num1, num2) {
    return num1 + num2;
}
function subtract (num1, num2) {
    return num1 - num2;
}
function multiply (num1, num2) {
    return num1 * num2;
}
function divide (num1, num2) {
    return num1 / num2;
}
function operate (num1, num2, operator) {
    return operator(num1, num2);
}

console.log(operate(5, 2, divide));