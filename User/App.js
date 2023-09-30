import React, { useState } from 'react';
import './App.css';
import {Link} from 'react-router-dom';

function App() {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([
    { id: 1, user: 'user', message: 'Hello, GPT!', upvotes: 0 },
    { id: 2, user: 'gpt', message: 'Hi there! How can I help?', upvotes: 0 },
  
  ]);

  const clearChat = () => {
    setChatLog([]);
  };

  const handleUpvote = async(message) => {
    let id=message.id;
    const updatedChatLog = chatLog.map((message) => {
      if (message.id === id) {
        return { ...message, upvotes: message.upvotes + 1 };
      }
      return message;
    });
    setChatLog(updatedChatLog);
    const response = await fetch("http://localhost:3001/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
    "Story":message.message
      })
    });
    const data = await response.json();

  };
  const dataFromAi=async(userMessage)=>{

    const response = await fetch("http://localhost:3001", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: userMessage.message,
      })
    });
    const data = await response.json();
    return data.message;

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = { user: 'user', message: input, upvotes: 0 };
    setChatLog((prevChatLog) => [...prevChatLog, userMessage]);
    const data = await dataFromAi(userMessage);
    setTimeout(() => {
      const gptMessage = {
        id: chatLog.length + 1, // Ensure a unique ID
        user: 'gpt',
        message: data, // Replace with actual AI response
        upvotes: 0,
      };
      setChatLog((prevChatLog) => [...prevChatLog, gptMessage]);
      setInput('');
    }, 1000); // Simulated delay
    setInput('');
  };

 

  return (
    <div className="App">
      <aside className="sidemenu" >
        <div className="side-menu-button" onClick={clearChat}>
          <span>+</span>New Story
        </div>

      </aside>

      <section className="chatbox">
        <div className="chatlog">
          {chatLog.map((message) => (
            <ChatMessage key={message.id} message={message} onUpvote={handleUpvote} />
          ))}
        </div>
        <div className="chat-input">
          <form onSubmit={(e) => handleSubmit(e)}>
            <input className="chat-text-area" value={input} type="text" onChange={(e) => setInput(e.target.value)} />
          </form>
        </div>
      </section>
    </div>
  );
}

const ChatMessage = ({ message, onUpvote }) => {

  const copyToClipboard = async(text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Text copied to clipboard!');
    } catch (err) {
      console.error('Copy to clipboard failed:', err);
      alert('Copy to clipboard failed. Please copy the text manually.');
    }
  };

  return (
    <div className={`chat-message ${message.user === 'gpt' ? 'chat-gpt' : ''}`}>
      <p className={`message-${message.user}`}>{message.user === 'user' ? 'You' : 'AI'}</p>
      <p className="message-text">{message.message}  {message.user === 'gpt' && (
        <button className="btn btn-primary copy-button"  onClick={() => copyToClipboard(message.message)}>
        Copy
      </button>
      )}</p>
      {message.user === 'gpt' && (
        <span role="img" aria-label="upvote" onClick={() => onUpvote(message)}>
          👍
          <p className="upvote-count">{message.upvotes}</p>
        </span>
      )}
    </div>
  );
};

export default App;
