const inputTextArea = document.getElementById("inputTextArea");
const inputButton = document.getElementById("inputButton");
const stopButton = document.getElementById("stopButton");
const outputText = document.getElementById("outputText");
const outputDiv = document.getElementById("outputDiv");

inputButton.onclick = onInputButtonClick;
stopButton.onclick = onStopButtonClick;

let stopProcessing = false;

function onInputButtonClick(){
    let inputText = inputTextArea.value;
    
    inputText ? ProcessInput(inputText) : inputText;
}
function onStopButtonClick(){
    stopProcessing = true;
}

class Node{
    constructor(coord, left, right){
        this.coord = coord;
        this.left = left;
        this.right = right;
    }
}

function ProcessInput(inputText){
    outputDiv.classList.toggle("toggled");

    let nodes = [];
    const lines = inputText.split("\n");
    let instructions = lines[0].split("");
    lines.splice(0, 2);

    lines.forEach(element => {
        let nodeData = element.split(" = ");
        let nodeLR = nodeData[1].match(/([\w\w\w])+/g);
        nodes.push(new Node(nodeData[0], nodeLR[0], nodeLR[1]));
    });

    // let currentCoord = "AAA";
    // let targetCoord = "ZZZ";
    let currentCoords = nodes.filter(n => n.coord.match(/\w\wA/g)).map(n => n.coord);
    let targetRegex = /\w\wZ/g;
    let total = 0;
    let i = 0;

    // while (currentCoord != targetCoord){
    //     if (i >= instructions.length){
    //         i = 0;
    //     }
    //     nodes.find(n => {
    //         if (n.coord === currentCoord){
    //             currentCoord = instructions[i] === "L" ? n.left : n.right;
    //             return true;
    //         }
    //     });
    //     total++;
    //     i++;
    // }

    let initialMatchDistances = [];
    let matchDistances = [];
    let currentMatches = 0;

    while (currentMatches < currentCoords.length){
        if (i >= instructions.length)
            i = 0;
        // currentCoords.forEach((coord, index) => {
        //     let node = nodes.filter(n => n.coord === coord);
        //     currentCoords[index] = instructions[i] === "L" ? node[0].left : node[0].right;
        // });
        currentCoords.forEach((coord, index) => {
            nodes.find(n => {
                if (n.coord === coord){
                    currentCoords[index] = instructions[i] === "L" ? n.left : n.right;
                    if (initialMatchDistances[index] != undefined && matchDistances[index] == undefined && currentCoords[index].match(targetRegex)){
                        matchDistances[index] = total - initialMatchDistances[index];
                        currentMatches++;
                    }
                    if (initialMatchDistances[index] == undefined && currentCoords[index].match(targetRegex)){
                        initialMatchDistances[index] = total;
                    }
                    return true;
                }
            });
        });

        total++;
        i++;
    }

    var gcd = function (a, b) {
        return a ? gcd(b % a, a) : b;
    }
    
    var lcm = function (a, b) {
        return a * b / gcd(a, b);
    }

    outputText.innerHTML = `Total: ${matchDistances.reduce(lcm)}`;
}