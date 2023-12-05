const inputTextArea = document.getElementById("inputTextArea");
const inputButton = document.getElementById("inputButton");
const outputText = document.getElementById("outputText");
const outputDiv = document.getElementById("outputDiv");

inputButton.onclick = onInputButtonClick;

function onInputButtonClick(){
    let inputText = inputTextArea.value;
    
    inputText ? ProcessInput(inputText) : inputText;
}

function ProcessInput(inputText){
    outputDiv.classList.toggle("toggled");

    let arr = inputText.split("\n");
    let total = 0;

    arr.forEach(element => {
        let matchesRaw = Array.from(element.matchAll(/(?=([0-9]|one|two|three|four|five|six|seven|eight|nine))/g));
        let matches = [];
        matchesRaw.forEach(e =>{
            e ?
            e.forEach(e2 =>{
                e2 != null && e2 != "" ? matches.push(e2) : e2
            }) : e;

        })
        
        console.log(matches);

        if (matches){
            let addition = 0;
            if (matches.length == 1){
                addition = parseInt(getNumber(matches[0]) + getNumber(matches[0]));
                total += addition;
                console.log(addition);
                return;
            }
            addition = parseInt(getNumber(matches[0]) + getNumber(matches[matches.length - 1]));
            total += addition;
            console.log(addition);
        }
    });

    outputText.innerHTML = `Total: ${total}`;
}

function getNumber(string){
    if (string.match(/[0-9]/g))
        return string;

    let val = 0;

    switch (string){
        case 'one':
            val = "1";
            break;
        case 'two':
            val = "2";
            break;
        case 'three':
            val = "3";
            break;
        case 'four':
            val = "4";
            break;
        case 'five':
            val = "5";
            break;
        case 'six':
            val = "6";
            break;
        case 'seven':
            val = "7";
            break;
        case 'eight':
            val = "8";
            break;
        case 'nine':
            val = "9";
            break;
    }

    return val;
}