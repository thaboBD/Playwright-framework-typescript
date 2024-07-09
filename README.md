### pet-circle-test



## Prerequisites

- [Node.js](https://nodejs.org/) (v20.15.1 or newer)
- [npm](https://www.npmjs.com/)

if you have multiple versions or older versions of node you can use nvm to install the required version

1. To install nvm follow the instructions outlined here https://npm.github.io/installation-setup-docs/installing/using-a-node-version-manager.html

2. Make sure to set the env PATH if installing nvm

3. nvm install 20.15.1 

4. nvm use 20.15.1                

## Setup

1. **Clone the repository**
    ```sh
    git clone https://github.com/thaboBD/pet-circle-test.git
    cd pet-circle-test
    ```

2. **Install dependencies**
    ```sh
    npm install
    ```

3. **Install Playwright browsers**
    ```sh
    npx playwright install
    ```

## Running the tests 

To run the tests run any of the commands below depending on your needs



    npm run playwright:headed:chrome - run tests on chrome in headed mode
    npm run playwright:headed:firefox - run tests on firefox in headed mode
    npm run playwright:headless:chrome -  run tests in headless mode on chrome
    npm run playwright:headless:firefox - run tests in headless mode on firefox
    npm run playwright:headless:all -  run UI on all browsers and API tests
    npm run playwright:interactive -  Open playwright test runner
    npm run playwright:api - run all api tests

