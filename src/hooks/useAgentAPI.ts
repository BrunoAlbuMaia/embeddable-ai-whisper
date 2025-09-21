import { useState } from 'react';

export interface Segment {
  id: string;
  name: string;
  description?: string;
}

export interface ChatbotSegmentRequest {
  segment_id: string;
}

export interface ChatbotRequest {
  company_id: string;
  name: string;
  description?: string;
  is_active: boolean;
  url_base: string;
  segments: ChatbotSegmentRequest[];
}

export const useAgentAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSegments = async (page = 1, size = 50, name?: string): Promise<Segment[]> => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        ...(name && { name })
      });

      const response = await fetch(`http://localhost:9005/api/segments?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const createAgent = async (request: ChatbotRequest): Promise<any> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:9005/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getSegments,
    createAgent,
    isLoading,
    error,
  };
};