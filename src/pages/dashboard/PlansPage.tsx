import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap, Rocket, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  priceDescription: string;
  description: string;
  features: PlanFeature[];
  kiwifyUrl: string;
  popular?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  storageLimit: string;
  badge?: string;
}

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Plano Starter',
    price: 'R$ 29',
    priceDescription: '/mês',
    description: 'Ideal para pequenos projetos e testes iniciais',
    storageLimit: '5 GB',
    icon: Zap,
    kiwifyUrl: 'https://kiwify.app/checkout/SEU_PRODUTO_STARTER_ID', // Substituir pela URL real do Kiwify
    features: [
      { text: '5 GB de armazenamento', included: true },
      { text: '100 consultas por dia', included: true },
      { text: 'Suporte por email', included: true },
      { text: 'API básica', included: true },
      { text: 'Análises avançadas', included: false },
      { text: 'Suporte prioritário', included: false },
      { text: 'Integrações premium', included: false },
    ]
  },
  {
    id: 'pro',
    name: 'Plano Pro',
    price: 'R$ 79',
    priceDescription: '/mês',
    description: 'Para empresas em crescimento que precisam de mais recursos',
    storageLimit: '15 GB',
    popular: true,
    badge: 'Mais Popular',
    icon: Crown,
    kiwifyUrl: 'https://kiwify.app/checkout/SEU_PRODUTO_PRO_ID', // Substituir pela URL real do Kiwify
    features: [
      { text: '15 GB de armazenamento', included: true },
      { text: '1.000 consultas por dia', included: true },
      { text: 'Suporte prioritário', included: true },
      { text: 'API completa', included: true },
      { text: 'Análises avançadas', included: true },
      { text: 'Integrações premium', included: true },
      { text: 'Backup automático', included: true },
    ]
  },
  {
    id: 'master',
    name: 'Plano Master',
    price: 'R$ 149',
    priceDescription: '/mês',
    description: 'Solução enterprise com recursos ilimitados',
    storageLimit: '50 GB',
    badge: 'Enterprise',
    icon: Rocket,
    kiwifyUrl: 'https://kiwify.app/checkout/SEU_PRODUTO_MASTER_ID', // Substituir pela URL real do Kiwify
    features: [
      { text: '50 GB de armazenamento', included: true },
      { text: 'Consultas ilimitadas', included: true },
      { text: 'Suporte 24/7', included: true },
      { text: 'API completa + Webhooks', included: true },
      { text: 'Análises avançadas', included: true },
      { text: 'Integrações premium', included: true },
      { text: 'Backup automático', included: true },
      { text: 'Gerente de conta dedicado', included: true },
    ]
  }
];

const PlansPage: React.FC = () => {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSelectPlan = async (plan: Plan) => {
    setLoadingPlan(plan.id);
    
    try {
      // Simula um pequeno delay para mostrar o loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redireciona para o checkout do Kiwify
      window.open(plan.kiwifyUrl, '_blank');
      
      toast({
        title: "Redirecionando para checkout",
        description: `Você será direcionado para completar a compra do ${plan.name}`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível redirecionar para o checkout. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Escolha seu Plano</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Selecione o plano que melhor se adapta às suas necessidades e comece a aproveitar 
          todos os recursos da nossa plataforma de IA.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => {
          const IconComponent = plan.icon;
          const isLoading = loadingPlan === plan.id;

          return (
            <Card 
              key={plan.id} 
              className={`relative transition-all duration-300 hover:shadow-lg ${
                plan.popular ? 'border-primary shadow-md scale-105' : ''
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-3 py-1">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className={`p-3 rounded-full ${
                    plan.popular ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                </div>
                
                <div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.priceDescription}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {plan.storageLimit} de armazenamento
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`rounded-full p-1 ${
                        feature.included 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <Check className="h-3 w-3" />
                      </div>
                      <span className={`text-sm ${
                        feature.included ? '' : 'text-muted-foreground line-through'
                      }`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button 
                  className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => handleSelectPlan(plan)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Processando...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Escolher {plan.name}
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="text-center space-y-4 pt-8 border-t">
        <h3 className="text-lg font-semibold">Precisa de mais informações?</h3>
        <p className="text-muted-foreground">
          Todos os planos incluem período de teste gratuito de 7 dias. 
          Cancele a qualquer momento sem compromisso.
        </p>
        <div className="flex justify-center gap-4 text-sm text-muted-foreground">
          <span>✓ Sem taxa de setup</span>
          <span>✓ Suporte incluído</span>
          <span>✓ Upgrades instantâneos</span>
        </div>
      </div>
    </div>
  );
};

export default PlansPage;