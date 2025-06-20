
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Pricing = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubscribe = async (priceId: string) => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para assinar um plano.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId }
      });

      if (error) throw error;

      // Open Stripe checkout in a new tab
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Erro",
        description: "Não foi possível iniciar o processo de pagamento. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const plans = [
    {
      name: "Básico",
      price: "29,90",
      priceId: "price_basic", // Será substituído pelo ID real do Stripe
      description: "Perfeito para pequenos negócios",
      features: [
        "Até 100 agendamentos/mês",
        "2 profissionais",
        "Notificações WhatsApp",
        "Dashboard básico",
        "Suporte por email"
      ],
      popular: false
    },
    {
      name: "Premium",
      price: "59,90",
      priceId: "price_premium", // Será substituído pelo ID real do Stripe
      description: "Para negócios em crescimento",
      features: [
        "Agendamentos ilimitados",
        "Profissionais ilimitados",
        "Notificações WhatsApp",
        "Dashboard avançado",
        "Relatórios detalhados",
        "Suporte prioritário",
        "Integração com redes sociais"
      ],
      popular: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Escolha o plano ideal para seu negócio
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simplifique seus agendamentos e cresça seu negócio com nossa plataforma completa
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative ${plan.popular ? 'border-primary shadow-xl scale-105' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                  <Star className="w-3 h-3 mr-1" />
                  Mais Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-6">
                <div className="flex items-center justify-center mb-4">
                  {plan.popular ? (
                    <Crown className="w-8 h-8 text-primary" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">R$ {plan.price}</span>
                  <span className="text-gray-500">/mês</span>
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full" 
                  size="lg"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleSubscribe(plan.priceId)}
                >
                  {user ? 'Assinar Agora' : 'Faça Login para Assinar'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Todos os planos incluem 7 dias grátis. Cancele quando quiser.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
