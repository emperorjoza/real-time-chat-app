// src/components/MessageInput.js
import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';
import './MessageInput.css';

function MessageInput({ setMessages }) {
  const [message, setMessage] = useState('');
  const socket = useSocket();

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Emit the message to the server
      socket.emit('send_message', message);

      // Add the message to the local state to show it in the chat
      setMessages((prevMessages) => [...prevMessages, message]);

      setMessage(''); // Clear input field after sending
    }
  };

  return (
    <form onSubmit={handleSendMessage} className="message-input-form">
      <input 
        type="text" 
        value={message} 
        onChange={handleChange} 
        placeholder="Type a message" 
        className="message-input" 
      />
      <button type="submit" className="send-button">Send</button>
    </form>
  );
}

export default MessageInput;
