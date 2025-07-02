
import { useState } from 'react';

interface ChatAPIResponse {
  resposta: string;
}

interface ChatAPIRequest {
  pergunta: string;
  client_id: string;
}

export const useChatAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (pergunta: string, clientId: string): Promise<ChatAPIResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      // Para demonstração, vou simular a API
      // Na produção, substitua pela URL real: https://minhaapi.com/rag/perguntar
      const mockResponse = await new Promise<ChatAPIResponse>((resolve) => {
        setTimeout(() => {
          resolve({
            resposta: `Esta é uma resposta simulada para "${pergunta}" do cliente ${clientId}. Em produção, conecte à sua API RAG real.`
          });
        }, 1000 + Math.random() * 1000); // Simula delay da API
      });

      return mockResponse;

      // Código real para produção (descomente quando deployer):
      /*
      const response = await fetch('https://minhaapi.com/rag/perguntar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pergunta,
          client_id: clientId
        } as ChatAPIRequest),
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data: ChatAPIResponse = await response.json();
      return data;
      */
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendMessage,
    isLoading,
    error,
  };
};
