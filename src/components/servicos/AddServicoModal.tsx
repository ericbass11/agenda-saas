
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Edit } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  categoria: z.string().min(1, "Selecione uma categoria"),
  duracao: z.string().min(1, "Duração é obrigatória"),
  preco: z.string().min(1, "Preço é obrigatório"),
  profissionais: z.array(z.string()).min(1, "Selecione pelo menos um profissional"),
  descricao: z.string().optional(),
});

interface AddServicoModalProps {
  servico?: {
    id: number;
    nome: string;
    categoria: string;
    duracao: string;
    preco: string;
    profissionais: string[];
    descricao?: string;
  };
  onSave: (data: any) => void;
}

export function AddServicoModal({ servico, onSave }: AddServicoModalProps) {
  const [open, setOpen] = useState(false);
  const isEditing = !!servico;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: servico?.nome || "",
      categoria: servico?.categoria || "",
      duracao: servico?.duracao || "",
      preco: servico?.preco || "",
      profissionais: servico?.profissionais || [],
      descricao: servico?.descricao || "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSave(values);
    setOpen(false);
    form.reset();
  };

  const categorias = [
    "Cabelo",
    "Unhas",
    "Barba",
    "Tratamentos Faciais",
    "Massagens",
    "Depilação",
    "Sobrancelhas",
    "Outros"
  ];

  const profissionaisDisponiveis = [
    "Maria Silva",
    "João Santos",
    "Ana Costa",
    "Pedro Lima",
    "Carla Ferreira"
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEditing ? (
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
        ) : (
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Serviço
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Serviço" : "Adicionar Novo Serviço"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Serviço</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Corte Feminino" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categorias.map((categoria) => (
                        <SelectItem key={categoria} value={categoria}>
                          {categoria}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="duracao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duração</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 60 min" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preco"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: R$ 80,00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="profissionais"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profissionais Habilitados</FormLabel>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {profissionaisDisponiveis.map((prof) => (
                      <div key={prof} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={prof}
                          checked={field.value.includes(prof)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              field.onChange([...field.value, prof]);
                            } else {
                              field.onChange(field.value.filter((p) => p !== prof));
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                        <label htmlFor={prof} className="text-sm font-medium">
                          {prof}
                        </label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição (Opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Descrição do serviço..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                {isEditing ? "Atualizar" : "Adicionar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
