import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: false,
    testIsolation: false,
  },
  chromeWebSecurity: false,
  requestTimeout: 5000,
  responseTimeout: 5000,
  execTimeout: 5000,
  pageLoadTimeout: 10000,
  defaultCommandTimeout:5000,
  waitForAnimations: true,
  // retries:{
  //   openMode:2,
  //   runMode:4
  // }
});
