const request = require('../../helpers/request');
const constants = require('../../constants');

module.exports = function setUpGetStarted() {
      return request(
        {
          url: "https://graph.facebook.com/v2.6/me/messenger_profile",
          qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
          method: "POST",
          json: {"get_started": {"payload": constants.GET_STARTED}}
        });
  
  };