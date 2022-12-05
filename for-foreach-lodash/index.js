//This code compares the performance of for, foreach and lodash for a nested for loop with n^2 complexity

let mainCollection = [];
let secondaryCollection = [];

const mainCollectionSize = 2000;
const secondaryCollectionSize = 500;

initMainCollection(mainCollectionSize);
initSecondaryCollection(secondaryCollectionSize);

console.log(
    `Performance testing with ${mainCollectionSize} primary and ${secondaryCollectionSize} secondary collection`
);

measureTime(compareWithNestedForLoops);
measureTime(compareWithLodashForeachAndFor);
measureTime(compareWithLodashForeachAndAsyncFor); //1091 ms with mainCollectionSize = 35000, secondaryCollectionSize = 1000
measureTime(compareWithAsyncFunctionWithNestedForLoops); //80 ms with mainCollectionSize = 35000, secondaryCollectionSize = 1000; 56,391ms for 1.3 lakhs records
measureTime(compareWithNestedForOfLoops); // 164 ms with mainCollectionSize = 35000, secondaryCollectionSize = 1000

function measureTime(functionToExecute) {
    const startTime = Date.now();
    functionToExecute();
    const endTime = Date.now();

    console.log(
        `${functionToExecute.name
            .replace("compareWith", "")
            .replace(/([A-Z])/g, " $1")}: ${endTime - startTime}ms`
    );

    let matchedCollection = mainCollection.filter((x) => x.matched);
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

function initMainCollection(arraySize) {
    for (let i = 0; i < arraySize; i++) {
        mainCollection.push({ id: i, name: `test${i}` });
    }
}
function initSecondaryCollection(arraySize) {
    for (let i = 0; i < arraySize; i++) {
        secondaryCollection.push({
            id: Math.round(Math.random() * mainCollectionSize),
        });
    }
}

//#endregion
