import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap, Rocket, Gift, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
  popular?: boolean;
  free?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  storageLimit: string;
  badge?: string;
}

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Plano FREE',
    price: 'R$ 0',
    priceDescription: '/mês',
    description: 'Comece gratuitamente e explore nossa plataforma',
    storageLimit: '1 GB',
    free: true,
    badge: 'Gratuito',
    icon: Gift,
    features: [
      { text: '1 GB de armazenamento', included: true },
      { text: '10 consultas por dia', included: true },
      { text: 'Suporte básico', included: true },
      { text: 'API limitada', included: true },
      { text: 'Análises avançadas', included: false },
      { text: 'Suporte prioritário', included: false },
      { text: 'Integrações premium', included: false },
    ]
  },
  // {
  //   id: 'starter',
  //   name: 'Plano Starter',
  //   price: 'R$ 29',
  //   priceDescription: '/mês',
  //   description: 'Ideal para pequenos projetos e testes iniciais',
  //   storageLimit: '5 GB',
  //   icon: Zap,
  //   features: [
  //     { text: '5 GB de armazenamento', included: true },
  //     { text: '100 consultas por dia', included: true },
  //     { text: 'Suporte por email', included: true },
  //     { text: 'API básica', included: true },
  //     { text: 'Análises avançadas', included: false },
  //     { text: 'Suporte prioritário', included: false },
  //     { text: 'Integrações premium', included: false },
  //   ]
  // },
  // {
  //   id: 'pro',
  //   name: 'Plano Pro',
  //   price: 'R$ 79',
  //   priceDescription: '/mês',
  //   description: 'Para empresas em crescimento que precisam de mais recursos',
  //   storageLimit: '15 GB',
  //   popular: true,
  //   badge: 'Mais Popular',
  //   icon: Crown,
  //   features: [
  //     { text: '15 GB de armazenamento', included: true },
  //     { text: '1.000 consultas por dia', included: true },
  //     { text: 'Suporte prioritário', included: true },
  //     { text: 'API completa', included: true },
  //     { text: 'Análises avançadas', included: true },
  //     { text: 'Integrações premium', included: true },
  //     { text: 'Backup automático', included: true },
  //   ]
  // },
  // {
  //   id: 'master',
  //   name: 'Plano Master',
  //   price: 'R$ 149',
  //   priceDescription: '/mês',
  //   description: 'Solução enterprise com recursos ilimitados',
  //   storageLimit: '50 GB',
  //   badge: 'Enterprise',
  //   icon: Rocket,
  //   features: [
  //     { text: '50 GB de armazenamento', included: true },
  //     { text: 'Consultas ilimitadas', included: true },
  //     { text: 'Suporte 24/7', included: true },
  //     { text: 'API completa + Webhooks', included: true },
  //     { text: 'Análises avançadas', included: true },
  //     { text: 'Integrações premium', included: true },
  //     { text: 'Backup automático', included: true },
  //     { text: 'Gerente de conta dedicado', included: true },
  //   ]
  // }
];

const SelectPlanPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSelectPlan = (plan: Plan) => {
    if (plan.free) {
      // Redireciona para o cadastro de empresa
      navigate('/register/company');
    } else {
      // Para planos pagos, redireciona para Kiwify (implementar futuramente)
      console.log(`Selecionado plano pago: ${plan.name}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">{t('selectPlan.backToHome')}</span>
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">{t('home.alreadyHaveAccount')}</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 pt-4 md:pt-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {t('selectPlan.title')}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            {t('selectPlan.subtitle')}
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid gap-6 max-w-7xl mx-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => {
            const IconComponent = plan.icon;

            return (
              <Card 
                key={plan.id} 
                className={`relative transition-all duration-300 hover:shadow-lg ${
                  plan.popular ? 'border-primary shadow-md scale-105' : ''
                } ${plan.free ? 'border-green-500 shadow-md' : ''}`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className={`px-3 py-1 ${
                      plan.free ? 'bg-green-500 text-white' : 'bg-primary text-primary-foreground'
                    }`}>
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className={`p-3 rounded-full ${
                      plan.popular ? 'bg-primary text-primary-foreground' : 
                      plan.free ? 'bg-green-100 text-green-600' : 'bg-muted'
                    }`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                  </div>
                  
                  <div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.priceDescription}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {plan.storageLimit} de armazenamento
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {plan.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className={`rounded-full p-1 ${
                          feature.included 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          <Check className="h-3 w-3" />
                        </div>
                        <span className={`text-xs ${
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
                    className={`w-full ${
                      plan.popular ? 'bg-primary hover:bg-primary/90' : 
                      plan.free ? 'bg-green-500 hover:bg-green-600 text-white' : ''
                    }`}
                    variant={plan.popular || plan.free ? 'default' : 'outline'}
                    onClick={() => handleSelectPlan(plan)}
                  >
                    {plan.free ? 'Começar Grátis' : `Escolher ${plan.name}`}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="text-center space-y-4 pt-6 md:pt-8 border-t max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold">{t('selectPlan.whyFree')}</h3>
          <div className="grid gap-6 text-sm md:grid-cols-3">
            <div className="space-y-2">
              <div className="h-8 w-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="h-4 w-4" />
              </div>
              <p className="font-medium">{t('selectPlan.noCommitment')}</p>
              <p className="text-muted-foreground">{t('selectPlan.noCommitmentDesc')}</p>
            </div>
            <div className="space-y-2">
              <div className="h-8 w-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="h-4 w-4" />
              </div>
              <p className="font-medium">{t('selectPlan.quickSetup')}</p>
              <p className="text-muted-foreground">{t('selectPlan.quickSetupDesc')}</p>
            </div>
            <div className="space-y-2">
              <div className="h-8 w-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="h-4 w-4" />
              </div>
              <p className="font-medium">{t('selectPlan.easyUpgrade')}</p>
              <p className="text-muted-foreground">{t('selectPlan.easyUpgradeDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectPlanPage;