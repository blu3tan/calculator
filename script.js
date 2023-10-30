
const topScreen = document.getElementById('top-screen');
const bottomScreen = document.getElementById('bottom-screen');
const numberKeys = document.querySelectorAll('#num');
const keysForBlock = document.querySelectorAll('.block');
const operatorKeys = document.querySelectorAll('.operator');
const cKey = document.getElementById('c-operator');
const delKey = document.getElementById('del-operator');
const plusOperator = document.getElementById('plus-operator');
const minusOperator = document.getElementById('min-operator');
const multiplyOperator = document.getElementById('mult-operator');
const divideOperator = document.getElementById('div-operator');

let counter = 0;
let partial = [];
let total = [];
let numbers = [];
let numString = '';

cKey.addEventListener('click', () => {
    numbers = [];
    partial = [];
    bottomScreen.textContent = '';
    topScreen.textContent = '';
    removeClickBlock();
});
delKey.addEventListener('click', () => {
    bottomScreen.textContent = bottomScreen.textContent.slice(0, -1);
});

plusOperator.addEventListener('click', () => {
    counter += 1;
    bottomScreen.textContent += '+';
    numbers.push(+numString);
    numString = '';
    partial = numbers.reduce(add, 0);
    topScreen.textContent = (partial);
    clearNumbers();
    partial = [];
});

// Add listener to each number key, on click the proper number is displayed and stored
function addListenerToNumbers (array) {
    array.forEach(element => {
        element.addEventListener('click', () => {
                numString += (element.innerText);
                bottomScreen.textContent += element.innerText;
                checkLength();
            })
    });
};
function clickBlock () {
    keysForBlock.forEach(element => {
        element.classList.add('clickBlock');
    });
};
function removeClickBlock () {
    keysForBlock.forEach(element => {
        element.classList.remove('clickBlock');
    });
};

function clearNumbers () {
    if (numbers.length > 1) {
        numbers.splice(0);
        numbers.push(partial);
    }
};

function checkLength () {
    if (bottomScreen.textContent.length > 13 || counter > 5) {
        numbers = [];
        partial = [];
        bottomScreen.textContent = 'ERROR';
        topScreen.textContent = 'PRESS C';
        counter = 0;
        clickBlock();
    };
};

function clearAll () {

};

function add (num1, num2) {
    return num1 + num2;
};
function subtract (num1, num2) {
    return num1 - num2;
};
function multiply (num1, num2) {
    return num1 * num2;
};
function divide (num1, num2) {
    return num1 / num2;
};
function operate (num1, num2, operator) {
    return operator(num1, num2);
};

addListenerToNumbers(numberKeys);