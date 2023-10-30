
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

const add = (num1, num2) => num1 += num2;
const subtract = (num1, num2) => num1 -= num2;
const multiply = (num1, num2) => num1 *= num2;
const divide = (num1, num2) => num1 /= num2;

let operator = [];
let partial = [];
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
    bottomScreen.textContent += '+';
    operator.push(add);
    numbers.push(+numString);
    numString = '';
    partial = numbers.reduce(operator[0]);
    checkOperator();
    topScreen.textContent = partial;
    numbers.splice(0);
    numbers.push(partial);
    checkLength();
});

minusOperator.addEventListener('click', () => {
    bottomScreen.textContent += '-';
    operator.push(subtract);
    calculateAndDisplay();
});

function calculateAndDisplay () {
    numbers.push(+numString);
    numString = '';
    partial = numbers.reduce(operator[0]);
    checkOperator();
    topScreen.textContent = partial;
    numbers.splice(0);
    numbers.push(partial);
    checkLength();
};

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

// Once maximum is length on the display disable click on everything except C
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

// Temporary solution to overflow on the display
function checkLength () {
    if (bottomScreen.textContent.length > 15) {
        numbers = [];
        partial = [];
        numString = '';
        bottomScreen.textContent = 'ERROR';
        topScreen.textContent = 'PRESS C';
        clickBlock();
    };
};

function checkOperator () {
    if (operator.length == 2) {
        operator.shift(0);
    }
}

addListenerToNumbers(numberKeys);
