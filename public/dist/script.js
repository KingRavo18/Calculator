function CalculatorGenerator() {
    const equationDisplay = document.getElementById("equation-display");
    const equationCharacters = [" "];
    const tempArray = [];
    const condensedEquation = [];
    function getCalculatorValue(value) {
        equationCharacters.push(value);
        const firstValue = equationCharacters[1];
        const secondToLastValue = equationCharacters.at(-2);
        if (firstValue === undefined || secondToLastValue === undefined) {
            return equationCharacters.pop();
        }
        // This check stops the first (except -) and last values from being arithmetic operators
        if ("+x÷.".includes(firstValue) || ("+x÷.".includes(value) && "+-x÷.".includes(secondToLastValue))) {
            return equationCharacters.pop();
        }
        equationDisplay.value = equationCharacters.join("");
    }
    function calculate() {
        createEquation();
        // This check checks if an equation has at least 2 numbers and an arithmetic operation before executing the next steps
        if (condensedEquation.length < 3) {
            resetCalculator();
            return equationDisplay.value = "ERROR";
        }
        let finalNumber = solveEquation();
        if (finalNumber === Infinity) {
            resetCalculator();
            return equationDisplay.value = "ERROR";
        }
        const result = (parseFloat(finalNumber.toFixed(5))).toString();
        equationDisplay.value = result;
        equationCharacters.length = 1;
        equationCharacters.push(result);
    }
    function createEquation() {
        condensedEquation.length = 0;
        // The loop condenses every value of the equationCharacters array into numbers and arithmetic operations that are pushed into
        // the condensedEquation array
        for (let i = 1; i < equationCharacters.length; i++) {
            const char = equationCharacters[i];
            const previousChar = equationCharacters[i - 1];
            if (char === undefined || previousChar === undefined) {
                continue;
            }
            if (i === 1 && char === "-") {
                tempArray.push(char);
            }
            else if ("+x÷".includes(char) || (char === "-" && !"+-x÷".includes(previousChar))) {
                condensedEquation.push(Number(tempArray.join("")));
                tempArray.length = 0;
                condensedEquation.push(char);
            }
            else {
                tempArray.push(char);
                if (i === equationCharacters.length - 1) {
                    condensedEquation.push(Number(tempArray.join("")));
                    tempArray.length = 0;
                }
            }
        }
    }
    function solveEquation() {
        let finalNumber = 0;
        while (condensedEquation.includes("÷") || condensedEquation.includes("x")) {
            for (let i = 1; i < condensedEquation.length - 1; i++) {
                console.log(condensedEquation);
                if (condensedEquation[i] === "x") {
                    condensedEquation.splice(i - 1, 3, Number(condensedEquation[i - 1] * condensedEquation[i + 1]));
                    break;
                }
                else if (condensedEquation[i] === "÷") {
                    condensedEquation.splice(i - 1, 3, Number(condensedEquation[i - 1] / condensedEquation[i + 1]));
                    break;
                }
            }
        }
        while (condensedEquation.includes("-") || condensedEquation.includes("+")) {
            finalNumber = condensedEquation[0];
            for (let j = 1; j < condensedEquation.length - 1; j++) {
                console.log(condensedEquation);
                if (condensedEquation[j] === "+") {
                    condensedEquation.splice(j - 1, 3, Number(condensedEquation[j - 1] + condensedEquation[j + 1]));
                    break;
                }
                else if (condensedEquation[j] === "-") {
                    condensedEquation.splice(j - 1, 3, Number(condensedEquation[j - 1] - condensedEquation[j + 1]));
                    break;
                }
            }
        }
        finalNumber = condensedEquation[0];
        return finalNumber;
    }
    function resetCalculator() {
        equationCharacters.length = 1;
        condensedEquation.length = 0;
        tempArray.length = 0;
        equationDisplay.value = "";
    }
    return { getCalculatorValue, resetCalculator, calculate };
}
const { getCalculatorValue, resetCalculator, calculate } = CalculatorGenerator();
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
document.getElementById("btn-x").onclick = () => getCalculatorValue("x");
document.getElementById("btn-÷").onclick = () => getCalculatorValue("÷");
document.getElementById("btn-AC").onclick = () => resetCalculator();
document.getElementById("btn-=").onclick = () => calculate();
export {};
//# sourceMappingURL=script.js.map