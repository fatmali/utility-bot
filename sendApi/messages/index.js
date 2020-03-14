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
  text: 'Thank you. got it!'
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

const requestToShareLocation = (senderID) => ({
  attachment: {
    type: 'template',
    payload: {
      template_type: 'button',
      text: 'Please share the location of this incident to help our support team locate and resolve it.',
      buttons: [
        {
          type: 'web_url',
          url: `https://utility-bot-test.herokuapp.com/location/${senderID}`,
          title: 'Share',
          webview_height_ratio: 'tall'
        }
      ]
    }
  }
})

const requestToSharePhoto = {
  attachment: {
    type: 'template',
    payload: {
      template_type: 'button',
      text: 'Please take a photo of the incident',
      buttons: [
        {
          type: 'web_url',
          url: 'https://utility-bot-test.herokuapp.com',
          title: 'share photo',
          webview_height_ratio: 'tall'
        }
      ]
    }
  }
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

const locationReceived = {
  text: 'Thanks! Now we know where the problem is. We will inform you once this issue is resolved.'
}

const followUp = {
  text: 'Here is a list of your reports. :)'
}

const reportCarousel = (reports) => ({
  attachment: {
    type: 'template',
    payload: {
      template_type: 'generic',
      elements: [
        {
          title: 'Report 4',
          subtitle: 's',
          image_url: 'https://scontent.xx.fbcdn.net/v/t1.15752-9/89744588_206072587281694_5924024799117443072_n.jpg?_nc_cat=103&_nc_sid=b96e70&_nc_ohc=al9QGndb5lgAX_mH-YC&_nc_ad=z-m&_nc_cid=0&_nc_zor=9&_nc_ht=scontent.xx&oh=38715775ca44a551c721e8b3b7a0bdd6&oe=5E94277F'
        }
      ]
    }
  }
})

module.exports = {
  welcomeMessage,
  sharePhoto,
  photoReceived,
  addDetailsQuickReply,
  requestToAddDetails,
  reportCompletedResponse,
  misunderstoodReply,
  requestToShareLocation,
  requestToSharePhoto,
  locationReceived,
  followUp,
  reportCarousel
}
