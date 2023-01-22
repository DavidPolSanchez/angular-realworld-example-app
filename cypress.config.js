const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight:1080,
  viewportWidth:1920,
  env:{
    username:'davidpolsanchezmartos@gmail.com',
    password:'caracoles',
    baseUrl:'https://api.realworld.io'
  },
  retries:1,
  e2e: {
    setupNodeEvents(on, config) {
      // e2e testing node events setup code
    },
    baseUrl: 'http://localhost:4200',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    excludeSpecPattern: ['**/1-getting-started/*', '**/2-advanced-examples/*'],
    video:false
  }
})
