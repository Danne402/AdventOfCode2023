const inputTextArea = document.getElementById("inputTextArea");
const inputButton = document.getElementById("inputButton");
const outputText = document.getElementById("outputText");
const outputDiv = document.getElementById("outputDiv");

inputButton.onclick = onInputButtonClick;

function onInputButtonClick(){
    let inputText = inputTextArea.value;
    
    inputText ? ProcessInput(inputText) : inputText;
}

const CHECK_RADIUS = 1;
const CORRECT_GEAR_ENGINE_PART_ADJACENCY = 2;
let engineSchematic = [];
let engineParts = [];
let gears = [];

class EnginePart{
    constructor(row, startIndex, width, value){
        this.Row = row;
        this.StartIndex = startIndex;
        this.Width = width;
        this.Value = value;
    }

    getIsValidPart(){
        for(let i = Math.max((this.Row - CHECK_RADIUS), 0); 
        i < Math.min((this.Row + CHECK_RADIUS + 1), engineSchematic.length); 
        i++){
            if (this.checkEngineRowForValidity(i)){
                return true;
            }
        }
        return false;
    }

    checkEngineRowForValidity(row){
        let engineRow = engineSchematic[row];
        let validityFound = false;
        for(let i = Math.max((this.StartIndex - CHECK_RADIUS), 0); 
        i < Math.min((this.StartIndex + this.Width + CHECK_RADIUS), engineRow.length); 
        i++){
            if (isEngineSymbol(engineRow[i])){
                validityFound = true;
            }
        }
        return validityFound;
    }
}

class Gear{
    constructor(row, index){
        this.Row = row;
        this.Index = index;
        this.AdjacentEngineParts = [];
    }

    get IsValidGear(){
        return this.AdjacentEngineParts.length == CORRECT_GEAR_ENGINE_PART_ADJACENCY;
    }

    get GearRatio(){
        let gearRatio = 1;
        this.AdjacentEngineParts.forEach(part => {
            gearRatio *= part.Value;
        });
        return gearRatio;
    }

    checkIsAdjacentToEnginePart(enginePart){
        if (this.Row > enginePart.Row + CHECK_RADIUS ||
            this.Row < enginePart.Row - CHECK_RADIUS)
            return false;
        if (this.Index > enginePart.StartIndex + enginePart.Width + CHECK_RADIUS - 1 ||
            this.Index < enginePart.StartIndex - CHECK_RADIUS)
            return false;
        return true;
    }
}

function ProcessInput(inputText){
    outputDiv.classList.toggle("toggled");

    let arr = inputText.split("\n");
    let total = 0;
    let widthCounter = 0;
    let value = "";

    for (let y = 0; y < arr.length; y++){
        let engineRow = arr[y].split("");
        engineSchematic.push(engineRow);
        let widthCounter = 0;
        let value = "";
        for (let x = 0; x < engineRow.length; x++){
            if (isNumber(engineRow[x])){
                widthCounter++;
                value += engineRow[x];
            }
            else if (widthCounter > 0 && !isNumber(engineRow[x])){
                let enginePart = new EnginePart(y, x - widthCounter, widthCounter, parseInt(value));
                widthCounter = 0;
                value = "";
                engineParts.push(enginePart);
            }
            if (isGearSymbol(engineRow[x])){
                let gear = new Gear(y, x);
                gears.push(gear);
            }
        }
        if (widthCounter > 0){
            let enginePart = new EnginePart(y, engineRow.length - widthCounter, widthCounter, parseInt(value));
            engineParts.push(enginePart);
        }
    }

    // engineParts.forEach(element => {
    //     if (element.getIsValidPart()){
    //         total += element.Value;
    //     }
    // });

    gears.forEach(gear => {
        engineParts.forEach(part => {
            if (gear.checkIsAdjacentToEnginePart(part)){
                gear.AdjacentEngineParts.push(part);
            }
        });
        if (gear.IsValidGear){
            total += gear.GearRatio;
        }
    })

    console.log(gears);
    outputText.innerHTML = `Total: ${total}`;
}

function isNumber(input){
    return input.match(/[0-9]/g) ? true : false;
}

function isEngineSymbol(input){
    return input.match(/[^0-9.]/g) ? true : false;
}

function isGearSymbol(input){
    return input.match(/[*]/g) ? true : false;
}