
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, Users, Calendar } from "lucide-react";

export default function Relatorios() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Relatórios</h2>
          <p className="text-gray-600 mt-2">Análise detalhada do desempenho do seu negócio</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
              Faturamento Mensal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-500">
              Gráfico de faturamento será implementado aqui
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              Desempenho por Profissional
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { profissional: "Ana Costa", agendamentos: 45, faturamento: "R$ 3.600" },
                { profissional: "Carlos Lima", agendamentos: 38, faturamento: "R$ 3.040" },
                { profissional: "Beatriz Silva", agendamentos: 42, faturamento: "R$ 1.890" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{item.profissional}</span>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{item.agendamentos} agendamentos</p>
                    <p className="font-medium text-green-600">{item.faturamento}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-purple-600" />
              Serviços Mais Populares
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { servico: "Corte Feminino", quantidade: 85, percentual: 28 },
                { servico: "Manicure", quantidade: 72, percentual: 24 },
                { servico: "Corte Masculino", quantidade: 58, percentual: 19 },
                { servico: "Escova", quantidade: 45, percentual: 15 },
                { servico: "Barba", quantidade: 42, percentual: 14 },
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{item.servico}</span>
                    <span className="text-sm text-gray-600">{item.quantidade} vezes</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${item.percentual}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Taxa de Ocupação Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-500">
              Gráfico de ocupação será implementado aqui
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
