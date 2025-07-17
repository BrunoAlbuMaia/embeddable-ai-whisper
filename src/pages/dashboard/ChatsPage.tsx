import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  MessageSquare, 
  Bot, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  ExternalLink 
} from 'lucide-react';

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  status: 'active' | 'archived';
}

const ChatsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [aiTrained, setAiTrained] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);

  useEffect(() => {
    // Simulate loading and check AI training status
    const timer = setTimeout(() => {
      setIsLoading(false);
      setAiTrained(true); // Simulate AI is trained
      setChatHistory([
        {
          id: '1',
          title: 'Dúvidas sobre produtos',
          lastMessage: 'Obrigado pela ajuda!',
          timestamp: '2024-01-15 14:30',
          status: 'active'
        },
        {
          id: '2',
          title: 'Suporte técnico',
          lastMessage: 'Como posso resolver esse problema?',
          timestamp: '2024-01-15 10:15',
          status: 'active'
        }
      ]);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleNewChat = () => {
    // Here you would typically open a new chat interface
    console.log('Iniciando novo chat...');
  };

  const handleViewWidget = () => {
    // Navigate to widget integration guide
    window.open('/', '_blank');
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Chats</h1>
          <p className="text-muted-foreground">
            Gerencie conversas e inicie novos chats com a IA
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleViewWidget}>
            <ExternalLink className="mr-2 h-4 w-4" />
            Ver Widget
          </Button>
          <Button onClick={handleNewChat}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Chat
          </Button>
        </div>
      </div>

      {/* AI Status Alert */}
      <Alert className={aiTrained ? "border-green-500 bg-green-50" : "border-orange-500 bg-orange-50"}>
        {aiTrained ? (
          <CheckCircle className="h-4 w-4 text-green-600" />
        ) : (
          <AlertCircle className="h-4 w-4 text-orange-600" />
        )}
        <AlertDescription className={aiTrained ? "text-green-800" : "text-orange-800"}>
          {aiTrained 
            ? "✅ IA treinada e pronta para conversas! Seus documentos foram processados com sucesso."
            : "⚠️ IA não está treinada. Faça upload de documentos na seção 'Documentos' para treinar a IA."
          }
        </AlertDescription>
      </Alert>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Chats</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 esta semana</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chats Ativos</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Conversas em andamento</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3m</div>
            <p className="text-xs text-muted-foreground">Por conversa</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfação</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">Avaliações positivas</p>
          </CardContent>
        </Card>
      </div>

      {/* Chat History */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Conversas</CardTitle>
          <CardDescription>
            Últimas conversas realizadas com a IA
          </CardDescription>
        </CardHeader>
        <CardContent>
          {chatHistory.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Nenhuma conversa ainda</h3>
              <p className="text-muted-foreground mb-4">
                Inicie sua primeira conversa com a IA
              </p>
              <Button onClick={handleNewChat}>
                <Plus className="mr-2 h-4 w-4" />
                Iniciar Chat
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {chatHistory.map((chat, index) => (
                <div key={chat.id}>
                  <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{chat.title}</h4>
                        <p className="text-sm text-muted-foreground">{chat.lastMessage}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={chat.status === 'active' ? 'default' : 'secondary'}>
                        {chat.status === 'active' ? 'Ativo' : 'Arquivado'}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{chat.timestamp}</span>
                    </div>
                  </div>
                  {index < chatHistory.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Widget Integration Guide */}
      <Card className="border-dashed border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Integração do Widget
          </CardTitle>
          <CardDescription>
            Seu chat está pronto para ser integrado em qualquer site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Código de integração:</p>
              <code className="text-sm bg-background p-2 rounded border block">
                {`<script src="${window.location.origin}/embed.js" 
        data-client-id="SEU_CLIENT_ID" 
        data-widget-url="${window.location.origin}/chat">
</script>`}
              </code>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleViewWidget}>
                <ExternalLink className="mr-2 h-4 w-4" />
                Ver Exemplo de Integração
              </Button>
              <Button variant="outline">
                Copiar Código
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatsPage;