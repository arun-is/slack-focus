const Slack = require("slack")
require("dotenv").config()
const slack = new Slack({token: process.env.TOKEN})

slack.users.profile
  .set({
    profile: {
      status_text: process.env.FOCUS_MESSAGE,
      status_emoji: process.env.FOCUS_EMOJI
    }
  })
  .then(console.log)
  .catch(console.log)
