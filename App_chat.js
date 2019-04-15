import React, { Component } from 'react';
import io from 'socket.io-client'

import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      input: '',
      message: '',
      messages: [],
      room: 0,
      user: ''
    }
  }

  componentDidMount(){
    this.setSocketListeners()
  }

  componentWillUnmount(){
    this.socket.disconnect()
  }

  setSocketListeners = () => {
    this.socket = io()

    this.socket.on('sendMsg', msg => {
      console.log(msg)
      let messages = this.state.messages
      messages.push(msg)
      this.setState({messages:messages, message: ''})
    })

    
  }

  joinRoom = () => {
    this.socket.emit('joinRoom', this.state.room)
  }

  sendMessage = () => {
    this.socket.emit('sendMsg', {room: this.state.room, msg: this.state.message, user: this.state.user})
  }

  render() {
    console.log(this.state.messages)
    const mappedMessages = this.state.messages.map((message, i) => {
      return (
          <div key={i}>
          <p>name: {message.user}</p>
          <p>Message: {message.msg}</p>
          </div>
      )
  })
    console.log(this.state)
    return (
      <div className="App">
      <h1>Learn Socket.IO</h1>
      <p>What is your name?</p>
      <input 
        type="text" 
        placeholder='name' 
        value={this.state.user} 
        onChange={(e) => this.setState({ user: e.target.value })}/>
        <p>What room do you want to join?</p>
      <input 
        type="integer" 
        placeholder='room' 
        value={this.state.room} 
        onChange={(e) => this.setState({ room: e.target.value })}/>
      <button onClick={this.joinRoom}>Join Room</button>
      <p>What would you like to say?</p>
      <input 
        type="text" 
        placeholder='message' 
        value={this.state.message} 
        onChange={(e) => this.setState({ message: e.target.value })}/>
      <button onClick={this.sendMessage}>Send Message</button>
      {mappedMessages}
      </div>
    );
  }
}

export default App;
