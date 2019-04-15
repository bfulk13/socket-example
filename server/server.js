require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const socket = require('socket.io')
const massive = require('massive')
const app = express();


app.use(bodyParser.json())

let { SERVER_PORT, CONNECTION_STRING } = process.env

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log(`Database Connected`)
  }).catch(err => console.log(err))


app.listen(SERVER_PORT, () => console.log(`002 Server Start ${SERVER_PORT}`));
