# chunked-run
Node js module to run parallel process wisely

## Setup
Go to the root of your Node.js/npm application
`cd path/to/your/app`

Install the **chunked-run** package as one of your app's dependencies
`npm install chunked-run`

## Usage
The method available - that gives its name to the package itself - is a queue-like alternative to Node.js native feature **Promise.all**. It was built to work similarly to the native one but the processing is a whole different thing.

Making use of the amazing **async** npm package, chunked-run receives an array of arguments to be run with a specific function passed as argument.
