const equationDisplay = document.getElementById("equation-display") as HTMLInputElement;
const equationCharacters: string[] = [];
const tempArray: any[] = [];
const condensedEquation: any[] = [];
let finalNumber: number;
let visibleEquation = "";

function getCalculatorValue(value: string): void{
    equationCharacters.push(value);
    if(value === "+" || value === "-" || value === "*" || value === "/" || value === "."){
        if(equationCharacters.at(-2) === "+" || equationCharacters.at(-2) === "-" || equationCharacters.at(-2) === "*" || equationCharacters.at(-2) === "/" || equationCharacters.at(-2) === "."){
            equationCharacters.pop();
            return;
        }
    }
    visibleEquation = equationCharacters.join("");
    equationDisplay.value = visibleEquation; 
}

function calculateValue(): void{
    condensedEquation.length = 0;
    for(let i = 0; i < equationCharacters.length; i++){
        if(Number(equationCharacters[i]) || equationCharacters[i] === "."){
            tempArray.push(equationCharacters[i]);
            if(i === equationCharacters.length - 1){
                condensedEquation.push(Number(tempArray.join("")));
                tempArray.length = 0;
            }
        } else {
            condensedEquation.push(Number(tempArray.join("")));
            tempArray.length = 0;
            condensedEquation.push(equationCharacters[i]);
        }
    }

    for(let j = 0; j < condensedEquation.length; j++){
        if(j === 0){
            finalNumber = condensedEquation[j];
        }else if(Number.isInteger(condensedEquation[j])){
            if(condensedEquation[j - 1] === "+"){
                finalNumber += condensedEquation[j];
            }
            if(condensedEquation[j - 1] === "*"){
                finalNumber *= condensedEquation[j];
            }
            if(condensedEquation[j - 1] === "-"){
                finalNumber -= condensedEquation[j];
            }
            if(condensedEquation[j - 1] === "/"){
                finalNumber /= condensedEquation[j];
            }
        }
    }

    visibleEquation = (finalNumber).toString();
    equationDisplay.value = visibleEquation; 
}

function clearDisplay(): void{
    visibleEquation = "";
    equationCharacters.length = 0;
    condensedEquation.length = 0;
    tempArray.length = 0;
    equationDisplay.value = visibleEquation;
}

function getError(): void{
    clearDisplay();
    equationDisplay.value = "ERROR";
}

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

(document.getElementById("btn-AC") as HTMLElement).onclick = () => clearDisplay();
(document.getElementById("btn-=") as HTMLElement).onclick = () => calculateValue();