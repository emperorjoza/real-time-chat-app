import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deleteDoc, doc, getDocs } from 'firebase/firestore';
import { 
  db, 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp 
} from '../firebase';

const ChatPage = ({ userName, onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [receiver, setReceiver] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Reset messages when username changes
    setMessages([]);

    // Create a query that gets all messages and order by timestamp
    const messagesQuery = query(
      collection(db, 'messages'), 
      orderBy('timestamp', 'asc')
    );

    // Listen to all messages
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      // Filter messages for the current user
      const userMessages = fetchedMessages.filter(
        (msg) => msg.sender === userName || msg.receiver === userName
      );

      // Sort messages by timestamp
      const sortedMessages = userMessages.sort((a, b) => 
        (a.timestamp?.seconds || 0) - (b.timestamp?.seconds || 0)
      );

      setMessages(sortedMessages);
    });

    // Clean up listener when component unmounts or username changes
    return () => unsubscribe();
  }, [userName]); // Re-run effect when username changes

  const handleSendMessage = async () => {
    if (message.trim() && receiver.trim()) {
      try {
        await addDoc(collection(db, 'messages'), {
          sender: userName,
          receiver,
          text: message,
          timestamp: serverTimestamp(),
        });
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    } else {
      alert('Please enter a message and select a receiver.');
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <ChatContainer>
      <Header>
        <h1>Welcome, {userName}!</h1>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Header>

      <ReceiverInput
        type="text"
        placeholder="Receiver's username"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
      />

      <MessagesContainer>
        {messages.length === 0 ? (
          <NoMessages>No messages yet.</NoMessages>
        ) : (
          messages.map((msg) => (
            <Message key={msg.id} isOwnMessage={msg.sender === userName}>
              <strong>{msg.sender === userName ? 'You' : msg.sender}:</strong> {msg.text}
            </Message>
          ))
        )}
      </MessagesContainer>

      <MessageInputContainer>
        <MessageInput
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <SendButton onClick={handleSendMessage}>Send</SendButton>
      </MessageInputContainer>

      <ClearChatButton onClick={handleClearChat}>Clear Chat</ClearChatButton>
    </ChatContainer>
  );
};

export default ChatPage;

// ... (styled components remain the same as in previous examples)

// Styled Components
const ChatContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f4f4f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-family: 'Arial', sans-serif;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h1 {
    margin: 0;
    font-size: 1.5rem;
    color: #333;

    @media (max-width: 480px) {
      font-size: 1.2rem;
    }
  }
`;

const LogoutButton = styled.button`
  padding: 10px 15px;
  background-color: #e63946;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #d62839;
  }

  @media (max-width: 480px) {
    padding: 8px 10px;
    font-size: 12px;
  }
`;

const ReceiverInput = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 8px;
  }
`;

const MessagesContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  padding: 10px;
  height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    height: 250px;
  }

  @media (max-width: 480px) {
    height: 200px;
  }
`;

const NoMessages = styled.p`
  text-align: center;
  color: #999;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const Message = styled.div`
  margin-bottom: 10px;
  padding: 8px;
  background-color: ${(props) => (props.isOwnMessage ? '#d1e7dd' : '#f8d7da')};
  border-radius: 4px;
  word-wrap: break-word;

  strong {
    color: ${(props) => (props.isOwnMessage ? '#0f5132' : '#842029')};
  }

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 14px;

    strong {
      font-size: 14px;
    }
  }
`;

const MessageInputContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 5px;
  }
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 14px;
  }
`;

const SendButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 14px;
  }
`;

const ClearChatButton = styled.button`
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #c62828;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 14px;
  }
`;