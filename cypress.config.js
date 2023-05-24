const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'qayjir',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    chromeWebSecurity: false,
    "baseUrl": "http://localhost:3000/",
    //comando para rodar varios teste de forma interativa via tela 
    experimentalRunAllSpecs: true,
    //comando para utilizar o relatório
    "reporter": "mochawesome",
    "reporterOptions": {
      "reportDir": "mochawesome-report",
      "overwrite": false,
      "html": false,
      "json": true
    }
  },
});