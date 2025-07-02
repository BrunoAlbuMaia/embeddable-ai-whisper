// src/pages/ChatPage.tsx
import React from 'react';
import ChatWidget from '../components/ChatWidget';
import { useLocation } from 'react-router-dom';

const ChatPage = () => {
  // Pega client_id da query string
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const clientId = params.get('client_id') || 'default';

  return (
    <div style={{ height: '100vh' }}>
      {/* Renderiza seu chat com clientId */}
      <ChatWidget clientId={clientId} />
    </div>
  );
};

export default ChatPage;
