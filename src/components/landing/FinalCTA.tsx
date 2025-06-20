
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const FinalCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Pronto Para Revolucionar Seu Salão?
        </h2>
        
        <p className="text-xl text-blue-100 mb-8 leading-relaxed">
          Junte-se a centenas de profissionais que já transformaram seus negócios com o Agendamento Fácil
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-10 text-blue-100">
          {[
            "✅ Teste grátis por 7 dias",
            "✅ Sem compromisso",
            "✅ Cancele quando quiser",
            "✅ Suporte especializado"
          ].map((benefit, index) => (
            <div key={index} className="flex items-center gap-2">
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        <Button 
          size="lg"
          className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          asChild
        >
          <Link to="/dashboard">
            Crie Sua Conta Grátis e Teste por 7 Dias!
          </Link>
        </Button>

        <p className="text-blue-200 mt-6">
          Sem cartão de crédito • Ativação imediata • Suporte incluído
        </p>
      </div>
    </section>
  );
};
