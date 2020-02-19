const request = require("../../helpers/request");


export const menuPayloads = {
    REPORT: 'REPORT',
    FOLLOW_UP: 'FOLLOW_UP'
}

const menu = {
    "persistent_menu": [
        {
            "locale": "default",
            "composer_input_disabled": false,
            "call_to_actions": [
                {
                    "type": "postback",
                    "title": "Report an Incident",
                    "payload": menuPayloads.REPORT
                },
                {
                    "type": "postback",
                    "title": "Follow-up on report",
                    "payload": menuPayloads.FOLLOW_UP
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
