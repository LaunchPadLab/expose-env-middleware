const { Router } = require('express')

function defaultTemplate (env) {
  return `
    window.process = {
      env: ${ JSON.stringify(env) }
    }  
  `
}

function exposeEnvMiddleware (getEnv, { filename='env.js', template=defaultTemplate }={}) {
  if (!getEnv || typeof getEnv !== 'function') throw new Error('Must provide getEnv() function')
  const app = Router()
  app.get('/' + filename, (req, res) => res.send(template(getEnv())))
  return app
}

module.exports = exposeEnvMiddleware