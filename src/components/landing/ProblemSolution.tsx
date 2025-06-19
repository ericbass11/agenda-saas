
import { AlertTriangle, CheckCircle } from "lucide-react";

export const ProblemSolution = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Chega de Perder Clientes e Tempo
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Você conhece esses problemas? Nós temos a solução perfeita para o seu salão.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Problema */}
          <div className="bg-red-50 rounded-2xl p-8 border-l-4 border-red-500">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <h3 className="text-2xl font-bold text-red-800">Os Problemas</h3>
            </div>
            
            <ul className="space-y-4">
              {[
                "Clientes não aparecem (no-show) sem avisar",
                "Agenda desorganizada com papel e caneta",
                "Perda de tempo confirmando agendamentos por telefone",
                "Dificuldade para controlar horários dos profissionais",
                "Falta de visibilidade sobre o faturamento",
                "Clientes insatisfeitos com a demora para agendar"
              ].map((problem, index) => (
                <li key={index} className="flex items-start gap-3 text-red-700">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{problem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solução */}
          <div className="bg-green-50 rounded-2xl p-8 border-l-4 border-green-500">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <h3 className="text-2xl font-bold text-green-800">Nossa Solução</h3>
            </div>
            
            <ul className="space-y-4">
              {[
                "Lembretes automáticos via WhatsApp reduzem faltas",
                "Agenda digital organizada e sempre atualizada",
                "Agendamento online 24/7 sem intervenção manual",
                "Gestão completa de profissionais e horários",
                "Dashboard com relatórios de receita e desempenho",
                "Experiência excepcional para seus clientes"
              ].map((solution, index) => (
                <li key={index} className="flex items-start gap-3 text-green-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
