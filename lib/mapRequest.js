function mapRequest (request) {
  const {method, params, path} = request
  const {id = null, relationship = null} = params || {}

  return {
    method: method.toUpperCase(),
    id,
    relationship,
    path
  }
}

module.exports = mapRequest
