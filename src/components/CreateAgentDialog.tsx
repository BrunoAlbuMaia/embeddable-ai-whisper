import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Plus, X } from 'lucide-react';
import { useAgentAPI, type Segment, type ChatbotRequest } from '@/hooks/useAgentAPI';
import { useToast } from '@/hooks/use-toast';

const createAgentSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome muito longo'),
  description: z.string().optional(),
  url_base: z.string().url('URL deve ser válida'),
  company_id: z.string().min(1, 'ID da empresa é obrigatório'),
  segments: z.array(z.string()).min(1, 'Selecione pelo menos um segmento'),
});

type CreateAgentForm = z.infer<typeof createAgentSchema>;

interface CreateAgentDialogProps {
  children: React.ReactNode;
  onSuccess?: () => void;
}

export const CreateAgentDialog: React.FC<CreateAgentDialogProps> = ({
  children,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { getSegments, createAgent, isLoading } = useAgentAPI();
  const [open, setOpen] = useState(false);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
  const [loadingSegments, setLoadingSegments] = useState(false);

  const form = useForm<CreateAgentForm>({
    resolver: zodResolver(createAgentSchema),
    defaultValues: {
      name: '',
      description: '',
      url_base: '',
      company_id: '',
      segments: [],
    },
  });

  useEffect(() => {
    if (open) {
      loadSegments();
    }
  }, [open]);

  const loadSegments = async () => {
    try {
      setLoadingSegments(true);
      const data = await getSegments();
      setSegments(data ?? []);


    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao carregar segmentos',
        variant: 'destructive',
      });
    } finally {
      setLoadingSegments(false);
    }
  };

  const handleSegmentToggle = (segmentId: string, checked: boolean) => {
    let newSelection;
    if (checked) {
      newSelection = [...selectedSegments, segmentId];
    } else {
      newSelection = selectedSegments.filter(id => id !== segmentId);
    }
    setSelectedSegments(newSelection);
    form.setValue('segments', newSelection);
  };

  const onSubmit = async (data: CreateAgentForm) => {
    try {
      const request: ChatbotRequest = {
        company_id: data.company_id,
        name: data.name,
        description: data.description,
        is_active: true,
        url_base: data.url_base,
        segments: data.segments.map(id => ({ segment_id: id })),
      };

      await createAgent(request);
      
      toast({
        title: 'Sucesso!',
        description: 'Agente criado com sucesso',
      });

      setOpen(false);
      form.reset();
      setSelectedSegments([]);
      onSuccess?.();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao criar agente',
        variant: 'destructive',
      });
    }
  };

  const getSelectedSegmentNames = () => {
    return segments
      .filter(segment => selectedSegments.includes(segment.id))
      .map(segment => segment.name);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Criar Novo Agente
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Agente</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Atendimento Vendas" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID da Empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="UUID da empresa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="url_base"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Base</FormLabel>
                  <FormControl>
                    <Input placeholder="https://exemplo.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    URL base de quem vai acessar esse agente
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva o propósito deste agente..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="segments"
              render={() => (
                <FormItem>
                  <FormLabel>Segmentos</FormLabel>
                  <FormDescription>
                    Selecione os segmentos que este agente deve conhecer
                  </FormDescription>
                  
                  {selectedSegments.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {getSelectedSegmentNames().map((name, index) => (
                        <Badge key={index} variant="secondary">
                          {name}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <Card className="max-h-48 overflow-y-auto">
                    <CardContent className="pt-6">
                      {loadingSegments ? (
                        <div className="flex items-center justify-center py-4">
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Carregando segmentos...
                        </div>
                      ) : segments.length === 0 ? (
                        <p className="text-muted-foreground text-center py-4">
                          Nenhum segmento disponível
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {segments.map((segment) => (
                            <div key={segment.id} className="flex items-start space-x-3">
                              <Checkbox
                                id={segment.id}
                                checked={selectedSegments.includes(segment.id)}
                                onCheckedChange={(checked) =>
                                  handleSegmentToggle(segment.id, checked === true)
                                }
                              />
                              <div className="grid gap-1.5 leading-none">
                                <label
                                  htmlFor={segment.id}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                >
                                  {segment.name}
                                </label>
                                {segment.description && (
                                  <p className="text-xs text-muted-foreground">
                                    {segment.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Criar Agente
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};