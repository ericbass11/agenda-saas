
import { Calendar, Users, Clock, Contact, FileText, Mail } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: Calendar,
      title: "Agendamento Online 24/7",
      description: "Seus clientes podem agendar a qualquer hora, de qualquer lugar. Aumenta as vendas e reduz sua carga de trabalho.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Users,
      title: "Gestão de Profissionais",
      description: "Cadastre profissionais, defina horários, especialidades e acompanhe o desempenho de cada um.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Contact,
      title: "Notificações WhatsApp",
      description: "Confirmações e lembretes automáticos via WhatsApp. Reduza faltas em até 70%.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: FileText,
      title: "Dashboard Executivo",
      description: "Relatórios completos de faturamento, ocupação e desempenho. Tome decisões baseadas em dados.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Clock,
      title: "Controle de Horários",
      description: "Defina horários de funcionamento, pausas e bloqueios. Organize a agenda do jeito que você precisa.",
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: Mail,
      title: "Histórico de Clientes",
      description: "Mantenha o histórico completo de cada cliente. Ofereça um atendimento mais personalizado.",
      color: "from-pink-500 to-pink-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Recursos que Vão Transformar Seu Negócio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tudo que você precisa para modernizar seu salão e aumentar seus resultados
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
