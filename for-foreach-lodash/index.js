/*
This code compares the performance of different nested loops constructed with  
for, foreach, for-of and lodash
*/

let mainCollection = []; // array for the outer loop
let secondaryCollection = []; // array for the inner loop

let resultDictionary = {};

const operationNameHeader = "Looping construct|";
const underlineText = "---|";
const underlineTextRightAligned = "---:|";

const testDataSet = [
    { mainCollectionSize: 500, secondaryCollectionSize: 125 },
    { mainCollectionSize: 2000, secondaryCollectionSize: 500 },
    { mainCollectionSize: 5000, secondaryCollectionSize: 1250 },
];

// add all the looping constructs in this array to compare
const functionsToCompare = [
    compareWithNestedForLoops,
    compareWithLodashForeachAndFor,
    compareWithLodashForeachAndAsyncFor,
    compareWithAsyncFunctionWithNestedForLoops,
    compareWithNestedForOfLoops,
];

// main execution starts here
for (const testData of testDataSet) {
    initReport(testData, resultDictionary);

    initMainCollection(mainCollection, testData.mainCollectionSize);

    initSecondaryCollection(
        secondaryCollection,
        testData.secondaryCollectionSize,
        testData.mainCollectionSize
    );

    console.log(`Testing performance with ${testData.mainCollectionSize} primary and ${testData.secondaryCollectionSize} secondary data...`);

    for (const func of functionsToCompare) {
        measureTime(func);
    }
}

logReport();

//#region Measurement and reporting functions

function measureTime(functionToExecute) {
    const startTime = Date.now();
    functionToExecute();
    const endTime = Date.now();
    updateReport(functionToExecute.name, startTime, endTime);
}

function initReport(testData) {
    resultDictionary[operationNameHeader] = `${
        resultDictionary[operationNameHeader] ?? ""
    }${testData.mainCollectionSize} & ${testData.secondaryCollectionSize}|`;

    resultDictionary[underlineText] = `${
        resultDictionary[underlineText] ?? ""
    }${underlineTextRightAligned}`;
}

function updateReport(funcName, startTime, endTime) {
    let operationName = funcName
        .replace(/([A-Z])/g, " $1")
        .replace("compare With ", "");
    let executionTime = endTime - startTime;

    operationName = operationName + "|";
    resultDictionary[operationName] = `${
        resultDictionary[operationName] ?? ""
    }${executionTime}|`;
}

function logReport() {
    console.log(resultDictionary);
    let resultTableForMdFile = `${operationNameHeader}${resultDictionary[operationNameHeader]}\n`;
    resultTableForMdFile += `${underlineText}${resultDictionary[underlineText]}`;

    for (const key of Object.keys(resultDictionary)) {
        if (key === operationNameHeader || key === underlineText) continue;
        resultTableForMdFile += `\n${key}${resultDictionary[key]}`;
    }
    console.log(resultTableForMdFile);
}

//#endregion

//#region Different comparison functions

function compareWithNestedForLoops() {
    for (let i in secondaryCollection) {
        for (let j in mainCollection) {
            if (mainCollection[j].id === secondaryCollection[i].id) {
                mainCollection[j].matched = true;
            }
        }
    }
}

function compareWithLodashForeachAndFor() {
    _.forEach(secondaryCollection, (item) => {
        for (let j in mainCollection) {
            if (mainCollection[j].id === item.id) {
                mainCollection[j].matched = true;
            }
        }
    });
}

async function compareWithLodashForeachAndAsyncFor() {
    _.forEach(secondaryCollection, async (item) => {
        for (let j in mainCollection) {
            if (mainCollection[j].id === item.id) {
                mainCollection[j].matched = true;
            }
        }
    });
}

async function compareWithAsyncFunctionWithNestedForLoops() {
    for (let i = 0; i < secondaryCollection.length; i++) {
        for (let j = 0; j < mainCollection.length; j++) {
            if (mainCollection[j].id === secondaryCollection[i].id) {
                mainCollection[j].matched = true;
            }
        }
    }
}

async function compareWithNestedForOfLoops() {
    for (itemSecondary of secondaryCollection) {
        for (itemPrimary of mainCollection) {
            if (itemPrimary.id === itemSecondary.id) {
                itemPrimary.matched = true;
            }
        }
    }
}

//#endregion

//#region dummy data population logic

function initMainCollection(mainCollection, arraySize) {
    for (let i = 0; i < arraySize; i++) {
        mainCollection.push({
            id: i,
            name: `test${i}`,
        });
    }
    return mainCollection;
}
function initSecondaryCollection(
    secondaryCollection,
    arraySize,
    mainCollectionSize
) {
    for (let i = 0; i < arraySize; i++) {
        secondaryCollection.push({
            id: Math.round(Math.random() * mainCollectionSize),
        });
    }
    return secondaryCollection;
}

//#endregion
