
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoriasManager } from "@/components/configuracoes/CategoriasManager";

export default function Configuracoes() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Configurações</h2>
        <p className="text-gray-600 mt-2">Gerencie as configurações do seu salão</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoriasManager />
        
        <Card>
          <CardHeader>
            <CardTitle>Informações do Estabelecimento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Em desenvolvimento...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Horários de Funcionamento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Em desenvolvimento...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notificações WhatsApp</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Em desenvolvimento...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configurações de Agendamento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Em desenvolvimento...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Backup e Exportação</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Em desenvolvimento...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
