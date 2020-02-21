const request = require("../helpers/request");
const senderAction = require("./sendAction");
const constants = require("../constants");

module.exports = function sendMessageWithButtons(recipientId, text, buttons) {
  senderAction(recipientId);
  setTimeout(
    () =>
      request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
        method: "POST",
        json: {
          recipient: {
            id: recipientId
          },
          message: {
            attachment: {
              type: "template",
              payload: {
                template_type: "button",
                text: text,
                buttons: buttons,
              }
            }
          }
        }
      }),
    3000
  );
};
