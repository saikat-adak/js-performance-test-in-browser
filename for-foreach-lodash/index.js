//This code compares the performance of for, foreach and lodash for a nested for loop with n^2 complexity

const mainCollectionSize = 2000;
const secondaryCollectionSize = 500;

let mainCollection = [];
initMainCollection(mainCollection, mainCollectionSize);

let secondaryCollection = [];
initSecondaryCollection(secondaryCollection, secondaryCollectionSize, mainCollectionSize);

let report = [];

class OperationMetric {
    constructor(operationName, executionTime) {
        this.operationName = operationName;
        this.executionTime = executionTime;
    }
}

console.log(`Performance testing with ${mainCollectionSize} primary 
and ${secondaryCollectionSize} secondary collection:`);


measureTime(compareWithNestedForLoops);
measureTime(compareWithLodashForeachAndFor);
measureTime(compareWithLodashForeachAndAsyncFor);
measureTime(compareWithAsyncFunctionWithNestedForLoops);
measureTime(compareWithNestedForOfLoops);

console.table(report);

function measureTime(functionToExecute) {
    const startTime = Date.now();
    functionToExecute();
    const endTime = Date.now();
    updateReport(functionToExecute.name, startTime, endTime);
}

function updateReport(funcName, startTime, endTime) {    
    let operationName = funcName
        .replace(/([A-Z])/g, " $1")
        .replace("compare With ", "");
    let executionTime = endTime - startTime;
    report.push(new OperationMetric(operationName, executionTime));
}

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
            name: `test${i}`
        });
    }
    return mainCollection;
}
function initSecondaryCollection(secondaryCollection, arraySize, mainCollectionSize) {
    for (let i = 0; i < arraySize; i++) {
        secondaryCollection.push({
            id: Math.round(Math.random() * mainCollectionSize),
        });
    }
    return secondaryCollection;
}

//#endregion
