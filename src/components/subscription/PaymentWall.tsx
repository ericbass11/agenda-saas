
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, CreditCard, Lock, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const PaymentWall: React.FC = () => {
  const { user } = useAuth();

  const handleGoToPricing = () => {
    window.location.href = '/pricing';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full border-red-200 shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <Lock className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-red-700 flex items-center justify-center gap-2">
            <AlertTriangle className="h-6 w-6" />
            Sistema Bloqueado
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="space-y-4">
            <p className="text-gray-700 text-lg font-medium">
              Assinatura necessária para continuar
            </p>
            <p className="text-gray-600">
              Para acessar o <strong>Agendamento Fácil</strong>, você precisa ter uma assinatura ativa.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-yellow-800 mb-2">
                <Crown className="h-5 w-5" />
                <span className="font-semibold">Plano Completo</span>
              </div>
              <p className="text-yellow-700 text-sm">
                Por apenas <strong>R$ 69,90/mês</strong> você tem acesso completo a todas as funcionalidades.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleGoToPricing}
              className="w-full" 
              size="lg"
            >
              <CreditCard className="mr-2 h-5 w-5" />
              Assinar Agora
            </Button>
            
            {!user && (
              <p className="text-sm text-gray-500">
                Você precisa estar logado para assinar o plano
              </p>
            )}
          </div>

          <div className="text-xs text-gray-500 space-y-1">
            <p>✓ 7 dias grátis para testar</p>
            <p>✓ Cancele quando quiser</p>
            <p>✓ Sem compromisso</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
