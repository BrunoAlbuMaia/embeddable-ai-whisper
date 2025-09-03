import { useState } from 'react';

interface ChatAPIResponse {
  resposta: string;
}

interface ChatAPIRequest {
  query: string;      // a tua API usa "query"
  client_id: string;
  segment_id?: string; // se precisar, você pode passar também
}

export const useChatAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (query: string, company_id: string): Promise<ChatAPIResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:9005/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          client_id: "1812f889-670a-426e-a2f6-cc3b7fb19cb0",
          segment_id: "a1417f8a-92fd-46b0-bb29-343e3e376c01" // se precisar fixo
        } as ChatAPIRequest),
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data: ChatAPIResponse = await response.json();
    
      return data
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
