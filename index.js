const displayInput = document.getElementById('inputValue');

// Variables
const operators = ['-', '+', '%', '*', '/', '(', ')'];
let operations = [];
let currValue = '';
let openParentheses = 0;
let isError = false; // Track if there is an error

// Functions & Operations

function handleInteraction(value) {
    if (isError) {
        return; // Prevent further input if there's an error
    }
    console.log(value);
    if (operators.includes(value)) {
        console.log('Clicked an operator: ', value);
        handleOperatorInput(value);
    } else {
        console.log('Clicked a numeric value: ', value);
        handleNumericInput(value);
    }
    updateUI();
}

function handleNumericInput(value) {
    if (value === '.' && currValue.includes('.')) {
        return; // Prevent multiple decimals
    }
    currValue += value;
}

function handleOperatorInput(value) {
    if (value === '(') {
        if (currValue && !operators.includes(currValue.slice(-1))) {
            // Prevent cases like "2("
            operations.push(currValue);
            currValue = '';
        }
        operations.push(value);
        openParentheses++;
    } else if (value === ')') {
        if (openParentheses === 0) {
            return; // Prevent adding a closing parenthesis without an opening parenthesis
        }
        if (currValue) {
            operations.push(currValue);
            currValue = '';
        }
        operations.push(value);
        openParentheses--;
    } else if (value === '%') {
        if (currValue) {
            currValue = (parseFloat(currValue) / 100).toString();
        }
    } else {
        if (!currValue) {
            return;
        }
        operations.push(currValue);
        operations.push(value);
        currValue = '';
    }
}

function handleEvaluate() {
    if (currValue) {
        operations.push(currValue);
        currValue = '';
    }

    // If there are open parentheses not closed, return an error
    if (openParentheses !== 0) {
        displayError();
        return;
    }

    // Evaluate the expression
    try {
        const expression = operations.join('');
        const result = eval(expression); // Evaluate expression
        currValue = result.toString();
        operations = [];
    } catch (e) {
        displayError();
    }
    updateUI();
}

function handleReset() {
    currValue = '';
    operations = [];
    openParentheses = 0;
    isError = false;
    updateUI();
}

function displayError() {
    displayInput.innerText = 'Error';
    operations = [];
    openParentheses = 0;
    isError = true;
}

function updateUI() {
    if (isError) {
        displayInput.innerText = 'Error';
        return;
    }
    const displayString = operations.join('') + currValue;
    displayInput.innerText = displayString.trim() ? displayString : '0';
}
