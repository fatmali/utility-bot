const request = require("../helpers/request");
const senderAction = require("./sendAction");

module.exports = function sendMessage(recipientId, text, quick_replies) {
    return request(
      {
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
        method: "POST",
        json: {
          recipient: {
            id: recipientId
          },
          messaging_type: "RESPONSE",
          message: {
            text,
            quick_replies
          }
        }
      }
  )};
