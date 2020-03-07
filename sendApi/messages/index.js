const welcomeMessage = {
  attachment: {
    type: 'template',
    payload: {
      template_type: 'button',
      text: 'Welcome to Utility Bot. I help you reach out to your utility company to fix the problem you are experiencing. What would you like to do?',
      buttons: [
        {
          type: 'postback',
          title: 'Report an incident',
          payload: 'REPORT'
        },
        {
          type: 'postback',
          title: 'Follow up a report',
          payload: 'FOLLOW_UP'
        }
      ]
    }
  }
}

const sharePhoto = {
  text: 'That\'s great. Please share a photo of the incident.'
}

const photoReceived = {
  text: 'Thank you and could you share the location of this incident?'
}

const addDetailsQuickReply = {
  text: 'Would you like to add more details to this report?',
  quick_replies: [
    {
      content_type: 'text',
      title: 'Yes',
      payload: 'ADD_DETAILS_YES'
    }, {
      content_type: 'text',
      title: 'No',
      payload: 'ADD_DETAILS_NO'
    }
  ]
}

const requestToAddDetails = {
  text: 'Okay. Please type a message to tell me more.'
}

const reportCompletedResponse = {
  text: 'Thank you very much! Our support team will attend to this report and will give you feedback once it has been resolved.'
}

const misunderstoodReply = {
  text: 'Sorry, I did not get that. Please check our main menu and try again.'
}

module.exports = {
  welcomeMessage,
  sharePhoto,
  photoReceived,
  addDetailsQuickReply,
  requestToAddDetails,
  reportCompletedResponse,
  misunderstoodReply
}
