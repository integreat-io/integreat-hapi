const mapRequest = require('./mapRequest')
const callReply = require('./callReply')

const wrap = (route) => {
  const {handler} = route

  const hapiHandler = async (request, reply) => {
    const response = await handler(mapRequest(request))
    callReply(reply, response)
  }

  return {...route, handler: hapiHandler}
}

function wrapRoutes (routes) {
  return routes.map(wrap)
}

module.exports = wrapRoutes
