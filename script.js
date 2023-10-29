
const topScreen = document.getElementById('top-screen');
const bottomScreen = document.getElementById('bottom-screen');
// const btnOne = document.getElementById('one');
const numberKeys = document.querySelectorAll('#num');

// btnOne.addEventListener('click', () => {
//     bottomDisplay += '1';
//     bottomScreen.textContent += bottomDisplay;
//     bottomDisplay = '';
// });

let firstNum;
let secondNum;
let operator;
let topDisplay;
let bottomDisplay = '';


function addListenerToNumbers (numberKeys) {
    numberKeys.forEach(element => {
        element.addEventListener('click', () => {
            bottomDisplay += element.innerText;
            bottomScreen.textContent += bottomDisplay;
            bottomDisplay = '';
        })
    });
};


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

addListenerToNumbers(numberKeys);