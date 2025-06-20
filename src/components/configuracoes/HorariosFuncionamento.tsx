
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const diasSemana = [
  { key: 'segunda', label: 'Segunda-feira' },
  { key: 'terca', label: 'Terça-feira' },
  { key: 'quarta', label: 'Quarta-feira' },
  { key: 'quinta', label: 'Quinta-feira' },
  { key: 'sexta', label: 'Sexta-feira' },
  { key: 'sabado', label: 'Sábado' },
  { key: 'domingo', label: 'Domingo' }
];

export function HorariosFuncionamento() {
  const [horarios, setHorarios] = useState(
    Object.fromEntries(
      diasSemana.map(dia => [
        dia.key,
        { ativo: true, abertura: '09:00', fechamento: '18:00' }
      ])
    )
  );
  
  const { toast } = useToast();

  const handleToggleDia = (dia: string) => {
    setHorarios(prev => ({
      ...prev,
      [dia]: { ...prev[dia], ativo: !prev[dia].ativo }
    }));
  };

  const handleHorarioChange = (dia: string, campo: string, valor: string) => {
    setHorarios(prev => ({
      ...prev,
      [dia]: { ...prev[dia], [campo]: valor }
    }));
  };

  const handleSalvar = () => {
    toast({
      title: "Horários salvos",
      description: "Os horários de funcionamento foram atualizados com sucesso."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Horários de Funcionamento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {diasSemana.map((dia) => (
          <div key={dia.key} className="flex items-center space-x-4 p-3 border rounded">
            <div className="flex items-center space-x-2 min-w-[140px]">
              <Switch
                checked={horarios[dia.key].ativo}
                onCheckedChange={() => handleToggleDia(dia.key)}
              />
              <Label className="text-sm font-medium">{dia.label}</Label>
            </div>
            
            {horarios[dia.key].ativo && (
              <div className="flex items-center space-x-2">
                <Input
                  type="time"
                  value={horarios[dia.key].abertura}
                  onChange={(e) => handleHorarioChange(dia.key, 'abertura', e.target.value)}
                  className="w-32"
                />
                <span className="text-gray-500">às</span>
                <Input
                  type="time"
                  value={horarios[dia.key].fechamento}
                  onChange={(e) => handleHorarioChange(dia.key, 'fechamento', e.target.value)}
                  className="w-32"
                />
              </div>
            )}
            
            {!horarios[dia.key].ativo && (
              <span className="text-gray-500 text-sm">Fechado</span>
            )}
          </div>
        ))}
        
        <Button onClick={handleSalvar} className="w-full">
          Salvar Horários
        </Button>
      </CardContent>
    </Card>
  );
}
