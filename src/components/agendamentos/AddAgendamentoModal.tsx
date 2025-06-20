
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, CalendarIcon, Clock } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const agendamentoSchema = z.object({
  cliente: z.string().min(2, "Nome do cliente é obrigatório"),
  telefone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  servico: z.string().min(1, "Selecione um serviço"),
  profissional: z.string().min(1, "Selecione um profissional"),
  data: z.date({ required_error: "Selecione uma data" }),
  hora: z.string().min(1, "Selecione um horário"),
  observacoes: z.string().optional(),
});

type AgendamentoForm = z.infer<typeof agendamentoSchema>;

const servicosDisponiveis = [
  "Corte Feminino",
  "Corte Masculino", 
  "Escova",
  "Coloração",
  "Mechas",
  "Progressiva",
  "Barba",
  "Manicure",
  "Pedicure",
  "Nail Art",
  "Massagem",
  "Tratamento Facial"
];

const profissionaisDisponiveis = [
  "Ana Costa",
  "Carlos Lima", 
  "Beatriz Silva"
];

const horariosDisponiveis = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00"
];

interface AddAgendamentoModalProps {
  onAddAgendamento: (agendamento: any) => void;
}

export function AddAgendamentoModal({ onAddAgendamento }: AddAgendamentoModalProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<AgendamentoForm>({
    resolver: zodResolver(agendamentoSchema),
    defaultValues: {
      cliente: "",
      telefone: "",
      servico: "",
      profissional: "",
      data: undefined,
      hora: "",
      observacoes: "",
    },
  });

  const onSubmit = (data: AgendamentoForm) => {
    onAddAgendamento({
      ...data,
      status: 'confirmado'
    });
    
    form.reset();
    setOpen(false);
    toast.success("Agendamento criado com sucesso!");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Agendamento
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Agendamento</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Dados do Cliente */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cliente">Nome do Cliente *</Label>
              <Input
                id="cliente"
                {...form.register("cliente")}
                placeholder="Ex: Maria Silva"
              />
              {form.formState.errors.cliente && (
                <p className="text-sm text-red-600 mt-1">{form.formState.errors.cliente.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="telefone">Telefone (com DDD) *</Label>
              <Input
                id="telefone"
                {...form.register("telefone")}
                placeholder="(11) 99999-9999"
              />
              {form.formState.errors.telefone && (
                <p className="text-sm text-red-600 mt-1">{form.formState.errors.telefone.message}</p>
              )}
            </div>
          </div>

          {/* Serviço e Profissional */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Serviço *</Label>
              <Select onValueChange={(value) => form.setValue("servico", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um serviço" />
                </SelectTrigger>
                <SelectContent>
                  {servicosDisponiveis.map((servico) => (
                    <SelectItem key={servico} value={servico}>
                      {servico}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.servico && (
                <p className="text-sm text-red-600 mt-1">{form.formState.errors.servico.message}</p>
              )}
            </div>

            <div>
              <Label>Profissional *</Label>
              <Select onValueChange={(value) => form.setValue("profissional", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um profissional" />
                </SelectTrigger>
                <SelectContent>
                  {profissionaisDisponiveis.map((profissional) => (
                    <SelectItem key={profissional} value={profissional}>
                      {profissional}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.profissional && (
                <p className="text-sm text-red-600 mt-1">{form.formState.errors.profissional.message}</p>
              )}
            </div>
          </div>

          {/* Data e Hora */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Data *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !form.watch("data") && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.watch("data") ? (
                      format(form.watch("data"), "PPP", { locale: ptBR })
                    ) : (
                      <span>Selecione uma data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={form.watch("data")}
                    onSelect={(date) => form.setValue("data", date!)}
                    initialFocus
                    disabled={(date) => date < new Date()}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {form.formState.errors.data && (
                <p className="text-sm text-red-600 mt-1">{form.formState.errors.data.message}</p>
              )}
            </div>

            <div>
              <Label>Horário *</Label>
              <Select onValueChange={(value) => form.setValue("hora", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um horário" />
                </SelectTrigger>
                <SelectContent>
                  {horariosDisponiveis.map((hora) => (
                    <SelectItem key={hora} value={hora}>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {hora}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.hora && (
                <p className="text-sm text-red-600 mt-1">{form.formState.errors.hora.message}</p>
              )}
            </div>
          </div>

          {/* Observações */}
          <div>
            <Label htmlFor="observacoes">Observações (Opcional)</Label>
            <Textarea
              id="observacoes"
              {...form.register("observacoes")}
              placeholder="Informações adicionais sobre o agendamento..."
              rows={3}
            />
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Criar Agendamento
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
