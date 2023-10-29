
const topScreen = document.getElementById('top-screen');
const bottomScreen = document.getElementById('bottom-screen');
const numberKeys = document.querySelectorAll('#num');
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
let operator = '';

bottomScreen.addEventListener('overflow', () => {
    console.log('error');
})

cKey.addEventListener('click', () => {
    numbers = [];
    partial = [];
    bottomScreen.textContent = '';
    topScreen.textContent = '';
});
delKey.addEventListener('click', () => {
    bottomScreen.textContent = bottomScreen.textContent.slice(0, -1);
})

plusOperator.addEventListener('click', () => {
    counter += 1;
    bottomScreen.textContent += '+';
    partial = numbers.reduce(add, 0);
    topScreen.textContent = (partial);
    clearNumbers();
    partial = [];
})


// Add listener to each number key, on click the proper number is displayed and stored
function addListenerToNumbers (array) {
    array.forEach(element => {
        element.addEventListener('click', () => {
                numbers.push(+(element.innerText));
                bottomScreen.textContent += element.innerText;
            })
    });
};

addListenerToNumbers(numberKeys);

function clearNumbers () {
    if (numbers.length > 1) {
        numbers.splice(0);
        numbers.push(partial);
    }
}

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


// function addListenerToNumbers (array) {
//     array.forEach(element => {
//         element.addEventListener('click', () => {
//             if (!operating) {
//                 numbers.push(+(element.innerText));
//                 bottomScreen.textContent += element.innerText;
//             }
//             else {
//                 operating = false;
//                 numbers.push(+(element.innerText));
//                 bottomScreen.textContent = '';
//                 bottomScreen.textContent += element.innerText;
//             }
//         })
//     });
// };