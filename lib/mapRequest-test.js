import test from 'ava'

import mapRequest from './mapRequest'

test('should map request', (t) => {
  const request = {method: 'get', params: {id: 'ent1', relationship: 'author'}, path: '/entries/ent1/author'}
  const expected = {method: 'GET', params: {id: 'ent1', relationship: 'author'}, path: '/entries/ent1/author'}

  const ret = mapRequest(request)

  t.deepEqual(ret, expected)
})

test('should return missing params as null', (t) => {
  const request = {method: 'get', params: null, path: '/entries'}
  const expected = {method: 'GET', params: null, path: '/entries'}

  const ret = mapRequest(request)

  t.deepEqual(ret, expected)
})
