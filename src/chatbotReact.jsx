import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Fab, Header, Composer, Container, useClient, MessageList, ComposerInput, ComposerButton, WebchatProvider } from '@botpress/webchat';
import './style.css';
import { theme } from './theme.ts';

const configuration = {
  botName: 'Louda Auto',
  botAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBZyoyeL5-LFT1bB9EM2i_2zZzdl52L21mjQ&s',
  botDescription: 'Your online car assistant',
};

const AIVerseLink = () => (
  <div style={{ textAlign: 'center', padding: '10px', fontSize: '12px' }}>
    <a href="https://aiverse.dk" target="_blank" rel="noopener noreferrer" style={{ color: '#666', textDecoration: 'none' }}>
      Created by ...
    </a>
  </div>
);

export default function ChatbotReact({ clientId, onChatEvent }) {
  const bpClient = useClient({ clientId });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleChatEvent = (event) => {
      if (event) {
        onChatEvent(event);
      }
    };
    
    bpClient.on('*', (event) => {
      console.log(event);
      handleChatEvent(event);
    });

  }, [bpClient, onChatEvent]);

  return (
    <WebchatProvider client={bpClient} theme={theme} configuration={configuration}>
      {!open && (
        <Fab onClick={() => setOpen(o => !o)} style={{ position: 'absolute', right: 0, bottom: 0, margin: '20px' }} />
      )}
      {open && (
        <Container style={{ height: '100vh', width: '100vw', minWidth: '450px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'fixed', bottom: 0, right: 0 }}>
          <Header />
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <MessageList />
          </div>
          <Composer>
            <ComposerInput />
            <ComposerButton />
          </Composer>
          <AIVerseLink />
        </Container>
      )}
    </WebchatProvider>
  );
}

ChatbotReact.propTypes = {
  clientId: PropTypes.string.isRequired,
  onChatEvent: PropTypes.func.isRequired,
};