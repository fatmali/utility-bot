
const request = require('./request')
const { format } = require('date-fns')
const constants = require('../constants')
const {
  welcomeMessage,
  requestToShareLocation,
  sharePhoto,
  photoReceived,
  followUp,
  requestToAddDetails,
  misunderstoodReply,
  reportCompletedResponse,
  reportCarousel,
  noReports,
  makeBackLater
} = require('../sendApi/messages')
const { pgClient } = require('./queries')

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

async function saveImage (imageUrl, senderID) {
  try {
    await pgClient.query(`UPDATE reports SET Photos = '${imageUrl}' WHERE User_id = '${senderID}'`)
  } catch (error) {
    console.log(error)
  }
}

async function saveUser (senderID) {
  try {
    await pgClient.query('INSERT INTO reports (user_id) VALUES ($1);', [senderID])
      .then((res) => {
        callSendAPI(senderID, welcomeMessage)
      })
  } catch (error) {
    console.log(error)
  }
}

function formateDate (isoDate) {
  return format(new Date(isoDate), 'dd/MM/yyyy')
}

async function fetchFollowUpReports (senderID) {
  const reports = []
  try {
    await pgClient.query(`SELECT * FROM reports WHERE user_id = '${senderID}' AND photos IS NOT NULL;`)
      .then((res) => {
        if (res.rows.length === 0) {
          return callSendAPI(senderID, noReports)
        } else {
          // TODO: find a way to display mutiple reports
          // At the moment we are updating every row that has
          // const firstReport = res.rows[0]
          // reports.push({
          //   title: 'Report 1',
          //   subtitle: `At ${firstReport.location} on ${formateDate(firstReport.created_at)}. Status: Pending`,
          //   image_url: `${firstReport.photos}`
          // })
          for (let i = 0; i < res.rows.length; i++) {
            reports.push({
              title: `Report ${i + 1}`,
              subtitle: `At ${res.rows[i].location} on ${formateDate(res.rows[i].created_at)}. Status: Pending`,
              image_url: `${res.rows[i].photos}`
            })
          }
          callSendAPI(sender.id, followUp)
          callSendAPI(senderID, reportCarousel(reports))
        }
      })
  } catch (error) {
    console.log(error)
  }
}

async function handlePostback (sender, postback) {
  try {
    switch (postback.payload) {
      case constants.GET_STARTED:
        await saveUser(sender.id)
        break
      case constants.REPORT:
        callSendAPI(sender.id, sharePhoto)
        break
      case constants.FOLLOW_UP:
        fetchFollowUpReports(sender.id)
        break
      case constants.ADD_DETAILS.YES:
        callSendAPI(sender.id, requestToAddDetails)
        break
      case constants.ADD_DETAILS_NO:
        callSendAPI(sender.id, reportCompletedResponse)
        break
      default:
        console.log('Unsupported request: Request can either be REPORT or FOLLOW_UP')
    }
  } catch (error) {
    console.error(error)
  }
}

async function handleMessage (sender, message) {
  try {
    if (message.attachments && message.attachments[0].type === 'image' &&
    message.attachments[0].payload.url) {
      await saveImage(message.attachments[0].payload.url, sender.id)
      callSendAPI(sender.id, photoReceived)
      callSendAPI(sender.id, requestToShareLocation(sender.id))
    } else if (message.quick_reply) {
      switch (message.quick_reply.payload) {
        case constants.MAKE_REPORT_YES:
          callSendAPI(sender.id, sharePhoto)
          break
        case constants.MAKE_REPORT_NO:
          callSendAPI(sender.id, makeBackLater)
          break
        case constants.ADD_DETAILS_YES:
          callSendAPI(sender.id, requestToAddDetails)
          break
        case constants.ADD_DETAILS_NO:
          callSendAPI(sender.id, reportCompletedResponse)
          break
        default:
          callSendAPI(sender.id, misunderstoodReply)
      }
    } else {
      callSendAPI(sender.id, misunderstoodReply)
    }
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  handlePostback,
  handleMessage,
  callSendAPI
}
