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
        return multiply(x, y); 
    }
    else if(operator === "-") {
        return subtract(x, y); 
    }
    else if(operator === "*") {
        return multiply(x, y); 
    }
    else {
        return divide(x, y); 
    }
}