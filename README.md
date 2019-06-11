# expose-env-middleware

Express middleware to dynamically expose environment variables to client-side code via `window.process.env`:

```js
// server.js

const app = require('express')()
const exposeEnvMiddleware = require('expose-env-middleware')

// Pass it a function that returns env vars
const getEnv = () => ({ FOO: 'bar' })
app.get('/env', exposeEnvMiddleware(getEnv))
app.listen(...)
```
```html
<!-- index.html -->

<script src="/env"></script>
<script> console.log(process.env.FOO) // -> 'bar' </script>
```

This setup allows env vars to reload each time index.html is fetched.

## API

* `middleware(getEnv[, options])`
  * `getEnv`: A function that returns an object of env variables.
  * `options.template` (optional, default=`defaultTemplate`) Template function for serializing the env object into a file. Default is shown below:


  ```js
  function defaultTemplate (env) {
    return `
      window.process = {
        env: ${ JSON.stringify(env) }
      }  
    `
  }
  ```

