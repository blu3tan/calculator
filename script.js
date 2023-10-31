
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
const floatKey = document.getElementById('dot');
const total = document.getElementById('total');

const add = (num1, num2) => num1 += num2;
const subtract = (num1, num2) => num1 -= num2; // <= problem here
const multiply = (num1, num2) => num1 *= num2; // <= problem here
const divide = (num1, num2) => num1 /= num2;

let operator = [];
let partial = [];
let numbers = [];
let numString = '';

// Special keys custom listeners
cKey.addEventListener('click', () => {
    numbers = [];
    partial = [];
    operator = [];
    numString = '';
    bottomScreen.textContent = '';
    topScreen.textContent = '';
    removeClickBlock(keysForBlock);
});
delKey.addEventListener('click', () => {
    bottomScreen.textContent = bottomScreen.textContent.slice(0, -1);
});

floatKey.addEventListener('click', (e) => {
    numString += '.';
    bottomScreen.textContent += '.';
    e.target.classList.add('clickBlock');
    checkLength();
});

plusOperator.addEventListener('click', () => {
    bottomScreen.textContent += '+';
    operator.push(add);
    calculateAndDisplay();
});

minusOperator.addEventListener('click', () => {
    bottomScreen.textContent += '-';
    operator.push(subtract);
    calculateAndDisplay();
});

multiplyOperator.addEventListener('click', () => {
    bottomScreen.textContent += 'x';
    operator.push(multiply);
    calculateAndDisplay();
});

divideOperator.addEventListener('click', () => {
    bottomScreen.textContent += '÷';
    operator.push(divide);
    calculateAndDisplay();
});

total.addEventListener('click', () => {
    numbers.push(+numString);
    numString = '';
    partial = numbers.reduce(operator[0]);
    checkOperator();
    numbers.splice(0);
    numbers.push(partial);
    bottomScreen.textContent = partial;
    topScreen.textContent = '';
    clickBlock(numberKeys);
});

//  Main operation function - perform the operation based on the current operator
//  and control the display behavior
function calculateAndDisplay () {
    numbers.push(+numString);
    numString = '';
    partial = numbers.reduce(operator[0]);
    checkOperator();
    topScreen.textContent = partial;
    numbers.splice(0);
    numbers.push(partial);
    floatKey.classList.remove('clickBlock');
    removeClickBlock(numberKeys);
    checkLength();
};

function checkOperator () {
    if (operator.length > 1) {
        operator.shift(0);
    };
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

// Once maximum length on the display disable click on everything except C-key
function clickBlock (array) {
    array.forEach(element => {
        element.classList.add('clickBlock');
    });
};
function removeClickBlock (array) {
    array.forEach(element => {
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
        clickBlock(keysForBlock);
    };
};

addListenerToNumbers(numberKeys);
