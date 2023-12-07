const inputTextArea = document.getElementById("inputTextArea");
const inputButton = document.getElementById("inputButton");
const outputText = document.getElementById("outputText");
const outputDiv = document.getElementById("outputDiv");

inputButton.onclick = onInputButtonClick;

function onInputButtonClick(){
    let inputText = inputTextArea.value;
    
    inputText ? ProcessInput(inputText) : inputText;
}

class CardHand{
    constructor(cardArr, bid){
        this.hand = cardArr.map((e, i, arr) => {
            return {label: e, amount: arr.filter(a => (a === e || a === "J")).length};
        });
        this.bid = bid;
        this.debugHand = cardArr.map(e => e);
    }

    get HandValue(){
        let jokers = this.hand.filter(h => h.label === "J").length;
        if (this.hand.filter(h => h.amount === 5).length > 0) return 7;
        if (this.hand.filter(h => h.amount === 4).length > 0) return 6;
        if (this.hand.filter(h => h.amount === 3).length > 0){
            if (this.hand.filter(h => h.amount === 3).length > 3) return 5;
            if (this.hand.filter(h => h.amount === 2).length === 2 && jokers <= 0) return 5;
            return 4;
        }
        if (this.hand.filter(h => h.amount === 2).length >= 4){
            if (jokers > 0) return 2;
            return 3;
        }
        if (this.hand.filter(h => h.amount === 2).length > 0) return 2;
        return 1;
    }

    get TieBreaker(){
        let cardValueString = "";
        this.hand.forEach(c => cardValueString += this.getCardValueString(c.label));
        return cardValueString;
    }

    getCardValueString(cardString){
        switch(cardString){
            case "A": return "n"; case "K": return "m"; case "Q": return "l";
            // case "J": return "k"; 
            case "T": return "j"; case "9" : return "i";
            case "8": return "h"; case "7": return "g"; case "6": return "f"; 
            case "5": return "e"; case "4" : return "d"; case "3": return "c"; 
            case "2": return "b"; 
            case "J": return "a";
            default: return cardString;
        }
    }
}

function ProcessInput(inputText){
    outputDiv.classList.toggle("toggled");

    let hands = [];
    const lines = inputText.split("\n");
    lines.forEach(element => {
        const handAndBid = element.split(" ");
        hands.push(new CardHand(handAndBid[0].split(""), parseInt(handAndBid[1])));
    });

    let total = 0;
    hands.sort((a, b) => {
        if (a.HandValue > b.HandValue || (a.HandValue == b.HandValue && a.TieBreaker > b.TieBreaker))
            return 1;
        if (a.HandValue < b.HandValue || (a.HandValue == b.HandValue && a.TieBreaker < b.TieBreaker))
            return -1;
    });

    for (let i = 0; i < hands.length; i++){
        if (hands[i].HandValue > 3 && hands[i].HandValue < 6)
        total += (i + 1) * hands[i].bid;
    }

    outputText.innerHTML = `Total: ${total}`;
}