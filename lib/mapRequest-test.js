import test from 'ava'

import mapRequest from './mapRequest'

test('should map request', (t) => {
  const request = {method: 'get', params: {id: 'ent1', relationship: 'author'}, path: '/entries/ent1/author'}
  const expected = {
    method: 'GET',
    params: {id: 'ent1', relationship: 'author'},
    path: '/entries/ent1/author',
    body: undefined,
    headers: {}
  }

  const ret = mapRequest(request)

  t.deepEqual(ret, expected)
})

test('should return missing params as null', (t) => {
  const request = {method: 'get', params: null, path: '/entries'}

  const ret = mapRequest(request)

  t.is(ret.params, null)
})

test('should map headers', (t) => {
  const request = {method: 'get', headers: {authorization: 'Bearer t0k3n'}}
  const expectedHeaders = {authorization: 'Bearer t0k3n'}

  const ret = mapRequest(request)

  t.deepEqual(ret.headers, expectedHeaders)
})

test('should make headers lower case', (t) => {
  const request = {method: 'get', headers: {Authorization: 'Bearer t0k3n'}}
  const expectedHeaders = {authorization: 'Bearer t0k3n'}

  const ret = mapRequest(request)

  t.deepEqual(ret.headers, expectedHeaders)
})

test('should map body', (t) => {
  const request = {method: 'get', payload: {data: {id: 'ent1', type: 'entry'}}}
  const expectedBody = {data: {id: 'ent1', type: 'entry'}}

  const ret = mapRequest(request)

  t.deepEqual(ret.body, expectedBody)
})
