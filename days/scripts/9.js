const inputTextArea = document.getElementById("inputTextArea");
const inputButton = document.getElementById("inputButton");
const outputText = document.getElementById("outputText");
const outputDiv = document.getElementById("outputDiv");

inputButton.onclick = onInputButtonClick;

function onInputButtonClick(){
    let inputText = inputTextArea.value;
    
    inputText ? ProcessInput(inputText) : inputText;
}

function GetSubtractedValues(sourceValues){
    return sourceValues.map((element, index, arr) => {
        return index < arr.length ? arr[index + 1] - element : null;
    });
}

function GetNextValue(values){
    values.reverse();
    let accValue = 0;
    for (let i = 0; i < values.length; i++){
        accValue += parseInt(values[i][values[i].length - 1]);
    }
    return accValue;
}

function GetPrevValue(values){
    values.reverse();
    let accValue = 0;
    for (let i = 0; i < values.length; i++){
        accValue = parseInt(values[i][0]) - accValue;
    }
    return accValue;
}

function ProcessInput(inputText){
    outputDiv.classList.toggle("toggled");

    const lines = inputText.split("\n");
    let total = 0;

    lines.forEach(element => {
        let valueRow = element.split(/\s+/g);
        let subtractedValues = [];
        subtractedValues.push(valueRow);
        while (subtractedValues[subtractedValues.length - 1].find(c => c != 0) != undefined){
            subtractedValues.push(GetSubtractedValues(subtractedValues[subtractedValues.length - 1].filter(v => v != null)));
            subtractedValues[subtractedValues.length - 1].pop();
        }
        total += GetPrevValue(subtractedValues);
    });

    outputText.innerHTML = `Total: ${total}`;
}