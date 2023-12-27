
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
const keyboardKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0',];
const operatorSymbol = ['.', '+', '-', '*', '/', 'Backspace', 'Enter', 'Escape'];

let clickSound = () => new Audio('./sound/click.mp3').play();
let hooverSound = () => new Audio('./sound/hoover.wav').play();

let operator = [];
let partial = [];
let numbers = [];
let numString = '';
let control = false;

const add = (num1, num2) => num1 += num2;
const subtract = (num1, num2) => num1 -= num2;
const multiply = (num1, num2) => num1 *= num2;
const divide = (num1, num2) => num1 /= num2;

document.addEventListener('keyup', (e) => {
    clickSound();
    if (keyboardKeys.includes(e.key)) {
        control = false;
        numString += e.key;
        bottomScreen.textContent += e.key;
        removeClickBlock(operatorKeys);
        checkLength();
    }
    else if (operatorSymbol.includes(e.key)) {
        switch (e.key) {
            case '.':
                floatKeyEvent();
                break;
            case '+':
                addKeyEvent();
                break;
            case '-':
                subtractKeyEvent();
                break;
            case '*':
                multiplyKeyEvent();
                break;
            case '/':
                divideKeyEvent();
                break;
            case 'Backspace':
                delKeyEvent();
                break;
            case 'Enter':
                totalKeyEvent();
                break;
            case 'Escape':
                cKeyEvent();
                break;            
        }
    }
});

// Special keys custom listeners
cKey.addEventListener('click', () => {
    cKeyEvent();
});

delKey.addEventListener('click', () => {
    delKeyEvent();
});

floatKey.addEventListener('click', (e) => {
    floatKeyEvent();
});

plusOperator.addEventListener('click', () => {
    addKeyEvent();
});

minusOperator.addEventListener('click', () => {
    subtractKeyEvent();
});

multiplyOperator.addEventListener('click', () => {
    multiplyKeyEvent();
});

divideOperator.addEventListener('click', () => {
    divideKeyEvent();
});

total.addEventListener('click', () => {
    totalKeyEvent();
});

//  Main operation function - perform the operation based on the current operator
//  and control the display behavior
function calculateAndDisplay () {
    numbers.push(+numString);
    numString = '';
    provideInitial();
    checkOperator();
    topScreen.textContent = checkDecimals(partial);
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

// Prevent errors trying to divide with 0 or when a second value is not provided

function provideInitial() {
    if (operator[0] == divide) {
        checkDivide();
    }
    else if (operator[0] == multiply) {
        checkMultiply();
    }
    else partial = numbers.reduce(operator[0]);
};

function checkDivide() {
    if (numbers[1] == undefined || numbers[1] == 0) {
        numbers[1] = 1;
        partial = numbers.reduce(operator[0]);
    }
    else partial = numbers.reduce(operator[0]);
};

function checkMultiply() {
    if ((numbers[1] == undefined) || (numbers[1] == 0 && control == false)) {
        numbers[1] = 1;
        partial = numbers.reduce(operator[0]);
    }
    else partial = numbers.reduce(operator[0]);
};

function checkDecimals(item) {
    if (Number.isInteger(item)) {
        return item;
    }
    else return parseFloat(item.toFixed(5));
};

// Functions to perform actions based on the key pressed
// These blocks of actions are wrapped in functions instead of being added to the event listener
// to allow keyboard support 

function numberKeyEvent(element) {
    clickSound();
    control = false;
    numString += (element.innerText);
    bottomScreen.textContent += element.innerText;
    removeClickBlock(operatorKeys);
    checkLength();
};

function totalKeyEvent() {
    clickSound();
    control = true;
    numbers.push(+numString);
    numString = '';
    provideInitial();
    operator = [];
    numbers.splice(0);
    numbers.push(partial);
    bottomScreen.textContent = checkDecimals(partial);
    topScreen.textContent = '';
    clickBlock(numberKeys);
    removeClickBlock(operatorKeys);
};

function divideKeyEvent() {
    clickSound();
    control = false;
    clickBlock(operatorKeys);
    bottomScreen.textContent += '÷';
    operator.push(divide);
    calculateAndDisplay();
};
function multiplyKeyEvent() {
    clickSound();
    control = false;
    clickBlock(operatorKeys);
    bottomScreen.textContent += 'x';
    operator.push(multiply);
    calculateAndDisplay();
};
function addKeyEvent() {
    clickSound();
    control = false;
    clickBlock(operatorKeys);
    bottomScreen.textContent += '+';
    operator.push(add);
    calculateAndDisplay();
};
function subtractKeyEvent() {
    clickSound();
    control = false;
    clickBlock(operatorKeys);
    bottomScreen.textContent += '-';
    operator.push(subtract);
    calculateAndDisplay();
};
function floatKeyEvent() {
    clickSound();
    control = false;
    numString += '.';
    bottomScreen.textContent += '.';
    e.target.classList.add('clickBlock');
    checkLength();
};
function delKeyEvent() {
    clickSound();
    bottomScreen.textContent = bottomScreen.textContent.slice(0, -1);
    numString = numString.slice(0, -1);
};
function cKeyEvent() {
    clickSound();
    numbers = [];
    partial = [];
    operator = [];
    numString = '';
    bottomScreen.textContent = '';
    topScreen.textContent = '';
    control = false;
    removeClickBlock(keysForBlock);
};

// Add listener to each number key, on click the proper number is displayed and stored
function addListenerToNumbers (array) {
    array.forEach(element => {
        element.addEventListener('click', () => {
               numberKeyEvent(element);
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
        resetOnError();
    };
};

function resetOnError () {
    numbers = [];
    partial = [];
    numString = '';
    bottomScreen.textContent = 'ERROR';
    topScreen.textContent = 'PRESS C';
    clickBlock(keysForBlock);
};

addListenerToNumbers(numberKeys);
