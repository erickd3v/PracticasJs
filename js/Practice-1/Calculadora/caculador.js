const body = document.getElementById('calculator-screen'),
    keys = document.getElementById('calculator-keys'),
    screen = document.querySelector('.calculo')
    
let operationStatus = false,
    number1, tyOperation
const calculator = () => {
    if (!keys) return
    keys.addEventListener('click', e => {
        const t = e.target,
            d = t.dataset;

        // Detectar un número
        if(d.number) writeScreen(d.number);  // OK

        // Detectar una operación matemática
        if(d.math) getOperation(t,d.math); // OK

        // Detectar otra operación
        if(d.operation) runOperation(d.operation); // OK
    })
}

const writeScreen = number => {
    screen.textContent === '0' || operationStatus === true
        ? screen.textContent = number
        : number === '.' && !screen.textContent.includes('.')
            ? screen.textContent += number
            : number !== '.' 
                ? screen.textContent += number
                : null

    operationStatus = false
    if (screen.textContent.length >= 12) {
        screen.textContent = number1;
    }
}

const getOperation = (element, operation) => {
    operationStatus = true;
    number1 = Number(screen.textContent)
    tyOperation = operation;
    // console.log(tyOperation);
    if (tyOperation === 'change') {
        screen.textContent = Number(`-${number1}`);
    }
    if(screen.textContent == 'NaN'){
        screen.textContent = number1 * Number('-1');
    }

    if(tyOperation === 'porcent') {
        screen.textContent = number1 / 100
    }
}

const runOperation = (operation) => {
    const getResult = (number1, tyOperation) => {
        const number2 = Number(screen.textContent)
        switch (tyOperation) {
            case 'add':
                // screen.textContent = number2 = number1 / 100
                screen.textContent = number1 + number2
                break;

            case 'minus':
                screen.textContent = number1 - number2
                break;
        
            case 'multiply':
                screen.textContent = number1 * number2
                break;

            case 'divide':
                screen.textContent = number1 / number2
                break;

            default:
                break;
        }
    }
    operation === 'delete'
        ? screen.textContent = '0'
        : getResult(number1, tyOperation)
    operationStatus = true
}

calculator()