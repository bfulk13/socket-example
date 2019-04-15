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


const io = socket(app.listen(SERVER_PORT, () => console.log(`002 Server Start ${SERVER_PORT}`)));

io.on('connection', function(socket){
  
  socket.on('joinRoom', function(roomName){
    console.log(roomName)
    socket.join(roomName)
  })

  socket.on('leaveRoom', function(roomName){
    socket.leave(roomName)
  })

  socket.on('sendMsg', async (data)=> {
    console.log(data)
    const { room, msg, user } = data
    const db = app.get('db')
    await db.chat.create_message({ room: room, message: msg, user_name: user })
    let messages = await db.chat.get_message_history({ room: room })
  io.to(data.room).emit('sendMsg', messages)
})
  
})
