const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight:1080,
  viewportWidth:1920,
  env:{
    username:'davidpolsanchezmartos@gmail.com',
    password:'caracoles',
    apiUrlrealWorld:'https://api.realworld.io',
    apiUrlconduit:'https://conduit.productionready.io'
  },
  retries:{
    runMode: 2,
    openMode: 0
  },
  e2e: {
    setupNodeEvents(on, config) {
      // e2e testing node events setup code
      // const username = process.env.DB_USERNAME
      // const password = process.env.DB_PASSWORD

      // //comndition check
      // if(!password){
      //   throw new Error('missing PASSWORD environment variable')
      // }
      // config.env= {username,password}
      // return config
    },
    baseUrl: 'http://localhost:4200',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    excludeSpecPattern: ['**/1-getting-started/*', '**/2-advanced-examples/*'],
    video:false
  }
})
