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
    if(operator === '+') {
        return add(x, y); 
    }
    else if(operator === "-") {
        return subtract(x, y); 
    }
    else if(operator === "x") {
        return multiply(x, y); 
    }
    else {
        return divide(x, y); 
    }
}

function isOperator(str) {
    if(str === "x" || str === "÷" || str === "+" || str === "-" || str === "^") {
        return true; 
    }
    return false; 
}

function populateDisplay() {
    const equation = document.querySelector('.equation-display'); 
    const answer = document.querySelector('.answer-display'); 
   
    let firstNum = "";
    let operator = "";
    let secondNum = ""; 
    let lastValue = "firstNum";
    let displayValue = ""; 

    const btns = document.querySelectorAll("button"); 
    btns.forEach(btn => {
        btn.addEventListener("click", () => {
            if(btn.textContent === "DEL") {
                if(displayValue.length === 1) {
                    if(lastValue === "firstNum") {
                        firstNum = "";
                        displayValue = ""; 
                    }
                    else if(lastValue === "operator") {
                        displayValue = displayValue.substring(0, displayValue.length - 1); 
                    }
                    else {
                        secondNum = "";
                        displayValue = ""; 
                    }
                }
                else {
                    displayValue = displayValue.substring(0, displayValue.length - 1); 
                    if(lastValue === "firstNum") {
                        firstNum = displayValue;
                    }
                    else if(lastValue === "secondNum") {
                        secondNum = displayValue;; 
                    }
                }
                answer.textContent = displayValue;
            }
            else if(btn.textContent === "AC") {
                displayValue = "0";
                firstNum = "";
                operator = "";
                secondNum = "";
                equation.textContent = ""; 
                answer.textContent = displayValue;
            }
            else if(btn.textContent === "=" && lastValue === "secondNum") {
                displayValue = operate(parseInt(firstNum), parseInt(secondNum), operator) + ""; 
                equation.textContent = firstNum + " " + operator + " " + secondNum; 
                answer.textContent = displayValue;
                firstNum = displayValue; 
                lastValue = "firstNum"; 
                operator = "";
                secondNum = "";
            }
            else if(lastValue === "secondNum" && isOperator(btn.textContent)) {
                displayValue = operate(parseInt(firstNum), parseInt(secondNum), operator) + ""; 
                firstNum = displayValue; 
                lastValue = "operator"; 
                operator = btn.textContent;
                secondNum = "";
                equation.textContent = displayValue + " " + operator; 
                answer.textContent = displayValue;  
            }
            else if(isOperator(btn.textContent)){
                operator = btn.textContent; 
                equation.textContent = firstNum + " " + operator; 
                lastValue = "operator";
            }
            else if(lastValue === "firstNum") { 
                firstNum += btn.textContent; 
                displayValue = firstNum; 
                answer.textContent = displayValue; 
            }
            else {
                secondNum += btn.textContent;
                if(lastValue === "operator") {
                    displayValue = ""; 
                }
                lastValue = "secondNum"; 
                displayValue = secondNum; 
                answer.textContent = displayValue; 
            }
        });
    });
}

populateDisplay();

