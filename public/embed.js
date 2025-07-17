
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
  };
})();

