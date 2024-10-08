'use strict'
import express from 'express'
import path from 'path'

const app = express()
const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, '/dist')))

// Start the server
const PORT = 8080
app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`)
	console.log('Press Ctrl+C to quit.')
})
