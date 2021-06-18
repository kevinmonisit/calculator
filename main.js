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

// ================== Number Logic ================

let currNumber = '0';
let lastNumber = '0';
let lastOperatorUsed = null;
const MAX_NUMBER_LENGTH = 13;

const currNumberTextContainer = document.getElementById('current-number-text');
const lastNumberTextContainer = document.getElementById('previous-number');
const currOperator = document.getElementById('current-operator');

/**
 * Accepts single digits and adds those digits
 * to the currentNumber if there is enough space.
 * @param {value} value to add to currNumber
 */
function adjustCurrentNumber(value) {
    if (currNumber.length >= MAX_NUMBER_LENGTH) return;
//    if (currNumber.includes('.') && currNumber.split('.').length == 1) return;

    if (value === '.') {
        if (currNumber.includes('.')) {
            return;
        } else if (currNumber === '0' || currNumber === '' ) {
            currNumber = '0.';
        } else {
            currNumber = currNumber + '.';
        }

        return;
    }

    const value_ = value.toString();
    if (currNumber === '0' || currNumber == '-0') {
        currNumber = currNumber.charAt(0) !== '-' ? value_ : `-${value_}`;
    } else if (currNumber !== '0') {
        currNumber += value.toString();
    }
}

/**
 * Changes the current number within the display
 */
function updateNumbers() {
    currNumberTextContainer.innerText = currNumber;
    lastNumberTextContainer.innerText = lastNumber;
}

/**
 * Toggles the sign of the current number
 * from positive to negative or vise versa.
 */
function toggleSign() {
    if (currNumber.charAt(0) === '-') {
        currNumber = currNumber.substring(1);
    } else {
        currNumber = currNumber.length > 0 ? `-${currNumber}` : '-0';
    }
}
/**
 * Updates the operator remind in the calculator's
 * display.
 * @param {operator} operator takes an valid operator string
 */
function updateCurrOperatorText(operator) {
    console.log(operator);
    currOperator.innerText = operator;
}

/**
 * Resets all numbers and history.
 */
function clearNumbers() {
    currNumber = '0';
    lastNumber = '0';
}

/**
 * Adjusts the last number and the current number using
 * the valid operation that is given.
 *
 * Sets the current number to 0 as well.
 * @param {string} operation the operation to apply to the two operands
 * @param {string} symbol the symbol to set the current operator to
 */
function applyOperation(operation, symbol) {
    lastOperatorUsed = operation;

    if (symbol) {
        console.log(symbol);
        updateCurrOperatorText(symbol);
    }

    if (currNumber == '') {
        return;
    }

    if (lastNumber === '0') {
        lastNumber = currNumber;
        currNumber = '';
        return;
    }

    const currNumberTemp = Number(currNumber);
    const lastNumberTemp = Number(lastNumber);

    let newNumber = 0;

    currNumber = '';
    switch (operation) {
        case 'add':
            newNumber = lastNumberTemp + currNumberTemp;
            break;
        case 'modulo':
            newNumber = lastNumberTemp % currNumberTemp;
            break;
        case 'divide':
            newNumber = lastNumberTemp / currNumberTemp;
            break;
        case 'multiply':
            newNumber = lastNumberTemp * currNumberTemp;
            break;
        case 'subtract':
            newNumber = lastNumberTemp - currNumberTemp;
            break;
        case 'equals to':
            newNumber = currNumberTemp;
            break;
        default:
            throw new Error(`Unknown operation ${operation}`);
    }

    lastNumber = newNumber % 1 != 0 ? newNumber.toFixed(3) : newNumber;
}

// ================== Event Listening for Buttons ================

const numberButtons = document.querySelectorAll('.calc-button');
const changeSignButton = document.getElementById('sign');
const clearButton = document.getElementById('AC');
const equalsButton = document.getElementById('equals');

const operatorButtons = document.querySelectorAll('.operator');

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // button ids are button-{num} where num is the corresponding number
        const numericValueOfButton =
            numbers[button.getAttribute('id').split('-')[1]];

        adjustCurrentNumber(numericValueOfButton);
        updateNumbers(currNumber);
    });
});

changeSignButton.addEventListener('click', () => {
    toggleSign();
    updateNumbers(currNumber);
});

clearButton.addEventListener('click', () => {
    clearNumbers();
    updateNumbers(currNumber);
});

operatorButtons.forEach((operator) => {
    operator.addEventListener('click', () => {
        console.log('Event Listener: ' + operator.innerText);
        applyOperation(operator.getAttribute('name'), operator.innerText);

        updateNumbers(currNumber);
    });
});

equalsButton.addEventListener('click', () => {
    if (lastOperatorUsed !== null) {
        // debugger;
        applyOperation(lastOperatorUsed);
        updateNumbers(currNumber);
    }
});
