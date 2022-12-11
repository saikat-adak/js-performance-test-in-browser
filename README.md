# Different looping construct in JavaScript - performance testing in browsers

## How to run the performance test
Just open the index.html file in any browser and navigate to the Dev tools. Console window should show the performance result.

## Consolidated result
The testing has been performed with various sized data sets like 500 primary and 125 secondary collection, 20,000 primary and 5,000 secondary collection etc.<br/>

*All the numbers in the following tables are in milliseconds.*

### Environment: Safari 16.1 in macOS 13.0.1

Looping construct|500 & 125|2000 & 500|5000 & 1250|
---|---:|---:|---:|
Nested For Loops|7|155|1412|
Lodash Foreach And For|5|123|1178|
Lodash Foreach And Async For|6|122|1179|
Async Function With Nested For Loops|1|12|76|
Nested For Of Loops|1|7|29|

<br/>

### Environment: Chrome 107.0.5304.121 (arm64) in macOS 13.0.1

Looping construct|500 & 125|2000 & 500|5000 & 1250|
---|---:|---:|---:|
Nested For Loops|3|39|282|
Lodash Foreach And For|3|27|256|
Lodash Foreach And Async For|2|28|261|
Async Function With Nested For Loops|2|4|31|
Nested For Of Loops|3|4|40|
