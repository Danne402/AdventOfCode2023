const inputTextArea = document.getElementById("inputTextArea");
const inputButton = document.getElementById("inputButton");
const outputText = document.getElementById("outputText");
const outputDiv = document.getElementById("outputDiv");

inputButton.onclick = onInputButtonClick;

function onInputButtonClick(){
    let inputText = inputTextArea.value;
    
    inputText ? ProcessInput(inputText) : inputText;
}

const redMax = 12;
const greenMax = 13;
const blueMax = 14;
let ballGames = [];

class BallGame{
    constructor(gameNumber, highestRed, highestGreen, highestBlue, lowestRed, lowestGreen, lowestBlue){
        this.GameNumber = gameNumber;
        this.HighestRed = highestRed;
        this.HighestGreen = highestGreen;
        this.HighestBlue = highestBlue;
        this.LowestRed = lowestRed;
        this.LowestGreen = lowestGreen;
        this.LowestBlue = lowestBlue;
        this.ValidGame = this.getScore() > 0;
        this.Score = this.getScore();
        this.GamePower = this.getGamePower();
    }

    getScore(){
        return (this.HighestRed <= redMax && 
        this.HighestGreen <= greenMax &&
        this.HighestBlue <= blueMax) ?
        this.GameNumber : 0;
    }

    getGamePower(){
        return this.HighestRed * this.HighestGreen * this.HighestBlue;
    }
}

function ProcessInput(inputText){
    outputDiv.classList.toggle("toggled");

    let arr = inputText.split("\n");
    let total = 0;

    arr.forEach(element => {
        let arr2 = element.split(": ");

        let reds = [];
        let redsStrings = arr2[1].match(/(?=. red|.. red|... red)+([0-9]|[1-9][0-9]|[1-9][0-9][0-9])\b/g);
        redsStrings.forEach(e => reds.push(parseInt(e)));
        let highestRed = 0;
        reds.forEach(e => highestRed = e > highestRed ? e : highestRed);
        let lowestRed = Number.MAX_SAFE_INTEGER;
        reds.forEach(e => lowestRed = e > lowestRed ? lowestRed : e);

        let greens = [];
        let greensStrings = arr2[1].match(/(?=. green|.. green|... green)+([0-9]|[1-9][0-9]|[1-9][0-9][0-9])\b/g);
        greensStrings.forEach(e => greens.push(parseInt(e)));
        let highestGreen = 0;
        greens.forEach(e => highestGreen = e > highestGreen ? e : highestGreen);
        let lowestGreen = Number.MAX_SAFE_INTEGER;
        greens.forEach(e => lowestGreen = e > lowestGreen ? lowestGreen : e);

        let blues = [];
        let bluesStrings = arr2[1].match(/(?=. blue|.. blue|... blue)+([0-9]|[1-9][0-9]|[1-9][0-9][0-9])\b/g);
        bluesStrings.forEach(e => blues.push(parseInt(e)));
        let highestBlue = 0;
        blues.forEach(e => highestBlue = e > highestBlue ? e : highestBlue);
        let lowestBlue = Number.MAX_SAFE_INTEGER;
        blues.forEach(e => lowestBlue = e > lowestBlue ? lowestBlue : e);

        let gameNumber = parseInt(arr2[0].match(/([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])\b/g));

        let ballGame = new BallGame(gameNumber,
            highestRed,
            highestGreen,
            highestBlue,
            lowestRed,
            lowestGreen,
            lowestBlue);

        total += ballGame.getGamePower();

        console.log(ballGame);
    });

    outputText.innerHTML = `Total: ${total}`;
}