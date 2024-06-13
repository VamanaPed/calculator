function add(a, b) { return a + b };
function subtract(a, b) { return a - b };
function multiply(a, b) { return a * b };
function divide(a, b) 
{ 
    if(b === 0) return "ERROR";
    return a / b 
};

/* Audio */

let audio0 = new Audio("Audio/audiomass-output0.mp3");
let audio1 = new Audio("Audio/audiomass-output1.mp3");
let audio2 = new Audio("Audio/audiomass-output2.mp3");
let audio3 = new Audio("Audio/audiomass-output3.mp3");
let audio4 = new Audio("Audio/audiomass-output4.mp3");
let audio5 = new Audio("Audio/audiomass-output5.mp3");
let audio6 = new Audio("Audio/audiomass-output6.mp3");
let audio = new Audio("Audio/bip.wav");

function playClick()
{
    const rand = Math.floor(Math.random() * 4);

    switch (rand) {
        case 0:
                audio0.play();
            break;
        case 1:
                audio1.play();
            break;
        case 2:
                audio2.play();
            break;
        case 3:
                audio3.play();
            break;
        case 4:
                audio4.play();
            break;
        case 5:
                audio5.play();
            break;
        case 6:
                audio6.play();
            break;
    }
}

const calculatorButtons = document.getElementsByClassName(".calculator-button");
for (const button of calculatorButtons) {
    button.onclick = () => playRandomClick();
}

const displayScreen = document.querySelector("#screen");
let displayValue = "012345";

const overflowText = document.querySelector("#overflow");

function updateDisplay(text)
{
    displayValue = text;
    const string = text.toString();
    const length = text.toString().length;
    
    if(length > 8)
    {
        overflowText.textContent = displayValue;

        if(text.toString().includes("."))
        {
            displayValue = text.toString().substr(0, 8);
        }
        else
        {
            displayValue = "error";
        }
    }
    else overflowText.textContent = "";

    displayScreen.textContent = displayValue;
}

let valueA = 0;
let valueB = 0;

let operatorValue = '';

let onValueA = true;
let justPressedOperator = false;


function submitValue(input)
{
    justPressedOperator = false;

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
            valueA = Number.parseFloat(valueA.toString() + input.toString());
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
    if(!justPressedOperator)
    {
        if(!onValueA)
        {
            submitEnter();
        }

        onValueA = !onValueA;
    }

    justPressedOperator = true;
    

    switch (operator) {
        case 'add':
        case '+':
                updateDisplay(`\u{002b}`);
                operatorValue = operator;
            break;
    
        case 'subtract':
        case '-':
                updateDisplay(`\u{002d}`);
                operatorValue = operator;
            break;

        case 'multiply':
        case '*':
                updateDisplay(`\u{00d7}`);
                operatorValue = operator;
            break;
    
        case 'divide':
        case '/':
                updateDisplay(`\u{00f7}`);
                operatorValue = operator;
            break;
    }
}

function submitEnter()
{
    justPressedOperator = false;

    if(!onValueA)
    {
        const result = calculate(valueA, valueB, operatorValue);

        if(result === "ERROR")
        {
            result = 0;

            updateDisplay("= " + result);
        } 
        else
        {
            let round = 0;

            if(result.toString().length > 6)
                round = customRound(result, 6);
            else
                round = customRound(result, result.toString().length);

            if(round !== result)
            {
                overflowText.textContent = result;

                updateDisplay("= " + round);
            }
            else
            {
                updateDisplay("= " + result);
            }
        }

        onValueA = true;
        valueA = result;
        valueB = 0;
    }
}

function submitDecimal()
{
    justPressedOperator = false;

    if(onValueA)
    {
        if(!valueA.toString().includes("."))
        {
            valueA = valueA + ".";
        }

        updateDisplay(valueA);
    }
    else
    {
        if(!valueB.toString().includes("."))
        {
            valueB = valueB + ".";
        }

        updateDisplay(valueB);
    }
}

function deleteBack()
{
    justPressedOperator = false;

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
        case '+':
                result = add(a, b);
            break;
    
        case 'subtract':
        case '-':
                result = subtract(a, b);
            break;

        case 'multiply':
        case '*':
                result = multiply(a, b);
            break;
    
        case 'divide':
        case '/':
                result = divide(a, b);
            break;
    }

    return result;
}

function customRound(number, decimalPlaces) 
{
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(number * factor) / factor;
}

function clearFunction()
{
    updateDisplay("0");

    valueA = 0;
    valueB = 0;

    onValueA = true;
    justPressedOperator = false;

    operatorValue = '';
}


/* Change Background */

const reader = new FileReader();
const fileInput = document.getElementById("file");

reader.onload = e =>
{
    document.body.style.backgroundImage = "url('" + reader.result + "')";
};

fileInput.addEventListener("change", e =>
{
    const f = e.target.files[0];
    reader.readAsDataURL(f);
});

/* Keyboard Support */

document.addEventListener('keypress', function(e) 
{
    if (e.key === "Enter") 
    {
        e.preventDefault();
    }
});

document.addEventListener('keydown', function(event) 
{
    const key = event.key;
    checkKeyPress(key);
});

function checkKeyPress(key)
{
    const keyPresses = [
        "1","2","3","4","5","6","7","8","9","0","+","/","-","*",".","=",
        "Enter","Backspace","Delete","c","C"
    ];

    if(keyPresses.includes(key))
    {
        playClick();

        switch (key) {
            case "Enter":
            case "=":
                   submitEnter();
                break;
            case "Backspace":
                    deleteBack();
                break;
            case "Delete":
                    clearFunction();
                break;
            case "C":
            case "c":
                    clearFunction();
                break;
            case "+":
            case "-":
            case "*":
            case "/": 
                    submitOperator(key);
                break;
            case ".":
                    submitDecimal();
                break;
        
            default:
                    submitValue(Number.parseInt(key));
                break;
        }
    }
}

function pr()
{
    console.log("ValueA: " + valueA);
    console.log("Operator: " + operatorValue);
    console.log("ValueB: " + valueB);

    return(valueA + " " + operatorValue + " " + valueB);
}