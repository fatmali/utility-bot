const request = require("../helpers/request");
const senderAction = require("./sendAction");

module.exports = function sendMessage(recipientId, message) {
  senderAction(recipientId);

  return request({
    url: "https://graph.facebook.com/v2.6/me/messages",
    qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
    method: "POST",
    json: {
      recipient: { id: recipientId },
      message: {
        text: message
      }
    }
  });
};
