# Integreat routes wrapper for Hapi

Wrappes general route objects from one of the Integreat api packages, and maps
routes, request objects, and response objects between Hapi and Integreat
formats.

## Getting started

### Prerequisits

Node 8.

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

### Running the tests

The tests can be run with `npm test`.
