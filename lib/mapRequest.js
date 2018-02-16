function mapRequest (request) {
  const {method, params, path, payload: body} = request

  const headers = Object.keys(request.headers || {})
    .reduce((headers, key) =>
      ({...headers, [key.toLowerCase()]: request.headers[key]}), {})

  return {
    method: method.toUpperCase(),
    params,
    path,
    body,
    headers
  }
}

module.exports = mapRequest
