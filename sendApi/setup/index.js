const getStarted = require('./getStartedButton')
const persistentMenu = require('./persistentMenu')

module.exports = function runSetup () {
  return Promise.all([getStarted(), persistentMenu()])
}
