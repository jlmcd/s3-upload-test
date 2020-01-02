require('dotenv').config()
const express = require('express')
const s3Ctrl = require('./s3Controller')
const { SERVER_PORT, BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env

const app = express()
app.set('bucket', BUCKET)
app.set('accessKeyId', AWS_ACCESS_KEY_ID)
app.set('secretAccessKey', AWS_SECRET_ACCESS_KEY)

app.post('/api/upload-s3', s3Ctrl.signAndUpload)

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))
