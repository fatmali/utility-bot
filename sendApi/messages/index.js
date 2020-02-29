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

module.exports = {
  welcomeMessage,
  sharePhoto
}
