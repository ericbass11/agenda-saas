
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, Users, Calendar } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const faturamentoData = [
  { mes: "Jan", valor: 8500 },
  { mes: "Fev", valor: 9200 },
  { mes: "Mar", valor: 11000 },
  { mes: "Abr", valor: 10800 },
  { mes: "Mai", valor: 12450 },
  { mes: "Jun", valor: 13200 },
];

const ocupacaoData = [
  { dia: "Seg", ocupacao: 75 },
  { dia: "Ter", ocupacao: 82 },
  { dia: "Qua", ocupacao: 68 },
  { dia: "Qui", ocupacao: 95 },
  { dia: "Sex", ocupacao: 88 },
  { dia: "Sáb", ocupacao: 98 },
  { dia: "Dom", ocupacao: 45 },
];

const servicosData = [
  { servico: "Corte Feminino", quantidade: 85, fill: "#8b5cf6" },
  { servico: "Manicure", quantidade: 72, fill: "#06b6d4" },
  { servico: "Corte Masculino", quantidade: 58, fill: "#10b981" },
  { servico: "Escova", quantidade: 45, fill: "#f59e0b" },
  { servico: "Barba", quantidade: 42, fill: "#ef4444" },
];

const chartConfig = {
  valor: {
    label: "Faturamento",
    color: "#10b981",
  },
  ocupacao: {
    label: "Taxa de Ocupação",
    color: "#8b5cf6",
  },
};

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
            <ChartContainer config={chartConfig} className="h-64">
              <LineChart data={faturamentoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={(value) => [`R$ ${value.toLocaleString()}`, "Faturamento"]}
                />
                <Line 
                  type="monotone" 
                  dataKey="valor" 
                  stroke="var(--color-valor)" 
                  strokeWidth={3}
                  dot={{ fill: "var(--color-valor)", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ChartContainer>
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
            <ChartContainer config={chartConfig} className="h-64">
              <PieChart>
                <Pie
                  data={servicosData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="quantidade"
                  label={({ servico, quantidade }) => `${servico}: ${quantidade}`}
                >
                  {servicosData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Taxa de Ocupação Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64">
              <BarChart data={ocupacaoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dia" />
                <YAxis domain={[0, 100]} />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={(value) => [`${value}%`, "Taxa de Ocupação"]}
                />
                <Bar 
                  dataKey="ocupacao" 
                  fill="var(--color-ocupacao)" 
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
