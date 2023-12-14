const inputTextArea = document.getElementById("inputTextArea");
const inputButton = document.getElementById("inputButton");
const outputText = document.getElementById("outputText");
const outputDiv = document.getElementById("outputDiv");

inputButton.onclick = onInputButtonClick;

function onInputButtonClick(){
    let inputText = inputTextArea.value;
    
    inputText ? ProcessInput(inputText) : inputText;
}

const EMPTY = ".";
const GALAXY = "#";
const SIZE_INCREASE = 9;
let nodeIds = 0;
let galaxies = [];

class Node{
    constructor(isGalaxy){
        this.isGalaxy = isGalaxy;
        this.id = nodeIds++;
        this.comparedNodes = [];
    }

    equals(node){
        return node.id === this.id;
    }

    setCoords(x, y){
        this.x = x;
        this.y = y;
    }

    getDistanceFromNode(node){
        if (this.comparedNodes.find(cn => cn.equals(node)) != undefined)
            return 0;

        this.comparedNodes.push(node);
        node.comparedNodes.push(this);
        // console.log("Distance between other (x = " + node.x + ", y = " + node.y + ") and this (x = " + this.x + ", y = " + this.y + ") is " + (Math.abs(node.x - this.x) + Math.abs(node.y - this.y)));
        return (Math.abs(node.x - this.x) + Math.abs(node.y - this.y));
    }
}

class NodeMap{
    constructor(nodeArrays){
        this.map = nodeArrays;
    }

    checkAndExpandColumns(){
        let sizeIncrement = 0;
        for (let x = 0; x < this.map.length; x++){
            if (this.map[x].find(node => node.isGalaxy) === undefined){
                InsertColumnsIntoMap(x + sizeIncrement);
                sizeIncrement += SIZE_INCREASE;
            }
        }
    }

    checkAndExpandRows(){
        let rows = [];
        for (let x = 0; x < this.map.length; x++){
            for (let y = 0; y < this.map[0].length; y++){
                if (rows[y] === undefined)
                    rows[y] = [];
                rows[y][x] = this.map[x][y];
            }
        }
        let sizeIncrement = 0;
        for (let y = 0; y < rows.length; y++){
            if (rows[y].find(node => node.isGalaxy) === undefined){
                InsertRowsIntoMap(y + sizeIncrement);
                sizeIncrement += SIZE_INCREASE;
            }
        }
    }

    checkAndRefreshNodes(){
        this.checkAndExpandColumns();
        this.checkAndExpandRows();
    }

    logMap(){
        let rows = [];
        for (let x = 0; x < this.map.length; x++){
            for (let y = 0; y < this.map[0].length; y++){
                if (rows[y] === undefined)
                    rows[y] = [];
                rows[y][x] = this.map[x][y];
            }
        }
        rows.forEach(row => {
            let rowPrint = "";
            row.forEach(node => {
                rowPrint += node.isGalaxy ? GALAXY : EMPTY;
            });
            console.log(rowPrint);
        });
    }
}

function InsertColumnsIntoMap(colNr){
    galaxies.forEach(gal => {
        if (gal.x > colNr)
            gal.setCoords(gal.x + SIZE_INCREASE, gal.y);
    });
}

function InsertRowsIntoMap(rowNr){
    galaxies.forEach(gal => {
        if (gal.y > rowNr)
            gal.setCoords(gal.x, gal.y + SIZE_INCREASE);
    });
}

function ProcessInput(inputText){
    outputDiv.classList.toggle("toggled");

    const lines = inputText.split("\n");
    let nodeArrays = [];
    let total = 0;
    
    for (let y = 0; y < lines.length; y++){
        let row = lines[y].split("");
        for (let x = 0; x < row.length; x++){
            let node = new Node(row[x] == GALAXY);
            if (node.isGalaxy){
                node.setCoords(x, y);
                galaxies.push(node);
            }
            if (nodeArrays[x] === undefined)
                nodeArrays[x] = [];
            nodeArrays[x][y] = node;
        }
    }

    let nodeMap = new NodeMap(nodeArrays);
    nodeMap.checkAndRefreshNodes();
    // nodeMap.logMap();
    galaxies.forEach(gal => {
        galaxies.forEach(other => {
            total += gal.getDistanceFromNode(other);
        });
    });

    outputText.innerHTML = `Total: ${total}`;
}