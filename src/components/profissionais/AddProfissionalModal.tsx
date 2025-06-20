
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Upload } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const profissionalSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  biografia: z.string().optional(),
  especialidades: z.array(z.string()).min(1, "Selecione pelo menos uma especialidade"),
});

type ProfissionalForm = z.infer<typeof profissionalSchema>;

const especialidadesDisponiveis = [
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

interface AddProfissionalModalProps {
  onAddProfissional: (profissional: ProfissionalForm & { foto?: string }) => void;
}

export function AddProfissionalModal({ onAddProfissional }: AddProfissionalModalProps) {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const form = useForm<ProfissionalForm>({
    resolver: zodResolver(profissionalSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      biografia: "",
      especialidades: [],
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: ProfissionalForm) => {
    onAddProfissional({
      ...data,
      foto: selectedImage || undefined,
    });
    
    form.reset();
    setSelectedImage(null);
    setOpen(false);
    toast.success("Profissional adicionado com sucesso!");
  };

  const handleEspecialidadeChange = (especialidade: string, checked: boolean) => {
    const currentEspecialidades = form.getValues("especialidades");
    if (checked) {
      form.setValue("especialidades", [...currentEspecialidades, especialidade]);
    } else {
      form.setValue("especialidades", currentEspecialidades.filter(e => e !== especialidade));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Profissional
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Profissional</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Upload de Foto */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {selectedImage ? (
                <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <Upload className="h-8 w-8 text-gray-400" />
              )}
            </div>
            <div>
              <Label htmlFor="foto" className="cursor-pointer">
                <Button type="button" variant="outline" asChild>
                  <span>Selecionar Foto</span>
                </Button>
              </Label>
              <Input
                id="foto"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </div>

          {/* Dados Pessoais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nome">Nome Completo *</Label>
              <Input
                id="nome"
                {...form.register("nome")}
                placeholder="Ex: Ana Silva"
              />
              {form.formState.errors.nome && (
                <p className="text-sm text-red-600 mt-1">{form.formState.errors.nome.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                {...form.register("email")}
                placeholder="ana@exemplo.com"
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-600 mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>
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

          <div>
            <Label htmlFor="biografia">Biografia (Opcional)</Label>
            <Textarea
              id="biografia"
              {...form.register("biografia")}
              placeholder="Conte um pouco sobre sua experiência profissional..."
              rows={3}
            />
          </div>

          {/* Especialidades */}
          <div>
            <Label>Especialidades *</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {especialidadesDisponiveis.map((especialidade) => (
                <div key={especialidade} className="flex items-center space-x-2">
                  <Checkbox
                    id={especialidade}
                    onCheckedChange={(checked) => 
                      handleEspecialidadeChange(especialidade, checked as boolean)
                    }
                  />
                  <Label htmlFor={especialidade} className="text-sm font-normal">
                    {especialidade}
                  </Label>
                </div>
              ))}
            </div>
            {form.formState.errors.especialidades && (
              <p className="text-sm text-red-600 mt-1">{form.formState.errors.especialidades.message}</p>
            )}
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Adicionar Profissional
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
