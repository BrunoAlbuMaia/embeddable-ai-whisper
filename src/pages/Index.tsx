
import React, { useEffect, useState } from 'react';
import ChatWidget from '../components/ChatWidget';

const Index = () => {
  const [clientId, setClientId] = useState<string>('CLIENTE123');

  useEffect(() => {
    // Simula a captura do client_id dos parâmetros da URL (como seria no iframe)
    const urlParams = new URLSearchParams(window.location.search);
    const urlClientId = urlParams.get('client_id');
    if (urlClientId) {
      setClientId(urlClientId);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Conteúdo da página simulando um site real */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Widget de Chat IA - Demo
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Demonstração do widget de chat inteligente integrado
            </p>
            <div className="bg-white rounded-lg p-6 shadow-md inline-block">
              <p className="text-sm text-gray-500 mb-2">Cliente ID atual:</p>
              <code className="bg-gray-100 px-3 py-1 rounded text-blue-600 font-mono">
                {clientId}
              </code>
            </div>
          </header>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                🚀 Integração Ultra-Simples
              </h2>
              <p className="text-gray-600 mb-4">
                Adicione o widget em qualquer site com apenas uma linha:
              </p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                {`<script src="https://widget.minhasolucoes.com/embed.js" 
        data-client-id="CLIENTE123"></script>`}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                💬 Como Funciona
              </h2>
              <ul className="text-gray-600 space-y-2">
                <li>✅ Clique no botão azul no canto inferior direito</li>
                <li>✅ Digite sua pergunta no chat</li>
                <li>✅ A IA responde com base na sua base de conhecimento</li>
                <li>✅ Funciona em qualquer dispositivo</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              📋 Especificações Técnicas
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Frontend</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• React + TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• Lucide React Icons</li>
                  <li>• Animações fluidas</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Integração</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• iframe isolado</li>
                  <li>• Script embed < 5kb</li>
                  <li>• Zero dependências</li>
                  <li>• Cross-origin ready</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">API</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• POST para sua API RAG</li>
                  <li>• client_id automático</li>
                  <li>• Tratamento de erros</li>
                  <li>• Loading states</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm">
              Experimente o chat no canto inferior direito! 👉
            </p>
          </div>
        </div>
      </div>

      {/* Widget de Chat */}
      <ChatWidget clientId={clientId} />
    </div>
  );
};

export default Index;
