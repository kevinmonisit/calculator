/* eslint-disable indent */

// ================== Creation of Calculator ==================

const calculatorContainer = document.getElementById('calculator-container');

const numbers = {
    'zero': '0',
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9',
    'decimal:': '.',
};

for (num in numbers) {
    if (Object.prototype.hasOwnProperty.call(numbers, num)) {
        const cellNumber = document.createElement('button');

        cellNumber.style['grid-area'] = num;
        cellNumber.setAttribute('id', `button-${num}`);
        cellNumber.setAttribute('name', num);
        cellNumber.classList.add('calc-button');
        cellNumber.innerText = numbers[num];

        calculatorContainer.appendChild(cellNumber);
    }
}


// ================== Event Listening for Buttons ================

const numberButtons = document.querySelectorAll('.calc-button');
const currNumberText = document.getElementById('current-number-text');
let currNumber = '0';

/**
 * Accepts single digits and adds those digits
 * to the currentNumber if there is enough space.
 * @param {value} value to add to currNumber
 */
function adjustCurrentNumber(value) {
    if (currNumber.length >= 15) return;

    if (currNumber === '0') {
        currNumber = value.toString();
    } else if (currNumber != '0') {
        currNumber += value.toString();
    }
}

/**
 * Changes the current number within the display
 * @param {value} value to change to
 */
function changeCurrNumberText(value) {
//    debugger;
    currNumberText.innerText = value;
}

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // button ids are button-{num} where num is the corresponding number
        const numericValueOfButton =
            numbers[button.getAttribute('id').split('-')[1]];

        adjustCurrentNumber(numericValueOfButton);
        changeCurrNumberText(currNumber);
    });
});
