# Messenger Utility Bot

This is a messenger bot built using ExpressJS.

## Inspiration

In Africa, we've always had problems with intermittent availability of public utility services like piped water supply and electricity. A power outage in the middle of your haircut could spell disaster as it could last hours and sometimes even days. Good luck trying to explain you're not balding!

Utility outages usually occur due to disruption on the mainline of supply. These may include water pipe bursts or electrical wire failures. There's only one way to contact the state-owned public utility service: calling them. Often, the lines wouldn't go through. If they did, you'd have to wait several minutes before you can speak to an agent. It can get quite frustrating and frightening if it's an emergency.

Wilfred, from Zambia and I from Kenya, thought of a solution we could build using messenger to enable faster and easier reporting of such events so utility companies can focus more on fixing the problems than setting up call centers. A bot would significantly decrease the amount of time taken between a report to a solution. It would also increase the ownership and accountability to the support department of a utility company.

## What it does
Utilbot is a simple Messenger bot that serves as a 24/7 support assistant for a utility company. It has two primary functions:

1. It enables a customer to report a malfunctioning utility.
2. It enables a customer to follow up on the reports they make.

## How we built it
We started with mockups on botsociety just to get a clear picture of how the app would look like and function.

Because Wilfred and I are both JavaScript geeks, we built out a simple server using [Express](https://expressjs.com/) and hosted it on [Heroku](https://www.heroku.com/). The server listens on the `/webhook` endpoint for both postback and messages for two types of events:
1. **Reporting**: These have a string REPORT in the postback/message. They have a workflow as described by the image below:

![Flowchart](https://drive.google.com/file/d/1FEMNaESjO_FPsEQVU06TFDMLXqBh44QA/view?usp=sharing)

Once a user interacts with the bot, we create the user to using his sender id to a Postgres database if he doesn't exist. We then create a report along with the photo URL and location and save it in the database as well.

2. **Follow-up**:  These are much simpler, once the server receives a postback/message with the string FOLLOW_UP, it queries the database for all the reports made by the user using his sender id.

We then proceeded to create a new app on https://developers.facebook.com and linked it to our Facebook [page](https://www.facebook.com/UtilBot-109002480643118/?epa=SEARCH_BOX) and [server](https://utility-bot-test.herokuapp.com/). 

## Challenges we ran into
1. Uploading the photo related to a particular report.
2. Linking the location and photo made in a single report.

## Accomplishments that we're proud of
We have the MVP ready. A customer can now use the bot to make reports and follow up on reports they had made previously. It's an accomplishment we're very proud of.

## What we learned
We learned plenty of things working together but mainly:
1. The Messenger Send API - We didn't know how simple it was to build a bot from scratch.
2. Setting up and proactively contributing to a project - We had to brainstorm together, make mistakes and continue improving our ideas and solution.

Above all, we learned the benefits, sacrifices of teamwork and coming together for a common goal. Despite coming from different countries, speaking different languages and cultures, Wilfred and I had two things in common: code and utility issues.

## What's next for UtilBot

For a tool like Utilbot, the possibilities are limitless. For Wilfred and I, we see a future where we are able to:
1. Build a dashboard for the support team that utilizes the power of web sockets, so that they can immediately get notifications as reports come in.
2. Utilize the power of artificial intelligence to set the priority of reports coming in based on the images and locations. For example, the model could prioritize reports based on life-threatening situations like a faulty electrical wire in areas such as hospitals and schools.
3. Enable notifications on Messenger as issues are being worked on and resolved so that a customer can track the progress of the report s/he made.

The above are just a few of the ideas we have for Utilbot.



## Development Instructions

1. Fork the project. Go to glitch.com, create a new project, under tools, click on import from github and type in the forked repo. We will do most of our development on glitch.com because the Messenger platform requires the bot to be running in the cloud on a https server.
2. Once step 1 is done, head over to developers.facebook.com, create a new app, facebook page and set up your bot as per these instructions https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup. Note this setup is a one time setup and you won't need to repeat it.
3. Once you get your Page Access Token, create a .env file and paste in the token as shown in the `.env.example` file. 
4. After done with the feature you're building, you can use glitch's export to github feature that will push to a github glitch branch that you can use to PR against the master branch on this repo.

## API

```.js
// ...to be continued
```
