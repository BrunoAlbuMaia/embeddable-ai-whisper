import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  FileText, 
  Trash2, 
  Eye, 
  Bot, 
  CheckCircle, 
  Clock,
  AlertCircle 
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
  status: 'processing' | 'trained' | 'error';
  type: string;
}

const DocumentsPage = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Manual do Usuario.pdf',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      status: 'trained',
      type: 'PDF'
    },
    {
      id: '2',
      name: 'FAQ Produtos.docx',
      size: '1.2 MB',
      uploadDate: '2024-01-14',
      status: 'processing',
      type: 'DOCX'
    }
  ]);

  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate upload progress
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // Add new document to list
            const newDoc: Document = {
              id: Date.now().toString(),
              name: file.name,
              size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
              uploadDate: new Date().toISOString().split('T')[0],
              status: 'processing',
              type: file.name.split('.').pop()?.toUpperCase() || 'FILE'
            };
            setDocuments(prev => [newDoc, ...prev]);
            return 0;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'trained':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-orange-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusText = (status: Document['status']) => {
    switch (status) {
      case 'trained':
        return 'Treinado';
      case 'processing':
        return 'Processando';
      case 'error':
        return 'Erro';
    }
  };

  const getStatusVariant = (status: Document['status']) => {
    switch (status) {
      case 'trained':
        return 'default';
      case 'processing':
        return 'secondary';
      case 'error':
        return 'destructive';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Documentos</h1>
          <p className="text-muted-foreground">
            Faça upload e treine sua IA com documentos da empresa
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Documentos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.length}</div>
            <p className="text-xs text-muted-foreground">Arquivos carregados</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Treinados</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {documents.filter(d => d.status === 'trained').length}
            </div>
            <p className="text-xs text-muted-foreground">IA pode usar estes dados</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processando</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {documents.filter(d => d.status === 'processing').length}
            </div>
            <p className="text-xs text-muted-foreground">Aguardando processamento</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tamanho Total</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5 MB</div>
            <p className="text-xs text-muted-foreground">Limite: 100 MB</p>
          </CardContent>
        </Card>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload de Documentos</CardTitle>
          <CardDescription>
            Formatos suportados: PDF, DOC, DOCX, TXT (máx. 10MB por arquivo)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Solte seus arquivos aqui</h3>
            <p className="text-muted-foreground mb-4">ou clique para selecionar</p>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <Button asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                Selecionar Arquivos
              </label>
            </Button>
          </div>
          
          {uploadProgress > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Enviando arquivo...</span>
                <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>Documentos Carregados</CardTitle>
          <CardDescription>
            Gerencie os documentos que estão treinando sua IA
          </CardDescription>
        </CardHeader>
        <CardContent>
          {documents.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Nenhum documento ainda</h3>
              <p className="text-muted-foreground">
                Faça upload do primeiro documento para treinar sua IA
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{doc.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>{doc.uploadDate}</span>
                        <span>•</span>
                        <Badge variant="outline" className="text-xs">
                          {doc.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {getStatusIcon(doc.status)}
                      <Badge variant={getStatusVariant(doc.status)}>
                        {getStatusText(doc.status)}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentsPage;