# Integreat routes wrapper for Hapi

Wrappes general route objects from one of the Integreat api packages, and maps
routes, request objects, and response objects between Hapi and Integreat
formats.

[![Build Status](https://travis-ci.org/integreat-io/integreat-hapi.svg?branch=master)](https://travis-ci.org/integreat-io/integreat-hapi)
[![Coverage Status](https://coveralls.io/repos/github/integreat-io/integreat-hapi/badge.svg?branch=master)](https://coveralls.io/github/integreat-io/integreat-hapi?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/8f8fd26516a321000e0a/maintainability)](https://codeclimate.com/github/integreat-io/integreat-hapi/maintainability)

## Getting started

### Prerequisits

Node v8.6.

### Installing

```
npm install integreat-hapi
```

Example of use with `integreat-api-json`:

```javascript
const hapi = require('hapi')
const integreat = require('integreat')
const jsonapi = require('integreat-api-json')
const greatHapi = require('integreat-hapi')

const great = integreat(...)
const routes = greatHapi(jsonapi(great))

const server = new Hapi.Server()
// ... whatever Hapi setup you need
server.route(routes)
server.start()
```

Note that this package will not alter content-type and will return Boom on
errors. To be [JSON-API](http://jsonapi.org/) compliant, use the
[hapi-json-api](https://github.com/kjellmorten/hapi-json-api) package.

### Running the tests

The tests can be run with `npm test`.
