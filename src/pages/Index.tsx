import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, ArrowRight, Settings, Code, MessageSquare, Zap, Shield, Users, FileText, Check, Star, MessageCircle, Mail, Building, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
const Index = () => {
  const { t } = useTranslation();
  const [typedText, setTypedText] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const fullText = "Como configurar o widget de chat no meu site?";
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 80);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "http://localhost:8080/embed.js";
    script.setAttribute("data-client-id", "DEMO123");
    script.setAttribute("data-widget-url", "http://localhost:8080/chat");
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const scrollToForm = () => {
    const formSection = document.getElementById('lead-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envio do formulário
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    setEmail("");
    setName("");
    setCompany("");
    
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const benefits = [
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: "Implementação Rápida",
      description: "Configure seu chat IA em minutos com apenas algumas linhas de código. Sem complicações técnicas."
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: "Dados Seguros",
      description: "Seus documentos ficam protegidos com criptografia de ponta. Total controle sobre suas informações."
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Experiência Personalizada",
      description: "IA treinada especificamente com seus documentos para respostas precisas e contextualizadas."
    },
    {
      icon: <FileText className="h-8 w-8 text-orange-600" />,
      title: "Múltiplos Formatos",
      description: "Suporte para PDFs, Word, planilhas e mais. Importe todo seu conhecimento de uma vez."
    }
  ];

  const testimonials = [
    {
      name: "Arlindo Costa",
      role: "Coordenador de TI",
      company: "Multiverso",
      content: "Reduziu 80% dos tickets de suporte referente ao uso dos nossos sistemas",
      rating: 5
    },
    {
      name: "Ana Santos",
      role: "Diretora de RH",
      company: "Multiverso",
      content: "Onboarding de novos funcionários ficou 5x mais eficiente. Impressionante, é como se todo conhecimento dos nossos processos estivessem nesse chat!",
      rating: 5
    },
    {
      name: "Roberto Lima",
      role: "Gerente Financeiro",
      company: "Fortal Connect",
      content: "Muito ultimo, pois todos nossos processos ficam guardados em documentos, e eu consigo tirar duvidas sobre qualquer documento de forma rapida e fácil.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                RAG Master
              </span>
            </div>
           <div className="flex gap-1 md:gap-2">
              <Button variant="outline" size="sm" className=" sm:flex" asChild>
                <Link to="/login">{t('auth.login')}</Link>
              </Button>
              {/* <Button variant="secondary" size="sm" asChild>
                <Link to="/register">{t('home.createAccount')}</Link>
              </Button> */}
             
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              🚀 Nova versão disponível - Teste grátis por 30 dias
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Transforme seus{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                documentos
              </span>{" "}
              em um assistente IA inteligente
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Crie chatbots personalizados treinados com seus próprios documentos. 
              Integre facilmente em sites, aplicativos ou use internamente na sua empresa.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              onClick={scrollToForm}>
                Teste Grátis Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            
            </div>
            
            <p className="text-sm text-gray-500">
              ✅ Sem cartão de crédito • ✅ Configuração em 5 minutos • ✅ Suporte em português
            </p>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Veja como funciona na prática
            </h2>
            <p className="text-xl text-gray-600">
              Seus usuários fazem perguntas naturais e recebem respostas baseadas nos seus documentos
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 shadow-2xl">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-6 w-6 text-white" />
                  <span className="text-white font-semibold">Assistente IA</span>
                  <div className="ml-auto flex gap-1">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white text-sm">Online</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-4 min-h-[300px]">
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white p-3 rounded-2xl max-w-md shadow-lg">
                    <p className="font-mono">{typedText}<span className="animate-pulse">|</span></p>
                  </div>
                </div>
                
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-4 rounded-2xl max-w-lg shadow-lg">
                    <p className="text-gray-800 mb-2">
                      <strong>Atendente:</strong>
                    </p>
                    <p className="text-gray-700 mb-3">
                      Para configurar o widget em seu site, você precisa adicionar este código antes do fechamento da tag
                    </p>
                    <div className="bg-gray-800 text-green-400 p-3 rounded-lg font-mono text-sm mb-3">
                      &lt;script src="embed.js"<br/>
                      &nbsp;&nbsp;data-client-id="SEU_ID"&gt;<br/>
                      &lt;/script&gt;
                    </div>
                    <p className="text-xs text-gray-800 italic text-right">
                     12:48
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher nossa plataforma?
            </h2>
            <p className="text-xl text-gray-600">
              Recursos pensados para facilitar sua vida e de seus usuários
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Example */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Integração simples em qualquer plataforma
            </h2>
            <p className="text-xl text-gray-600">
              Funciona em WordPress, React, Angular, Vue.js e qualquer site HTML
            </p>
          </div>

          <Card className="border-2 border-dashed border-gray-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Exemplo de Integração
              </CardTitle>
              <CardDescription>
                Cole este código em seu site e pronto!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                <div className="text-gray-400 mb-2">// Adicione antes do &lt;/body&gt;</div>
                <pre className="whitespace-pre-wrap">
{`<script src="https://seu-dominio.com/embed.js"
  data-client-id="SEU_CLIENT_ID"
  data-widget-url="https://seu-dominio.com/chat"
  data-theme="modern"
  data-position="bottom-right">
</script>`}
                </pre>
              </div>
              <div className="mt-4 text-center">
                <Badge variant="outline" className="mr-2">HTML</Badge>
                <Badge variant="outline" className="mr-2">React</Badge>
                <Badge variant="outline" className="mr-2">WordPress</Badge>
                <Badge variant="outline">Shopify</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">
            Resultados comprovados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-white">
              <div className="text-5xl font-bold mb-2">95%</div>
              <p className="text-xl text-blue-100">Redução em tickets de suporte</p>
            </div>
            <div className="text-white">
              <div className="text-5xl font-bold mb-2">&lt;2s</div>
              <p className="text-xl text-blue-100">Tempo médio de resposta</p>
            </div>
            <div className="text-white">
              <div className="text-5xl font-bold mb-2">24/7</div>
              <p className="text-xl text-blue-100">Disponibilidade total</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Empresas que confiam em nós
            </h2>
            <p className="text-xl text-gray-600">
              Veja o que nossos clientes dizem sobre a plataforma
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-blue-600 font-medium">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section id="lead-form" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Pronto para começar?
            </h2>
            <p className="text-xl text-gray-600">
              Teste gratuitamente por 30 dias. Sem compromisso, sem cartão de crédito.
            </p>
          </div>
          
          <Card className="bg-white shadow-2xl">
            <CardContent className="p-8">
              {showSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Obrigado pelo interesse!</h3>
                  <p className="text-gray-600 mb-4">
                    Em breve entraremos em contato com mais informações sobre o teste gratuito.
                  </p>
                  <Button 
                    onClick={() => setShowSuccess(false)}
                    variant="outline"
                  >
                    Enviar outro formulário
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome completo *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Seu nome"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email profissional *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome da empresa
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nome da sua empresa"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        Começar Teste Gratuito
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    Ao enviar, você aceita nossos termos de uso e política de privacidade.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Bot className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                RAG Master
              </span>
            </div>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              A plataforma mais avançada para criar assistentes IA personalizados com seus documentos.
              Transforme conhecimento em inteligência artificial.
            </p>
          </div>
          
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-3">Produto</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Suporte</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentação</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div> */}
          
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 RAG Master. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;