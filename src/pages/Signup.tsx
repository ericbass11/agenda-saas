
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const signupSchema = z.object({
  estabelecimento: z.string().min(2, "Nome do estabelecimento deve ter pelo menos 2 caracteres"),
  responsavel: z.string().min(2, "Nome do responsável deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function Signup() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    console.log("Signup form submitted:", { 
      estabelecimento: data.estabelecimento,
      email: data.email 
    });
    setIsLoading(true);
    
    try {
      await signUp(data.email, data.password);
      console.log("Signup successful, redirecting to pricing");
      toast.success("Conta criada com sucesso! Escolha seu plano.");
      navigate("/pricing");
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(error.message || "Erro ao criar conta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Cadastre seu Estabelecimento
          </h1>
          <p className="text-gray-600">
            Crie sua conta e comece a usar o Agendamento Fácil
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Cadastro</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="estabelecimento">Nome do Estabelecimento</Label>
                <Input
                  id="estabelecimento"
                  {...register("estabelecimento")}
                />
                {errors.estabelecimento && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.estabelecimento.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="responsavel">Nome do Responsável</Label>
                <Input
                  id="responsavel"
                  {...register("responsavel")}
                />
                {errors.responsavel && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.responsavel.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
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
                <Label htmlFor="telefone">Telefone/WhatsApp</Label>
                <Input
                  id="telefone"
                  placeholder="(11) 99999-9999"
                  {...register("telefone")}
                />
                {errors.telefone && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.telefone.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Cadastrando..." : "Criar Conta"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Faça login aqui
                </Link>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <Link to="/" className="text-blue-600 hover:underline">
                  Voltar para a página inicial
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
