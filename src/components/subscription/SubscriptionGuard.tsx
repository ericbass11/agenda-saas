
import React from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, CreditCard } from 'lucide-react';

interface SubscriptionGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requiresPremium?: boolean;
}

export const SubscriptionGuard: React.FC<SubscriptionGuardProps> = ({ 
  children, 
  fallback,
  requiresPremium = false 
}) => {
  const { subscribed, subscription_tier, loading } = useSubscription();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const hasAccess = subscribed && (!requiresPremium || subscription_tier === 'Premium');

  if (!hasAccess) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Crown className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>
            {requiresPremium ? 'Funcionalidade Premium' : 'Assinatura Necessária'}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            {requiresPremium 
              ? 'Esta funcionalidade está disponível apenas para assinantes Premium.'
              : 'Para acessar esta funcionalidade, você precisa ter uma assinatura ativa.'
            }
          </p>
          <Button className="w-full" onClick={() => window.location.href = '/pricing'}>
            <CreditCard className="mr-2 h-4 w-4" />
            Ver Planos
          </Button>
        </CardContent>
      </Card>
    );
  }

  return <>{children}</>;
};
