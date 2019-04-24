const request = require('supertest')
const middleware = require('../middleware')
const express = require('express')

const ENV = { foo: 'bar' }
const GET_ENV = () => ENV

describe('middleware', () => {
  it('requires a getEnv() function', () => {
    const app = express()
    expect(() => app.use(middleware())).toThrow()
  })
  it('exposes a stringified environment', () => {
    const app = express()
    app.use(middleware(GET_ENV))
    return request(app)
      .get('/env.js')
      .then(res => expect(res.text).toMatchSnapshot())
  })
  it('accepts custom filename argument', () => {
    const app = express()
    app.use(middleware(GET_ENV, { filename: 'foo' }))
    return request(app)
      .get('/foo')
      .expect(200)
  })
  it('accepts custom template argument', () => {
    const app = express()
    app.use(middleware(GET_ENV, { template: env => 'ur env is ' + JSON.stringify(env) }))
    return request(app)
      .get('/env.js')
      .then(res => expect(res.text).toMatchSnapshot())
  })
})
