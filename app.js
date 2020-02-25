'use strict'

const constants = require('./constants')
const botSetup = require('./sendApi/setup')
const express = require('express')
const body_parser = require('body-parser')
const quickReply = require('./sendApi/quickReply')
const app = express().use(body_parser.json()) // creates express http server

app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'))

app.get('/', (req, res) => {
  res.send("Hello World! I'm Up!")
})

app.get('/run-setup', (req, res) => {
  botSetup()
    .then(() => res.status(200).send('Bot setup complete'))
    .catch(err =>
      res.status(500).send(`An error occurred during setup: ${err}`)
    )
})

app.post('/webhook', (req, res) => {
  if (req.body.object === 'page') {
    req.body.entry.forEach(function (entry) {
      // Get the webhook event. entry.messaging is an array, but
      // will only ever contain one event, so we get index 0
      const { sender, postback } = entry.messaging[0]
      try {
        switch (postback.payload) {
          case constants.GET_STARTED:
            return quickReply(sender.id, 'Options', [])
          case constants.REPORT:
            return quickReply(sender.id, 'Type Of Report', [
              {
                content_type: 'text',
                title: 'Theft',
                payload: 'THEFT'
              },
              {
                content_type: 'text',
                title: 'Malfunction',
                payload: 'Malfunction'
              }
            ])
          case constants.FOLLOW_UP:
            // search and find ticket id, display progress details of ticket
            break
          default:
            console.log(
              'Unsupported request: Request can either be REPORT or FOLLOW_UP'
            )
        }
      } catch (e) {
        console.error(e)
      }
    })

    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED')
  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404)
  }
})

// Accepts GET requests at the /webhook endpoint
app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = 'test_verification_token'

  // Parse params from the webhook verification request
  const mode = req.query['hub.mode']
  const token = req.query['hub.verify_token']
  const challenge = req.query['hub.challenge']

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      // Respond with 200 OK and challenge token from the request
      console.log('WEBHOOK_VERIFIED')
      res.status(200).send(challenge)
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403)
    }
  }
})
