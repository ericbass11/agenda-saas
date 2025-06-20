
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface Profissional {
  id: number;
  nome: string;
  especialidades: string[];
}

interface SelecaoProfissionalProps {
  profissionais: Profissional[];
  profissionalSelecionado?: number;
  onProfissionalSelecionado: (profissionalId?: number) => void;
  onProximo: () => void;
  onVoltar: () => void;
}

export function SelecaoProfissional({ 
  profissionais, 
  profissionalSelecionado, 
  onProfissionalSelecionado, 
  onProximo, 
  onVoltar 
}: SelecaoProfissionalProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Escolha o Profissional</h2>
        <p className="text-gray-600">Selecione quem você prefere que faça o atendimento</p>
      </div>

      {/* Opção "Sem Preferência" */}
      <Card 
        className={`cursor-pointer transition-all hover:shadow-md ${
          profissionalSelecionado === undefined 
            ? "ring-2 ring-blue-500 bg-blue-50" 
            : ""
        }`}
        onClick={() => onProfissionalSelecionado(undefined)}
      >
        <CardContent className="p-4">
          <div className="flex items-center">
            <Avatar className="h-12 w-12">
              <AvatarFallback>
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            
            <div className="ml-4 flex-1">
              <h3 className="font-medium text-gray-900">Sem Preferência</h3>
              <p className="text-sm text-gray-500">
                Qualquer profissional disponível
              </p>
            </div>
            
            {profissionalSelecionado === undefined && (
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Lista de Profissionais */}
      <div className="space-y-3">
        {profissionais.map(profissional => (
          <Card 
            key={profissional.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              profissionalSelecionado === profissional.id 
                ? "ring-2 ring-blue-500 bg-blue-50" 
                : ""
            }`}
            onClick={() => onProfissionalSelecionado(profissional.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>
                    {profissional.nome.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="ml-4 flex-1">
                  <h3 className="font-medium text-gray-900">{profissional.nome}</h3>
                  <p className="text-sm text-gray-500">
                    {profissional.especialidades.join(', ')}
                  </p>
                </div>
                
                {profissionalSelecionado === profissional.id && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Botões de Navegação */}
      <div className="flex gap-3">
        <Button onClick={onVoltar} variant="outline" className="flex-1">
          Voltar
        </Button>
        <Button onClick={onProximo} className="flex-1" size="lg">
          Continuar
        </Button>
      </div>
    </div>
  );
}
