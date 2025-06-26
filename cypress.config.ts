import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-terminal-report/src/installLogsPrinter')(on,{
        printLogsToConsole: 'onFail'
      })
      // implement node event listeners here
    },
    // supportFile: true,
    testIsolation: true,
    baseUrl:"https://www.wyrodek.pl/"
  },
  env: {
    shortTimeout: 500,
    longTimeout: 2000,
    extremeTimeout: 50_000
  },
  chromeWebSecurity: false,
  requestTimeout: 10000,
  responseTimeout: 10000,
  execTimeout: 5000,
  pageLoadTimeout: 10000,
  defaultCommandTimeout:5000,
  waitForAnimations: true,
  video: true,
  retries:{
    openMode:2,
    runMode:4
  },
  reporter:'cypress-testrail-reporter',
  reporterOptions: {
  host: process.env.TESTRAIL_HOST,
  username: process.env.TESTRAIL_USERNAME,
  password: process.env.TESTRAIL_PASSWORD, 
  projectId: process.env.TESTRAIL_PROJECT_ID,
  suiteId: process.env.TESTRAIL_SUITE_ID,
  runName: 'Cypress Run E2E to Test Rail',
  includeAll: true,
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'reports/junit-[hash].xml',
    toConsole: true
  }
}});
