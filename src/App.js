import React from 'react';
import ChatbotReact from './chatbotReact';
import './App.css';

function App() {
  const handleChatEvent = (event) => {
    console.log('Chat event:', event);
  };

  return (
    <div className="App">
      <ChatbotReact 
        clientId="6fc1fdd2-e4cd-4621-a716-49a8971ad0c5" 
        onChatEvent={handleChatEvent}
      />
    </div>
  );
}

export default App;