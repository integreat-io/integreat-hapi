import test from 'ava'
import sinon from 'sinon'

import greatHapi from '..'

// Helpers

const reply = () => ({code: () => {}})

// Tests

test('should return routes', (t) => {
  const greatRoutes = [
    {method: 'GET', path: `/entries`, handler: () => {}},
    {method: 'GET', path: `/entries/{id}/{relationship}`, handler: () => {}}
  ]

  const routes = greatHapi(greatRoutes)

  t.true(Array.isArray(routes))
  t.is(routes[0].method, 'GET')
  t.is(routes[0].path, '/entries')
})

test('should wrap handlers', async (t) => {
  const response = {}
  const handler = sinon.stub().resolves(response)
  const greatRoutes = [{method: 'GET', path: `/entries/{id}/{relationship}`, handler}]
  const request = {method: 'get', params: {id: 'ent1', relationship: 'author'}, path: '/entries/ent1/author'}
  const expected = {method: 'GET', id: 'ent1', relationship: 'author', path: '/entries/ent1/author'}

  const hapiRoutes = greatHapi(greatRoutes)
  await hapiRoutes[0].handler(request, reply)

  t.is(handler.callCount, 1)
  t.deepEqual(handler.args[0][0], expected)
})

test('should call reply interface', async (t) => {
  const response = {statusCode: 200, body: {}}
  const handler = async () => response
  const code = sinon.stub()
  const reply = sinon.stub().returns({code})
  const greatRoutes = [{method: 'GET', path: `/entries`, handler}]
  const request = {method: 'get', params: null, path: '/entries'}

  const hapiRoutes = greatHapi(greatRoutes)
  await hapiRoutes[0].handler(request, reply)

  t.is(reply.callCount, 1)
  t.is(reply.args[0][0], response.body)
  t.is(code.callCount, 1)
  t.is(code.args[0][0], 200)
})

test('should call reply with Boom', async (t) => {
  const response = {statusCode: 404, statusMessage: 'Not found'}
  const handler = async () => response
  const code = sinon.stub()
  const reply = sinon.stub().returns({code})
  const greatRoutes = [{method: 'GET', path: `/entries`, handler}]
  const request = {method: 'get', params: null, path: '/entries'}

  const hapiRoutes = greatHapi(greatRoutes)
  await hapiRoutes[0].handler(request, reply)

  t.is(reply.callCount, 1)
  const boom = reply.args[0][0]
  t.true(boom instanceof Error)
  t.true(boom.isBoom)
  t.is(boom.output.statusCode, 404)
  t.is(boom.message, 'Not found')
  t.is(code.callCount, 0)
})
