
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Cliente } from "@/hooks/useAgendamentoCliente";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

const cadastroSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone inválido"),
  whatsapp: z.string().min(10, "WhatsApp inválido"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

interface ClienteAuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClienteLogado: (cliente: Cliente) => void;
}

export function ClienteAuthModal({ open, onOpenChange, onClienteLogado }: ClienteAuthModalProps) {
  const [activeTab, setActiveTab] = useState("login");
  const { toast } = useToast();

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
  });

  const cadastroForm = useForm({
    resolver: zodResolver(cadastroSchema),
  });

  const handleLogin = async (data: z.infer<typeof loginSchema>) => {
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock cliente logado
      const cliente: Cliente = {
        nome: "Cliente Teste",
        email: data.email,
        telefone: "(11) 99999-1111",
        whatsapp: "(11) 99999-1111",
      };

      onClienteLogado(cliente);
      onOpenChange(false);
      
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo de volta!",
      });
    } catch {
      toast({
        title: "Erro no login",
        description: "Email ou senha incorretos",
        variant: "destructive",
      });
    }
  };

  const handleCadastro = async (data: z.infer<typeof cadastroSchema>) => {
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const cliente: Cliente = {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        whatsapp: data.whatsapp,
      };

      onClienteLogado(cliente);
      onOpenChange(false);
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Agora você pode fazer seus agendamentos!",
      });
    } catch {
      toast({
        title: "Erro no cadastro",
        description: "Tente novamente mais tarde",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Entre ou Cadastre-se</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="cadastro">Cadastrar</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
              <div>
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  {...loginForm.register("email")}
                />
                {loginForm.formState.errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {loginForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="login-senha">Senha</Label>
                <Input
                  id="login-senha"
                  type="password"
                  {...loginForm.register("senha")}
                />
                {loginForm.formState.errors.senha && (
                  <p className="text-sm text-red-500 mt-1">
                    {loginForm.formState.errors.senha.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="cadastro" className="space-y-4">
            <form onSubmit={cadastroForm.handleSubmit(handleCadastro)} className="space-y-4">
              <div>
                <Label htmlFor="cadastro-nome">Nome Completo</Label>
                <Input
                  id="cadastro-nome"
                  {...cadastroForm.register("nome")}
                />
                {cadastroForm.formState.errors.nome && (
                  <p className="text-sm text-red-500 mt-1">
                    {cadastroForm.formState.errors.nome.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="cadastro-email">Email</Label>
                <Input
                  id="cadastro-email"
                  type="email"
                  {...cadastroForm.register("email")}
                />
                {cadastroForm.formState.errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {cadastroForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="cadastro-telefone">Telefone</Label>
                <Input
                  id="cadastro-telefone"
                  placeholder="(11) 99999-9999"
                  {...cadastroForm.register("telefone")}
                />
                {cadastroForm.formState.errors.telefone && (
                  <p className="text-sm text-red-500 mt-1">
                    {cadastroForm.formState.errors.telefone.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="cadastro-whatsapp">WhatsApp</Label>
                <Input
                  id="cadastro-whatsapp"
                  placeholder="(11) 99999-9999"
                  {...cadastroForm.register("whatsapp")}
                />
                {cadastroForm.formState.errors.whatsapp && (
                  <p className="text-sm text-red-500 mt-1">
                    {cadastroForm.formState.errors.whatsapp.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="cadastro-senha">Senha</Label>
                <Input
                  id="cadastro-senha"
                  type="password"
                  {...cadastroForm.register("senha")}
                />
                {cadastroForm.formState.errors.senha && (
                  <p className="text-sm text-red-500 mt-1">
                    {cadastroForm.formState.errors.senha.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full">
                Cadastrar
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
