const express = require('express')
const compression = require('compression')

const serverless = require('serverless-http')
const { handleRoutes } = require('./routes')

const app = express()

const renderPage = (page) => require(`./.next/serverless/pages/${page}`).render

app.use(compression())

handleRoutes(app, renderPage)
app.get('*', renderPage('_error'))

exports.handler = serverless(app)
