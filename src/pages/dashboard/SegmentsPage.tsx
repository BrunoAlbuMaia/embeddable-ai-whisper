import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Plus, 
  Target, 
  Users, 
  Edit, 
  Trash2, 
  Search,
  MoreVertical 
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Segment {
  id: string;
  name: string;
  description: string;
  criteria: string;
  customerCount: number;
  status: 'active' | 'inactive';
  createdDate: string;
}

const SegmentsPage = () => {
  const [segments, setSegments] = useState<Segment[]>([
    {
      id: '1',
      name: 'Clientes Premium',
      description: 'Clientes com alto valor de compra e frequência',
      criteria: 'Compras > R$ 5.000/mês',
      customerCount: 150,
      status: 'active',
      createdDate: '2024-01-10'
    },
    {
      id: '2',
      name: 'Novos Usuários',
      description: 'Usuários cadastrados nos últimos 30 dias',
      criteria: 'Cadastro < 30 dias',
      customerCount: 89,
      status: 'active',
      createdDate: '2024-01-12'
    },
    {
      id: '3',
      name: 'Clientes Inativos',
      description: 'Sem compras nos últimos 90 dias',
      criteria: 'Última compra > 90 dias',
      customerCount: 245,
      status: 'inactive',
      createdDate: '2024-01-05'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newSegment, setNewSegment] = useState({
    name: '',
    description: '',
    criteria: ''
  });

  const filteredSegments = segments.filter(segment =>
    segment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    segment.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateSegment = () => {
    if (newSegment.name && newSegment.description && newSegment.criteria) {
      const segment: Segment = {
        id: Date.now().toString(),
        ...newSegment,
        customerCount: Math.floor(Math.random() * 200) + 10,
        status: 'active',
        createdDate: new Date().toISOString().split('T')[0]
      };
      setSegments(prev => [segment, ...prev]);
      setNewSegment({ name: '', description: '', criteria: '' });
      setIsCreateDialogOpen(false);
    }
  };

  const toggleSegmentStatus = (id: string) => {
    setSegments(prev => prev.map(segment => 
      segment.id === id 
        ? { ...segment, status: segment.status === 'active' ? 'inactive' : 'active' }
        : segment
    ));
  };

  const deleteSegment = (id: string) => {
    setSegments(prev => prev.filter(segment => segment.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Segmentos</h1>
          <p className="text-muted-foreground">
            Organize seus clientes em grupos estratégicos
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Segmento
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Novo Segmento</DialogTitle>
              <DialogDescription>
                Defina critérios para agrupar seus clientes
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Segmento</Label>
                <Input
                  id="name"
                  placeholder="Ex: Clientes VIP"
                  value={newSegment.name}
                  onChange={(e) => setNewSegment(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva o objetivo deste segmento..."
                  value={newSegment.description}
                  onChange={(e) => setNewSegment(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="criteria">Critérios</Label>
                <Input
                  id="criteria"
                  placeholder="Ex: Compras > R$ 1.000/mês"
                  value={newSegment.criteria}
                  onChange={(e) => setNewSegment(prev => ({ ...prev, criteria: e.target.value }))}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateSegment}>
                  Criar Segmento
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Segmentos</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{segments.length}</div>
            <p className="text-xs text-muted-foreground">Segmentos criados</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Segmentos Ativos</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {segments.filter(s => s.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">Em uso ativo</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {segments.reduce((acc, s) => acc + s.customerCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Clientes segmentados</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maior Segmento</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.max(...segments.map(s => s.customerCount))}
            </div>
            <p className="text-xs text-muted-foreground">Clientes no maior grupo</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar segmentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Segments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSegments.map((segment) => (
          <Card key={segment.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Target className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{segment.name}</CardTitle>
                    <Badge variant={segment.status === 'active' ? 'default' : 'secondary'}>
                      {segment.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toggleSegmentStatus(segment.id)}>
                      <Target className="mr-2 h-4 w-4" />
                      {segment.status === 'active' ? 'Desativar' : 'Ativar'}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => deleteSegment(segment.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">{segment.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Critério:</span>
                    <Badge variant="outline" className="text-xs">
                      {segment.criteria}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Clientes:</span>
                    <span className="font-medium flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {segment.customerCount}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Criado em:</span>
                    <span className="text-xs">{segment.createdDate}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSegments.length === 0 && searchTerm && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Nenhum segmento encontrado</h3>
              <p className="text-muted-foreground">
                Tente ajustar os termos de busca
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {segments.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Target className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Nenhum segmento criado</h3>
              <p className="text-muted-foreground mb-4">
                Crie seu primeiro segmento para organizar seus clientes
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Criar Primeiro Segmento
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SegmentsPage;