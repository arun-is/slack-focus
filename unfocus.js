const doNotDisturb = require("do-not-disturb")
const Slack = require("slack")
require("dotenv").config()
const slack = new Slack({token: process.env.TOKEN})

doNotDisturb.off()

slack.users.profile
  .set({
    profile: {
      status_text: process.env.UNFOCUS_MESSAGE,
      status_emoji: process.env.UNFOCUS_EMOJI
    }
  })
  .then(console.log)
  .catch(console.log)
