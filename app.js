'use strict'
const botSetup = require('./sendApi/setup')
const express = require('express')
const body_parser = require('body-parser')
const app = express().use(body_parser.json()) // creates express http server

app.listen(process.env.PORT || 1337, () => console.log('webhook is listening on port', process.env.PORT))

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
      const { sender, postback, message } = entry.messaging[0]
      if (postback) {
        handlePostback(sender, postback)
      } else if (message) {
        handleMessage(sender, message)
      } else {
        res.sendStatus(404)
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
