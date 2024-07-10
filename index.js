const displayInput = document.getElementById('inputValue')

//Variables
const operators = ['-', '+', '%', '*', '/']
let operations = []
let currValue = ''

//Functions & Operations

function handleInteraction(value) {
    console.log(value)
    if (operators.includes(value)) {
        console.log('Clicked an operator: ', value)
        handleOperatorInput(value)
    } else {
        console.log('Clicked a numeric value: ', value)
        handleNumericInput(value)
    }
    updateUI()
}

function handleNumericInput(value) {
    if (value === '.' && currValue.includes('.')) {return}
    currValue += value
}

function handleOperatorInput(value) {
    if (!currValue) {
        return
    }

    operations.push(currValue)
    operations.push(value)
    currValue = ''

}
function handleEvaluate() {
    if (operations.length === 0) {
        return;
    }

    if (currValue) {
        operations.push(currValue);
        currValue = '';
    } else {
        operations.pop();
    }

    let finalAmount = parseFloat(operations[0]);
    let prevOperator = null;

    for (let i = 1; i < operations.length; i++) {
        if (operators.includes(operations[i])) {
            prevOperator = operations[i];
        } else {
            const currentValue = parseFloat(operations[i]);

            switch (prevOperator) {
                case '+':
                    finalAmount += currentValue;
                    break;
                case '-':
                    finalAmount -= currentValue;
                    break;
                case '*':
                    finalAmount *= currentValue;
                    break;
                case '/':
                    finalAmount /= currentValue;
                    break;
                case '%':
                    finalAmount %= currentValue;
                    break;
                default:
                    break;
            }
        }
    }

    currValue = finalAmount.toString();
    operations = [];
    updateUI();
}

function handleReset() {
    currValue = ''
    operations = []
    updateUI()
}

function updateUI() {
    const displayString = operations.join(' ') +  ' ' + currValue
    displayInput.innerText = displayString.trim() ? displayString : '0'
} 