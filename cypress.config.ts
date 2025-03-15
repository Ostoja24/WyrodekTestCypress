import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: false
  },
  requestTimeout: 5000,
  responseTimeout: 5000,
  execTimeout:5000,
  pageLoadTimeout:5000,
  retries:{
    openMode:2,
    runMode:4
  }
});
