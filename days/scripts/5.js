const inputTextArea = document.getElementById("inputTextArea");
const inputButton = document.getElementById("inputButton");
const outputText = document.getElementById("outputText");
const outputDiv = document.getElementById("outputDiv");

inputButton.onclick = onInputButtonClick;

function onInputButtonClick(){
    let inputText = inputTextArea.value;
    
    inputText ? ProcessInput(inputText) : inputText;
}

class SeedRange{
    constructor(seedRangeStart, rangeLength){
        this.SeedRangeStart = seedRangeStart;
        this.RangeLength = rangeLength;
    }
}

class MapRange{
    constructor(destinationRangeStart, sourceRangeStart, rangeLength){
        this.DestinationRangeStart = destinationRangeStart;
        this.SourceRangeStart = sourceRangeStart;
        this.RangeLength = rangeLength;
    }

    checkSourceValue(sourceValue){
        if (sourceValue >= this.SourceRangeStart && sourceValue < this.SourceRangeStart + this.RangeLength){
            // console.log(sourceValue, this.DestinationRangeStart, this.SourceRangeStart, this.RangeLength, true);
            // console.log(rangeOffset);
            return this.DestinationRangeStart + (sourceValue - this.SourceRangeStart);
        }

        // console.log(sourceValue, this.DestinationRangeStart, this.SourceRangeStart, this.RangeLength, false);
        return -1;
    }
}

class AlmanacMap{
    constructor(){
        this.MapRanges = [];
    }

    addRangeToMap(destinationRangeStart, sourceRangeStart, rangeLength){
        let mapRange = new MapRange(destinationRangeStart, sourceRangeStart, rangeLength);
        this.MapRanges.push(mapRange);
    }

    getDestinationValue(sourceValue){
        let returnValue = sourceValue;
        this.MapRanges.find(mapRange => {
            let checkedValue = mapRange.checkSourceValue(sourceValue);
            let foundValue = checkedValue >= 0;
            returnValue = foundValue ? checkedValue : returnValue;
            return foundValue;
        });
        // console.log(returnValue);
        return returnValue;
    }
}

function ProcessInput(inputText){
    outputDiv.classList.toggle("toggled");

    let arr = inputText.split("\n");
    let answer = Number.MAX_SAFE_INTEGER;
    // let seeds = [];
    let seedRanges = [];
    let almanacMaps = [];
    
    // let seedsStringSplit = arr[0].split(": ");
    // seedsStringSplit[1].split(" ").forEach(seed => seeds.push(parseInt(seed)));
    let seedsStringSplit = arr[0].split(": ");
    let seedRangeStart = -1;
    seedsStringSplit[1].split(" ").forEach(seedRangeData => {
        if (seedRangeStart < 0){
            seedRangeStart = parseInt(seedRangeData);
            return;
        }
        seedRanges.push(new SeedRange(seedRangeStart, parseInt(seedRangeData)));
        seedRangeStart = -1;
    });

    let buildingMap = false;
    let currentMap = null;
    arr.forEach(element => {
        if (element.match(/(\w-to-\w)/g)){
            buildingMap = true;
            currentMap = new AlmanacMap();
            return;
        }
        else if(buildingMap && !element.match(/([0-9])/g)){
            buildingMap = false;
            almanacMaps.push(currentMap);
            return;
        }

        if (!buildingMap){
            return;
        }

        let currentRange = element.split(" ");
        currentMap.addRangeToMap(parseInt(currentRange[0]), parseInt(currentRange[1]), parseInt(currentRange[2]));
    });

    if (buildingMap){
        buildingMap = false;
        almanacMaps.push(currentMap);
    }
    
    // seeds.forEach(seed => {
    //     let value = seed;
    //     almanacMaps.forEach(almanac => {
    //         value = almanac.getDestinationValue(value);
    //     });
    //     answer = answer < value ? answer : value;
    // });
    seedRanges.forEach(seedRange => {
        for(let i = seedRange.SeedRangeStart; i < seedRange.SeedRangeStart + seedRange.RangeLength; i++){
            let value = i;
            // console.log("Testing seed: " + value);
            almanacMaps.forEach(almanac => {
                value = almanac.getDestinationValue(value);
            });
            answer = answer < value ? answer : value;
        }
    });

    // console.log(seedRanges);
    outputText.innerHTML = `Answer: ${answer}`;
}