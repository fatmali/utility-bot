const getStarted = require("./getStartedButton"),
  persistentMenu = require("./persistentMenu");

module.exports = function runSetup() {
  return Promise.all([getStarted(), persistentMenu()]);
};
