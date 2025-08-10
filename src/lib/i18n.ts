import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      'nav.dashboard': 'Dashboard',
      'nav.chats': 'Chats',
      'nav.documents': 'Documents',
      'nav.segments': 'Segments',
      'nav.plans': 'Plans',
      'nav.logout': 'Logout',
      
      // Common
      'common.loading': 'Loading...',
      'common.save': 'Save',
      'common.cancel': 'Cancel',
      'common.delete': 'Delete',
      'common.edit': 'Edit',
      'common.create': 'Create',
      'common.back': 'Back',
      'common.next': 'Next',
      'common.previous': 'Previous',
      'common.close': 'Close',
      'common.search': 'Search',
      'common.filter': 'Filter',
      'common.actions': 'Actions',
      
      // Auth
      'auth.login': 'Login',
      'auth.register': 'Register',
      'auth.logout': 'Logout',
      'auth.email': 'Email',
      'auth.password': 'Password',
      'auth.firstName': 'First Name',
      'auth.lastName': 'Last Name',
      'auth.companyName': 'Company Name',
      'auth.document': 'CPF/CNPJ',
      'auth.companyId': 'Company ID',
      
      // Plans
      'plans.title': 'Choose Your Plan',
      'plans.subtitle': 'Select the perfect plan for your needs',
      'plans.free': 'Free',
      'plans.starter': 'Starter',
      'plans.pro': 'Pro',
      'plans.master': 'Master',
      'plans.monthly': 'monthly',
      'plans.getStarted': 'Get Started',
      'plans.choosePlan': 'Choose Plan',
      'plans.mostPopular': 'Most Popular',
      'plans.enterprise': 'Enterprise',
      
      // Registration
      'register.selectPlan': 'Select Plan',
      'register.companyInfo': 'Company Information',
      'register.userInfo': 'User Information',
      'register.createAccount': 'Create Account',
      'register.welcomeTitle': 'Welcome to DocsIA',
      'register.welcomeSubtitle': 'Choose your plan to get started',
      'register.companyTitle': 'Company Registration',
      'register.companySubtitle': 'Tell us about your company',
      'register.userTitle': 'Create Your Account',
      'register.userSubtitle': 'Complete your registration',
      'register.success': 'Registration completed successfully!',
      'register.error': 'Registration failed. Please try again.',
      
      // Dashboard
      'dashboard.welcome': 'Welcome to your dashboard',
      'dashboard.overview': 'Overview',
      'dashboard.recentActivity': 'Recent Activity',
      'dashboard.statistics': 'Statistics',
      
      // Tutorial
      'tutorial.welcome': 'Welcome to DocsIA!',
      'tutorial.welcomeDesc': 'Let us show you around and help you get started with our platform.',
      'tutorial.dashboard': 'Dashboard',
      'tutorial.dashboardDesc': 'This is your main dashboard where you can see an overview of your activities.',
      'tutorial.chats': 'Chats',
      'tutorial.chatsDesc': 'Manage all your AI conversations and chat history here.',
      'tutorial.documents': 'Documents',
      'tutorial.documentsDesc': 'Upload, manage and organize your documents for AI processing.',
      'tutorial.segments': 'Segments',
      'tutorial.segmentsDesc': 'Create and manage different segments for better organization.',
      'tutorial.plans': 'Plans',
      'tutorial.plansDesc': 'View and manage your subscription plans and billing.',
      'tutorial.complete': 'Tutorial Complete!',
      'tutorial.completeDesc': 'You are now ready to start using DocsIA. Enjoy exploring!',
      'tutorial.skip': 'Skip Tutorial',
      'tutorial.next': 'Next',
      'tutorial.prev': 'Previous',
      'tutorial.finish': 'Finish'
    }
  },
  pt: {
    translation: {
      // Navigation
      'nav.dashboard': 'Dashboard',
      'nav.chats': 'Conversas',
      'nav.documents': 'Documentos',
      'nav.segments': 'Segmentos',
      'nav.plans': 'Planos',
      'nav.logout': 'Sair',
      
      // Common
      'common.loading': 'Carregando...',
      'common.save': 'Salvar',
      'common.cancel': 'Cancelar',
      'common.delete': 'Excluir',
      'common.edit': 'Editar',
      'common.create': 'Criar',
      'common.back': 'Voltar',
      'common.next': 'Próximo',
      'common.previous': 'Anterior',
      'common.close': 'Fechar',
      'common.search': 'Pesquisar',
      'common.filter': 'Filtrar',
      'common.actions': 'Ações',
      
      // Auth
      'auth.login': 'Entrar',
      'auth.register': 'Cadastrar',
      'auth.logout': 'Sair',
      'auth.email': 'Email',
      'auth.password': 'Senha',
      'auth.firstName': 'Nome',
      'auth.lastName': 'Sobrenome',
      'auth.companyName': 'Nome da Empresa',
      'auth.document': 'CPF/CNPJ',
      'auth.companyId': 'ID da Empresa',
      
      // Plans
      'plans.title': 'Escolha Seu Plano',
      'plans.subtitle': 'Selecione o plano perfeito para suas necessidades',
      'plans.free': 'Gratuito',
      'plans.starter': 'Iniciante',
      'plans.pro': 'Profissional',
      'plans.master': 'Master',
      'plans.monthly': 'mensal',
      'plans.getStarted': 'Começar',
      'plans.choosePlan': 'Escolher Plano',
      'plans.mostPopular': 'Mais Popular',
      'plans.enterprise': 'Empresarial',
      
      // Registration
      'register.selectPlan': 'Selecionar Plano',
      'register.companyInfo': 'Informações da Empresa',
      'register.userInfo': 'Informações do Usuário',
      'register.createAccount': 'Criar Conta',
      'register.welcomeTitle': 'Bem-vindo ao DocsIA',
      'register.welcomeSubtitle': 'Escolha seu plano para começar',
      'register.companyTitle': 'Cadastro da Empresa',
      'register.companySubtitle': 'Conte-nos sobre sua empresa',
      'register.userTitle': 'Crie Sua Conta',
      'register.userSubtitle': 'Complete seu cadastro',
      'register.success': 'Cadastro realizado com sucesso!',
      'register.error': 'Falha no cadastro. Tente novamente.',
      
      // Dashboard
      'dashboard.welcome': 'Bem-vindo ao seu dashboard',
      'dashboard.overview': 'Visão Geral',
      'dashboard.recentActivity': 'Atividade Recente',
      'dashboard.statistics': 'Estatísticas',
      
      // Tutorial
      'tutorial.welcome': 'Bem-vindo ao DocsIA!',
      'tutorial.welcomeDesc': 'Deixe-nos mostrar o sistema e ajudá-lo a começar com nossa plataforma.',
      'tutorial.dashboard': 'Dashboard',
      'tutorial.dashboardDesc': 'Este é seu dashboard principal onde você pode ver uma visão geral de suas atividades.',
      'tutorial.chats': 'Conversas',
      'tutorial.chatsDesc': 'Gerencie todas suas conversas com IA e histórico de chat aqui.',
      'tutorial.documents': 'Documentos',
      'tutorial.documentsDesc': 'Faça upload, gerencie e organize seus documentos para processamento por IA.',
      'tutorial.segments': 'Segmentos',
      'tutorial.segmentsDesc': 'Crie e gerencie diferentes segmentos para melhor organização.',
      'tutorial.plans': 'Planos',
      'tutorial.plansDesc': 'Visualize e gerencie seus planos de assinatura e faturamento.',
      'tutorial.complete': 'Tutorial Completo!',
      'tutorial.completeDesc': 'Agora você está pronto para começar a usar o DocsIA. Divirta-se explorando!',
      'tutorial.skip': 'Pular Tutorial',
      'tutorial.next': 'Próximo',
      'tutorial.prev': 'Anterior',
      'tutorial.finish': 'Finalizar'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;