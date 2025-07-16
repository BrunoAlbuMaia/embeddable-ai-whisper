(function () {
  'use strict';

  if (window.ChatWidgetLoaded) return;
  window.ChatWidgetLoaded = true;

  const currentScript = document.currentScript || (function () {
    const scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  const clientId = currentScript.getAttribute('data-client-id') || 'default';
  const widgetUrl = currentScript.getAttribute('data-widget-url') || window.location.origin + '/chat';

  function createChatWidget() {
    const widgetContainer = document.createElement('div');
    widgetContainer.id = 'chat-widget-container';
    widgetContainer.style.cssText = `
      position: fixed;
      bottom: 16px;
      right: 16px;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      overflow: hidden;
      z-index: 2147483647;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      background: white;
    `;

    const chatIframe = document.createElement('iframe');
    chatIframe.id = 'chat-widget-iframe';
    chatIframe.src = `${widgetUrl}?client_id=${encodeURIComponent(clientId)}`;
    chatIframe.style.cssText = `
      border: none;
      width: 100%;
      height: 100%;
      display: none;
      background: white;
      border-radius: 12px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
    `;

    // Botão flutuante para abrir chat
    const toggleButton = document.createElement('div');
    toggleButton.id = 'chat-toggle-button';
    toggleButton.style.cssText = `
      width: 64px;
      height: 64px;
      background: #3b82f6;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      color: white;
      cursor: pointer;
      user-select: none;
      transition: all 0.3s ease;
      z-index: 1;
    `;
    toggleButton.textContent = '💬';

    // Botão X dentro do widget para fechar/minimizar chat
    const closeButton = document.createElement('div');
    closeButton.id = 'chat-close-button';
    closeButton.style.cssText = `
      position: absolute;
      top: -15px;
      right: -15px;
      width: 30px;
      height: 30px;
      background: #ef4444;
      color: white;
      font-weight: bold;
      font-size: 20px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      cursor: pointer;
      user-select: none;
      z-index: 1000;
      display: none;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    `;
    closeButton.textContent = '×'; // Ícone X

    // Controla estado aberto/fechado
    let isOpen = false;

    toggleButton.addEventListener('click', () => {
      isOpen = true;

      const isMobile = window.innerWidth <= 640;

      widgetContainer.style.width = isMobile ? '100vw' : '400px';
      widgetContainer.style.height = isMobile ? '100vh' : '600px';
      widgetContainer.style.bottom = isMobile ? '0' : '16px';
      widgetContainer.style.right = isMobile ? '0' : '16px';
      widgetContainer.style.borderRadius = isMobile ? '0' : '12px';

      chatIframe.style.display = 'block';
      toggleButton.style.display = 'none';
      closeButton.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
      isOpen = false;

      widgetContainer.style.width = '64px';
      widgetContainer.style.height = '64px';
      widgetContainer.style.bottom = '16px';
      widgetContainer.style.right = '16px';
      widgetContainer.style.borderRadius = '50%';

      chatIframe.style.display = 'none';
      toggleButton.style.display = 'flex';
      closeButton.style.display = 'none';
    });

    widgetContainer.appendChild(toggleButton);
    widgetContainer.appendChild(chatIframe);
    widgetContainer.appendChild(closeButton);
    document.body.appendChild(widgetContainer);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createChatWidget);
  } else {
    createChatWidget();
  }

  window.removeChatWidget = function () {
    const container = document.getElementById('chat-widget-container');
    if (container) {
      container.remove();
      window.ChatWidgetLoaded = false;
    }
  };
})();
