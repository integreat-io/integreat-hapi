function mapRequest (request) {
  const {method, params, path} = request

  return {
    method: method.toUpperCase(),
    params,
    path
  }
}

module.exports = mapRequest
