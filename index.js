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
    if (operations.length == 0 ) {return}
    let finalAmount = operations[0]
    if (!currValue) {
        operations.pop()
    } else {
        operations.push(currValue)
        currValue = ''
    }
    for (let i = 0; i < operations.length; i++) {
        if (i % 2 == 0) {
            //Numeric Value


        } else {
            //Operator value
        }
    }
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