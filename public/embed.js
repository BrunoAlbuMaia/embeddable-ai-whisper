
(function() {
  'use strict';
  
  // Verifica se já foi carregado para evitar duplicatas
  if (window.ChatWidgetLoaded) {
    return;
  }
  window.ChatWidgetLoaded = true;

  // Obtém o script atual para pegar os parâmetros
  const currentScript = document.currentScript || 
    (function() {
      const scripts = document.getElementsByTagName('script');
      return scripts[scripts.length - 1];
    })();
  
  const clientId = currentScript.getAttribute('data-client-id') || 'default';
  const widgetUrl = currentScript.getAttribute('data-widget-url') || 
    window.location.origin; // Em produção, substitua pelo seu domínio

  // Função para criar o iframe do chat
  function createChatWidget() {
    // Container do widget
    const widgetContainer = document.createElement('div');
    widgetContainer.id = 'chat-widget-container';
    widgetContainer.style.cssText = `
      position: fixed;
      bottom: 0;
      right: 0;
      z-index: 2147483647;
      pointer-events: none;
    `;

    // iframe do chat
    const chatIframe = document.createElement('iframe');
    chatIframe.id = 'chat-widget-iframe';
    chatIframe.src = `${widgetUrl}?client_id=${encodeURIComponent(clientId)}`;
    chatIframe.style.cssText = `
      border: none;
      background: transparent;
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: auto;
    `;
    
    // Atributos de segurança e acessibilidade
    chatIframe.setAttribute('title', 'Chat Widget');
    chatIframe.setAttribute('allowtransparency', 'true');
    chatIframe.setAttribute('scrolling', 'no');

    widgetContainer.appendChild(chatIframe);
    document.body.appendChild(widgetContainer);

    // Log para debug
    console.log('Chat Widget carregado para cliente:', clientId);
  }

  // Carrega o widget quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createChatWidget);
  } else {
    createChatWidget();
  }

  // Função para remover o widget (útil para testes)
  window.removeChatWidget = function() {
    const container = document.getElementById('chat-widget-container');
    if (container) {
      container.remove();
      window.ChatWidgetLoaded = false;
    }
  };
})();
