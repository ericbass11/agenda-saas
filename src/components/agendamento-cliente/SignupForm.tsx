
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Cliente } from "@/hooks/useAgendamentoCliente";

const cadastroSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone inválido"),
  whatsapp: z.string().min(10, "WhatsApp inválido"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

interface SignupFormProps {
  onSuccess: (cliente: Cliente) => void;
  onError: (message: string) => void;
}

export function SignupForm({ onSuccess, onError }: SignupFormProps) {
  const { signUp } = useAuth();
  const form = useForm({
    resolver: zodResolver(cadastroSchema),
  });

  const handleSubmit = async (data: z.infer<typeof cadastroSchema>) => {
    try {
      await signUp(data.email, data.senha);
      
      const cliente: Cliente = {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        whatsapp: data.whatsapp,
      };

      onSuccess(cliente);
    } catch (error: any) {
      onError(error.message || "Erro ao criar conta. Tente novamente.");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="cadastro-nome">Nome Completo</Label>
        <Input
          id="cadastro-nome"
          {...form.register("nome")}
        />
        {form.formState.errors.nome && (
          <p className="text-sm text-red-500 mt-1">
            {String(form.formState.errors.nome?.message || "")}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="cadastro-email">Email</Label>
        <Input
          id="cadastro-email"
          type="email"
          {...form.register("email")}
        />
        {form.formState.errors.email && (
          <p className="text-sm text-red-500 mt-1">
            {String(form.formState.errors.email?.message || "")}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="cadastro-telefone">Telefone</Label>
        <Input
          id="cadastro-telefone"
          placeholder="(11) 99999-9999"
          {...form.register("telefone")}
        />
        {form.formState.errors.telefone && (
          <p className="text-sm text-red-500 mt-1">
            {String(form.formState.errors.telefone?.message || "")}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="cadastro-whatsapp">WhatsApp</Label>
        <Input
          id="cadastro-whatsapp"
          placeholder="(11) 99999-9999"
          {...form.register("whatsapp")}
        />
        {form.formState.errors.whatsapp && (
          <p className="text-sm text-red-500 mt-1">
            {String(form.formState.errors.whatsapp?.message || "")}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="cadastro-senha">Senha</Label>
        <Input
          id="cadastro-senha"
          type="password"
          {...form.register("senha")}
        />
        {form.formState.errors.senha && (
          <p className="text-sm text-red-500 mt-1">
            {String(form.formState.errors.senha?.message || "")}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Cadastrando..." : "Cadastrar"}
      </Button>
    </form>
  );
}
