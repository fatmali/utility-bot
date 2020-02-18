const request = require('request');
module.exports = function sendMessage(recipientId){

return new Promise(function(resolve, reject) {
   request({
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: "POST",
      json: 
              {
  "recipient":{
    "id": recipientId
  },
  "messaging_type": "RESPONSE",
  "message":{
    "text": "Type of incident:",
    "quick_replies":[
      {
        "content_type":"text",
        "title":"Leakage/Bursting",
        "payload":"LEAKAGE"
      },{
        "content_type":"text",
        "title":"Theft",
        "payload":"THEFT"
      }
    ]
  }

            }
      }, function(error, response, body) {
            if (error) {
                console.log("Error sending quick reply: " + response.error);
                reject(response.error);
            } else {
               console.log(response);
               resolve(body);
            }
       });
   })
}
