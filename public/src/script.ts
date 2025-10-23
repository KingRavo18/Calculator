interface calculatorReturnTypes {
    getCalculatorValue: (value: string) => void;
    calculate: () => void;
    resetCalculator: () => void;
}

function ActivateCalculator(): calculatorReturnTypes{
    const equationDisplay = document.getElementById("equation-display") as HTMLInputElement;
    const equationCharacters: string[] = [];
    const tempArray: string[] = [];
    const condensedEquation: any[] = [];
    let displayedEquation = "";

    function getCalculatorValue(value: string){
        equationCharacters.push(value);
        if(value === "+" || value === "-" || value === "*" || value === "/" || value === "."){
            if(equationCharacters.at(-2) === "+" || 
               equationCharacters.at(-2) === "-" || 
               equationCharacters.at(-2) === "*" || 
               equationCharacters.at(-2) === "/" || 
               equationCharacters.at(-2) === "." || 
               equationCharacters[0] === "+" || 
               equationCharacters[0] === "*" || 
               equationCharacters[0] === "/" || 
               equationCharacters[0] === "."
            ){
                equationCharacters.pop();
                return;
            }
        }
        displayedEquation = equationCharacters.join("");
        equationDisplay.value = displayedEquation; 
    }

    function calculate(){
        createEquation();
        if(condensedEquation.length < 3){
            return;
        }
        let finalNumber = solveEquation();
        if(finalNumber === Infinity){
            resetCalculator();
            return equationDisplay.value = "ERROR";
        }
        displayedEquation = (parseFloat(finalNumber.toFixed(5))).toString();
        equationDisplay.value = displayedEquation; 
        equationCharacters.length = 0;
        equationCharacters.push(displayedEquation);
    }

    function createEquation(): void{
        condensedEquation.length = 0;
        for(let i = 0; i < equationCharacters.length; i++){
            const char = equationCharacters[i];
            if(char === undefined){
                continue;
            }
            if(!isNaN(Number(char)) || char === "."){
                tempArray.push(char);
                if(i === equationCharacters.length - 1){
                    condensedEquation.push(Number(tempArray.join("")));
                    tempArray.length = 0;
                }
            }else{
                condensedEquation.push(Number(tempArray.join("")));
                tempArray.length = 0;
                condensedEquation.push(char);
            }
        }
    }

    function solveEquation(): number{
        let finalNumber = 0;
        for(let j = 0; j < condensedEquation.length; j++){
            if(j === 0){
                finalNumber = condensedEquation[j];
            }else if(!isNaN(Number(condensedEquation[j]))){
                if(condensedEquation[j - 1] === "+") finalNumber += condensedEquation[j];
                if(condensedEquation[j - 1] === "*") finalNumber *= condensedEquation[j];
                if(condensedEquation[j - 1] === "-") finalNumber -= condensedEquation[j];
                if(condensedEquation[j - 1] === "/") finalNumber /= condensedEquation[j];
            }
        }
        return finalNumber;
    }

    function resetCalculator(){
        equationCharacters.length = 0;
        condensedEquation.length = 0;
        tempArray.length = 0;
        displayedEquation = "";
        equationDisplay.value = displayedEquation;
    }

    return {getCalculatorValue, resetCalculator, calculate}
}

const {getCalculatorValue, resetCalculator, calculate} = ActivateCalculator();

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
(document.getElementById("btn-*") as HTMLElement).onclick = () => getCalculatorValue("*");
(document.getElementById("btn-/") as HTMLElement).onclick = () => getCalculatorValue("/");

(document.getElementById("btn-AC") as HTMLElement).onclick = () => resetCalculator();
(document.getElementById("btn-=") as HTMLElement).onclick = () => calculate();