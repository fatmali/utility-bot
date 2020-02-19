const request = require("../helpers/request");

module.exports = function senderAction(recipientId) {
  return request(
    {
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: "POST",
      json: {
        recipient: { id: recipientId },
        sender_action: "typing_on",
        mark_seen: true
      }
    });
};
