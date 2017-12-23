const doNotDisturb = require("do-not-disturb")
const Slack = require("slack")
require("dotenv").config()
const slack = new Slack({token: process.env.TOKEN})

const args = process.argv.slice(2)
var arg

const validateArgs = function() {
  if (args.length != 1) {
    console.error(
      "Invalid Argument: Please provide either 'focus' or 'unfocus' as a command line argument"
    )
    return
  }

  arg = args[0]
  if (arg != "focus" && arg != "unfocus") {
    console.error(
      "Invalid Argument: Please provide either 'focus' or 'unfocus' as a command line argument"
    )

    return
  }

  return arg === "focus"
}

const setDoNotDisturb = function(focus) {
  focus ? doNotDisturb.on() : doNotDisturb.off()
}

const setSlackState = function(focus) {
  const profile = focus
    ? {
        status_text: process.env.FOCUS_MESSAGE,
        status_emoji: process.env.FOCUS_EMOJI
      }
    : {
        status_text: process.env.UNFOCUS_MESSAGE,
        status_emoji: process.env.UNFOCUS_EMOJI
      }

  slack.users.profile
    .set({profile})
    .then(console.log)
    .catch(console.error)
}

const toggleFocus = function() {
  const focus = validateArgs()
  setDoNotDisturb(focus)
  setSlackState(focus)
}

toggleFocus()
