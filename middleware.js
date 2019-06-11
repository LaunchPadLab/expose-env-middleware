function defaultTemplate (env) {
  return `
    window.process = {
      env: ${ JSON.stringify(env) }
    }  
  `
}

function exposeEnvMiddleware (getEnv, { template=defaultTemplate }={}) {
  if (!getEnv || typeof getEnv !== 'function') throw new Error('Must provide getEnv() function')
  return function (req, res) {
    return res.send(template(getEnv()))
  }
}

module.exports = exposeEnvMiddleware