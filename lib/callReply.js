const Boom = require('boom')

function callReply (reply, response) {
  const { statusCode } = response
  if (statusCode < 200 || statusCode >= 300) {
    reply(new Boom(response.statusMessage, { statusCode }))
  } else {
    reply(response.body).code(statusCode)
  }
}

module.exports = callReply
