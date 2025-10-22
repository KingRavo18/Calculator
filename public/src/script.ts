const equationDisplay = document.getElementById("equation-display") as HTMLInputElement;
const equationCharacters: string[] = [];
let equation = "";

function getCalculatorValue(value: string): void{
    equationCharacters.push(value);
    if(value === "+" || value === "-" || value === "*" || value === "/" || value === "."){
        if(equationCharacters.at(-2) === "+" || equationCharacters.at(-2) === "-" || equationCharacters.at(-2) === "*" || equationCharacters.at(-2) === "/" || equationCharacters.at(-2) === "."){
            equationCharacters.pop();
            return;
        }
    }
    equation = equationCharacters.join("");
    equationDisplay.value = equation; 
}

function clearDisplay(): void{
    equation = "";
    equationCharacters.length = 0;
    equationDisplay.value = equation;
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
(document.getElementById("btn-=") as HTMLElement).onclick = () => getError();