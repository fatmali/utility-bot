
const request = require('./request')
const constants = require('../constants')
const { welcomeMessage, sharePhoto, addDetailsQuickReply, reportCompletedResponse } = require('../sendApi/messages')

async function callSendAPI (sender_psid, response) {
  // Construct the message body
  const request_body = {
    recipient: {
      id: sender_psid
    },
    message: response
  }
  // Send the HTTP request to the Messenger Platform
  await request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error('Unable to send message:' + err)
    }
  })
}

function handlePostback (sender, postback) {
  try {
    switch (postback.payload) {
      case constants.GET_STARTED:
        callSendAPI(sender.id, welcomeMessage)
        break
      case constants.REPORT:
        callSendAPI(sender.id, sharePhoto)
        break
      case constants.ADD_DETAILS.YES:
        callSendAPI(sender.id, requestToAddDetails)
        break
      case constants.ADD_DETAILS_NO:
        callSendAPI(sender.id, reportCompletedResponse)
        break
      case constants.FOLLOW_UP:
        // search and find ticket id, display progress details of ticket
        break
      default:
        console.log('Unsupported request: Request can either be REPORT or FOLLOW_UP')
    }
  } catch (error) {
    console.error(error)
  }
}

function handleMessage (sender, message) {
  console.log('message', message)
  try {
    if (message.text === constants.GET_STARTED) {
      callSendAPI(sender.id, welcomeMessage)
    }
    if (message.attachments && message.attachments[0].type === 'image') {
      callSendAPI(sender.id, addDetailsQuickReply)
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  handlePostback,
  handleMessage
}
