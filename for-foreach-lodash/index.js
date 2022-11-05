//This code compares the performance of for, foreach and lodash for a nested for loop with n^2 complexity

let mainCollection = [];
let secondaryCollection = [];

const mainCollectionSize = 35000;
const secondaryCollectionSize = 1000;

initMainCollection(mainCollectionSize);

initSecondaryCollection(secondaryCollectionSize);

const startTime = Date.now();
//compareWithFor(); //1202 ms
//compareWithLodash(); //1079 ms
//compareWithLodashAsync(); //1091 ms
compareWithBasicFor(); //80 ms

const endTime = Date.now();

console.log(`Time taken: ${endTime - startTime}ms`);

let matchedCollection = mainCollection.filter((x) => x.matched);
console.log(matchedCollection.length);
console.log(matchedCollection);

//#region Different comparison functions

function compareWithFor() {
    for (let i in secondaryCollection) {
        for (let j in mainCollection) {
            if (mainCollection[j].id === secondaryCollection[i].id) {
                mainCollection[j].matched = true;
            }
        }
    }
}

function compareWithLodash() {
    _.forEach(secondaryCollection, (item) => {
        for (let j in mainCollection) {
            if (mainCollection[j].id === item.id) {
                mainCollection[j].matched = true;
            }
        }
    });
}

async function compareWithLodashAsync() {
    _.forEach(secondaryCollection, async (item) => {
        for (let j in mainCollection) {
            if (mainCollection[j].id === item.id) {
                mainCollection[j].matched = true;
            }
        }
    });
}

async function compareWithBasicFor() {
    for (let i = 0; i < secondaryCollection.length; i++) {
        for (let j = 0; j < mainCollection.length; j++) {
            if (mainCollection[j].id === secondaryCollection[i].id) {
                mainCollection[j].matched = true;
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