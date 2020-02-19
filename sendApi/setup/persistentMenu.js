const request = require("../../helpers/request");
const constants = require("../../constants");

const menu = {
    "persistent_menu": [
        {
            "locale": "default",
            "composer_input_disabled": false,
            "call_to_actions": [
                {
                    "type": "postback",
                    "title": "Report an Incident",
                    "payload": constants.REPORT
                },
                {
                    "type": "postback",
                    "title": "Follow-up on report",
                    "payload": constants.FOLLOW_UP
                }
            ]
        }
    ]
}



module.exports = function setUpPersistentMenu() {
    request(
      {
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
        method: "POST",
        json: persistent_menu
      });
};
