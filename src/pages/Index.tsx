
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, ArrowRight, Settings, Code, MessageSquare } from 'lucide-react';
import ChatWidget from '../components/ChatWidget';

const Index = () => {
  const [clientId, setClientId] = useState<string>('CLIENTE123');

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "http://localhost:8080/embed.js";
    script.setAttribute("data-client-id", "CLIENTE123");
    script.setAttribute("data-widget-url", "http://localhost:8080/chat");
    script.async = true;
    document.body.appendChild(script);

    // opcional: limpeza
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">AI Widget Demo</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link to="/register">Criar Conta</Link>
              </Button>
              <Button asChild>
                <Link to="/dashboard">
                  Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Nova Versão 2.0
            </Badge>
            <h1 className="text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Widget de Chat IA Inteligente
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Integre inteligência artificial conversacional em qualquer site com apenas uma linha de código
            </p>
            <div className="bg-card rounded-xl p-6 shadow-lg inline-block border">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">Cliente ID</Badge>
                <code className="bg-muted px-3 py-1 rounded font-mono text-sm text-primary">
                  {clientId}
                </code>
              </div>
              <p className="text-sm text-muted-foreground">
                Experimente o chat no canto inferior direito! 👉
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Integração Ultra-Simples</CardTitle>
                <CardDescription>
                  Adicione o widget em qualquer site com apenas uma linha de código
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <div className="text-muted-foreground mb-2">HTML:</div>
                  <code className="text-primary text-xs block">
                    {`<script src="${window.location.origin}/embed.js"
  data-client-id="SEU_ID"
  data-widget-url="${window.location.origin}/chat">
</script>`}
                  </code>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Como Funciona</CardTitle>
                <CardDescription>
                  Interface intuitiva e responsiva para qualquer dispositivo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    Clique no botão flutuante
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    Digite sua pergunta
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    IA responde instantaneamente
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    Funciona em qualquer dispositivo
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Dashboard Completo</CardTitle>
                <CardDescription>
                  Gerencie documentos, segmentos e monitore conversas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="outline" className="mr-2">Documentos</Badge>
                  <Badge variant="outline" className="mr-2">Segmentos</Badge>
                  <Badge variant="outline" className="mr-2">Analytics</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Interface moderna para controle total da sua IA
                </p>
              </CardContent>
            </Card>
          </div>

          {/* React Integration Example */}
          <Card className="mb-16 border-2 border-dashed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Integração em React/Next.js
              </CardTitle>
              <CardDescription>
                Exemplo completo de como integrar o widget em projetos React
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-6 rounded-lg font-mono text-sm overflow-x-auto">
                <div className="text-muted-foreground mb-2">// Component.tsx ou Component.jsx</div>
                <pre className="text-foreground whitespace-pre-wrap">
{`const [clientId, setClientId] = useState<string>('CLIENTE123');

useEffect(() => {
  const script = document.createElement("script");
  script.src = "${window.location.origin}/embed.js";
  script.setAttribute("data-client-id", "CLIENTE123");
  script.setAttribute("data-widget-url", "${window.location.origin}/chat");
  script.async = true;
  document.body.appendChild(script);

  // Limpeza opcional
  return () => {
    if (document.body.contains(script)) {
      document.body.removeChild(script);
    }
  };
}, []);`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <CardContent className="pt-8 pb-8">
                <h2 className="text-2xl font-bold mb-4">Pronto para começar?</h2>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                  Acesse o dashboard para configurar sua IA e começar a treinar com seus documentos
                </p>
                <div className="flex gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link to="/register">
                      Começar Grátis
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/dashboard">Acessar Dashboard</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/login">Fazer Login</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
