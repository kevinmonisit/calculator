/* eslint-disable indent */

// ================== Creation of Calculator ==================

const calculatorContainer = document.getElementById('calculator-container');

const numbers = [
    'zero', 'one', 'two',
    'three', 'four', 'five',
    'six', 'seven', 'eight',
    'nine',
];

let index = 0;
numbers.forEach((num) => {
    const cellNumber = document.createElement('button');
    cellNumber.style['grid-area'] = num;
    cellNumber.innerText = index++;
    calculatorContainer.appendChild(cellNumber);
});
