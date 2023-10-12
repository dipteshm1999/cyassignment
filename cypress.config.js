const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env:{
    sauceDemo:"https://www.saucedemo.com/"
  },
  pageLoadTimeout:1200000
});
