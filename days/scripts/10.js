const inputTextArea = document.getElementById("inputTextArea");
const inputButton = document.getElementById("inputButton");
const outputText = document.getElementById("outputText");
const outputDiv = document.getElementById("outputDiv");

inputButton.onclick = onInputButtonClick;

function onInputButtonClick(){
    let inputText = inputTextArea.value;
    
    inputText ? ProcessInput(inputText) : inputText;
}

const Up = "Up";
const Down = "Down";
const Left = "Left";
const Right = "Right";

const UR = "L";
const UL = "J";
const DR = "F";
const DL = "7";
const UD = "|";
const LR = "-";
const EMPTY = ".";
const START = "S";

function getOppositeDirection(originDirection){
    switch (originDirection){
        case Up:
            return Down;
        case Down:
            return Up;
        case Right:
            return Left;
        case Left:
            return Right;
    }

}

class Node{
    constructor(x, y, sign){
        this.x = x;
        this.y = y;
        this.sign = sign;
    }

    determineMatchingDirection(matchDirection){
        switch (matchDirection){
            case Up:
                if (this.sign == UL || this.sign == UR || this.sign == UD){
                    return true;
                }
            case Down:
                if (this.sign == DL || this.sign == DR || this.sign == UD){
                    return true;
                }
            case Left:
                if (this.sign == UL || this.sign == DL || this.sign == LR){
                    return true;
                }
            case Right:
                if (this.sign == UR || this.sign == DR || this.sign == LR){
                    return true;
                }
        }
        return false;
    }
}

class NodeMap{
    constructor(map, startNode){
        this.map = map;
        this.startNode = startNode;
        this.determineStartNodeSign();
    }

    getNextNode(node, originDirection){
        switch (node.sign){
            case UR:{
                if (originDirection == Up){
                    return { node: this.map[node.x + 1][node.y], nextOriginDir: getOppositeDirection(Right) };
                }
                return { node: this.map[node.x][node.y - 1], nextOriginDir: getOppositeDirection(Up) };
            }
            case UL:{
                if (originDirection == Up){
                    return { node: this.map[node.x - 1][node.y], nextOriginDir: getOppositeDirection(Left) };
                }
                return { node: this.map[node.x][node.y - 1], nextOriginDir: getOppositeDirection(Up) };
            }
            case DR:{
                if (originDirection == Down){
                    return { node: this.map[node.x + 1][node.y], nextOriginDir: getOppositeDirection(Right) };
                }
                return { node: this.map[node.x][node.y + 1], nextOriginDir: getOppositeDirection(Down) };
            }
            case DL:{
                if (originDirection == Down){
                    return { node: this.map[node.x - 1][node.y], nextOriginDir: getOppositeDirection(Left) };
                }
                return { node: this.map[node.x][node.y + 1], nextOriginDir: getOppositeDirection(Down) };
            }
            case UD:{
                if (originDirection == Up){
                    return { node: this.map[node.x][node.y + 1], nextOriginDir: getOppositeDirection(Down) };
                }
                return { node: this.map[node.x][node.y - 1], nextOriginDir: getOppositeDirection(Up) };
            }
            case LR:{
                if (originDirection == Left){
                    return { node: this.map[node.x + 1][node.y], nextOriginDir: getOppositeDirection(Right) };
                }
                return { node: this.map[node.x - 1][node.y], nextOriginDir: getOppositeDirection(Left) };
            }
        }
    }

    determineStartNodeSign(){
        let upFound = false;
        if (this.startNode.y > 0){
            upFound = this.map[this.startNode.x][this.startNode.y - 1].determineMatchingDirection(getOppositeDirection(Up));
        }
        let downFound = false;
        if (this.startNode.y < this.map[this.startNode.x].length){
            downFound = this.map[this.startNode.x][this.startNode.y + 1].determineMatchingDirection(getOppositeDirection(Down));
        }
        let leftFound = false;
        if (this.startNode.x > 0){
            leftFound = this.map[this.startNode.x - 1][this.startNode.y].determineMatchingDirection(getOppositeDirection(Left));
        }
        let rightFound = false;
        if (this.startNode.x < this.map.length){
            rightFound = this.map[this.startNode.x + 1][this.startNode.y].determineMatchingDirection(getOppositeDirection(Right));
        }

        if (upFound){
            if (rightFound)
                this.startNode.sign = UR;
            if (leftFound)
                this.startNode.sign = UL;
            if (downFound)
                this.startNode.sign = UD;
        }
        else if (downFound){
            if (rightFound)
                this.startNode.sign = DR;
            if (leftFound)
                this.startNode.sign = DL;
        }
        else
            this.startNode.sign = LR;
    }
}

function ProcessInput(inputText){
    outputDiv.classList.toggle("toggled");

    const lines = inputText.split("\n");
    let nodeMapArrays = [];
    let startNode = null;
    let total = 0;

    for (let y = 0; y < lines.length; y++){
        let row = lines[y].split("");
        for (let x = 0; x < row.length; x++){
            let node = new Node(x, y, row[x]);
            if (node.sign == START)
                startNode = node;
            if (nodeMapArrays[x] === undefined)
                nodeMapArrays[x] = [];
            nodeMapArrays[x][y] = node;
        }
    }

    let nodeMap =  new NodeMap(nodeMapArrays, startNode);
    let currentNodeObject = { node: nodeMap.startNode, nextOriginDir: Right };

    while (true){
        currentNodeObject = nodeMap.getNextNode(currentNodeObject.node, currentNodeObject.nextOriginDir);
        total++;
        if (currentNodeObject.node == nodeMap.startNode)
            break;
    }

    total = total / 2;

    outputText.innerHTML = `Total: ${total}`;
}