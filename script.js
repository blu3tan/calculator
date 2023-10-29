
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

let operating = false;
let firstNum = 0;
let secondNum = 0;
let numbers = [];
let operator = '';
let topDisplay;

cKey.addEventListener('click', () => {
    firstNum = 0;
    bottomScreen.textContent = '';
    topScreen.textContent = '';
});
delKey.addEventListener('click', () => {
    bottomScreen.textContent = bottomScreen.textContent.slice(0, -1);
})

plusOperator.addEventListener('click', () => {
    operating = true;
    numbers.push(+(bottomScreen.textContent));
    topScreen.textContent = (bottomScreen.textContent + '+');
})

// Add listener to each number key, on click the proper number is displayed and stored
function addListenerToNumbers (array) {
    array.forEach(element => {
        element.addEventListener('click', () => {
            if (!operating) {
            bottomScreen.textContent += element.innerText;
            }
            else {
                operating = false;
                bottomScreen.textContent = '';
                bottomScreen.textContent += element.innerText;
            }
        })
    });
};
// function addListenerToOperators (array) {
//     array.forEach(element => {
//         element.addEventListener('click', () => {
//             operatorRoutine(element);
//         })
//     });
// };

// function operatorRoutine (element) {
//     operator = element.innerText;
//     firstNum += +(bottomScreen.textContent);
//     bottomScreen.textContent += element.innerText;
// }


addListenerToNumbers(numberKeys);




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
