class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {

        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
        this.computationCheck = false;
    }


    clear() {

        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;

    }

    delete() {

        this.currentOperand = this.currentOperand.toString().slice(0, -1);

    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return;
        if (this.computationCheck === true) {

            this.clear();
            this.computationCheck = false;

        }
        this.currentOperand = this.currentOperand.toString() + number.toString();

    }


    chooseOperation(operation) {


        if (this.currentOperand === '' || this.currentOperand === '-') {

            if (operation === '-') {

                this.currentOperand = operation;
                this.currentOperandTextElement.innerText = '-';
            }

            return;

        }


        if (this.previousOperand !== '') {
            this.compute();

        }


        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';


    }


    compute() {


        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        console.log("prev:" + prev);
        console.log("current:" + current);
        // console.log(isNaN(prev));
        // if (isNaN(prev) || isNaN(current)) return;
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
                // case "√":
                //     computation = Math.sqrt(prev);
                //     break;
            case "xn":
                computation = Math.pow(prev, current);
                break;
            default:
                return;
        }

        this.currentOperand = parseFloat(computation.toFixed(2));

        this.operation = undefined;
        this.previousOperand = '';
        this.computationCheck = true;

    }



    compute() {

        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        console.log("prev:" + prev);
        console.log("current:" + current);
        // console.log(isNaN(prev));
        // if (isNaN(prev) || isNaN(current)) return;
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
                // case "√":
                //     computation = Math.sqrt(prev);
                //     break;
            case "xn":
                computation = Math.pow(prev, current);
                break;
            default:
                return;
        }

        if (this.currentOperand.includes(".000")) {

            this.currentOperand = parseFloat(computation);

        } else {

            this.currentOperand = parseFloat(computation.toFixed(2));

        }

        this.operation = undefined;
        this.previousOperand = '';
    }

    sqrt() {

        const curr = parseFloat(this.currentOperand);
        const result = Math.sqrt(curr);

        this.currentOperand = result;
        if (isNaN(curr)) {

            alert("Сначала введите число");
            this.clear();

        }

        if (curr < 1) {

            alert("Нельзя извлечь корень из отрицательного числа");
            this.clear();

        }
        this.operation = "√";
        this.previousOperand = curr;
    }


    getDisplayNumber(number) {
        // console.log(number);
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimelDigits = stringNumber.split('.')[1];
        // console.log(integerDigits);
        // console.log(decimelDigits);
        let integerDisplay;
        if (isNaN(integerDigits)) {

            integerDisplay = '';
            // console.log(integerDigits);

        } else {

            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0
            });

            // console.log("IntegerDisplay: " + integerDisplay);

        }

        if (decimelDigits != null) {

            return `${integerDisplay}.${decimelDigits}`;

        } else {

            return integerDisplay;

        }

    }

    updateDisplay() {

        if (this.currentOperand === "-") {

            this.currentOperandTextElement.innerText = "-";

        } else {

            this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);

        }

        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {

            this.previousOperandTextElement.innerText = '';

        }

        if (this.operation === "√") {

            this.previousOperandTextElement.innerText = `√ ${this.getDisplayNumber(this.previousOperand)}`;

        }

    }


}


const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");
const sqrtOperation = document.querySelector("[data-operation-sqrt]");


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {

    button.addEventListener('click', () => {

        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();

    })

});

operationButtons.forEach(button => {

    button.addEventListener('click', () => {

        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();

    })

})


equalsButton.addEventListener("click", button => {

    calculator.compute();
    calculator.updateDisplay();

})


allClearButton.addEventListener("click", button => {

    calculator.clear();
    calculator.updateDisplay();

})

deleteButton.addEventListener("click", button => {

    calculator.delete();
    calculator.updateDisplay();

})

sqrtOperation.addEventListener("click", button => {

    calculator.sqrt()
    calculator.updateDisplay();

})

console.log(calculator);