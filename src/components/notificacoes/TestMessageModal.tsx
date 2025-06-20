
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, TestTube } from "lucide-react";
import { toast } from "sonner";

export function TestMessageModal() {
  const [open, setOpen] = useState(false);
  const [testData, setTestData] = useState({
    telefone: "",
    tipo: "",
    mensagem: "",
    cliente: "João Silva",
    servico: "Corte Masculino",
    profissional: "Carlos Lima",
    data: "20/12/2024",
    hora: "14:00"
  });

  const templates = {
    confirmacao: "Olá {cliente}! Seu agendamento de {servico} com {profissional} foi confirmado para {data} às {hora}. Até lá! 😊",
    lembrete: "Olá {cliente}! Lembrete: você tem um agendamento de {servico} amanhã ({data}) às {hora} com {profissional}. Nos vemos lá! 🌟",
    cancelamento: "Olá {cliente}! Seu agendamento de {servico} para {data} às {hora} foi cancelado. Entre em contato conosco para reagendar. 📞",
    reagendamento: "Olá {cliente}! Seu agendamento foi reagendado para {data} às {hora}. Serviço: {servico} com {profissional}. Confirme o recebimento! ✅"
  };

  const handleTipoChange = (tipo: string) => {
    setTestData(prev => ({
      ...prev,
      tipo,
      mensagem: templates[tipo as keyof typeof templates] || ""
    }));
  };

  const processTemplate = (template: string) => {
    return template
      .replace('{cliente}', testData.cliente)
      .replace('{servico}', testData.servico)
      .replace('{profissional}', testData.profissional)
      .replace('{data}', testData.data)
      .replace('{hora}', testData.hora);
  };

  const handleSendTest = () => {
    if (!testData.telefone || !testData.mensagem) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    // Simular envio da mensagem
    console.log("Enviando mensagem de teste:", {
      telefone: testData.telefone,
      mensagem: processTemplate(testData.mensagem)
    });

    toast.success("Mensagem de teste enviada com sucesso!");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <TestTube className="h-4 w-4 mr-2" />
          Testar Mensagem
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Testar Mensagem WhatsApp</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="telefone">Número do WhatsApp *</Label>
            <Input
              id="telefone"
              value={testData.telefone}
              onChange={(e) => setTestData(prev => ({ ...prev, telefone: e.target.value }))}
              placeholder="(11) 99999-9999"
            />
          </div>

          <div>
            <Label>Tipo de Mensagem</Label>
            <Select onValueChange={handleTipoChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="confirmacao">Confirmação</SelectItem>
                <SelectItem value="lembrete">Lembrete</SelectItem>
                <SelectItem value="cancelamento">Cancelamento</SelectItem>
                <SelectItem value="reagendamento">Reagendamento</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cliente">Cliente</Label>
              <Input
                id="cliente"
                value={testData.cliente}
                onChange={(e) => setTestData(prev => ({ ...prev, cliente: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="servico">Serviço</Label>
              <Input
                id="servico"
                value={testData.servico}
                onChange={(e) => setTestData(prev => ({ ...prev, servico: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="profissional">Profissional</Label>
              <Input
                id="profissional"
                value={testData.profissional}
                onChange={(e) => setTestData(prev => ({ ...prev, profissional: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="data">Data</Label>
              <Input
                id="data"
                value={testData.data}
                onChange={(e) => setTestData(prev => ({ ...prev, data: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="mensagem">Mensagem *</Label>
            <Textarea
              id="mensagem"
              value={testData.mensagem}
              onChange={(e) => setTestData(prev => ({ ...prev, mensagem: e.target.value }))}
              rows={4}
              placeholder="Digite sua mensagem..."
            />
          </div>

          {testData.mensagem && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <Label className="text-sm font-medium">Preview da Mensagem:</Label>
              <p className="text-sm mt-1">{processTemplate(testData.mensagem)}</p>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSendTest} className="bg-green-600 hover:bg-green-700">
              <Send className="h-4 w-4 mr-2" />
              Enviar Teste
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
