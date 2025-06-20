
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function InformacoesEstabelecimento() {
  const [dados, setDados] = useState({
    nome: "",
    endereco: "",
    telefone: "",
    email: "",
    descricao: ""
  });
  
  const { toast } = useToast();

  const handleSalvar = () => {
    toast({
      title: "Informações salvas",
      description: "As informações do estabelecimento foram atualizadas com sucesso."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações do Estabelecimento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="nome">Nome do Estabelecimento</Label>
          <Input
            id="nome"
            value={dados.nome}
            onChange={(e) => setDados({...dados, nome: e.target.value})}
            placeholder="Digite o nome do estabelecimento"
          />
        </div>
        
        <div>
          <Label htmlFor="endereco">Endereço</Label>
          <Input
            id="endereco"
            value={dados.endereco}
            onChange={(e) => setDados({...dados, endereco: e.target.value})}
            placeholder="Digite o endereço completo"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              value={dados.telefone}
              onChange={(e) => setDados({...dados, telefone: e.target.value})}
              placeholder="(11) 99999-9999"
            />
          </div>
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={dados.email}
              onChange={(e) => setDados({...dados, email: e.target.value})}
              placeholder="contato@estabelecimento.com"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="descricao">Descrição</Label>
          <Textarea
            id="descricao"
            value={dados.descricao}
            onChange={(e) => setDados({...dados, descricao: e.target.value})}
            placeholder="Descreva seu estabelecimento..."
            rows={3}
          />
        </div>
        
        <Button onClick={handleSalvar} className="w-full">
          Salvar Informações
        </Button>
      </CardContent>
    </Card>
  );
}
