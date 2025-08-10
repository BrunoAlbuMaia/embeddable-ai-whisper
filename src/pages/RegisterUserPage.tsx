import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, CheckCircle2, Loader2, Eye, EyeOff, Building2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserData {
  username?: string; // opcional, pode ser usado para login
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface CompanyData {
  name: string;
  type: 'pessoa_fisica' | 'pessoa_juridica';
  document: string;
  company_id: string;
}

const RegisterUserPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [formData, setFormData] = useState<UserData>({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // Recuperar dados da empresa do sessionStorage
    const storedData = sessionStorage.getItem('company_data');
    if (!storedData) {
      toast({
        title: "Erro",
        description: "Dados da empresa não encontrados. Redirecionando...",
        variant: "destructive",
      });
      navigate('/register');
      return;
    }

    try {
      const data = JSON.parse(storedData) as CompanyData;
      setCompanyData(data);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Dados inválidos. Redirecionando...",
        variant: "destructive",
      });
      navigate('/register');
    }
  }, [navigate, toast]);

  const handleInputChange = (field: keyof UserData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const validateForm = (): boolean => {
    if (!formData.firstName.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, preencha o nome.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.lastName.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, preencha o sobrenome.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.email.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, preencha o email.",
        variant: "destructive",
      });
      return false;
    }

    if (!validateEmail(formData.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      });
      return false;
    }

    // if (!formData.password) {
    //   toast({
    //     title: "Campo obrigatório",
    //     description: "Por favor, crie uma senha.",
    //     variant: "destructive",
    //   });
    //   return false;
    // }

    // if (!validatePassword(formData.password)) {
    //   toast({
    //     title: "Senha muito fraca",
    //     description: "A senha deve ter pelo menos 6 caracteres.",
    //     variant: "destructive",
    //   });
    //   return false;
    // }

    // if (formData.password !== formData.confirmPassword) {
    //   toast({
    //     title: "Senhas não coincidem",
    //     description: "Por favor, confirme sua senha corretamente.",
    //     variant: "destructive",
    //   });
    //   return false;
    // }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
        const response = await fetch('http://localhost:9005/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          company_id: companyData.company_id,
          username: formData.username,
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName
        })
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const data = await response.json();

      toast({
        title: "Conta criada com sucesso! 🎉",
        description: data.message || "Você já pode fazer login e começar a usar a plataforma. Use a senha 123456",
      });

      // Limpa dados temporários
      sessionStorage.removeItem('company_data');

      // Redireciona para login
      navigate('/login');

    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: "Não foi possível criar sua conta. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  if (!companyData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild>
              <Link to="/register/company" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar aos dados da empresa
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/login">Já tenho conta</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-6 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md space-y-6">
          {/* Progress */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-green-600">Empresa Cadastrada</span>
              </div>
              <div className="h-px w-8 bg-primary"></div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="text-sm font-medium text-primary">Criar Usuário</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold">Criar sua Conta</h1>
            <p className="text-muted-foreground">
              Agora vamos criar seu usuário para acessar a plataforma
            </p>
          </div>

          {/* Company Info */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <Building2 className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-green-800">{companyData.name}</p>
                  <p className="text-sm text-green-600">
                    {companyData.type === 'pessoa_fisica' ? 'CPF' : 'CNPJ'}: {companyData.document}
                  </p>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Company ID: {companyData.company_id}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Form */}
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-lg">Dados do Usuário</CardTitle>
              <CardDescription>
                Preencha seus dados para finalizar o cadastro
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nome e Sobrenome */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nome</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="João"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Sobrenome</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Silva"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="joao@empresa.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>

                {/* Senha 
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Mínimo 6 caracteres"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>/*}

                {/* Confirmar Senha 
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Digite a senha novamente"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>*/}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Criando sua conta...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Criar Minha Conta
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Security Note */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              ✅ Plano FREE ativado automaticamente após criação da conta
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUserPage;