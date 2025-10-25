interface calculatorReturnTypes {
    getCalculatorValue: (value: string) => void;
    calculate: () => void;
    resetCalculator: () => void;
}

function CalculatorGenerator(): calculatorReturnTypes{
    const equationDisplay = document.getElementById("equation-display") as HTMLInputElement;
    const prevEquationDisplay = document.getElementById("prev-equation-display") as HTMLElement;
    const equationCharacters: string[] = [" "];
    const tempArray: string[] = [];
    const condensedEquation: (string | number)[] = [];

    function getCalculatorValue(value: string){
        equationCharacters.push(value);
        const firstValue = equationCharacters[1];
        const secondToLastValue = equationCharacters.at(-2);
        if(firstValue === undefined || secondToLastValue === undefined){
            return equationCharacters.pop();
        }
        // This check stops the first (except -) and last values from being arithmetic operators
        if("+×÷.".includes(firstValue) || ("+×÷.".includes(value) && "+-×÷.".includes(secondToLastValue))){
            return equationCharacters.pop();
        } 
        equationDisplay.value = equationCharacters.join(""); 
    }

    function calculate(){
        createEquation();
        // This check checks if an equation has at least 2 numbers and an arithmetic operation before executing the next steps
        if(condensedEquation.length < 3){
            resetCalculator();
            return equationDisplay.value = "ERROR";
        } 
        let finalNumber = solveEquation();
        if(finalNumber === Infinity){
            resetCalculator();
            return equationDisplay.value = "ERROR";
        }
        const result = (parseFloat(finalNumber.toFixed(5))).toString();
        equationDisplay.value = result; 
        prevEquationDisplay.textContent = equationCharacters.join("");
        equationCharacters.length = 1;
        equationCharacters.push(result);
    }

    function createEquation(): void{
        condensedEquation.length = 0;
        // The loop condenses every value of the equationCharacters array into numbers and arithmetic operations that are pushed into
        // the condensedEquation array
        for(let i = 1; i < equationCharacters.length; i++){
            const char = equationCharacters[i];
            const previousChar = equationCharacters[i - 1];
            if(char === undefined || previousChar === undefined){
                continue;
            }
            if(i === 1 && char === "-"){
                tempArray.push(char);
            }
            else if("+×÷".includes(char) || (char === "-" && !"+-×÷".includes(previousChar))){
                condensedEquation.push(Number(tempArray.join("")));
                tempArray.length = 0;
                condensedEquation.push(char);
            }
            else{
                tempArray.push(char);
                if(i === equationCharacters.length - 1){
                    condensedEquation.push(Number(tempArray.join("")));
                    tempArray.length = 0;
                }
            }
        }
    }

    // This function splices the condensedEquation array until there is only one last value, which is the answer
    function solveEquation(): number{
        while(condensedEquation.includes("÷") || condensedEquation.includes("×")){
            for(let i = 1; i < condensedEquation.length - 1; i++){
                const beforeOperator = Number(condensedEquation[i - 1]);
                const afterOperator = Number(condensedEquation[i + 1]);
                if(condensedEquation[i] === "×" || condensedEquation[i] === "÷"){
                    condensedEquation.splice(i - 1, 3, condensedEquation[i] === "×" ? beforeOperator * afterOperator : beforeOperator / afterOperator);
                    break;
                }
            }
        }
        while(condensedEquation.includes("-") || condensedEquation.includes("+")){
            for(let j = 1; j < condensedEquation.length - 1; j++){
                const beforeOperator = Number(condensedEquation[j - 1]);
                const afterOperator = Number(condensedEquation[j + 1]);
                if(condensedEquation[j] === "+" || condensedEquation[j] === "-"){
                    condensedEquation.splice(j - 1, 3, condensedEquation[j] === "+" ? beforeOperator + afterOperator : beforeOperator - afterOperator);
                    break;
                }
            }
        }
        return Number(condensedEquation[0]);
    }

    function resetCalculator(){
        equationCharacters.length = 1;
        condensedEquation.length = 0;
        tempArray.length = 0;
        prevEquationDisplay.textContent = "";
        equationDisplay.value = "";
    }

    return {getCalculatorValue, resetCalculator, calculate}
}

const {getCalculatorValue, resetCalculator, calculate} = CalculatorGenerator();

(document.getElementById("btn-1") as HTMLElement).onclick = () => getCalculatorValue("1");
(document.getElementById("btn-2") as HTMLElement).onclick = () => getCalculatorValue("2");
(document.getElementById("btn-3") as HTMLElement).onclick = () => getCalculatorValue("3");
(document.getElementById("btn-4") as HTMLElement).onclick = () => getCalculatorValue("4");
(document.getElementById("btn-5") as HTMLElement).onclick = () => getCalculatorValue("5");
(document.getElementById("btn-6") as HTMLElement).onclick = () => getCalculatorValue("6");
(document.getElementById("btn-7") as HTMLElement).onclick = () => getCalculatorValue("7");
(document.getElementById("btn-8") as HTMLElement).onclick = () => getCalculatorValue("8");
(document.getElementById("btn-9") as HTMLElement).onclick = () => getCalculatorValue("9");
(document.getElementById("btn-0") as HTMLElement).onclick = () => getCalculatorValue("0");
(document.getElementById("btn-.") as HTMLElement).onclick = () => getCalculatorValue(".");

(document.getElementById("btn-+") as HTMLElement).onclick = () => getCalculatorValue("+");
(document.getElementById("btn--") as HTMLElement).onclick = () => getCalculatorValue("-");
(document.getElementById("btn-×") as HTMLElement).onclick = () => getCalculatorValue("×");
(document.getElementById("btn-÷") as HTMLElement).onclick = () => getCalculatorValue("÷");

(document.getElementById("btn-AC") as HTMLElement).onclick = () => resetCalculator();
(document.getElementById("btn-=") as HTMLElement).onclick = () => calculate();