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
    const display = document.querySelector('.display'); 
    const equation = document.createElement("p"); 
    const answer = document.createElement("p"); 
    equation.classList.add(".equation");
    answer.classList.add(".answer"); 
    display.appendChild(equation); 
    display.appendChild(answer); 

    let firstNum = "";
    let operator = "";
    let secondNum = ""; 
    let lastValue = "firstNum";
    let displayValue = ""; 

    const btns = document.querySelectorAll("button"); 
    btns.forEach(btn => {
        btn.addEventListener("click", () => {
            if(btn.textContent === "DEL") {
                
            }
            else if(btn.textContent === "AC") {
                
            }
            else if(btn.textContent === "=" && lastValue === "secondNum") {
                displayValue = operate(parseInt(firstNum), parseInt(secondNum), operator) + ""; 
                firstNum = displayValue; 
                lastValue = "firstNum"; 
                operator = "";
                secondNum = "";
            }
            else if(lastValue === "secondNum" && isOperator(btn.textContent)) {
                displayValue = operate(parseInt(firstNum), parseInt(secondNum), operator) + ""; 
                firstNum = displayValue; 
                lastValue = "secondNum"; 
                operator = "";
                secondNum = "";
            }
            else if(isOperator(btn.textContent)){
                operator = btn.textContent; 
                lastValue = "operator";
            }
            else if(lastValue === "firstNum") { 
                firstNum += btn.textContent; 
            }
            else if(lastValue === "operator" || lastValue === "secondNum") {
                secondNum += btn.textContent;
                lastValue = "secondNum"; 
            }
        });
    });
}

populateDisplay();

