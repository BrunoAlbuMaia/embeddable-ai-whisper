
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, ArrowRight, Settings, Code, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ChatWidget from '../components/ChatWidget';

const Index = () => {
  const { t } = useTranslation();
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
              <Bot className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              <span className="text-lg md:text-xl font-bold">AI Widget Demo</span>
            </div>
            <div className="flex gap-1 md:gap-2">
              <Button variant="outline" size="sm" className="hidden sm:flex" asChild>
                <Link to="/login">{t('auth.login')}</Link>
              </Button>
              <Button variant="secondary" size="sm" asChild>
                <Link to="/register">{t('home.createAccount')}</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/dashboard">
                  <span className="hidden sm:inline">Dashboard</span>
                  <ArrowRight className="h-4 w-4 sm:ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <Badge variant="secondary" className="mb-4">
              {t('home.newVersion')}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {t('home.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto px-4">
              {t('home.subtitle')}
            </p>
            <div className="bg-card rounded-xl p-4 md:p-6 shadow-lg inline-block border max-w-sm md:max-w-none mx-auto">
              <div className="flex flex-col sm:flex-row items-center gap-2 mb-2">
                <Badge variant="outline">{t('home.clientId')}</Badge>
                <code className="bg-muted px-2 md:px-3 py-1 rounded font-mono text-xs md:text-sm text-primary break-all">
                  {clientId}
                </code>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">
                {t('home.tryChat')}
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 md:gap-8 mb-12 md:mb-16 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Code className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <CardTitle className="text-lg md:text-xl">{t('home.integration.title')}</CardTitle>
                <CardDescription>
                  {t('home.integration.desc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 p-3 md:p-4 rounded-lg font-mono text-xs md:text-sm overflow-x-auto">
                  <div className="text-muted-foreground mb-2">HTML:</div>
                  <code className="text-primary text-xs block break-all">
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
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <MessageSquare className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <CardTitle className="text-lg md:text-xl">{t('home.howItWorks.title')}</CardTitle>
                <CardDescription>
                  {t('home.howItWorks.desc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    {t('home.features.clickButton')}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    {t('home.features.typeQuestion')}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    {t('home.features.aiResponds')}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    {t('home.features.worksAnyDevice')}
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow sm:col-span-2 lg:col-span-1">
              <CardHeader>
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Settings className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <CardTitle className="text-lg md:text-xl">{t('home.dashboard.title')}</CardTitle>
                <CardDescription>
                  {t('home.dashboard.desc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="outline" className="mr-2">{t('nav.documents')}</Badge>
                  <Badge variant="outline" className="mr-2">{t('nav.segments')}</Badge>
                  <Badge variant="outline" className="mr-2">Analytics</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Interface moderna para controle total da sua IA
                </p>
              </CardContent>
            </Card>
          </div>

          {/* React Integration Example */}
          <Card className="mb-12 md:mb-16 border-2 border-dashed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Code className="h-5 w-5" />
                Integração em React/Next.js
              </CardTitle>
              <CardDescription>
                Exemplo completo de como integrar o widget em projetos React
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 md:p-6 rounded-lg font-mono text-xs md:text-sm overflow-x-auto">
                <div className="text-muted-foreground mb-2">// Component.tsx ou Component.jsx</div>
                <pre className="text-foreground whitespace-pre-wrap break-all md:break-normal">
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
              <CardContent className="pt-6 pb-6 md:pt-8 md:pb-8 px-4 md:px-6">
                <h2 className="text-xl md:text-2xl font-bold mb-4">{t('home.ready')}</h2>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm md:text-base">
                  {t('home.readySubtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                  <Button size="sm" className="md:size-lg" asChild>
                    <Link to="/register">
                      {t('home.getStarted')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="md:size-lg" asChild>
                    <Link to="/dashboard">{t('home.accessDashboard')}</Link>
                  </Button>
                  <Button variant="outline" size="sm" className="md:size-lg hidden sm:flex" asChild>
                    <Link to="/login">{t('auth.login')}</Link>
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
