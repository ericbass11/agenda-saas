
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, ExternalLink, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function LinkAgendamento() {
  const [estabelecimentoId] = useState("12345"); // Em um app real, viria do contexto/auth
  const { toast } = useToast();
  
  const linkAgendamento = `${window.location.origin}/agendamento/${estabelecimentoId}`;

  const copiarLink = async () => {
    try {
      await navigator.clipboard.writeText(linkAgendamento);
      toast({
        title: "Link copiado!",
        description: "O link de agendamento foi copiado para a área de transferência.",
      });
    } catch (error) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o link. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const abrirLink = () => {
    window.open(linkAgendamento, '_blank');
  };

  const compartilharWhatsApp = () => {
    const mensagem = `Agende seu horário online pelo link: ${linkAgendamento}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ExternalLink className="h-5 w-5" />
          Link de Agendamento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="link-agendamento">Link para seus clientes</Label>
          <div className="flex gap-2 mt-1">
            <Input
              id="link-agendamento"
              value={linkAgendamento}
              readOnly
              className="flex-1"
            />
            <Button onClick={copiarLink} variant="outline" size="icon">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Compartilhe este link com seus clientes para que eles possam agendar online
          </p>
        </div>

        <div className="flex gap-2">
          <Button onClick={abrirLink} variant="outline" className="flex-1">
            <ExternalLink className="h-4 w-4 mr-2" />
            Testar Link
          </Button>
          <Button onClick={compartilharWhatsApp} className="flex-1">
            <Share2 className="h-4 w-4 mr-2" />
            Compartilhar no WhatsApp
          </Button>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Como funciona?</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Seus clientes acessam o link</li>
            <li>• Escolhem serviço, profissional e horário</li>
            <li>• Fazem login ou se cadastram</li>
            <li>• Recebem confirmação no WhatsApp</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
