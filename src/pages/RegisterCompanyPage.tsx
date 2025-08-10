import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, Building2, User, CheckCircle2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CompanyData {
  name: string;
  type: 'pessoa_fisica' | 'pessoa_juridica';
  document: string;
  company_id?: string; // opcional, será preenchido após o cadastro
}

const RegisterCompanyPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CompanyData>({
    name: '',
    type: 'pessoa_fisica',
    document: '',
    company_id: undefined
  });

  const handleInputChange = (field: keyof CompanyData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatDocument = (value: string, type: 'pessoa_fisica' | 'pessoa_juridica') => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '');
    
    if (type === 'pessoa_fisica') {
      // Formato CPF: 000.000.000-00
      return numbers
        .slice(0, 11)
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2');
    } else {
      // Formato CNPJ: 00.000.000/0000-00
      return numbers
        .slice(0, 14)
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})/, '$1-$2');
    }
  };

  const handleDocumentChange = (value: string) => {
    const formatted = formatDocument(value, formData.type);
    handleInputChange('document', formatted);
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, preencha o nome.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.document.trim()) {
      toast({
        title: "Campo obrigatório", 
        description: `Por favor, preencha o ${formData.type === 'pessoa_fisica' ? 'CPF' : 'CNPJ'}.`,
        variant: "destructive",
      });
      return false;
    }

    // Validação básica de tamanho
    const numbersOnly = formData.document.replace(/\D/g, '');
    const expectedLength = formData.type === 'pessoa_fisica' ? 11 : 14;
    
    if (numbersOnly.length !== expectedLength) {
      toast({
        title: "Documento inválido",
        description: `${formData.type === 'pessoa_fisica' ? 'CPF' : 'CNPJ'} deve ter ${expectedLength} dígitos.`,
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:9005/api/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          tax_id: formData.document.replace(/\D/g, ''), // só números
          tax_type: formData.type === 'pessoa_fisica' ? 'cpf' : 'cnpj'
          // Adicione outros campos necessários aqui
        })
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      const data = await response.json();

      toast({
        title: "Empresa cadastrada com sucesso!",
        description: "Agora vamos criar sua conta de usuário.",
      });

      sessionStorage.setItem('company_data', JSON.stringify({
        ...formData,
        company_id: data.data, // ajusta conforme o retorno real da sua API
      }));

      navigate('/register/user');

    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: "Não foi possível cadastrar a empresa. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild>
              <Link to="/register" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar aos planos
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
                <div className="h-8 w-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <span className="text-sm font-medium text-primary">Dados da Empresa</span>
              </div>
              <div className="h-px w-8 bg-muted"></div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm">
                  2
                </div>
                <span className="text-sm text-muted-foreground">Criar Usuário</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold">Cadastro da Empresa</h1>
            <p className="text-muted-foreground">
              Primeiro, vamos cadastrar sua empresa ou seus dados pessoais
            </p>
          </div>

          {/* Form */}
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-lg">Informações Básicas</CardTitle>
              <CardDescription>
                Preencha os dados para começar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Tipo de Pessoa */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Tipo de cadastro</Label>
                  <RadioGroup
                    value={formData.type}
                    onValueChange={(value: 'pessoa_fisica' | 'pessoa_juridica') => {
                      handleInputChange('type', value);
                      handleInputChange('document', ''); // Limpa documento ao trocar tipo
                    }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pessoa_fisica" id="pf" />
                      <Label htmlFor="pf" className="flex items-center gap-2 cursor-pointer">
                        <User className="h-4 w-4" />
                        Pessoa Física
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pessoa_juridica" id="pj" />
                      <Label htmlFor="pj" className="flex items-center gap-2 cursor-pointer">
                        <Building2 className="h-4 w-4" />
                        Empresa
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Nome */}
                <div className="space-y-2">
                  <Label htmlFor="name">
                    {formData.type === 'pessoa_fisica' ? 'Nome Completo' : 'Nome da Empresa'}
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder={formData.type === 'pessoa_fisica' ? 'João Silva' : 'Minha Empresa Ltda'}
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>

                {/* Documento */}
                <div className="space-y-2">
                  <Label htmlFor="document">
                    {formData.type === 'pessoa_fisica' ? 'CPF' : 'CNPJ'}
                  </Label>
                  <Input
                    id="document"
                    type="text"
                    placeholder={formData.type === 'pessoa_fisica' ? '000.000.000-00' : '00.000.000/0000-00'}
                    value={formData.document}
                    onChange={(e) => handleDocumentChange(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Cadastrando empresa...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Cadastrar Empresa
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Security Note */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              🔒 Seus dados estão seguros e protegidos por criptografia
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCompanyPage;