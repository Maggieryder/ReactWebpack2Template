const express = require('express')
const path = require('path')

const app = express()

const PORT = process.env.PORT || 1080

// server routes here ...

if (process.env.NODE_ENV !== 'production'){
  const webpackMiddleware = require('webpack-dev-middleware')
  const webpack = require('webpack')
  const webpackConfig = require('./webpackConfig.js')
  app.use(webpackMiddleware(webpack(webpackConfig)))
} else {
  app.use(express.static('dist'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
  })
}

app.listen(PORT, () => console.log('Listening on port', PORT))
