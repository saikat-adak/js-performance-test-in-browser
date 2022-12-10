# js-performance-test-in-browser

## How to run the performance test
Just open the index.html file in any browser and navigate to the Dev tools. Console window should show the performance result.

Result of multiple tests performed with various data sets:

## Run 1
Chrome - Performance testing with 500 primary and 125 secondary collection:
* Nested For Loops: 3ms
* Lodash Foreach And For: 3ms
* Lodash Foreach And Async For: 3ms
* Async Function With Nested For Loops: 2ms
* Nested For Of Loops: 3ms

## Run 2
Chrome - Performance testing with 20,000 primary and 5,000 secondary collection:
* Nested For Loops: 39ms
* Lodash Foreach And For: 29ms
* Lodash Foreach And Async For: 29ms
* Async Function With Nested For Loops: 3ms
* Nested For Of Loops: 4ms

## Run 3
Safari - Performance testing with 500 primary and 125 secondary collection:
* Nested For Loops: 7ms
* Lodash Foreach And For: 6ms
* Lodash Foreach And Async For: 5ms
* Async Function With Nested For Loops: 2ms
* Nested For Of Loops: 1ms

## Run 4
Safari - Performance testing with 20,000 primary and 5,000 secondary collection:
* Nested For Loops: 140ms
* Lodash Foreach And For: 112ms
* Lodash Foreach And Async For: 112ms
* Async Function With Nested For Loops: 11ms
* Nested For Of Loops: 6ms