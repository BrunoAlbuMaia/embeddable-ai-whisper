import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Settings, ExternalLink, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProfilePage = () => {
  const { user, updateProfile, getAccountUrl } = useAuth();
  const { toast } = useToast();

  const handleRefreshProfile = async () => {
    try {
      await updateProfile();
      toast({
        title: "Perfil atualizado",
        description: "As informações do perfil foram atualizadas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível atualizar as informações do perfil.",
        variant: "destructive",
      });
    }
  };

  const handleEditProfile = () => {
    window.open(getAccountUrl(), '_blank');
  };

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <p className="text-muted-foreground">Carregando informações do usuário...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Meu Perfil</h1>
          <p className="text-muted-foreground">
            Gerencie suas informações pessoais e configurações de conta
          </p>
        </div>
        <Button onClick={handleRefreshProfile} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Atualizar
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Informações Básicas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informações Pessoais
            </CardTitle>
            <CardDescription>
              Suas informações básicas do Keycloak
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome</label>
              <p className="text-sm text-muted-foreground">{user.name || 'Não informado'}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Nome de usuário</label>
              <p className="text-sm text-muted-foreground">{user.username}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            {user.firstName && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Primeiro Nome</label>
                <p className="text-sm text-muted-foreground">{user.firstName}</p>
              </div>
            )}

            {user.lastName && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Sobrenome</label>
                <p className="text-sm text-muted-foreground">{user.lastName}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Configurações de Conta */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configurações da Conta
            </CardTitle>
            <CardDescription>
              Gerencie sua conta no Keycloak
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">ID do Usuário</label>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="font-mono text-xs">
                  {user.id}
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <Button onClick={handleEditProfile} className="w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                Editar Perfil no Keycloak
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Você será redirecionado para o console do Keycloak onde poderá editar seu perfil, 
                alterar sua senha e gerenciar configurações de segurança.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informações Adicionais do Profile */}
      {user.profile && (
        <Card>
          <CardHeader>
            <CardTitle>Informações Detalhadas</CardTitle>
            <CardDescription>
              Dados adicionais do seu perfil
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {Object.entries(user.profile).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <label className="text-sm font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <p className="text-sm text-muted-foreground">
                    {typeof value === 'string' ? value : JSON.stringify(value)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProfilePage;