
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings, Store, Bell, Clock } from "lucide-react";

export default function Configuracoes() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Configurações</h2>
        <p className="text-gray-600 mt-2">Gerencie as configurações do seu salão</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Store className="h-5 w-5 mr-2" />
              Dados do Estabelecimento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="nome">Nome do Salão</Label>
              <Input id="nome" defaultValue="Salão Beleza Total" />
            </div>
            <div>
              <Label htmlFor="endereco">Endereço</Label>
              <Input id="endereco" defaultValue="Rua das Flores, 123" />
            </div>
            <div>
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" defaultValue="(11) 99999-0000" />
            </div>
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" defaultValue="contato@salao.com" />
            </div>
            <Button>Salvar Alterações</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Horário de Funcionamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { dia: "Segunda-feira", abertura: "09:00", fechamento: "18:00" },
              { dia: "Terça-feira", abertura: "09:00", fechamento: "18:00" },
              { dia: "Quarta-feira", abertura: "09:00", fechamento: "18:00" },
              { dia: "Quinta-feira", abertura: "09:00", fechamento: "18:00" },
              { dia: "Sexta-feira", abertura: "09:00", fechamento: "19:00" },
              { dia: "Sábado", abertura: "08:00", fechamento: "17:00" },
            ].map((horario, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium w-24">{horario.dia}</span>
                <div className="flex items-center space-x-2">
                  <Input type="time" defaultValue={horario.abertura} className="w-20" />
                  <span className="text-sm text-gray-500">às</span>
                  <Input type="time" defaultValue={horario.fechamento} className="w-20" />
                </div>
              </div>
            ))}
            <Button>Salvar Horários</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Lembretes WhatsApp</Label>
                <p className="text-sm text-gray-600">Enviar lembretes automáticos para clientes</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Confirmação de Agendamento</Label>
                <p className="text-sm text-gray-600">Confirmar agendamentos via WhatsApp</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Notificações de Cancelamento</Label>
                <p className="text-sm text-gray-600">Avisar sobre cancelamentos</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div>
              <Label htmlFor="antecedencia">Antecedência do Lembrete (horas)</Label>
              <Input id="antecedencia" type="number" defaultValue="24" className="w-20" />
            </div>
            <Button>Salvar Configurações</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Configurações Gerais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="buffer">Tempo entre Agendamentos (minutos)</Label>
              <Input id="buffer" type="number" defaultValue="15" className="w-20" />
            </div>
            <div>
              <Label htmlFor="antecedencia-min">Antecedência Mínima (horas)</Label>
              <Input id="antecedencia-min" type="number" defaultValue="2" className="w-20" />
            </div>
            <div>
              <Label htmlFor="antecedencia-max">Antecedência Máxima (dias)</Label>
              <Input id="antecedencia-max" type="number" defaultValue="30" className="w-20" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Permitir Agendamento sem Profissional</Label>
                <p className="text-sm text-gray-600">Cliente pode agendar sem escolher profissional específico</p>
              </div>
              <Switch />
            </div>
            <Button>Salvar Configurações</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
