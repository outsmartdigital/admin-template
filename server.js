const express = require('express')
const path = require('path')
const compression = require('compression')
const fs = require('fs')

const fetch = require('node-fetch')
global.fetch = fetch

const { handleRoutes } = require('./routes')

require('dotenv').config({
  path: path.resolve(__dirname, `./.env.${process.env.STAGE}`),
})
console.log('=> Global context started!', path.resolve(__dirname, `./.env.${process.env.STAGE}`))

const port = parseInt(process.env.PORT || '', 10) || 3000
const dev = process.env.IS_LOCAL === 'true'

/**
 * Get the current Build Id
 */
let buildId

try {
  const buildConfig = fs.readFileSync('.build.config.json').toString('utf-8')
  buildId = buildConfig && JSON.parse(buildConfig).buildId
} catch (e) {
  console.error(e)
}

if (!buildId && !dev) {
  throw (new Error('InvalidBuildId').message = `Invalid build id: ${buildId}. Was the script setBuildId.js not called?`)
}

/**
 * Create the server
 * @returns {app}
 */
function createServer(app) {
  const server = express()

  server.use(compression())

  handleRoutes(server, (route) => (req, res) => app.render(req, res, `/${route}`))

  const handle = app.getRequestHandler()
  server.all('*', (req, res) => handle(req, res))

  return server
}

if (dev) {
  const next = require('next')
  const app = next({ dev })
  app.prepare().then(() => {
    const server = createServer(app)

    server.listen(port, (err) => {
      if (err) {
        throw err
      }
      // tslint:disable-next-line
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
} else {
  const server = createServer()

  module.exports = server
}
