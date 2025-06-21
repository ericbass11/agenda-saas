
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Cliente } from "@/hooks/useAgendamentoCliente";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess: (cliente: Cliente) => void;
  onError: (message: string) => void;
}

export function LoginForm({ onSuccess, onError }: LoginFormProps) {
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log("Login form submitted with:", { email: data.email });
    setIsLoading(true);
    
    try {
      await signIn(data.email, data.senha);
      
      const cliente: Cliente = {
        nome: "Cliente",
        email: data.email,
        telefone: "",
        whatsapp: "",
      };

      console.log("Login successful, calling onSuccess");
      onSuccess(cliente);
    } catch (error: any) {
      console.error("Login error:", error);
      onError(error.message || "Email ou senha incorretos");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          type="email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="login-senha">Senha</Label>
        <Input
          id="login-senha"
          type="password"
          {...register("senha")}
        />
        {errors.senha && (
          <p className="text-sm text-red-500 mt-1">
            {errors.senha.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}
