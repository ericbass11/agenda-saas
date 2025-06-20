
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Cliente } from "@/hooks/useAgendamentoCliente";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

interface ClienteAuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClienteLogado: (cliente: Cliente) => void;
}

export function ClienteAuthModal({ open, onOpenChange, onClienteLogado }: ClienteAuthModalProps) {
  const [activeTab, setActiveTab] = useState("login");
  const { toast } = useToast();

  const handleLoginSuccess = (cliente: Cliente) => {
    onClienteLogado(cliente);
    onOpenChange(false);
    
    toast({
      title: "Login realizado com sucesso!",
      description: "Bem-vindo de volta!",
    });
  };

  const handleSignupSuccess = (cliente: Cliente) => {
    onClienteLogado(cliente);
    onOpenChange(false);
    
    toast({
      title: "Cadastro realizado com sucesso!",
      description: "Agora você pode fazer seus agendamentos!",
    });
  };

  const handleError = (message: string) => {
    toast({
      title: "Erro",
      description: message,
      variant: "destructive",
    });
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
            <LoginForm onSuccess={handleLoginSuccess} onError={handleError} />
          </TabsContent>

          <TabsContent value="cadastro" className="space-y-4">
            <SignupForm onSuccess={handleSignupSuccess} onError={handleError} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
