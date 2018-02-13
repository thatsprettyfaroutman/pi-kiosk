import express from 'express'
import path from 'path'
import {Server as httpServer} from 'http'

global.__root = path.resolve(__dirname) // eslint-disable-line

const PORT = process.env.PORT || 3001
const app = express()
const server = httpServer(app)



// ---------------------------------------------
// ---- ROUTES N SHIT
// ---------------------------------------------

app.use(express.static(path.resolve(__dirname, 'dist')))
app.use('/static', express.static(path.resolve(__dirname, 'static')))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'))
})










server.listen(PORT, () => {
  console.log(`PIKIOSK server listening port ${PORT}!`) // eslint-disable-line
})
