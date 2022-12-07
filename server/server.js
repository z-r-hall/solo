const path = require('path')
const express = require('express')
const app = express()

const apiRouter = require('../routes/api.js')

const port = 3000;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.resolve(__dirname, '../public')))

app.use('/api', apiRouter)

app.use((req, res) => {
  res.status(404).send('This is not the page you are looking for.')
})

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught an unknown middleware error',
    status: 500,
    message: {err: 'An error occurred'}
  }
  const errObj = Object.assign({}, defaultErr, err)
  return res.status(errObj.status).json(errObj.message)
})

app.listen(port, () => {
  console.log('Server listening on port 3000...')
})

module.exports = app;