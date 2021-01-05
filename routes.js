exports.handleRoutes = (app, renderPage) => {
  app.get('/', renderPage(''))
  app.get('/sobre', renderPage('about'))
}
