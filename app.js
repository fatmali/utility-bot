const botSetup = require('./sendApi/setup')
const express = require('express')
const path = require('path')
const body_parser = require('body-parser')
const app = express().use(body_parser.json()) // creates express http server
const { handlePostback, handleMessage } = require('./helpers')
const { pgClient } = require('./helpers/queries')
const { callSendAPI } = require('./helpers')
const { locationReceived } = require('./sendApi/messages')

pgClient.connect()

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept, Authorization')
  res.setHeader('Access-Control-Allow-Credentials', 'false')
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

app.listen(process.env.PORT || 5000, () => console.log('webhook is listening'))

app.use(express.static(path.join(__dirname, 'client/build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

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
      console.log('message', message, entry.messaging)
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

app.post('/location', async function (req, res) {
  const { location, senderID } = req.body
  let result
  try {
    result = await pgClient.query(`UPDATE reports SET Location = '${location}' WHERE User_id = '${senderID}'`)
  } catch (error) {
    console.log(error)
  }

  try {
    await callSendAPI(senderID, locationReceived)
  } catch (error) {
    console.log(error)
  }

  res.json({ result })
})

// app.post('/follow', async function (req, res) {
// const { senderID } = req.body
// let result
// try {
//   result = await pgClient.query(`SELECT * FROM reports WHERE user_id = '${senderID}'`)
//   console.log('result', result.rows)
// } catch (error) {
//   console.log(error)
// }
//   console.log('date', date)
//   res.json({ result: date })
// })
