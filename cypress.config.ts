import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: false,
    testIsolation: true,
    baseUrl:"https://www.wyrodek.pl/"
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
  }
});
