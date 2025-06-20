
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Edit, Calendar } from "lucide-react";
import { AddProfissionalModal } from "@/components/profissionais/AddProfissionalModal";

interface Profissional {
  id: number;
  nome: string;
  especialidades: string[];
  email: string;
  telefone: string;
  biografia?: string;
  foto: string;
}

export default function Profissionais() {
  const [profissionais, setProfissionais] = useState<Profissional[]>([
    { 
      id: 1, 
      nome: "Ana Costa", 
      especialidades: ["Corte", "Escova", "Coloração"], 
      email: "ana@salon.com",
      telefone: "(11) 99999-1111",
      foto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    { 
      id: 2, 
      nome: "Carlos Lima", 
      especialidades: ["Corte Masculino", "Barba"], 
      email: "carlos@salon.com",
      telefone: "(11) 99999-2222",
      foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    { 
      id: 3, 
      nome: "Beatriz Silva", 
      especialidades: ["Manicure", "Pedicure", "Nail Art"], 
      email: "beatriz@salon.com",
      telefone: "(11) 99999-3333",
      foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
  ]);

  const handleAddProfissional = (novoProfissional: any) => {
    const profissional: Profissional = {
      id: Date.now(), // ID temporário
      nome: novoProfissional.nome,
      email: novoProfissional.email,
      telefone: novoProfissional.telefone,
      especialidades: novoProfissional.especialidades,
      biografia: novoProfissional.biografia,
      foto: novoProfissional.foto || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    };
    
    setProfissionais(prev => [...prev, profissional]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Profissionais</h2>
          <p className="text-gray-600 mt-2">Gerencie a equipe do seu salão</p>
        </div>
        <AddProfissionalModal onAddProfissional={handleAddProfissional} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profissionais.map((profissional) => (
          <Card key={profissional.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <img 
                src={profissional.foto} 
                alt={profissional.nome}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <CardTitle className="text-lg">{profissional.nome}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {profissional.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  {profissional.telefone}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Especialidades:</p>
                  <div className="flex flex-wrap gap-1">
                    {profissional.especialidades.map((esp, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {esp}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-3 flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    Agenda
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
