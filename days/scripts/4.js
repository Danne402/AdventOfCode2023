const inputTextArea = document.getElementById("inputTextArea");
const inputButton = document.getElementById("inputButton");
const outputText = document.getElementById("outputText");
const outputDiv = document.getElementById("outputDiv");

inputButton.onclick = onInputButtonClick;

function onInputButtonClick(){
    let inputText = inputTextArea.value;
    
    inputText ? ProcessInput(inputText) : inputText;
}

let scratchCards = [];

class ScratchCard{
    constructor(winningNumbers, heldNumbers){
        this.WinningNumbers = winningNumbers;
        this.HeldNumbers = heldNumbers;
        this.Matches = this.getMatches();
        this.Copies = 1;
    }

    get PointValue(){
        return this.Matches > 0 ? Math.pow(2, this.Matches - 1) : 0;
    }

    getMatches(){
        let matches = 0;
        this.HeldNumbers.forEach(number => {
            if (this.WinningNumbers.includes(number))
            matches++;
        });
        return matches;
    }
}

function ProcessInput(inputText){
    outputDiv.classList.toggle("toggled");

    let arr = inputText.split("\n");
    let total = 0;
    
    arr.forEach(element => {
        let numbers = element.split(": ")[1].split(" | ");
        let winningNumbersString = numbers[0];
        let heldNumbersString = numbers[1];

        let winningNumbers = [];
        let heldNumbers = [];
        
        winningNumbersString.split(" ").forEach(number => {
            number ? winningNumbers.push(parseInt(number.trim())) : number;
        });
        heldNumbersString.split(" ").forEach(number => {
            number ? heldNumbers.push(parseInt(number.trim())) : number;
        });

        let scratchCard = new ScratchCard(winningNumbers, heldNumbers);
        scratchCards.push(scratchCard);
    });
    
    // scratchCards.forEach(card => {
    //     total += card.PointValue;
    // });

    for (let i = 0; i < scratchCards.length; i++){
        for (let w = i + 1; w < Math.min(i + scratchCards[i].Matches + 1, scratchCards.length); w++){
            scratchCards[w].Copies += scratchCards[i].Copies;
        }
        total += scratchCards[i].Copies;
    }

    console.log(scratchCards);
    outputText.innerHTML = `Total: ${total}`;
}