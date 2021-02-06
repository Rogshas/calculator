class Calculator  {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.readyToReset = false;
        this.clear();
    }

    clear() {
         this.currentOperand = '';
         this.previousOperand = '';
         this.operation = undefined;
         this.readyToReset = false;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand ==='' && operation === '-') {
            this.currentOperand = '-';
            return;
        }
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        if (operation === '√') {
            
            
                this.currentOperand = Math.sqrt(parseFloat(this.currentOperand));
                this.operation = undefined;
                this.readyToReset = true;
                this.previousOperand = '';
            if (isNaN(this.currentOperand)) {
                this.currentOperand = 'error';
                return;
            }
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            case '^':
                computation = Math.pow(prev,current);
                break;
            default:
                return;
    
            }  
        
      
        
        this.readyToReset = true;
        this.currentOperand = +computation.toFixed(8);
        this.operation = undefined;
        this.previousOperand = '';
        
    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay= '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        if (this.currentOperand == 'error') {
            this.currentOperandTextElement.innerText ='Error';
            return;
        }
        if (this.currentOperand === '-') {
            this.currentOperandTextElement.innerText = '-';
            return;
        }

        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`; 
        }  else {
            this.previousOperandTextElement.innerText = '';
        }
       
    }
}

const numberBTN = document.querySelectorAll('[data-number');
const operationBTN = document.querySelectorAll('[data-operation');
const equalsBTN = document.querySelector('[data-equals');
const deleteBTN = document.querySelector('[data-delete');
const allClearBTN = document.querySelector('[data-all-clear');
const previousOperandTextElement = document.querySelector('[data-previous-operand');
const currentOperandTextElement = document.querySelector('[data-current-operand');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberBTN.forEach(button => {
    button.addEventListener('click', () => {
        if(calculator.previousOperand === "" && calculator.currentOperand !== "" && calculator.readyToReset) {
            calculator.currentOperand = "";
            calculator.readyToReset = false;
        } 
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationBTN.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
        
    })
})

equalsBTN.addEventListener ('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearBTN.addEventListener ('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteBTN.addEventListener ('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})