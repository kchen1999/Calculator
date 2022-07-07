function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    const ans = x / y;
    return Math.round(ans * 1000) / 1000;
}

function operate(x, y, operator) {
    if (operator === '+') {
        return add(x, y);
    }
    else if (operator === "-") {
        return subtract(x, y);
    }
    else if (operator === "x") {
        return multiply(x, y);
    }
    else {
        return divide(x, y);
    }
}

function isOperator(str) {
    if (str === "x" || str === "÷" || str === "+" || str === "-") {
        return true;
    }
    return false;
}

function isOperatorKey(str) {
    if(str === "NumpadMultiply" || str === "Slash" || str === "NumpadAdd" || str === "Minus") {
        return true; 
    }
    return false; 
}

function disableDecimal(num, decimalButton) {
    if (num.includes(".")) {
        decimalButton.disabled = true;
    }
    else {
        decimalButton.disabled = false;
    }
}

function populateDisplay() {
    const equation = document.querySelector('.equation-display');
    const answer = document.querySelector('.answer-display');
    const decimalButton = document.getElementById("decimal");
    let firstNum = "";
    let operator = "";
    let secondNum = "";
    let lastValue = "firstNum";
    let displayValue = "";

    const btns = document.querySelectorAll("button");
    btns.forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.textContent === "DEL") {
                displayValue = displayValue.slice(0, - 1);
                if (lastValue === "firstNum") {
                    firstNum = displayValue;
                }
                else if (lastValue === "secondNum") {
                    secondNum = displayValue;;
                }
                answer.textContent = displayValue;
            }
            else if (btn.textContent === "AC") {
                displayValue = "0";
                firstNum = "";
                operator = "";
                secondNum = "";
                decimalButton.disabled = false;
                equation.textContent = "";
                answer.textContent = displayValue;
            }
            else if (lastValue === "secondNum" && btn.textContent === "=") {
                displayValue = operate(parseFloat(firstNum), parseFloat(secondNum), operator) + "";
                equation.textContent = firstNum + " " + operator + " " + secondNum + " =";
                answer.textContent = displayValue;
                disableDecimal(displayValue, decimalButton);
                firstNum = displayValue;
                lastValue = "firstNum";
                operator = "";
                secondNum = "";
            }
            else if (lastValue === "secondNum" && isOperator(btn.textContent)) {
                displayValue = operate(parseFloat(firstNum), parseFloat(secondNum), operator) + "";
                firstNum = displayValue;
                lastValue = "operator";
                operator = btn.textContent;
                secondNum = "";
                disableDecimal(displayValue, decimalButton);
                equation.textContent = displayValue + " " + operator;
                answer.textContent = displayValue;
            }
            else if (lastValue === "firstNum" && btn.textContent === "-") {
                firstNum += btn.textContent;
                displayValue = firstNum;
                answer.textContent = displayValue;
            }
            else if (isOperator(btn.textContent)) {
                operator = btn.textContent;
                equation.textContent = firstNum + " " + operator;
                lastValue = "operator";
            }
            else if (lastValue === "firstNum") {
                if(btn.textContent != "=") {
                    firstNum += btn.textContent;
                    displayValue = firstNum;
                    disableDecimal(displayValue, decimalButton);
                    answer.textContent = displayValue;
                }
            }
            else {
                if(operator === "÷" && btn.textContent === "0") {
                    alert("Cannot divide by 0!"); 
                }
                else {
                    secondNum += btn.textContent;
                    lastValue = "secondNum";
                    displayValue = secondNum;
                    disableDecimal(displayValue, decimalButton);
                    answer.textContent = displayValue;
                }
            }
        }); 
    });
}
populateDisplay();

