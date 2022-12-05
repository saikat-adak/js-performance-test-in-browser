# js-performance-test-in-browser

## How to run the performance test
Just open the index.html file in any browser and navigate to the Dev tools. Console window should show the performance result.

Result of multiple tests performed with various data sets:

## Run 1
Performance testing with 2,000 primary and 500 secondary collection
* Nested For Loops: 91ms
* Lodash Foreach And For: 66ms
* Lodash Foreach And Async For: 67ms
* Async Function With Nested For Loops: 8ms
* Nested For Of Loops: 5ms

## Run 2
Performance testing with 20,000 primary and 5,000 secondary collection:
* Nested For Loops: 2630ms
* Lodash Foreach And For: 2384ms
* Lodash Foreach And Async For: 2408ms
* Async Function With Nested For Loops: 363ms
* Nested For Of Loops: 434ms


