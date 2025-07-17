
(function () {
  const clientId = 'CLIENTE123'; // Coloque o ID específico aqui
  const widgetUrl = 'http://localhost:8080/chat'; // Substitua pela URL do chat

  // Remove botões duplicados se existirem
  document.querySelectorAll(`#chat-toggle-button-${clientId}`).forEach(btn => btn.remove());
  document.querySelectorAll(`#chat-widget-container-${clientId}`).forEach(c => c.remove());

  // BOTÃO TOGGLE (fora do widget)
  const toggleButton = document.createElement('div');
  toggleButton.id = `chat-toggle-button-${clientId}`;
  toggleButton.innerText = '💬';
  toggleButton.style.cssText = `
    position: fixed;
    bottom: 16px;
    right: 16px;
    width: 50px;
    height: 50px;
    background: rgb(59, 130, 246);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    color: white;
    cursor: pointer;
    user-select: none;
    z-index: 2147483647;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 12px;
  `;

  // CONTAINER DO WIDGET
  const widgetContainer = document.createElement('div');
  widgetContainer.id = `chat-widget-container-${clientId}`;
  widgetContainer.style.cssText = `
    position: fixed;
    bottom: 80px;
    right: 16px;
    width: 360px;
    height: 500px;
    background: white;
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 6px 20px;
    z-index: 2147483646;
    display: none;
    overflow: hidden;
  `;

<<<<<<< HEAD
  // BOTÃO DE FECHAR (dentro do widget)
  const closeButton = document.createElement('div');
  closeButton.innerText = '×';
  closeButton.style.cssText = `
    position: absolute;
    top: 8px;
    right: 8px;
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
    z-index: 10;
  `;

  // IFRAME DO CHAT
  const chatIframe = document.createElement('iframe');
  chatIframe.id = `chat-widget-iframe-${clientId}`;
  chatIframe.src = `${widgetUrl}?client_id=${encodeURIComponent(clientId)}`;
  chatIframe.style.cssText = `
    border: none;
    width: 100%;
    height: 100%;
    background: white;
  `;

  // Monta a árvore de elementos
  widgetContainer.appendChild(closeButton);
  widgetContainer.appendChild(chatIframe);
  document.body.appendChild(widgetContainer);
  document.body.appendChild(toggleButton);

  // Ações
  toggleButton.onclick = () => {
    widgetContainer.style.display = 'block';
    toggleButton.style.display = 'none';
  };

  closeButton.onclick = () => {
    widgetContainer.style.display = 'none';
    toggleButton.style.display = 'flex';
=======
  function createChatWidget() {
    // Container separado para o botão toggle
    const toggleButton = document.createElement('div');
    toggleButton.id = 'chat-toggle-button';
    toggleButton.style.cssText = `
      position: fixed;
      bottom: 16px;
      right: 16px;
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
      z-index: 2147483647;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;
    toggleButton.textContent = '💬';

    // Container separado para o chat iframe
    const widgetContainer = document.createElement('div');
    widgetContainer.id = 'chat-widget-container';
    widgetContainer.style.cssText = `
      position: fixed;
      bottom: 16px;
      right: 16px;
      width: 400px;
      height: 600px;
      border-radius: 12px;
      overflow: hidden;
      z-index: 2147483646;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      background: white;
      display: none;
    `;

    const chatIframe = document.createElement('iframe');
    chatIframe.id = 'chat-widget-iframe';
    chatIframe.src = `${widgetUrl}?client_id=${encodeURIComponent(clientId)}`;
    chatIframe.style.cssText = `
      border: none;
      width: 100%;
      height: 100%;
      background: white;
      border-radius: 12px;
    `;

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
      widgetContainer.style.display = 'block';

      toggleButton.style.display = 'none';
      closeButton.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
      isOpen = false;

      widgetContainer.style.display = 'none';
      toggleButton.style.display = 'flex';
      closeButton.style.display = 'none';
    });

    widgetContainer.appendChild(chatIframe);
    widgetContainer.appendChild(closeButton);
    document.body.appendChild(toggleButton);
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
>>>>>>> b5b7440c547dd0eb4c86d5ca713f0036cb282b7d
  };
})();

