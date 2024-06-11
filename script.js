function add(a, b) { return a + b };
function subtract(a, b) { return a - b };
function multiply(a, b) { return a * b };
function divide(a, b) 
{ 
    if(b === 0) return "ERROR";
    return a / b 
};

function operate(operator, a, b)
{

}

const displayScreen = document.querySelector("#screen");
let displayValue = "012345";

const overflowText = document.querySelector("#overflow");

function updateDisplay(text)
{
    displayValue = text;
    const length = text.toString().length;
    
    if(length > 8)
    {
        overflowText.textContent = displayValue;
        displayValue = "error";
    }
    else overflowText.textContent = "";

    if(decimalAt === 0) text = "0.";
    displayScreen.textContent = displayValue;
}

let valueA = 0;
let valueB = 0;

let operatorValue = '';

let onValueA = true;

let decimalAt = -1;

function submitValue(input)
{
    if(onValueA)
    {
        if(valueA === 0)
        {
            if(input !== 0)
            {
                valueA = input;
            }
        }
        else
        {
            valueA = Number.parseInt(valueA.toString() + input.toString());
        }

        updateDisplay(valueA);
    }
    else
    {
        if(valueB === 0)
        {
            if(input !== 0)
            {
                valueB = input;
            }
        }
        else
        {
            valueB = Number.parseFloat(valueB.toString() + input.toString());
        }

        updateDisplay(valueB);
    }
}

function submitOperator(operator)
{
    if(!onValueA)
    {
        submitEnter();
    }

    switch (operator) {
        case 'add':
                updateDisplay(`\u{002b}`);
                operatorValue = operator;
            break;
    
        case 'subtract':
                updateDisplay(`\u{002d}`);
                operatorValue = operator;
            break;

        case 'multiply':
                updateDisplay(`\u{00d7}`);
                operatorValue = operator;
            break;
    
        case 'divide':
                updateDisplay(`\u{00f7}`);
                operatorValue = operator;
            break;
    }

    onValueA = !onValueA;
}

function submitEnter()
{
    if(!onValueA)
    {
        const result = calculate(valueA, valueB, operatorValue);

        updateDisplay("= " + result);

        onValueA = true;
        valueA = result;
        valueB = 0;
    }
}

function submitDecimal()
{
    if(onValueA)
    {
        if(valueA === 0)
        {
            valueA = Number.parseFloat("0.");
            decimalAt = 0;
        }
        else
        {
            valueA = Number.parseFloat(valueA.toString() + ".")
        }

        updateDisplay(valueA);
    }
}

function deleteBack()
{
    if(onValueA)
    {
        if(valueA === 0)
        {
            
        }
        else
        {
            let arr = valueA.toString().split("");
            arr.pop();
            valueA = Number.parseInt(arr.join(""));

            if(!valueA) valueA = 0;
        }

        updateDisplay(valueA);
    }
    else
    {
        if(valueB === 0)
        {
            
        }
        else
        {
            let arr = valueB.toString().split("");
            arr.pop();
            valueB = Number.parseFloat(arr.join(""));

            if(!valueB) valueB = 0;
        }

        updateDisplay(valueB);
    }
}

function calculate(a, b, operator)
{
    let result = 0;

    switch (operator) {
        case 'add':
                result = add(a, b);
            break;
    
        case 'subtract':
                result = subtract(a, b);
            break;

        case 'multiply':
                result = multiply(a, b);
            break;
    
        case 'divide':
                result = divide(a, b);
            break;
    }

    return result;
}

function clearFunction()
{
    updateDisplay("0");

    valueA = 0;
    valueB = 0;

    onValueA = true;

    decimalAt = -1;

    operatorValue = '';
}