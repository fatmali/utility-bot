const request = require('request');
const senderAction = require("./sendAction");

module.exports = function sendMessage(recipientId, message){
    senderAction(recipientId);

return new Promise(function(resolve, reject) {
   request({
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: "POST",
      json: {
              recipient: {id: recipientId},
              message: {
                  text: message
              }
            }
      }, function(error, response, body) {
            if (error) {
                console.log("Error sending message: " + response.error);
            reject(response.error);
            } else {
               console.log(response);
               resolve(body);
            }
       });
   })
}
