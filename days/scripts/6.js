const inputTextArea = document.getElementById("inputTextArea");
const inputButton = document.getElementById("inputButton");
const outputText = document.getElementById("outputText");
const outputDiv = document.getElementById("outputDiv");

inputButton.onclick = onInputButtonClick;

function onInputButtonClick(){
    let inputText = inputTextArea.value;
    
    inputText ? ProcessInput(inputText) : inputText;
}

class Race{
    constructor(time, distance){
        this.Time = time;
        this.Distance = distance;
    }

    get WinningTimeAmounts(){
        let amount = 0;
        for (let i = 0; i < this.Time; i++){
            i * (this.Time - i) > this.Distance ? amount++ : amount;
        }
        console.log(amount);
        return amount;
    }
}

function ProcessInput(inputText){
    outputDiv.classList.toggle("toggled");

    // let races = [];
    // let total = 1;

    // let times = inputText.split("\n")[0].split(":")[1].trim().split(/\s+/g);
    // let distances = inputText.split("\n")[1].split(":")[1].trim().split(/\s+/g);
    // for (let i = 0; i < times.length; i++){
    //     races.push(new Race(times[i], distances[i]));
    // };
    
    let timeString = "";
    inputText.split("\n")[0].split(":")[1].trim().split(/\s+/g).forEach(t => timeString += t);
    let distanceString = "";
    inputText.split("\n")[1].split(":")[1].trim().split(/\s+/g).forEach(t => distanceString += t);

    // races.forEach(r => total *= r.WinningTimeAmounts);
    outputText.innerHTML = `Total: ${new Race(parseInt(timeString), parseInt(distanceString)).WinningTimeAmounts}`;
}