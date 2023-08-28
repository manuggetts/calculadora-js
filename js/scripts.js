const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }
    // adicionar digito na tela da calculadora
    addDigit(digit) {

        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    // processar as operações
    processOperation(operation) {
        // checagem se o valor atual ta vazio
        if (this.currentOperationText.innerText === "") {
            // mudança de operação
            if (this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        // pegar valores atuais e anteriores
        let operationValue
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(
                    operationValue,
                    operation,
                    current,
                    previous)
                break; case "-":
                operationValue = previous - current
                this.updateScreen(
                    operationValue,
                    operation,
                    current,
                    previous)
                break; case "/":
                operationValue = previous / current
                this.updateScreen(
                    operationValue,
                    operation,
                    current,
                    previous)
                break; case "*":
                operationValue = previous * current
                this.updateScreen(
                    operationValue,
                    operation,
                    current,
                    previous)
                break;
            default:
                return;
        }

    }

    // mudar o valor da tela da calculadora
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {

        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // Verifique se o valor é zero, se for apenas adicione o valor atual
            if (previous === 0) {
                operationValue = current
            }

            // Adicione o valor atual ao anterior
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    // Mudança de operação matemática
    changeOperation(operation) {

        const mathOperations = ["*", "/", "+", "-"]

        if (!mathOperations.includes(operation)) {
            return
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});