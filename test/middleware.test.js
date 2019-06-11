const request = require('supertest')
const middleware = require('../middleware')
const express = require('express')

const ENV = { foo: 'bar' }
const GET_ENV = () => ENV

describe('middleware', () => {
  it('requires a getEnv() function', () => {
    const app = express()
    expect(() => app.get('/env', middleware())).toThrow()
  })
  it('exposes a stringified environment', () => {
    const app = express()
    app.get('/env', middleware(GET_ENV))
    return request(app)
      .get('/env')
      .then(res => expect(res.text).toMatchSnapshot())
  })
  it('accepts custom path', () => {
    const app = express()
    app.get('/foo', middleware(GET_ENV))
    return request(app)
      .get('/foo')
      .expect(200)
  })
  it('accepts custom template argument', () => {
    const app = express()
    app.get('/env', middleware(GET_ENV, { template: env => 'ur env is ' + JSON.stringify(env) }))
    return request(app)
      .get('/env')
      .then(res => expect(res.text).toMatchSnapshot())
  })
})
