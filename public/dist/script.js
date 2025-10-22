const equationDisplay = document.getElementById("equation-display");
const equationCharacters = [];
let equation = "";
function getCalculatorValue(value) {
    equationCharacters.push(value);
    if (value === "+" || value === "-" || value === "*" || value === "/" || value === ".") {
        if (equationCharacters.at(-2) === "+" || equationCharacters.at(-2) === "-" || equationCharacters.at(-2) === "*" || equationCharacters.at(-2) === "/" || equationCharacters.at(-2) === ".") {
            equationCharacters.pop();
            return;
        }
    }
    equation = equationCharacters.join("");
    equationDisplay.value = equation;
}
function clearDisplay() {
    equation = "";
    equationCharacters.length = 0;
    equationDisplay.value = equation;
}
function getError() {
    clearDisplay();
    equationDisplay.value = "ERROR";
}
document.getElementById("btn-1").onclick = () => getCalculatorValue("1");
document.getElementById("btn-2").onclick = () => getCalculatorValue("2");
document.getElementById("btn-3").onclick = () => getCalculatorValue("3");
document.getElementById("btn-4").onclick = () => getCalculatorValue("4");
document.getElementById("btn-5").onclick = () => getCalculatorValue("5");
document.getElementById("btn-6").onclick = () => getCalculatorValue("6");
document.getElementById("btn-7").onclick = () => getCalculatorValue("7");
document.getElementById("btn-8").onclick = () => getCalculatorValue("8");
document.getElementById("btn-9").onclick = () => getCalculatorValue("9");
document.getElementById("btn-0").onclick = () => getCalculatorValue("0");
document.getElementById("btn-.").onclick = () => getCalculatorValue(".");
document.getElementById("btn-+").onclick = () => getCalculatorValue("+");
document.getElementById("btn--").onclick = () => getCalculatorValue("-");
document.getElementById("btn-*").onclick = () => getCalculatorValue("*");
document.getElementById("btn-/").onclick = () => getCalculatorValue("/");
document.getElementById("btn-AC").onclick = () => clearDisplay();
document.getElementById("btn-=").onclick = () => getError();
export {};
//# sourceMappingURL=script.js.map