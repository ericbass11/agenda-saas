
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cliente } from "@/hooks/useAgendamentoCliente";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

interface LoginFormProps {
  onSuccess: (cliente: Cliente) => void;
  onError: (message: string) => void;
}

export function LoginForm({ onSuccess, onError }: LoginFormProps) {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const cliente: Cliente = {
        nome: "Cliente Teste",
        email: data.email,
        telefone: "(11) 99999-1111",
        whatsapp: "(11) 99999-1111",
      };

      onSuccess(cliente);
    } catch {
      onError("Email ou senha incorretos");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
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
        <Label htmlFor="login-senha">Senha</Label>
        <Input
          id="login-senha"
          type="password"
          {...form.register("senha")}
        />
        {form.formState.errors.senha && (
          <p className="text-sm text-red-500 mt-1">
            {String(form.formState.errors.senha?.message || "")}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Entrar
      </Button>
    </form>
  );
}
