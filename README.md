# credit-card-app
credit card application to process credit and report summary.

# Installation:
- `cd` to the local repository
- run `npm install` 
This project assumes that you're using [npm](https://www.npmjs.com/) and [node](https://nodejs.org/en/). 

# Usage: 
This project is predefined with few scripts to facilitate the easy running / testing the application.
- `npm start` this will run the application and provide test data from test/data folder.
- `node app.js fileName.txt` will run with provided txt file data.
- `node app.js` will run the app and wait for user to provide input.
- `CTRL C` user can exist from standard input and will run the application with provided data.
- `CTRL Z` user can exit out of the application.
- `npm test` can be used to run the test.

# Design Decision:
Keeping `seperation of concern`, `modularization` and `code repetation` i have designed the application as mentioned below.
1. An overview of your design decisions:
  - `app.js` is the main entry point of the application. Which focus on bare minimum input processing before handing it over to other module.
  - `dataProcesser` helper method is used to keep the common functionality between data processing for `file` and/or `stdin`.
  - `parserHelper` focuses on identifying type of the operation it needs to perfrom and calls `CardProcess` with remaining data and store object. I decided to use ES6 class to avoid passing the `data` in each action method, and wanted to initialize the `store` object for easy mocking in test.
  - `CardProcess` used store object for easy data retrival (i.e O(1)) while performing `Credit` and/or `Charge`.
   
2. Why you picked the programming language you used:
  - I have been working on reactjs and javascript for past 1.5-2 years which increased my curiosity towards nodejs.
  - Wanted to take this oppurtunity to learn and implement using nodejs ( as i have not worked any node specific applications before )
  - Wanted to make use of open source packages like `luhn` etc and dependecy management is much easier.
  - I'm comfrtable writing testcases in javascript frameworks.
  - Non blocking IO operations results in faster request processing, if we need to expand this in furture. 

3. How to run your code and tests, including how to compile it if applicable and
  how to install any dependencies your code may have.
  - Please refer `Usage` section.

